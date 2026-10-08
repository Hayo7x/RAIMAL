import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {Presentation,PresentationFile,FileBlob} from '@oai/artifact-tool';
const root=path.resolve('../..'), tmp=path.resolve('.'), out=path.join(root,'presentation');
const skill='C:/Users/Hamza/.codex/plugins/cache/openai-primary-runtime/presentations/26.904.11930/skills/presentations';
const runtime='C:/Users/Hamza/.cache/codex-runtimes/codex-primary-runtime/dependencies';
const {finalizePresentation,applyPresentationChartFont}=await import(pathToFileURL(skill+'/container_tools/artifact_tool_utils.mjs'));
const p=Presentation.create({slideSize:{width:1280,height:720}});
const d=JSON.parse(await fs.readFile('model-output.json','utf8'));
const C={bg:'#F6F7F2',dark:'#263329',earth:'#3F4B3B',green:'#44633F',leaf:'#5A9367',mist:'#E7EDE2',gray:'#CBD5C5',muted:'#596653',water:'#245C73',gold:'#E8BB68',amber:'#805411',white:'#FFFFFF'};
const F='Segoe UI', notes=[],words=[];
const src={esa:'https://www.esa.int/ESA_Multimedia/Images/2015/07/Desert_fields',esa2:'https://www.esa.int/ESA_Multimedia/Images/2015/07/Agriculture_in_Saudi_Arabia',study:'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0162219',census:'https://www.mdpi.com/2072-4292/15/3/731',stats:'https://www.stats.gov.sa/documents/20117/2435281/Agricultural%2BStatistics%2B2024%2B%2B-%2BEN.pdf/1d9fef9e-4238-e4c7-4c41-86475ce8241c?t=1764479027952',iforest:'https://scikit-learn.org/stable/auto_examples/ensemble/plot_isolation_forest.html',prithvi:'https://huggingface.co/ibm-nasa-geospatial/Prithvi-EO-1.0-100M-multi-temporal-crop-classification',kfupm:'https://mediacenter.kfupm.edu.sa/brand-guidelines/'};
function tx(s,t,x,y,w,h,size=26,color=C.dark,bold=false){s.copy.push(t);let q=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});q.text=t;q.text.style={typeface:F,fontSize:size,color,bold,autoFit:'none'};return q;}
function box(s,x,y,w,h,fill=C.mist,line='none',geometry='rect'){return s.shapes.add({geometry,position:{left:x,top:y,width:w,height:h},fill,line:{fill:line,width:line==='none'?0:1.5}});}
function arrow(s,a,b,opts={}){return s.shapes.connect(a,b,{kind:'straight',fromSide:'right',toSide:'left',line:{fill:C.green,width:3},head:{type:'triangle',width:'med',length:'med'},...opts});}
async function image(s,name,x,y,w,h,{fit='contain',crop}={}){const f=path.join(root,'presentation/assets',name);return s.images.add({blob:new Uint8Array(await fs.readFile(f)),contentType:name.endsWith('.jpg')?'image/jpeg':'image/png',alt:name,fit,position:{left:x,top:y,width:w,height:h},...(crop?{crop}: {})});}
async function slide(title,kicker,{dark=false,brand=true}={}){let s=p.slides.add();s.copy=[];s.dark=dark;s.background.fill=dark?C.dark:C.bg;tx(s,kicker,56,30,960,29,16,dark?C.mist:C.muted,true);tx(s,title,56,87,1005,105,48,dark?C.white:C.earth,true);if(brand){if(dark)box(s,1070,16,168,135,C.bg);await image(s,'RAIMAL-logo-final.png',1070,0,170,170);}return s;}
function footer(s,t){tx(s,t,57,671,1120,39,16,s.dark?C.mist:C.muted);tx(s,String(p.slides.items.length).padStart(2,'0'),1200,674,42,25,16,s.dark?C.mist:C.muted);}
function note(s,t){s.speakerNotes.textFrame.setText(t);notes.push(t);words.push(s.copy.join(' ').split(/\s+/).length);}
function chart(s,type,opt){const q=s.charts.add(type,{chartFill:'none',plotAreaFill:'none',chartLine:{fill:'none',width:0},plotAreaLine:{fill:'none',width:0},...opt});applyPresentationChartFont(q,{fontFamily:F});return q;}
const axis=(color=C.muted)=>({textStyle:{typeface:F,fontSize:19,fill:color},line:{fill:C.gray,width:1},majorGridlines:{fill:C.gray,width:.6}});
function table(s,values,y,widths,h=325,size=23){s.copy.push(...values.flat());const t=s.tables.add({rows:values.length,columns:values[0].length,left:56,top:y,width:1168,height:h,columnWidths:widths,values});t.borders.assign({fill:C.gray,width:.5});for(let r=0;r<values.length;r++)for(let c=0;c<values[0].length;c++){const cell=t.getCell(r,c);cell.fill=r===0?C.green:r%2?C.white:C.mist;cell.text.style={typeface:F,fontSize:size,color:r===0?C.white:C.dark,bold:r===0};}return t;}
function mix(a,b,t){const q=x=>parseInt(x,16);let str='#';for(let i=1;i<7;i+=2)str+=Math.round(q(a.slice(i,i+2))*(1-t)+q(b.slice(i,i+2))*t).toString(16).padStart(2,'0');return str;}
// An editable data figure: each polygon encodes an actual synthetic zone and value.
function polar(s,cx,cy,r,mode='ndvi'){
for(const z of d.zones){const rin=r*z.ring/4,rout=r*(z.ring+1)/4;let pts=[];for(let j=0;j<=15;j++){let a=(z.sector*30+j*2)*Math.PI/180;pts.push({x:r+Math.sin(a)*rout,y:r-Math.cos(a)*rout});}for(let j=15;j>=0;j--){let a=(z.sector*30+j*2)*Math.PI/180;pts.push({x:r+Math.sin(a)*rin,y:r-Math.cos(a)*rin});}const fill=mode==='ndvi'?mix('#F2D291',C.green,Math.max(0,Math.min(1,(z.ndvi-.64)/.26))):({normal:C.mist,withheld:'#8D9EAA',pending:C.gold,inspect:C.amber})[z.status];s.shapes.add({name:`${z.zone_id} ${mode} ${mode==='ndvi'?z.ndvi.toFixed(3):z.status}`,geometry:'custom',position:{left:cx-r,top:cy-r,width:r*2,height:r*2},fill,line:{fill:C.bg,width:1.2},customPaths:[{width:2*r,height:2*r,commands:[{moveTo:pts[0]},...pts.slice(1).map(v=>({lineTo:v})),{close:{}}]}]});}
tx(s,'N',cx-12,cy-r-35,32,28,18,C.muted,true);
}

