# RAIMAL visual pitch notes

Ten main slides, four Q&A backups. Around six minutes, subject to the organizer’s confirmed slot.

## Slide 1

Opening, 25 seconds. RAIMAL helps maintenance managers decide where to send limited technician time. We start with potato pivots in Wadi Al-Dawasir. This is real historical Saudi satellite imagery, not imagery processed by our prototype and not a verified customer field. Image: https://www.esa.int/ESA_Multimedia/Images/2015/07/Agriculture_in_Saudi_Arabia; Copernicus Sentinel data (2015)/ESA, ESA Standard Licence. Both logos are original files, unchanged. KFUPM official asset source: https://mediacenter.kfupm.edu.sa/brand-guidelines/. Product wording derives from problem_statement.md and solution_statement.md. No university endorsement claim is made.

## Slide 2

Problem, 35 seconds. Reuses the problem statement: irrigation managers responsible for multiple center-pivot fields must decide which crop anomalies need a technician, where to inspect and what to check first. The source study examined three 30-hectare potato pivots in Wadi Al-Dawasir. This published map predicts yield in field 67-S using a Sentinel-2 vegetation index. It establishes spatial variability, not irrigation-fault causality or recoverable loss. Soil, disease and management can also explain the pattern. Our local dispatch burden still needs operator logs. Figure 4b is a crop from the original six-panel figure with its legend and scale preserved. Source: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0162219, Al-Gaadi et al., CC BY. More than 200 visible labels are not introduced: only panel b is displayed.

## Slide 3

Market, 35 seconds. A national retrospective study estimated approximately 28,080 fields in 2020, covering 7,028 square kilometres; it reports a slight increase in 2021, without an exact count used here. This is a historical physical footprint, not a current farm/customer count. The same study found contraction from the 2016 peak, so the deck does not imply continuous fleet growth. Source: https://www.mdpi.com/2072-4292/15/3/731, section 4.2.1. GASTAT Agricultural Statistics 2024 reports potato production of 624 thousand tonnes. Source: https://www.stats.gov.sa/documents/20117/2435281/Agricultural%2BStatistics%2B2024%2B%2B-%2BEN.pdf/1d9fef9e-4238-e4c7-4c41-86475ce8241c?t=1764479027952. The serviceable market requires a fresh count of active potato pivots, suitable canopy periods and operators with inspection budgets. Revenue TAM and willingness to pay remain unmeasured. The beachhead is one commercial Wadi Al-Dawasir operator; irrigation contractors are a later channel.

## Slide 4

System, 45 seconds. Real Sentinel-2 surface reflectance and quality masks are the proposed input. The current synthetic engine combines NDVI (vegetation index), deficit versus comparable zones and temporal change. Isolation Forest is the engine, not a pretrained fault classifier. Its random partitions tend to isolate unusual points sooner. The central figure comes unchanged from the official scikit-learn example, using toy clusters; its colour scale is a model decision function, not a crop-health or fault-probability scale. Source: https://scikit-learn.org/stable/auto_examples/ensemble/plot_isolation_forest.html. Our negative score_samples convention makes higher scores more unusual. The green layer shows RAIMAL's quality/history/persistence gating, geometry-based questions and recorded field outcome. Its placement around engine and output communicates orchestration, not changes to the Isolation Forest algorithm. A technician confirms the cause. Crop-operation suppression and stale-live-data protection remain proposed. Satellite image credit: https://www.esa.int/ESA_Multimedia/Images/2015/07/Desert_fields, Copernicus Sentinel data (2015)/ESA.

## Slide 5

Published example, 25 seconds. This slide answers what output from a real satellite model can look like. It uses the input montage and prediction panel from the authors' model-card figure, not a locally executed checkpoint. Panels are cropped from the same published overview but should not be interpreted as registered before-and-after views of the same single tile. HLS harmonizes Landsat and Sentinel observations. This Prithvi checkpoint classifies 13 crop/land-cover categories and has no potato or irrigation-fault class. It is an optional future context experiment in model_selection.md, not RAIMAL's deployed core engine. Do not call this a diagnosis or transfer its evaluation results to Saudi fields. Source: https://huggingface.co/ibm-nasa-geospatial/Prithvi-EO-1.0-100M-multi-temporal-crop-classification, Li et al. (2023), HLS Multi Temporal Crop Classification Model, Apache-2.0 model repository.

## Slide 6

Actual output, 35 seconds. Existing engine, unchanged, fixture seed 17, 480 rows across 48 zones and ten dates. Model: 160-tree Isolation Forest, seed 42. The polar map shows actual synthetic NDVI values in their correct north-up, clockwise sectors and 100 m radial bands. The bars rank the top six zones by negative score_samples. S11-R4 scores 0.688, S06-R3 0.683, S02-R4 0.678, S12-R3 0.661, S02-R3 0.656 and S07-R1 0.646. Higher scores do not establish stress, a fault or severity. Some high-scoring zones have unusually high NDVI. Only S02-R3 passes the current quality/history/persistence gates. The engine groups tasks by sector; this bar ranking is an analysis view, not a claim of severity-sorted queue implementation. Values and source-code hash provenance: presentation/assets/model-zone-output.csv and tmp/presentation-build/evidence.json.

