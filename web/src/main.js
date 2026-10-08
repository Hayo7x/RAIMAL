import './style.css';

const app = document.querySelector('#app');
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key = 'pivotwatch.demo.inspections.v1';
let data, date, coverage = 80, selected, records = [], storageWarning = '';
try { records = JSON.parse(localStorage.getItem(key) || '[]'); if (!Array.isArray(records)) records = []; }
catch { storageWarning = 'Saved findings could not be loaded. Browser storage may be unavailable.'; }

function render() {
  const run = data.runs[`${date}:${coverage}`];
  selected = run.tasks.some(t => t.sector === selected) ? selected : run.tasks[0]?.sector;
  const task = run.tasks.find(t => t.sector === selected);
  const zones = task ? run.zones.filter(z => task.zone_id.split(', ').includes(z.zone_id)) : [];
  app.innerHTML = `<header><a href="#">RAIMAL <span>/ Inspection desk</span></a><span class="badge">Synthetic demo</span></header>
    <main><section class="intro"><p class="eyebrow">FIELD INTELLIGENCE / INSPECTION DESK</p><h1>Read the field.<br>Focus the next check.</h1><p>Review persistent crop-pattern changes and record what you find on the ground.</p><p class="muted">Simulated observations. An anomaly is an inspection prompt, not a confirmed irrigation fault.</p></section>
    <section class="controls" aria-label="Replay controls"><label>Observation date<select id="date">${data.dates.map(d => `<option ${d === date ? 'selected' : ''}>${d}</option>`).join('')}</select></label><label>Minimum valid coverage<select id="coverage">${Array.from({length:11},(_,i)=>50+i*5).map(n=>`<option value="${n}" ${n===coverage?'selected':''}>${n}%</option>`).join('')}</select></label><p>Requires 8 valid dates and persistence on 2 dates within 20 days.</p></section>
    <div class="stats"><article><strong>${run.tasks.length}</strong><span>Inspection tasks</span></article><article><strong>${run.zones.filter(z=>z.status==='withheld').length}</strong><span>Zones withheld</span></article><article><strong>${run.gates.history_dates_available}</strong><span>Dates in replay</span></article></div>
    <div class="workspace"><section class="panel"><p class="eyebrow">01 / PRIORITIZE</p><h2>Inspection queue</h2>${run.tasks.length ? run.tasks.map(t=>`<button class="task ${t.sector===selected?'active':''}" data-sector="${t.sector}" aria-pressed="${t.sector===selected}"><strong>${escape(t.sector_name)}</strong><span>${t.radius_start_m}–${t.radius_end_m} m from pivot center</span><span>Needs inspection →</span></button>`).join('') : '<p class="empty">No tasks meet the current evidence gates. This is not a healthy-field verdict. Try a later observation date or review the coverage requirement.</p>'}<details><summary>All zone statuses</summary><div class="table-wrap"><table><thead><tr><th>Zone</th><th>Status</th><th>Coverage</th></tr></thead><tbody>${run.zones.map(z=>`<tr><td>${escape(z.zone_id)}</td><td>${escape(z.status_label)}</td><td>${Math.round(z.coverage*100)}%</td></tr>`).join('')}</tbody></table></div></details></section>
    <section class="panel"><p class="eyebrow">02 / REVIEW & RECORD</p><h2>${task ? escape(task.sector_name) : 'Evidence first.'}</h2>${task ? `<p>${escape(task.question)}</p><p class="muted">${escape(task.zone_id)} · ${Math.round(task.valid_coverage*100)}% minimum coverage · ${task.observation_count} valid dates</p><h3>Observation history</h3><p class="muted">NDVI values for candidate zones up to the selected date. — indicates insufficient coverage.</p><div class="table-wrap"><table><thead><tr><th>Date</th>${zones.map(z=>`<th>${escape(z.zone_id)}</th>`).join('')}</tr></thead><tbody>${data.dates.filter(d=>d<=date).map(d=>`<tr><td>${d}</td>${zones.map(z=>{const o=data.observations.find(o=>o.zone_id===z.zone_id && o.date.startsWith(d));return `<td>${o && o.valid_coverage>=coverage/100 ? o.ndvi.toFixed(3) : '—'}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div><form id="finding"><h3>Record a demo field check</h3><label>Finding<select name="outcome"><option>Water delivery issue observed</option><option>Crop or soil issue observed</option><option>No issue observed</option><option>Inconclusive — follow-up needed</option></select></label><label>Field notes<textarea name="notes" maxlength="2000" required placeholder="Describe what you checked and observed."></textarea></label><button class="primary" type="submit">Save demo finding</button><p class="muted">Saved only in this browser. No shared or cloud storage.</p></form>` : '<p>Select a qualifying task to inspect its evidence and record a finding.</p>'}</section></div>
    <section class="panel records"><p class="eyebrow">03 / FOLLOW THROUGH</p><h2>Recorded checks</h2><p id="message" role="status">${escape(storageWarning)}</p>${records.length ? `<button id="export">Export demo findings</button>${records.slice().reverse().map(r=>`<article class="record"><strong>${escape(r.outcome)}</strong><p>${escape(r.date)} · ${escape(r.zones)} · ${escape(r.coverage)}% coverage gate</p><p class="notes">${escape(r.notes)}</p></article>`).join('')}` : '<p>No checks recorded in this browser yet.</p>'}</section><footer>RAIMAL · Precomputed Isolation Forest analysis · Synthetic demonstration</footer></main>`;
  document.querySelector('#date').onchange = e => { date=e.target.value; render(); };
  document.querySelector('#coverage').onchange = e => { coverage=Number(e.target.value); render(); };
  document.querySelectorAll('[data-sector]').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.sector);render();});
  document.querySelector('#finding')?.addEventListener('submit', e=>{
    e.preventDefault(); const form=new FormData(e.target); const notes=form.get('notes').trim();
    if(!notes) { e.target.elements.notes.setCustomValidity('Describe your field check.'); e.target.elements.notes.reportValidity(); return; }
    const next=[...records,{id:crypto.randomUUID(),date,coverage,run_id:run.run_id,zones:task.zone_id,outcome:form.get('outcome'),notes,recorded_at:new Date().toISOString(),synthetic_demo:true}];
    try {localStorage.setItem(key,JSON.stringify(next));records=next;storageWarning='Demo finding saved in this browser.';render();}
    catch {document.querySelector('#message').textContent='Could not save. Browser storage is unavailable or full. Your notes remain in the form.';}
  });
  document.querySelector('textarea')?.addEventListener('input',e=>e.target.setCustomValidity(''));
  document.querySelector('#export')?.addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(records,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='pivotwatch-demo-findings.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
}
async function start() {
  app.innerHTML='<main><p role="status">Loading demo evidence…</p></main>';
  try {const response=await fetch('/demo.json');if(!response.ok)throw Error('Unable to load demo');data=await response.json();date=data.dates.at(-1);render();}
  catch {app.innerHTML='<main><h1>Evidence could not be loaded.</h1><p>Check your connection and try again.</p><button id="retry">Retry</button></main>';document.querySelector('#retry').onclick=start;}
}
start();

