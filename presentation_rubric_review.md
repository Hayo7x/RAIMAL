# Presentation plan: second-pass rubric review

Reviewed 8 October 2026 against the official rubric's rendered page and XML, after drafting [presentation_plan.md](presentation_plan.md).

**Result:** All 41 score-3 and additional score-5 subrequirements have explicit locations in the plan. This means planning coverage, not full compliance or a promised score. C5 needs captured execution evidence. C7 needs a readable deck, timed delivery and Q&A. Local customer pain and comparative advantage retain explicit evidence limits.

**Planned** means content is assigned. **Evidence pending** means a result still needs capture. **Delivery pending** means the final deck or rehearsal must demonstrate it. A score of 5 requires all score-3 requirements plus all score-5 additions.

## C1. Problem definition and specificity — 15%

| ID | Requirement | Location/evidence | Review |
|---|---|---|---|
| C1-3a | Specific stakeholder | S1: manager, technician, agronomist | Planned |
| C1-3b | Situation and consequence | S1: competing anomalies, limited time, delayed investigation | Planned |
| C1-3c | Defined scope | S1: crop, geography, growth stage and boundaries | Planned |
| C1-5a | Relevant problem evidence | S2: Saudi potato study; distinguish variability from dispatch burden | Planned; local logs would strengthen evidence |
| C1-5b | Current handling and shortcoming | S2/S4: visits, experience, platforms and unresolved search effort | Planned; customer-specific burden unmeasured |
| C1-5c | Severity/frequency with source or assumptions | S2: explicit 100-hour/month workload scenario | Planned |

## C2. Originality and differentiation — 15%

| ID | Requirement | Location/evidence | Review |
|---|---|---|---|
| C2-3a | Relevant alternative | S4: Valley and OneSoil | Planned |
| C2-3b | Specific difference | S4: located task, discriminating check, recorded outcome | Planned |
| C2-3c | How difference could improve outcome | S4: less ambiguity and decision/search effort | Planned |
| C2-5a | Two alternatives including closest | S4: Valley as closest, OneSoil second | Planned |
| C2-5b | Meaningful functional/performance/use change | S4: observation becomes a reviewable maintenance task | Planned; benefit unproven |
| C2-5c | Reasoned/evidenced advantage plus trade-off | S4: mechanism comparison and data-entry/partner dependency; B4 calculation with limits | Planned; no superiority claim |

## C3. Solution design and expected effectiveness — 20%

| ID | Requirement | Location/evidence | Review |
|---|---|---|---|
| C3-3a | Inputs, processing and outputs | S3: imagery/context, features/ML/gates, task/finding | Planned |
| C3-3b | Space and required AI/ML role | S3: Sentinel-2 time series and Isolation Forest | Planned; real inputs proposed |
| C3-3c | User action addresses problem | S3/S5: prioritize, inspect and record | Planned |
| C3-5a | Measurable success and why target matters | S6: time, actionability and recall targets with rationale | Planned |
| C3-5b | Failures and responses/boundaries | S3/S6: quality/history, crop confounding, abstention, human confirmation | Planned; label unimplemented safeguards |

## C4. Technical and implementation feasibility — 15%

| ID | Requirement | Location/evidence | Review |
|---|---|---|---|
| C4-3a | Technologies/resources and suitability | S3/S7: satellite data, Python/ML, laptop and field expertise | Planned |
| C4-3b | Assumptions/dependencies and access | S7: public imagery, confirmed fields/calendar and partner permission | Planned; partner unconfirmed |
| C4-3c | Sequence and resources to pilot | S7: onboarding, observation, review and staff | Planned |
| C4-5a | Support central technical assumption | S7/B1: Saudi satellite precedent and pixel calculation | Planned; no physical-diagnosis validation |
| C4-5b | Timeline/costs with assumptions | S7/B2: 12-week plan and SAR 16,440 budget | Planned |
| C4-5c | Two major risks and mitigations/fallbacks | S7: unusable observations and poor operational usefulness/labels | Planned |

## C5. Demonstrated development and validation — 10%

| ID | Requirement | Location/evidence | Review |
|---|---|---|---|
| C5-3a | Core implementation or analytical demonstration | S5: synthetic model/queue/recording code; B4 calculation | Code inspected; capture pending |
| C5-3b | Inspectable inputs, outputs and test conditions | S5/B5: fixture, replay, gates, exports, finding and version | Evidence pending |
| C5-3c | Evaluate against stated requirement | S5: expected task/save behavior and no tasks with insufficient history | Evidence pending: actual execution |
| C5-5a | Representative end-to-end functions | S5: synthetic rows through model, task and recorded finding | Evidence pending; real imagery excluded |
| C5-5b | Results against baseline or acceptance threshold | S5: workflow acceptance checks; S6 future sector comparison | Evidence pending; future comparisons are not results |
| C5-5c | Failure test and interpretation | S5: insufficient-history replay and expected/actual withholding | Evidence pending; coverage check is confounded by early history |

