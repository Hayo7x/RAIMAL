import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {Presentation,PresentationFile,FileBlob} from '@oai/artifact-tool';
const root=path.resolve('../..'), tmp=path.resolve('.'), out=path.join(root,'presentation');
const skill='C:/Users/Hamza/.codex/plugins/cache/openai-primary-runtime/presentations/26.904.11930/skills/presentations';
const runtime='C:/Users/Hamza/.cache/codex-runtimes/codex-primary-runtime/dependencies';
const {finalizePresentation,applyPresentationChartFont}=await import(pathToFileURL(skill+'/container_tools/artifact_tool_utils.mjs'));
const p=Presentation.create({slideSize:{width:1280,height:720}});
const d=JSON.parse(await fs.readFile(path.join(root,'presentation/assets/real-sentinel/analysis.json'),'utf8'));
const C={bg:'#F6F7F2',dark:'#263329',earth:'#3F4B3B',green:'#44633F',leaf:'#5A9367',mist:'#E7EDE2',gray:'#CBD5C5',muted:'#596653',water:'#245C73',gold:'#E8BB68',amber:'#805411',white:'#FFFFFF'};
const F='Segoe UI', notes=[],words=[];
const src={esa:'https://www.esa.int/ESA_Multimedia/Images/2015/07/Desert_fields',esa2:'https://www.esa.int/ESA_Multimedia/Images/2015/07/Agriculture_in_Saudi_Arabia',study:'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0162219',census:'https://www.mdpi.com/2072-4292/15/3/731',stats:'https://www.stats.gov.sa/documents/20117/2435281/Agricultural%2BStatistics%2B2024%2B%2B-%2BEN.pdf/1d9fef9e-4238-e4c7-4c41-86475ce8241c?t=1764479027952',iforest:'https://scikit-learn.org/stable/auto_examples/ensemble/plot_isolation_forest.html',prithvi:'https://huggingface.co/ibm-nasa-geospatial/Prithvi-EO-1.0-100M-multi-temporal-crop-classification',kfupm:'https://mediacenter.kfupm.edu.sa/brand-guidelines/'};
function tx(s,t,x,y,w,h,size=26,color=C.dark,bold=false){s.copy.push(t);let q=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});q.text=t;q.text.style={typeface:F,fontSize:size,color,bold,autoFit:'none'};return q;}
function box(s,x,y,w,h,fill=C.mist,line='none',geometry='rect'){return s.shapes.add({geometry,position:{left:x,top:y,width:w,height:h},fill,line:{fill:line,width:line==='none'?0:1.5}});}
function arrow(s,a,b,opts={}){return s.shapes.connect(a,b,{kind:'straight',fromSide:'right',toSide:'left',line:{fill:C.green,width:3},tail:{type:'triangle',width:'med',length:'med'},...opts});}
async function image(s,name,x,y,w,h,{fit='contain',crop}={}){const f=path.join(root,'presentation/assets',name);return s.images.add({blob:new Uint8Array(await fs.readFile(f)),contentType:/\.jpe?g$/i.test(name)?'image/jpeg':'image/png',alt:name,fit:crop?'cover':fit,position:{left:x,top:y,width:w,height:h},...(crop?{crop}: {})});}
async function slide(title,kicker,{dark=false,brand=true}={}){let s=p.slides.add();s.copy=[];s.dark=dark;s.background.fill=dark?C.dark:C.bg;tx(s,kicker,56,30,730,29,16,dark?C.mist:C.muted,true);tx(s,title,56,87,1005,85,46,dark?C.white:C.earth,true);if(brand){if(dark)box(s,1070,16,168,135,C.bg);await image(s,'RAIMAL-logo-final.png',1090,0,160,160);await image(s,'kfupm/LOGO-01.png',794,0,270,85);}return s;}
function footer(s,t){tx(s,t,57,671,1120,39,16,s.dark?C.mist:C.muted);tx(s,String(p.slides.items.length).padStart(2,'0'),1200,674,42,25,16,s.dark?C.mist:C.muted);}
function note(s,t){s.speakerNotes.textFrame.setText(t);notes.push(t);words.push(s.copy.join(' ').split(/\s+/).length);}
function chart(s,type,opt){const q=s.charts.add(type,{chartFill:'none',plotAreaFill:'none',chartLine:{fill:'none',width:0},plotAreaLine:{fill:'none',width:0},...opt});applyPresentationChartFont(q,{fontFamily:F});return q;}
const axis=(color=C.muted)=>({textStyle:{typeface:F,fontSize:19,fill:color},line:{fill:C.gray,width:1},majorGridlines:{fill:C.gray,width:.6}});
function table(s,values,y,widths,h=325,size=23){s.copy.push(...values.flat());const t=s.tables.add({rows:values.length,columns:values[0].length,left:56,top:y,width:1168,height:h,columnWidths:widths,values});t.borders.assign({fill:C.gray,width:.5});for(let r=0;r<values.length;r++)for(let c=0;c<values[0].length;c++){const cell=t.getCell(r,c);cell.fill=r===0?C.green:r%2?C.white:C.mist;cell.text.style={typeface:F,fontSize:size,color:r===0?C.white:C.dark,bold:r===0};}return t;}
function mix(a,b,t){const q=x=>parseInt(x,16);let str='#';for(let i=1;i<7;i+=2)str+=Math.round(q(a.slice(i,i+2))*(1-t)+q(b.slice(i,i+2))*t).toString(16).padStart(2,'0');return str;}
// An editable data figure: each polygon encodes an actual synthetic zone and value.
function polar(s,cx,cy,r,mode='ndvi'){
for(const z of d.zones){const rin=r*z.ring/4,rout=r*(z.ring+1)/4;let pts=[];for(let j=0;j<=15;j++){let a=(z.sector*30+j*2)*Math.PI/180;pts.push({x:r+Math.sin(a)*rout,y:r-Math.cos(a)*rout});}for(let j=15;j>=0;j--){let a=(z.sector*30+j*2)*Math.PI/180;pts.push({x:r+Math.sin(a)*rin,y:r-Math.cos(a)*rin});}const fill=mode==='ndvi'?mix('#E8BB68','#285F37',Math.max(0,Math.min(1,z.ndvi))):({normal:C.mist,withheld:'#8D9EAA',pending:C.gold,inspect:C.amber})[z.status];s.shapes.add({name:`${z.zone_id} ${mode} ${mode==='ndvi'?z.ndvi.toFixed(3):z.status}`,geometry:'custom',position:{left:cx-r,top:cy-r,width:r*2,height:r*2},fill,line:{fill:C.bg,width:1.2},customPaths:[{width:2*r,height:2*r,commands:[{moveTo:pts[0]},...pts.slice(1).map(v=>({lineTo:v})),{close:{}}]}]});}
tx(s,'N',cx-12,cy-r-35,32,28,18,C.muted,true);
}

