/* =========================================
   Dark Code — Enhanced JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', initDarkCode);

function initDarkCode() {
    initNavigation();
    initScrollEffects();
    initScrollAnimations();
    animateSkillBars();
    initButtonEffects();
    initInteractiveElements();
    initAnimationControls();
    initServicesAnimations();
    initSearch();
    injectDynamicStyles();
    showWelcomeMessage();
}

/* =====================
   NAVIGATION
   ===================== */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks   = document.querySelector('.nav-links');
    const header     = document.querySelector('header');
    if (!menuToggle || !navLinks) return;

    const icon = menuToggle.querySelector('i');

    function openMenu() {
        navLinks.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close menu');
        icon.classList.replace('fa-bars', 'fa-times');
        animateMenuItems();
        document.body.style.overflow = 'hidden'; // prevent scroll behind menu
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        icon.classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = '';
    }

    // Toggle on hamburger click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Close when a nav-link is clicked (mobile)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) closeMenu();
        });
    });

    // Close when clicking outside the nav/header
    document.addEventListener('click', (e) => {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            closeMenu();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) closeMenu();
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) closeMenu();
    });
}

function animateMenuItems() {
    document.querySelectorAll('.nav-links > li').forEach((item, i) => {
        item.style.opacity    = '0';
        item.style.transform  = 'translateX(-20px)';
        item.style.transition = `opacity 0.3s ease ${i * 0.07}s, transform 0.3s ease ${i * 0.07}s`;
        // trigger reflow
        requestAnimationFrame(() => {
            item.style.opacity   = '1';
            item.style.transform = 'translateX(0)';
        });
    });
}

/* =====================
   SCROLL EFFECTS
   ===================== */
