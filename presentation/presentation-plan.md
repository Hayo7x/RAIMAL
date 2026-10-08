# RAIMAL presentation plan

## Production revision, 8 October 2026

This revision governs the finished deck in `presentation/`. Retain eight main slides and five Q&A backups. The five-minute slot remains a rehearsal assumption, not an organizer-confirmed limit. Use the captured result on slide 5 instead of depending on a live Streamlit demonstration.

### Stronger narrative and delivery

1. **The next field check** (30s): open on the manager's inspection decision. Establish Saudi potato pivots, limited technician time and crop-stage scope. Use the approved logo unchanged.
2. **The workload worth testing** (30s): distinguish the published Wadi Al-Dawasir potato study from the assumed operational burden. Show 100 hours/month and the 25-hour target, with the formula and scenario qualifier visible.
3. **Satellite evidence to a field check** (45s): visually separate proposed real inputs from the implemented synthetic model and human inspection. Explain location, features and withholding. Use the existing field schematic only as an illustration.
4. **A maintenance task we can test** (30s): acknowledge Valley and OneSoil capabilities. Frame the proposed contribution as a pivot-specific measurement question and recorded outcome. Explicitly retain data-entry cost and unproven superiority.
5. **One located task. One recorded check.** (45s): show captured engine output, the synthetic stored measurement and the zero-task early replay. Label this a captured synthetic replay, not a live end-to-end demonstration.
6. **Pilot success criteria** (35s): emphasize the time, actionability and recall targets. Explain independent labels, unalerted sampling and comparison to a simple sector rule.
7. **A 12-week pilot with one operator** (55s): put schedule and SAR 16,440 estimate on the slide. State imagery and usefulness risks with fallbacks. Name the farm manager as proposed adopter, technician as executor and agronomist as reviewer.
8. **One operator for a measured pilot** (30s): close with the specific request for boundaries, records and inspection access. Separate demonstrated backend behavior from proposed satellite ingestion and field evaluation.

Backups B1–B5 retain model detail, full budget, evaluation protocol, source limitations and demonstration provenance. Speaker notes carry a five-minute talk track and full source URLs. PDF contains the same 13 slides as PPTX.

### Execution evidence now available

- Direct engine check: 480 synthetic rows, 48 zones, 10 dates, seed 17. Latest replay 23 April 2025 produces one sector task: S02-R3, 30–60 degrees clockwise from north, 200–300 m from center. Valid coverage is 86.7%, with 10 valid history dates.
- Early replay 5 January 2025 produces zero tasks. This supports insufficient-history behavior only.
- Direct storage check: a synthetic 180 kPa measurement saves and reads back through the existing storage module in an isolated evidence database. Task CSV export is captured. This is backend verification, not a passing UI flow.
- Existing UI suite fails at the Streamlit info icon (`ⓘ` is rejected), with a Windows temporary-database cleanup error. Do not claim the UI suite passed. No application source changes are part of this presentation build.
- Code hashes, input CSV, task CSV and JSON result are captured in `tmp/presentation-build/`. No field precision, recall, water saving or customer traction has been established.

### Source and design decisions

The approved PNG, Segoe UI and Chalk/Grove/Earth palette govern the deck. Keep editable text and tables, ample whitespace and one dominant composition per slide. Keep provenance and caveats readable, including “planning scenario,” “synthetic replay” and “proposed targets.” Avoid a dense eight-slide checklist or shrinking body text to fit every technical detail.

OneSoil's current platform and Valley's indexed official capability pages were rechecked during production. Neither comparison supports a feature-exclusivity claim. Al-Gaadi et al. supports the local crop setting and spatial variability, not local dispatch burden. The 400 m radius calculation supports nominal broad-zone sampling, not nozzle-level diagnosis.

The detailed planning specification below remains the evidence and rubric reference. Where it still says capture pending or calls for a live demo, this production revision supersedes it.

Prepared 8 October 2026 for the Earth Observation and AI track.

