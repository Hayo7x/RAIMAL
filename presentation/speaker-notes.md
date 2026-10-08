# RAIMAL presenter notes

Eight-slide pitch, five-minute rehearsal assumption. Slides 9–13 support Q&A.

## Slide 1

0:00–0:30. A maintenance manager has several pivots to inspect and limited technician time. RAIMAL turns persistent crop-pattern changes into a specific field check and records what the technician finds. We begin with commercial potato pivots in Wadi Al-Dawasir, during established canopy before harvest. The initial scope is inspection prioritization. It excludes automatic control, real-time pump alarms and image-only fault diagnosis. The local dispatch burden is still a hypothesis to measure. Source: problem_statement.md and presentation_plan.md. Artwork: approved design assets/RAIMAL-logo-final.png, unchanged.

## Slide 2

0:30–1:00. The local study supports spatial monitoring in this crop and setting. It does not measure irrigation-fault prevalence or dispatch burden. Current practice can include routine visits, technician experience, scouting tools and telemetry. We will compare with the actual operator workflow. Our planning scenario assumes 50 pivots, four rounds per month and 30 minutes of decision/search work per round: 100 hours. A 25% reduction would release 25 hours. At SAR 75/hour, that is SAR 1,875 of capacity value, not revenue or guaranteed payroll savings. Travel, repairs and mandatory checks are excluded. Source: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0162219, Methods location Wadi Al-Dawasir; abstract regional wording is inconsistent. Project assumptions: solution_statement.md.

## Slide 3

1:00–1:45. The proposed space-data pipeline masks unusable Sentinel-2 pixels, compares dates and summarizes vegetation by sector bearing and distance from the pivot centre. NDVI is a vegetation index. The implemented synthetic model uses NDVI, peer deficit and temporal change. Isolation Forest is useful for ranking unusual combinations without verified fault classes and runs on a laptop with no GPU. Gates require sufficient coverage and history plus persistence. A technician receives a location and a measurement question. Crop operations, soil differences and cloud gaps can confuse the signal. Crop-operation suppression and stale-live-data safeguards remain proposed. Current replay fitting includes observations through the selected date, so it is not held-out evaluation. Sources: src/pivotwatch/engine.py, demo.py, MVP.md, data_acquisition.md. Existing illustrative asset: web/public/field.svg.

## Slide 4

1:45–2:15. Valley is the closest comparator because its imagery alerts sit within pivot management. OneSoil also provides scouting and a ranked AI list. RAIMAL does not claim that spatial alerts or recorded observations are unique. We will test whether the pivot-specific distance and bearing, measurement question and reviewable outcome fit a local maintenance routine better. The mechanism could reduce location ambiguity and decision time. The cost is extra entry work and dependence on field cooperation. Vendor capabilities rechecked 8 October 2026 using official pages/indexed official extracts: https://emea.valleyirrigation.com/precision-ag/valley-365; https://onesoil.ai/en/platform. No comparative trial or Saudi availability/pricing verification has occurred.

## Slide 5

2:15–3:00. This is the captured result from the existing Python engine, not a live demonstration. The fixture contains 12 sectors by four radial bands by ten dates: 480 rows. At the 23 April replay and 80% coverage gate it produces one sector task, S02-R3, at 30–60 degrees clockwise from north and 200–300 metres from centre. Its question asks the technician to check water delivery and sprinkler condition, then refer for crop/soil review if normal. A direct storage check saved and read back a simulated 180 kPa finding in an isolated SQLite database. CSV output was captured. At the 5 January replay the queue has zero tasks, as expected with insufficient history. These are bounded backend checks. The Streamlit UI suite failed at an unsupported info icon and temporary database cleanup; an end-to-end UI pass is not claimed. Source: captured evidence.json, task-export.csv and synthetic-input.csv; code hashes in evidence.json.

## Slide 6

3:00–3:35. Success means useful inspection decisions. The targets are at least 25% less decision/search time, at least 70% actionable recommendations, and recall no more than five percentage points below the existing workflow. Recall is the share of actionable cases found. Independent review must include sampled unalerted zones so we can detect misses. Freeze the model and thresholds before testing on held-out pivots and later dates, at the same recommendation budget as a simple sector rule. A proposed ML target is ten percentage points higher precision than that rule, with recall and raw counts reported. We seek at least 40 actionable and 40 non-actionable adjudicated cases for preliminary interpretation, report uncertainty and extend if needed. This is a proposed evaluation, not observed performance. Source: solution_statement.md evaluation section.

## Slide 7

