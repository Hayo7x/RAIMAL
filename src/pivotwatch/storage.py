from __future__ import annotations
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

DB_PATH = Path(__file__).resolve().parents[2] / "data" / "pivotwatch.sqlite3"

def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as db:
        db.execute("""CREATE TABLE IF NOT EXISTS inspections (
            id INTEGER PRIMARY KEY AUTOINCREMENT, task_id TEXT NOT NULL, zone_id TEXT NOT NULL,
            replay_date TEXT NOT NULL, finding TEXT NOT NULL, measurement TEXT, action TEXT,
            is_synthetic INTEGER NOT NULL DEFAULT 1, recorded_at TEXT NOT NULL)""")

def save_inspection(record: dict) -> None:
    with sqlite3.connect(DB_PATH) as db:
        db.execute("INSERT INTO inspections(task_id,zone_id,replay_date,finding,measurement,action,is_synthetic,recorded_at) VALUES(?,?,?,?,?,?,?,?)",(record["task_id"],record["zone_id"],record["replay_date"],record["finding"],record.get("measurement",""),record.get("action",""),int(record.get("is_synthetic",True)),datetime.now(timezone.utc).isoformat()))

def list_inspections() -> list[dict]:
    with sqlite3.connect(DB_PATH) as db:
        db.row_factory = sqlite3.Row
        return [dict(row) for row in db.execute("SELECT * FROM inspections ORDER BY id DESC LIMIT 100").fetchall()]
