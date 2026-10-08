import sys,json
from pathlib import Path
root=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(root))
from src.pivotwatch.demo import build_demo_data
from src.pivotwatch.engine import analyze
data=build_demo_data()
r=analyze(data,data.date.max())
rank=r.zones.sort_values('anomaly_score',ascending=False)
target=data[data.zone_id.eq('S02-R3')].sort_values('date')
peer=data[data.ring.eq(2)&~data.sector.eq(1)].groupby('date').ndvi.median()
out={'latest_date':str(data.date.max().date()),'threshold':r.threshold,'zones':r.zones.to_dict('records'),'ranks':rank.head(8).to_dict('records'),'candidate_ndvi':target.ndvi.tolist(),'peer_ndvi':peer.tolist(),'dates':[d.strftime('%d %b') for d in target.date], 'status_counts':r.zones.status.value_counts().to_dict(),'tasks':r.tasks.to_dict('records')}
(root/'tmp/presentation-visual-build/model-output.json').write_text(json.dumps(out,indent=2,default=str),encoding='utf8')
r.zones.to_csv(root/'presentation/assets/model-zone-output.csv',index=False)
print(rank.head(8)[['zone_id','anomaly_score','ndvi','peer_deficit','quality_ok','history_ok','persistence_ok','eligible']].to_string(index=False))
print(r.threshold, out['status_counts'])
