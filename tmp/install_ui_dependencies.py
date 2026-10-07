"""Download locked PyPI wheels in bounded ranges and verify published hashes."""
import concurrent.futures as cf
import hashlib
import json
from pathlib import Path
import urllib.request
from pip._vendor.packaging.tags import sys_tags
from pip._vendor.packaging.utils import parse_wheel_filename

root = Path(__file__).parent
dest = root / "ui-wheels"
dest.mkdir(exist_ok=True)
tags = list(sys_tags())
rank = {tag: i for i, tag in enumerate(tags)}

def get(url, headers=None):
    for attempt in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=headers or {}), timeout=30) as response:
                return response.read()
        except Exception:
            if attempt == 3:
                raise

def metadata(line):
    name, version = line.split("==")
    data = json.loads(get(f"https://pypi.org/pypi/{name}/{version}/json"))
    choices = []
    for item in data["urls"]:
        if item["filename"].endswith(".whl"):
            wheel_tags = parse_wheel_filename(item["filename"])[3]
            compatible = [rank[tag] for tag in wheel_tags if tag in rank]
            if compatible:
                choices.append((min(compatible), item))
    return min(choices, key=lambda choice: choice[0])[1]

lines = [line.strip() for line in (root / "ui-requirements.txt").read_text().splitlines() if "==" in line and not line.lstrip().startswith("#")]
with cf.ThreadPoolExecutor(max_workers=12) as pool:
    packages = list(pool.map(metadata, lines))
    for item in packages:
        path = dest / item["filename"]
        expected = item["digests"]["sha256"]
        if path.exists() and hashlib.sha256(path.read_bytes()).hexdigest() == expected:
            continue
        size = item["size"]
        chunks = [(start, min(start + 262144, size) - 1) for start in range(0, size, 262144)]
        def chunk(bounds):
            start, end = bounds
            result = get(item["url"], {"Range": f"bytes={start}-{end}"})
            if len(result) != end - start + 1:
                raise ValueError("Unexpected range response")
            return result
        data = b"".join(pool.map(chunk, chunks))
        if hashlib.sha256(data).hexdigest() != expected:
            raise ValueError(f"Hash mismatch: {path.name}")
        path.write_bytes(data)
        print(f"Verified {path.name}", flush=True)
