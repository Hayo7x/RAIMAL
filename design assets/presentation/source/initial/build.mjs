import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {Presentation, PresentationFile, FileBlob} from '@oai/artifact-tool';
const root=path.resolve('../..');
const tmp=path.resolve('.');
const out=path.join(root,'presentation');
const skill='C:/Users/Hamza/.codex/plugins/cache/openai-primary-runtime/presentations/26.904.11930/skills/presentations';
const runtime='C:/Users/Hamza/.cache/codex-runtimes/codex-primary-runtime/dependencies';
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')));
const p=Presentation.create({slideSize:{width:1280,height:720}});
const C={bg:'#F6F7F2',earth:'#3F4B3B',ink:'#263329',grove:'#44633F',muted:'#596653',mist:'#E7EDE2',water:'#245C73',caution:'#805411',white:'#FFFFFF',line:'#CBD5C5'};
const F='Segoe UI';
const sources={study:'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0162219',valley:'https://emea.valleyirrigation.com/precision-ag/valley-365',onesoil:'https://onesoil.ai/en/platform',saudi:'https://repository.kaust.edu.sa/bitstreams/6eed650b-5494-4841-9dae-b7020ef7d1ce/download'};
const notes=[];
function txt(s,t,x,y,w,h,size=28,color=C.ink,bold=false){const q=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});q.text=t;q.text.style={typeface:F,fontSize:size,color,bold,autoFit:'none'};return q;}
function slide(title,n,{dark=false,tag=''}={}){const s=p.slides.add();s.background.fill=dark?C.earth:C.bg;s.dark=dark;const color=dark?C.white:C.earth;txt(s,tag||'RAIMAL',64,34,1080,25,16,dark?C.mist:C.muted,true);txt(s,title,64,92,1140,116,48,color,true);txt(s,String(n).padStart(2,'0'),1168,663,60,28,17,dark?C.mist:C.muted);return s;}
function foot(s,t){txt(s,t,64,649,1070,48,17,s.dark?C.mist:C.muted);}
function note(s,t){s.speakerNotes.textFrame.setText(t);notes.push(t);}
async function img(s,file,x,y,w,h,type='image/png'){s.images.add({blob:new Uint8Array(await fs.readFile(path.join(root,file))),contentType:type,alt:path.basename(file),fit:'contain',position:{left:x,top:y,width:w,height:h}});}
function table(s,values,y,widths,{height=330,size=24}={}){const t=s.tables.add({rows:values.length,columns:values[0].length,left:64,top:y,width:1152,height,columnWidths:widths,values});t.borders.assign({fill:C.line,width:0.6});for(let r=0;r<values.length;r++)for(let c=0;c<values[0].length;c++){let cell=t.getCell(r,c);cell.fill=r===0?C.grove:(r%2?C.white:C.mist);cell.text.style={typeface:F,fontSize:size,color:r===0?C.white:C.ink,bold:r===0};}return t;}