This is the main pitch plan, replacing the sequencing in [the earlier technical outline](presentation_outline.md). The [second-pass rubric review](presentation_rubric_review.md) checks every score-3 and additional score-5 requirement.

## Story and timing

**Central message:** RAIMAL helps a Saudi farm manager turn persistent crop anomalies into specific inspection tasks and record the findings. A synthetic software workflow exists. Real satellite ingestion and farm validation are next.

Use **eight slides in five minutes**, including a short demonstration. Five minutes is a rehearsal assumption: the supplied agenda gives a presentation block, not an individual team limit. Confirm the actual limit and whether Q&A is included before locking the deck.

| Slide | Time | Purpose | Criteria |
|---|---|---|---|
| 1. The inspection decision | 0:00–0:30 | User, situation, consequence and scope | C1, C6 |
| 2. Why Wadi Al-Dawasir | 0:30–1:00 | Local evidence, existing practice and severity | C1, C6 |
| 3. Satellite evidence to inspection | 1:00–1:45 | Inputs, ML, outputs and user action | C3, C4 |
| 4. Our proposed contribution | 1:45–2:15 | Two alternatives, meaningful difference and trade-off | C2 |
| 5. What the prototype demonstrates | 2:15–3:00 | Inspectable operation, acceptance check and failure case | C5, C7 |
| 6. What a successful pilot must prove | 3:00–3:35 | Measurable success and evaluation | C3, C5 |
| 7. Implementation and adoption | 3:35–4:30 | Technical basis, resources, costs, risks and adopter | C4, C6 |
| 8. Current status and pilot request | 4:30–5:00 | Evidence boundaries and specific next step | C6, C7 |

Keep one primary visual or compact table on each slide. Put detailed calculations and full references in notes/backups. Use short source footers and readable type; cut content before shrinking text. Explain NDVI as a vegetation index and Isolation Forest as a model that ranks unusual combinations of crop measurements. Do not spend a separate slide on a cover.

## Slide 1. The inspection decision

**Takeaway:** One manager must decide where a technician should inspect next.

Show the maintenance manager, a suspect ground zone and the decision it creates. Name the initial user as an irrigation/maintenance manager responsible for commercial potato pivots in Wadi Al-Dawasir, supported by technicians and an agronomist.

Explain the situation: several persistent local crop changes compete for limited inspection time. Poor prioritization consumes decision/search time and may delay investigation of an actionable problem.

Define the scope: established crop canopy before harvest, inspection prioritization and recorded findings. Automatic irrigation control, real-time pump alarms and diagnosis of a broken nozzle from an image are outside the initial scope.

**Opening:** “A maintenance manager has several pivots to inspect and limited technician time. RAIMAL turns persistent changes in crop condition into a specific field check and records what the technician finds.”

**Visual:** A labeled illustrative pivot or real prototype capture. A concept image must say “illustrative”; it is not evidence of a Saudi customer field.

**Evidence:** [Problem statement](problem_statement.md). The actual local dispatch burden remains a hypothesis to measure with the first operator.

## Slide 2. Why Wadi Al-Dawasir

**Takeaway:** Local research supports spatial monitoring, and the operational benefit has an explicit calculation.

- Published Saudi research studied three 30-hectare potato pivots in Wadi Al-Dawasir and documented within-field variability. This supports the setting, not an irrigation-fault prevalence claim.
- Current approaches include scheduled visits, technician experience, scouting platforms and equipment telemetry where available. Visits confirm causes; the remaining question is whether a clearer inspection packet reduces prioritization/search effort. Do not claim every local farm uses the same process.
- Show **50 pivots × 4 rounds/month × 30 minutes ÷ 60 = 100 hours/month** of assumed decision/search effort.
- At the **25% reduction target**, this becomes **25 hours/month** released, valued at **SAR 1,875/month** using SAR 75/hour.

Label the calculation **Planning scenario, not measured savings**. Exclude travel, repair time and mandatory inspections. Released capacity is not automatically a payroll saving. Replace assumptions with local logs/interviews during onboarding.

**Visual:** Local study reference and a simple workload calculation. National water statistics are optional context and must not imply product water savings.

