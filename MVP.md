# RAIMAL MVP

**Status:** runnable local demonstration  
**Purpose:** make the planned satellite-to-inspection workflow tangible  
**Evidence status:** synthetic software fixture; no farm outcome validation

## 1. What is implemented

The Streamlit inspection desk demonstrates this user path:

1. Select a historical replay date and a minimum valid pixel coverage.
2. Review a radial/sector pattern for a 400 m illustrative pivot.
3. See candidate zones, supporting observation count, coverage, peer contrast, and a suggested discriminating field check.
4. Record a technician finding, optional measurement, and follow-up action.
5. Download the current task queue as CSV and its run summary as JSON.

The demo generates 480 synthetic zone/date rows (12 sectors × 4 radial bands × 10 dates). A deterministic localized decline exercises the anomaly path; one poor-coverage date exercises the quality behavior. The generated scenario is not imagery, an observed farm, a verified crop, a confirmed fault, or a field performance result. The banner and exports say so explicitly.

## 2. Run locally

Requirements: Python 3.10+ and internet access for the first dependency installation. From the repository root in PowerShell:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
streamlit run app.py
```

Open the local URL printed by Streamlit (usually `http://localhost:8501`). On macOS/Linux, replace the activation line with `source .venv/bin/activate`. `requirements.txt` lists Streamlit, pandas, NumPy, scikit-learn, and Plotly. A Python 3.10+ environment is recommended; use a virtual environment to avoid changing system packages.

The SQLite file `data/pivotwatch.sqlite3` is created automatically when the app starts. Inspection entries stay on that machine. Delete the file while the app is stopped to clear demo records. The SQLite file is ignored by Git.

## 3. App guide

### Analysis controls

- **Historical replay date:** scores only observations at or before the selected date. Each date has a stable demo run ID.
- **Minimum valid pixel coverage:** gates current zones and determines which observations count toward history and persistence. Default: 80%.
- **Field pattern:** radial distance is measured outward from the illustrative pivot center; sectors are arranged clockwise from north. Point colors indicate workflow status, and point size indicates relative model anomaly score. Hover for the zone's NDVI, peer deficit, and coverage.
- **Inspection queue:** adjacent eligible radial zones in one sector are grouped in a single task. The task asks for a check that helps separate water-delivery issues from crop/soil explanations. It does not name a fault.
- **Observation timeline:** plots candidate zone NDVI over valid dates, or the field median when there is no task.
- **Inspection record:** saves finding, optional measurement/unit, and follow-up action with a synthetic marker and UTC record timestamp.
- **Evidence export:** CSV contains task fields; JSON contains run ID, replay date, model label, threshold, gate configuration, tasks, and explicit limitations.

## 4. Analysis behavior

`src/pivotwatch/engine.py` performs a bounded, reproducible analysis for the selected replay date:

1. Truncate generated rows to the selected date.
2. Calculate each zone's peer deficit against the median NDVI for its radial band on that date, and change against that zone's earlier median.
3. Fit an Isolation Forest to coverage-qualified rows in the replay history using `ndvi`, `peer_deficit`, and sequential `change`. Use a fixed random seed. Higher displayed values mean more unusual; they are not probabilities.
4. Set a run-local engineering threshold at the 94th percentile of model scores and apply a directional deficit/change check.
5. Apply coverage (default 80%), history (eight distinct usable dates), and persistence (two anomalous dates in a 20-day window) gates.
6. Group eligible radial neighbors by sector to form inspection tasks.

The threshold and feature behavior are prototype choices. Since the synthetic fixture itself contains a constructed decline, this is a demonstration of code paths and must not be presented as measured model performance. The current model fit includes dates through the selected replay date; evaluating a held-out period requires an explicit frozen development/evaluation split, not this interactive demonstration.

### Gate statuses

| Status | Meaning |
|---|---|
| `inspect` | Candidate passed the current quality, history, and persistence checks; human review is still required. |
| `pending` | Pattern passed the anomaly condition but did not meet persistence. |
| `withheld` | Coverage or usable history is insufficient. |
| `normal` | No current anomaly candidate passed the directional anomaly condition. |