// 1: brand-led opening with the operational decision already in view.
{
const s=slide('The next\nfield check',1,{tag:'EARTH OBSERVATION AND AI'});
// Replace the standard title frame with a deliberately larger opening.
s.shapes.items[1].position={left:64,top:178,width:650,height:185};
s.shapes.items[1].text.style={typeface:F,fontSize:76,bold:true,color:C.earth};
await img(s,'design assets/RAIMAL-logo-final.png',775,120,420,420);
txt(s,'Satellite-assisted inspection for\nSaudi potato pivots',68,401,680,92,31,C.grove);
txt(s,'A manager decides where limited technician\ntime should go next.',68,526,760,77,27);
foot(s,'Initial focus: established crop canopy before harvest in Wadi Al-Dawasir');
note(s,'0:00–0:30. A maintenance manager has several pivots to inspect and limited technician time. RAIMAL turns persistent crop-pattern changes into a specific field check and records what the technician finds. We begin with commercial potato pivots in Wadi Al-Dawasir, during established canopy before harvest. The initial scope is inspection prioritization. It excludes automatic control, real-time pump alarms and image-only fault diagnosis. The local dispatch burden is still a hypothesis to measure. Source: problem_statement.md and presentation_plan.md. Artwork: approved design assets/RAIMAL-logo-final.png, unchanged.');
}
// 2: workload calculation, not a savings claim.
{
const s=slide('The workload worth testing',2);
txt(s,'100',64,225,510,130,110,C.earth,true);txt(s,'hours / month',70,357,490,55,30,C.earth);
txt(s,'25',706,225,440,130,110,C.grove,true);txt(s,'hours / month released',712,357,490,55,30,C.grove);
txt(s,'50 pivots × 4 rounds × 30 minutes ÷ 60',70,438,550,70,25);
txt(s,'At the proposed 25% time reduction',712,438,470,70,25);
txt(s,'Saudi research documented variability across three 30-hectare potato pivots.\nThe inspection workload still needs local operator logs.',70,547,1110,75,24);
foot(s,'Planning scenario, not measured savings. Decision/search time only. Study: Al-Gaadi et al., 2016.');
note(s,`0:30–1:00. The local study supports spatial monitoring in this crop and setting. It does not measure irrigation-fault prevalence or dispatch burden. Current practice can include routine visits, technician experience, scouting tools and telemetry. We will compare with the actual operator workflow. Our planning scenario assumes 50 pivots, four rounds per month and 30 minutes of decision/search work per round: 100 hours. A 25% reduction would release 25 hours. At SAR 75/hour, that is SAR 1,875 of capacity value, not revenue or guaranteed payroll savings. Travel, repairs and mandatory checks are excluded. Source: ${sources.study}, Methods location Wadi Al-Dawasir; abstract regional wording is inconsistent. Project assumptions: solution_statement.md.`);
}
// 3: existing illustration, clearly separated from actual results.
{
const s=slide('Satellite evidence to a field check',3);
await img(s,'web/public/field.svg',53,202,425,382,'image/svg+xml');
txt(s,'Illustrative field schematic',75,595,405,33,18,C.muted);
txt(s,'01  Real inputs proposed',534,220,680,45,30,C.water,true);
txt(s,'Sentinel-2 imagery, quality masks,\nfield boundaries and crop records',534,270,660,79,26);
txt(s,'02  Synthetic processing implemented',534,362,680,45,30,C.grove,true);
txt(s,'Isolation Forest ranks unusual crop measurements.\nCoverage, history and persistence gate the queue.',534,412,670,79,25);
txt(s,'03  Human inspection',534,508,680,45,30,C.earth,true);
txt(s,'A technician checks a located zone and records\nthe finding. Field evidence establishes the cause.',534,558,665,78,25);
foot(s,'The model score is not a fault probability. Real satellite ingestion remains proposed.');
note(s,'1:00–1:45. The proposed space-data pipeline masks unusable Sentinel-2 pixels, compares dates and summarizes vegetation by sector bearing and distance from the pivot centre. NDVI is a vegetation index. The implemented synthetic model uses NDVI, peer deficit and temporal change. Isolation Forest is useful for ranking unusual combinations without verified fault classes and runs on a laptop with no GPU. Gates require sufficient coverage and history plus persistence. A technician receives a location and a measurement question. Crop operations, soil differences and cloud gaps can confuse the signal. Crop-operation suppression and stale-live-data safeguards remain proposed. Current replay fitting includes observations through the selected date, so it is not held-out evaluation. Sources: src/pivotwatch/engine.py, demo.py, MVP.md, data_acquisition.md. Existing illustrative asset: web/public/field.svg.');
}
// 4: compare without inventing competitive exclusivity.
{
const s=slide('A maintenance task we can test',4);
table(s,[['Approach','Documented capability'],['Valley Insights / Valley 365','AI imagery alerts for crop and irrigation issues'],['OneSoil','Satellite monitoring, scouting and AI priorities'],['RAIMAL prototype','Located check, requested measurement, recorded finding']],215,[420,732],{height:282,size:25});
txt(s,'Proposed advantage',65,531,355,42,28,C.grove,true);
txt(s,'Less ambiguity about where to go and what to check',426,534,780,65,27);
foot(s,'Workflow advantage remains unproven. Trade-off: extra data entry and operator cooperation.');
note(s,`1:45–2:15. Valley is the closest comparator because its imagery alerts sit within pivot management. OneSoil also provides scouting and a ranked AI list. RAIMAL does not claim that spatial alerts or recorded observations are unique. We will test whether the pivot-specific distance and bearing, measurement question and reviewable outcome fit a local maintenance routine better. The mechanism could reduce location ambiguity and decision time. The cost is extra entry work and dependence on field cooperation. Vendor capabilities rechecked 8 October 2026 using official pages/indexed official extracts: ${sources.valley}; ${sources.onesoil}. No comparative trial or Saudi availability/pricing verification has occurred.`);
}
// 5: captured evidence, no dependence on a failing live UI.
{
const s=slide('One located task. One recorded check',5,{dark:true});
txt(s,'30–60°',66,227,570,110,86,C.white,true);
txt(s,'clockwise from north',70,335,550,50,29,C.mist);
txt(s,'200–300 m',66,403,590,100,72,C.white,true);
txt(s,'from the pivot centre',70,505,560,45,29,C.mist);
txt(s,'23 April 2025 replay',752,235,450,40,28,C.white,true);
txt(s,'1 task from 480 generated rows\nS02-R3, 86.7% valid coverage',752,290,457,85,25,C.mist);
txt(s,'Saved and read back',752,405,450,40,28,C.white,true);
txt(s,'180 kPa synthetic measurement\nEarly replay: 0 tasks',752,460,465,87,25,C.mist);
foot(s,'Captured synthetic replay. Backend checks passed. Streamlit UI test failed. No real farm diagnosis.');
note(s,'2:15–3:00. This is the captured result from the existing Python engine, not a live demonstration. The fixture contains 12 sectors by four radial bands by ten dates: 480 rows. At the 23 April replay and 80% coverage gate it produces one sector task, S02-R3, at 30–60 degrees clockwise from north and 200–300 metres from centre. Its question asks the technician to check water delivery and sprinkler condition, then refer for crop/soil review if normal. A direct storage check saved and read back a simulated 180 kPa finding in an isolated SQLite database. CSV output was captured. At the 5 January replay the queue has zero tasks, as expected with insufficient history. These are bounded backend checks. The Streamlit UI suite failed at an unsupported info icon and temporary database cleanup; an end-to-end UI pass is not claimed. Source: captured evidence.json, task-export.csv and synthetic-input.csv; code hashes in evidence.json.');
}
// 6: acceptance criteria as a simple visual hierarchy.
{
const s=slide('Pilot success criteria',6);
txt(s,'≥25%',64,228,310,100,70,C.grove,true);txt(s,'less decision / search time',385,243,800,50,33,C.earth,true);txt(s,'Compare logged minutes with the operator’s current workflow.',385,300,805,62,25);
txt(s,'≥70%',64,373,310,100,70,C.grove,true);txt(s,'actionable recommendations',385,389,800,50,33,C.earth,true);txt(s,'Independent reviewers confirm an equipment or agronomic action.',385,446,805,62,25);
txt(s,'≤5 pp',64,518,310,100,65,C.grove,true);txt(s,'recall loss versus current workflow',385,532,825,50,32,C.earth,true);txt(s,'Inspect unalerted zones too, so missed actionable cases count.',385,588,805,52,25);
foot(s,'Proposed targets. About 20 pivots, eight observation weeks. Compare ML with a simple sector rule.');
note(s,'3:00–3:35. Success means useful inspection decisions. The targets are at least 25% less decision/search time, at least 70% actionable recommendations, and recall no more than five percentage points below the existing workflow. Recall is the share of actionable cases found. Independent review must include sampled unalerted zones so we can detect misses. Freeze the model and thresholds before testing on held-out pivots and later dates, at the same recommendation budget as a simple sector rule. A proposed ML target is ten percentage points higher precision than that rule, with recall and raw counts reported. We seek at least 40 actionable and 40 non-actionable adjudicated cases for preliminary interpretation, report uncertainty and extend if needed. This is a proposed evaluation, not observed performance. Source: solution_statement.md evaluation section.');
}
// 7: adoption and risks are on the main stage, budget detail in backup.
{
const s=slide('A 12-week pilot with one operator',7);
txt(s,'Weeks 1–2',64,220,360,44,31,C.grove,true);txt(s,'Recruit and verify fields\nLog the current workflow',64,277,350,90,26);
txt(s,'Weeks 3–10',466,220,360,44,31,C.grove,true);txt(s,'Observe and inspect\nReview field findings',466,277,350,90,26);
txt(s,'Weeks 11–12',868,220,350,44,31,C.grove,true);txt(s,'Compare results\nDecide whether to expand',868,277,350,90,26);
txt(s,'SAR 16,440',64,399,540,75,56,C.earth,true);txt(s,'Planning budget, including 20% contingency',66,480,560,65,24);
txt(s,'Imagery gaps',689,394,510,37,27,C.water,true);txt(s,'Coverage gates and merged zones.\nFallback: historical review and routine checks.',689,438,520,77,24);
txt(s,'Weak usefulness or too few labels',689,531,530,37,27,C.water,true);txt(s,'Independent review and unalerted sampling.\nFallback: extend collection before expansion.',689,574,530,68,23);
foot(s,'Farm manager approves tasks. Existing technicians inspect; an agronomist reviews competing causes.');
note(s,`3:35–4:30. The proposed adopter and buyer is a farm operations manager. We will recruit one operator through farm or irrigation-service contacts; no partnership is secured. Public Sentinel-2 access, confirmed boundaries and crop calendars, inspection permission and field staff are dependencies. Existing laptops and no new sensors underpin the estimate. A Saudi study at a 47-pivot Al Kharj site supports the broad use of satellite time series. A 400 m radius field contains roughly 5,027 nominal 10 m pixel areas, before masking, which supports broad zones rather than nozzle-level diagnosis. Weeks 1–2 cover access and baseline, 3–10 observation, 11–12 review. Integration or low case counts may extend the schedule. Budget is SAR 13,700 plus SAR 2,740 contingency. Risk one is inadequate optical coverage or spatial detail: merge zones and retain routine checks. Risk two is poor usefulness or too few reliable labels: agronomic review and extended collection. Bilingual task labels and offline synchronization are proposed. Technical precedent: ${sources.saudi}. Budget: solution_statement.md.`);
}
// 8: a specific ask closes the main pitch.
{
const s=slide('One operator for a measured pilot',8,{dark:true});
txt(s,'Field boundaries. Maintenance records.\nAccess for technician inspections.',64,233,1110,146,49,C.white,true);
txt(s,'Demonstrated',67,427,490,43,28,C.white,true);txt(s,'Synthetic model output, saved findings\nand a zero-task early replay',67,483,525,86,27,C.mist);
txt(s,'Next to prove',704,427,490,43,28,C.white,true);txt(s,'Real satellite ingestion and useful\ninspection decisions on a Saudi farm',704,483,520,86,27,C.mist);
foot(s,'The decision: does the workflow save inspection time while preserving useful detection?');
note(s,'4:30–5:00. We seek one Saudi potato-farm operator to provide field boundaries, maintenance records and inspection access for a measured pilot. The backend synthetic workflow is demonstrated. Real satellite ingestion, remaining safeguards, field performance and adoption are next to prove. No farm partnership, paid traction, yield gain or water saving is claimed. The next decision is whether this workflow saves inspection time while preserving useful detection. Stop here for the five-minute pitch. Slides 9–13 are Q&A backups.');
}
// 9: model detail.
{
const s=slide('Data and model',9,{tag:'Q&A  /  B1'});
txt(s,'Implemented synthetic model',64,225,550,44,31,C.grove,true);
txt(s,'Features: vegetation index, peer deficit,\ntemporal change\n\n160-tree Isolation Forest, seed 42\n94th-percentile anomaly threshold\n\nMinimum 80% coverage, eight valid dates,\ntwo persistent dates within 20 days',64,282,574,326,25);
txt(s,'Real-data work still required',716,225,500,44,31,C.water,true);
txt(s,'Mask clouds and unusable pixels\nConfirm geometry and crop operations\nAggregate imagery into useful zones\n\n400 m radius: about 5,027 nominal\n10 m pixel areas before masking\n\nSuitable scale to test broad zones',716,282,500,326,25);
foot(s,'Replay fitting uses data through the selected date. No held-out accuracy or fault probability.');
note(s,`Backup B1. Source: src/pivotwatch/engine.py and demo.py. The fit uses first differences for temporal change, while scoring uses a prior-median baseline. Align and freeze the feature definition before a real-data evaluation. Eligibility currently uses quality, history and persistence, so an eligible task need not imply a current threshold exceedance. No model-validity claim follows from the demo. Pixel arithmetic: pi × 400² / 100 = 5,026.5 nominal pixel areas, not an observed usable-pixel count. Sentinel resolution and proposed processing are documented in data_acquisition.md. Scientific precedent: Ma, Johansen and McCabe (2022), ${sources.saudi}.`);
}
// 10: complete native editable budget.
{
const s=slide('Pilot budget and dependencies',10,{tag:'Q&A  /  B2'});
table(s,[['Allowance','SAR'],['Engineering','8,000'],['Agronomy','1,800'],['Technician support','2,400'],['Compute and storage','500'],['Travel','1,000'],['Base cost','13,700'],['Contingency, 20%','2,740'],['Total planning budget','16,440']],212,[825,327],{height:370,size:23});
txt(s,'Assumes existing laptops and no new sensors. Operator access and staff time\nmust be agreed. Integration delays or low case counts may extend the pilot.',67,593,1125,55,22);
foot(s,'Planning estimates, not supplier quotes. Buyer and task approver: farm operations manager.');
note(s,'Backup B2. Cost assumptions from solution_statement.md. Engineering SAR 8,000, agronomy SAR 1,800, technician support SAR 2,400, compute/storage SAR 500, travel SAR 1,000. Base SAR 13,700. Twenty percent contingency SAR 2,740. Total SAR 16,440. These are pilot cost allowances, not product pricing or validated willingness to pay. Dependencies include farm-confirmed boundaries and crop calendars, permission to inspect, technician and agronomist availability, public imagery access and laptop geospatial processing. Routine inspections continue during the pilot.');
}
// 11: evaluation protocol.
{
const s=slide('Evaluation that counts missed cases',11,{tag:'Q&A  /  B3'});
table(s,[['Evaluation choice','Proposed protocol'],['Comparison','Current workflow and a simple sector rule'],['ML evaluation','Frozen model on held-out pivots and later dates'],['Recommendation budget','Same number of recommendations for each method'],['Ground truth','Independent review of alerted and sampled unalerted zones'],['Preliminary evidence','Seek 40 actionable + 40 non-actionable cases. Report uncertainty']],215,[360,792],{height:333,size:23});
txt(s,'Additional ML target: +10 percentage points of precision over the sector rule.\nReport recall and raw counts. Revise before expansion if targets fail.',66,577,1115,68,25);
foot(s,'Actionable means an independently confirmed equipment or agronomic action. All rates remain targets.');
note(s,'Backup B3. Proposed pilot: approximately 20 comparable pivots at one operator and eight observation weeks after onboarding. Precision is the share of recommendations that produce independently confirmed action. Recall is the share of independently confirmed actionable cases found, requiring unalerted sampling and accounting for sampling design. Match recommendation budgets for model and rule comparison. Record minutes spent deciding and locating the inspection, separately from travel/repair time. Report denominators and confidence intervals. The 40/40 threshold is an exploratory collection target, not a power calculation or guarantee of strong evidence. Avoid future data in training, feature construction or threshold setting. Source: solution_statement.md and presentation_plan.md.');
}
// 12: sources and a transparent localization calculation.
{
const s=slide('Local evidence and its limits',12,{tag:'Q&A  /  B4'});
txt(s,'Saudi field context',64,224,560,44,31,C.grove,true);
txt(s,'Al-Gaadi et al. (2016)\nThree 30-hectare potato pivots\nin Wadi Al-Dawasir\n\nSupports within-field variability.\nDoes not establish local dispatch burden\nor irrigation-fault prevalence.',64,282,580,299,26);
txt(s,'Why local summaries matter',720,224,495,44,31,C.grove,true);
txt(s,'0.695',716,291,500,105,79,C.earth,true);
txt(s,'Field-average vegetation index when\none of 12 equal sectors drops\nfrom 0.72 to 0.42',720,406,491,110,26);
txt(s,'Illustrative arithmetic, not a field result',720,559,495,54,23,C.muted);
foot(s,'Valley and OneSoil already support spatial alerts or scouting. This calculation proves no superiority.');
note(s,`Backup B4. Saudi source: ${sources.study}. Use the Methods location because the abstract has inconsistent regional wording. Calculation: (11 × 0.72 + 0.42) / 12 = 0.695, assuming equal-area sectors. This only explains why field averages can obscure a local decline. Valley official capability source: ${sources.valley}; supporting case study https://www.valleyirrigation.com/blog/valley-blog/2020/06/23/valley-insights-provides-knowledge-in-arid-conditions . OneSoil source: ${sources.onesoil}. Vendor descriptions establish advertised capabilities, not comparative effectiveness. No claim is made that either product lacks location, notes, export or task functionality.`);
}
// 13: provenance and explicit pass/fail scope.
{
const s=slide('Demonstration evidence',13,{tag:'Q&A  /  B5'});
table(s,[['Check','Expected','Observed'],['Latest synthetic replay','At least one task','1 task, S02-R3'],['Early replay, 5 Jan 2025','No tasks','0 tasks'],['Direct storage save / read','Synthetic record retained','180 kPa record read back'],['Existing Streamlit UI test','Navigate and save','Failed: unsupported info icon']],215,[483,305,364],{height:315,size:24});
txt(s,'Fixture: seed 17, 480 rows, 48 zones, 10 dates. Replay: 23 April 2025.\nEvidence includes input CSV, task CSV, stored finding and source-code hashes.',66,557,1125,72,24);
foot(s,'Captured 8 October 2026. Backend checks support workflow behavior only, not real-farm accuracy.');
note(s,'Backup B5. Direct checks executed using the existing src/pivotwatch/demo.py, engine.py and storage.py. Isolated evidence database protects user records. Run ID demo-20250423-v1. Minimum coverage 0.8, minimum history eight valid dates, persistence two dates in 20 days. The normal result is one task; the early result is zero. A stored record with synthetic flag 1 and measurement 180 kPa (synthetic) was read back. Evidence: tmp/presentation-build/evidence.json, synthetic-input.csv, task-export.csv. UI suite: python -m unittest discover -s tests. It fails at app.py st.info icon validation and subsequently during Windows temporary database cleanup. The static web interface uses precomputed output and browser-local findings; it is not evidence of a live model invocation or shared persistence.');
}

