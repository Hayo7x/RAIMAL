# Real Sentinel-2 presentation example

Source: Copernicus Sentinel-2 L2A, obtained through the [Microsoft Planetary Computer](https://planetarycomputer.microsoft.com/dataset/sentinel-2-l2a) public Data API. Downloaded 8 October 2026. Three acquisitions: 8, 18 and 28 February 2025, tile 38QMH. Each `*-stac.json` preserves the exact item ID, time and original asset URLs.

The files are genuine satellite observations. No image-generation model was used to create the imagery, NDVI maps or measurements.

- `*-bands.npy`: original API response, four planes: B04 DN, B08 DN, SCL, validity mask. Shape 4 × 111 × 104. Raw numeric values retained.
- `*-rgb.png`: the provider's RGB visual asset for the same bounding box, displayed at 520 × 555 pixels. This display resolution does not improve the native spectral resolution.
- `*-ndvi.npy`: computed vegetation index, retaining valid SCL classes 4 and 5.
- `*-ndvi.png`: scientific raster rendering of those measured values, fixed 0–1 scale, nearest-neighbour display; approximate field circle masks the surroundings.
- `real-zone-features.csv`: 48 polar zones per date before coverage filtering; this file contains only zones passing ≥80% valid coverage.
- `real-anomaly-ranking.csv`: actual held-out-date model output.
- `analysis.json`: parameters, measurements, rankings, limitations and raw-array hashes.

Bounding box: `[44.8685,20.341,44.8785,20.351]` (WGS84). Approximate centre: 44.8735 E, 20.34585 N. Radius: 390 m. Geometry is manually estimated, not operator-verified. Zone sectors run clockwise from north; four equal-width radial bands.

For each item, download raw arrays using:

`https://planetarycomputer.microsoft.com/api/data/v1/item/bbox/44.8685,20.341,44.8785,20.351/104x111.npy?collection=sentinel-2-l2a&item=ITEM_ID&assets=B04&assets=B08&assets=SCL`

For the RGB image, use `/520x555.png` and `assets=visual&asset_bidx=visual%7C1,2,3` with the same collection and item. API sampling is approximately 10 m; SCL's native resolution is 20 m. No upsampling is interpreted as new detail.

Processing baseline 05.11: reflectance = (DN − 1000) / 10000, then NDVI = (NIR − red) / (NIR + red). [ESA developer explanation of the offset](https://forum.step.esa.int/t/get-sentinel-2-reflectance-values-from-dn-for-mosaicking/44397/6).

Isolation Forest: 160 trees, seed 42. Fit on 78 high-coverage zone/date rows from 8 and 18 February. Score 28 February without including it in training. Features are median NDVI, same-ring peer deficit, and change since the preceding retained observation. The 94th training-score percentile is an exploratory threshold. The slide shows the highest-scoring lower-vigour candidates, not all unusual greening. Scores are not calibrated severity or fault probabilities.

The February 18 circle has only 67.8% accepted coverage. Only individual zones with ≥80% coverage enter fitting; the whole-field comparison uses February 8 and 28, both 100% accepted coverage within this circle. SCL acceptance does not prove absence of all atmospheric effects.

Crop identity, crop operations and equipment cause are unknown. An initial assessment identifies lower southern vegetation signal on February 28. Management/harvest records and field inspection are needed to determine the cause. Three acquisitions do not satisfy the MVP's eight-date dispatch gate. This offline experiment is separate from the deployed synthetic MVP and establishes no field accuracy.
