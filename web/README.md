# RAIMAL browser demo

From this directory, run `npm ci`, then `npm run dev`. Open the local address printed by Vite. Run `npm run build` to produce the static site in `dist`.

The inspection desk replays the existing Python-generated `public/demo.json` fixture. Date and coverage controls select a precomputed analysis; the browser does not run a new model. The queue, zone statuses, and NDVI history use that selected analysis. All observations are synthetic and inspection prompts are not diagnoses.

Record a demo field check with an outcome and notes. Findings persist only in this browser's local storage and can be exported as JSON. No cloud connection or credentials are required. Private browsing, cleared site data, or a different origin can make previous records unavailable.

Regenerate the fixture from the repository root with `python scripts/export_web_demo.py` after installing the Python requirements.

Browser verification covered loading, recording and reloading findings, JSON download, early-history and strict-coverage withholding, and a 390px mobile viewport. The existing Streamlit interface remains a separate application.
