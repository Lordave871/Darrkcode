// Game Data - 10 Core Games with Typing Focus
const GAMES_DATA = [
    { "id": 1, "name": "Type & Code Arena", "subtitle": "Hybrid Typing Challenge", "icon": "⌨️", "color": "#7C4DFF", "type": "practice", "difficulty": "beginner" },
    { "id": 2, "name": "Keyboard Coder Quest", "subtitle": "Algorithm Challenge", "icon": "🎮", "color": "#00E5A8", "type": "practice", "difficulty": "intermediate" },
    { "id": 3, "name": "CodeType Challenge", "subtitle": "Debug & Type", "icon": "🚀", "color": "#FFD24C", "type": "practice", "difficulty": "advanced" },
    { "id": 4, "name": "Syntax Typing Master", "subtitle": "JavaScript Speed", "icon": "⚡", "color": "#FF6B8B", "type": "practice", "difficulty": "intermediate" },
    { "id": 5, "name": "TypeCraft Programmer", "subtitle": "Python Typing", "icon": "🐍", "color": "#6FC3FF", "type": "practice", "difficulty": "beginner" },
    { "id": 6, "name": "Logic & Typing Battle", "subtitle": "Speed Math", "icon": "⚔️", "color": "#A78BFA", "type": "practice", "difficulty": "intermediate" },
    { "id": 7, "name": "Type-to-Code Adventure", "subtitle": "Memory Recall", "icon": "🗺️", "color": "#F87171", "type": "practice", "difficulty": "beginner" },
    { "id": 8, "name": "ByteSpeed Coding Race", "subtitle": "Pattern Racing", "icon": "🏎️", "color": "#06B6D4", "type": "practice", "difficulty": "beginner" },
    { "id": 9, "name": "TypeSkill Hacker Mode", "subtitle": "Syntax Sorting", "icon": "🔓", "color": "#10B981", "type": "learning", "difficulty": "intermediate" },
    { "id": 10, "name": "Turbo Typing Coder", "subtitle": "Version Control", "icon": "⏱️", "color": "#F59E0B", "type": "learning", "difficulty": "beginner" }
];

