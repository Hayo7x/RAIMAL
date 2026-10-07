from __future__ import annotations

from dataclasses import dataclass
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest

@dataclass
class Analysis:
    run_id: str
    model_name: str
    threshold: float
    zones: pd.DataFrame
    tasks: pd.DataFrame
    gates: dict

def analyze(data: pd.DataFrame, as_of: pd.Timestamp, min_coverage: float = 0.8) -> Analysis:
    history = data[data.date <= as_of].copy()
    current = history[history.date.eq(as_of)].copy()
    prior = history[history.date.lt(as_of)]
    current["peer_deficit"] = current.groupby("ring").ndvi.transform("median") - current.ndvi
    current["baseline_ndvi"] = current.zone_id.map(prior.groupby("zone_id").ndvi.median())
    current["change"] = current.ndvi - current.baseline_ndvi
    current["coverage"] = current.valid_coverage
    counts = history[history.valid_coverage.ge(min_coverage)].groupby("zone_id").date.nunique()
    current["observation_count"] = current.zone_id.map(counts).fillna(0).astype(int)
    fit = history[history.valid_coverage.ge(min_coverage)].copy()
    fit["peer_deficit"] = fit.ndvi.groupby([fit.date, fit.ring]).transform("median") - fit.ndvi
    fit["change"] = fit.groupby("zone_id").ndvi.diff().fillna(0)
    matrix = fit[["ndvi","peer_deficit","change"]].replace([np.inf,-np.inf],np.nan).fillna(0)
    model = IsolationForest(n_estimators=160, contamination="auto", random_state=42)
    model.fit(matrix)
    fit["anomaly_score"] = -model.score_samples(matrix)
    threshold = float(fit.anomaly_score.quantile(0.94))
    current["anomaly_score"] = -model.score_samples(current[["ndvi","peer_deficit","change"]].fillna(0))
    current["quality_ok"] = current.coverage.ge(min_coverage)
    current["history_ok"] = current.observation_count.ge(8)
    current["anomaly"] = current.anomaly_score.gt(threshold) & (current.peer_deficit.gt(0.075) | current.change.lt(-0.07))
    fit["anomaly"] = fit.anomaly_score.gt(threshold) & (fit.peer_deficit.gt(0.075) | fit.change.lt(-0.07))
    window_start = as_of - pd.Timedelta(days=20)
    distinct = fit[fit.anomaly & fit.date.ge(window_start)].groupby("zone_id").date.nunique()
    current["persistence_ok"] = current.zone_id.map(distinct).fillna(0).ge(2)
    current["eligible"] = current.quality_ok & current.history_ok & current.persistence_ok
    current["status"] = np.select([~current.quality_ok,~current.history_ok,current.anomaly & ~current.persistence_ok,current.eligible],["withheld","withheld","pending","inspect"],default="normal")
    current["status_label"] = current.status.map({"inspect":"Candidate · inspect","pending":"Pending persistence","normal":"No task","withheld":"Withheld by quality/history"})
    current["question"] = np.where(current.peer_deficit.gt(0.075),"Check water delivery and sprinkler condition in this radial segment; if normal, refer for crop/soil review.","Review crop stage and recorded management before interpreting this change.")
    tasks = current[current.eligible].sort_values(["sector","ring"]).groupby("sector",as_index=False).agg(zone_id=("zone_id",lambda s:", ".join(s)),sector_name=("sector_name","first"),ring_label=("ring_label",lambda s:", ".join(s)),ring_mid_m=("ring_mid_m","mean"),radius_start_m=("radius_start_m","min"),radius_end_m=("radius_end_m","max"),anomaly_score=("anomaly_score","max"),peer_deficit=("peer_deficit","max"),valid_coverage=("coverage","min"),observation_count=("observation_count","min"),question=("question","first"))
    if not tasks.empty:
        tasks["status_label"] = "Persistent spatial anomaly · review required"
    run_id = f"demo-{pd.Timestamp(as_of).strftime('%Y%m%d')}-v1"
    return Analysis(run_id,"IsolationForest (synthetic demo)",threshold,current,tasks,{"minimum_coverage":min_coverage,"minimum_history_dates":8,"persistence_dates":2,"persistence_window_days":20,"history_dates_available":int(history.date.nunique()),"synthetic":True})
