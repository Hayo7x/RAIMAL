"""Build browser replay fixtures from the original Python analysis, not a JS approximation."""
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from src.pivotwatch.demo import build_demo_data
from src.pivotwatch.engine import analyze

out = ROOT / "web" / "public"
out.mkdir(parents=True, exist_ok=True)
data = build_demo_data()
dates = sorted(data.date.unique())
runs = {}
for date in dates:
    day = str(date.date())
    for coverage in range(50, 101, 5):
        result = analyze(data, date, min_coverage=coverage / 100)
        runs[f"{day}:{coverage}"] = {
            "run_id": result.run_id,
            "analysis_date": day,
            "model": result.model_name,
            "synthetic_demo": True,
            "threshold": result.threshold,
            "gates": result.gates,
            "zones": json.loads(result.zones.to_json(orient="records", date_format="iso")),
            "tasks": json.loads(result.tasks.to_json(orient="records", date_format="iso")),
        }
    print(f"Exported {day}", flush=True)
fixture = {"dates": [str(date.date()) for date in dates], "observations": json.loads(data.to_json(orient="records", date_format="iso")), "runs": runs}
(out / "demo.json").write_text(json.dumps(fixture, separators=(",", ":"), allow_nan=False), encoding="utf-8")
source = (ROOT / "src" / "pivotwatch" / "ui.py").read_text(encoding="utf-8")
svg = re.search(r'<svg viewBox=.*?</svg>', source, re.S).group()
svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ', 1)
(out / "field.svg").write_text(svg, encoding="utf-8")
