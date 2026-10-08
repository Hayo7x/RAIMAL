# RAIMAL

RAIMAL is a satellite assisted inspection workflow for center pivot irrigation maintenance. It ranks unusual crop patterns by pivot sector and radial distance, then turns persistent evidence into an inspection question that a technician can answer and record.

## Current deliverable

The workspace now includes a runnable **local MVP**. It demonstrates the inspection workflow with an Isolation Forest and a deterministic, synthetic 10-date dataset. **It does not yet ingest Sentinel-2 imagery, validate a Saudi farm boundary, or establish that any anomaly is an irrigation fault.** Every synthetic field, observation, and recorded result is labeled as demo material.

### Run it

Requires Python 3.10 or newer. From the project directory in PowerShell:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
streamlit run app.py
```

Streamlit prints a local address, normally `http://localhost:8501`. The app creates `data/pivotwatch.sqlite3` on first run to save local demo inspection entries. To reset saved entries, stop the app and delete that database file.

The app opens on a designed landing page with an illustrative pivot schematic and a three-step workflow. Select **Explore the inspection demo** or **Inspection desk** to open the working analysis interface. **Overview** returns to the landing page. The desk follows the inspection sequence: field pattern, task queue, evidence timeline, and recorded field check. Replay controls are in the sidebar (expand it on smaller screens).

Presentation styles and the landing page live in `src/pivotwatch/ui.py`; the shared Streamlit palette is in `.streamlit/config.toml`. All artwork is a local vector schematic, with no external image or font dependencies.

After installing dependencies, run `python -m unittest discover -s tests` to check navigation, date and coverage controls, and saving a synthetic finding. The test uses a temporary database, leaving local inspection records untouched.

See [MVP documentation](MVP.md) for setup details, app behavior, implementation map, decision rules, exports, limitations, and the path to real imagery.

## Project documentation

- [MVP: user guide and implementation reference](MVP.md)
- [Architecture and data pipeline](architecture.md)
- [Data acquisition guide](data_acquisition.md)
- [Model selection](model_selection.md)
- [Problem statement](problem_statement.md)
- [Solution statement](solution_statement.md)
- [Rubric alignment and pitch guide](rubric_alignment.md)
- [Presentation plan](presentation_plan.md) and [complete rubric review](presentation_rubric_review.md)
- [Earlier presentation technical narrative](presentation_outline.md)
- [Background research](pivotwatch_research.md) and [source directory](pivotwatch_sources.md)

The research and proposal documents were prepared 7 October 2026. They describe intended product behavior and validation targets; those targets are not MVP performance results. The MVP implementation is separately described in [MVP.md](MVP.md).