// 1. Real Saudi satellite context and both original logos.
{
const s=await slide('','EARTH OBSERVATION AND AI',{brand:false});
await image(s,'sentinel-false-colour.jpg',650,0,630,720,{fit:'cover'});
await image(s,'RAIMAL-logo-final.png',60,20,215,215);
await image(s,'kfupm/LOGO-01.png',298,65,295,96);
tx(s,'Know where to\ninspect next',56,261,620,190,65,C.earth,true);
tx(s,'Satellite evidence for\nSaudi pivot maintenance',60,475,570,95,32,C.green);
tx(s,'Read the field. Focus the next check.',60,592,564,57,25);
tx(s,'Real Sentinel-2 image, Saudi Arabia\nCopernicus Sentinel data (2015)/ESA',681,646,555,60,16,C.white);
note(s,`Opening, 25 seconds. RAIMAL helps maintenance managers decide where to send limited technician time. We start with potato pivots in Wadi Al-Dawasir. This is real historical Saudi satellite imagery, not imagery processed by our prototype and not a verified customer field. Image: ${src.esa2}; Copernicus Sentinel data (2015)/ESA, ESA Standard Licence. Both logos are original files, unchanged. KFUPM official asset source: ${src.kfupm}. Product wording derives from problem_statement.md and solution_statement.md. No university endorsement claim is made.`);
}
// 2. Direct problem-statement language next to published local spatial evidence.
{
const s=await slide('One field. Different conditions.','THE PROBLEM');
await image(s,'saudi-potato-yield-maps.png',52,205,635,443,{crop:{left:.503,top:0,right:0,bottom:.666}});
tx(s,'Where to inspect?',743,221,470,62,38,C.earth,true);
tx(s,'What to check first?',743,327,470,62,38,C.earth,true);
tx(s,'Which signal matters?',743,433,470,62,36,C.earth,true);
tx(s,'Localized crop changes compete\nfor limited technician time.',743,546,465,91,27,C.green);
footer(s,'Published Sentinel-2 yield estimate, Wadi Al-Dawasir. Al-Gaadi et al. (2016), Fig. 4b.');
note(s,`Problem, 35 seconds. Reuses the problem statement: irrigation managers responsible for multiple center-pivot fields must decide which crop anomalies need a technician, where to inspect and what to check first. The source study examined three 30-hectare potato pivots in Wadi Al-Dawasir. This published map predicts yield in field 67-S using a Sentinel-2 vegetation index. It establishes spatial variability, not irrigation-fault causality or recoverable loss. Soil, disease and management can also explain the pattern. Our local dispatch burden still needs operator logs. Figure 4b is a crop from the original six-panel figure with its legend and scale preserved. Source: ${src.study}, Al-Gaadi et al., CC BY. More than 200 visible labels are not introduced: only panel b is displayed.`);
}
// 3. Market footprint is dated and segmented, not invented revenue TAM.
{
const s=await slide('A large footprint. A focused first market.','MARKET OPPORTUNITY');
tx(s,'28,080',56,206,670,118,96,C.green,true);tx(s,'Saudi pivot fields mapped in 2020',64,337,650,55,31);
tx(s,'624,000',60,425,655,108,76,C.earth,true);tx(s,'tonnes of potatoes produced in 2024',64,537,650,51,29);
const a=box(s,784,230,418,92,C.mist);tx(s,'Commercial pivot operators',803,251,389,58,28,C.earth,true);
const b=box(s,817,382,352,85,C.mist);tx(s,'Potato farms in Wadi',837,390,320,35,26);tx(s,'Al-Dawasir',837,426,320,35,26);
const c=box(s,862,526,262,89,C.green);tx(s,'First pilot: 1 operator',879,548,235,52,25,C.white,true);arrow(s,a,b,{fromSide:'bottom',toSide:'top'});arrow(s,b,c,{fromSide:'bottom',toSide:'top'});
footer(s,'Historical field footprint and crop volume, not software revenue. Sources: Li et al. (2023), GASTAT (2024).');
note(s,`Market, 35 seconds. A national retrospective study estimated approximately 28,080 fields in 2020, covering 7,028 square kilometres; it reports a slight increase in 2021, without an exact count used here. This is a historical physical footprint, not a current farm/customer count. The same study found contraction from the 2016 peak, so the deck does not imply continuous fleet growth. Source: ${src.census}, section 4.2.1. GASTAT Agricultural Statistics 2024 reports potato production of 624 thousand tonnes. Source: ${src.stats}. The serviceable market requires a fresh count of active potato pivots, suitable canopy periods and operators with inspection budgets. Revenue TAM and willingness to pay remain unmeasured. The beachhead is one commercial Wadi Al-Dawasir operator; irrigation contractors are a later channel.`);
}
// 4. Requested layered architecture, with the actual documentation plot at the engine.
{
const s=await slide('Sentinel data. AI engine. RAIMAL workflow.','HOW THE SYSTEM WORKS');
const input=box(s,56,232,300,330,C.white,C.gray);await image(s,'sentinel-saudi-fields.jpg',69,244,274,172,{fit:'cover'});tx(s,'Sentinel-2',77,431,260,46,31,C.water,true);tx(s,'Imagery + quality masks\nCrop and field context',77,486,262,65,23);
const engine=box(s,457,232,334,330,C.white,C.gray);await image(s,'isolation-forest-official.png',467,240,314,231);tx(s,'Isolation Forest',475,480,300,43,29,C.earth,true);tx(s,'Scores unusual patterns',475,523,300,37,23);
const action=box(s,905,232,318,330,C.white,C.gray);tx(s,'Field inspection',925,263,280,48,31,C.green,true);tx(s,'Location\nNext measurement\nRecorded finding',925,348,275,158,29);
arrow(s,input,engine);arrow(s,engine,action);
box(s,433,196,815,407,'none',C.green);tx(s,'RAIMAL SYSTEM LAYER',450,583,725,30,21,C.green,true);tx(s,'Quality + history + persistence + task rules',452,621,755,37,27,C.green);
footer(s,'Sentinel ingestion proposed. Engine chart: scikit-learn toy example. Synthetic engine and task rules implemented.');
note(s,`System, 45 seconds. Real Sentinel-2 surface reflectance and quality masks are the proposed input. The current synthetic engine combines NDVI (vegetation index), deficit versus comparable zones and temporal change. Isolation Forest is the engine, not a pretrained fault classifier. Its random partitions tend to isolate unusual points sooner. The central figure comes unchanged from the official scikit-learn example, using toy clusters; its colour scale is a model decision function, not a crop-health or fault-probability scale. Source: ${src.iforest}. Our negative score_samples convention makes higher scores more unusual. The green layer shows RAIMAL's quality/history/persistence gating, geometry-based questions and recorded field outcome. Its placement around engine and output communicates orchestration, not changes to the Isolation Forest algorithm. A technician confirms the cause. Crop-operation suppression and stale-live-data protection remain proposed. Satellite image credit: ${src.esa}, Copernicus Sentinel data (2015)/ESA.`);
}
// 5. Published real satellite model example, explicitly not our run or fault classifier.
{
const s=await slide('A published satellite-model example','REFERENCE MODEL  /  IBM–NASA PRITHVI');
await image(s,'prithvi-published-example.png',60,227,331,331,{crop:{left:.003,top:.074,right:.767,bottom:.511}});
await image(s,'prithvi-published-example.png',861,227,331,331,{crop:{left:.789,top:.592,right:.03,bottom:.088}});
tx(s,'Real HLS input montage',61,577,379,45,26,C.earth,true);tx(s,'Published prediction',858,577,366,45,26,C.earth,true);
const a=box(s,431,317,382,158,C.mist);tx(s,'Prithvi encoder',460,338,330,45,31,C.earth,true);tx(s,'Crop-classification head',461,397,328,43,26,C.green);
const left=box(s,394,388,1,1,'none');const right=box(s,851,388,1,1,'none');arrow(s,left,a);arrow(s,a,right);
tx(s,'13 land-cover classes',457,499,360,45,28,C.water,true);
footer(s,'Authors’ published example, not our inference. Optional future crop context. No irrigation-fault or potato class.');
note(s,`Published example, 25 seconds. This slide answers what output from a real satellite model can look like. It uses the input montage and prediction panel from the authors' model-card figure, not a locally executed checkpoint. Panels are cropped from the same published overview but should not be interpreted as registered before-and-after views of the same single tile. HLS harmonizes Landsat and Sentinel observations. This Prithvi checkpoint classifies 13 crop/land-cover categories and has no potato or irrigation-fault class. It is an optional future context experiment in model_selection.md, not RAIMAL's deployed core engine. Do not call this a diagnosis or transfer its evaluation results to Saudi fields. Source: ${src.prithvi}, Li et al. (2023), HLS Multi Temporal Crop Classification Model, Apache-2.0 model repository.`);
}
// 6. Native actual data map and ranking. Shows why the fifth-highest score becomes the task.
{
const s=await slide('Anomaly ranking needs field context','ACTUAL ENGINE OUTPUT  /  SYNTHETIC INPUT');
polar(s,268,423,170);tx(s,'48 ground zones',112,207,360,38,26,C.green,true);tx(s,'Vegetation index',151,614,320,35,22);
for(let i=0;i<5;i++)box(s,100+i*65,570,65,16,mix('#F2D291',C.green,i/4));tx(s,'0.64',89,589,75,26,17);tx(s,'0.90',368,589,75,26,17);
const r=d.ranks.slice(0,6).reverse();
chart(s,'bar',{position:{left:522,top:228,width:687,height:330},categories:r.map(x=>x.zone_id),series:[{name:'Anomaly score',values:r.map(x=>+x.anomaly_score.toFixed(3)),fill:C.gray,points:r.map((x,i)=>({idx:i,fill:x.zone_id==='S02-R3'?C.amber:C.gray}))}],barOptions:{direction:'bar',grouping:'clustered',gapWidth:45},hasLegend:false,xAxis:{...axis(),min:0,max:.75,majorUnit:.25,numberFormatCode:'0.00'},yAxis:{...axis(),majorGridlines:null},dataLabels:{showValue:true,position:'outEnd',textStyle:{typeface:F,fontSize:20,fill:C.dark}}});
tx(s,'Higher score = more unusual',581,193,580,38,26,C.earth,true);
tx(s,'S02-R3 becomes the task after evidence gates',535,579,680,68,28,C.amber,true);
footer(s,'23 Apr 2025 replay. Real model run on generated data. Anomaly score is not diagnosed severity or fault probability.');
note(s,'Actual output, 35 seconds. Existing engine, unchanged, fixture seed 17, 480 rows across 48 zones and ten dates. Model: 160-tree Isolation Forest, seed 42. The polar map shows actual synthetic NDVI values in their correct north-up, clockwise sectors and 100 m radial bands. The bars rank the top six zones by negative score_samples. S11-R4 scores 0.688, S06-R3 0.683, S02-R4 0.678, S12-R3 0.661, S02-R3 0.656 and S07-R1 0.646. Higher scores do not establish stress, a fault or severity. Some high-scoring zones have unusually high NDVI. Only S02-R3 passes the current quality/history/persistence gates. The engine groups tasks by sector; this bar ranking is an analysis view, not a claim of severity-sorted queue implementation. Values and source-code hash provenance: presentation/assets/model-zone-output.csv and tmp/presentation-build/evidence.json.');
}
// 7. Decision packet and measured history, visible product layer.
{
const s=await slide('A location, a check and a recorded outcome','RAIMAL’S INSPECTION LAYER');
const dates=d.dates;
chart(s,'line',{position:{left:48,top:244,width:684,height:323},categories:dates,series:[{name:'S02-R3',values:d.candidate_ndvi.map(v=>+v.toFixed(6)),line:{fill:C.amber,width:3},marker:{symbol:'circle',size:6}},{name:'Peer median',values:d.peer_ndvi.map(v=>+v.toFixed(6)),line:{fill:C.green,width:3},marker:{symbol:'circle',size:4}}],hasLegend:true,legend:{position:'bottom',textStyle:{typeface:F,fontSize:20,fill:C.dark}},xAxis:{...axis(),majorGridlines:null},yAxis:{...axis(),min:.4,max:.9,majorUnit:.1,numberFormatCode:'0.0',title:{text:'Vegetation index',textStyle:{typeface:F,fontSize:19,fill:C.muted}}}});
tx(s,'Persistent local deficit',74,203,660,39,29,C.earth,true);
box(s,791,210,417,385,C.mist);tx(s,'INSPECTION TASK',815,232,367,35,19,C.amber,true);tx(s,'30–60°',815,278,367,76,60,C.earth,true);tx(s,'200–300 m from centre',815,366,368,42,27,C.green,true);tx(s,'Check water delivery\nand sprinkler condition',815,436,367,79,27);
tx(s,'Saved demo finding: 180 kPa',809,550,390,42,23,C.earth,true);
tx(s,'86.7% coverage',81,608,285,36,24,C.green,true);tx(s,'10 valid dates',357,608,240,36,24,C.green,true);tx(s,'Persistence gate passed',624,608,370,36,24,C.green,true);
footer(s,'Synthetic replay. If delivery is normal, refer for crop/soil review. Field inspection confirms the cause.');
note(s,'Task output, 35 seconds. Know where to inspect, what to check and what happened afterward, as the solution statement promises. The curve compares S02-R3 with the same-ring peer median, excluding sector 2 for this explanatory plot. This is descriptive history, not an independently validated detection curve. The selected zone has 86.705% current coverage and ten valid dates. It passes the engine persistence gate. The task text comes from the existing engine decision template: check water delivery and sprinkler condition, then refer for crop/soil review if normal. A direct save/read using the existing storage module preserved an explicitly synthetic 180 kPa record in an isolated database. No physical measurement occurred. Current Streamlit UI test fails at its unsupported info icon, so present the captured result without a live-demo dependency. Source: src/pivotwatch/engine.py, demo.py and storage.py; assets/model-zone-output.csv.');
}
// 8. Business value through one transparent native chart.
{
const s=await slide('Less time choosing and locating checks','VALUE TO THE FARM MANAGER');
chart(s,'bar',{position:{left:61,top:244,width:680,height:342},categories:['Current scenario','RAIMAL target'],series:[{name:'Decision/search hours per month',values:[100,75],fill:C.green,points:[{idx:0,fill:C.gray},{idx:1,fill:C.green}]}],barOptions:{direction:'column',grouping:'clustered',gapWidth:105},hasLegend:false,xAxis:{...axis(),majorGridlines:null},yAxis:{...axis(),min:0,max:110,majorUnit:25,title:{text:'Hours / month',textStyle:{typeface:F,fontSize:20,fill:C.muted}}},dataLabels:{showValue:true,position:'outEnd',textStyle:{typeface:F,fontSize:28,fill:C.dark,bold:true}}});
tx(s,'25 hours',808,240,408,111,68,C.green,true);tx(s,'released each month',813,358,393,51,29);
tx(s,'SAR 1,875',808,455,410,82,49,C.earth,true);tx(s,'illustrative capacity value',813,544,396,65,26);
footer(s,'Planning scenario: 50 pivots × 4 rounds × 30 min. Target: 25% less time. SAR 75/hour. Not measured savings.');
note(s,'Value, 30 seconds. The scenario comes from problem_statement.md. Fifty pivots times four rounds per month times 30 minutes of decision/search effort equals 100 hours. At a 25% reduction, 75 hours remain and 25 hours are released. At the assumed SAR 75/hour, capacity value is SAR 1,875/month. These values are not observed savings, payroll reduction, product revenue or pricing. Travel, repairs and mandatory inspections are outside the calculation. Validate minutes and willingness to pay from operator records before any commercial ROI claim. No water savings or yield gains are measured.');
}
// 9. Editable timeline and restrained acceptance-target numerals.
{
const s=await slide('A measured pilot before expansion','IMPLEMENTATION AND VALIDATION');
let nodes=[];for(const [i,a] of [['Weeks 1–2','Verify fields'],['Weeks 3–10','Observe + inspect'],['Weeks 11–12','Review results']].entries()){let x=62+i*402;const q=box(s,x,234,346,122,C.mist);tx(s,a[0],x+20,252,312,42,29,C.green,true);tx(s,a[1],x+20,301,312,40,27);nodes.push(q);}arrow(s,nodes[0],nodes[1]);arrow(s,nodes[1],nodes[2]);
tx(s,'≥25%',61,423,360,85,65,C.green,true);tx(s,'less decision/search time',65,515,350,47,25);
tx(s,'≥70%',464,423,355,85,65,C.green,true);tx(s,'actionable recommendations',468,515,380,47,25);
tx(s,'≤5 pp',865,423,355,85,65,C.green,true);tx(s,'recall loss versus baseline',869,515,350,47,25);
tx(s,'20 pivots',63,593,322,53,34,C.earth,true);tx(s,'1 operator',468,593,322,53,34,C.earth,true);tx(s,'SAR 16,440',869,593,350,53,34,C.earth,true);
footer(s,'Proposed pilot and targets. Budget includes 20% contingency. Imagery gaps or too few cases may extend the timeline.');
note(s,'Pilot, 40 seconds. Approximately twenty comparable pivots at one operator, eight observation weeks after onboarding. The operations manager is proposed buyer and task approver, technicians inspect and an agronomist reviews alternative causes. Existing laptops and no new sensors underpin the budget. Compare a frozen ML model with a simple sector rule and the current workflow, with independent review of alerted and sampled unalerted zones. Recall means the share of actionable cases found. If imagery is inadequate, withhold dispatch and retain routine checks or historical review. If usefulness or case counts are inadequate, extend collection and revise before expanding. Boundaries, crop records and permission are dependencies. The full SAR 13,700 base plus SAR 2,740 contingency is in the backup. A Saudi 47-pivot satellite study supports spatial time-series feasibility, not fault identification. Sources: solution_statement.md, https://www.mdpi.com/2072-4292/14/5/1205 .');
}
// 10. Clear closing request with both marks repeated as requested.
{
const s=await slide('One operator. One measured pilot.','THE NEXT STEP',{brand:false});
await image(s,'RAIMAL-logo-final.png',64,195,395,395);
await image(s,'kfupm/LOGO-01.png',650,22,555,174);
tx(s,'Field boundaries',585,246,635,65,42,C.earth,true);tx(s,'Maintenance records',585,345,635,65,42,C.earth,true);tx(s,'Access for inspections',585,444,635,65,42,C.earth,true);
tx(s,'A focused field check, with evidence\nand a recorded outcome.',585,554,624,84,30,C.green);
footer(s,'Synthetic workflow demonstrated. Real satellite ingestion and farm validation are next.');
note(s,`Close, 25 seconds. We seek one Saudi potato-farm operator to provide field boundaries, maintenance records and inspection access. The proposed product contribution is a reviewable maintenance decision with a located check and recorded outcome. The immediate test is time saved while preserving useful detection. No partnership, revenue, real-farm accuracy, water saving or yield gain is claimed. Both original logos remain intact. KFUPM asset source: ${src.kfupm}. Stop here for the main pitch. Slides 11–14 are Q&A.`);
}
// 11. A concise comparative backup.
{
const s=await slide('The workflow must earn its place','Q&A  /  ALTERNATIVES');
table(s,[['Approach','Existing strength'],['Valley Insights / Valley 365','AI imagery alerts within pivot management'],['OneSoil','Satellite scouting and AI priorities'],['RAIMAL proposal','Pivot-specific check and documented outcome']],223,[462,706],294,25);
tx(s,'Test: fewer minutes deciding where to go and what to measure',63,552,1130,60,31,C.green,true);
footer(s,'Comparative advantage remains unproven. Trade-off: data entry and operator cooperation.');
note(s,'Valley is the closest competitor because its alerts connect to pivot management. OneSoil already offers satellite monitoring and ranked scouting. No claim is made that either lacks location, notes or exports. Compare actual maintenance fit and time at the target operator. Official sources reviewed: https://emea.valleyirrigation.com/precision-ag/valley-365 and https://onesoil.ai/en/platform . The proposed RAIMAL difference is geometry-based inspection questions and reviewable outcomes; its advantage needs a trial.');
}
// 12. Evaluation design visual, not a wall of bullets.
{
const s=await slide('Evaluation includes the missed cases','Q&A  /  EVALUATION');
const a=box(s,65,236,321,128,C.mist);tx(s,'Frozen ML',86,262,279,49,34,C.green,true);tx(s,'Held-out pivots / dates',86,318,279,34,23);
const b=box(s,65,447,321,128,C.mist);tx(s,'Simple sector rule',86,472,279,49,30,C.green,true);tx(s,'Same task budget',86,527,279,34,23);
const c=box(s,531,295,313,210,C.white,C.gray);tx(s,'Independent review',554,322,280,55,28,C.earth,true);tx(s,'Alerted zones\n+ unalerted sample',554,392,280,81,27);
const e=box(s,989,295,228,210,C.green);tx(s,'Time\nPrecision\nRecall',1014,326,189,155,31,C.white,true);
arrow(s,a,c);arrow(s,b,c);arrow(s,c,e);
tx(s,'Seek 40 actionable + 40 non-actionable cases',65,609,1150,44,29,C.earth,true);
footer(s,'Exploratory collection target. Report raw counts and uncertainty. Extend if evidence is insufficient.');
note(s,'Proposed evaluation only. Freeze features, model and thresholds before testing on held-out pivots and later dates. Match recommendation budgets and compare with current operations as well as a sector rule. Include sampled unalerted zones and account for the sampling design to estimate missed cases. Independently adjudicate actionable equipment or agronomic findings. Seek at least forty actionable and forty non-actionable cases before preliminary rate interpretation; this is not a power guarantee. Additional ML target: ten percentage points more precision than the sector rule, while preserving recall. Report counts and uncertainty, and revise if targets fail. Source: solution_statement.md.');
}
// 13. Editable budget chart instead of a text-heavy table.
{
const s=await slide('A costed route to the first pilot','Q&A  /  BUDGET');
chart(s,'bar',{position:{left:57,top:218,width:725,height:386},categories:['Travel','Compute / storage','Technicians','Agronomy','Engineering'],series:[{name:'SAR',values:[1000,500,2400,1800,8000],fill:C.green}],barOptions:{direction:'bar',grouping:'clustered',gapWidth:70},hasLegend:false,xAxis:{...axis(),min:0,max:9000,numberFormatCode:'#,##0'},yAxis:{...axis(),majorGridlines:null},dataLabels:{showValue:true,position:'outEnd',textStyle:{typeface:F,fontSize:22,fill:C.dark}}});
tx(s,'SAR 13,700',841,247,376,68,43,C.earth,true);tx(s,'base estimate',845,324,357,41,26);
tx(s,'+ SAR 2,740',841,405,376,68,42,C.green,true);tx(s,'20% contingency',845,482,357,43,26);
tx(s,'SAR 16,440 total',845,571,375,56,33,C.earth,true);
footer(s,'Planning estimates, not quotes. Existing laptops and no new sensors assumed. Farm access remains a dependency.');
note(s,'Budget from solution_statement.md. SAR 8,000 engineering + 1,800 agronomy + 2,400 technician support + 500 compute/storage + 1,000 travel = SAR 13,700. Twenty percent contingency is SAR 2,740, total SAR 16,440. These are pilot allowances, not product pricing or validated willingness to pay. Proposed buyer: farm operations manager. Recruitment, staff availability and field inspection access are outstanding dependencies.');
}
// 14. Provenance and failure handling kept compact.
{
const s=await slide('What the prototype actually proves','Q&A  /  EVIDENCE');
table(s,[['Check','Observed'],['Synthetic engine, latest replay','1 task: S02-R3'],['Early replay, insufficient history','0 tasks'],['Direct save / read','Synthetic 180 kPa finding retained'],['Streamlit UI suite','Failed at unsupported info icon']],217,[625,543],328,25);
tx(s,'480 generated rows. 48 zones. 10 dates.',62,575,1150,48,32,C.green,true);
footer(s,'Real model execution, synthetic inputs. No held-out field accuracy, causal diagnosis or calibrated severity.');
note(s,'Evidence captured 8 October 2026. Engine checks use build_demo_data(seed=17), Isolation Forest with 160 estimators and random_state 42, and a 23 April 2025 replay. Gate settings: 80% coverage, eight valid dates and two persistent dates in twenty days. Early replay 5 January yields zero tasks. The saved record is synthetic and uses an isolated database. Existing Streamlit UI test fails at the unsupported info icon and Windows temporary database cleanup; do not claim a live end-to-end pass. Fit-time temporal changes use first differences while scoring uses the prior median baseline, a feature-consistency issue to resolve before real evaluation. Current task eligibility uses quality/history/persistence. Code hashes and captured fixture are in tmp/presentation-build/evidence.json. New output CSV is presentation/assets/model-zone-output.csv.');
}