const real='real-sentinel/';
const evidence=`Real-data source: Copernicus Sentinel-2 L2A, Microsoft Planetary Computer STAC and Data API. Dates 8, 18 and 28 February 2025. Tile 38QMH. Approximate manually traced field centre 44.8735 E, 20.34585 N, radius 390 m. Bbox [44.8685,20.341,44.8785,20.351]. Raw B04/B08 and SCL saved locally, sampled on a 104 by 111 north-up grid (about 10 m). Reflectance=(DN-1000)/10000, following baseline 05.11 encoding; NDVI=(NIR-red)/(NIR+red). SCL classes 4 and 5 retained. Metadata and exact arrays: assets/real-sentinel/. This is a real-image exploratory analysis, separate from the synthetic MVP. Crop identity, operations and cause are unknown. No ground-truth fault diagnosis or accuracy claim. Offset reference: https://forum.step.esa.int/t/get-sentinel-2-reflectance-values-from-dn-for-mosaicking/44397/6 .`;
const footReal='Copernicus Sentinel-2 / Microsoft Planetary Computer · 2025 · Exploratory analysis';
function node(s,label,x,y,w=200,h=94,fill=C.mist,size=27){const q=box(s,x,y,w,h,fill);tx(s,label,x+15,y+22,w-30,h-25,size,fill===C.green?C.white:C.earth,true);return q;}

