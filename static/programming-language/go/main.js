/* Minimal runtime for go.html:
   - Loads details.json
   - Renders topics grid + topic list
   - Topic modal, notes autosave per-topic
   - Progress ring refresh
*/
(async function(){
  'use strict';
  const DETAILS_URL = './details.json';
  const PROG_KEY = 'go_done_v1';
  const NOTES_KEY = 'go_notes_v1';
  let DETAILS = {};
  const $ = id => document.getElementById(id);

  async function loadDetails(){
    try{
      const res = await fetch(DETAILS_URL, {cache:'no-store'});
      if(!res.ok) throw new Error('fetch failed');
      DETAILS = await res.json();
    }catch(e){
      console.warn('Could not load details.json', e);
      DETAILS = window.DETAILS || {};
    }
    renderTopics();
    renderTopicList();
    renderSavedNotesList();
    refreshProgressUI();
  }

  function renderTopics(filter=''){
    const grid = $('topics-grid');
    if(!grid) return;
    grid.innerHTML = '';
    Object.keys(DETAILS).forEach(k=>{
      if(k === 'interview_index') return;
      const d = DETAILS[k] || {};
      const text = (d.title + ' ' + d.summary).toLowerCase();
      if(filter && !text.includes(filter.toLowerCase())) return;
      const card = document.createElement('article');
      card.className = 'option-card';
      card.dataset.key = k;
      card.innerHTML = `
        <div class="card-icon" aria-hidden="true">${escapeHtml((d.title||'')[0]||'•')}</div>
        <h3>${escapeHtml(d.title||k)}</h3>
        <p>${escapeHtml((d.summary||'').slice(0,120))}</p>
        <div class="actions" style="width:100%;margin-top:auto">
          <button class="btn" data-action="learn">Learn</button>
          <button class="btn ${isDone(k)?'primary':''}" data-action="done">${isDone(k)?'Done':'Mark done'}</button>
          <button class="btn" data-action="note">Notes</button>
        </div>
      `;
      card.querySelectorAll('button').forEach(btn=>{
        btn.addEventListener('click', e=>{
          e.stopPropagation();
          const a = btn.getAttribute('data-action');
          if(a === 'learn') openTopicModal(k);
          if(a === 'note') openNotesFor(k);
          if(a === 'done'){ toggleDone(k); btn.classList.toggle('primary'); btn.textContent = isDone(k)?'Done':'Mark done'; }
        });
      });
      card.addEventListener('click', ()=> openTopicModal(k));
      grid.appendChild(card);
    });
  }

  function renderTopicList(filter=''){
    const container = $('topic-list');
    if(!container) return;
    container.innerHTML = '';
    const keys = Object.keys(DETAILS).filter(k=> k!=='interview_index' && (!filter || ( (DETAILS[k] && (DETAILS[k].title + DETAILS[k].summary) || '').toLowerCase().includes(filter.toLowerCase()) ) )).sort((a,b)=> {
      const ta = (DETAILS[a] && DETAILS[a].title) ? DETAILS[a].title.toLowerCase() : a;
      const tb = (DETAILS[b] && DETAILS[b].title) ? DETAILS[b].title.toLowerCase() : b;
      return ta.localeCompare(tb);
    });
    if(!keys.length){ container.innerHTML = '<div style="color:var(--muted)">No topics</div>'; return; }
    keys.forEach(k=>{
      const d = DETAILS[k] || {};
      const row = document.createElement('div');
      row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.padding='6px';
      row.style.borderRadius='6px'; row.style.cursor='pointer'; row.style.color='var(--muted)';
      const left = document.createElement('div'); left.style.fontWeight='700'; left.textContent = d.title || k;
      left.addEventListener('click', ()=> openTopicModal(k));
      const actions = document.createElement('div'); actions.style.display='flex'; actions.style.gap='6px';
      const learn = document.createElement('button'); learn.className='btn'; learn.textContent='Learn'; learn.addEventListener('click', e=>{ e.stopPropagation(); openTopicModal(k);});
      const note = document.createElement('button'); note.className='btn'; note.textContent='Notes'; note.addEventListener('click', e=>{ e.stopPropagation(); openNotesFor(k);});
      const done = document.createElement('button'); done.className='btn' + (isDone(k)?' primary':''); done.textContent = isDone(k)?'Done':'Mark'; done.addEventListener('click', e=>{ e.stopPropagation(); toggleDone(k); done.classList.toggle('primary'); done.textContent = isDone(k)?'Done':'Mark';});
      actions.appendChild(learn); actions.appendChild(note); actions.appendChild(done);
      row.appendChild(left); row.appendChild(actions); container.appendChild(row);
    });
  }

  // modal wiring (updated to include detailed explanation)
  const modal = $('topic-modal'); const modalTitle = $('modal-title'); const modalBody = $('modal-body');
  $('modal-close')?.addEventListener('click', ()=> { if(modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); } });

  function openTopicModal(key){
    const d = DETAILS[key] || {};
    modalTitle.textContent = d.title || key;

    // include both summary and rich details when available
    const summaryHtml = d.summary ? `<div style="color:var(--muted);margin-top:6px">${escapeHtml(d.summary)}</div>` : '';
    const detailsHtml = d.details ? `<div style="color:var(--muted);margin-top:10px;line-height:1.5">${escapeHtml(d.details)}</div>` : '';

    modalBody.innerHTML = `
      <div style="font-weight:800;margin-bottom:8px">${escapeHtml(d.title||'')}</div>
      ${summaryHtml}
      ${detailsHtml}
      ${renderExamples(d.examples)}
      <div style="margin-top:12px;display:flex;gap:8px">
        <button id="modal-mark" class="btn ${isDone(key)?'primary':''}">${isDone(key)?'Done':'Mark done'}</button>
        <button id="modal-notes" class="btn">Open notes</button>
      </div>
    `;
    if(modal){ modal.style.display='flex'; modal.setAttribute('aria-hidden','false'); }
    document.getElementById('modal-mark')?.addEventListener('click', ()=> {
      toggleDone(key);
      const el = document.getElementById('modal-mark');
      if(el){ el.classList.toggle('primary'); el.textContent = isDone(key)?'Done':'Mark done'; }
      renderTopics($('topic-search')?.value || ''); renderTopicList($('topic-search')?.value || '');
    });
    document.getElementById('modal-notes')?.addEventListener('click', ()=> { openNotesFor(key); if(modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); } });
  }

  function renderExamples(exs){
    if(!exs || !exs.length) return '';
    return `<div style="margin-top:10px"><strong>Examples</strong>${exs.map(e=>`<pre style="background:rgba(0,0,0,0.6);padding:8px;border-radius:6px;margin-top:6px;color:var(--muted)">${escapeHtml(e.code||e)}</pre>`).join('')}</div>`;
  }

  // NOTES
  let currentNotesTopic = null;
  $('notes-text')?.addEventListener('input', debounce(()=> {
    if(!currentNotesTopic) return;
    try {
      const text = String($('notes-text').value || '');
      const all = readJSON(NOTES_KEY) || {};
      all[currentNotesTopic] = { text, updated: Date.now() };
      writeJSON(NOTES_KEY, all);
      renderSavedNotesList(currentNotesTopic);
    } catch(e){ console.error('autosave error', e); }
  }, 350));

  window.openNotesFor = openNotesFor;
  function openNotesFor(key){
    currentNotesTopic = key;
    const all = readJSON(NOTES_KEY) || {};
    const entry = all[key];
    const text = entry && typeof entry === 'object' ? (entry.text || '') : (entry || '');
    $('notes-text').value = text;
    $('notes-text').focus();
    renderSavedNotesList();
  }

  function renderSavedNotesList(highlightKey){
    const container = $('saved-notes-list');
    if(!container) return;
    const all = readJSON(NOTES_KEY) || {};
    const keys = Object.keys(all).sort((a,b)=> { const ta = (all[a]&&all[a].updated)||0; const tb = (all[b]&&all[b].updated)||0; return tb-ta; });
    container.innerHTML = '';
    if(!keys.length){ const empty = document.createElement('div'); empty.style.color='var(--muted)'; empty.textContent='No notes yet.'; container.appendChild(empty); return; }
    keys.forEach(k=>{
      const entry = all[k]; const preview = String((entry && entry.text) || '').slice(0,120).replace(/\n/g,' ');
      const row = document.createElement('div'); row.dataset.key = k;
      row.style.padding='8px'; row.style.borderRadius='8px'; row.style.background='linear-gradient(180deg,rgba(255,255,255,0.01),transparent)'; row.style.cursor='pointer';
      const title = document.createElement('div'); title.style.fontWeight='700'; title.textContent = (DETAILS[k] && DETAILS[k].title) ? DETAILS[k].title : k;
      const meta = document.createElement('div'); meta.style.display='flex'; meta.style.justifyContent='space-between'; meta.style.alignItems='center';
      const prev = document.createElement('div'); prev.style.color='var(--muted)'; prev.style.fontSize='12px'; prev.textContent = preview;
      const right = document.createElement('div'); right.style.display='flex'; right.style.gap='8px';
      const openBtn = document.createElement('button'); openBtn.className='btn'; openBtn.textContent='Open'; openBtn.addEventListener('click', e=>{ e.stopPropagation(); openNotesFor(k); });
      const delBtn = document.createElement('button'); delBtn.className='btn'; delBtn.textContent='✕'; delBtn.addEventListener('click', e=>{ e.stopPropagation(); if(confirm('Delete note?')) deleteNote(k); });
      right.appendChild(openBtn); right.appendChild(delBtn);
      meta.appendChild(prev); meta.appendChild(right);
      row.appendChild(title); row.appendChild(meta);
      row.addEventListener('click', ()=> openNotesFor(k));
      container.appendChild(row);
    });
    if(highlightKey){
      const active = container.querySelector(`[data-key="${String(highlightKey)}"]`);
      if(active){ active.scrollIntoView({behavior:'smooth', block:'start'}); active.style.boxShadow='0 12px 36px rgba(0,160,227,0.14)'; setTimeout(()=>{ active.style.boxShadow=''; },900); }
    }
  }

  function saveCurrentNote(){
    if(!currentNotesTopic){ alert('Open a topic first to save its note.'); return; }
    try {
      const text = String($('notes-text').value || '');
      const all = readJSON(NOTES_KEY) || {}; all[currentNotesTopic] = { text, updated: Date.now() }; writeJSON(NOTES_KEY, all);
      renderSavedNotesList(currentNotesTopic);
      const btn = $('save-note'); if(btn){ const old = btn.textContent; btn.textContent='Saved'; setTimeout(()=>btn.textContent=old,900); }
    } catch(e){ console.error(e); alert('Could not save note'); }
  }
  function deleteNote(key){ try { const all = readJSON(NOTES_KEY)||{}; if(all[key]) delete all[key]; writeJSON(NOTES_KEY, all); if(currentNotesTopic===key){ $('notes-text').value=''; currentNotesTopic=null; } renderSavedNotesList(); } catch(e){ console.error(e); } }

  // simple storage helpers
  function readJSON(k){ try{ return JSON.parse(localStorage.getItem(k) || '{}'); }catch(e){ return {}; } }
  function writeJSON(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){ console.warn('write error', e); } }
  function isDone(key){ return !!readJSON(PROG_KEY)[key]; }
  function toggleDone(key){ const m = readJSON(PROG_KEY); if(m[key]) delete m[key]; else m[key] = true; writeJSON(PROG_KEY, m); refreshProgressUI(); renderTopics($('topic-search')?.value || ''); renderTopicList($('topic-search')?.value || ''); }

  function refreshProgressUI(){
    try {
      const m = readJSON(PROG_KEY); const topicKeys = Object.keys(DETAILS).filter(k=>k!=='interview_index'); const total = topicKeys.length||1;
      const done = Object.keys(m).filter(k=>topicKeys.includes(k)).length; const pct = Math.round((done/total)*100);
      const progressText = $('progress-text'); if(progressText) progressText.textContent = pct + '%';
      const circle = $('progress-ring-circle'); if(circle && circle.r && circle.r.baseVal){
        const radius = circle.r.baseVal.value; const circumference = 2 * Math.PI * radius; circle.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = Math.max(0, circumference - (pct/100)*circumference); requestAnimationFrame(()=>{ circle.style.transition='stroke-dashoffset .8s cubic-bezier(.2,.9,.2,1)'; circle.style.strokeDashoffset = offset; });
      }
    } catch(e){ console.warn('refreshProgressUI', e); }
  }

  // cheat modal list + selection
  function renderCheatTopicList(){
    const wrap = $('cheat-topic-list'); if(!wrap) return; wrap.innerHTML = '';
    Object.keys(DETAILS).forEach(k=>{ if(k==='interview_index') return; const d = DETAILS[k] || {}; const row = document.createElement('div'); row.dataset.key=k; row.style.padding='10px'; row.style.borderRadius='8px'; row.style.cursor='pointer'; row.style.marginBottom='6px'; row.innerHTML = `<div style="font-weight:800">${escapeHtml(d.title||k)}</div><div style="color:var(--muted);font-size:12px;margin-top:4px">${escapeHtml((d.summary||'').slice(0,120))}</div>`; row.addEventListener('click', ()=> selectCheatTopic(k)); wrap.appendChild(row); });
  }
  function selectCheatTopic(key){ const d = DETAILS[key] || {}; const pre = $('cheat-pre'); const title = $('cheat-title'); const wrap = $('cheat-topic-list'); const examplesWrap = $('cheat-examples'); if(!pre||!title||!wrap||!examplesWrap) return; pre.textContent = d.cheat || d.summary || '// No cheat'; title.textContent = d.title || key; examplesWrap.innerHTML = ''; if(d.examples && d.examples.length){ const h = document.createElement('div'); h.style.fontWeight='800'; h.style.marginTop='8px'; h.textContent='Examples'; examplesWrap.appendChild(h); d.examples.forEach(ex=>{ const p = document.createElement('pre'); p.style.background='rgba(0,0,0,0.6)'; p.style.padding='8px'; p.style.borderRadius='6px'; p.style.marginTop='8px'; p.style.color='var(--muted)'; p.style.whiteSpace='pre-wrap'; p.textContent = (ex.code||ex) + '\\n'; examplesWrap.appendChild(p); }); }
    Array.from(wrap.children).forEach(node=> node.style.background = node.dataset.key===key ? 'linear-gradient(180deg, rgba(0,160,227,0.06), rgba(45,212,191,0.03))' : 'transparent');
  }
  $('cheat-btn')?.addEventListener('click', ()=>{ try{ renderCheatTopicList(); }catch(e){}; const first = Object.keys(DETAILS).find(k=>k && k!=='interview_index'); if(first) selectCheatTopic(first); const m = $('cheat-modal'); if(m){ m.style.display='flex'; m.setAttribute('aria-hidden','false'); } });
  $('cheat-close')?.addEventListener('click', ()=>{ const m=$('cheat-modal'); if(m){ m.style.display='none'; m.setAttribute('aria-hidden','true'); }});
  $('cheat-copy')?.addEventListener('click', ()=>{ const pre=$('cheat-pre'); if(!pre) return; navigator.clipboard && navigator.clipboard.writeText(pre.textContent||'').then(()=>{ const b=$('cheat-copy'); const old=b.textContent; b.textContent='Copied'; setTimeout(()=>{ if(b) b.textContent=old; },900); }).catch(()=>alert('Could not copy')); });

  // interview list + selection (very similar to cheat)
  function renderInterviewTopicList(){ const wrap = $('interview-topic-list'); if(!wrap) return; wrap.innerHTML=''; const idx = Array.isArray(DETAILS.interview_index)?DETAILS.interview_index:Object.keys(DETAILS).map(k=>({key:k,title:(DETAILS[k]&&DETAILS[k].title)||k})); idx.forEach(entry=>{ const key = entry.key||entry; const title = entry.title || (DETAILS[key] && DETAILS[key].title) || key; const row = document.createElement('div'); row.dataset.key=key; row.style.padding='10px'; row.style.borderRadius='8px'; row.style.cursor='pointer'; row.style.marginBottom='6px'; row.style.background='transparent'; row.innerHTML = `<div style="font-weight:800">${escapeHtml(title)}</div>`; row.addEventListener('click', ()=> selectInterviewTopic(key)); wrap.appendChild(row); }); }
  function selectInterviewTopic(key){ const d = DETAILS[key] || {}; const list = $('interview-list'); const title = $('interview-title'); const wrap = $('interview-topic-list'); if(!list||!title||!wrap) return; title.textContent = d.title || key; list.innerHTML=''; const arr = (d && d.interview) || []; if(!arr.length){ list.innerHTML = '<div style="color:var(--muted)">No interview Q&amp;A available for this topic.</div>'; Array.from(wrap.children).forEach(n=> n.style.background = n.dataset.key===key ? 'linear-gradient(180deg, rgba(0,160,227,0.06), rgba(45,212,191,0.03))' : 'transparent'); return; } arr.forEach((qa,i)=>{ const det = document.createElement('details'); det.style.marginBottom='8px'; det.style.padding='8px'; det.style.borderRadius='8px'; det.style.background='linear-gradient(180deg,rgba(255,255,255,0.01),transparent)'; det.innerHTML = `<summary style="font-weight:800">Q${i+1}: ${escapeHtml(qa.q)}</summary><div style="margin-top:8px;color:var(--muted);white-space:pre-wrap">${escapeHtml(qa.a)}</div>`; list.appendChild(det); }); Array.from(wrap.children).forEach(node=> node.style.background = node.dataset.key===key ? 'linear-gradient(180deg, rgba(0,160,227,0.06), rgba(45,212,191,0.03))' : 'transparent'); }
  document.querySelectorAll('#interview-btn').forEach(btn=> btn.addEventListener('click', ()=>{ try{ renderInterviewTopicList(); }catch(e){}; const first = (Array.isArray(DETAILS.interview_index) && DETAILS.interview_index[0] && DETAILS.interview_index[0].key) || Object.keys(DETAILS).find(k=>k && k!=='interview_index'); if(first) selectInterviewTopic(first); const m = $('interview-modal'); if(m){ m.style.display='flex'; m.setAttribute('aria-hidden','false'); } }));

  // SEARCH wiring
  $('topic-search')?.addEventListener('input', debounce((e)=> { const v = e.target.value.trim(); renderTopics(v); renderTopicList(v); }, 140));
  window.addEventListener('cpp-search', (ev)=> { const v = (ev && ev.detail) ? ev.detail : ''; renderTopics(v); renderTopicList(v); });

  // helpers
  function debounce(fn,t=150){ let timer; return (...a)=>{ clearTimeout(timer); timer=setTimeout(()=>fn.apply(this,a), t); }; }
  function escapeHtml(s){ if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // init
  loadDetails();
  document.addEventListener('DOMContentLoaded', ()=> { renderSavedNotesList(); try{ wireNoteControls(); }catch(e){ console.warn('wireNoteControls error', e); } });

  function wireNoteControls(){
    const saveBtn = $('save-note'); if(saveBtn) saveBtn.addEventListener('click', saveCurrentNote);
    const clearBtn = $('clear-note'); if(clearBtn) clearBtn.addEventListener('click', ()=>{ if(currentNotesTopic){ if(!confirm('Clear saved note for this topic?')) return; const all=readJSON(NOTES_KEY)||{}; if(all[currentNotesTopic]) delete all[currentNotesTopic]; writeJSON(NOTES_KEY, all); $('notes-text').value=''; currentNotesTopic=null; renderSavedNotesList(); } else { const t=$('notes-text'); if(t) t.value=''; }});
    const clearAllBtn = $('clear-all-notes'); if(clearAllBtn) clearAllBtn.addEventListener('click', ()=>{ if(!confirm('Delete all saved notes?')) return; localStorage.removeItem(NOTES_KEY); $('notes-text').value=''; currentNotesTopic=null; renderSavedNotesList(); const old=clearAllBtn.textContent; clearAllBtn.textContent='Cleared'; setTimeout(()=>{ clearAllBtn.textContent = old; },900);});
    // toggle notes panel
    const toggleBtn = $('toggle-notes'); const notesPanel = $('notes-panel'); const showBtn = $('show-notes-btn');
    const positionShowButton = ()=> { if(!showBtn||!toggleBtn||!notesPanel) return; const vw = window.innerWidth || document.documentElement.clientWidth; if(vw<=700){ showBtn.style.right='18px'; showBtn.style.bottom='18px'; showBtn.style.position='fixed'; } else { const rect = toggleBtn.getBoundingClientRect(); const top = Math.max(18, rect.top); showBtn.style.position='fixed'; showBtn.style.top = top + 'px'; showBtn.style.right='18px'; } };
    const updateShowBtnVisibility = ()=> { if(!showBtn||!notesPanel) return; const hidden = notesPanel.getAttribute('aria-hidden')==='true' || notesPanel.style.display==='none'; showBtn.style.display = hidden ? 'block' : 'none'; if(hidden) positionShowButton(); };
    if(toggleBtn && notesPanel){ toggleBtn.addEventListener('click', ()=>{ const hidden = notesPanel.getAttribute('aria-hidden')==='true' || notesPanel.style.display==='none'; if(hidden){ notesPanel.style.display='flex'; notesPanel.setAttribute('aria-hidden','false'); toggleBtn.textContent='Hide'; } else { notesPanel.style.display='none'; notesPanel.setAttribute('aria-hidden','true'); toggleBtn.textContent='Show'; } updateShowBtnVisibility(); }); (function init(){ const hidden = notesPanel.getAttribute('aria-hidden')==='true' || notesPanel.style.display==='none'; toggleBtn.textContent = hidden ? 'Show' : 'Hide'; updateShowBtnVisibility();})(); if(showBtn){ showBtn.addEventListener('click', ()=>{ notesPanel.style.display='flex'; notesPanel.setAttribute('aria-hidden','false'); toggleBtn.textContent='Hide'; showBtn.style.display='none'; const nt=$('notes-text'); if(nt) nt.focus(); }); window.addEventListener('resize', ()=>setTimeout(positionShowButton,120), {passive:true}); window.addEventListener('scroll', ()=>setTimeout(positionShowButton,120), {passive:true}); positionShowButton(); } }
  }

  // robust back navigation helper: prefer history, then referrer, then fallback page
  function goBackOrHome(fallback = '../index.html') {
    try {
      if (window.history && window.history.length > 1) {
        window.history.back();
        return;
      }
      if (document.referrer && document.referrer !== window.location.href) {
        window.location.href = document.referrer;
        return;
      }
      window.location.href = fallback;
    } catch (e) {
      try { window.location.href = fallback; } catch (_) { /* ignore */ }
    }
  }

  // wire the back button(s) if present when DOM is ready (ids reused from cpp page)
  document.addEventListener('DOMContentLoaded', () => {
    try {
      const ids = ['cpp-banner-back', 'banner-back'];
      ids.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', (ev) => { ev.preventDefault(); goBackOrHome(); });
      });
    } catch (err) {
      console.warn('back button wiring error', err);
    }
  });

  // expose helper for other scripts/debugging
  window.goBackOrHome = goBackOrHome;

  // Expose a live view for debugging and external scripts (returns internal DETAILS by getter)
  Object.defineProperty(window, 'GO', {
    configurable: true,
    enumerable: true,
    get() {
      return {
        get DETAILS() { return DETAILS; },
        renderTopics,
        renderTopicList,
        refreshProgressUI,
        goBackOrHome: window.goBackOrHome || (f=>{try{ if(history && history.length>1) history.back(); else window.location.href=f||'../index.html'; }catch(e){window.location.href=f||'../index.html'} })
      };
    }
  });

  // expose for debugging
  window.GO = { DETAILS, renderTopics, renderTopicList, refreshProgressUI };

})();