**Source:** Al-Gaadi et al. (2016), P1 in [problem_statement.md](problem_statement.md). Use the study's Methods location; the abstract contains inconsistent regional wording. Preserve the source link in slide notes.

## Slide 3. Satellite evidence to inspection

**Takeaway:** Space data locate changes, ML ranks unusual patterns, and a human confirms their cause.

Explain this sequence with explicit implementation labels:

1. **Proposed real inputs:** Sentinel-2 imagery and quality masks, confirmed field geometry, crop calendar and operations.
2. **Proposed preparation:** mask unusable pixels, compare dates and compute vegetation-index summaries by ring/sector.
3. **Implemented on synthetic rows:** Isolation Forest uses vegetation index, peer deficit and temporal change; quality/history/persistence gates control the queue.
4. **Implemented workflow:** a location and inspection question reach the technician, who records a finding and follow-up action.
5. **Proposed evaluation:** reviewed field outcomes and later observations establish usefulness.

Explain suitability: repeated satellite observations provide spatial context; Isolation Forest can rank anomalies without verified fault classes, which are currently scarce. Its score is not a probability of equipment failure. Python/scikit-learn runs on a laptop without a GPU.

**Boundary:** Cloud gaps, crop operations and soil differences can confuse the signal. Human inspection confirms causes. Quality/history withholding exists in the demo; stale-live-data protection and crop-operation suppression remain proposed. Current replay fitting includes observations through the selected date and does not establish held-out performance.

**Visual:** One clear process diagram distinguishing proposed real inputs from implemented synthetic processing. Explain ring distance and sector bearing in plain language.

**Sources:** [MVP.md](MVP.md), [engine.py](src/pivotwatch/engine.py), [architecture.md](architecture.md), [data_acquisition.md](data_acquisition.md).

## Slide 4. Our proposed contribution

**Takeaway:** The contribution to test is a pivot-specific inspection question and documented outcome.

| Approach | Capability documented in project research | Comparison to test |
|---|---|---|
| Valley Insights / Valley 365, closest alternative | AI imagery alerts for crop/irrigation issues within pivot management | Does our exportable ring/sector packet fit the target maintenance routine better? |
| OneSoil | Satellite monitoring, scouting and AI priorities using field context | Does a specific check with recorded outcome save time beyond a ranked scouting list? |
| RAIMAL | Synthetic implementation of located tasks and recorded findings | Measure workflow usefulness with the target operator; superiority is unproven. |

Explain the mechanism: distance and bearing reduce location ambiguity, a requested measurement guides the next check, and recorded findings support review. These could improve usability and decision time. The trade-offs are additional data entry and dependence on field cooperation.

**Supporting calculation in backup:** One of twelve equal sectors falls from NDVI 0.72 to 0.42; the field average remains 0.695. This supports local summaries over a field average. It does not prove an advantage over products that already provide spatial alerts.

**Sources:** Alternative descriptions and vendor links in [problem_statement.md](problem_statement.md) and [solution_statement.md](solution_statement.md). Recheck advertised capabilities before making fresh “current” claims in the final deck. Do not use unsupported checkmarks suggesting competitors lack features.

## Slide 5. What the prototype demonstrates

**Takeaway:** A synthetic workflow exists, with a clear limit on what it proves.

Use a 35-second prepared recording or rehearsed local demonstration and ten seconds for the evidence conclusion. Keep **Synthetic demonstration; no real farm diagnosis** visible.

1. Show the input summary: 12 sectors × 4 radial bands × 10 dates = 480 generated rows, replay date and minimum coverage.
2. Show model output, a queued ground zone and its inspection question.
3. Save a simulated technician finding and display the stored record. Show export availability without spending stage time downloading.
4. Switch to an early replay with insufficient history and show the empty queue/withheld state.

**Capture before slide production:** input fixture, code version, replay date, gate settings, actual queue output, saved synthetic finding, exported evidence and test log. [tests/test_ui.py](tests/test_ui.py) exercises navigation, finding persistence, an early replay and a coverage-control change. A test definition is not a passing result.