await fs.writeFile(path.join(tmp,'word-counts.json'),JSON.stringify(words.map((n,i)=>({slide:i+1,authoredWords:n})),null,2));
if(words.some(n=>n>=200))throw Error('Word limit exceeded');
await fs.writeFile(path.join(out,'speaker-notes-visual.md'),'# RAIMAL visual pitch notes\n\nTen main slides, four Q&A backups. Around six minutes, subject to the organizer’s confirmed slot.\n\n'+notes.map((n,i)=>`## Slide ${i+1}\n\n${n}`).join('\n\n'));
await (await PresentationFile.exportPptx(p)).save(path.join(tmp,'candidate.pptx'));
const final=path.join(out,'RAIMAL-visual-pitch.pptx');
await finalizePresentation({workspaceDir:root,candidatePath:path.join(tmp,'candidate.pptx'),finalPath:final,pythonExecutable:runtime+'/python/python.exe',integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit',...[11,14].flatMap(n=>['--require-native-table-slide',String(n)])],requiredNativeTableOwnerSlides:[11,14],requiredNativeChartOwnerSlides:[6,7,8,13],materializeLiteralChartWorkbooks:true,explicitTotalSlideCount:14,fontPolicy:{basis:'user_request',families:[F]},verifyArtifactToolImport:true,receiptPath:path.join(tmp,'validation.json')});
const deck=await PresentationFile.importPptx(await FileBlob.load(final));
for(let i=0;i<deck.slides.items.length;i++){const blob=await deck.export({slide:deck.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(tmp,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()));console.log(`Rendered ${i+1}/14`);}
console.log('Complete',words);