## Slide 7

Task output, 35 seconds. Know where to inspect, what to check and what happened afterward, as the solution statement promises. The curve compares S02-R3 with the same-ring peer median, excluding sector 2 for this explanatory plot. This is descriptive history, not an independently validated detection curve. The selected zone has 86.705% current coverage and ten valid dates. It passes the engine persistence gate. The task text comes from the existing engine decision template: check water delivery and sprinkler condition, then refer for crop/soil review if normal. A direct save/read using the existing storage module preserved an explicitly synthetic 180 kPa record in an isolated database. No physical measurement occurred. Current Streamlit UI test fails at its unsupported info icon, so present the captured result without a live-demo dependency. Source: src/pivotwatch/engine.py, demo.py and storage.py; assets/model-zone-output.csv.

## Slide 8

Value, 30 seconds. The scenario comes from problem_statement.md. Fifty pivots times four rounds per month times 30 minutes of decision/search effort equals 100 hours. At a 25% reduction, 75 hours remain and 25 hours are released. At the assumed SAR 75/hour, capacity value is SAR 1,875/month. These values are not observed savings, payroll reduction, product revenue or pricing. Travel, repairs and mandatory inspections are outside the calculation. Validate minutes and willingness to pay from operator records before any commercial ROI claim. No water savings or yield gains are measured.

## Slide 9

Pilot, 40 seconds. Approximately twenty comparable pivots at one operator, eight observation weeks after onboarding. The operations manager is proposed buyer and task approver, technicians inspect and an agronomist reviews alternative causes. Existing laptops and no new sensors underpin the budget. Compare a frozen ML model with a simple sector rule and the current workflow, with independent review of alerted and sampled unalerted zones. Recall means the share of actionable cases found. If imagery is inadequate, withhold dispatch and retain routine checks or historical review. If usefulness or case counts are inadequate, extend collection and revise before expanding. Boundaries, crop records and permission are dependencies. The full SAR 13,700 base plus SAR 2,740 contingency is in the backup. A Saudi 47-pivot satellite study supports spatial time-series feasibility, not fault identification. Sources: solution_statement.md, https://www.mdpi.com/2072-4292/14/5/1205 .

## Slide 10

Close, 25 seconds. We seek one Saudi potato-farm operator to provide field boundaries, maintenance records and inspection access. The proposed product contribution is a reviewable maintenance decision with a located check and recorded outcome. The immediate test is time saved while preserving useful detection. No partnership, revenue, real-farm accuracy, water saving or yield gain is claimed. Both original logos remain intact. KFUPM asset source: https://mediacenter.kfupm.edu.sa/brand-guidelines/. Stop here for the main pitch. Slides 11–14 are Q&A.

## Slide 11

Valley is the closest competitor because its alerts connect to pivot management. OneSoil already offers satellite monitoring and ranked scouting. No claim is made that either lacks location, notes or exports. Compare actual maintenance fit and time at the target operator. Official sources reviewed: https://emea.valleyirrigation.com/precision-ag/valley-365 and https://onesoil.ai/en/platform . The proposed RAIMAL difference is geometry-based inspection questions and reviewable outcomes; its advantage needs a trial.

## Slide 12

Proposed evaluation only. Freeze features, model and thresholds before testing on held-out pivots and later dates. Match recommendation budgets and compare with current operations as well as a sector rule. Include sampled unalerted zones and account for the sampling design to estimate missed cases. Independently adjudicate actionable equipment or agronomic findings. Seek at least forty actionable and forty non-actionable cases before preliminary rate interpretation; this is not a power guarantee. Additional ML target: ten percentage points more precision than the sector rule, while preserving recall. Report counts and uncertainty, and revise if targets fail. Source: solution_statement.md.

## Slide 13

Budget from solution_statement.md. SAR 8,000 engineering + 1,800 agronomy + 2,400 technician support + 500 compute/storage + 1,000 travel = SAR 13,700. Twenty percent contingency is SAR 2,740, total SAR 16,440. These are pilot allowances, not product pricing or validated willingness to pay. Proposed buyer: farm operations manager. Recruitment, staff availability and field inspection access are outstanding dependencies.

## Slide 14

Evidence captured 8 October 2026. Engine checks use build_demo_data(seed=17), Isolation Forest with 160 estimators and random_state 42, and a 23 April 2025 replay. Gate settings: 80% coverage, eight valid dates and two persistent dates in twenty days. Early replay 5 January yields zero tasks. The saved record is synthetic and uses an isolated database. Existing Streamlit UI test fails at the unsupported info icon and Windows temporary database cleanup; do not claim a live end-to-end pass. Fit-time temporal changes use first differences while scoring uses the prior median baseline, a feature-consistency issue to resolve before real evaluation. Current task eligibility uses quality/history/persistence. Code hashes and captured fixture are in tmp/presentation-build/evidence.json. New output CSV is presentation/assets/model-zone-output.csv.