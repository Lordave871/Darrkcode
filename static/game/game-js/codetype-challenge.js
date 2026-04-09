window.DebugChallenge = {
    init: function(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3><i class="fas fa-bug"></i> CodeType Challenge</h3>
                <p>Type the corrected code to fix the bug! Your typed letters will appear OVER the original code.</p>
                <div class="bug-type-selector">
                    <button class="bug-btn active" data-type="syntax">Syntax Errors</button>
                    <button class="bug-btn" data-type="logic">Logic Errors</button>
                    <button class="bug-btn" data-type="runtime">Runtime Errors</button>
                    <button class="bug-btn" data-type="performance">Performance Issues</button>
                </div>
            </div>
            
            <div class="code-editor">
                <div class="code-header">
                    <h3><i class="fas fa-code"></i> Bug Challenge <span class="bug-type">Syntax Error</span></h3>
                    <div class="difficulty-info">
                        <span class="difficulty-level">Difficulty: <span id="difficultyLevel">Easy</span></span>
                        <span class="bug-points">Points: <span id="bugPoints">50</span></span>
                    </div>
                </div>
                
                <div class="bug-description">
                    <h4><i class="fas fa-exclamation-triangle"></i> Bug Description</h4>
                    <p id="bugDescription">Fix the syntax error in the code below. The current code has incorrect syntax that needs to be corrected.</p>
                </div>
                
                <div class="bug-hint" id="bugHint">
                    <p><i class="fas fa-lightbulb"></i> <strong>Hint:</strong> <span id="hintText">Look for missing semicolons or incorrect variable declarations</span></p>
                </div>
                
                <!-- Main typing area - letters typed will overlay here -->
                <div class="typing-target" id="typingTarget" tabindex="0">
                    <div class="code-container" id="codeContainer">
                        <!-- Buggy code will be dynamically inserted here -->
                    </div>
                </div>
                
                <div class="correct-code-preview">
                    <h4><i class="fas fa-check-circle"></i> Expected Output</h4>
                    <div class="preview-container" id="previewContainer">
                        <!-- Correct code preview will be shown here -->
                    </div>
                </div>
                
                <div class="typing-hint">
                    <p><i class="fas fa-info-circle"></i> Focus on the buggy code and type the corrected version. Each letter you type appears over the original.</p>
                </div>
                
                <div class="challenge-progress">
                    <div class="bug-counter">
                        <span>Bugs Fixed: <span id="bugsFixed">0</span></span>
                        <div class="streak-counter">
                            <i class="fas fa-fire"></i>
                            <span>Bug Fix Streak: <span id="bugStreak">0</span></span>
                        </div>
                    </div>
                    <div class="timer-container">
                        <div class="timer-circle">
                            <svg width="60" height="60">
                                <circle cx="30" cy="30" r="25" class="timer-bg"></circle>
                                <circle cx="30" cy="30" r="25" class="timer-progress" id="timerProgress"></circle>
                            </svg>
                            <div class="timer-text" id="timerText">60s</div>
                        </div>
                        <div class="timer-label">Time Remaining</div>
                    </div>
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
                    <div class="stat">
                        <span><i class="fas fa-bug"></i> Bugs Fixed</span>
                        <span class="bugs-counter">0</span>
                    </div>
                </div>
                
                <div class="completion-screen" id="completionScreen">
                    <div class="completion-content">
                        <div class="completion-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <h3>Bug Successfully Fixed!</h3>
                        <div class="completion-stats">
                            <div class="completion-stat">
                                <span>Bug Type:</span>
                                <span id="completedBugType">Syntax Error</span>
                            </div>
                            <div class="completion-stat">
                                <span>Time Taken:</span>
                                <span id="completionTime">0.0s</span>
                            </div>
                            <div class="completion-stat">
                                <span>Accuracy:</span>
                                <span id="completionAccuracy">100%</span>
                            </div>
                            <div class="completion-stat">
                                <span>Points Earned:</span>
                                <span id="pointsEarned">+50</span>
                            </div>
                            <div class="completion-stat">
                                <span>Total Score:</span>
                                <span id="totalScore">0</span>
                            </div>
                        </div>
                        <div class="completion-message" id="completionMessage">
                            Great job! You fixed the bug efficiently.
                        </div>
                        <div class="completion-actions">
                            <button class="action-btn primary" id="nextBugBtn">
                                <i class="fas fa-forward"></i> Next Bug
                            </button>
                            <button class="action-btn" id="reviewBugBtn">
                                <i class="fas fa-redo"></i> Try Again
                            </button>
                            <button class="action-btn" id="showSolutionBtn">
                                <i class="fas fa-code"></i> View Solution
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="solution-panel" id="solutionPanel">
                    <h4><i class="fas fa-code"></i> Solution & Explanation</h4>
                    <div class="solution-content">
                        <div class="solution-section">
                            <h5>Buggy Code</h5>
                            <pre class="buggy-code" id="solutionBuggyCode"></pre>
                        </div>
                        <div class="solution-section">
                            <h5>Fixed Code</h5>
                            <pre class="fixed-code" id="solutionFixedCode"></pre>
                        </div>
                        <div class="solution-section">
                            <h5>Explanation</h5>
                            <p id="solutionExplanation">The bug was caused by incorrect syntax...</p>
                        </div>
                    </div>
                    <button class="close-solution" id="closeSolutionBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="keyboard-shortcuts">
                <h4><i class="fas fa-keyboard"></i> Keyboard Shortcuts</h4>
                <div class="shortcuts-grid">
                    <div class="shortcut">
                        <kbd>Any Key</kbd>
                        <span>Type letter over code</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Backspace</kbd>
                        <span>Remove last letter</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Tab</kbd>
                        <span>Insert 4 spaces</span>
                    </div>
                    <div class="shortcut">
                        <kbd>ESC</kbd>
                        <span>Reset current bug</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + H</kbd>
                        <span>Show hint</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + S</kbd>
                        <span>Show solution</span>
                    </div>
                </div>
            </div>
            
            <div class="leaderboard-panel">
                <h3><i class="fas fa-medal"></i> Top Bug Fixers</h3>
                <div class="leaderboard-content">
                    <table class="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Fixer</th>
                                <th>Score</th>
                                <th>Bugs Fixed</th>
                                <th>Accuracy</th>
                                <th>Avg Time</th>
                            </tr>
                        </thead>
                        <tbody id="leaderboardBody">
                            <!-- Leaderboard rows will be inserted here -->
                        </tbody>
                    </table>
                </div>
                <div class="personal-stats">
                    <h4>Your Bug Fixing Stats</h4>
                    <div class="personal-stats-grid">
                        <div class="personal-stat">
                            <span>Total Bugs Fixed</span>
                            <span id="totalBugsFixed">0</span>
                        </div>
                        <div class="personal-stat">
                            <span>Best Time</span>
                            <span id="bestTime">0.0s</span>
                        </div>
                        <div class="personal-stat">
                            <span>Highest Accuracy</span>
                            <span id="highestAccuracy">0%</span>
                        </div>
                        <div class="personal-stat">
                            <span>Current Rank</span>
                            <span id="currentRank">-</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="achievements-panel">
                <h4><i class="fas fa-trophy"></i> Bug Fixing Achievements</h4>
                <div class="achievements-grid" id="achievementsGrid">
                    <!-- Achievements will be inserted here -->
                </div>
            </div>
        `;
        
        // Initialize the bug fixing game
        setTimeout(() => this.initBugFixingGame(), 100);
    },
    
    initBugFixingGame: function() {
        // Game state
        this.gameState = {
            currentBug: null,
            typedChars: [],
            startTime: null,
            endTime: null,
            isComplete: false,
            currentCharIndex: 0,
            totalErrors: 0,
            totalKeystrokes: 0,
            currentBugType: 'syntax',
            score: 0,
            bugsFixed: 0,
            bugStreak: 0,
            totalBugsFixed: 0,
            bestTime: null,
            highestAccuracy: 0,
            achievements: [],
            timer: 60, // 60 seconds per bug
            timerInterval: null,
            lastKeyPressTime: null,
            averageKeyPressDelay: 0
        };
        
        // Bug challenges database
        this.bugChallenges = {
            syntax: [
                {
                    buggyCode: `function addNumbers(a, b) {
    return a + b
    
console.log(addNumbers(5, 10));`,
                    fixedCode: `function addNumbers(a, b) {
    return a + b;
}

console.log(addNumbers(5, 10));`,
                    description: "Fix the missing semicolon in the function. JavaScript requires semicolons to end statements.",
                    hint: "Look for missing semicolons at the end of statements.",
                    explanation: "The return statement was missing a semicolon. In JavaScript, statements should end with semicolons.",
                    difficulty: "easy",
                    points: 50
                },
                {
                    buggyCode: `let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(x => {x * 2});
console.log(doubled);`,
                    fixedCode: `let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(x => x * 2);
console.log(doubled);`,
                    description: "Fix the arrow function syntax. The curly braces require an explicit return statement.",
                    hint: "Arrow functions with curly braces need a return statement.",
                    explanation: "When using curly braces with arrow functions, you need an explicit return statement. Either remove the braces or add 'return'.",
                    difficulty: "easy",
                    points: 50
                },
                {
                    buggyCode: `const person = {
    name: "John"
    age: 30,
    city: "New York"
};`,
                    fixedCode: `const person = {
    name: "John",
    age: 30,
    city: "New York"
};`,
                    description: "Fix the object syntax. Objects require commas between properties.",
                    hint: "Check for missing commas between object properties.",
                    explanation: "The object was missing a comma between the 'name' and 'age' properties. Objects need commas between key-value pairs.",
                    difficulty: "easy",
                    points: 50
                }
            ],
            logic: [
                {
                    buggyCode: `function isEven(num) {
    if (num % 2 = 0) {
        return true;
    }
    return false;
}`,
                    fixedCode: `function isEven(num) {
    if (num % 2 === 0) {
        return true;
    }
    return false;
}`,
                    description: "Fix the comparison operator. The assignment operator is being used instead of equality.",
                    hint: "Check the operator in the if condition - it should be comparison, not assignment.",
                    explanation: "The single equals (=) is an assignment operator. For comparison, use double equals (==) or triple equals (===) for strict equality.",
                    difficulty: "medium",
                    points: 75
                },
                {
                    buggyCode: `function findMax(arr) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
                    fixedCode: `function findMax(arr) {
    if (arr.length === 0) return null;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
                    description: "Fix the logic error in finding maximum value. The function doesn't handle negative numbers or empty arrays.",
                    hint: "The initial max value should be the first element of the array, not 0.",
                    explanation: "The bug assumes all numbers are positive. Starting max at 0 fails with negative numbers. Also, empty arrays should be handled.",
                    difficulty: "medium",
                    points: 75
                }
            ],
            runtime: [
                {
                    buggyCode: `function getElementById(id) {
    return document.getElementById(id);
}

let element = getElementById('myElement');
element.addEventListener('click', () => {
    console.log('Clicked!');
});`,
                    fixedCode: `function getElementById(id) {
    return document.getElementById(id);
}

let element = getElementById('myElement');
if (element) {
    element.addEventListener('click', () => {
        console.log('Clicked!');
    });
}`,
                    description: "Fix the runtime error that occurs when the element doesn't exist.",
                    hint: "The code assumes the element always exists. Add a null check.",
                    explanation: "If the element with id 'myElement' doesn't exist, getElementById returns null, causing an error when trying to addEventListener.",
                    difficulty: "medium",
                    points: 75
                }
            ],
            performance: [
                {
                    buggyCode: `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
                    fixedCode: `function fibonacci(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}`,
                    description: "Fix the performance issue in the Fibonacci function. It has exponential time complexity.",
                    hint: "The recursive function recalculates the same values multiple times. Use memoization.",
                    explanation: "The original implementation has O(2^n) time complexity due to repeated calculations. Memoization reduces it to O(n).",
                    difficulty: "hard",
                    points: 100
                }
            ]
        };
        
        // Achievements database
        this.achievements = {
            first_bug: { name: "First Bug", icon: "fa-bug", color: "#4CAF50", description: "Fix your first bug" },
            syntax_master: { name: "Syntax Master", icon: "fa-code", color: "#2196F3", description: "Fix 10 syntax errors" },
            logic_genius: { name: "Logic Genius", icon: "fa-brain", color: "#9C27B0", description: "Fix 10 logic errors" },
            speed_demon: { name: "Speed Demon", icon: "fa-bolt", color: "#FFD700", description: "Fix a bug in under 10 seconds" },
            perfectionist: { name: "Perfectionist", icon: "fa-star", color: "#FF5722", description: "Fix a bug with 100% accuracy" },
            streak_master: { name: "Streak Master", icon: "fa-fire", color: "#FF9800", description: "Fix 5 bugs in a row" },
            expert_fixer: { name: "Expert Fixer", icon: "fa-trophy", color: "#00BCD4", description: "Fix 50 total bugs" }
        };
        
        // Initialize UI elements
        this.typingTarget = document.getElementById('typingTarget');
        this.codeContainer = document.getElementById('codeContainer');
        this.previewContainer = document.getElementById('previewContainer');
        this.typingSpeed = document.querySelector('.typing-speed');
        this.typingAccuracy = document.querySelector('.typing-accuracy');
        this.typingTime = document.querySelector('.typing-time');
        this.typingScore = document.querySelector('.typing-score');
        this.bugsCounter = document.querySelector('.bugs-counter');
        this.completionScreen = document.getElementById('completionScreen');
        this.solutionPanel = document.getElementById('solutionPanel');
        this.timerText = document.getElementById('timerText');
        this.timerProgress = document.getElementById('timerProgress');
        this.bugsFixed = document.getElementById('bugsFixed');
        this.bugStreak = document.getElementById('bugStreak');
        this.leaderboardBody = document.getElementById('leaderboardBody');
        this.achievementsGrid = document.getElementById('achievementsGrid');
        
        // Load saved game state
        this.loadGameState();
        
        // Set initial bug challenge
        this.loadNewBug();
        
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
            // Ctrl + N for new bug
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.loadNewBug();
            }
            // ESC to reset current bug
            if (e.key === 'Escape') {
                e.preventDefault();
                this.resetCurrentBug();
            }
            // Ctrl + H for hint
            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault();
                this.showHint();
            }
            // Ctrl + S for solution
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.showSolution();
            }
        });
        
        // Bug type buttons
        document.querySelectorAll('.bug-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeBugType(e.target.dataset.type));
        });
        
        // Action buttons
        document.getElementById('nextBugBtn').addEventListener('click', () => this.nextBug());
        document.getElementById('reviewBugBtn').addEventListener('click', () => this.reviewBug());
        document.getElementById('showSolutionBtn').addEventListener('click', () => this.showSolution());
        document.getElementById('closeSolutionBtn').addEventListener('click', () => this.hideSolution());
        
        // Initialize screens as hidden
        this.completionScreen.style.display = 'none';
        this.solutionPanel.style.display = 'none';
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
            this.startBugTimer();
        }
        
        // Record key press time for efficiency calculation
        const now = new Date();
        if (this.gameState.lastKeyPressTime) {
            const delay = now - this.gameState.lastKeyPressTime;
            this.gameState.averageKeyPressDelay = (this.gameState.averageKeyPressDelay * 0.7) + (delay * 0.3);
        }
        this.gameState.lastKeyPressTime = now;
        
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
        const code = this.gameState.currentBug.fixedCode;
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
            this.completeBugFix();
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
        if (this.gameState.isComplete || this.gameState.currentCharIndex >= this.gameState.currentBug.fixedCode.length) {
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
    
    loadNewBug: function() {
        // Reset game state
        this.resetGameState();
        
        // Get random bug for current type
        const bugs = this.bugChallenges[this.gameState.currentBugType];
        if (!bugs || bugs.length === 0) return;
        
        const randomBug = bugs[Math.floor(Math.random() * bugs.length)];
        this.gameState.currentBug = randomBug;
        
        // Update UI with bug info
        document.querySelector('.bug-type').textContent = this.capitalizeFirst(this.gameState.currentBugType) + ' Error';
        document.getElementById('bugDescription').textContent = randomBug.description;
        document.getElementById('hintText').textContent = randomBug.hint;
        document.getElementById('difficultyLevel').textContent = this.capitalizeFirst(randomBug.difficulty);
        document.getElementById('bugPoints').textContent = randomBug.points;
        
        // Update solution panel
        document.getElementById('solutionBuggyCode').textContent = randomBug.buggyCode;
        document.getElementById('solutionFixedCode').textContent = randomBug.fixedCode;
        document.getElementById('solutionExplanation').textContent = randomBug.explanation;
        
        // Render buggy code
        this.renderCode(randomBug.buggyCode);
        
        // Render correct code preview
        this.renderPreview(randomBug.fixedCode);
        
        // Clear any existing overlays
        document.querySelectorAll('.typed-overlay-char').forEach(el => el.remove());
        
        // Update stats
        this.updateStats();
        
        // Focus on typing target
        this.typingTarget.focus();
        
        // Position cursor at start
        this.positionCursor();
        
        // Update UI
        this.updateProgressUI();
    },
    
    renderCode: function(code) {
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
                    
                    // Add syntax highlighting
                    const keywordMatch = line.substr(i).match(/^(function|if|else|for|while|return|let|const|var|console|log)/);
                    if (keywordMatch) {
                        charSpan.classList.add('keyword');
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
    
    renderPreview: function(code) {
        this.previewContainer.innerHTML = '';
        const pre = document.createElement('pre');
        pre.className = 'correct-code';
        pre.textContent = code;
        this.previewContainer.appendChild(pre);
    },
    
    resetGameState: function() {
        this.gameState.typedChars = [];
        this.gameState.currentCharIndex = 0;
        this.gameState.totalErrors = 0;
        this.gameState.totalKeystrokes = 0;
        this.gameState.isComplete = false;
        this.gameState.startTime = null;
        this.gameState.lastKeyPressTime = null;
        this.gameState.averageKeyPressDelay = 0;
        this.gameState.score = 0;
        this.gameState.timer = 60;
        
        // Stop any existing timer
        if (this.gameState.timerInterval) {
            clearInterval(this.gameState.timerInterval);
            this.gameState.timerInterval = null;
        }
    },
    
    resetCurrentBug: function() {
        this.resetGameState();
        document.querySelectorAll('.typed-overlay-char').forEach(el => el.remove());
        this.updateStats();
        this.updateTimerDisplay();
        this.typingTarget.focus();
        this.positionCursor();
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
        
        // Calculate score based on speed, accuracy, and time remaining
        const timeBonus = Math.max(0, this.gameState.timer) * 2;
        const accuracyBonus = accuracy * 0.5;
        const speedBonus = speed * 0.3;
        
        this.gameState.score = Math.round(
            this.gameState.currentBug.points + 
            timeBonus + 
            accuracyBonus + 
            speedBonus -
            (this.gameState.totalErrors * 2)
        );
        
        this.typingScore.textContent = Math.max(0, this.gameState.score);
        this.bugsCounter.textContent = this.gameState.bugsFixed;
    },
    
    startTimer: function() {
        if (this.mainTimerInterval) {
            clearInterval(this.mainTimerInterval);
        }
        
        this.mainTimerInterval = setInterval(() => {
            if (!this.gameState.isComplete && this.gameState.startTime) {
                this.updateStats();
            }
        }, 100);
    },
    
    startBugTimer: function() {
        // Clear any existing timer
        if (this.gameState.timerInterval) {
            clearInterval(this.gameState.timerInterval);
        }
        
        // Start countdown timer
        this.gameState.timerInterval = setInterval(() => {
            if (this.gameState.timer > 0 && !this.gameState.isComplete) {
                this.gameState.timer--;
                this.updateTimerDisplay();
            } else if (this.gameState.timer <= 0 && !this.gameState.isComplete) {
                // Time's up!
                this.timeUp();
            }
        }, 1000);
    },
    
    updateTimerDisplay: function() {
        this.timerText.textContent = `${this.gameState.timer}s`;
        
        // Update circular progress
        const circumference = 2 * Math.PI * 25;
        const offset = circumference - (this.gameState.timer / 60) * circumference;
        this.timerProgress.style.strokeDasharray = `${circumference} ${circumference}`;
        this.timerProgress.style.strokeDashoffset = offset;
        
        // Change color based on time
        if (this.gameState.timer < 10) {
            this.timerProgress.style.stroke = '#ff4d4d';
        } else if (this.gameState.timer < 30) {
            this.timerProgress.style.stroke = '#ffcc00';
        } else {
            this.timerProgress.style.stroke = '#4dff88';
        }
    },
    
    timeUp: function() {
        if (!this.gameState.isComplete) {
            // Stop timer
            clearInterval(this.gameState.timerInterval);
            
            // Show time up message
            alert("Time's up! The bug wasn't fixed in time. Try again!");
            this.resetCurrentBug();
        }
    },
    
    completeBugFix: function() {
        this.gameState.endTime = new Date();
        this.gameState.isComplete = true;
        
        // Stop timers
        clearInterval(this.mainTimerInterval);
        clearInterval(this.gameState.timerInterval);
        
        // Remove cursor
        const cursor = document.querySelector('.typing-cursor');
        if (cursor) cursor.remove();
        
        // Calculate final stats
        const timeTaken = (this.gameState.endTime - this.gameState.startTime) / 1000;
        const words = this.gameState.currentBug.fixedCode.length / 5;
        const minutes = timeTaken / 60;
        const finalSpeed = Math.round(words / minutes);
        const finalAccuracy = Math.round(((this.gameState.totalKeystrokes - this.gameState.totalErrors) / this.gameState.totalKeystrokes) * 100);
        
        // Update game stats
        this.gameState.bugsFixed++;
        this.gameState.totalBugsFixed++;
        this.gameState.bugStreak++;
        
        // Update best time
        if (!this.gameState.bestTime || timeTaken < this.gameState.bestTime) {
            this.gameState.bestTime = timeTaken;
        }
        
        // Update highest accuracy
        if (finalAccuracy > this.gameState.highestAccuracy) {
            this.gameState.highestAccuracy = finalAccuracy;
        }
        
        // Check for achievements
        this.checkAchievements(timeTaken, finalAccuracy);
        
        // Update completion screen
        document.getElementById('completedBugType').textContent = this.capitalizeFirst(this.gameState.currentBugType) + ' Error';
        document.getElementById('completionTime').textContent = `${timeTaken.toFixed(2)}s`;
        document.getElementById('completionAccuracy').textContent = `${finalAccuracy}%`;
        document.getElementById('pointsEarned').textContent = `+${this.gameState.score}`;
        document.getElementById('totalScore').textContent = this.gameState.score;
        
        // Set completion message based on performance
        let message = '';
        if (timeTaken < 10 && finalAccuracy === 100) {
            message = 'Perfect fix! Lightning fast with perfect accuracy!';
        } else if (finalAccuracy === 100) {
            message = 'Excellent! Perfect accuracy on this bug fix!';
        } else if (timeTaken < 15) {
            message = 'Great speed! The bug was fixed quickly!';
        } else {
            message = 'Good job! The bug has been successfully fixed.';
        }
        document.getElementById('completionMessage').textContent = message;
        
        // Update UI
        this.updateProgressUI();
        this.updatePersonalStats();
        this.updateLeaderboard();
        this.updateAchievementsDisplay();
        
        // Show completion screen
        this.completionScreen.style.display = 'block';
        setTimeout(() => {
            this.completionScreen.style.opacity = '1';
            this.completionScreen.style.transform = 'translateY(0)';
        }, 10);
        
        // Save game state
        this.saveGameState();
    },
    
    updateProgressUI: function() {
        this.bugsFixed.textContent = this.gameState.bugsFixed;
        this.bugStreak.textContent = this.gameState.bugStreak;
    },
    
    updatePersonalStats: function() {
        document.getElementById('totalBugsFixed').textContent = this.gameState.totalBugsFixed;
        document.getElementById('bestTime').textContent = this.gameState.bestTime ? `${this.gameState.bestTime.toFixed(2)}s` : '0.0s';
        document.getElementById('highestAccuracy').textContent = `${this.gameState.highestAccuracy}%`;
        document.getElementById('currentRank').textContent = this.getCurrentRank();
    },
    
    getCurrentRank: function() {
        const score = this.gameState.score * this.gameState.totalBugsFixed;
        if (score >= 10000) return 'Expert';
        if (score >= 5000) return 'Advanced';
        if (score >= 1000) return 'Intermediate';
        return 'Beginner';
    },
    
    checkAchievements: function(timeTaken, accuracy) {
        const newAchievements = [];
        
        // First bug achievement
        if (this.gameState.totalBugsFixed === 1 && !this.gameState.achievements.includes('first_bug')) {
            newAchievements.push('first_bug');
            this.gameState.achievements.push('first_bug');
        }
        
        // Speed achievement
        if (timeTaken < 10 && !this.gameState.achievements.includes('speed_demon')) {
            newAchievements.push('speed_demon');
            this.gameState.achievements.push('speed_demon');
        }
        
        // Accuracy achievement
        if (accuracy === 100 && !this.gameState.achievements.includes('perfectionist')) {
            newAchievements.push('perfectionist');
            this.gameState.achievements.push('perfectionist');
        }
        
        // Streak achievement
        if (this.gameState.bugStreak >= 5 && !this.gameState.achievements.includes('streak_master')) {
            newAchievements.push('streak_master');
            this.gameState.achievements.push('streak_master');
        }
        
        // Show achievement notification if any earned
        if (newAchievements.length > 0) {
            this.showAchievementNotification(newAchievements);
        }
    },
    
    showAchievementNotification: function(achievementKeys) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        
        const achievementNames = achievementKeys.map(key => this.achievements[key].name).join(', ');
        notification.innerHTML = `
            <div class="achievement-notification-content">
                <i class="fas fa-trophy"></i>
                <div>
                    <h4>Achievement Unlocked!</h4>
                    <p>${achievementNames}</p>
                </div>
            </div>
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
    
    updateAchievementsDisplay: function() {
        this.achievementsGrid.innerHTML = '';
        
        Object.entries(this.achievements).forEach(([key, achievement]) => {
            const hasAchievement = this.gameState.achievements.includes(key);
            const achievementEl = document.createElement('div');
            achievementEl.className = `achievement-item ${hasAchievement ? 'unlocked' : 'locked'}`;
            
            achievementEl.innerHTML = `
                <div class="achievement-icon">
                    <i class="fas ${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <h5>${achievement.name}</h5>
                    <p>${achievement.description}</p>
                </div>
                <div class="achievement-status">
                    ${hasAchievement ? '<i class="fas fa-check"></i>' : '<i class="fas fa-lock"></i>'}
                </div>
            `;
            
            if (!hasAchievement) {
                achievementEl.style.opacity = '0.6';
            }
            
            this.achievementsGrid.appendChild(achievementEl);
        });
    },
    
    nextBug: function() {
        // Hide completion screen
        this.completionScreen.style.opacity = '0';
        this.completionScreen.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.loadNewBug();
        }, 300);
    },
    
    reviewBug: function() {
        // Reset and restart current bug
        this.completionScreen.style.opacity = '0';
        this.completionScreen.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.loadNewBug();
        }, 300);
    },
    
    changeBugType: function(type) {
        // Update active button
        document.querySelectorAll('.bug-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update game state
        this.gameState.currentBugType = type;
        
        // Load new bug with new type
        this.loadNewBug();
    },
    
    showHint: function() {
        // Highlight the bug hint
        const hintElement = document.getElementById('bugHint');
        hintElement.style.animation = 'pulse 1s 3';
        setTimeout(() => {
            hintElement.style.animation = '';
        }, 3000);
    },
    
    showSolution: function() {
        this.solutionPanel.style.display = 'block';
        setTimeout(() => {
            this.solutionPanel.style.opacity = '1';
            this.solutionPanel.style.transform = 'translateY(0)';
        }, 10);
    },
    
    hideSolution: function() {
        this.solutionPanel.style.opacity = '0';
        this.solutionPanel.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            this.solutionPanel.style.display = 'none';
        }, 300);
    },
    
    updateLeaderboard: function() {
        // Sample leaderboard data
        const leaderboardData = [
            { rank: 1, name: 'BugHunter42', score: 12500, bugsFixed: 47, accuracy: '98%', avgTime: '12.5s' },
            { rank: 2, name: 'CodeDoctor', score: 9800, bugsFixed: 35, accuracy: '95%', avgTime: '15.2s' },
            { rank: 3, name: 'DebugMaster', score: 8500, bugsFixed: 30, accuracy: '96%', avgTime: '14.8s' },
            { rank: 4, name: 'FixItFast', score: 7200, bugsFixed: 28, accuracy: '92%', avgTime: '11.3s' },
            { rank: 5, name: 'SyntaxSavior', score: 6500, bugsFixed: 25, accuracy: '99%', avgTime: '18.5s' }
        ];
        
        // Add current player at appropriate rank
        const avgTime = this.gameState.bestTime ? this.gameState.bestTime.toFixed(1) + 's' : '0.0s';
        const currentPlayer = {
            rank: 6,
            name: 'You',
            score: this.gameState.score * this.gameState.totalBugsFixed,
            bugsFixed: this.gameState.totalBugsFixed,
            accuracy: `${this.gameState.highestAccuracy}%`,
            avgTime: avgTime
        };
        
        // Sort all players by score
        const allPlayers = [...leaderboardData, currentPlayer].sort((a, b) => b.score - a.score);
        
        // Update ranks
        allPlayers.forEach((player, index) => {
            player.rank = index + 1;
        });
        
        // Render leaderboard
        let html = '';
        allPlayers.forEach(player => {
            const isCurrentPlayer = player.name === 'You';
            html += `
                <tr class="${isCurrentPlayer ? 'current-player' : ''}">
                    <td>${player.rank}</td>
                    <td>${player.name}</td>
                    <td>${player.score.toLocaleString()}</td>
                    <td>${player.bugsFixed}</td>
                    <td>${player.accuracy}</td>
                    <td>${player.avgTime}</td>
                </tr>
            `;
        });
        
        this.leaderboardBody.innerHTML = html;
    },
    
    saveGameState: function() {
        try {
            localStorage.setItem('codeTypeChallenge', JSON.stringify(this.gameState));
        } catch (e) {
            console.log('Could not save game state:', e);
        }
    },
    
    loadGameState: function() {
        try {
            const saved = localStorage.getItem('codeTypeChallenge');
            if (saved) {
                const savedState = JSON.parse(saved);
                // Merge saved state with defaults
                Object.assign(this.gameState, savedState);
                
                // Update UI with loaded state
                this.updateProgressUI();
                this.updatePersonalStats();
                this.updateAchievementsDisplay();
                this.updateLeaderboard();
            }
        } catch (e) {
            console.log('Could not load game state:', e);
        }
    },
    
    capitalizeFirst: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    
    startGame: function() {
        // Focus on typing target
        this.typingTarget.focus();
        
        // Add CSS for the bug fixing interface
        const style = document.createElement('style');
        style.textContent = `
            .typing-target {
                position: relative;
                background: rgba(10, 15, 35, 0.95);
                border-radius: 10px;
                padding: 25px;
                margin-bottom: 20px;
                border: 2px solid rgba(255, 77, 77, 0.3);
                min-height: 250px;
                max-height: 350px;
                overflow-y: auto;
                overflow-x: auto;
                box-shadow: inset 0 0 15px rgba(255, 77, 77, 0.1);
                cursor: text;
                outline: none;
            }
            
            .typing-target:focus {
                border-color: #ff4d4d;
                box-shadow: 0 0 15px rgba(255, 77, 77, 0.3);
            }
            
            .code-container {
                position: relative;
                font-family: 'Courier New', monospace;
                font-size: 1.2rem;
                line-height: 1.6;
                color: rgba(255, 77, 77, 0.8);
                white-space: pre-wrap;
                user-select: none;
            }
            
            .code-line {
                position: relative;
                min-height: 1.6em;
            }
            
            .char-element {
                position: relative;
                display: inline-block;
                min-width: 8px;
            }
            
            .char-element.keyword {
                color: rgba(255, 121, 198, 0.8);
            }
            
            .char-element.space-char {
                background-color: rgba(255, 77, 77, 0.05);
                border-radius: 2px;
            }
            
            .char-element.tab-char {
                background-color: rgba(255, 77, 77, 0.1);
                border-radius: 2px;
            }
            
            .typed-overlay-char {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Courier New', monospace;
                font-size: 1.2rem;
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
            
            .bug-description {
                background: rgba(30, 30, 70, 0.7);
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 15px;
                border-left: 4px solid #ff4d4d;
            }
            
            .bug-description h4 {
                color: #ff4d4d;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .bug-description p {
                color: #e0e0ff;
                line-height: 1.5;
            }
            
            .bug-hint {
                background: rgba(255, 193, 7, 0.1);
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 20px;
                border-left: 4px solid #ffc107;
            }
            
            .bug-hint p {
                color: #ffc107;
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 0;
                font-size: 0.9rem;
            }
            
            .correct-code-preview {
                background: rgba(15, 22, 46, 0.8);
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 20px;
                border: 1px solid rgba(77, 255, 136, 0.3);
            }
            
            .correct-code-preview h4 {
                color: #4dff88;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .preview-container {
                background: rgba(10, 15, 35, 0.9);
                padding: 15px;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                color: #4dff88;
                overflow-x: auto;
            }
            
            .challenge-progress {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(15, 22, 46, 0.8);
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
                border: 1px solid rgba(64, 224, 208, 0.2);
            }
            
            .bug-counter {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .bug-counter span {
                color: #b0b0ff;
                font-size: 1.1rem;
            }
            
            .bug-counter span span {
                color: #00f2fe;
                font-weight: bold;
            }
            
            .streak-counter {
                display: flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #ff7e5f, #feb47b);
                padding: 8px 15px;
                border-radius: 20px;
                color: white;
                font-weight: bold;
            }
            
            .timer-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            
            .timer-circle {
                position: relative;
                width: 60px;
                height: 60px;
            }
            
            .timer-bg {
                fill: none;
                stroke: rgba(30, 30, 70, 0.7);
                stroke-width: 5;
            }
            
            .timer-progress {
                fill: none;
                stroke: #4dff88;
                stroke-width: 5;
                stroke-linecap: round;
                transform: rotate(-90deg);
                transform-origin: 50% 50%;
                transition: stroke-dashoffset 1s linear, stroke 0.5s;
            }
            
            .timer-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #00f2fe;
                font-weight: bold;
                font-size: 1.2rem;
            }
            
            .timer-label {
                color: #b0b0ff;
                font-size: 0.9rem;
            }
            
            .completion-screen {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transform: translateY(-20px);
                transition: opacity 0.5s, transform 0.5s;
            }
            
            .completion-content {
                background: linear-gradient(135deg, #0f0c29, #302b63);
                padding: 40px;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                border: 2px solid #4dff88;
                box-shadow: 0 0 30px rgba(77, 255, 136, 0.3);
                text-align: center;
            }
            
            .completion-icon {
                font-size: 4rem;
                color: #4dff88;
                margin-bottom: 20px;
            }
            
            .completion-content h3 {
                margin-bottom: 30px;
                color: #00f2fe;
                font-size: 2rem;
            }
            
            .completion-stats {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin-bottom: 25px;
            }
            
            .completion-stat {
                background: rgba(30, 30, 70, 0.7);
                padding: 15px;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
            }
            
            .completion-stat span:first-child {
                color: #b0b0ff;
            }
            
            .completion-stat span:last-child {
                color: #00f2fe;
                font-weight: bold;
            }
            
            .completion-message {
                background: rgba(30, 30, 70, 0.7);
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 25px;
                color: #4dff88;
                font-style: italic;
            }
            
            .completion-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .solution-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) translateY(-20px);
                background: linear-gradient(135deg, #0f0c29, #302b63);
                padding: 30px;
                border-radius: 15px;
                max-width: 800px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                z-index: 1001;
                border: 2px solid #00f2fe;
                opacity: 0;
                transition: opacity 0.5s, transform 0.5s;
            }
            
            .solution-panel h4 {
                color: #00f2fe;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .solution-content {
                display: grid;
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .solution-section {
                background: rgba(30, 30, 70, 0.7);
                padding: 20px;
                border-radius: 10px;
            }
            
            .solution-section h5 {
                color: #4facfe;
                margin-bottom: 10px;
            }
            
            .buggy-code {
                color: #ff4d4d;
                background: rgba(10, 15, 35, 0.9);
                padding: 15px;
                border-radius: 8px;
                overflow-x: auto;
                font-family: 'Courier New', monospace;
            }
            
            .fixed-code {
                color: #4dff88;
                background: rgba(10, 15, 35, 0.9);
                padding: 15px;
                border-radius: 8px;
                overflow-x: auto;
                font-family: 'Courier New', monospace;
            }
            
            .solution-section p {
                color: #e0e0ff;
                line-height: 1.5;
            }
            
            .close-solution {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: #00f2fe;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 5px;
            }
            
            .achievements-panel {
                margin-top: 30px;
                background: rgba(15, 22, 46, 0.8);
                border-radius: 15px;
                padding: 25px;
                border: 1px solid rgba(64, 224, 208, 0.2);
            }
            
            .achievements-panel h4 {
                color: #00f2fe;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .achievements-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 15px;
            }
            
            .achievement-item {
                background: rgba(30, 30, 70, 0.7);
                padding: 15px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: transform 0.3s;
            }
            
            .achievement-item.unlocked {
                border-left: 4px solid #4dff88;
            }
            
            .achievement-item.locked {
                border-left: 4px solid #6272a4;
            }
            
            .achievement-item:hover {
                transform: translateY(-3px);
            }
            
            .achievement-icon {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: rgba(64, 224, 208, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
            }
            
            .achievement-item.unlocked .achievement-icon {
                color: #00f2fe;
            }
            
            .achievement-item.locked .achievement-icon {
                color: #6272a4;
            }
            
            .achievement-info {
                flex: 1;
            }
            
            .achievement-info h5 {
                color: #e0e0ff;
                margin-bottom: 5px;
            }
            
            .achievement-info p {
                color: #b0b0ff;
                font-size: 0.9rem;
            }
            
            .achievement-status {
                font-size: 1.2rem;
            }
            
            .achievement-item.unlocked .achievement-status {
                color: #4dff88;
            }
            
            .achievement-item.locked .achievement-status {
                color: #6272a4;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            @media (max-width: 768px) {
                .challenge-progress {
                    flex-direction: column;
                    gap: 20px;
                }
                
                .typing-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .completion-stats {
                    grid-template-columns: 1fr;
                }
                
                .completion-actions {
                    flex-direction: column;
                }
                
                .achievements-grid {
                    grid-template-columns: 1fr;
                }
                
                .typing-target {
                    font-size: 1.1rem;
                    padding: 15px;
                }
                
                .code-container {
                    font-size: 1.1rem;
                }
                
                .typed-overlay-char {
                    font-size: 1.1rem;
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
                
                .bug-type-selector {
                    flex-direction: column;
                    gap: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }
};