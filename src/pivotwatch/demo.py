from __future__ import annotations

import numpy as np
import pandas as pd

SECTORS = [f"{start}–{start + 30}° clockwise from north" for start in range(0, 360, 30)]
RINGS = ["inner", "mid-inner", "mid-outer", "outer"]

def build_demo_data(seed: int = 17) -> pd.DataFrame:
    """Create deterministic, explicitly synthetic 10-date observations."""
    rng = np.random.default_rng(seed)
    dates = pd.date_range("2025-01-05", periods=10, freq="12D")
    rows = []
    for day_i, day in enumerate(dates):
        field_base = 0.53 + 0.032 * day_i
        for sector in range(12):
            for ring in range(4):
                ndvi = field_base + 0.012 * ring + rng.normal(0, 0.018)
                # Synthetic persistent localized decline for workflow demonstration.
                if sector == 1 and ring >= 2 and day_i >= 7:
                    ndvi -= 0.19
                coverage = float(np.clip(rng.normal(0.92, 0.07), 0.48, 1.0))
                if sector == 1 and ring == 3 and day_i == 8:
                    coverage = 0.61
                rows.append({"date": day, "zone_id": f"S{sector + 1:02d}-R{ring + 1}", "sector": sector, "sector_name": SECTORS[sector], "ring": ring, "ring_label": RINGS[ring], "ring_mid_m": [50,150,250,350][ring], "radius_start_m": [0,100,200,300][ring], "radius_end_m": [100,200,300,400][ring], "ndvi": float(np.clip(ndvi,0.1,0.9)), "valid_coverage": coverage, "synthetic": True})
    return pd.DataFrame(rows)
