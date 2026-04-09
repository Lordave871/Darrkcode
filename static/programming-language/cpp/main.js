(function(){
  'use strict';
  const DETAILS_URL = './details.json';
  const PROG_KEY = 'cpp_done_v1';
  const NOTES_KEY = 'cpp_notes_v1';
  let DETAILS = {};
  const $ = id => document.getElementById(id);

  function readJSON(k){ try { return JSON.parse(localStorage.getItem(k)||'{}'); } catch(e){ return {}; } }
  function writeJSON(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){ console.warn(e); } }

  async function loadDetails(){
    try {
      const res = await fetch(DETAILS_URL, { cache: 'no-store' });
      if(!res.ok) throw new Error('fetch failed');
      DETAILS = await res.json();
    } catch(err){
      console.warn('Could not load details.json', err);
      DETAILS = window.DETAILS || {};
    }
    renderTopics();
    renderTopicList();
    renderSavedNotesList();
    refreshProgressUI();
  }

  function renderTopics(filter=''){
    const grid = $('topics-grid'); if(!grid) return; grid.innerHTML='';
    Object.keys(DETAILS).forEach(k=>{
      if(k==='interview_index') return;
      const d = DETAILS[k] || {};
      const text = ((d.title||'') + ' ' + (d.summary||'')).toLowerCase();
      if(filter && !text.includes(filter.toLowerCase())) return;
      const card = document.createElement('article');
      card.className = 'option-card';
      card.dataset.key = k;
      card.innerHTML = `
        <div class="card-icon" aria-hidden="true">${escapeHtml(((d.title||'')[0])||'C')}</div>
        <h3>${escapeHtml(d.title||k)}</h3>
        <p>${escapeHtml((d.summary||'').slice(0,120))}</p>
        <div class="actions">
          <button class="btn" data-action="learn">Learn</button>
          <button class="btn ${isDone(k)?'primary':''}" data-action="done">${isDone(k)?'Done':'Mark done'}</button>
          <button class="btn" data-action="note">Notes</button>
        </div>
      `;
      card.querySelectorAll('button').forEach(btn=>{
        btn.addEventListener('click', e=>{
          e.stopPropagation();
          const a = btn.getAttribute('data-action');
          if(a==='learn') openTopicModal(k);
          if(a==='note') openNotesFor(k);
          if(a==='done'){ toggleDone(k); btn.classList.toggle('primary'); btn.textContent = isDone(k)?'Done':'Mark done'; }
        });
      });
      card.addEventListener('click', ()=> openTopicModal(k));
      grid.appendChild(card);
    });
  }

  function renderTopicList(filter=''){
    const container = $('topic-list'); if(!container) return; container.innerHTML='';
    const keys = Object.keys(DETAILS).filter(k=>k!=='interview_index' && (!filter || (((DETAILS[k]&&DETAILS[k].title)||'') + ((DETAILS[k]&&DETAILS[k].summary)||'')).toLowerCase().includes(filter.toLowerCase())));
    keys.sort((a,b)=> ((DETAILS[a].title||a).localeCompare(DETAILS[b].title||b)));
    if(!keys.length){ container.innerHTML = '<div style="color:var(--muted)">No topics</div>'; return; }
    keys.forEach(k=>{
      const d = DETAILS[k]||{};
      const row = document.createElement('div');
      row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.padding='6px'; row.style.borderRadius='6px'; row.style.cursor='pointer'; row.style.color='var(--muted)';
      const left = document.createElement('div'); left.style.fontWeight='700'; left.textContent = d.title||k; left.addEventListener('click', ()=> openTopicModal(k));
      const actions = document.createElement('div'); actions.style.display='flex'; actions.style.gap='6px';
      actions.appendChild(makeBtn('Learn', ()=> openTopicModal(k)));
      actions.appendChild(makeBtn('Notes', ()=> openNotesFor(k)));
      const done = makeBtn(isDone(k)?'Done':'Mark', ()=> { toggleDone(k); renderTopics($('topic-search')?.value||''); renderTopicList($('topic-search')?.value||''); });
      if(isDone(k)) done.classList.add('primary');
      actions.appendChild(done);
      row.appendChild(left); row.appendChild(actions); container.appendChild(row);
    });
  }

  function makeBtn(txt,onClick){ const b=document.createElement('button'); b.className='btn'; b.textContent=txt; b.addEventListener('click', e=>{ e.stopPropagation(); onClick(); }); return b; }

  // modal wiring
  const modal = $('topic-modal'), modalTitle = $('modal-title'), modalBody = $('modal-body');
  $('modal-close')?.addEventListener('click', ()=> { if(modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); } });

  function openTopicModal(key){
    const d = DETAILS[key]||{};
    if(modalTitle) modalTitle.textContent = d.title || key;
    if(modalBody) modalBody.innerHTML = `
      <div style="font-weight:800;margin-bottom:8px">${escapeHtml(d.title||'')}</div>
      <div style="color:var(--muted)">${escapeHtml(d.details||d.summary||'')}</div>
      ${renderExamples(d.examples)}
      <div style="margin-top:12px;display:flex;gap:8px">
        <button id="modal-mark" class="btn ${isDone(key)?'primary':''}">${isDone(key)?'Done':'Mark done'}</button>
        <button id="modal-notes" class="btn">Open notes</button>
      </div>
    `;
    if(modal){ modal.style.display='flex'; modal.setAttribute('aria-hidden','false'); }
    setTimeout(()=> {
      document.getElementById('modal-mark')?.addEventListener('click', ()=> { toggleDone(key); const el=document.getElementById('modal-mark'); if(el){ el.classList.toggle('primary'); el.textContent = isDone(key)?'Done':'Mark done'; } renderTopics($('topic-search')?.value||''); renderTopicList($('topic-search')?.value||''); });
      document.getElementById('modal-notes')?.addEventListener('click', ()=> { openNotesFor(key); if(modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }});
    },0);
  }

  function renderExamples(exs){ if(!exs || !exs.length) return ''; return `<div style="margin-top:10px"><strong>Examples</strong>${exs.map(e=>`<pre style="background:rgba(0,0,0,0.6);padding:8px;border-radius:6px;margin-top:6px;color:var(--muted);white-space:pre-wrap">${escapeHtml(e.code||e)}</pre>`).join('')}</div>`; }

  // Notes
  let currentNotesTopic = null;
  $('notes-text')?.addEventListener('input', debounce(()=> {
    if(!currentNotesTopic) return;
    try { const text = String($('notes-text').value||''); const all = readJSON(NOTES_KEY)||{}; all[currentNotesTopic] = { text, updated: Date.now() }; writeJSON(NOTES_KEY, all); renderSavedNotesList(currentNotesTopic); } catch(e){ console.error('autosave', e); }
  }, 300));

  window.openNotesFor = openNotesFor;
  function openNotesFor(key){
    currentNotesTopic = key;
    const all = readJSON(NOTES_KEY) || {}; const entry = all[key]; const text = entry && typeof entry === 'object' ? (entry.text||'') : (entry||'');
    if($('notes-text')){ $('notes-text').value = text; $('notes-text').focus(); }
    renderSavedNotesList();
  }

  function renderSavedNotesList(highlightKey){
    const container = $('saved-notes-list'); if(!container) return; const all = readJSON(NOTES_KEY)||{}; const keys = Object.keys(all).sort((a,b)=> (all[b].updated||0)-(all[a].updated||0)); container.innerHTML=''; if(!keys.length){ const empty=document.createElement('div'); empty.style.color='var(--muted)'; empty.textContent='No notes yet.'; container.appendChild(empty); return; }
    keys.forEach(k=>{ const entry = all[k]; const preview = String((entry && entry.text)||'').slice(0,120).replace(/\n/g,' '); const row=document.createElement('div'); row.dataset.key=k; row.style.padding='8px'; row.style.borderRadius='8px'; row.style.background='linear-gradient(180deg,rgba(255,255,255,0.01),transparent)'; row.style.cursor='pointer'; const title=document.createElement('div'); title.style.fontWeight='700'; title.textContent = (DETAILS[k] && DETAILS[k].title) ? DETAILS[k].title : k; const meta=document.createElement('div'); meta.style.display='flex'; meta.style.justifyContent='space-between'; meta.style.alignItems='center'; const prev=document.createElement('div'); prev.style.color='var(--muted)'; prev.style.fontSize='12px'; prev.textContent = preview; const right=document.createElement('div'); right.style.display='flex'; right.style.gap='8px'; const openBtn=document.createElement('button'); openBtn.className='btn'; openBtn.textContent='Open'; openBtn.addEventListener('click', e=>{ e.stopPropagation(); openNotesFor(k); }); const delBtn=document.createElement('button'); delBtn.className='btn'; delBtn.textContent='✕'; delBtn.addEventListener('click', e=>{ e.stopPropagation(); if(confirm('Delete note?')) deleteNote(k); }); right.appendChild(openBtn); right.appendChild(delBtn); meta.appendChild(prev); meta.appendChild(right); row.appendChild(title); row.appendChild(meta); row.addEventListener('click', ()=> openNotesFor(k)); container.appendChild(row); });
    if(highlightKey){ const a = container.querySelector(`[data-key="${String(highlightKey)}"]`); if(a){ a.scrollIntoView({behavior:'smooth', block:'start'}); a.style.boxShadow='0 12px 36px rgba(124,92,255,0.14)'; setTimeout(()=> a.style.boxShadow='',900); } }
  }

  function saveCurrentNote(){ if(!currentNotesTopic){ alert('Open a topic first to save its note.'); return; } try{ const text = String($('notes-text').value||''); const all = readJSON(NOTES_KEY)||{}; all[currentNotesTopic]={text,updated:Date.now()}; writeJSON(NOTES_KEY, all); renderSavedNotesList(currentNotesTopic); const btn=$('save-note'); if(btn){ const old=btn.textContent; btn.textContent='Saved'; setTimeout(()=> btn.textContent=old,900); } }catch(e){ console.error(e); alert('Could not save note'); } }
  function deleteNote(key){ try{ const all = readJSON(NOTES_KEY)||{}; if(all[key]) delete all[key]; writeJSON(NOTES_KEY, all); if(currentNotesTopic===key){ if($('notes-text')) $('notes-text').value=''; currentNotesTopic=null; } renderSavedNotesList(); }catch(e){ console.error(e); } }

  // Progress helpers
  function isDone(key){ return !!readJSON(PROG_KEY)[key]; }
  function toggleDone(key){ const m = readJSON(PROG_KEY); if(m[key]) delete m[key]; else m[key]=true; writeJSON(PROG_KEY, m); refreshProgressUI(); renderTopics($('topic-search')?.value||''); renderTopicList($('topic-search')?.value||''); }

  function refreshProgressUI(){ try{ const m = readJSON(PROG_KEY); const topicKeys = Object.keys(DETAILS).filter(k=>k!=='interview_index'); const total = topicKeys.length || 1; const done = Object.keys(m).filter(k=> topicKeys.includes(k)).length; const pct = Math.round((done/total)*100); const progressText = $('progress-text'); if(progressText) progressText.textContent = pct + '%'; const circle = $('progress-ring-circle'); if(circle && circle.r && circle.r.baseVal){ const radius = circle.r.baseVal.value; const circumference = 2*Math.PI*radius; circle.style.strokeDasharray = `${circumference} ${circumference}`; const offset = Math.max(0, circumference - (pct/100)*circumference); requestAnimationFrame(()=>{ circle.style.transition='stroke-dashoffset .8s cubic-bezier(.2,.9,.2,1)'; circle.style.strokeDashoffset = offset; }); } }catch(e){ console.warn('refreshProgressUI', e); } }

  // Cheat / interview wiring
  function renderCheatTopicList(){ const wrap = $('cheat-topic-list'); if(!wrap) return; wrap.innerHTML=''; Object.keys(DETAILS).forEach(k=>{ if(k==='interview_index') return; const d=DETAILS[k]||{}; const row=document.createElement('div'); row.dataset.key=k; row.style.padding='8px'; row.style.cursor='pointer'; row.style.borderBottom='1px solid rgba(255,255,255,0.03)'; row.innerHTML = `<div style="font-weight:800">${escapeHtml(d.title||k)}</div><div style="color:var(--muted);font-size:12px">${escapeHtml((d.summary||'').slice(0,120))}</div>`; row.addEventListener('click', ()=> selectCheatTopic(k)); wrap.appendChild(row); }); }
  function selectCheatTopic(key){ const d = DETAILS[key]||{}; const pre=$('cheat-pre'); if(pre) pre.textContent = d.cheat || d.summary || '// No cheat'; const title=$('cheat-title'); if(title) title.textContent = d.title||key; const ex=$('cheat-examples'); if(ex){ ex.innerHTML=''; if(d.examples && Array.isArray(d.examples)) d.examples.forEach(e=>{ const p=document.createElement('pre'); p.style.background='rgba(0,0,0,0.6)'; p.style.padding='8px'; p.style.borderRadius='6px'; p.style.marginTop='8px'; p.style.color='var(--muted)'; p.style.whiteSpace='pre-wrap'; p.textContent=(e.code||e)+'\n'; ex.appendChild(p); }); } Array.from($('cheat-topic-list')?.children||[]).forEach(n=> n.style.background = n.dataset.key===key ? 'linear-gradient(180deg, rgba(124,92,255,0.06), rgba(110,155,255,0.03))' : 'transparent'); }
  function renderInterviewTopicList(){ const wrap = $('interview-topic-list'); if(!wrap) return; wrap.innerHTML=''; const idx = Array.isArray(DETAILS.interview_index)?DETAILS.interview_index:Object.keys(DETAILS).map(k=>({key:k,title:(DETAILS[k]&&DETAILS[k].title)||k})); idx.forEach(entry=>{ const key=entry.key||entry; const title=entry.title||((DETAILS[key]&&DETAILS[key].title)||key); const row=document.createElement('div'); row.dataset.key=key; row.style.padding='10px'; row.style.cursor='pointer'; row.style.borderBottom='1px solid rgba(255,255,255,0.03)'; row.innerHTML=`<div style="font-weight:800">${escapeHtml(title)}</div>`; row.addEventListener('click', ()=> selectInterviewTopic(key)); wrap.appendChild(row); }); }
  function selectInterviewTopic(key){ const d=DETAILS[key]||{}; const list=$('interview-list'); const title=$('interview-title'); const wrap=$('interview-topic-list'); if(!list||!title||!wrap) return; title.textContent=d.title||key; list.innerHTML=''; const arr=(d&&d.interview)||[]; if(!arr.length){ list.innerHTML='<div style="color:var(--muted)">No interview Q&amp;A available for this topic.</div>'; Array.from(wrap.children).forEach(n=> n.style.background = n.dataset.key===key ? 'linear-gradient(180deg, rgba(124,92,255,0.06), rgba(110,155,255,0.03))' : 'transparent'); return; } arr.forEach((qa,i)=>{ const det=document.createElement('details'); det.style.marginBottom='8px'; det.style.padding='8px'; det.style.borderRadius='8px'; det.style.background='linear-gradient(180deg,rgba(255,255,255,0.01),transparent)'; det.innerHTML = `<summary style="font-weight:800">Q${i+1}: ${escapeHtml(qa.q)}</summary><div style="margin-top:8px;color:var(--muted);white-space:pre-wrap">${escapeHtml(qa.a)}</div>`; list.appendChild(det); }); Array.from(wrap.children).forEach(node=> node.style.background = node.dataset.key===key ? 'linear-gradient(180deg, rgba(124,92,255,0.06), rgba(110,155,255,0.03))' : 'transparent'); }

  // Search + UI wiring
  $('topic-search')?.addEventListener('input', debounce((e)=>{ const v=e.target.value.trim(); renderTopics(v); renderTopicList(v); }, 140));
  $('cheat-btn')?.addEventListener('click', ()=>{ try{ renderCheatTopicList(); const first = Object.keys(DETAILS).find(k=>k && k!=='interview_index'); if(first) selectCheatTopic(first);}catch(e){}; const m=$('cheat-modal'); if(m){ m.style.display='flex'; m.setAttribute('aria-hidden','false'); }});
  $('cheat-close')?.addEventListener('click', ()=>{ const m=$('cheat-modal'); if(m){ m.style.display='none'; m.setAttribute('aria-hidden','true'); }});
  $('cheat-copy')?.addEventListener('click', ()=>{ const pre=$('cheat-pre'); if(!pre) return; navigator.clipboard?.writeText(pre.textContent||'').then(()=>{ const b=$('cheat-copy'); const old=b.textContent; b.textContent='Copied'; setTimeout(()=> b.textContent=old,900); }).catch(()=>alert('Could not copy')); });
  $('interview-btn')?.addEventListener('click', ()=>{ try{ renderInterviewTopicList(); const first = Array.isArray(DETAILS.interview_index) && DETAILS.interview_index.length ? DETAILS.interview_index[0].key : Object.keys(DETAILS).find(k=>k && k!=='interview_index'); if(first) selectInterviewTopic(first);}catch(e){}; const m=$('interview-modal'); if(m){ m.style.display='flex'; m.setAttribute('aria-hidden','false'); }});
  $('interview-close')?.addEventListener('click', ()=>{ const m=$('interview-modal'); if(m){ m.style.display='none'; m.setAttribute('aria-hidden','true'); }});

  // Notes controls
  document.addEventListener('DOMContentLoaded', ()=> {
    $('save-note')?.addEventListener('click', saveCurrentNote);
    $('clear-note')?.addEventListener('click', ()=>{ if(currentNotesTopic){ if(!confirm('Clear saved note for this topic?')) return; const all=readJSON(NOTES_KEY)||{}; if(all[currentNotesTopic]) delete all[currentNotesTopic]; writeJSON(NOTES_KEY, all); if($('notes-text')) $('notes-text').value=''; currentNotesTopic=null; renderSavedNotesList(); } else if($('notes-text')) $('notes-text').value=''; });
    $('clear-all-notes')?.addEventListener('click', ()=>{ if(!confirm('Delete all saved notes?')) return; localStorage.removeItem(NOTES_KEY); if($('notes-text')) $('notes-text').value=''; currentNotesTopic=null; renderSavedNotesList(); });
  });

  // utilities
  function debounce(fn,t=150){ let timer; return (...a)=>{ clearTimeout(timer); timer=setTimeout(()=>fn.apply(this,a), t); }; }
  function escapeHtml(s){ if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // init
  loadDetails();

  // expose for debug
  window.CPP = { DETAILS, renderTopics, renderTopicList, refreshProgressUI };
})();