window.CodeRunner = {
    init: function(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3><i class="fas fa-keyboard"></i> Type & Code Arena</h3>
                <p>Type directly on the code! Your typed letters will appear OVER the original letters.</p>
                <div class="difficulty-selector">
                    <button class="difficulty-btn active" data-level="easy">Easy</button>
                    <button class="difficulty-btn" data-level="medium">Medium</button>
                    <button class="difficulty-btn" data-level="hard">Hard</button>
                    <button class="difficulty-btn" data-level="expert">Expert</button>
                </div>
            </div>
            <div class="code-editor">
                <div class="code-header">
                    <h3><i class="fas fa-code"></i> Challenge <span class="level-indicator">Easy</span></h3>
                    <div class="code-actions">
                        <button class="action-btn" id="newChallengeBtn">
                            <i class="fas fa-redo"></i> New Challenge
                        </button>
                        <button class="action-btn" id="hintBtn">
                            <i class="fas fa-lightbulb"></i> Hint
                        </button>
                        <button class="action-btn" id="themeToggle">
                            <i class="fas fa-moon"></i> Theme
                        </button>
                    </div>
                </div>
                
                <!-- Main typing area - letters typed will overlay here -->
                <div class="typing-target" id="typingTarget" tabindex="0">
                    <div class="code-container" id="codeContainer">
                        <!-- Code will be dynamically inserted here -->
                    </div>
                </div>
                
                <div class="typing-hint">
                    <p><i class="fas fa-info-circle"></i> Focus on the code and start typing. Each letter you type appears over the original letter.</p>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar" id="progressBar"></div>
                    <div class="progress-text">Progress: <span id="progressText">0%</span></div>
                </div>
                
                <div class="typing-stats">
                    <div class="stat">
                        <span><i class="fas fa-tachometer-alt"></i> Speed (WPM)</span>
                        <span class="typing-speed">0</span>
                    </div>
                    <div class="stat">
                        <span><i class="fas fa-bullseye"></i> Accuracy</span>
                        <span class="typing-accuracy">100%</span>
                    </div>
                    <div class="stat">
                        <span><i class="fas fa-clock"></i> Time</span>
                        <span class="typing-time">0.0s</span>
                    </div>
                    <div class="stat">
                        <span><i class="fas fa-star"></i> Score</span>
                        <span class="typing-score">0</span>
                    </div>
                </div>
                
                <div class="results-panel" id="resultsPanel">
                    <h3><i class="fas fa-trophy"></i> Challenge Complete!</h3>
                    <div class="result-stats">
                        <div class="result-stat">
                            <span>Final Speed:</span>
                            <span id="finalSpeed">0 WPM</span>
                        </div>
                        <div class="result-stat">
                            <span>Final Accuracy:</span>
                            <span id="finalAccuracy">100%</span>
                        </div>
                        <div class="result-stat">
                            <span>Time Taken:</span>
                            <span id="finalTime">0.0s</span>
                        </div>
                        <div class="result-stat">
                            <span>Total Score:</span>
                            <span id="finalScore">0</span>
                        </div>
                    </div>
                    <div class="result-actions">
                        <button class="action-btn primary" id="nextChallengeBtn">
                            <i class="fas fa-forward"></i> Next Challenge
                        </button>
                        <button class="action-btn" id="shareResultsBtn">
                            <i class="fas fa-share-alt"></i> Share Results
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="keyboard-shortcuts">
                <h4><i class="fas fa-keyboard"></i> Keyboard Shortcuts</h4>
                <div class="shortcuts-grid">
                    <div class="shortcut">
                        <kbd>Any Key</kbd>
                        <span>Type letter over original</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Backspace</kbd>
                        <span>Remove last typed letter</span>
                    </div>
                    <div class="shortcut">
                        <kbd>ESC</kbd>
                        <span>Reset challenge</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + N</kbd>
                        <span>New challenge</span>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize the typing game
        setTimeout(() => this.initTypingGame(), 100);
    },
    
    initTypingGame: function() {
        // Game state
        this.gameState = {
            currentCode: '',
            typedChars: [],
            startTime: null,
            endTime: null,
            isComplete: false,
            currentCharIndex: 0,
            totalErrors: 0,
            totalKeystrokes: 0,
            currentDifficulty: 'easy',
            score: 0,
            isDarkTheme: true,
            codeLanguage: 'javascript',
            currentLevel: 1,
            totalLevels: 10,
            achievements: [],
            charPositions: [] // Store positions of each character
        };
        
        // Code snippets database
        this.codeSnippets = {
            easy: [
                {code: "const sum = (a, b) => a + b;", language: "javascript"},
                {code: "def greet(name):\n    return f'Hello, {name}!'", language: "python"},
                {code: "for (let i = 0; i < 10; i++) {\n    console.log(i);\n}", language: "javascript"},
                {code: "x = 5\ny = 10\nresult = x + y", language: "python"},
                {code: "function isEven(num) {\n    return num % 2 === 0;\n}", language: "javascript"},
                {code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello\");\n    }\n}", language: "java"}
            ],
            medium: [
                {code: "const users = users.filter(user => user.active);", language: "javascript"},
                {code: "const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);", language: "javascript"},
                {code: "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)", language: "python"},
                {code: "const promise = fetch(url)\n    .then(response => response.json())\n    .then(data => console.log(data));", language: "javascript"},
                {code: "const doubled = numbers.map(num => num * 2);", language: "javascript"},
                {code: "class Calculator:\n    def add(self, a, b):\n        return a + b", language: "python"}
            ],
            hard: [
                {code: "const memoize = fn => {\n    const cache = {};\n    return (...args) => {\n        const key = JSON.stringify(args);\n        return cache[key] || (cache[key] = fn(...args));\n    };\n};", language: "javascript"},
                {code: "function debounce(func, timeout = 300) {\n    let timer;\n    return (...args) => {\n        clearTimeout(timer);\n        timer = setTimeout(() => func.apply(this, args), timeout);\n    };\n}", language: "javascript"},
                {code: "def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr)//2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)", language: "python"},
                {code: "const rotateArray = (arr, k) => {\n    const n = arr.length;\n    k = k % n;\n    return [...arr.slice(n - k), ...arr.slice(0, n - k)];\n};", language: "javascript"}
            ],
            expert: [
                {code: "const curry = fn => {\n    const curried = (...args) => {\n        if (args.length >= fn.length) {\n            return fn(...args);\n        }\n        return (...moreArgs) => curried(...args, ...moreArgs);\n    };\n    return curried;\n};", language: "javascript"},
                {code: "class Observable {\n    constructor() {\n        this.subscribers = [];\n    }\n    subscribe(fn) {\n        this.subscribers.push(fn);\n    }\n    next(value) {\n        this.subscribers.forEach(fn => fn(value));\n    }\n}", language: "javascript"},
                {code: "def lru_cache(maxsize=128):\n    def decorator(func):\n        cache = {}\n        order = []\n        def wrapper(*args):\n            key = str(args)\n            if key in cache:\n                order.remove(key)\n                order.append(key)\n                return cache[key]\n            result = func(*args)\n            cache[key] = result\n            order.append(key)\n            if len(order) > maxsize:\n                oldest = order.pop(0)\n                del cache[oldest]\n            return result\n        return wrapper\n    return decorator", language: "python"}
            ]
        };
        
        // Initialize UI elements
        this.typingTarget = document.getElementById('typingTarget');
        this.codeContainer = document.getElementById('codeContainer');
        this.typingSpeed = document.querySelector('.typing-speed');
        this.typingAccuracy = document.querySelector('.typing-accuracy');
        this.typingTime = document.querySelector('.typing-time');
        this.typingScore = document.querySelector('.typing-score');
        this.progressBar = document.getElementById('progressBar');
        this.progressText = document.getElementById('progressText');
        this.resultsPanel = document.getElementById('resultsPanel');
        this.levelIndicator = document.querySelector('.level-indicator');
        
        // Set initial code
        this.loadNewChallenge();
        
        // Event listeners
        this.setupEventListeners();
        
        // Start the game
        this.startGame();
    },
    
    setupEventListeners: function() {
        // Typing directly on the code container
        this.typingTarget.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.typingTarget.addEventListener('click', () => {
            this.typingTarget.focus();
            this.positionCursor();
        });
        
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl + N for new challenge
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.loadNewChallenge();
            }
            // ESC to reset current challenge
            if (e.key === 'Escape') {
                e.preventDefault();
                this.resetCurrentChallenge();
            }
        });
        
        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeDifficulty(e.target.dataset.level));
        });
        
        // Action buttons
        document.getElementById('newChallengeBtn').addEventListener('click', () => this.loadNewChallenge());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('nextChallengeBtn').addEventListener('click', () => this.nextChallenge());
        document.getElementById('shareResultsBtn').addEventListener('click', () => this.shareResults());
        
        // Initialize results panel as hidden
        this.resultsPanel.style.display = 'none';
    },
    
    handleKeyDown: function(e) {
        // Prevent default for keys we handle
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
        }
        
        // Start timer on first valid keystroke
        if (!this.gameState.startTime && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            this.gameState.startTime = new Date();
            this.startTimer();
        }
        
        // Handle backspace
        if (e.key === 'Backspace') {
            this.handleBackspace();
            return;
        }
        
        // Handle tab (add 4 spaces)
        if (e.key === 'Tab') {
            this.handleTab();
            return;
        }
        
        // Handle enter (new line)
        if (e.key === 'Enter') {
            this.handleEnter();
            return;
        }
        
        // Ignore control keys
        if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
        
        // Handle regular character input
        this.handleCharacter(e.key);
    },
    
    handleCharacter: function(char) {
        const code = this.gameState.currentCode;
        const currentIndex = this.gameState.currentCharIndex;
        
        // Check if we're at the end
        if (currentIndex >= code.length) {
            return;
        }
        
        // Update keystrokes count
        this.gameState.totalKeystrokes++;
        
        const expectedChar = code[currentIndex];
        const isCorrect = char === expectedChar;
        
        // Store typed character
        this.gameState.typedChars.push({
            char: char,
            isCorrect: isCorrect,
            position: currentIndex
        });
        
        // Update error count
        if (!isCorrect) {
            this.gameState.totalErrors++;
        }
        
        // Move to next character
        this.gameState.currentCharIndex++;
        
        // Update display - overlay typed character
        this.overlayTypedCharacter(char, currentIndex, isCorrect);
        
        // Position cursor for next character
        this.positionCursor();
        
        // Update stats
        this.updateStats();
        
        // Check if code is complete
        if (this.gameState.currentCharIndex === code.length) {
            this.completeChallenge();
        }
    },
    
    overlayTypedCharacter: function(char, index, isCorrect) {
        // Get the original character element
        const charElements = document.querySelectorAll('.char-element');
        if (index >= charElements.length) return;
        
        const originalCharEl = charElements[index];
        
        // Create overlay element
        const overlayEl = document.createElement('div');
        overlayEl.className = `typed-overlay-char ${isCorrect ? 'correct' : 'incorrect'}`;
        overlayEl.textContent = char;
        
        // Get position of original character
        const rect = originalCharEl.getBoundingClientRect();
        const containerRect = this.codeContainer.getBoundingClientRect();
        
        // Position overlay exactly over original character
        overlayEl.style.left = (rect.left - containerRect.left) + 'px';
        overlayEl.style.top = (rect.top - containerRect.top) + 'px';
        overlayEl.style.width = rect.width + 'px';
        overlayEl.style.height = rect.height + 'px';
        
        // Add to container
        this.codeContainer.appendChild(overlayEl);
        
        // Store reference
        this.gameState.typedChars[this.gameState.typedChars.length - 1].overlayEl = overlayEl;
    },
    
    handleBackspace: function() {
        if (this.gameState.currentCharIndex > 0) {
            // Remove last typed character overlay
            const lastTyped = this.gameState.typedChars.pop();
            if (lastTyped && lastTyped.overlayEl) {
                lastTyped.overlayEl.remove();
            }
            
            // Move back one character
            this.gameState.currentCharIndex--;
            
            // Update stats (backspace counts as a keystroke)
            this.gameState.totalKeystrokes++;
            
            // Position cursor
            this.positionCursor();
            
            // Update stats
            this.updateStats();
        }
    },
    
    handleTab: function() {
        // Add 4 spaces for tab
        for (let i = 0; i < 4; i++) {
            this.handleCharacter(' ');
        }
    },
    
    handleEnter: function() {
        this.handleCharacter('\n');
    },
    
    positionCursor: function() {
        // Remove existing cursor
        const existingCursor = document.querySelector('.typing-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // If completed, don't show cursor
        if (this.gameState.isComplete || this.gameState.currentCharIndex >= this.gameState.currentCode.length) {
            return;
        }
        
        // Get current character element
        const charElements = document.querySelectorAll('.char-element');
        if (this.gameState.currentCharIndex >= charElements.length) return;
        
        const currentCharEl = charElements[this.gameState.currentCharIndex];
        const rect = currentCharEl.getBoundingClientRect();
        const containerRect = this.codeContainer.getBoundingClientRect();
        
        // Create cursor
        const cursor = document.createElement('div');
        cursor.className = 'typing-cursor';
        cursor.style.left = (rect.left - containerRect.left) + 'px';
        cursor.style.top = (rect.top - containerRect.top) + 'px';
        cursor.style.width = '2px';
        cursor.style.height = rect.height + 'px';
        
        this.codeContainer.appendChild(cursor);
    },
    
    loadNewChallenge: function() {
        // Reset game state
        this.resetGameState();
        
        // Get random code snippet for current difficulty
        const snippets = this.codeSnippets[this.gameState.currentDifficulty];
        const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
        
        this.gameState.currentCode = randomSnippet.code;
        this.gameState.codeLanguage = randomSnippet.language;
        
        // Update level indicator
        this.levelIndicator.textContent = this.gameState.currentDifficulty.charAt(0).toUpperCase() + 
                                         this.gameState.currentDifficulty.slice(1);
        
        // Render original code
        this.renderCode();
        
        // Clear any existing overlays
        document.querySelectorAll('.typed-overlay-char').forEach(el => el.remove());
        
        // Reset stats
        this.updateStats();
        
        // Reset progress
        this.updateProgress();
        
        // Focus on typing target
        this.typingTarget.focus();
        
        // Position cursor at start
        this.positionCursor();
    },
    
    resetGameState: function() {
        this.gameState.typedChars = [];
        this.gameState.currentCharIndex = 0;
        this.gameState.totalErrors = 0;
        this.gameState.totalKeystrokes = 0;
        this.gameState.isComplete = false;
        this.gameState.startTime = null;
        this.gameState.score = 0;
    },
    
    resetCurrentChallenge: function() {
        this.resetGameState();
        document.querySelectorAll('.typed-overlay-char').forEach(el => el.remove());
        this.updateStats();
        this.updateProgress();
        this.typingTarget.focus();
        this.positionCursor();
    },
    
    renderCode: function() {
        const code = this.gameState.currentCode;
        let html = '';
        
        // Clear container
        this.codeContainer.innerHTML = '';
        
        // Split code into lines
        const lines = code.split('\n');
        
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'code-line';
            
            // Process each character in the line
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                const charSpan = document.createElement('span');
                charSpan.className = 'char-element';
                charSpan.dataset.index = lineIndex * 1000 + i; // Unique index
                
                // Handle special characters
                if (char === ' ') {
                    charSpan.innerHTML = '&nbsp;';
                    charSpan.classList.add('space-char');
                } else if (char === '\t') {
                    charSpan.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
                    charSpan.classList.add('tab-char');
                } else {
                    charSpan.textContent = char;
                    
                    // Add syntax highlighting classes
                    if (this.gameState.codeLanguage === 'javascript') {
                        // Simple keyword detection
                        const keywordMatch = line.substr(i).match(/^(const|let|var|function|return|if|else|for|while)/);
                        if (keywordMatch) {
                            charSpan.classList.add('keyword');
                        }
                    }
                }
                
                lineDiv.appendChild(charSpan);
            }
            
            // Add line break if not last line
            if (lineIndex < lines.length - 1) {
                const lineBreak = document.createElement('span');
                lineBreak.className = 'char-element line-break';
                lineBreak.innerHTML = '<br>';
                lineDiv.appendChild(lineBreak);
            }
            
            this.codeContainer.appendChild(lineDiv);
        }
    },
    
    updateStats: function() {
        // Calculate typing speed (WPM)
        let speed = 0;
        if (this.gameState.startTime && !this.gameState.isComplete) {
            const timeElapsed = (new Date() - this.gameState.startTime) / 1000 / 60; // in minutes
            const wordsTyped = this.gameState.currentCharIndex / 5; // assuming 5 chars per word
            speed = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        }
        this.typingSpeed.textContent = speed;
        
        // Calculate accuracy
        let accuracy = 100;
        if (this.gameState.totalKeystrokes > 0) {
            accuracy = Math.max(0, Math.round(((this.gameState.totalKeystrokes - this.gameState.totalErrors) / this.gameState.totalKeystrokes) * 100));
        }
        this.typingAccuracy.textContent = `${accuracy}%`;
        
        // Update time
        let timeElapsed = 0;
        if (this.gameState.startTime && !this.gameState.isComplete) {
            timeElapsed = (new Date() - this.gameState.startTime) / 1000;
        }
        this.typingTime.textContent = `${timeElapsed.toFixed(1)}s`;
        
        // Calculate score
        this.gameState.score = Math.round(
            (speed * 10) + 
            (accuracy * 5) + 
            (this.gameState.currentLevel * 20) -
            (this.gameState.totalErrors * 3)
        );
        this.typingScore.textContent = Math.max(0, this.gameState.score);
    },
    
    updateProgress: function() {
        const progress = (this.gameState.currentCharIndex / this.gameState.currentCode.length) * 100;
        this.progressBar.style.width = `${progress}%`;
        this.progressText.textContent = `${Math.round(progress)}%`;
        
        // Change progress bar color based on accuracy
        const accuracy = parseInt(this.typingAccuracy.textContent);
        if (accuracy >= 90) {
            this.progressBar.style.background = 'linear-gradient(to right, #4dff88, #00cc66)';
        } else if (accuracy >= 70) {
            this.progressBar.style.background = 'linear-gradient(to right, #ffcc00, #ff9900)';
        } else {
            this.progressBar.style.background = 'linear-gradient(to right, #ff4d4d, #cc0000)';
        }
    },
    
    startTimer: function() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        this.timerInterval = setInterval(() => {
            if (!this.gameState.isComplete && this.gameState.startTime) {
                this.updateStats();
            }
        }, 100);
    },
    
    completeChallenge: function() {
        this.gameState.endTime = new Date();
        this.gameState.isComplete = true;
        
        // Stop timer
        clearInterval(this.timerInterval);
        
        // Remove cursor
        const cursor = document.querySelector('.typing-cursor');
        if (cursor) cursor.remove();
        
        // Calculate final stats
        const timeTaken = (this.gameState.endTime - this.gameState.startTime) / 1000;
        const words = this.gameState.currentCode.length / 5;
        const minutes = timeTaken / 60;
        const finalSpeed = Math.round(words / minutes);
        const finalAccuracy = Math.round(((this.gameState.totalKeystrokes - this.gameState.totalErrors) / this.gameState.totalKeystrokes) * 100);
        
        // Update results panel
        document.getElementById('finalSpeed').textContent = `${finalSpeed} WPM`;
        document.getElementById('finalAccuracy').textContent = `${finalAccuracy}%`;
        document.getElementById('finalTime').textContent = `${timeTaken.toFixed(2)}s`;
        document.getElementById('finalScore').textContent = this.gameState.score;
        
        // Show results panel with animation
        this.resultsPanel.style.display = 'block';
        setTimeout(() => {
            this.resultsPanel.style.opacity = '1';
            this.resultsPanel.style.transform = 'translateY(0)';
        }, 10);
        
        // Check for achievements
        this.checkAchievements(finalSpeed, finalAccuracy);
        
        // Level up if performance is good
        if (finalAccuracy >= 90 && finalSpeed >= 40) {
            this.gameState.currentLevel++;
            if (this.gameState.currentLevel > this.gameState.totalLevels) {
                this.gameState.currentLevel = this.gameState.totalLevels;
            }
        }
    },
    
    nextChallenge: function() {
        // Hide results panel
        this.resultsPanel.style.opacity = '0';
        this.resultsPanel.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.loadNewChallenge();
        }, 300);
    },
    
    changeDifficulty: function(level) {
        // Update active button
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update game state
        this.gameState.currentDifficulty = level;
        
        // Load new challenge with new difficulty
        this.loadNewChallenge();
    },
    
    showHint: function() {
        // Show a hint about the code snippet
        const hints = {
            javascript: "This is JavaScript code. Pay attention to semicolons and brackets.",
            python: "This is Python code. Indentation is important!",
            java: "This is Java code. Watch for curly braces and semicolons."
        };
        
        alert(`Hint: ${hints[this.gameState.codeLanguage] || "Focus on accuracy over speed!"}`);
    },
    
    toggleTheme: function() {
        this.gameState.isDarkTheme = !this.gameState.isDarkTheme;
        
        const themeToggleBtn = document.getElementById('themeToggle');
        const body = document.body;
        
        if (this.gameState.isDarkTheme) {
            body.style.background = 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)';
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark';
        } else {
            body.style.background = 'linear-gradient(135deg, #a8edea, #fed6e3)';
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
        }
    },
    
    checkAchievements: function(speed, accuracy) {
        const newAchievements = [];
        
        // Speed achievements
        if (speed >= 100 && !this.gameState.achievements.includes('speed_demon')) {
            newAchievements.push({name: 'Speed Demon', description: 'Reached 100+ WPM'});
            this.gameState.achievements.push('speed_demon');
        } else if (speed >= 60 && !this.gameState.achievements.includes('fast_typer')) {
            newAchievements.push({name: 'Fast Typer', description: 'Reached 60+ WPM'});
            this.gameState.achievements.push('fast_typer');
        }
        
        // Accuracy achievements
        if (accuracy >= 100 && !this.gameState.achievements.includes('perfectionist')) {
            newAchievements.push({name: 'Perfectionist', description: 'Achieved 100% accuracy'});
            this.gameState.achievements.push('perfectionist');
        } else if (accuracy >= 95 && !this.gameState.achievements.includes('accurate_coder')) {
            newAchievements.push({name: 'Accurate Coder', description: 'Achieved 95%+ accuracy'});
            this.gameState.achievements.push('accurate_coder');
        }
        
        // Show achievement notification if any earned
        if (newAchievements.length > 0) {
            this.showAchievementNotification(newAchievements);
        }
    },
    
    showAchievementNotification: function(achievements) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <h4><i class="fas fa-trophy"></i> Achievement Unlocked!</h4>
            ${achievements.map(a => `
                <div class="achievement">
                    <strong>${a.name}</strong>
                    <p>${a.description}</p>
                </div>
            `).join('')}
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    },
    
    shareResults: function() {
        const speed = document.getElementById('finalSpeed').textContent;
        const accuracy = document.getElementById('finalAccuracy').textContent;
        const score = document.getElementById('finalScore').textContent;
        
        const shareText = `I just scored ${score} points in Type & Code Arena with ${speed} speed and ${accuracy} accuracy!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Type & Code Arena Results',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Results copied to clipboard!');
            });
        }
    },
    
    startGame: function() {
        // Focus on typing target
        this.typingTarget.focus();
        
        // Add CSS for the new typing interface
        const style = document.createElement('style');
        style.textContent = `
            .typing-target {
                position: relative;
                background: rgba(10, 15, 35, 0.95);
                border-radius: 10px;
                padding: 25px;
                margin-bottom: 20px;
                border: 1px solid rgba(64, 224, 208, 0.2);
                min-height: 200px;
                overflow-x: auto;
                box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);
                cursor: text;
                outline: none;
            }
            
            .typing-target:focus {
                border-color: #00f2fe;
                box-shadow: 0 0 15px rgba(0, 242, 254, 0.3);
            }
            
            .code-container {
                position: relative;
                font-family: 'Courier New', monospace;
                font-size: 1.3rem;
                line-height: 1.8;
                color: rgba(224, 224, 255, 0.7);
                white-space: pre-wrap;
                user-select: none;
            }
            
            .code-line {
                position: relative;
                min-height: 1.8em;
            }
            
            .char-element {
                position: relative;
                display: inline-block;
                min-width: 8px;
            }
            
            .char-element.keyword {
                color: rgba(255, 121, 198, 0.7);
            }
            
            .char-element.space-char {
                background-color: rgba(255, 255, 255, 0.05);
                border-radius: 2px;
            }
            
            .char-element.tab-char {
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
            }
            
            .typed-overlay-char {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Courier New', monospace;
                font-size: 1.3rem;
                font-weight: bold;
                z-index: 10;
                pointer-events: none;
                animation: fadeIn 0.1s ease-out;
                border-radius: 2px;
            }
            
            .typed-overlay-char.correct {
                color: #4dff88;
                background-color: rgba(77, 255, 136, 0.1);
            }
            
            .typed-overlay-char.incorrect {
                color: #ff4d4d;
                background-color: rgba(255, 77, 77, 0.15);
                text-decoration: underline;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .typing-cursor {
                position: absolute;
                background-color: #00f2fe;
                width: 2px;
                z-index: 20;
                pointer-events: none;
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            .typing-hint {
                background: rgba(30, 30, 70, 0.7);
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 20px;
                border-left: 4px solid #4facfe;
            }
            
            .typing-hint p {
                color: #b0b0ff;
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 0;
            }
            
            .keyboard-shortcuts {
                margin-top: 30px;
                background: rgba(15, 22, 46, 0.8);
                border-radius: 15px;
                padding: 20px;
                border: 1px solid rgba(64, 224, 208, 0.2);
            }
            
            .keyboard-shortcuts h4 {
                color: #00f2fe;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .shortcuts-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .shortcut {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .shortcut kbd {
                background: rgba(30, 30, 70, 0.9);
                padding: 5px 10px;
                border-radius: 6px;
                border: 1px solid rgba(64, 224, 208, 0.3);
                font-family: 'Courier New', monospace;
                color: #00f2fe;
                min-width: 80px;
                text-align: center;
            }
            
            .shortcut span {
                color: #b0b0ff;
                font-size: 0.9rem;
            }
            
            .achievement-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 1000;
                max-width: 300px;
                transition: opacity 0.3s;
            }
            
            .achievement-notification h4 {
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .achievement {
                margin-bottom: 10px;
                padding: 8px;
                background: rgba(255,255,255,0.1);
                border-radius: 5px;
            }
            
            .progress-container {
                margin: 20px 0;
                background: rgba(30, 30, 70, 0.7);
                border-radius: 10px;
                height: 10px;
                overflow: hidden;
                position: relative;
            }
            
            .progress-bar {
                height: 100%;
                width: 0%;
                background: linear-gradient(to right, #4facfe, #00f2fe);
                transition: width 0.3s, background 0.3s;
            }
            
            .progress-text {
                text-align: center;
                margin-top: 5px;
                font-size: 0.9rem;
                color: #b0b0ff;
            }
            
            .results-panel {
                margin-top: 30px;
                background: rgba(15, 22, 46, 0.9);
                border-radius: 15px;
                padding: 25px;
                border: 1px solid rgba(64, 224, 208, 0.3);
                opacity: 0;
                transform: translateY(-20px);
                transition: opacity 0.5s, transform 0.5s;
            }
            
            .results-panel h3 {
                color: #00f2fe;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .result-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 25px;
            }
            
            .result-stat {
                background: rgba(30, 30, 70, 0.7);
                padding: 15px;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
            }
            
            .result-stat span:first-child {
                color: #b0b0ff;
            }
            
            .result-stat span:last-child {
                color: #00f2fe;
                font-weight: bold;
                font-size: 1.1rem;
            }
            
            .result-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
            }
            
            .action-btn.primary {
                background: linear-gradient(to right, #4facfe, #00f2fe);
                color: #0f0c29;
                font-weight: bold;
            }
            
            @media (max-width: 768px) {
                .code-container {
                    font-size: 1.1rem;
                }
                
                .typed-overlay-char {
                    font-size: 1.1rem;
                }
                
                .typing-target {
                    padding: 15px;
                }
                
                .typing-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .result-stats {
                    grid-template-columns: 1fr;
                }
                
                .result-actions {
                    flex-direction: column;
                }
                
                .shortcuts-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            @media (max-width: 480px) {
                .typing-stats {
                    grid-template-columns: 1fr;
                }
                
                .code-container {
                    font-size: 1rem;
                }
                
                .typed-overlay-char {
                    font-size: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
};