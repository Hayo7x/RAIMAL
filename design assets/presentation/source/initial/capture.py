import sys, json, hashlib, subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(root))
from src.pivotwatch.demo import build_demo_data
from src.pivotwatch.engine import analyze
from src.pivotwatch import storage
dest=root/'tmp/presentation-build'
data=build_demo_data()
latest=analyze(data,data.date.max())
early=analyze(data,data.date.min())
storage.DB_PATH=dest/'demo-evidence.sqlite3'
storage.init_db()
task=latest.tasks.iloc[0]
storage.save_inspection(dict(task_id=latest.run_id,zone_id=task.zone_id,replay_date=str(data.date.max().date()),finding='Simulated check completed',measurement='180 kPa (synthetic)',action='Recheck the selected zone',is_synthetic=True))
records=storage.list_inspections()
assert len(latest.tasks)>0 and len(early.tasks)==0 and records[0]['is_synthetic']==1
data.to_csv(dest/'synthetic-input.csv',index=False)
latest.tasks.to_csv(dest/'task-export.csv',index=False)
out=dict(rows=len(data),dates=int(data.date.nunique()),zones=int(data.zone_id.nunique()),latest_date=str(data.date.max().date()),early_date=str(data.date.min().date()),latest_tasks=len(latest.tasks),early_tasks=len(early.tasks),gates=latest.gates,tasks=latest.tasks.to_dict('records'),saved_record=records[0],checks='Direct engine and storage checks passed. UI suite fails at unsupported info icon.',hashes={str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in [root/'src/pivotwatch/engine.py',root/'src/pivotwatch/demo.py',root/'src/pivotwatch/storage.py',root/'app.py']})
(dest/'evidence.json').write_text(json.dumps(out,indent=2),encoding='utf8')
print(json.dumps(out,indent=2))