function initScrollEffects() {
    const header = document.querySelector('header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 80) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* =====================
   SCROLL REVEAL ANIMATIONS
   ===================== */
function initScrollAnimations() {
    const targets = document.querySelectorAll(
        '.section-content, .lang-card, .feature, .game-feature, .quiz-stat, .service-card'
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // animate once
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el, i) => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${(i % 5) * 0.1}s, transform 0.6s ease ${(i % 5) * 0.1}s`;
        observer.observe(el);
    });

    // Inject .visible styles dynamically
    injectRule('.visible { opacity: 1 !important; transform: translateY(0) !important; }');
}

/* =====================
   SKILL BARS
   ===================== */
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-progress');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar   = entry.target;
                const width = bar.getAttribute('data-width') || '0';
                setTimeout(() => { bar.style.width = width + '%'; }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
}

/* =====================
   BUTTON EFFECTS
   ===================== */
function initButtonEffects() {
    // Ripple effect on .btn clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });

    function createRipple(e) {
        const btn    = e.currentTarget;
        const circle = document.createElement('span');
        const rect   = btn.getBoundingClientRect();
        const size   = Math.max(rect.width, rect.height);

        circle.style.cssText = `
            position: absolute;
            width: ${size}px; height: ${size}px;
            top: ${e.clientY - rect.top  - size / 2}px;
            left: ${e.clientX - rect.left - size / 2}px;
            background: rgba(255,255,255,0.25);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleAnim 0.6s linear;
            pointer-events: none;
        `;
        btn.appendChild(circle);
        circle.addEventListener('animationend', () => circle.remove());
    }
}

/* =====================
   INTERACTIVE ELEMENTS
   ===================== */
function initInteractiveElements() {
    // Quiz option click feedback
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', function () {
            // Flash green
            const orig = this.style.background;
            this.style.background = 'var(--accent2)';
            this.style.transform  = (this.style.transform || '') + ' scale(1.3)';
            setTimeout(() => {
                this.style.background = orig;
                this.style.transform  = this.style.transform.replace(' scale(1.3)', '');
            }, 500);
        });
    });

    // Skill orb tooltip-like tilt
    document.querySelectorAll('.skill-orb').forEach(orb => {
        orb.addEventListener('mousemove', (e) => {
            const rect = orb.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = (e.clientX - cx) / (rect.width  / 2);
            const dy   = (e.clientY - cy) / (rect.height / 2);
            orb.style.transform = `scale(1.2) rotateX(${-dy * 15}deg) rotateY(${dx * 15}deg)`;
        });
        orb.addEventListener('mouseleave', () => {
            orb.style.transform = '';
        });
    });
}

/* =====================
   CHARACTER ANIMATION CONTROLS
   ===================== */
function initAnimationControls() {
    const character = document.getElementById('character');
    if (!character) return;

    const ANIMATIONS = ['dancing', 'waving', 'jumping', 'coding'];
    const btnMap = {
        dancing: document.getElementById('danceBtn'),
        waving:  document.getElementById('waveBtn'),
        jumping: document.getElementById('jumpBtn'),
        coding:  document.getElementById('codeBtn'),
    };
    const resetBtn = document.getElementById('resetBtn');

    let currentAnim   = '';
    let autoCycleId   = null;
    let inactivityId  = null;
    let userActive    = false;

    function setAnimation(anim) {
        character.classList.remove(...ANIMATIONS);
        if (anim) character.classList.add(anim);

        // Update active button
        Object.values(btnMap).forEach(b => b && b.classList.remove('active'));
        if (anim && btnMap[anim]) btnMap[anim].classList.add('active');
        if (resetBtn) resetBtn.classList.toggle('active', !anim);

        currentAnim = anim;
    }

    function stopAutoCycle() {
        clearInterval(autoCycleId);
        autoCycleId = null;
    }

    function startAutoCycle() {
        let idx = 0;
        autoCycleId = setInterval(() => {
            setAnimation(ANIMATIONS[idx]);
            idx = (idx + 1) % ANIMATIONS.length;
        }, 3000);
    }

    function scheduleAutoCycle() {
        clearTimeout(inactivityId);
        stopAutoCycle();
        inactivityId = setTimeout(() => {
            if (!userActive || !currentAnim) startAutoCycle();
        }, 10000);
    }

    // Bind buttons
    ANIMATIONS.forEach(anim => {
        const btn = btnMap[anim];
        if (!btn) return;
        btn.addEventListener('click', () => {
            userActive = true;
            stopAutoCycle();
            setAnimation(currentAnim === anim ? '' : anim); // toggle off if same
            scheduleAutoCycle();
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            userActive = true;
            stopAutoCycle();
            setAnimation('');
            scheduleAutoCycle();
        });
    }

    // Keyboard shortcut: 1-4 for anims, 0 for reset
    document.addEventListener('keydown', (e) => {
        const keys = { '1': 'dancing', '2': 'waving', '3': 'jumping', '4': 'coding', '0': '' };
        if (keys.hasOwnProperty(e.key)) {
            userActive = true;
            stopAutoCycle();
            setAnimation(keys[e.key]);
            scheduleAutoCycle();
        }
    });

    // Track any user interaction to pause auto-cycle
    ['click', 'touchstart', 'keydown'].forEach(ev => {
        document.addEventListener(ev, () => {
            userActive = true;
        }, { passive: true });
    });

    // Kick off inactivity timer
    scheduleAutoCycle();
}

/* =====================
   SERVICES ANIMATIONS
   ===================== */
function initServicesAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    if (!serviceCards.length) return;

    // Click ripple/press effect
    serviceCards.forEach(card => {
        card.addEventListener('click', function () {
            this.style.transition = 'transform 0.15s ease';
            this.style.transform  = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 200);

            const name = this.querySelector('h3')?.textContent || 'Service';
            console.log(`%c🎯 ${name}`, 'color:#6c63ff;font-weight:bold;font-size:14px;');
        });

        // Icon float on hover
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.service-icon');
            if (icon) icon.style.animation = 'iconFloat 1s ease-in-out infinite';
        });
        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.service-icon');
            if (icon) icon.style.animation = '';
        });
    });
}

/* =====================
   SEARCH
   ===================== */
function initSearch() {
    const searchWrapper = document.querySelector('.search-wrapper');
    if (!searchWrapper) return;

    const toggle = searchWrapper.querySelector('.search-toggle');
    const form   = searchWrapper.querySelector('.search-form');
    const input  = searchWrapper.querySelector('.search-input');
    if (!toggle) return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open search');

    function openSearch() {
        searchWrapper.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close search');
        setTimeout(() => input && input.focus(), 150);
    }

    function closeSearch() {
        searchWrapper.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open search');
        input && input.blur();
    }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        searchWrapper.classList.contains('active') ? closeSearch() : openSearch();
    });

    // Submit: redirect to search.html?q=...
    if (form) {
        form.addEventListener('submit', (e) => {
            const q = (input?.value || '').trim();
            if (!q) {
                e.preventDefault();
                input && input.focus();
                return;
            }
            // Uncomment to use JS redirect:
            // e.preventDefault();
            // window.location.href = `search.html?q=${encodeURIComponent(q)}`;
        });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!searchWrapper.contains(e.target)) closeSearch();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
    });
}

/* =====================
   DYNAMIC STYLES
   ===================== */
let styleSheet = null;

function injectRule(rule) {
    if (!styleSheet) {
        const tag = document.createElement('style');
        tag.id = 'dc-dynamic-styles';
        document.head.appendChild(tag);
        styleSheet = tag.sheet;
    }
    try { styleSheet.insertRule(rule, styleSheet.cssRules.length); } catch (_) {}
}

function injectDynamicStyles() {
    const rules = [
        '.visible { opacity: 1 !important; transform: translateY(0) !important; }',

        `@keyframes rippleAnim {
            to { transform: scale(4); opacity: 0; }
        }`,

        `@keyframes iconFloat {
            0%,100% { transform: translateY(0) rotateY(360deg) scale(1.1); }
            50%      { transform: translateY(-8px) rotateY(360deg) scale(1.1); }
        }`,

        /* Mobile nav slide-in items */
        `@media (max-width: 768px) {
            .nav-links li {
                opacity: 0;
                transform: translateX(-20px);
            }
            .nav-links.active li {
                opacity: 1;
                transform: translateX(0);
            }
        }`,
    ];

    const tag = document.createElement('style');
    tag.id = 'dc-dynamic-styles';
    tag.textContent = rules.join('\n');
    document.head.appendChild(tag);
}

/* =====================
   WELCOME MESSAGE
   ===================== */
function showWelcomeMessage() {
    const base = 'font-size:14px; padding:4px 10px;';
    console.log('%c🚀 Dark Code', `${base} color:#6c63ff; font-size:20px; font-weight:bold;`);
    console.log('%c💻 Master programming through interactive learning!', `${base} color:#f5f5f7;`);
    console.log('%c🎮 Keyboard shortcuts: [1] Dance  [2] Wave  [3] Jump  [4] Code  [0] Reset', `${base} color:#ff6584;`);
}

/* =====================
   GLOBAL EXPORT
   ===================== */
window.DarkCode = { init: initDarkCode };