// 1 — One promise and genuine satellite context.
{
const s=await slide('','',{brand:false});
await image(s,'sentinel-false-colour.jpg',670,0,610,720,{fit:'cover'});
await image(s,'RAIMAL-logo-final.png',44,6,246,246);
await image(s,'kfupm/LOGO-01.png',320,62,296,95);
tx(s,'The next\nfield check',58,270,620,191,76,C.earth,true);
tx(s,'Satellite evidence.\nFocused inspections.',62,513,560,103,34,C.green);
box(s,692,639,555,59,C.dark);tx(s,'Saudi Arabia · Sentinel-2 false colour\nCopernicus Sentinel data (2015)/ESA',707,645,525,55,17,C.white);
note(s,`RAIMAL helps maintenance managers decide where to send technician time. Opening statement comes from our problem and solution statements. Historical Saudi context image: ${src.esa2}. Original RAIMAL and official KFUPM logos. No partnership or endorsement implied. Cover image is context; the dated analysis later uses separate 2025 Sentinel-2 data.`);
}
// 2 — The problem, grounded in one real field.
{
const s=await slide('Where should the technician go?','THE PROBLEM');
await image(s,real+'2025-02-08-rgb.png',56,189,500,455);
tx(s,'Different signals',642,235,550,69,47,C.earth,true);
tx(s,'Limited inspection time',643,340,548,96,40,C.earth,true);
tx(s,'Which area needs\na closer look?',643,491,550,113,39,C.green);
footer(s,'Real Wadi Al-Dawasir pivot · 8 Feb 2025 · Crop and cause unconfirmed');
note(s,`Reuses the problem statement: managers responsible for multiple pivots must decide where to inspect and what to check first. The picture shows real spatial variation. It does not prove irrigation failure or quantify technician burden. ${evidence}`);
}
// 3 — Physical footprint, with a clear first market.
{
const s=await slide('A large market footprint','THE OPPORTUNITY');
tx(s,'28,080',56,208,711,136,105,C.green,true);
tx(s,'Saudi pivot fields · 2020',63,361,676,50,34);
tx(s,'624,000 tonnes',61,479,706,93,60,C.earth,true);
tx(s,'Saudi potato production · 2024',64,580,698,50,29);
box(s,828,207,375,407,C.mist);
tx(s,'FIRST MARKET',853,243,325,38,21,C.muted,true);
tx(s,'Potato farms',853,328,325,75,39,C.earth,true);
tx(s,'Wadi Al-Dawasir',853,429,325,74,32,C.green,true);
tx(s,'1 pilot operator',853,541,325,45,27);
footer(s,'Li et al. (2023); GASTAT (2024). Historical footprint and production, not revenue TAM.');
note(s,`National retrospective mapping estimates approximately 28,080 pivot fields in 2020, 7,028 km2. This is not a current count or unique customer count. GASTAT reports 624 thousand tonnes of potatoes in 2024. Pricing, active target operators and serviceable software revenue remain unmeasured. Sources: ${src.census}; ${src.stats}. Start with one commercial potato operator in Wadi Al-Dawasir. Do not assume the unverified field pictured elsewhere grows potatoes.`);
}
// 4 — Matched actual field, matched extent, two acquisition dates.
{
const s=await slide('One field, twenty days apart','REAL SENTINEL-2 OBSERVATIONS');
await image(s,real+'2025-02-08-rgb.png',87,191,450,431);
await image(s,real+'2025-02-28-rgb.png',737,191,450,431);
tx(s,'8 February',160,620,350,42,28,C.earth,true);
tx(s,'28 February',805,620,350,42,28,C.earth,true);
const a=box(s,553,402,1,1,'none'),b=box(s,708,402,1,1,'none');arrow(s,a,b);
footer(s,'Same extent · 2025 · Display colours are stretched; measurements use spectral bands.');
note(s,`${evidence} These two images are matching actual observations of the same field and extent. Microsoft Planetary Computer visual asset provides the RGB display; apparent colour differences should not substitute for index measurements. February 18 has 67.8% valid pixels in the manual circle, so it is not used as a whole-field comparison point. Only high-coverage zones from it enter the exploratory model.`);
}
// 5 — Initial assessment from genuine spectral measurements.
{
const s=await slide('Lower vegetation signal in the south','INITIAL ASSESSMENT');
await image(s,real+'2025-02-28-ndvi.png',44,192,478,441);
tx(s,'N',273,188,45,36,22,C.muted,true);
chart(s,'bar',{position:{left:546,top:220,width:663,height:350},categories:['North half','South half'],series:[{name:'8 Feb',values:[.568102,.829616],fill:C.gray},{name:'28 Feb',values:[.922412,.497309],fill:C.green}],barOptions:{direction:'column',grouping:'clustered',gapWidth:95},hasLegend:true,legend:{position:'bottom',textStyle:{typeface:F,fontSize:21,fill:C.dark}},xAxis:{...axis(),majorGridlines:null},yAxis:{...axis(),min:0,max:1,majorUnit:.25,numberFormatCode:'0.00'},dataLabels:{showValue:true,position:'outEnd',numberFormatCode:'0.00',textStyle:{typeface:F,fontSize:24,fill:C.dark}}});
tx(s,'Median NDVI',563,180,600,45,26,C.green,true);
tx(s,'Review management records first',554,594,654,49,29,C.earth,true);
for(let i=0;i<6;i++)box(s,96+i*55,622,55,12,mix('#E8BB68','#285F37',i/5));
tx(s,'0',95,640,35,25,17);tx(s,'NDVI',225,640,120,25,17);tx(s,'1',415,640,35,25,17);
footer(s,'28 Feb 2025 index map · Cause unconfirmed · Harvest, crop stage and irrigation need review.');
note(s,`${evidence} North and south are geographic halves of the same approximate circle. Median NDVI: north 0.5681 to 0.9224, south 0.8296 to 0.4973. Both endpoint scenes have 100% accepted SCL coverage within this circle. The visible map is computed directly from the February 28 bands, with a fixed 0–1 colour scale and transparent pixels outside the circle. This is an initial vegetation-pattern assessment, not a diagnosis of equipment, disease or water stress. Check planting/harvest and management records, then inspect water delivery if unexplained.`);
}
// 6 — Actual inference; anomalies are not calibrated severity.
{
const s=await slide('AI ranks zones for review','REAL-DATA MODEL OUTPUT');
polar(s,272,427,163);tx(s,'48 zones',140,200,350,43,31,C.green,true);
const r=d.ranking.filter(z=>z.preliminary_review).slice(0,5);
chart(s,'bar',{position:{left:525,top:225,width:680,height:343},categories:r.map(z=>z.zone_id),series:[{name:'Anomaly score',values:r.map(z=>+z.anomaly_score.toFixed(3)),fill:C.green}],barOptions:{direction:'column',grouping:'clustered',gapWidth:65},hasLegend:false,xAxis:{...axis(),majorGridlines:null},yAxis:{...axis(),min:0,max:.8,majorUnit:.2,numberFormatCode:'0.000'},dataLabels:{showValue:true,position:'outEnd',numberFormatCode:'0.000',textStyle:{typeface:F,fontSize:21,fill:C.dark}}});
tx(s,'Lower-vigour candidates',547,180,650,42,28,C.earth,true);
tx(s,'Higher score = more unusual',543,591,660,42,28,C.green);
tx(s,'Measured NDVI',135,610,352,36,24);
footer(s,'28 Feb 2025 · Preliminary ranking, not diagnosed severity · More history required for dispatch.');
note(s,`${evidence} This is a newly executed exploratory Isolation Forest experiment on real spectral features. Training uses ${d.train_rows} zone/date rows from February 8 and 18 with at least 80% accepted SCL coverage. February 28 is held out from fitting. Features: median NDVI, same-ring median minus zone NDVI, and change since the previous retained observation for that zone. 160 trees, random seed 42. Threshold is the 94th percentile of training scores (${d.threshold}). Bars show the top five zones that exceed that threshold AND show peer deficit >0.075 or change <-0.07. Whole ranking is saved. Unusual greening can also score highly, so it is excluded from this lower-vigour candidate view. Close scores do not establish meaningfully different severity. Only three acquisitions exist, below the MVP eight-date history requirement: no automatic dispatch or fault confirmation is claimed. Map is an editable polygon figure encoding actual February 28 zone NDVI, north-up with clockwise sectors.`);
}
// 7 — Editable end-to-end workflow with RAIMAL orchestration boundary.
{
const s=await slide('The RAIMAL workflow','SATELLITE TO FIELD ACTION');
box(s,287,212,933,398,'none',C.green);tx(s,'RAIMAL',307,226,350,39,25,C.green,true);
await image(s,real+'2025-02-28-rgb.png',60,277,183,194);
tx(s,'Sentinel-2',60,492,225,50,28,C.water,true);
const a=box(s,247,369,1,1,'none');
const b=node(s,'Quality +\nfeatures',316,318,187,128,C.mist,29);
const c=node(s,'AI engine',557,318,193,128,C.green,29);
const e=node(s,'Review\npriority',800,318,170,128,C.mist,28);
const f=node(s,'Field\ncheck',1019,318,171,128,C.mist,28);
arrow(s,a,b);arrow(s,b,c);arrow(s,c,e);arrow(s,e,f);
tx(s,'History + persistence + crop context',314,492,850,46,31,C.green,true);
tx(s,'Technician finding feeds the next review',314,553,855,42,27);
footer(s,'Real-image ranking demonstrated · Full operational integration and field validation proposed.');
note(s,`Input: Sentinel-2 surface reflectance and quality masks, plus manually supplied field geometry and operator crop records. The engine ranks unusual feature combinations. RAIMAL adds quality checks, sufficient history, persistence, task geometry, review questions and a recorded technician finding. This boundary shows the system layer around the model. The current real-data experiment is offline; production ingestion, operator records and verified field outcomes are not implemented by this slide. The synthetic MVP demonstrates the inspection-record workflow separately. No automated control of irrigation is proposed.`);
}
// 8 — Actual core model documentation plus its clear I/O.
{
const s=await slide('Inside the AI engine','ISOLATION FOREST');
await image(s,'isolation-forest-official.png',419,188,480,360);
const a=node(s,'NDVI\nPeer deficit\nChange',58,291,274,171,C.mist,29);
const b=box(s,413,362,1,1,'none'),c=box(s,902,362,1,1,'none');
const e=node(s,'Anomaly\nscore',968,303,246,143,C.green,33);
arrow(s,a,b);arrow(s,c,e);
tx(s,'Random splits isolate unusual patterns sooner',230,585,1020,58,32,C.earth,true);
footer(s,'Official scikit-learn illustration uses toy data. The preceding slide uses real Sentinel-2 features.');
note(s,`Official chart fetched from ${src.iforest}. It is the published decision-function example, not agricultural data or our output. Surrounding editable input/output flow is adapted from the official algorithm description, https://scikit-learn.org/stable/modules/outlier_detection.html#isolation-forest . Isolation Forest fits random feature/split trees. Shorter average isolation paths indicate more unusual observations. We display negative score_samples, so higher is more unusual; the official figure uses decision_function, a different display convention. This model provides anomaly scores, not named causes or calibrated severity.`);
}
// 9 — The requested downloaded neural-model architecture, clearly a future reference.
{
const s=await slide('Published satellite-AI workflow','PRITHVI REFERENCE / FUTURE CROP CONTEXT');
await image(s,'prithvi-published-example.png',58,170,877,490);
const q=node(s,'RAIMAL\ncontext\nchecks',988,366,224,165,C.green,30);
const a=box(s,944,451,1,1,'none');arrow(s,a,q);
tx(s,'Proposed\nconnection',997,563,223,75,25,C.muted);
footer(s,'IBM–NASA authors’ training diagram · HLS imagery · Not our inference or a fault classifier.');
note(s,`Original figure fetched unchanged from ${src.prithvi}. It shows the authors' multi-temporal HLS input, Prithvi encoder, convolutional head, prediction and training loss/ground truth. HLS includes harmonized Landsat and Sentinel observations. Our green block is a proposed downstream context connection, not part of the authors' figure. The checkpoint classifies 13 crop/land-cover categories; it has no potato or irrigation-fault class. It is an optional future experiment, not the core Isolation Forest used in the real-data analysis. We did not run this checkpoint. Preserve the training arrows and source labels; do not present the montage as a matched diagnostic pair.`);
}
// 10 — One editable value graph, a target rather than a claimed result.
{
const s=await slide('Less time deciding where to inspect','PILOT VALUE TARGET');
chart(s,'bar',{position:{left:71,top:217,width:656,height:400},categories:['Baseline','Target'],series:[{name:'Hours / month',values:[100,75],fill:C.green,points:[{idx:0,fill:C.gray},{idx:1,fill:C.green}]}],barOptions:{direction:'column',grouping:'clustered',gapWidth:110},hasLegend:false,xAxis:{...axis(),majorGridlines:null},yAxis:{...axis(),min:0,max:110,majorUnit:25},dataLabels:{showValue:true,position:'outEnd',textStyle:{typeface:F,fontSize:30,fill:C.dark,bold:true}}});
tx(s,'Hours / month',104,180,536,41,26,C.muted);
tx(s,'25%',820,257,390,127,105,C.green,true);tx(s,'less search time',826,406,379,61,33);
tx(s,'SAR 1,875 / month',823,538,390,55,34,C.earth,true);
footer(s,'Illustrative target: 50 pivots × 4 rounds × 30 minutes; SAR 75/hour. Savings not yet measured.');
note(s,'Scenario from problem_statement.md: 50 pivots × 4 rounds × 30 minutes gives 100 monthly decision/search hours. A 25% reduction releases 25 hours. At an assumed SAR 75/hour, this equals SAR 1,875 of capacity value. It is not observed savings, product revenue or a pricing proposal. Validate with operator logs. No water savings or yield gains are claimed.');
}
// 11 — Pilot and direct ask in one sparse composition.
{
const s=await slide('One operator. Twenty pivots.','THE FIRST PILOT');
const a=node(s,'Verify fields',64,244,326,106,C.mist,34),b=node(s,'Observe + inspect',470,244,333,106,C.mist,30),c=node(s,'Review results',883,244,328,106,C.green,33);
arrow(s,a,b);arrow(s,b,c);
tx(s,'Weeks 1–2',80,370,308,43,26);tx(s,'Weeks 3–10',487,370,300,43,26);tx(s,'Weeks 11–12',901,370,303,43,26);
tx(s,'Boundaries + records + field access',64,487,1140,76,42,C.earth,true);
tx(s,'SAR 16,440 proposed budget',66,590,1100,49,32,C.green);
footer(s,'Pilot target: ≥25% less search time; ≥70% actionable recommendations.');
note(s,'Proposed pilot from solution_statement.md. One operator, approximately 20 comparable pivots. Measure decision/search time, recommendation actionability and missed cases. Compare a frozen model with a simple sector rule and current practice. Inspect alerted and sampled unalerted zones independently; protect recall (target at most 5 percentage point loss). Extend if cloud gaps or too few independently confirmed cases prevent interpretation. Budget SAR 13,700 base plus 20% contingency (SAR 2,740): engineering 8,000; agronomy 1,800; technicians 2,400; compute/storage 500; travel 1,000. Request field boundaries, dated maintenance/crop records and inspection access.');
}
// 12 — User-supplied portraits and credentials, original event marks.
{
const s=await slide('The team','RAIMAL / KFUPM',{brand:true});
for(const x of [56,456,856]){
box(s,x,186,368,508,C.white,C.gray,'roundRect');
box(s,x+82,203,204,214,C.mist,C.gray,'roundRect');
}
await image(s,'team/Hamza-portrait.png',150,210,180,200);
await image(s,'team/Muaath-portrait.png',550,210,180,200);
await image(s,'team/sultan al-aiban.jpeg',950,210,180,200);
tx(s,'Hamza Yousef',76,432,328,42,29,C.earth,true);
tx(s,'Muaath Al Qarni',476,432,328,42,29,C.earth,true);
tx(s,'Sultan Al Aiban',876,432,328,42,29,C.earth,true);
tx(s,'Software Engineering',76,477,328,34,23);
tx(s,'Computer Science',476,477,328,34,23);
tx(s,'Computer Science',876,477,328,34,23);
tx(s,'7th-ranked\nSaudi physicist',76,521,328,77,29,C.green,true);
tx(s,'International\nbronze medalist',476,521,328,77,29,C.amber,true);
tx(s,'International\nbronze medalist',876,521,328,77,29,C.amber,true);
tx(s,'APhO 2024',76,603,328,30,21,C.muted);
tx(s,'IOAI 2025',476,603,328,30,21,C.muted);
tx(s,'IOI 2026 + APIO 2026',876,603,328,30,21,C.muted);
await image(s,'events/apho-2024.png',145,637,186,49);
await image(s,'events/ioai.png',525,635,231,50);
await image(s,'events/ioi-2026.png',936,634,55,55);
await image(s,'events/apio-2026.png',1020,644,134,40);
note(s,'Portraits, majors and credentials supplied by the user. Hamza: 7th-ranked Saudi physicist and APhO 2024 participant, per user; ranking scope and result record were not independently supplied. No medal claim supplied for Hamza. Muaath: IOAI 2025 Beijing bronze, confirmed at https://ioai-official.org/china-2025/results-2025/ (Muaath Mohammed A Alqarni). Sultan: IOI 2026 and APIO 2026 bronze, per user. Logos identify the competitions attached to these personal achievements, not institutional sponsorship. APhO artwork from official host banner https://apho2024.utar.edu.my/images/headerbanner/banner_66421bea263be.png, cropped to the complete event mark. IOAI logo from official repository https://github.com/IOAI-official/IOAI-2025/tree/main/At-Home-Round/Chameleon/figs . IOI 2026 logo verified against https://ioi2026.uz/about-logo and downloaded from Georgian Science Foundation mirror https://rustaveli.org.ge/res/images/images/3c972ba6857ec92bfbc379c6e89168aebf68d533.png . APIO 2026 logo from https://prabowodjonatan.id/apio-ranking/static/apio2026.png ; official event https://www.apio2026.ntnu.tw/ .');
}

