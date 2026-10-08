# RAIMAL: Solution Statement

**Domain:** Earth Observation and AI  
**Prepared:** 7 October 2026  
**Product promise:** Know where to inspect, what to check, and what happened afterward.  
**Companion:** [Problem statement](problem_statement.md) · [Rubric and pitch guide](rubric_alignment.md)

## Submission-ready statement

RAIMAL is a proposed satellite-assisted inspection tool for Saudi center-pivot maintenance teams. Starting with potato farms in Wadi Al-Dawasir, it converts repeated crop observations into a short queue of locations worth inspecting. Each task includes a map, distance from the pivot center and compass sector, observation dates, alternative explanations, and the next measurement needed to distinguish them. Technicians record what they find, and later imagery supports follow-up.

The system uses Sentinel-2 optical imagery and an Isolation Forest machine-learning model to identify unusual combinations of spatial contrast and change over time. Crop-stage records, image-quality checks, and persistence rules control which anomalies become inspection recommendations. The model detects unusual crop behavior; a technician or agronomist confirms its cause.

Our proposed contribution is a pivot-specific maintenance workflow that connects ring-and-sector patterns to an explicit inspection question and a documented outcome. Existing products, including Valley Insights and OneSoil, already provide AI scouting and anomaly alerts. We will test whether this narrower workflow reduces decision and search time beyond the operator’s current approach, rather than assume commercial superiority.

The pilot target is at least 25% less decision/search time with at least 70% actionable recommendations and no material loss of detection recall. A transparent 50-pivot scenario values the target time reduction at SAR 1,875 per month. That is an estimate of released staff capacity; water savings and yield protection require separate measurement. Current evidence consists of research, this design, and a worked analytical example. A working ML pipeline and farm validation remain to be completed.

## How it works

| Step | Inputs and processing | Output and user action |
|---|---|---|
| 1. Define the field | Manager supplies boundary, center, crop, planting date, and known harvest or management zones. | A crop mask and comparable analysis zones; manager confirms the geometry. |
| 2. Check observations | Retrieve dated Sentinel-2 surface-reflectance scenes; mask clouds, shadows, unusable pixels, and field edges. | Per-zone coverage and freshness; insufficient evidence is visible. |
| 3. Describe crop behavior | Calculate NDVI, a red/near-infrared vegetation index; summarize radial bands and angular sectors across valid dates. | Local contrast, change from prior observations, and persistence features. |
| 4. Apply ML | Fit Isolation Forest to historical feature vectors from comparable crop stages; score unseen dates. | Anomaly ranking, with model version and input records. |
| 5. Select inspections | Require usable observations and persistent evidence; compare crop operations and whole-field trends. Group adjacent flagged zones into one task. | A bounded queue with location, evidence strength, and missing context. |
| 6. Ask a diagnostic question | Apply an explicit decision table to pattern, crop records, and available measurements. | Possible causes and a discriminating check, such as pressure/nozzle inspection versus agronomic review. |
| 7. Record and follow up | Technician logs measurement, finding, action, and date; compare later valid observations. | Inspection history and observed post-action change, with unresolved cases retained. |

Space data supply repeated spatial observations across the farm. ML combines several anomaly features into a ranking. The rule layer controls validity and inspection advice; it is not presented as a trained fault classifier. No language model is required for the MVP.

## The technical contribution

An Isolation Forest learns which feature combinations are unusual by repeatedly partitioning observations. It is suitable for an initial anomaly model when verified fault labels are scarce, but its score is not a probability of equipment failure. Official scikit-learn documentation supports the method; local usefulness remains an empirical question. [S1]

Proposed features are local NDVI deficit against comparable crop zones, change from the zone’s earlier valid observations, radial contrast, angular contrast, and the proportion of neighboring cells with a similar change. Exclude invalid observations before modeling. Compare like crop stages and reset or suppress comparisons around harvest and replanting. Preserve a separate whole-field trend so broad stress is not erased by comparisons within the field.