A screenshot does not complete C5. Capture reproducible operation and interpret only the tested boundary. The rubric permits an acceptance-threshold comparison, so bounded workflow checks can be relevant without inventing model accuracy. Judges may still consider absent real imagery a limit on representativeness.

## C6. Saudi-market relevance and potential impact — 15%

| ID | Requirement | Location/evidence | Review |
|---|---|---|---|
| C6-3a | Specific Saudi user/context | S1/S2: Wadi Al-Dawasir potato operator | Planned |
| C6-3b | Local condition affects design/deployment | S7: pivot geometry, optical gaps, connectivity and proposed bilingual tasks | Planned; not all adaptations implemented |
| C6-3c | Causal link to user benefit | S3/S4: clearer location/check reduces decision/search effort | Planned |
| C6-5a | Saudi evidence/stakeholder input | S2/S7: Wadi potato and Al Kharj satellite studies | Planned; no customer endorsement |
| C6-5b | Measurable benefit with transparent basis | S2: 25 hours/SAR 1,875 from explicit inputs | Planned estimate |
| C6-5c | Adopter/operator and workflow pathway | S7/S8: buyer, task approval, technician, agronomist and partner request | Planned |

## C7. Presentation and responses — 10%

| ID | Requirement | Location/evidence | Review |
|---|---|---|---|
| C7-3a | Logical problem/approach/benefit sequence | S1–S8 and timing table | Planned |
| C7-3b | Readable material and explained terms/figures | Design guidance, NDVI/ML definitions, labeled visuals | Delivery pending |
| C7-3c | Direct answers explaining reasoning | Q&A and B1–B5 | Delivery pending |
| C7-5a | Essentials within allotted time | Five-minute schedule totals 300 seconds; short option totals 180 | Delivery pending: confirm limit and rehearse |
| C7-5b | Proposed/implemented/tested; estimates/results | S3/S5/S8 and visible target/assumption labels | Planned; actual tested row requires results |
| C7-5c | Evidence-backed answers and uncertainty | Direct answers, linked evidence and limits | Delivery pending |

## Global rules and judge intent

- Weights total **100%**: 15 + 15 + 20 + 15 + 10 + 15 + 10.
- Score 3 requires every score-3 item; score 5 requires those plus every additional score-5 item. Scores 2 and 4 reflect partial completion of the next anchor. No score is assigned by this review.
- Domain fit is explicit in the framing and S3 satellite role. An out-of-domain problem receives C1 = 0.
- Explain actual AI/ML rather than presenting NDVI arithmetic as ML. Missing AI/ML in this domain receives C3 = 0.
- A zero in C1, C2 or C3 caps every other criterion at 2. Keep problem, contribution and solution understandable without backups.
- Tie-breakers are Saudi relevance/impact and technical feasibility. The official rendered rubric does not explicitly order them.
- C3, C4 and C6 can receive full marks for supported concepts. C5 separately assesses completed work. C7 assesses communication rather than accent, expensive graphics or theatrical delivery.
- Judge prompts map to the same plan: who/why (C1), contribution (C2), mechanism (C3), obtainable resources/limits (C4), substantiated operation (C5), local value/adoption (C6), clarity/evidence in answers (C7).

## Corrections made during the second pass

1. Added current handling, its unresolved shortcoming and explicit severity to S2; local context alone is insufficient.
2. Required two named alternatives, a mechanism comparison and a trade-off on S4.
3. Separated implemented synthetic ML from proposed satellite processing and held-out evaluation.
4. Added actual-versus-expected workflow evidence and an interpreted failure case to S5. Flagged the confounded coverage test.
5. Kept target rationale and missed-case sampling on S6.
6. Included technical support, cost basis, both risks and adoption roles in the main talk, not solely backups.
7. Corrected stale no-prototype framing while keeping farm validation incomplete.
8. Resolved transcription conflicts against the source image: seven criteria and no explicit tie-breaker ordering.

**Next gate:** Repeat this review on the completed slides, saved demonstration results and timed rehearsal. Planning coverage is complete; evidence and delivery remain open where marked.
