from pathlib import Path
import json, hashlib
import numpy as np
import pandas as pd
from PIL import Image
from sklearn.ensemble import IsolationForest

p=Path('presentation/assets/real-sentinel')
dates=['2025-02-08','2025-02-18','2025-02-28']
bbox=[44.8685,20.341,44.8785,20.351]
center=[44.8735,20.34585]
radius=390
rows=[]; summaries=[]
for date in dates:
    raw=np.load(p/(date+'-bands.npy'))
    assert raw.shape==(4,111,104)
    red=(raw[0].astype(float)-1000)/10000
    nir=(raw[1].astype(float)-1000)/10000
    valid=np.isin(raw[2],[4,5]) & (raw[3]>0) & (raw[0]>0) & (raw[1]>0) & (red+nir>0)
    ndvi=np.divide(nir-red,nir+red,out=np.full_like(red,np.nan),where=red+nir>0)
    lon=bbox[0]+(np.arange(104)+.5)*(bbox[2]-bbox[0])/104
    lat=bbox[3]-(np.arange(111)+.5)*(bbox[3]-bbox[1])/111
    x=(lon[None,:]-center[0])*111320*np.cos(np.deg2rad(center[1]))
    y=(lat[:,None]-center[1])*111320
    dist=np.sqrt(x*x+y*y); bearing=np.mod(np.rad2deg(np.arctan2(x,y)),360)
    inside=dist<radius
    # Scientific raster rendering: exact measured NDVI pixels, fixed 0..1 palette.
    low=np.array([232,187,104]);high=np.array([40,95,55]);t=np.clip(ndvi,0,1)[...,None]
    rgb=(low+(high-low)*t).astype(np.uint8)
    rgba=np.dstack([rgb,np.where(inside & valid,255,0).astype(np.uint8)])
    Image.fromarray(rgba).resize((520,555),Image.Resampling.NEAREST).save(p/(date+'-ndvi.png'))
    np.save(p/(date+'-ndvi.npy'),np.where(valid,ndvi,np.nan))
    for sector in range(12):
        for ring in range(4):
            mask=inside & (bearing>=sector*30)&(bearing<(sector+1)*30)&(dist>=ring*radius/4)&(dist<(ring+1)*radius/4)
            good=mask&valid
            rows.append({'date':date,'zone_id':f'S{sector+1:02}-R{ring+1}','sector':sector,'ring':ring,'ndvi':float(np.median(ndvi[good])) if good.any() else None,'coverage':float(good.sum()/mask.sum()),'pixels':int(good.sum())})
    summaries.append({'date':date,'north_ndvi':float(np.median(ndvi[inside&valid&(y>0)])),'south_ndvi':float(np.median(ndvi[inside&valid&(y<0)])),'field_ndvi':float(np.median(ndvi[inside&valid])),'valid_coverage':float((inside&valid).sum()/inside.sum()),'pixel_count':int((inside&valid).sum())})
df=pd.DataFrame(rows).sort_values(['date','zone_id'])
df=df[df.coverage>=.8].copy()
df['peer_deficit']=df.groupby(['date','ring']).ndvi.transform('median')-df.ndvi
df['change']=df.groupby('zone_id').ndvi.diff().fillna(0)
features=['ndvi','peer_deficit','change']
train=df[df.date<dates[-1]].copy();test=df[df.date==dates[-1]].copy()
model=IsolationForest(n_estimators=160,random_state=42,contamination='auto').fit(train[features])
test['anomaly_score']=-model.score_samples(test[features])
train['anomaly_score']=-model.score_samples(train[features])
threshold=float(train.anomaly_score.quantile(.94))
test['preliminary_review']=(test.anomaly_score>threshold)&((test.peer_deficit>.075)|(test.change<-.07))
df.to_csv(p/'real-zone-features.csv',index=False)
test.sort_values('anomaly_score',ascending=False).to_csv(p/'real-anomaly-ranking.csv',index=False)
out={'dates':dates,'bbox':bbox,'center_lon_lat':center,'radius_m':radius,'geometry':'Manual approximate field circle, unverified by operator','summaries':summaries,'zones':test.to_dict('records'),'ranking':test.sort_values('anomaly_score',ascending=False).to_dict('records'),'threshold':threshold,'features':features,'train_rows':len(train),'train_dates':dates[:2],'test_date':dates[-1],'model':'IsolationForest, 160 trees, random_state=42','scope':'Exploratory analysis of real imagery, separate from deployed MVP; no confirmed crop, equipment cause, field inspection or accuracy claim','offset':-1000,'scale':10000,'scl_valid':[4,5],'source':'Copernicus Sentinel-2 L2A / Microsoft Planetary Computer','hashes':{f.name:hashlib.sha256(f.read_bytes()).hexdigest() for f in p.glob('*-bands.npy')}}
(p/'analysis.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
print(json.dumps({'summary':summaries,'top3':out['ranking'][:3],'threshold':threshold},indent=2))