For the prototype, start with 12 compass sectors and several radial bands, merging cells with too few valid pixels. Initial engineering gates are at least 80% valid crop-pixel coverage per analyzed cell, at least 30 valid 10 m pixels, and two anomalous valid observations no more than 20 days apart. Display the newest acquisition date; observations older than 15 days cannot generate a current dispatch recommendation. These are adjustable design choices requiring validation, not agronomic standards.

Use a minimum of eight historical usable dates across selected comparable pivots as an initial data gate, with at least two later dates reserved for demonstration. This is an availability threshold, not proof of statistical sufficiency. Fit preprocessing and model settings on development data only. Freeze the alert threshold before evaluation; do not force a fixed percentage of every field to be anomalous. If data are inadequate, show “insufficient history” and an exploratory map without a dispatch recommendation.

**Geometry matters.** A persistent radial location can correspond to an equipment position along a rotating pivot; an angular pattern may be associated with operating or management differences. These associations suggest checks, not unique causes. Ring patterns must be compared across radii: comparing only neighbors on the same ring could miss an entire affected ring. Report a ground zone and distance range, not a nozzle number without equipment configuration and field confirmation.

**Scientific basis.** Saudi research has used Sentinel-1 and Sentinel-2 to study irrigation and crop dynamics at an Al Kharj farm with 47 center-pivot fields. This supports the use of satellite time series in the local setting, but does not validate RAIMAL’s fault identification. [S2]

**Resolution check.** A hypothetical 400 m radius pivot covers π × 400² ≈ 502,655 m², or 50.3 ha. It contains approximately 5,027 nominal 10 m pixel areas before masking. A 30° wedge contains about 419 such pixel areas before further subdivision. This supports sector summaries at an appropriate scale. Pixels are spatially correlated; these counts do not represent independent samples or guarantee detection of a narrow sprinkler fault. Sentinel-2 provides 10 m red and near-infrared bands and a nominal five-day equatorial revisit design; usable observations can be less frequent. [S3]

## A technician’s inspection packet

**Illustrative scenario; no real fault or field measurement is asserted.**

> **Pivot P07: inspect the northeast outer zone.** A local vegetation deficit appears on two usable observations. Review the attached map and observation dates. The crop calendar contains no recorded harvest, but management records may be incomplete. Possible explanations include uneven water delivery and soil or crop variation. Check pressure and sprinkler condition at the corresponding radial segment; if delivery is normal, refer the zone for agronomic inspection. Equipment telemetry is unavailable. Cause remains unconfirmed.

The packet contains coordinates, a ground polygon, radial distance range, compass bearing, image dates, quality status, observed trend, alternative explanations, and the requested check. Field entry should support concise Arabic and English labels. An exportable task provides a first integration route without dependence on a vendor API; offline synchronization is a later feature.

The proposed decision table makes the advice inspectable:

| Evidence pattern | Inspection question | How the answer changes the task |
|---|---|---|
| Persistent radial contrast, no recorded crop operation | Is water delivery at the corresponding equipment segment abnormal? | Record pressure/nozzle findings; refer to maintenance only if a fault is confirmed. Otherwise seek soil/crop evidence. |
| Local anomaly overlaps a recorded harvest or treatment | Does the operation explain its timing and footprint? | Mark as an explained management change or retain for agronomic review; do not infer equipment failure. |
| Most of the field changes together | Is the cause crop stage, weather, irrigation schedule, or a farm-wide operational event? | Route a whole-field review rather than naming an individual sprinkler. |
| Inadequate quality, history, or temporal persistence | Is there enough usable evidence to prioritize a visit? | Withhold automated dispatch and request a later observation or manual assessment. |

This changes the proposed user action from reviewing a stress map to answering a defined field question and recording the result. The expected advantage is less interpretation and repeat investigation; the trade-off is extra structured entry by technicians. Compare completion time and repeat-visit rate against the existing scouting workflow to determine whether that trade-off is worthwhile.

## Comparison with alternatives

