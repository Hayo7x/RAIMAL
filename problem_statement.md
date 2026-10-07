# RAIMAL PivotWatch: Problem Statement

**Domain:** Earth Observation and AI  
**Prepared:** 7 October 2026  
**Focus:** Prioritizing inspections of persistent crop anomalies in Saudi center-pivot fields  
**Companion:** [Solution statement](solution_statement.md) · [Rubric and pitch guide](rubric_alignment.md)

## Submission-ready statement

Irrigation managers responsible for multiple center-pivot fields must decide which crop anomalies need a technician, where to inspect, and what to check first. Our initial target is a commercial operator growing potatoes under center pivots in Wadi Al-Dawasir. During active growth, uneven crop condition can reflect irrigation delivery, soil, disease, or management differences. A localized problem may be obscured by a field average, while inspecting every suspect location consumes limited technician time.

Saudi evidence establishes the relevance of this setting. A published study examined three 30-hectare potato pivot fields in Wadi Al-Dawasir and documented substantial variation within fields. Separately, GASTAT reported 9.356 billion m³ of agricultural non-renewable groundwater consumption in 2023. These findings support the importance of targeted field management; they do not establish how often irrigation faults occur or how much water our product could save. [P1][P2]

Existing satellite scouting and irrigation platforms already detect anomalies. The specific need we will test is whether Saudi maintenance teams can turn those observations into a useful, traceable inspection decision: a location expressed in pivot rings and sectors, the evidence for inspecting it, the next check that distinguishes possible causes, and a recorded field outcome.

Our goal is to reduce inspection decision and search time by at least 25% against the operator’s existing workflow, while preserving its ability to find actionable problems. The first pilot will cover one crop and growth stage at one operator. Actual fault frequency, current inspection time, and willingness to pay remain to be established through maintenance records and a prospective pilot.

## The user, situation, and decision

| Element | Definition |
|---|---|
| Primary user | Irrigation or maintenance manager at a commercial Saudi farm with multiple center pivots |
| Field user | Technician who inspects equipment, records measurements, and reports findings; agronomist handles crop and soil explanations |
| Initial application | Potato fields in Wadi Al-Dawasir, during an established crop canopy and before harvest; active farms and access must be confirmed |
| Trigger | A persistent local change in crop condition, or several competing locations requiring inspection |
| Decision | Which location deserves the next available inspection, and which measurement should the technician collect there? |
| Consequence of poor prioritization | Time spent searching or investigating non-actionable signals; potentially delayed correction of an actual irrigation or crop problem |
| Buyer hypothesis | Farm operations manager with a maintenance or agronomy budget; irrigation contractors are a later distribution channel |

The potato focus reduces differences caused by mixing crops and repeated fodder cutting. It is an initial validation boundary, not a claim that other crops cannot benefit. Wadi Al-Dawasir is selected because published local field research supports the setting; no named farm has agreed to participate.

## Evidence of the problem and its limits

| Evidence | What it supports | What it does not establish |
|---|---|---|
| Saudi potato study: three 30 ha pivots; reported high-yield zones averaged above 40 t/ha and low-yield zones below 21 t/ha. [P1] | Material spatial variation can exist within the selected crop and geography. | That irrigation faults caused the variation, or that PivotWatch would recover the yield difference. |
| GASTAT: 9,356 million m³ of agricultural non-renewable groundwater consumption in 2023. [P2] | Water management matters at national scale. | Pivot-specific losses, current fault prevalence, addressable revenue, or achievable savings. |
| FAO–SIO irrigation program: 21 demonstration farms selected from 252 assessed sites; 17 systems installed by June 2024. [P3] | Local institutions are investing in irrigation adoption and practical training. | A partnership with RAIMAL or demand for this particular product. |
| A Valley customer account describes irrigation problems missed despite daily field visits. [P4] | A documented operational example of inspection limitations. | Saudi incidence rates or independently verified product performance; this is overseas vendor-published testimony. |

The operational pain is therefore a **supported hypothesis requiring local measurement**. The Saudi literature supports field variability and the deployment context; a maintenance-log review must establish the specific dispatch problem at the first customer.

## How the problem is handled today

These are relevant alternatives, not a claim that every Saudi farm uses the same process.

