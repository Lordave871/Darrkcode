/* =========================================
   Dark Code — Enhanced Search (search.js)
   ========================================= */
(function () {
    'use strict';

    /* =====================
       SEARCH INDEX
       ===================== */
    const searchIndex = [
        // Programming Languages
        { id: 'python',      title: 'Python',      type: 'programming', desc: 'Beginner-friendly, versatile & powerful — perfect for AI, data science, and web.', tags: ['python','py','scripting','data','ai','automation'], url: '/programmingl_language#python' },
        { id: 'javascript',  title: 'JavaScript',  type: 'programming', desc: 'The essential language of the web — build dynamic frontends and Node.js backends.',  tags: ['javascript','js','frontend','node','react','vue','web'], url: '/programmingl_language#javascript' },
        { id: 'java',        title: 'Java',         type: 'programming', desc: 'Industry-grade, object-oriented powerhouse trusted by enterprise apps worldwide.',   tags: ['java','jvm','spring','enterprise','backend'], url: '/programmingl_language#java' },
        { id: 'cpp',         title: 'C++',          type: 'programming', desc: 'High-performance systems programming — game engines, embedded systems & more.',      tags: ['c++','cpp','native','systems','performance','game'], url: '/programmingl_language#cpp' },

        // Skills
        { id: 'webdev',      title: 'Web Development',    type: 'skill', desc: 'HTML, CSS, JS, full-stack — build modern, responsive websites from scratch.', tags: ['web','frontend','backend','html','css','fullstack','responsive'], url: '/skill#web-development' },
        { id: 'ml',          title: 'Machine Learning',   type: 'skill', desc: 'Train models, process data, and build intelligent applications with ML.', tags: ['ml','machine learning','ai','neural','deep learning','tensorflow'], url: '/skill#machine-learning' },
        { id: 'datasci',     title: 'Data Science',       type: 'skill', desc: 'Analyse data, create visualisations, and uncover insights that drive decisions.', tags: ['data','science','analysis','visualization','pandas','numpy','statistics'], url: '/skill#data-science' },
        { id: 'cybersec',    title: 'Cybersecurity',      type: 'skill', desc: 'Penetration testing, vulnerability audits, and secure system architecture.', tags: ['security','cyber','hacking','pentest','network','ethical'], url: '/skill#cybersecurity' },
        { id: 'cloud',       title: 'Cloud Computing',    type: 'skill', desc: 'Deploy scalable infrastructure on AWS, GCP, and Azure with confidence.', tags: ['cloud','aws','azure','gcp','devops','docker','kubernetes'], url: '/skill#cloud' },

        // Games
        { id: 'codepuzzles', title: 'Code Puzzles',      type: 'game',  desc: 'Brain-teasing logic puzzles that level up in difficulty as you improve.', tags: ['puzzle','logic','challenge','problem solving'], url: '/game#code-puzzles' },
        { id: 'aichallenges',title: 'AI Coding Challenges', type: 'game', desc: 'Compete against adaptive AI in timed coding battles — prove your skills.', tags: ['ai','challenge','battle','timed','competitive'], url: '/game#ai-challenges' },
        { id: 'codequest',   title: 'Code Quest',         type: 'game',  desc: 'An adventure-style game where you solve coding problems to progress levels.', tags: ['adventure','rpg','levels','story','quest'], url: '/game#code-quest' },

        // Quizzes
        { id: 'practicequiz',title: 'Practice Quiz',      type: 'quiz',  desc: '500+ curated questions covering every major programming topic and skill level.', tags: ['quiz','test','practice','questions','exam','mcq'], url: '/skill#practice' },
        { id: 'analytics',   title: 'Progress Analytics', type: 'quiz',  desc: 'Visual dashboards that show your strengths, weak spots, and improvement over time.', tags: ['analytics','progress','dashboard','track','performance'], url: '/skill#analytics' },
        { id: 'dailychallenge','title': 'Daily Challenge', type: 'quiz', desc: 'A fresh coding challenge every day — keep your skills sharp with daily practice.', tags: ['daily','challenge','streak','practice','habit'], url: '/skill#daily' },

        // Services
        { id: 'svc-web',     title: 'Web Development Service',  type: 'service', desc: 'Custom websites and web apps built to scale, SEO-ready and high-performance.', tags: ['web','website','fullstack','service','build'], url: '#services' },
        { id: 'svc-app',     title: 'App Development Service',  type: 'service', desc: 'Cross-platform iOS & Android mobile apps with smooth UX and robust performance.', tags: ['app','mobile','ios','android','flutter','react native'], url: '#services' },
        { id: 'svc-ai',      title: 'AI & Machine Learning Service', type: 'service', desc: 'Smart AI-powered solutions — from chatbots to recommendation engines.', tags: ['ai','ml','chatbot','recommendation','automation','service'], url: '#services' },
        { id: 'svc-design',  title: 'UI/UX Design Service',     type: 'service', desc: 'Beautiful, user-centred design that converts — from wireframe to final launch.', tags: ['design','ui','ux','figma','wireframe','prototype'], url: '#services' },
    ];

    /* ── Type metadata (icon + label) ── */
    const TYPE_META = {
        programming: { icon: 'fas fa-laptop-code', label: 'Programming' },
        skill:       { icon: 'fas fa-chart-line',  label: 'Skills'       },
        game:        { icon: 'fas fa-gamepad',      label: 'Games'        },
        quiz:        { icon: 'fas fa-brain',        label: 'Quizzes'      },
        service:     { icon: 'fas fa-concierge-bell', label: 'Services'   },
    };

    const TYPE_ORDER = ['programming', 'skill', 'game', 'quiz', 'service'];

    /* =====================
       UTILITIES
       ===================== */
    const norm = s => (s || '').toString().toLowerCase().trim();

    function escapeHtml(s) {
        return (s || '').toString().replace(/[&<>"']/g, c =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
        );
    }

    function highlight(text, tokens) {
        if (!tokens.length) return escapeHtml(text);
        let escaped = escapeHtml(text);
        tokens.forEach(t => {
            if (!t) return;
            const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            escaped = escaped.replace(re, '<mark>$1</mark>');
        });
        return escaped;
    }

    function scoreItem(item, tokens) {
        let score = 0;
        const hay = `${item.title} ${item.desc || ''} ${(item.tags || []).join(' ')}`.toLowerCase();
        tokens.forEach(t => {
            if (!t) return;
            if (norm(item.title) === t)            score += 30; // exact title match
            if (norm(item.title).startsWith(t))    score += 15;
            if (norm(item.title).includes(t))      score += 10;
            if ((item.tags || []).some(tag => norm(tag) === t)) score += 12;
            if ((item.tags || []).some(tag => norm(tag).includes(t))) score += 6;
            if (hay.includes(t))                   score += 4;
        });
        return score;
    }

    function doSearch(query) {
        const q      = norm(query);
        const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

        if (!tokens.length) return { matches: [], others: [...searchIndex] };

        const scored = searchIndex.map(it => ({ it, score: scoreItem(it, tokens) }));
        const matches = scored
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(r => r.it);

        const matchedIds = new Set(matches.map(m => m.id));
        const others = searchIndex.filter(i => !matchedIds.has(i.id));

        return { matches, others, tokens };
    }

    /* =====================
       MODAL STYLES
       ===================== */
    function injectStyles() {
        if (document.getElementById('dc-search-styles')) return;
        const style = document.createElement('style');
        style.id = 'dc-search-styles';
        style.textContent = `
            /* Overlay */
            .dc-overlay {
                position: fixed; inset: 0; z-index: 9999;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(6px);
                display: flex; align-items: flex-start; justify-content: center;
                padding: clamp(16px, 5vw, 80px) 16px;
                animation: dcFadeIn 0.2s ease;
            }
            @keyframes dcFadeIn  { from { opacity: 0; } to { opacity: 1; } }
            @keyframes dcSlideIn { from { opacity: 0; transform: translateY(-20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

            /* Modal */
            .dc-modal {
                width: 100%; max-width: 680px;
                background: var(--darker, #070711);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
                overflow: hidden;
                display: flex; flex-direction: column;
                max-height: calc(100vh - clamp(32px, 10vw, 160px));
                animation: dcSlideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            }

            /* Search bar */
            .dc-search-bar {
                display: flex; align-items: center; gap: 10px;
                padding: 14px 18px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                background: rgba(255, 255, 255, 0.03);
                flex-shrink: 0;
            }
            .dc-search-bar i { color: var(--primary, #6c63ff); font-size: 1rem; flex-shrink: 0; }
            .dc-search-bar input {
                flex: 1; background: transparent; border: none; outline: none;
                color: var(--light, #f5f5f7); font-size: 1rem;
                placeholder-color: var(--gray, #8a8a9c);
            }
            .dc-search-bar input::placeholder { color: var(--gray, #8a8a9c); }
            .dc-kbd {
                font-size: 0.7rem; padding: 2px 6px;
                border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;
                color: var(--gray, #8a8a9c); white-space: nowrap;
            }
            .dc-close-btn {
                background: rgba(255,255,255,0.06); border: none;
                color: var(--gray, #8a8a9c); cursor: pointer;
                width: 30px; height: 30px; border-radius: 8px;
                display: flex; align-items: center; justify-content: center;
                font-size: 1rem; transition: all 0.2s ease; flex-shrink: 0;
            }
            .dc-close-btn:hover { background: rgba(255,255,255,0.12); color: var(--light, #f5f5f7); }

            /* Results body */
            .dc-results {
                overflow-y: auto; flex: 1;
                padding: 12px 12px 16px;
                scrollbar-width: thin;
                scrollbar-color: rgba(108,99,255,0.3) transparent;
            }
            .dc-results::-webkit-scrollbar { width: 4px; }
            .dc-results::-webkit-scrollbar-thumb { background: rgba(108,99,255,0.3); border-radius: 4px; }

            /* Status bar */
            .dc-status {
                padding: 8px 18px;
                font-size: 0.75rem; color: var(--gray, #8a8a9c);
                border-top: 1px solid rgba(255,255,255,0.05);
                display: flex; justify-content: space-between; align-items: center;
                flex-shrink: 0;
            }

            /* Group */
            .dc-group { margin-bottom: 6px; }
            .dc-group-header {
                display: flex; align-items: center; gap: 8px;
                padding: 8px 6px 4px;
                font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em;
                text-transform: uppercase; color: var(--primary, #6c63ff);
            }
            .dc-group-header i { font-size: 0.85rem; }
            .dc-group-count {
                margin-left: auto;
                background: rgba(108,99,255,0.15); color: var(--primary, #6c63ff);
                padding: 1px 6px; border-radius: 10px; font-size: 0.65rem;
            }

            /* Result item */
            .dc-item {
                display: flex; align-items: flex-start; gap: 10px;
                padding: 10px 10px; border-radius: 10px; margin: 2px 0;
                text-decoration: none; color: var(--light, #f5f5f7);
                background: transparent;
                transition: background 0.15s ease, transform 0.15s ease;
                cursor: pointer;
            }
            .dc-item:hover, .dc-item:focus-visible {
                background: rgba(108, 99, 255, 0.12);
                transform: translateX(4px);
                outline: none;
            }
            .dc-item.dc-item--active {
                background: rgba(108, 99, 255, 0.18);
                transform: translateX(4px);
            }
            .dc-item-icon {
                width: 36px; height: 36px; border-radius: 8px;
                background: var(--gradient, linear-gradient(135deg,#6c63ff,#4a44c6));
                display: flex; align-items: center; justify-content: center;
                font-size: 0.85rem; color: white; flex-shrink: 0;
            }
            .dc-item-body { flex: 1; min-width: 0; }
            .dc-item-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 2px; }
            .dc-item-desc  { font-size: 0.78rem; color: var(--gray, #8a8a9c); line-height: 1.4;
                             white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .dc-item-arrow { color: rgba(255,255,255,0.2); font-size: 0.75rem; flex-shrink: 0; align-self: center; }
            .dc-item:hover .dc-item-arrow { color: var(--primary, #6c63ff); }

            /* Highlight marks */
            .dc-item mark {
                background: transparent;
                color: var(--primary, #6c63ff);
                font-weight: 700;
            }

            /* Divider before "Other Topics" */
            .dc-divider {
                display: flex; align-items: center; gap: 10px;
                margin: 12px 6px 8px; color: var(--gray, #8a8a9c); font-size: 0.72rem;
            }
            .dc-divider::before, .dc-divider::after {
                content: ''; flex: 1; height: 1px;
                background: rgba(255,255,255,0.06);
            }

            /* Empty state */
            .dc-empty {
                padding: 40px 20px; text-align: center;
                color: var(--gray, #8a8a9c);
            }
            .dc-empty i { font-size: 2.5rem; margin-bottom: 12px; display: block; opacity: 0.4; }
            .dc-empty strong { color: var(--light, #f5f5f7); }

            /* Keyboard hint */
            .dc-hints { display: flex; gap: 16px; font-size: 0.7rem; color: var(--gray, #8a8a9c); }
            .dc-hints span { display: flex; align-items: center; gap: 4px; }

            @media (max-width: 480px) {
                .dc-modal     { border-radius: 12px; }
                .dc-search-bar{ padding: 12px 14px; }
                .dc-kbd, .dc-hints { display: none; }
                .dc-item-desc { display: none; }
                .dc-item-icon { width: 30px; height: 30px; font-size: 0.75rem; }
            }
        `;
        document.head.appendChild(style);
    }

    /* =====================
       RENDER MODAL
       ===================== */
    function openModal(initialQuery) {
        injectStyles();
        closeModal(); // remove existing if any

        const { matches, others, tokens } = doSearch(initialQuery || '');

        /* ── Build DOM ── */
        const overlay = document.createElement('div');
        overlay.className = 'dc-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Search Dark Code');

        overlay.innerHTML = `
            <div class="dc-modal">
                <div class="dc-search-bar">
                    <i class="fas fa-search" aria-hidden="true"></i>
                    <input
                        type="search"
                        class="dc-live-input"
                        placeholder="Search courses, skills, games…"
                        value="${escapeHtml(initialQuery || '')}"
                        autocomplete="off"
                        spellcheck="false"
                        aria-label="Search"
                    />
                    <span class="dc-kbd">ESC to close</span>
                    <button class="dc-close-btn" aria-label="Close search">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="dc-results" id="dcResults" role="listbox" aria-label="Search results"></div>
                <div class="dc-status">
                    <div class="dc-hints">
                        <span><kbd>↑↓</kbd> Navigate</span>
                        <span><kbd>Enter</kbd> Open</span>
                        <span><kbd>Esc</kbd> Close</span>
                    </div>
                    <span class="dc-result-count"></span>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const liveInput   = overlay.querySelector('.dc-live-input');
        const resultsBox  = overlay.querySelector('#dcResults');
        const closeBtn    = overlay.querySelector('.dc-close-btn');
        const countEl     = overlay.querySelector('.dc-result-count');

        /* ── Render results ── */
        renderInto(resultsBox, countEl, matches, others, tokens || []);

        /* ── Focus ── */
        setTimeout(() => liveInput.focus(), 50);
        liveInput.setSelectionRange(liveInput.value.length, liveInput.value.length);

        /* ── Live search ── */
        let debounceTimer;
        liveInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const { matches, others, tokens } = doSearch(liveInput.value);
                renderInto(resultsBox, countEl, matches, others, tokens || []);
            }, 160);
        });

        /* ── Keyboard navigation ── */
        overlay.addEventListener('keydown', handleKeyNav);

        /* ── Close handlers ── */
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        document.addEventListener('keydown', handleGlobalKey);

        function handleGlobalKey(e) {
            if (e.key === 'Escape') closeModal();
        }

        // Store reference for cleanup
        overlay._cleanup = () => {
            document.removeEventListener('keydown', handleGlobalKey);
            document.body.style.overflow = '';
        };
    }

    /* ── Keyboard arrow nav ── */
    function handleKeyNav(e) {
        const items = [...document.querySelectorAll('.dc-item')];
        if (!items.length) return;
        const active = document.querySelector('.dc-item--active');
        let idx = active ? items.indexOf(active) : -1;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            active?.classList.remove('dc-item--active');
            idx = (idx + 1) % items.length;
            items[idx].classList.add('dc-item--active');
            items[idx].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            active?.classList.remove('dc-item--active');
            idx = (idx - 1 + items.length) % items.length;
            items[idx].classList.add('dc-item--active');
            items[idx].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
            const focused = document.querySelector('.dc-item--active');
            if (focused) { focused.click(); }
        }
    }

    /* ── Render results into container ── */
    function renderInto(container, countEl, matches, others, tokens) {
        container.innerHTML = '';

        /* Matches grouped by type */
        const groups = {};
        matches.forEach(m => {
            if (!groups[m.type]) groups[m.type] = [];
            groups[m.type].push(m);
        });

        let totalShown = 0;

        TYPE_ORDER.forEach(type => {
            const items = groups[type];
            if (!items?.length) return;

            const meta = TYPE_META[type] || { icon: 'fas fa-circle', label: type };
            const groupEl = document.createElement('div');
            groupEl.className = 'dc-group';
            groupEl.innerHTML = `
                <div class="dc-group-header">
                    <i class="${meta.icon}" aria-hidden="true"></i>
                    ${meta.label}
                    <span class="dc-group-count">${items.length}</span>
                </div>
            `;
            items.forEach(item => {
                groupEl.appendChild(buildItem(item, tokens));
                totalShown++;
            });
            container.appendChild(groupEl);
        });

        /* Empty state */
        if (!totalShown && tokens.length) {
            const empty = document.createElement('div');
            empty.className = 'dc-empty';
            empty.innerHTML = `
                <i class="fas fa-search-minus" aria-hidden="true"></i>
                No results for <strong>"${escapeHtml(tokens.join(' '))}"</strong>
                <br><small>Try a different keyword or browse below.</small>
            `;
            container.appendChild(empty);
        }

        /* Other Topics */
        if (others?.length) {
            if (totalShown) {
                const div = document.createElement('div');
                div.className = 'dc-divider';
                div.textContent = 'Other Topics';
                container.appendChild(div);
            }

            // group others too
            const otherGroups = {};
            others.forEach(o => {
                if (!otherGroups[o.type]) otherGroups[o.type] = [];
                otherGroups[o.type].push(o);
            });

            TYPE_ORDER.forEach(type => {
                const items = otherGroups[type];
                if (!items?.length) return;
                const meta = TYPE_META[type] || { icon: 'fas fa-circle', label: type };
                const groupEl = document.createElement('div');
                groupEl.className = 'dc-group';
                groupEl.innerHTML = `
                    <div class="dc-group-header" style="opacity:0.6;">
                        <i class="${meta.icon}" aria-hidden="true"></i>
                        ${meta.label}
                        <span class="dc-group-count">${items.length}</span>
                    </div>
                `;
                items.forEach(item => groupEl.appendChild(buildItem(item, [], true)));
                container.appendChild(groupEl);
            });
        }

        /* Count */
        if (countEl) {
            countEl.textContent = totalShown
                ? `${totalShown} result${totalShown !== 1 ? 's' : ''} found`
                : tokens.length ? 'No direct matches' : '';
        }
    }

    /* ── Build a single result item ── */
    function buildItem(item, tokens, dimmed = false) {
        const meta = TYPE_META[item.type] || { icon: 'fas fa-circle' };
        const a = document.createElement('a');
        a.className  = 'dc-item';
        a.href       = item.url || '#';
        a.role       = 'option';
        a.tabIndex   = 0;
        if (dimmed) a.style.opacity = '0.65';

        a.innerHTML = `
            <div class="dc-item-icon"><i class="${meta.icon}" aria-hidden="true"></i></div>
            <div class="dc-item-body">
                <div class="dc-item-title">${highlight(item.title, tokens)}</div>
                <div class="dc-item-desc">${highlight(item.desc || '', tokens)}</div>
            </div>
            <i class="fas fa-chevron-right dc-item-arrow" aria-hidden="true"></i>
        `;

        a.addEventListener('click', () => closeModal());
        return a;
    }

    /* ── Close modal ── */
    function closeModal() {
        const overlay = document.querySelector('.dc-overlay');
        if (!overlay) return;
        overlay._cleanup?.();
        overlay.style.animation = 'dcFadeIn 0.15s ease reverse';
        setTimeout(() => overlay.remove(), 140);
    }

    /* =====================
       ATTACH TO HEADER SEARCH
       ===================== */
    function attachSearchHandlers() {
        const wrapper = document.querySelector('.search-wrapper');
        if (!wrapper) return;

        const form  = wrapper.querySelector('.search-form');
        const input = wrapper.querySelector('.search-input');
        if (!form || !input) return;

        /* Intercept form submit → open modal */
        form.addEventListener('submit', e => {
            e.preventDefault();
            openModal(input.value.trim());
            input.blur();
        });

        /* Also open on input Enter */
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                openModal(input.value.trim());
                input.blur();
            }
        });

        /* Open modal as soon as the user starts typing in the header bar */
        input.addEventListener('input', () => {
            const q = input.value.trim();
            if (q.length >= 1) {
                openModal(q);
                input.blur(); // focus moves to modal input
            }
        });

        /* Keyboard shortcut: Ctrl+K / Cmd+K to open search */
        document.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openModal('');
            }
        });
    }

    /* =====================
       INIT
       ===================== */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachSearchHandlers);
    } else {
        attachSearchHandlers();
    }

    /* Expose globally if needed */
    window.DarkCodeSearch = { open: openModal, close: closeModal };

})();