| Alternative | Existing strength | Proposed added value to test | Trade-off or limitation |
|---|---|---|---|
| **Valley Insights / Valley 365 — closest product** | AI imagery-based crop and irrigation alerts connected to pivot management. [S4] | A portable inspection packet linking pivot geometry, a specific diagnostic check, technician evidence, and follow-up within the chosen Saudi workflow. | Considerable overlap; incumbents may already meet the need and can offer deeper equipment integration. Public pages do not establish absence of our proposed features. |
| **OneSoil** | AI field priorities, satellite context, and scouting tools. [S5] | Radial and angular maintenance interpretation and structured confirmation of an irrigation hypothesis. | A narrower crop/equipment focus; less broad agronomic functionality. |
| **Current manual workflow plus available telemetry** | Experienced technicians and direct equipment measurements | Reduce search effort by giving a spatial shortlist and comparable evidence history. | Optical observations are delayed and can miss faults; telemetry remains better for immediate equipment alarms. |
| **Simple sector threshold** | Cheap, understandable, easy to audit | Test whether combining spatial and temporal features with ML improves prioritization at the same alert budget. | ML may add complexity without improving results; retain and report the baseline comparison. |

The defensible novelty claim is a specific application and workflow integration. The rubric explicitly allows meaningful adaptations of existing technology. Comparative accuracy, lower total cost, Saudi exclusivity, and unmatched features are not established.

## Worked analytical example: why spatial evidence matters

This calculation is an inspectable design illustration. Inputs are deliberately constructed. It is neither an ML run nor an analysis of a Saudi satellite scene.

Assume 12 equally sized sectors with complete, valid crop observations. Set a simple field-average alert threshold at NDVI < 0.60. Set a sector comparator to flag a local deficit greater than 0.15 on two valid observations. Thresholds are illustrative, not claimed optimal.

| Observation | Sector A | Each of the other 11 sectors | Field mean | Sector A deficit from peers |
|---|---:|---:|---:|---:|
| Earlier baseline | 0.72 | 0.72 | 0.720 | 0.00 |
| Usable date 1 | 0.42 | 0.72 | (0.42 + 11 × 0.72) ÷ 12 = **0.695** | **0.30** |
| Usable date 2 | 0.42 | 0.72 | **0.695** | **0.30** |

The field-average threshold issues no alert, while the sector comparator identifies A after the second valid observation. It meets the limited analytical requirement “preserve a persistent local anomaly that an average can conceal.” This result explains the spatial design; it does not prove superiority over either commercial competitor, which already supports spatial monitoring, or prove ML adds value.

Two boundary cases clarify applicability. If date 2 has only 40% valid coverage in A, it fails the proposed 80% gate: the persistent recommendation must remain pending. If all 12 sectors fall to 0.42, their local contrast is zero: route the whole-field decline for crop/weather/management review. Neither case justifies labeling a broken sprinkler. These are worked design cases; implementation reliability must still be tested in executable software.

## Success criteria and validation

All thresholds below are proposed acceptance criteria. No field outcome has yet been measured.

| Question | Comparison and acceptance criterion | Evidence to retain |
|---|---|---|
| Does the workflow save effort? | At least **25% lower mean decision/search time** per comparable pivot-round against the operator’s current process; also report the median. Record travel and repair separately. | Round and task timestamps, workload, user, method, and outcomes; use a counterbalanced assignment to reduce learning effects. |
| Are recommendations useful? | At least **70% actionable precision**: confirmed actionable tasks ÷ inspected recommended tasks. Count inconclusive inspections as unconfirmed in this primary calculation. | Technician findings and agronomist adjudication; report uninspected tasks and confirmation coverage separately. |
| Does prioritization miss important cases? | Recall no more than **5 percentage points below** the baseline on the same independently assessed evaluation set. | Independently sampled alerted and unalerted zones, including entire-field inspections where practical; account for unequal sampling probabilities. |
| Does ML add value? | Target **10 percentage points higher precision** than the simple sector comparator at an equal recommendation budget, with recall reported. | Frozen data split, model, thresholds, feature table, baseline outputs, and complete confusion counts. This is a testable target, not a promised gain. |
| Does it fail safely? | No current dispatch recommendation for deliberately invalid/stale inputs; no confirmed-fault label from satellite evidence alone. | Executable cloud, stale-data, missing-history, and harvest cases; expected versus actual output. |