| Current approach | Useful capability | Specific remaining question |
|---|---|---|
| Scheduled inspection and technician experience | Direct physical examination and knowledge of equipment | Can limited staff cover all locations and document comparable findings efficiently? The local baseline must be measured. |
| OneSoil | Markets satellite monitoring, scouting, and AI priorities using field context. [P5] | Does a pivot-specific inspection packet improve maintenance decisions beyond an existing ranked scouting list? |
| Valley Insights / Valley 365 | Markets AI imagery alerts for crop and irrigation issues within a pivot-management ecosystem. This is the closest product comparison. [P6] | Can a small, exportable inspection-and-follow-up workflow fit the target operator’s existing equipment and maintenance process better? |
| Pressure, flow, and equipment telemetry | Direct operational evidence where installed | Does crop-response mapping add useful spatial information beyond the available sensor locations and alarms? |

The contribution must earn its place alongside these alternatives. Satellite imagery, anomaly alerts, AI advice, and equipment independence alone are insufficient originality claims.

## Severity: an explicit operational scenario

The following is a planning assumption, not a surveyed Saudi average:

| Input | Assumption |
|---|---:|
| Managed pivots | 50 |
| Inspection rounds per pivot per month | 4 |
| Decision and search time per pivot-round | 30 minutes |
| Monthly decision and search effort | 50 × 4 × 30 ÷ 60 = **100 hours** |
| Target improvement | 25%, or **25 hours/month** |
| Assumed value of technician capacity | SAR 75/hour |
| Capacity value at target | **SAR 1,875/month** |

This calculation includes choosing and locating checks. It excludes travel, repair time, and mandatory inspections; those activities may remain unchanged. Capacity released is not automatically a payroll saving. If the baseline is 15–45 minutes, the same 25% target releases 12.5–37.5 hours/month, worth SAR 937.50–2,812.50 under the same hourly assumption. If the workflow has no meaningful search burden, the value proposition weakens.

Before a pilot, collect at least four weeks of available dispatch and maintenance records, or start prospective logging if records are absent. Record pivots covered, inspection reasons, decision/search minutes, findings, repeat visits, and unconfirmed alerts. Express frequency as confirmed actionable cases per 100 pivot-weeks and alert burden per pivot-week. Do not invent a national fault rate.

## Scope and success

The project addresses persistent, spatially resolvable crop anomalies and the inspection decisions they prompt. Its primary outcome is a better maintenance decision, supported by satellite evidence and confirmed in the field.

Real-time pump alarms, automatic irrigation control, guaranteed nozzle identification, water-volume measurement from greenness, and causal diagnosis from an image alone fall outside the initial scope. A reduction in under-watering could increase water delivery to the affected crop, so improved irrigation performance does not necessarily mean lower total water use.

A useful pilot result requires all three: at least 25% less decision/search time, at least 70% of issued inspection recommendations confirmed as actionable, and no more than a five-percentage-point reduction in detection recall relative to the current workflow. These are proposed decision thresholds, not measured results. The solution statement defines the comparisons, sampling, and failure responses.

## Sources

Sources checked on 7 October 2026. Historical dates remain attached to their claims.

- **[P1]** Al-Gaadi et al. (2016), [Prediction of Potato Crop Yield Using Precision Agriculture Techniques](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0162219). Use the Methods section for the Wadi Al-Dawasir location; the abstract contains inconsistent regional wording.
- **[P2]** GASTAT (5 January 2025), [official news listing containing “Consumption of non-renewable groundwater decreases by 7% in 2023”](https://www.stats.gov.sa/en/news?delta=4&page=22&start=49). Reporting year: 2023. The original PDF link in the research directory was unavailable during this review; the official release corroborates the number.
- **[P3]** FAO (3 October 2024), [From scarcity to sustainability: a leap toward efficient irrigation in Saudi Arabia](https://www.fao.org/neareast/news/stories/details/from-scarcity-to-sustainability--a-leap-toward-efficient-irrigation-in-saudi-arabia/).
- **[P4]** Valley (23 June 2020), [Valley Insights Provides Knowledge in Arid Conditions](https://valleyirrigation.com/blog/valley-blog/2020/06/23/valley-insights-provides-knowledge-in-arid-conditions).
- **[P5]** OneSoil, [current platform description](https://onesoil.ai/en/platform). Vendor capability claims; no comparative trial performed.
- **[P6]** Valley, [Valley 365 and Valley Insights](https://emea.valleyirrigation.com/precision-ag/valley-365). Vendor capability claims; Saudi availability, pricing, and workflow fit require confirmation.