await fs.writeFile(path.join(tmp,'word-counts.json'),JSON.stringify(words.map((n,i)=>({slide:i+1,authoredWords:n})),null,2));
if(words.some(n=>n>=80))throw Error('Sparse-slide word limit exceeded');
await fs.writeFile(path.join(out,'speaker-notes-final.md'),'# RAIMAL presentation notes\n\n'+notes.map((n,i)=>`## Slide ${i+1}\n\n${n}`).join('\n\n'));
await (await PresentationFile.exportPptx(p)).save(path.join(tmp,'candidate.pptx'));
const final=path.join(out,'RAIMAL-preview-v6.pptx');
await finalizePresentation({workspaceDir:root,candidatePath:path.join(tmp,'candidate.pptx'),finalPath:final,pythonExecutable:runtime+'/python/python.exe',integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit'],requiredNativeChartOwnerSlides:[5,6,10],materializeLiteralChartWorkbooks:true,explicitTotalSlideCount:12,fontPolicy:{basis:'design',families:[F]},verifyArtifactToolImport:true,receiptPath:path.join(tmp,'validation-v6.json')});
const deck=await PresentationFile.importPptx(await FileBlob.load(final));
for(let i=0;i<deck.slides.items.length;i++){const blob=await deck.export({slide:deck.slides.items[i],format:'png',scale:2});await fs.writeFile(path.join(tmp,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()));console.log(`Rendered ${i+1}/12`);}
console.log('Complete',words);