Start with approximately 20 pivots, one crop and comparable growth stages, at one operator over eight weeks after onboarding. Obtain crop operations and maintenance records and agree what “actionable” means: an inspection that identifies a specific equipment or agronomic action, independently confirmed. Randomly inspect some unalerted zones; evaluating only alerts cannot estimate missed cases. Separate pattern labels from verified physical causes.

Aim for at least 40 independently adjudicated actionable cases and 40 non-actionable cases before interpreting preliminary detection rates; the pilot may not generate that many. Report raw counts and uncertainty, and extend collection if evidence is insufficient. Account for repeated observations within the same pivot. Hold out pivots and later dates where possible; do not divide adjacent pixels randomly between training and evaluation. A one-farm result supports only that deployment setting.

An inconclusive or failed result is useful: weak ML gains require model or feature revision; high alert burden requires threshold/context changes; low staff time savings may mean the product should become a feature of an existing platform. Do not claim a successful pilot unless its pre-agreed criteria are met.

## Implementation, resources, and costs

**MVP stack:** Python; rasterio/GeoPandas for geospatial processing; scikit-learn for Isolation Forest; Streamlit for a compact map-and-task interface; local JSON/SQLite records. Use a laptop, predownloaded Sentinel-2 scene subsets, and manual boundary/crop entry. A GPU, new sensors, live telemetry integrations, radar fusion, and paid imagery are unnecessary for the first demonstration.

**Access dependencies:** verify Copernicus account/API access and selected scene availability before the event; retain scene identifiers, acquisition times, processing metadata, and attribution. Farm boundaries, operation logs, and technician access need a cooperating operator. Data access is open at source, but compute, storage, and support are not automatically free. [S3]

The invitation calls the event a 30-hour challenge, but the supplied agenda lists **four working hours on day 1 and 1.5 hours on day 2**. Plan around those 5.5 scheduled hours; confirm any permitted preparation or overnight work. With an assumed three-person team, this yields 16.5 person-hours, not 30 hours per person.

| Stage | Work and output |
|---|---|
| Before event, if permitted | Prepare access and a small dated imagery cache; otherwise disclose and use synthetic fixtures until real inputs can be retrieved. |
| Day 1, first 2 hours | One member prepares valid sector features; one prepares model and comparator; one builds the task view and evidence record. |
| Day 1, next 2 hours | Connect a complete case: input → quality gate → ML score → inspection packet → finding. Save an inspectable run and one failure case. |
| Day 2, 1.5 working hours | Reproduce results, finish a short recording, document limitations, and rehearse within the confirmed pitch limit. |
| Pilot preparation, weeks 1–2 | Recruit one operator, capture baseline process, verify boundaries/calendar, and agree evaluation protocol. |
| Pilot observation, weeks 3–10 | Run eight weeks of inspection logging and independent sampling; review quality and collect outcomes. |
| Pilot review, weeks 11–12 | Compare results, costs, and user adoption; decide whether to expand to another farm and season. |

**Planning budget, not supplier quotes:**

| Resource | Assumption | Estimated SAR |
|---|---|---:|
| Hackathon incremental cash | Existing laptops and free software; optional storage/hosting | 0–150 |
| Hackathon effort value | 16.5 person-hours × SAR 75/hour | 1,237.50 |
| Pilot engineering | 80 hours × SAR 100/hour | 8,000 |
| Agronomist review | 12 hours × SAR 150/hour | 1,800 |
| Technician evaluation support | 24 hours × SAR 100/hour, incremental to routine work | 2,400 |
| Pilot compute/storage | Two months × SAR 250 | 500 |
| Travel allowance | One planning allowance; actual geography may change it | 1,000 |
| Pilot contingency | 20% × SAR 13,700 | 2,740 |
| **Pilot total** | Labor may be contributed in kind; hardware purchases excluded | **16,440** |

The 24 technician hours are an allowance, not assurance that all proposed labels can be gathered. Revise the budget if inspection demand, travel, or the required sample exceeds it.

**Two consequential implementation risks:**