These statuses are about evidence handling. They do not describe equipment health.

## 5. Data and module map

```text
app.py                         Streamlit screens and user actions
src/pivotwatch/demo.py         deterministic synthetic observations
src/pivotwatch/engine.py       features, Isolation Forest, evidence gates, task grouping
src/pivotwatch/storage.py      local SQLite inspection records
requirements.txt               Python runtime dependencies
data/pivotwatch.sqlite3        created on first app run; ignored by Git
```

### Synthetic observation fields

Each generated row represents one illustrative sector/ring on one synthetic date:

| Field | Meaning |
|---|---|
| `date` | Observation date (12-day intervals) |
| `zone_id` | Stable sector/ring ID, e.g. `S02-R3` |
| `sector`, `sector_name` | Zero-based sector and compass label |
| `ring`, `ring_label` | Zero-based radial band and label |
| `ring_mid_m`, `radius_start_m`, `radius_end_m` | Illustrative distance in meters |
| `ndvi` | Synthetic vegetation index value, not computed from bands |
| `valid_coverage` | Synthetic coverage fraction, not derived from a cloud mask |
| `synthetic` | Fixture provenance marker |

### SQLite inspection schema

`inspections` stores a generated row ID, task and zone ID, replay date, finding, measurement text, follow-up action, `is_synthetic`, and UTC `recorded_at`. Workflow records are separate from immutable run evidence in the design. The current MVP has no authentication, multi-user access, or database migration system.

## 6. Exports and provenance

CSV filename: `raimal-<run_id>.csv`. JSON filename: `raimal-<run_id>.json`. Both downloads come directly from the selected replay currently in memory. The JSON includes `synthetic_demo: true` and a limitations list. Inspection records remain local in SQLite and are displayed in the app; this version does not include them in the evidence JSON export. There is no background download, scheduler, external service, or telemetry integration.

## 7. Known limitations and excluded claims

- No STAC search, Sentinel-2 raster download, reflectance scaling, raster alignment, SCL cloud masking, geometry validation, or real NDVI calculation is implemented.
- Demo pivot location, radius, crop, dates, coverage and observations are illustrative. The location label is not a real identified customer field.
- The Isolation Forest is fit on synthetic observations at replay time. It is not trained on confirmed fault labels, and its scores are neither probabilities nor diagnostic outputs.
- The persistence implementation checks anomalous rows in the 20-day replay window, but the prototype does not yet enforce every planned production gate such as stale live data, crop-operation context, field-level decline routing, model artifact versioning, or independent evaluation.
- A recorded demo finding is user-entered synthetic workflow data. It is not corroboration of the generated pattern.
- Precision, recall, time savings, water savings, yield protection, and economic impact have not been measured.
- No live dispatch should be based on this app. A technician/agronomist must verify field evidence in any future deployment.

## 8. Next step to real satellite inputs

The intended data path and source priorities are documented in [data acquisition](data_acquisition.md) and [architecture](architecture.md). A real-data increment should:

1. Obtain a partner-confirmed field boundary, center, crop, season, planting date, and dated operations; preserve unknown values as unknown.
2. Query and save STAC metadata for Sentinel-2 L2A, then cache B04, B08, SCL, and optional display bands for distinct acquisitions.
3. Implement reflectance conversion, a shared 10 m grid, conservative quality masking, and per-zone coverage from actual valid pixels.
4. Replace the synthetic provider with a validated observation table while retaining explicit provenance and source IDs.
5. Separate model development, threshold calibration, and later-date/held-out-pivot evaluation. Freeze the model and threshold before evaluation.
6. Collect technician and agronomist reviewed inspection findings, including unalerted sample zones, before reporting model utility.

Keep the synthetic scenario as a fixture for deterministic workflow demonstrations. Do not mix its rows or technician records with real farm training or evaluation data.

## 9. Relationship to the proposal documents

The original proposal described implementation as future work and was written for a presentation-only deliverable. This MVP now supplies a local software demonstration, so the current status is: **interactive workflow implemented; real-data pipeline and field validation not implemented.** The architecture remains the target data architecture. Proposal success thresholds remain future validation targets, not results.
