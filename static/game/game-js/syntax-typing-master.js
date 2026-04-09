/**
 * JavaScript Typing Master Game
 * A beautiful, interactive typing game for practicing JavaScript syntax
 * Enhanced with better structure, features, and visual appeal
 */

window.JavaScriptJourney = {
    // Configuration
    config: {
        difficulties: ['easy', 'medium', 'hard'],
        defaultDifficulty: 'medium',
        autoNextDelay: 800,
        wpmCalculation: {
            charsPerWord: 5,
            updateInterval: 100
        },
        maxHistory: 10,
        theme: 'dark'
    },

    // Initialize the game
    init: function(container) {
        this.container = container;
        this.setupGameLayout();
        this.injectStyles();
        setTimeout(() => this.initTypingGame(), 100);
    },

    // Setup the game layout
    setupGameLayout: function() {
        this.container.innerHTML = `
            <div class="game-header">
                <h1 class="game-title">🚀 JavaScript Typing Master</h1>
                <p class="game-subtitle">Type JavaScript syntax at lightning speed!</p>
            </div>
            
            <div class="game-controls">
                <div class="difficulty-selector">
                    <button class="diff-btn active" data-diff="easy">Easy</button>
                    <button class="diff-btn" data-diff="medium">Medium</button>
                    <button class="diff-btn" data-diff="hard">Hard</button>
                </div>
                <div class="game-info">
                    <span class="snippet-counter">Snippet: <span id="snippetCount">1</span></span>
                    <span class="highest-wpm">Best: <span id="highestWPM">0</span> WPM</span>
                </div>
            </div>
            
            <div class="game-area">
                <div class="progress-container">
                    <div class="progress-bar" id="progressBar"></div>
                    <div class="progress-text" id="progressText">0%</div>
                </div>
                
                <div class="code-editor">
                    <div class="editor-header">
                        <div class="editor-title">script.js</div>
                        <div class="editor-actions">
                            <button class="action-btn" id="resetBtn" title="Reset">↻</button>
                            <button class="action-btn" id="hintBtn" title="Hint">💡</button>
                        </div>
                    </div>
                    
                    <div class="typing-target" id="typingTarget" tabindex="0">
                        <div class="line-numbers" id="lineNumbers"></div>
                        <div class="code-container" id="codeContainer"></div>
                    </div>
                </div>
                
                <div class="typing-stats">
                    <div class="stat-card">
                        <div class="stat-icon">⚡</div>
                        <div class="stat-content">
                            <span class="stat-label">Speed</span>
                            <span class="stat-value typing-speed">0</span>
                            <span class="stat-unit">WPM</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-content">
                            <span class="stat-label">Accuracy</span>
                            <span class="stat-value typing-accuracy">100%</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">⏱️</div>
                        <div class="stat-content">
                            <span class="stat-label">Time</span>
                            <span class="stat-value typing-time">0.0s</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">✨</div>
                        <div class="stat-content">
                            <span class="stat-label">Streak</span>
                            <span class="stat-value" id="streakCounter">0</span>
                        </div>
                    </div>
                </div>
                
                <div class="keyboard-hint">
                    <div class="hint-title">Next Key:</div>
                    <div class="next-key" id="nextKey"></div>
                </div>
            </div>
            
            <div class="game-footer">
                <div class="hotkeys-info">
                    <span class="hotkey"><kbd>Tab</kbd> → 4 spaces</span>
                    <span class="hotkey"><kbd>Enter</kbd> → New line</span>
                    <span class="hotkey"><kbd>Esc</kbd> → Skip snippet</span>
                </div>
                <button class="practice-btn" id="practiceBtn">Practice Mode</button>
            </div>
        `;
        
        // Initialize UI components
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Difficulty buttons
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.difficulty = e.target.dataset.diff;
                this.loadNewSnippet();
            });
        });
        
        // Action buttons
        document.getElementById('resetBtn').addEventListener('click', () => this.loadNewSnippet());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('practiceBtn').addEventListener('click', () => this.togglePracticeMode());
    },

    // Initialize the typing game
    initTypingGame: function() {
        // Initialize state
        this.state = {
            snippet: null,
            typedChars: [],
            startTime: null,
            isComplete: false,
            currentCharIndex: 0,
            totalErrors: 0,
            totalKeystrokes: 0,
            highestWPM: 0,
            lastKeyPressTime: null,
            averageKeyPressDelay: 0,
            difficulty: 'medium',
            streak: 0,
            snippetCount: 1,
            isPracticeMode: false,
            practiceSnippet: null
        };

        // Enhanced snippet pools with more variety
        this.pool = {
            easy: [
                `const add = (a, b) => a + b;`,
                `let x = 10; if (x > 5) x--;`,
                `const arr = [1,2,3]; arr.forEach(n => console.log(n));`,
                `for (let i = 0; i < 3; i++) console.log(i);`,
                `function sayHello(name) { return "Hello " + name; }`,
                `const user = { name: "John", age: 30 };`,
                `let numbers = [1, 2, 3, 4, 5];`,
                `const isEven = num => num % 2 === 0;`
            ],
            medium: [
                `function greet(name='Dev'){ return \`Hello, \${name}\`; }`,
                `const user = { id:1, name:'Ada' }; const { name } = user;`,
                `try { JSON.parse('{x}'); } catch(e) { console.error(e.message); }`,
                `const fetchJSON = async (url) => (await fetch(url)).json();`,
                `const numbers = [1, 2, 3]; const squares = numbers.map(n => n * n);`,
                `class Person { constructor(name) { this.name = name; } }`,
                `const uniqueItems = [...new Set([1,2,2,3,3,3])];`,
                `const timeout = setTimeout(() => console.log('Done'), 1000);`
            ],
            hard: [
                `class Queue { #q=[]; enqueue(x){this.#q.push(x);} dequeue(){return this.#q.shift();} }`,
                `const debounce=(fn,ms)=>{ let t; return(...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; };`,
                `const compose=(...f)=>x=>f.reduceRight((v,g)=>g(v),x);`,
                `document.querySelectorAll('button').forEach(b=>b.addEventListener('click',e=>e.stopPropagation()));`,
                `const memoize = fn => { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); return cache.has(key) ? cache.get(key) : (cache.set(key, fn(...args)), cache.get(key)); }; };`,
                `const curry = fn => (...args) => args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args));`,
                `const deepClone = obj => JSON.parse(JSON.stringify(obj));`,
                `const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);`
            ]
        };

        // Get DOM elements
        this.typingTarget = document.getElementById('typingTarget');
        this.codeContainer = document.getElementById('codeContainer');
        this.typingSpeed = document.querySelector('.typing-speed');
        this.typingAccuracy = document.querySelector('.typing-accuracy');
        this.typingTime = document.querySelector('.typing-time');
        this.highestWPM = document.getElementById('highestWPM');
        this.snippetCount = document.getElementById('snippetCount');
        this.streakCounter = document.getElementById('streakCounter');
        this.nextKey = document.getElementById('nextKey');
        this.progressBar = document.getElementById('progressBar');
        this.progressText = document.getElementById('progressText');

        // Setup event listeners for typing
        this.typingTarget.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.typingTarget.addEventListener('keyup', (e) => this.handleKeyUp(e));
        this.typingTarget.addEventListener('click', () => {
            this.typingTarget.focus();
            this.positionCursor();
        });

        // Focus on the typing area
        this.typingTarget.focus();

        // Load first snippet
        this.loadNewSnippet();
    },

    // Inject CSS styles
    injectStyles: function() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            .game-header {
                text-align: center;
                margin-bottom: 25px;
                padding: 15px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 12px;
                color: white;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .game-title {
                font-size: 2.2rem;
                margin-bottom: 8px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .game-subtitle {
                font-size: 1rem;
                opacity: 0.9;
                font-weight: 300;
            }
            
            .game-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                backdrop-filter: blur(10px);
            }
            
            .difficulty-selector {
                display: flex;
                gap: 10px;
            }
            
            .diff-btn {
                padding: 8px 20px;
                border: none;
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
            }
            
            .diff-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }
            
            .diff-btn.active {
                background: linear-gradient(45deg, #00f2fe, #4facfe);
                box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
            }
            
            .game-info {
                display: flex;
                gap: 20px;
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
            }
            
            .game-area {
                background: rgba(15, 23, 42, 0.95);
                border-radius: 15px;
                padding: 25px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin-bottom: 20px;
            }
            
            .progress-container {
                margin-bottom: 20px;
                position: relative;
                height: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                overflow: hidden;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #00f2fe, #4facfe);
                width: 0%;
                transition: width 0.3s ease;
                border-radius: 10px;
            }
            
            .progress-text {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 0.8rem;
                font-weight: bold;
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
            }
            
            .code-editor {
                background: rgba(10, 15, 35, 0.95);
                border-radius: 12px;
                overflow: hidden;
                margin-bottom: 25px;
                border: 1px solid rgba(64, 224, 208, 0.2);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            }
            
            .editor-header {
                background: rgba(20, 25, 45, 0.95);
                padding: 12px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .editor-title {
                color: rgba(255, 255, 255, 0.7);
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
            }
            
            .editor-actions {
                display: flex;
                gap: 10px;
            }
            
            .action-btn {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .action-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }
            
            .typing-target {
                position: relative;
                min-height: 220px;
                max-height: 300px;
                overflow: auto;
                cursor: text;
                outline: none;
                display: flex;
                padding: 20px;
            }
            
            .typing-target:focus {
                border-color: #00f2fe;
                box-shadow: 0 0 20px rgba(0, 242, 254, 0.25);
            }
            
            .line-numbers {
                width: 50px;
                color: rgba(255, 255, 255, 0.3);
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                text-align: right;
                padding-right: 15px;
                user-select: none;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .code-container {
                flex: 1;
                position: relative;
                font-family: 'Fira Code', 'Courier New', monospace;
                font-size: 1rem;
                line-height: 1.6;
                color: rgba(224, 224, 255, 0.75);
                white-space: pre-wrap;
                user-select: none;
                tab-size: 4;
            }
            
            .code-line {
                position: relative;
                min-height: 1.6em;
                display: flex;
                align-items: center;
            }
            
            .char-element {
                position: relative;
                display: inline-block;
                min-width: 8px;
            }
            
            .char-element.space-char {
                background-color: rgba(255, 255, 255, 0.05);
                border-radius: 2px;
                min-width: 12px;
            }
            
            .typed-overlay-char {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Fira Code', 'Courier New', monospace;
                font-size: 1rem;
                font-weight: bold;
                z-index: 10;
                pointer-events: none;
                border-radius: 2px;
                transition: all 0.1s ease;
            }
            
            .typed-overlay-char.correct {
                color: #4dff88;
                background-color: rgba(77, 255, 136, 0.1);
                text-shadow: 0 0 8px rgba(77, 255, 136, 0.5);
            }
            
            .typed-overlay-char.incorrect {
                color: #ff4d4d;
                background-color: rgba(255, 77, 77, 0.15);
                text-decoration: underline;
                text-shadow: 0 0 8px rgba(255, 77, 77, 0.5);
                animation: shake 0.5s ease;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                75% { transform: translateX(2px); }
            }
            
            .typing-cursor {
                position: absolute;
                background-color: #00f2fe;
                width: 2px;
                z-index: 20;
                pointer-events: none;
                animation: blink 1s infinite;
                box-shadow: 0 0 10px #00f2fe;
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            .typing-stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .stat-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                padding: 15px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: transform 0.3s ease;
            }
            
            .stat-card:hover {
                transform: translateY(-5px);
                background: rgba(255, 255, 255, 0.08);
            }
            
            .stat-icon {
                font-size: 1.5rem;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
            }
            
            .stat-content {
                flex: 1;
            }
            
            .stat-label {
                display: block;
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.6);
                margin-bottom: 5px;
            }
            
            .stat-value {
                font-size: 1.5rem;
                font-weight: bold;
                color: white;
            }
            
            .stat-unit {
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.6);
                margin-left: 5px;
            }
            
            .keyboard-hint {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                padding: 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
            }
            
            .hint-title {
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.9rem;
            }
            
            .next-key {
                font-family: 'Fira Code', monospace;
                font-size: 1.2rem;
                color: #00f2fe;
                background: rgba(0, 242, 254, 0.1);
                padding: 8px 16px;
                border-radius: 6px;
                min-width: 40px;
                text-align: center;
                border: 1px solid rgba(0, 242, 254, 0.3);
            }
            
            .game-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
            }
            
            .hotkeys-info {
                display: flex;
                gap: 20px;
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.85rem;
            }
            
            .hotkey {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            kbd {
                background: rgba(255, 255, 255, 0.1);
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Fira Code', monospace;
                font-size: 0.8rem;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .practice-btn {
                padding: 10px 20px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                border: none;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .practice-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
            }
            
            .completion-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(15, 23, 42, 0.95);
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                z-index: 1000;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                border: 2px solid rgba(0, 242, 254, 0.3);
                animation: popIn 0.5s ease;
            }
            
            @keyframes popIn {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
            
            .message-title {
                color: #00f2fe;
                font-size: 1.5rem;
                margin-bottom: 15px;
            }
            
            .message-stats {
                color: white;
                font-size: 1.1rem;
                margin-bottom: 20px;
            }
            
            .continue-btn {
                padding: 10px 30px;
                background: linear-gradient(45deg, #00f2fe, #4facfe);
                border: none;
                border-radius: 8px;
                color: white;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .continue-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 5px 20px rgba(0, 242, 254, 0.4);
            }
            
            @media (max-width: 768px) {
                .typing-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .game-footer {
                    flex-direction: column;
                    gap: 15px;
                }
                
                .hotkeys-info {
                    flex-wrap: wrap;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
    },

    // Load a new snippet
    loadNewSnippet: function() {
        this.resetState();
        
        let snippet;
        if (this.state.isPracticeMode && this.state.practiceSnippet) {
            snippet = this.state.practiceSnippet;
        } else {
            const list = this.pool[this.state.difficulty] || this.pool.medium;
            const base = list[Math.floor(Math.random() * list.length)];
            snippet = base.replace(/\s/g, (m) => (Math.random() < 0.06 ? (m === '\n' ? '\n\n' : '  ') : m));
        }
        
        this.state.snippet = snippet;
        this.renderCode();
        
        // Update UI
        document.querySelectorAll('.typed-overlay-char').forEach(el => el.remove());
        this.updateNextKey();
        this.updateProgress();
        this.updateStats();
        
        // Focus and show cursor
        this.typingTarget.focus();
        this.positionCursor();
    },

    // Reset game state
    resetState: function() {
        this.state.typedChars = [];
        this.state.currentCharIndex = 0;
        this.state.totalErrors = 0;
        this.state.totalKeystrokes = 0;
        this.state.isComplete = false;
        this.state.startTime = null;
        this.state.lastKeyPressTime = null;
        this.state.averageKeyPressDelay = 0;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    },

    // Render code with line numbers
    renderCode: function() {
        const code = this.state.snippet || '';
        this.codeContainer.innerHTML = '';
        
        // Update line numbers
        const lineCount = code.split('\n').length;
        let lineNumbersHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            lineNumbersHTML += `<div class="line-number">${i}</div>`;
        }
        document.getElementById('lineNumbers').innerHTML = lineNumbersHTML;
        
        const lines = code.split('\n');
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'code-line';
            
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                const charSpan = document.createElement('span');
                charSpan.className = 'char-element';
                charSpan.dataset.index = lineIndex * 1000 + i;
                charSpan.dataset.line = lineIndex;
                charSpan.dataset.col = i;
                
                if (char === ' ') {
                    charSpan.innerHTML = '&nbsp;';
                    charSpan.classList.add('space-char');
                } else if (char === '\t') {
                    charSpan.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
                    charSpan.classList.add('tab-char');
                } else {
                    charSpan.textContent = char;
                }
                lineDiv.appendChild(charSpan);
            }
            
            this.codeContainer.appendChild(lineDiv);
        }
    },

    // Handle key down events
    handleKeyDown: function(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            this.skipSnippet();
            return;
        }
        
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
        }

        if (!this.state.startTime && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            this.state.startTime = new Date();
            this.startTimer();
        }

        const now = new Date();
        if (this.state.lastKeyPressTime) {
            const delay = now - this.state.lastKeyPressTime;
            this.state.averageKeyPressDelay = (this.state.averageKeyPressDelay * 0.7) + (delay * 0.3);
        }
        this.state.lastKeyPressTime = now;

        if (e.key === 'Backspace') {
            this.handleBackspace();
            return;
        }
        
        if (e.key === 'Tab') {
            e.preventDefault();
            for (let i = 0; i < 4; i++) this.handleCharacter(' ');
            return;
        }
        
        if (e.key === 'Enter') {
            this.handleCharacter('\n');
            return;
        }
        
        if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) return;

        this.handleCharacter(e.key);
    },

    // Handle key up events
    handleKeyUp: function(e) {
        this.updateNextKey();
    },

    // Handle character input
    handleCharacter: function(char) {
        const code = this.state.snippet;
        const idx = this.state.currentCharIndex;
        if (idx >= code.length) return;

        this.state.totalKeystrokes++;
        const expectedChar = code[idx];
        const isCorrect = char === expectedChar;

        this.state.typedChars.push({
            char,
            isCorrect,
            position: idx,
            timestamp: new Date(),
            expectedChar
        });
        
        if (!isCorrect) {
            this.state.totalErrors++;
            // Shake animation for error
            this.typingTarget.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                this.typingTarget.style.animation = '';
            }, 500);
        }

        this.state.currentCharIndex++;

        // Overlay typed character
        this.overlayTypedCharacter(char, idx, isCorrect);

        // Move cursor
        this.positionCursor();

        // Update UI
        this.updateNextKey();
        this.updateProgress();
        this.updateStats();

        // Check completion
        if (this.state.currentCharIndex === code.length) {
            this.completeSnippet();
        }
    },

    // Overlay typed character
    overlayTypedCharacter: function(char, index, isCorrect) {
        const charElements = document.querySelectorAll('.char-element');
        if (index >= charElements.length) return;

        const originalCharEl = charElements[index];
        const overlayEl = document.createElement('div');
        overlayEl.className = `typed-overlay-char ${isCorrect ? 'correct' : 'incorrect'}`;
        overlayEl.textContent = char === ' ' ? '·' : char;

        const rect = originalCharEl.getBoundingClientRect();
        const containerRect = this.codeContainer.getBoundingClientRect();

        overlayEl.style.left = (rect.left - containerRect.left) + 'px';
        overlayEl.style.top = (rect.top - containerRect.top) + 'px';
        overlayEl.style.width = rect.width + 'px';
        overlayEl.style.height = rect.height + 'px';

        this.codeContainer.appendChild(overlayEl);
        this.state.typedChars[this.state.typedChars.length - 1].overlayEl = overlayEl;
    },

    // Handle backspace
    handleBackspace: function() {
        if (this.state.currentCharIndex > 0) {
            const last = this.state.typedChars.pop();
            if (last && last.overlayEl) last.overlayEl.remove();
            this.state.currentCharIndex--;
            this.state.totalKeystrokes++;
            this.positionCursor();
            this.updateNextKey();
            this.updateProgress();
            this.updateStats();
        }
    },

    // Position the cursor
    positionCursor: function() {
        const existingCursor = document.querySelector('.typing-cursor');
        if (existingCursor) existingCursor.remove();

        if (this.state.isComplete || !this.state.snippet) return;

        const charElements = document.querySelectorAll('.char-element');
        const idx = Math.min(this.state.currentCharIndex, charElements.length - 1);
        if (idx < 0 || idx >= charElements.length) return;

        const el = charElements[idx];
        const rect = el.getBoundingClientRect();
        const containerRect = this.codeContainer.getBoundingClientRect();

        const cursor = document.createElement('div');
        cursor.className = 'typing-cursor';
        cursor.style.left = (rect.left - containerRect.left) + 'px';
        cursor.style.top = (rect.top - containerRect.top) + 'px';
        cursor.style.height = rect.height + 'px';

        this.codeContainer.appendChild(cursor);
    },

    // Start the timer
    startTimer: function() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            if (!this.state.isComplete && this.state.startTime) {
                this.updateStats();
                this.updateProgress();
            }
        }, 100);
    },

    // Update statistics
    updateStats: function() {
        // Update WPM
        let speed = 0;
        if (this.state.startTime && !this.state.isComplete) {
            const timeMin = (new Date() - this.state.startTime) / 1000 / 60;
            const words = this.state.currentCharIndex / this.config.wpmCalculation.charsPerWord;
            speed = timeMin > 0 ? Math.round(words / timeMin) : 0;
            if (speed > this.state.highestWPM) {
                this.state.highestWPM = speed;
                this.highestWPM.textContent = speed;
            }
        }
        this.typingSpeed.textContent = speed;

        // Update accuracy
        let accuracy = 100;
        if (this.state.totalKeystrokes > 0) {
            accuracy = Math.max(0, Math.round(((this.state.totalKeystrokes - this.state.totalErrors) / this.state.totalKeystrokes) * 100));
        }
        this.typingAccuracy.textContent = `${accuracy}%`;

        // Update time
        let timeElapsed = 0;
        if (this.state.startTime && !this.state.isComplete) {
            timeElapsed = (new Date() - this.state.startTime) / 1000;
        }
        this.typingTime.textContent = `${timeElapsed.toFixed(1)}s`;

        // Update snippet count
        this.snippetCount.textContent = this.state.snippetCount;
    },

    // Update progress bar
    updateProgress: function() {
        const progress = this.state.snippet 
            ? (this.state.currentCharIndex / this.state.snippet.length) * 100 
            : 0;
        
        this.progressBar.style.width = `${progress}%`;
        this.progressText.textContent = `${Math.round(progress)}%`;
    },

    // Update next key hint
    updateNextKey: function() {
        if (!this.state.snippet || this.state.currentCharIndex >= this.state.snippet.length) {
            this.nextKey.textContent = '✓';
            return;
        }
        
        const nextChar = this.state.snippet[this.state.currentCharIndex];
        let displayChar = nextChar;
        
        if (nextChar === ' ') displayChar = '␣';
        else if (nextChar === '\n') displayChar = '↵';
        else if (nextChar === '\t') displayChar = '⇥';
        
        this.nextKey.textContent = displayChar;
    },

    // Complete the snippet
    completeSnippet: function() {
        this.state.isComplete = true;
        clearInterval(this.timerInterval);
        
        const cursor = document.querySelector('.typing-cursor');
        if (cursor) cursor.remove();
        
        // Update streak
        const accuracy = this.state.totalKeystrokes > 0 
            ? ((this.state.totalKeystrokes - this.state.totalErrors) / this.state.totalKeystrokes) * 100 
            : 100;
        
        if (accuracy >= 90) {
            this.state.streak++;
        } else {
            this.state.streak = 0;
        }
        
        this.streakCounter.textContent = this.state.streak;
        this.state.snippetCount++;
        
        this.updateStats();
        
        // Show completion message
        this.showCompletionMessage();
    },

    // Show completion message
    showCompletionMessage: function() {
        const timeElapsed = this.state.startTime ? (new Date() - this.state.startTime) / 1000 : 0;
        const accuracy = this.state.totalKeystrokes > 0 
            ? Math.round(((this.state.totalKeystrokes - this.state.totalErrors) / this.state.totalKeystrokes) * 100)
            : 100;
        
        const words = this.state.currentCharIndex / this.config.wpmCalculation.charsPerWord;
        const speed = timeElapsed > 0 ? Math.round((words / timeElapsed) * 60) : 0;
        
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <div class="message-title">🎉 Snippet Complete!</div>
            <div class="message-stats">
                <div>Speed: <strong>${speed} WPM</strong></div>
                <div>Accuracy: <strong>${accuracy}%</strong></div>
                <div>Time: <strong>${timeElapsed.toFixed(1)}s</strong></div>
                <div>Streak: <strong>${this.state.streak}</strong></div>
            </div>
            <button class="continue-btn">Continue to Next →</button>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after delay
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
            if (!this.state.isPracticeMode) {
                this.loadNewSnippet();
            }
        }, 2000);
        
        // Manual continue
        message.querySelector('.continue-btn').addEventListener('click', () => {
            document.body.removeChild(message);
            if (!this.state.isPracticeMode) {
                this.loadNewSnippet();
            }
        });
    },

    // Skip current snippet
    skipSnippet: function() {
        if (this.state.isPracticeMode && this.state.practiceSnippet) {
            this.state.practiceSnippet = null;
        }
        this.loadNewSnippet();
    },

    // Show hint
    showHint: function() {
        if (!this.state.snippet || this.state.currentCharIndex >= this.state.snippet.length) return;
        
        const nextChar = this.state.snippet[this.state.currentCharIndex];
        let hint = '';
        
        if (nextChar === ' ') hint = 'Space';
        else if (nextChar === '\n') hint = 'Enter (new line)';
        else if (nextChar === '\t') hint = 'Tab (4 spaces)';
        else if (nextChar === '{') hint = 'Curly brace open';
        else if (nextChar === '}') hint = 'Curly brace close';
        else if (nextChar === '(') hint = 'Parenthesis open';
        else if (nextChar === ')') hint = 'Parenthesis close';
        else if (nextChar === '[') hint = 'Bracket open';
        else if (nextChar === ']') hint = 'Bracket close';
        else if (nextChar === ';') hint = 'Semicolon';
        else if (nextChar === ':') hint = 'Colon';
        else if (nextChar === ',') hint = 'Comma';
        else if (nextChar === '.') hint = 'Dot';
        else if (nextChar === '`') hint = 'Backtick';
        else if (nextChar === "'") hint = 'Single quote';
        else if (nextChar === '"') hint = 'Double quote';
        else if (nextChar === '=') hint = 'Equals sign';
        else if (nextChar === '>') hint = 'Greater than';
        else if (nextChar === '<') hint = 'Less than';
        else hint = `Type "${nextChar}"`;
        
        alert(`Hint: ${hint}`);
    },

    // Toggle practice mode
    togglePracticeMode: function() {
        this.state.isPracticeMode = !this.state.isPracticeMode;
        const btn = document.getElementById('practiceBtn');
        
        if (this.state.isPracticeMode) {
            btn.textContent = 'Normal Mode';
            btn.style.background = 'linear-gradient(45deg, #f093fb, #f5576c)';
            
            // Ask for custom snippet
            const customCode = prompt('Enter your practice JavaScript snippet:', 'const greet = name => `Hello ${name}`;');
            if (customCode !== null && customCode.trim() !== '') {
                this.state.practiceSnippet = customCode;
                this.loadNewSnippet();
            } else {
                this.state.isPracticeMode = false;
                btn.textContent = 'Practice Mode';
                btn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            }
        } else {
            btn.textContent = 'Practice Mode';
            btn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            this.state.practiceSnippet = null;
            this.loadNewSnippet();
        }
    }
};

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('typingGameContainer');
    if (container) {
        window.JavaScriptJourney.init(container);
    }
});