**Acceptance check:** Run the existing test and report actual versus expected results for a normal demo producing a task and preserving a synthetic finding, and an insufficient-history replay producing zero tasks. These checks support bounded workflow validation. They do not measure precision, recall or superiority to a sector rule.

**Failure interpretation:** State exactly what the early replay proves about insufficient-history handling. Do not generalize to clouds, stale live inputs, harvest or all invalid data. The existing coverage check follows the early replay, so it does not independently prove that coverage caused withholding.

**Fallback:** Saved recording and exported evidence if live software fails. Label a static web replay as precomputed; a screenshot alone does not prove a live model run or durable save.

**Current evidence status:** Code and test definitions inspected for this plan; no new execution performed. Capture the actual results before labeling this slide “tested.” A synthetic end-to-end workflow is not a completed satellite-ingestion demonstration.

## Slide 6. What a successful pilot must prove

**Takeaway:** Success means useful inspection decisions.

| Proposed acceptance target | Measurement and reason |
|---|---|
| At least 25% less decision/search time | Compare logged minutes with the operator's current workflow; directly addresses limited staff time. |
| At least 70% actionable recommendations | Independently adjudicate issued tasks; limits wasted inspections. |
| Recall no more than five percentage points below current workflow | Inspect a sample of unalerted zones as well as alerts; faster decisions must not hide actionable problems. |

Define actionable as an independently confirmed equipment or agronomic action. Explain recall as the share of actionable cases found.

Compare a simple sector rule with a frozen ML model on held-out pivots/later dates at the same recommendation budget. An additional proposed ML target is ten percentage points higher precision, with recall and raw counts reported. This is a target, not a result.

Plan approximately 20 comparable pivots at one operator for eight observation weeks after onboarding. Seek at least 40 adjudicated actionable and 40 non-actionable cases before interpreting preliminary rates; report uncertainty and extend collection if needed. Do not imply this case count is guaranteed.

Explain responses: inadequate imagery means withholding dispatch and retaining routine checks; crop/soil explanations require agronomic review. Failed ML or time-saving targets require revision before expansion.

**Source:** Evaluation section in [solution_statement.md](solution_statement.md). Put detailed sampling and definitions in backup B3.

## Slide 7. Implementation and adoption

**Takeaway:** A costed route to a local pilot exists, with explicit risks and fallbacks.

- **Technical support:** Saudi research used Sentinel-1/2 at an Al Kharj farm with 47 pivots. A hypothetical 400 m radius pivot contains about 5,027 nominal 10 m pixel areas before masking. This supports broad zone summaries, not narrow-nozzle detection or physical diagnosis.
- **Resources/access:** public Sentinel-2 catalogue access, farm-confirmed boundaries/calendar and inspection permission, laptop-based geospatial processing, engineering, technicians and agronomic review. Catalogue records do not prove completed pixel processing.
- **Timeline:** weeks 1–2 for operator recruitment, baseline and field verification; weeks 3–10 for observation/inspection; weeks 11–12 for review. Real-data integration or insufficient cases may require extension.
- **Pilot budget: SAR 16,440**, comprising SAR 13,700 base plus 20% contingency. Base allowances: engineering 8,000; agronomy 1,800; technician support 2,400; compute/storage 500; travel 1,000. Existing laptops and no new sensors assumed. These are planning estimates, not quotes.
- **Risk 1:** too few usable observations or inadequate spatial detail. Mitigate with coverage checks, merged zones and cached evidence. Fallback: dated historical analysis and routine inspection.
- **Risk 2:** anomalies fail to produce useful local actions or enough verified cases. Mitigate with crop records, independent labels and unalerted sampling. Fallback: agronomic review and extended collection without diagnosis claims.

**Adoption:** Farm operations manager is the proposed buyer and task approver. Existing technicians inspect; an agronomist resolves competing crop explanations. Recruit one cooperating operator through farm or irrigation-service contacts. Proposed bilingual labels and exportable records fit the maintenance process. No partnership is secured or implied. Field connectivity and optical gaps inform caching and future offline synchronization; label these by actual implementation status.