3:35–4:30. The proposed adopter and buyer is a farm operations manager. We will recruit one operator through farm or irrigation-service contacts; no partnership is secured. Public Sentinel-2 access, confirmed boundaries and crop calendars, inspection permission and field staff are dependencies. Existing laptops and no new sensors underpin the estimate. A Saudi study at a 47-pivot Al Kharj site supports the broad use of satellite time series. A 400 m radius field contains roughly 5,027 nominal 10 m pixel areas, before masking, which supports broad zones rather than nozzle-level diagnosis. Weeks 1–2 cover access and baseline, 3–10 observation, 11–12 review. Integration or low case counts may extend the schedule. Budget is SAR 13,700 plus SAR 2,740 contingency. Risk one is inadequate optical coverage or spatial detail: merge zones and retain routine checks. Risk two is poor usefulness or too few reliable labels: agronomic review and extended collection. Bilingual task labels and offline synchronization are proposed. Technical precedent: https://repository.kaust.edu.sa/bitstreams/6eed650b-5494-4841-9dae-b7020ef7d1ce/download. Budget: solution_statement.md.

## Slide 8

4:30–5:00. We seek one Saudi potato-farm operator to provide field boundaries, maintenance records and inspection access for a measured pilot. The backend synthetic workflow is demonstrated. Real satellite ingestion, remaining safeguards, field performance and adoption are next to prove. No farm partnership, paid traction, yield gain or water saving is claimed. The next decision is whether this workflow saves inspection time while preserving useful detection. Stop here for the five-minute pitch. Slides 9–13 are Q&A backups.

## Slide 9

Backup B1. Source: src/pivotwatch/engine.py and demo.py. The fit uses first differences for temporal change, while scoring uses a prior-median baseline. Align and freeze the feature definition before a real-data evaluation. Eligibility currently uses quality, history and persistence, so an eligible task need not imply a current threshold exceedance. No model-validity claim follows from the demo. Pixel arithmetic: pi × 400² / 100 = 5,026.5 nominal pixel areas, not an observed usable-pixel count. Sentinel resolution and proposed processing are documented in data_acquisition.md. Scientific precedent: Ma, Johansen and McCabe (2022), https://repository.kaust.edu.sa/bitstreams/6eed650b-5494-4841-9dae-b7020ef7d1ce/download.

## Slide 10

Backup B2. Cost assumptions from solution_statement.md. Engineering SAR 8,000, agronomy SAR 1,800, technician support SAR 2,400, compute/storage SAR 500, travel SAR 1,000. Base SAR 13,700. Twenty percent contingency SAR 2,740. Total SAR 16,440. These are pilot cost allowances, not product pricing or validated willingness to pay. Dependencies include farm-confirmed boundaries and crop calendars, permission to inspect, technician and agronomist availability, public imagery access and laptop geospatial processing. Routine inspections continue during the pilot.

## Slide 11

Backup B3. Proposed pilot: approximately 20 comparable pivots at one operator and eight observation weeks after onboarding. Precision is the share of recommendations that produce independently confirmed action. Recall is the share of independently confirmed actionable cases found, requiring unalerted sampling and accounting for sampling design. Match recommendation budgets for model and rule comparison. Record minutes spent deciding and locating the inspection, separately from travel/repair time. Report denominators and confidence intervals. The 40/40 threshold is an exploratory collection target, not a power calculation or guarantee of strong evidence. Avoid future data in training, feature construction or threshold setting. Source: solution_statement.md and presentation_plan.md.

## Slide 12

Backup B4. Saudi source: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0162219. Use the Methods location because the abstract has inconsistent regional wording. Calculation: (11 × 0.72 + 0.42) / 12 = 0.695, assuming equal-area sectors. This only explains why field averages can obscure a local decline. Valley official capability source: https://emea.valleyirrigation.com/precision-ag/valley-365; supporting case study https://www.valleyirrigation.com/blog/valley-blog/2020/06/23/valley-insights-provides-knowledge-in-arid-conditions . OneSoil source: https://onesoil.ai/en/platform. Vendor descriptions establish advertised capabilities, not comparative effectiveness. No claim is made that either product lacks location, notes, export or task functionality.

## Slide 13

Backup B5. Direct checks executed using the existing src/pivotwatch/demo.py, engine.py and storage.py. Isolated evidence database protects user records. Run ID demo-20250423-v1. Minimum coverage 0.8, minimum history eight valid dates, persistence two dates in 20 days. The normal result is one task; the early result is zero. A stored record with synthetic flag 1 and measurement 180 kPa (synthetic) was read back. Evidence: tmp/presentation-build/evidence.json, synthetic-input.csv, task-export.csv. UI suite: python -m unittest discover -s tests. It fails at app.py st.info icon validation and subsequently during Windows temporary database cleanup. The static web interface uses precomputed output and browser-local findings; it is not evidence of a live model invocation or shared persistence.