1. **Too few usable observations or insufficient spatial detail.** Cache real imagery for reproducible demos, show coverage and age, merge small cells, and withhold unsupported dispatch recommendations. Fallback: historical analysis with explicit dates and routine technician inspection. Finer imagery or radar is a later option requiring separate evaluation.
2. **Anomalies fail to translate into useful local maintenance decisions.** Harvest, soil, disease, and crop stage may dominate the signal, and a partner may supply too few confirmed cases. Mitigate with one-crop scope, operation logs, independent labels, unalerted sampling, and comparison with existing practice. Fallback: descriptive maps and agronomist review while evidence accumulates; no unvalidated fault diagnosis.

## Saudi adoption and measurable value

The first adopter is one commercial farm operations team in Wadi Al-Dawasir. The manager imports boundaries and approves tasks; existing technicians conduct inspections; an agronomist resolves competing crop explanations. Exportable records fit an existing maintenance process. Use concise bilingual task labels, preserve access to cached evidence, and avoid making a live equipment API a condition of entry. These are proposed design adaptations; no customer partnership is claimed.

Recruit through irrigation service firms, university agricultural researchers, and farm contacts. FAO–SIO activity provides evidence of a local irrigation-adoption ecosystem, not an agreed sales channel. [P3 in the problem statement]

The primary benefit calculation is **50 pivots × 4 rounds/month × 30 minutes × 25% ÷ 60 = 25 hours/month**, or SAR 1,875 of capacity at SAR 75/hour. Its basis is a transparent workflow model; interviews and time logs must replace the assumed inputs.

For a pricing experiment, test SAR 20 per pivot per month, conditional on demonstrated value. At 50 pivots this is SAR 1,000/month. An assumed SAR 250 of hosting plus four support hours at SAR 100/hour leaves SAR 350 before sales, overhead, development recovery, and taxes. At only 20 pivots the same assumptions produce a SAR 250 monthly shortfall. These calculations expose the need for portfolio scale or lower support effort; neither the price nor demand is validated. The 50-pivot customer’s modeled capacity benefit exceeds the trial price, but is not guaranteed cash return.

Treat water and yield effects as secondary research outcomes. Water conservation requires measured volume and a credible comparison adjusted for weather, crop stage, and area; yield protection requires harvest evidence. Later greening is only an observed change and cannot establish either outcome by itself.

## Evidence status at preparation

| Status | What can be claimed |
|---|---|
| Completed | Review of official rubric, challenge invitation and agenda; source-backed problem framing; architecture; comparative reasoning; worked spatial calculation; budget and evaluation design. |
| Analytically illustrated | A field average can hide a local deficit under the stated synthetic inputs and thresholds. |
| Proposed | Satellite pipeline, trained anomaly model, inspection application, bilingual tasks, feedback storage, and pilot. |
| Not demonstrated | Executable end-to-end operation, held-out ML performance, Saudi fault diagnosis, customer adoption, time savings, water savings, or yield impact. |

Update this table only when inspectable artifacts justify the change. The rubric’s development marks depend on demonstrated evidence, not the amount of detail in a plan.

## Sources

- **[S1]** scikit-learn, [Novelty and Outlier Detection — Isolation Forest](https://scikit-learn.org/stable/modules/outlier_detection.html#isolation-forest).
- **[S2]** Ma, Johansen and McCabe (2022), [Monitoring Irrigation Events and Crop Dynamics Using Sentinel-1 and Sentinel-2 Time Series](https://www.mdpi.com/2072-4292/14/5/1205); [KAUST-hosted paper](https://repository.kaust.edu.sa/bitstreams/6eed650b-5494-4841-9dae-b7020ef7d1ce/download).
- **[S3]** Copernicus Data Space, [Sentinel-2 mission and data](https://dataspace.copernicus.eu/data-collections/copernicus-sentinel-missions/sentinel-2).
- **[S4]** Valley, [Valley 365 and Valley Insights](https://emea.valleyirrigation.com/precision-ag/valley-365).
- **[S5]** OneSoil, [platform capabilities](https://onesoil.ai/en/platform).

Saudi problem and adoption evidence is linked in [problem_statement.md](problem_statement.md). Product pages document advertised capabilities, not independent comparative performance. All web sources were reviewed on 7 October 2026.