**Visual:** Simple timeline with concise cost and risk annotations. Keep detailed budget/sources in backup B2, but mention both risks and their responses during the main talk.

**Sources:** Scientific basis, resources and adoption sections in [solution_statement.md](solution_statement.md), and [data_acquisition.md](data_acquisition.md).

## Slide 8. Current status and pilot request

Show three short status lines:

- **Implemented:** synthetic anomaly analysis, inspection queue, local finding records and evidence export.
- **Tested:** only checks with saved execution results. At planning time, test definitions exist and capture is pending.
- **Proposed:** real satellite ingestion, remaining safeguards, independently evaluated ML and a Saudi farm pilot.

Keep **25% time reduction: target** separate from actual software results. Do not claim water savings, yield gains, validated pricing, traction or Saudi fault-detection accuracy.

**Closing:** “We are seeking one Saudi potato-farm operator to provide field boundaries, maintenance records and access for a measured pilot. Our next decision is whether this workflow saves inspection time while preserving useful detection.”

## Backups and Q&A

| Backup | Material | Questions supported |
|---|---|---|
| B1. Data and model | Actual three demo features, fit/threshold behavior, proposed preprocessing, catalogue IDs, resolution calculation | Where is the AI? Are these real satellite inputs? |
| B2. Cost and dependencies | Itemized budget, labor assumptions, timeline and farm access | What does it cost? What could block it? |
| B3. Validation | Actionability definition, unalerted sampling, fixed evaluation split, baseline and uncertainty | Why not a threshold? How will you find missed cases? |
| B4. Alternatives and local evidence | Source links, capability comparison, study limits and 0.695 calculation | Why not Valley/OneSoil? What supports the Saudi need? |
| B5. Demonstration evidence | Inputs, outputs, version, saved test log and failure replay | What actually works? When does it withhold? |

Answer directly, then provide evidence and name uncertainty:

- **Is the model trained?** The demo fits Isolation Forest on synthetic observations at replay time. No held-out real-farm evaluation exists.
- **Can it identify a broken sprinkler?** It suggests a location and check. Field measurements confirm causes.
- **What is original?** The proposed contribution is a geometry-based inspection question and documented outcome. Its advantage needs testing.
- **How much water does it save?** No measured water saving exists. Initial evaluation focuses on decision/search time; water impact needs metered comparison.
- **Is SAR 1,875 revenue or cash saving?** Neither. It is the assumed capacity value of 25 hours.
- **What if ML loses to the baseline?** Report it and revise the model/features; do not claim an ML advantage.

## Production sequence

1. Confirm presentation/Q&A time and demo format. For three minutes, allocate 20/20/30/20/30/20/25/15 seconds to slides 1–8 and use a shorter saved demo; rehearse to check readability at this pace.
2. Capture the synthetic workflow and actual existing-test results. Preserve provenance and limitations.
3. Assemble source footers and the evidence bundle. Recheck external product claims before final slide copy.
4. Build eight main slides and five backups. Keep essential rubric arguments in the main talk; backups supply depth.
5. Rehearse with transitions and demo playback inside a hard stop. Use a mock Q&A to practice direct evidence-backed answers.
6. Repeat the [rubric review](presentation_rubric_review.md) on the actual deck and saved results.

## Source hierarchy and review notes

The official [Rubric.pdf](Guidlines%20and%20files/Beyond_Horizons%27_30-Hour_Challenge_Invitation/Rubric.pdf) governs requirements. Its existing rendered page was inspected alongside Rubric.xml. The PDF names both tie-breaker criteria but does not explicitly order them; the XML adds “then.” The folder README incorrectly says six criteria; there are seven.

Prefer inspected code and [MVP.md](MVP.md) for current implementation status. Older proposal statements that no software/model exists are stale. Their proposed pipeline, budget and pilot remain useful planning inputs. Sources summarized in the supplied materials were not freshly researched for this planning task.
