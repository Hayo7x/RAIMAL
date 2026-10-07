# PivotWatch: Rubric Alignment and Pitch Guide

**Team:** RAIMAL · **Domain:** Earth Observation and AI · **Prepared:** 7 October 2026

Read [problem_statement.md](problem_statement.md) and [solution_statement.md](solution_statement.md) as the proposed submission. Their opening statements can be copied into application fields and shortened to any organizer word limit. The remaining sections supply the evidence and reasoning for judges.

## Rules that materially affect the entry

The supplied rubric uses seven criteria, scored 0–5. Score 5 requires every score-3 requirement plus every additional score-5 requirement. Score 4 is all score-3 requirements and only some score-5 additions. A polished concept does not automatically earn development or presentation points.

- A problem outside its chosen domain receives **0 for problem definition**.
- Earth Observation and Satellite Protection solutions without **AI or ML receive 0 for solution design**.
- A zero in problem definition, originality, or solution design **caps every other criterion at 2**.
- Tie-breakers are **Saudi-market relevance and potential impact** and **technical and implementation feasibility**. The rubric does not specify their order of application.
- The rubric permits concepts to receive full marks for design, feasibility, and Saudi impact when their requirements are supported. Development separately rewards demonstrated work.
- The supplied agenda allocates presentations from 5:45–7:30 on day 2, but gives **no individual team time limit**. A five-minute pitch below is a rehearsal assumption.

## Changes made to strengthen the idea

| Earlier direction | Refined decision | Reason |
|---|---|---|
| Broad center-pivot monitoring across candidate regions | Start with potato pivots in Wadi Al-Dawasir | One user, crop, growth stage, and local research context make validation credible. |
| Rules or Bayesian-style scorecard could be the full MVP | Add a named, fitted Isolation Forest as a core anomaly component | Establish a genuine ML role and avoid the rubric’s AI/ML zero-score rule. |
| Ranked anomalies and contextual advice as the main distinction | Test a geometry-based inspection packet with field findings and follow-up | Current competitors already advertise ranked AI scouting and irrigation alerts. |
| General potential water benefits | Lead with measurable decision/search time and retain water as a separate measurement question | Creates a benefit the first pilot can actually evaluate. |
| Flexible feature roadmap | One complete case, a comparator, and a failure case before extra features | Directly addresses development and validation requirements within the scheduled working time. |

## Criterion-by-criterion evidence map

| Criterion | Weight | Score-3 requirements covered | Score-5 additions covered or still needed |
|---|---:|---|---|
| Problem definition and specificity | 15% | Named manager/technician, operating situation and consequence, explicit scope in the problem statement | Published local evidence; current alternatives and shortcomings; severity scenario with explicit assumptions. Customer-specific frequency remains to be measured. |
| Originality and differentiation | 15% | Alternatives, specific contribution, proposed improvement in maintenance decisions | Closest competitor Valley Insights plus OneSoil; mechanism-level comparison; spatial calculation; limitations and overlap acknowledged. Actual competitive advantage remains unproven. |
| Solution design and expected effectiveness | 20% | Inputs → quality checks → ML → inspection → findings; roles of space data and ML; clear user action | Quantified success criteria, explanation of operational value, failure conditions, abstention and boundaries. |
| Technical and implementation feasibility | 15% | Named tools/data; access and partner dependencies; prototype/pilot sequence and resources | Saudi satellite precedent and resolution calculation; timeline and itemized cost assumptions; two consequential risks with fallback plans. |
| Demonstrated development and validation | 10% | Inspectable architecture and synthetic worked analysis exist; whether the latter earns core-function credit is for judges | Still needs an executable representative use case, comparator results, and a tested failure condition. Do not claim these are complete. |
| Saudi-market relevance and potential impact | 15% | Specific user and geography; crop/local workflow adaptations; causal route from prioritization to released staff time | Local sources; transparent quantitative benefit; adopter, operator, entry workflow and commercial assumptions. No partnership or ROI claim. |
| Presentation and responses to questions | 10% | Proposed logical narrative, defined terms, and direct Q&A below | Rehearse to confirmed time; show proposed/implemented/tested labels and estimates/results; answer using evidence. Actual delivery cannot be credited in advance. |

Do not label this package “100/100.” It is structured to address the highest-score requirements, but development, customer validation, comparative advantage, and presentation evidence must be earned. Under the conventional weighted calculation, each raw score point in development is worth two total percentage points; moving from 1 to 5 would add eight points. The official file gives weights but does not spell out a separate arithmetic formula.

## Highest-value work before judging