await fs.mkdir(out,{recursive:true});
await (await PresentationFile.exportPptx(p)).save(path.join(tmp,'candidate.pptx'));
await fs.writeFile(path.join(tmp,'notes.json'),JSON.stringify(notes,null,2));
await fs.writeFile(path.join(out,'speaker-notes.md'),'# RAIMAL presenter notes\n\nEight-slide pitch, five-minute rehearsal assumption. Slides 9–13 support Q&A.\n\n'+notes.map((n,i)=>`## Slide ${i+1}\n\n${n}`).join('\n\n'));
await finalizePresentation({workspaceDir:root,candidatePath:path.join(tmp,'candidate.pptx'),finalPath:path.join(out,'RAIMAL-pitch.pptx'),pythonExecutable:runtime+'/python/python.exe',integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit',...[4,10,11,13].flatMap(n=>['--require-native-table-slide',String(n)])],requiredNativeTableOwnerSlides:[4,10,11,13],explicitTotalSlideCount:13,fontPolicy:{basis:'user_request',families:[F]},verifyArtifactToolImport:true,receiptPath:path.join(tmp,'validation-v2.json')});
// Re-import the finished PPTX and render its actual slides for PDF and visual review.
const finalDeck=await PresentationFile.importPptx(await FileBlob.load(path.join(out,'RAIMAL-pitch.pptx')));
for(let i=0;i<finalDeck.slides.items.length;i++){
const blob=await finalDeck.export({slide:finalDeck.slides.items[i],format:'png',scale:2});
await fs.writeFile(path.join(tmp,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()));
console.log(`Rendered ${i+1}/13`);
}
console.log('PPTX finalized and rendered.');