// Helper functions
function shadeColor(hex, percent) {
    if (!hex) return '#7C4DFF';
    const h = hex.replace('#', '');
    const num = parseInt(h, 16);
    let r = (num >> 16) & 0xFF;
    let g = (num >> 8) & 0xFF;
    let b = num & 0xFF;
    const t = percent < 0 ? 0 : 255;
    const p = Math.abs(percent) / 100;
    r = Math.round((t - r) * p) + r;
    g = Math.round((t - g) * p) + g;
    b = Math.round((t - b) * p) + b;
    const toHex = n => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgba(hex, alpha = 1) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function slugify(name) {
    if (!name) return 'game';
    return name.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

// Create game card element
function createCard(game) {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'group');
    card.setAttribute('aria-label', `${game.name} — ${game.subtitle}`);
    card.setAttribute('data-game-id', game.id);

    // Badge with logo
    const badge = document.createElement('div');
    badge.className = 'game-type-badge';
    const badgeImg = document.createElement('img');
    badgeImg.src = '../images/logo.png';
    badgeImg.alt = 'Dark Code';
    badge.appendChild(badgeImg);
    card.appendChild(badge);

    // Card accent glow
    const accent = document.createElement('div');
    accent.className = 'card-accent';
    accent.style.background = `radial-gradient(circle at 30% 30%, ${game.color} 0%, transparent 50%)`;
    card.appendChild(accent);

    // Card top section
    const top = document.createElement('div');
    top.className = 'card-top';
    
    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.style.background = `linear-gradient(135deg, ${shadeColor(game.color, 10)}, rgba(255,255,255,0.06))`;
    icon.textContent = game.icon;
    top.appendChild(icon);

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = game.name;
    
    const sub = document.createElement('p');
    sub.className = 'card-sub';
    sub.textContent = game.subtitle;
    
    top.appendChild(title);
    top.appendChild(sub);
    card.appendChild(top);

    // Card footer
    const foot = document.createElement('div');
    foot.className = 'card-footer';
    
    const difficulty = document.createElement('div');
    difficulty.className = `difficulty ${game.difficulty}`;
    difficulty.textContent = game.difficulty;
    foot.appendChild(difficulty);

    const play = document.createElement('button');
    play.className = 'play-btn';
    play.type = 'button';
    play.setAttribute('aria-label', `Play ${game.name}`);
    play.textContent = 'Play';

    const darker = shadeColor(game.color, -18);
    play.style.setProperty('--btn-color', game.color);
    play.style.setProperty('--btn-darker', darker);
    play.style.setProperty('--btn-shadow', hexToRgba(darker, 0.16));
    play.style.setProperty('--btn-glow', hexToRgba(game.color, 0.12));

    play.addEventListener('click', function(ev) {
        ev.stopPropagation();
        const btn = ev.currentTarget;
        const orig = btn.textContent;
        btn.textContent = 'Loading...';
        btn.disabled = true;
        
        setTimeout(function() {
            btn.textContent = orig;
            btn.disabled = false;
            openGameModal(game);
        }, 500);
    });
    
    foot.appendChild(play);
    card.appendChild(foot);

    return card;
}

// Render all 10 games
function renderAllGames() {
    const gridEl = document.querySelector('.games-grid');
    if (!gridEl) {
        console.log('Games grid not found');
        return;
    }
    
    console.log(`Rendering ${GAMES_DATA.length} games`);
    gridEl.innerHTML = '';
    
    GAMES_DATA.forEach(function(game, index) {
        const card = createCard(game);
        card.classList.add(`game-type-${game.id}`);
        card.style.animationDelay = `${index * 0.05}s`;
        gridEl.appendChild(card);
    });
}

// Initialize card interactions
function initCardInteractions() {
    const cards = document.querySelectorAll('.game-card');
    console.log(`Initializing interactions for ${cards.length} cards`);
    
    cards.forEach(function(c) {
        let resetTimer = null;
        const icon = c.querySelector('.icon');
        
        c.addEventListener('mousemove', function(ev) {
            const rect = c.getBoundingClientRect();
            const x = (ev.clientX - rect.left) / rect.width - 0.5;
            const y = (ev.clientY - rect.top) / rect.height - 0.5;
            const rx = (-y * 6).toFixed(2);
            const ry = (x * 8).toFixed(2);
            c.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px) scale(1.02)`;
            c.style.transition = 'transform 80ms linear';
            if (icon) icon.style.transform = 'translateY(-6px) rotate(-6deg) scale(1.1)';
            if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
        });
        
        c.addEventListener('mouseleave', function() {
            c.style.transition = 'transform 260ms cubic-bezier(.2,.9,.2,1)';
            c.style.transform = '';
            if (icon) icon.style.transform = '';
            resetTimer = setTimeout(function() { c.style.transition = ''; }, 300);
        });
        
        // Keyboard focus handling
        c.addEventListener('focus', function() { c.classList.add('focused'); });
        c.addEventListener('blur', function() { c.classList.remove('focused'); });
    });
}

// Educational Background with Learning Elements
function initEducationalBackground() {
    const canvas = document.getElementById('educational-bg');
    if (!canvas) {
        console.log('Educational background canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    // Educational elements
    const elements = [];
    const educationalIcons = ['{}', '<>', '()', '[]', 'ƒ', '∑', '∫', 'π', '√', '∞', '≠', '≈', '∴', '∵'];
    
    function createEducationalElement() {
        const types = ['bracket', 'symbol', 'book', 'code'];
        const type = types[Math.floor(Math.random() * types.length)];
        const colors = ['#7C4DFF', '#00E5A8', '#FF6B8B', '#6FC3FF', '#FFD24C'];
        
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: type === 'bracket' ? 3 : type === 'symbol' ? 2 : type === 'book' ? 4 : 3,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 1,
            type: type,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.2 + 0.05,
            pulse: Math.random() * 0.1,
            pulseSpeed: Math.random() * 0.01 + 0.005,
            text: educationalIcons[Math.floor(Math.random() * educationalIcons.length)]
        };
    }

    function initElements() {
        elements.length = 0;
        const count = Math.max(30, Math.round((canvas.width * canvas.height) / 10000));
        for (let i = 0; i < count; i++) {
            elements.push(createEducationalElement());
        }
    }

    function drawEducationalElement(element) {
        ctx.save();
        ctx.translate(element.x, element.y);
        ctx.rotate(element.rotation * Math.PI / 180);
        
        const pulseSize = element.size * (1 + Math.sin(Date.now() * element.pulseSpeed) * element.pulse);
        
        ctx.fillStyle = element.color;
        ctx.globalAlpha = element.opacity;
        
        switch(element.type) {
            case 'bracket':
                ctx.font = `${pulseSize * 8}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(element.text, 0, 0);
                break;
                
            case 'symbol':
                ctx.font = `${pulseSize * 6}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(element.text, 0, 0);
                break;
                
            case 'book':
                ctx.fillRect(-pulseSize * 3, -pulseSize * 2, pulseSize * 6, pulseSize * 4);
                ctx.fillStyle = shadeColor(element.color, -20);
                ctx.fillRect(-pulseSize * 3, -pulseSize * 2, pulseSize, pulseSize * 4);
                break;
                
            case 'code':
                ctx.fillRect(-pulseSize * 4, -pulseSize * 3, pulseSize * 8, pulseSize * 6);
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                for (let i = -2; i <= 2; i++) {
                    ctx.fillRect(-pulseSize * 3, i * pulseSize, pulseSize * 6, pulseSize * 0.3);
                }
                break;
        }
        
        ctx.restore();
    }

    function animate() {
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        
        // Clear with dark gradient
        const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w, h)/1.2);
        gradient.addColorStop(0, 'rgba(10, 8, 31, 0.9)');
        gradient.addColorStop(1, 'rgba(26, 22, 56, 0.95)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
        
        // Add subtle grid
        ctx.strokeStyle = 'rgba(124, 77, 255, 0.02)';
        ctx.lineWidth = 0.3;
        const gridSize = 40;
        for (let x = 0; x < w; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = 0; y < h; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
        
        // Update and draw elements
        elements.forEach(function(element) {
            element.x += element.speedX;
            element.y += element.speedY;
            element.rotation += element.rotationSpeed;
            
            // Wrap around edges
            if (element.x > w + 50) element.x = -50;
            if (element.x < -50) element.x = w + 50;
            if (element.y > h + 50) element.y = -50;
            if (element.y < -50) element.y = h + 50;
            
            drawEducationalElement(element);
        });
        
        requestAnimationFrame(animate);
    }

    initElements();
    animate();
    
    // Resize observer
    const ro = new ResizeObserver(function() { 
        resize(); 
        initElements(); 
    });
    ro.observe(canvas);
}

// Game Modal Functions
function createGameModal() {
    const modalHTML = `
        <div class="game-modal-overlay" id="gameModal">
            <div class="game-modal">
                <div class="game-modal-header">
                    <div class="game-modal-title">
                        <span class="game-modal-icon"></span>
                        <h2 class="game-modal-name"></h2>
                    </div>
                    <button class="game-modal-close" onclick="closeGameModal()">&times;</button>
                </div>
                <div class="game-modal-body">
                    <div class="game-content" id="gameContent">
                        <!-- Game content will be loaded here -->
                    </div>
                </div>
                <div class="game-modal-footer">
                    <button class="game-modal-btn restart-btn" onclick="restartGame()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 014.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Restart
                    </button>
                    <button class="game-modal-btn close-btn" onclick="closeGameModal()">Close Game</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openGameModal(game) {
    let modal = document.getElementById('gameModal');
    if (!modal) {
        createGameModal();
        modal = document.getElementById('gameModal');
    }
    
    // Set game info
    document.querySelector('.game-modal-icon').textContent = game.icon;
    document.querySelector('.game-modal-name').textContent = game.name;
    document.querySelector('.game-modal-icon').style.background = `linear-gradient(135deg, ${game.color}, ${shadeColor(game.color, -20)})`;
    
    // Load game content based on category
    loadGameContent(game);
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function restartGame() {
    const gameContent = document.getElementById('gameContent');
    if (gameContent && gameContent.dataset.gameId) {
        const game = GAMES_DATA.find(g => g.id === parseInt(gameContent.dataset.gameId));
        if (game) {
            loadGameContent(game);
        }
    }
}

function loadGameContent(game) {
    const gameContent = document.getElementById('gameContent');
    gameContent.dataset.gameId = game.id;
    
    switch(game.id) {
        case 1:
            if (window.CodeRunner) window.CodeRunner.init(gameContent);
            else loadDefaultGame(gameContent, game);
            break;
        case 2:
            if (window.AlgorithmMaster) window.AlgorithmMaster.init(gameContent);
            else loadDefaultGame(gameContent, game);
            break;
        case 3:
            if (window.DebugChallenge) window.DebugChallenge.init(gameContent);
            else loadDefaultGame(gameContent, game);
            break;
        case 4:
            if (window.JavaScriptJourney) window.JavaScriptJourney.init(gameContent);
            else loadDefaultGame(gameContent, game);
            break;
        case 5:
            if (window.PythonPractice) window.PythonPractice.init(gameContent);
            else loadDefaultGame(gameContent, game);
            break;
        case 6:
            if (window.QuickMath) window.QuickMath.init(gameContent);
            else loadDefaultGame(gameContent, game);
            break;
        case 7:
            if (window.MemoryCards) window.MemoryCards.init(gameContent);
            else loadDefaultGame(gameContent, game);
            break;
        case 8:
            if (window.PatternMatch) window.PatternMatch.init(gameContent);
            else loadDefaultGame(gameContent, game);
            break;
        case 9:
            if (window.SyntaxSort) window.SyntaxSort.init(gameContent);
            else loadDefaultGame(gameContent, game);
            break;
        case 10:
            if (window.GitAdventure) window.GitAdventure.init(gameContent);
            else loadDefaultGame(gameContent, game);
            break;
        default:
            loadDefaultGame(gameContent, game);
    }
}

// Default Game Template
function loadDefaultGame(container, game) {
    container.innerHTML = `
        <div class="default-game">
            <div class="game-icon-large">${game.icon}</div>
            <h3>${game.name}</h3>
            <p class="game-description">${game.subtitle}</p>
            <div class="game-placeholder">
                <p>🎮 Game content coming soon!</p>
                <p>This ${game.difficulty} level game is under development.</p>
            </div>
        </div>
    `;
}

// Game Interaction Functions
function checkCode() {
    const codeInput = document.querySelector('.code-input');
    const resultDiv = document.querySelector('.code-result');
    
    if (codeInput && resultDiv) {
        const code = codeInput.value;
        if (code.includes('console.log') && code.includes('return')) {
            resultDiv.innerHTML = '<div class="success">✅ Code runs successfully!</div>';
            resultDiv.style.color = '#00E5A8';
        } else {
            resultDiv.innerHTML = '<div class="error">❌ Code has errors. Try again!</div>';
            resultDiv.style.color = '#FF6B8B';
        }
    }
}

function initTypingGame() {
    const input = document.querySelector('.typing-input');
    if (!input) return;
    
    const target = input.dataset.target;
    let startTime = null;
    let errors = 0;
    
    input.addEventListener('input', function() {
        if (!startTime) startTime = Date.now();
        
        const typed = this.value;
        const timeElapsed = (Date.now() - startTime) / 1000;
        const words = typed.length / 5;
        const wpm = Math.round((words / timeElapsed) * 60) || 0;
        
        // Calculate accuracy
        let correct = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] === target[i]) correct++;
        }
        const accuracy = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
        
        // Update stats
        document.querySelector('.typing-speed').textContent = wpm;
        document.querySelector('.typing-accuracy').textContent = accuracy;
        document.querySelector('.typing-time').textContent = timeElapsed.toFixed(1);
        
        // Check if complete
        if (typed === target) {
            this.disabled = true;
            this.style.borderColor = '#00E5A8';
            alert(`🎉 Complete! Speed: ${wpm} WPM, Accuracy: ${accuracy}%`);
        }
    });
}

function checkMath() {
    const input = document.querySelector('.math-input');
    const resultDiv = document.querySelector('.math-result');
    const scoreSpan = document.querySelector('.score-value');
    
    if (input && resultDiv) {
        const userAnswer = parseInt(input.value);
        const correctAnswer = parseInt(input.dataset.answer);
        
        if (userAnswer === correctAnswer) {
            resultDiv.innerHTML = '<div class="success">✅ Correct!</div>';
            resultDiv.style.color = '#00E5A8';
            const currentScore = parseInt(scoreSpan.textContent);
            scoreSpan.textContent = currentScore + 10;
            
            // Generate new problem
            setTimeout(() => {
                const num1 = Math.floor(Math.random() * 50) + 1;
                const num2 = Math.floor(Math.random() * 50) + 1;
                document.querySelector('.math-problem h2').textContent = `${num1} + ${num2} = ?`;
                input.dataset.answer = num1 + num2;
                input.value = '';
                resultDiv.innerHTML = '';
            }, 1000);
        } else {
            resultDiv.innerHTML = '<div class="error">❌ Try again!</div>';
            resultDiv.style.color = '#FF6B8B';
        }
    }
}

function initPuzzleDragDrop() {
    const blocks = document.querySelectorAll('.block');
    let draggedElement = null;
    
    blocks.forEach(block => {
        block.addEventListener('dragstart', function() {
            draggedElement = this;
            this.style.opacity = '0.5';
        });
        
        block.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
        
        block.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        block.addEventListener('drop', function(e) {
            e.preventDefault();
            if (draggedElement !== this) {
                const parent = this.parentNode;
                const draggedIndex = Array.from(parent.children).indexOf(draggedElement);
                const droppedIndex = Array.from(parent.children).indexOf(this);
                
                if (draggedIndex < droppedIndex) {
                    parent.insertBefore(draggedElement, this.nextSibling);
                } else {
                    parent.insertBefore(draggedElement, this);
                }
            }
        });
    });
}

function checkPuzzleOrder() {
    const blocks = document.querySelectorAll('.block');
    const resultDiv = document.querySelector('.puzzle-result');
    let isCorrect = true;
    
    blocks.forEach((block, index) => {
        const expectedOrder = parseInt(block.dataset.order);
        if (expectedOrder !== index + 1) {
            isCorrect = false;
        }
    });
    
    if (isCorrect) {
        resultDiv.innerHTML = '<div class="success">✅ Perfect! Code blocks are in the correct order!</div>';
        resultDiv.style.color = '#00E5A8';
    } else {
        resultDiv.innerHTML = '<div class="error">❌ Not quite right. Try again!</div>';
        resultDiv.style.color = '#FF6B8B';
    }
}

let currentLearningStep = 0;
function nextLearningStep() {
    const steps = document.querySelectorAll('.learning-step');
    steps[currentLearningStep].classList.remove('active');
    currentLearningStep++;
    if (currentLearningStep < steps.length) {
        steps[currentLearningStep].classList.add('active');
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Typing & Coding Games...');

    initEducationalBackground();
    
    console.log('🎨 Rendering 10 typing games...');
    renderAllGames();
    
    setTimeout(function() {
        initCardInteractions();
        console.log('✅ 10 typing games loaded successfully!');
    }, 200);

    if (!document.getElementById('ripple-keyframes')) {
        const s = document.createElement('style');
        s.id = 'ripple-keyframes';
        s.textContent = '@keyframes ripple { from { transform: translate(-50%,-50%) scale(0.2); opacity:0.45 } to { transform: translate(-50%,-50%) scale(1.25); opacity:0 } }';
        document.head.appendChild(s);
    }
});