1. **Obtain one reproducible complete run.** Show dated inputs, a real ML fit and held-out score, a ranked zone, an inspection task, a recorded finding, and a follow-up state. Label synthetic field findings. A saved result should survive a network outage.
2. **Show the comparator beside it.** Use the same inputs and alert budget for the simple sector rule and ML model. Report counts, outcomes, and failure cases, even if ML does not win. A field-average-only comparison is too weak to establish an advantage over modern products.
3. **Demonstrate a real failure response.** Feed an invalid/cloudy or stale observation through the software. Show the withheld recommendation and reason. A screenshot drawn to illustrate failure handling does not prove it works.
4. **Replace one important assumption with local evidence.** A documented manager/technician interview or maintenance-log example is more useful than more generic market statistics. Record the person’s role, date, method, and what they actually said.
5. **Prepare the evidence bundle.** Include input IDs, dates, feature table, model settings, train/evaluation split, comparator output, test results, one complete workflow recording, and a clear status table. Remove any claim that cannot be traced to evidence.

The statements already include a worked calculation. Building a complete software demonstration is a subsequent implementation task; none is implied by these documents.

## Five-minute rehearsal plan

| Time | Content | What the judge should understand |
|---|---|---|
| 0:00–0:40 | One manager, one pivot pattern, one inspection decision | The specific problem and consequence |
| 0:40–1:10 | Saudi crop evidence and transparent workload scenario | Why this context matters and how severity is estimated |
| 1:10–2:20 | Show the workflow; explain the ML role in one sentence | How satellite data become an inspection task |
| 2:20–3:00 | Valley/OneSoil comparison and proposed contribution | Existing capabilities are understood; the improvement is specific |
| 3:00–3:45 | Comparator and failure evidence, or explicitly labeled analytical example | What is actually demonstrated and where it stops |
| 3:45–4:30 | Pilot targets, adopter, costs, and two implementation risks | A plausible path to local use |
| 4:30–5:00 | Current status and request for a pilot partner | What is ready, what remains, and the next decision |

If only three minutes are allowed, allocate 30 seconds to the problem/local evidence, 60 to the workflow, 30 to comparison, 35 to evidence and limits, and 25 to the pilot. Confirm the real time limit with the organizers rather than assuming five minutes.

Suggested opening: “A farm manager has several pivots to inspect and limited technician time. PivotWatch turns persistent satellite crop patterns into a specific field check, then records what the technician found. Our first test is whether that saves at least 25% of decision and search time on Saudi potato pivots.”

## Questions judges are likely to ask

| Question | Direct answer |
|---|---|
| Where is the AI? | Isolation Forest learns unusual combinations of spatial and temporal crop features. Show the fitted model, input features, and held-out outputs when implemented; until then identify it as proposed. NDVI arithmetic alone is not our ML component. |
| Can an image prove a broken sprinkler? | No. It can prioritize a spatial pattern. Soil, crop, disease and management can produce similar signals; field inspection confirms a cause. |
| Why do we need this when Valley or OneSoil exists? | We propose a narrow maintenance packet tied to pivot geometry and documented findings. We must demonstrate a workflow improvement; current research does not establish that incumbents lack it. |
| Why not just use a threshold? | That is our baseline. We will test whether ML improves precision at the same inspection budget. If it does not, the claimed ML advantage is unsupported and needs revision. |
| Does it detect a fault immediately? | No. Optical availability and crop response introduce delays. It supplements routine inspections and equipment alarms. |
| How much water will you save? | We have no measured savings. Our first target is inspection effort. Water impact needs metered volumes and a suitable comparison; correcting under-watering may increase delivery. |
| What if clouds, dust, or harvest create the pattern? | Reject unusable pixels, show age/coverage, consult crop operations, and withhold a recommendation when evidence is inadequate. The failure demo must exercise those gates. |
| Is the market size proven? | No. We have a defined first buyer and pilot pathway. Historical agricultural statistics are context, not an addressable revenue estimate. |
| What does SAR 1,875 represent? | Assumed monthly capacity value: 50 pivots × four rounds × 30 minutes × 25% ÷ 60 × SAR 75/hour. It is neither measured savings nor guaranteed cash return. |
| What has the team completed? | At document preparation: research, design, comparison, analytical example, and pilot plan. Update this answer only after a working component or actual test can be shown. |
| Why would a Saudi operator adopt it? | Test it within the existing maintenance routine, with local task language and exportable records. Adoption depends on measured usefulness, acceptable alert burden, and willingness to pay. |
| What stops an incumbent copying it? | No strong moat exists today. A validated local workflow and responsibly collected field outcomes could become an advantage, but that is future potential. |

## Source of judging requirements

The official materials reviewed were [Rubric.pdf](Guidlines%20and%20files/Beyond_Horizons%27_30-Hour_Challenge_Invitation/Rubric.pdf), [challenge invitation](Guidlines%20and%20files/Beyond_Horizons%27_30-Hour_Challenge_Invitation/Beyond%20Horizons%E2%80%99%2030-Hour%20Challenge.pdf), and [UpdatedAgenda.pdf](Guidlines%20and%20files/Beyond_Horizons%27_30-Hour_Challenge_Invitation/UpdatedAgenda.pdf). The invitation identifies AI-agent screening on day 1 and human judging on day 2. Use explicit evidence labels and readable argumentation for both audiences.
