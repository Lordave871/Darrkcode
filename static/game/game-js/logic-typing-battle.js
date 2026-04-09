window.QuickMath = {
    init: function(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3><i class="fas fa-calculator"></i> Logic & Typing Battle</h3>
                <p>Solve the math problem AND type the answer as code!</p>
                <div class="difficulty-selector">
                    <button class="math-difficulty-btn active" data-level="easy">Easy</button>
                    <button class="math-difficulty-btn" data-level="medium">Medium</button>
                    <button class="math-difficulty-btn" data-level="hard">Hard</button>
                    <button class="math-difficulty-btn" data-level="expert">Expert</button>
                </div>
            </div>
            
            <div class="math-game-container">
                <div class="math-header">
                    <h3><i class="fas fa-brain"></i> Math Challenge <span class="math-level-indicator">Easy</span></h3>
                    <div class="math-actions">
                        <button class="action-btn" id="newMathProblemBtn">
                            <i class="fas fa-redo"></i> New Problem
                        </button>
                        <button class="action-btn" id="mathHintBtn">
                            <i class="fas fa-lightbulb"></i> Hint
                        </button>
                        <!-- Skip button removed since spacebar skip is removed -->
                    </div>
                </div>
                
                <div class="math-problem-section">
                    <div class="math-problem-display">
                        <h2 id="mathProblemText">5 + 3 = ?</h2>
                        <div class="math-problem-hint">
                            <p><i class="fas fa-info-circle"></i> Solve the math problem first, then type the answer below</p>
                        </div>
                    </div>
                    
                    <div class="math-answer-section">
                        <div class="answer-input-wrapper">
                            <input type="number" class="math-input" id="mathNumberInput" placeholder="Enter numeric answer...">
                            <button class="action-btn small" id="checkMathBtn">
                                <i class="fas fa-check"></i> Check Answer
                            </button>
                        </div>
                        
                        <div class="code-typing-section" id="codeTypingSection">
                            <div class="typing-instructions">
                                <p><i class="fas fa-keyboard"></i> Now type this code with the answer:</p>
                            </div>
                            <div class="code-typing-target" id="codeTypingTarget" tabindex="0">
                                <div class="code-container" id="mathCodeContainer">
                                    <!-- Code will be dynamically inserted here -->
                                </div>
                            </div>
                            <div class="typing-hint">
                                <p><i class="fas fa-code"></i> Type the code exactly as shown. Your answer should appear in the code.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar" id="mathProgressBar"></div>
                    <div class="progress-text">Problems Solved: <span id="mathProgressText">0/10</span></div>
                </div>
                
                <div class="math-stats-grid">
                    <div class="stat-box">
                        <div class="stat-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-label">Score</span>
                            <span class="stat-value" id="mathScore">0</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-label">Correct</span>
                            <span class="stat-value" id="mathCorrect">0</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-label">Time</span>
                            <span class="stat-value" id="mathTime">0s</span>
                        </div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon">
                            <i class="fas fa-tachometer-alt"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-label">Speed</span>
                            <span class="stat-value" id="mathSpeed">0/min</span>
                        </div>
                    </div>
                </div>
                
                <div class="typing-stats-section">
                    <h4><i class="fas fa-keyboard"></i> Typing Performance</h4>
                    <div class="typing-stats">
                        <div class="typing-stat">
                            <span>Typing Speed (WPM)</span>
                            <span class="typing-speed-value">0</span>
                        </div>
                        <div class="typing-stat">
                            <span>Typing Accuracy</span>
                            <span class="typing-accuracy-value">100%</span>
                        </div>
                        <div class="typing-stat">
                            <span>Code Errors</span>
                            <span class="typing-errors-value">0</span>
                        </div>
                    </div>
                </div>
                
                <div class="results-panel" id="mathResultsPanel">
                    <h3><i class="fas fa-trophy"></i> Level Complete!</h3>
                    <div class="result-stats">
                        <div class="result-stat">
                            <span>Total Score:</span>
                            <span id="finalMathScore">0</span>
                        </div>
                        <div class="result-stat">
                            <span>Problems Solved:</span>
                            <span id="finalProblemsSolved">0/10</span>
                        </div>
                        <div class="result-stat">
                            <span>Average Time:</span>
                            <span id="finalAverageTime">0s</span>
                        </div>
                        <div class="result-stat">
                            <span>Typing Accuracy:</span>
                            <span id="finalTypingAccuracy">100%</span>
                        </div>
                    </div>
                    <div class="result-actions">
                        <button class="action-btn primary" id="nextMathLevelBtn">
                            <i class="fas fa-forward"></i> Next Level
                        </button>
                        <button class="action-btn" id="restartMathBtn">
                            <i class="fas fa-redo"></i> Restart
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="keyboard-shortcuts">
                <h4><i class="fas fa-keyboard"></i> Game Shortcuts</h4>
                <div class="shortcuts-grid">
                    <div class="shortcut">
                        <kbd>Enter</kbd>
                        <span>Check math answer</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Tab</kbd>
                        <span>Switch to code typing</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + M</kbd>
                        <span>New math problem</span>
                    </div>
                    <!-- Removed Space shortcut -->
                </div>
            </div>
        `;
        
        // Initialize the math typing game
        setTimeout(() => this.initMathTypingGame(), 100);
    },
    
    initMathTypingGame: function() {
        // Game state for math typing
        this.mathGameState = {
            currentProblem: null,
            correctAnswer: null,
            codeToType: '',
            userAnswer: null,
            isMathCorrect: false,
            currentCharIndex: 0,
            typedChars: [],
            totalErrors: 0,
            totalKeystrokes: 0,
            startTime: null,
            isTypingComplete: false,
            currentDifficulty: 'easy',
            score: 0,
            problemsSolved: 0,
            totalProblems: 10,
            problemTimes: [],
            currentProblemStartTime: null,
            typingSpeed: 0,
            typingAccuracy: 100,
            streak: 0,
            bestStreak: 0,
            achievements: []
        };
        
        // Math problem generators by difficulty
        this.mathGenerators = {
            easy: {
                operations: ['+', '-'],
                minNum: 1,
                maxNum: 20,
                codeTemplates: [
                    "result = ${answer}",
                    "answer = ${answer}",
                    "x = ${answer}",
                    "print(${answer})",
                    "return ${answer}"
                ]
            },
            medium: {
                operations: ['+', '-', '*'],
                minNum: 10,
                maxNum: 50,
                codeTemplates: [
                    "def calculate():\n    return ${answer}",
                    "result = ${num1} ${operation} ${num2}\nprint(result)",
                    "answer = ${answer}\nprint(f'The answer is {answer}')",
                    "x = ${num1}\ny = ${num2}\nresult = x ${operation} y",
                    "class MathProblem:\n    def solve(self):\n        return ${answer}"
                ]
            },
            hard: {
                operations: ['+', '-', '*', '/'],
                minNum: 20,
                maxNum: 100,
                requireDecimal: true,
                codeTemplates: [
                    "def solve_equation(a, b):\n    return a ${operation} b\n\nresult = solve_equation(${num1}, ${num2})",
                    "import math\n\nresult = ${answer}\nprint(f'Result: {result}')",
                    "class Calculator:\n    def calculate(self, x, y):\n        return x ${operation} y\n\ncalc = Calculator()\nanswer = calc.calculate(${num1}, ${num2})",
                    "def process_numbers(numbers):\n    total = ${answer}\n    return total\n\nprint(process_numbers([${num1}, ${num2}]))",
                    "result = (${num1} ${operation} ${num2}) * 1.0\nprint(f'{result:.2f}')"
                ]
            },
            expert: {
                operations: ['*', '/', '%', '**'],
                minNum: 50,
                maxNum: 200,
                requireComplex: true,
                codeTemplates: [
                    "def complex_calculation(x, y):\n    # Solve: ${num1} ${operation} ${num2}\n    result = x ${operation} y\n    return round(result, 2)\n\nanswer = complex_calculation(${num1}, ${num2})",
                    "import numpy as np\n\n# Calculate result\nresult = np.${operation}(${num1}, ${num2})\nprint(f'Result: {result}')",
                    "class AdvancedMath:\n    def __init__(self):\n        self.answer = ${answer}\n    \n    def display(self):\n        return f'Solution: {self.answer}'\n\nmath = AdvancedMath()\nprint(math.display())",
                    "def recursive_solve(n):\n    if n <= 1:\n        return ${answer}\n    return n * recursive_solve(n-1)\n\nprint(recursive_solve(${num1}))",
                    "# Mathematical operation\noperation_result = ${num1} ${operation} ${num2}\nassert operation_result == ${answer}, 'Calculation error'"
                ]
            }
        };
        
        // Initialize UI elements
        this.mathProblemText = document.getElementById('mathProblemText');
        this.mathNumberInput = document.getElementById('mathNumberInput');
        this.mathCodeContainer = document.getElementById('mathCodeContainer');
        this.codeTypingTarget = document.getElementById('codeTypingTarget');
        this.codeTypingSection = document.getElementById('codeTypingSection');
        this.mathScore = document.getElementById('mathScore');
        this.mathCorrect = document.getElementById('mathCorrect');
        this.mathTime = document.getElementById('mathTime');
        this.mathSpeed = document.getElementById('mathSpeed');
        this.mathProgressBar = document.getElementById('mathProgressBar');
        this.mathProgressText = document.getElementById('mathProgressText');
        this.mathResultsPanel = document.getElementById('mathResultsPanel');
        
        // Typing stats elements
        this.typingSpeedValue = document.querySelector('.typing-speed-value');
        this.typingAccuracyValue = document.querySelector('.typing-accuracy-value');
        this.typingErrorsValue = document.querySelector('.typing-errors-value');
        
        // Set initial state
        this.codeTypingSection.style.display = 'none';
        this.generateNewMathProblem();
        
        // Event listeners
        this.setupMathEventListeners();
        
        // Start game
        this.startMathGame();
    },
    
    setupMathEventListeners: function() {
        // Math answer input
        this.mathNumberInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkMathAnswer();
            }
        });
        
        document.getElementById('checkMathBtn').addEventListener('click', () => {
            this.checkMathAnswer();
        });
        
        // Code typing
        this.codeTypingTarget.addEventListener('keydown', (e) => this.handleCodeKeyDown(e));
        this.codeTypingTarget.addEventListener('click', () => {
            this.codeTypingTarget.focus();
            this.positionCodeCursor();
        });
        
        // Global shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl + M for new problem
            if (e.ctrlKey && e.key === 'm') {
                e.preventDefault();
                this.generateNewMathProblem();
            }
            // Tab to switch focus
            if (e.key === 'Tab' && this.codeTypingSection.style.display === 'block') {
                e.preventDefault();
                if (e.shiftKey) {
                    this.mathNumberInput.focus();
                } else {
                    this.codeTypingTarget.focus();
                }
            }
        });
        
        // Difficulty buttons
        document.querySelectorAll('.math-difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeMathDifficulty(e.target.dataset.level));
        });
        
        // Action buttons
        document.getElementById('newMathProblemBtn').addEventListener('click', () => this.generateNewMathProblem());
        document.getElementById('mathHintBtn').addEventListener('click', () => this.showMathHint());
        document.getElementById('nextMathLevelBtn').addEventListener('click', () => this.nextMathLevel());
        document.getElementById('restartMathBtn').addEventListener('click', () => this.restartMathGame());
        
        // Initialize results panel as hidden
        this.mathResultsPanel.style.display = 'none';
    },
    
    generateNewMathProblem: function() {
        // Reset typing state
        this.mathGameState.currentCharIndex = 0;
        this.mathGameState.typedChars = [];
        this.mathGameState.isTypingComplete = false;
        this.mathGameState.userAnswer = null;
        this.mathGameState.isMathCorrect = false;
        
        // Clear previous code
        this.mathCodeContainer.innerHTML = '';
        document.querySelectorAll('.math-typed-overlay-char').forEach(el => el.remove());
        const cursor = document.querySelector('.math-typing-cursor');
        if (cursor) cursor.remove();
        
        // Hide code typing section initially
        this.codeTypingSection.style.display = 'none';
        this.mathNumberInput.value = '';
        this.mathNumberInput.disabled = false;
        this.mathNumberInput.focus();
        
        // Generate new problem based on difficulty
        const config = this.mathGenerators[this.mathGameState.currentDifficulty];
        const operation = config.operations[Math.floor(Math.random() * config.operations.length)];
        
        let num1, num2, answer;
        
        switch(operation) {
            case '+':
                num1 = this.getRandomInt(config.minNum, config.maxNum);
                num2 = this.getRandomInt(config.minNum, config.maxNum);
                answer = num1 + num2;
                break;
            case '-':
                num1 = this.getRandomInt(config.minNum, config.maxNum);
                num2 = this.getRandomInt(config.minNum, num1); // Ensure positive result
                answer = num1 - num2;
                break;
            case '*':
                num1 = this.getRandomInt(2, 15);
                num2 = this.getRandomInt(2, 15);
                answer = num1 * num2;
                break;
            case '/':
                num2 = this.getRandomInt(2, 12);
                answer = this.getRandomInt(2, 12);
                num1 = num2 * answer; // Ensure integer result
                break;
            case '%':
                num1 = this.getRandomInt(10, 100);
                num2 = this.getRandomInt(2, 10);
                answer = num1 % num2;
                break;
            case '**':
                num1 = this.getRandomInt(2, 5);
                num2 = this.getRandomInt(2, 3);
                answer = Math.pow(num1, num2);
                break;
        }
        
        // Format answer based on difficulty
        if (config.requireDecimal && operation === '/') {
            answer = (num1 / num2).toFixed(2);
        }
        
        // Store problem data
        this.mathGameState.currentProblem = { num1, num2, operation };
        this.mathGameState.correctAnswer = answer;
        this.mathGameState.currentProblemStartTime = new Date();
        
        // Display problem
        let problemText = `${num1} ${operation} ${num2} = ?`;
        
        // For division, show as fraction
        if (operation === '/') {
            problemText = `${num1} ÷ ${num2} = ?`;
        } else if (operation === '**') {
            problemText = `${num1}^${num2} = ?`;
        } else if (operation === '%') {
            problemText = `${num1} mod ${num2} = ?`;
        }
        
        this.mathProblemText.textContent = problemText;
        
        // Generate code to type
        this.generateCodeToType(num1, num2, operation, answer, config);
        
        // Update progress
        this.updateMathProgress();
    },
    
    generateCodeToType: function(num1, num2, operation, answer, config) {
        // Select random template
        const template = config.codeTemplates[Math.floor(Math.random() * config.codeTemplates.length)];
        
        // Replace placeholders
        let code = template
            .replace(/\${answer}/g, answer)
            .replace(/\${num1}/g, num1)
            .replace(/\${num2}/g, num2)
            .replace(/\${operation}/g, operation);
        
        this.mathGameState.codeToType = code;
        
        // Render code (but don't show yet)
        this.renderMathCode(code);
    },
    
    renderMathCode: function(code) {
        // Clear container
        this.mathCodeContainer.innerHTML = '';
        
        // Split code into lines
        const lines = code.split('\n');
        
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'math-code-line';
            
            // Process each character in the line
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                const charSpan = document.createElement('span');
                charSpan.className = 'math-char-element';
                charSpan.dataset.index = lineIndex * 1000 + i;
                
                // Handle special characters
                if (char === ' ') {
                    charSpan.innerHTML = '&nbsp;';
                    charSpan.classList.add('math-space-char');
                } else if (char === '\t') {
                    charSpan.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
                    charSpan.classList.add('math-tab-char');
                } else {
                    charSpan.textContent = char;
                    
                    // Add syntax highlighting
                    if (this.isMathCodeKeyword(line, i)) {
                        charSpan.classList.add('math-keyword');
                    } else if (this.isMathCodeNumber(line, i)) {
                        charSpan.classList.add('math-number');
                    } else if (this.isMathCodeOperator(char)) {
                        charSpan.classList.add('math-operator');
                    } else if (this.isMathCodeString(line, i)) {
                        charSpan.classList.add('math-string');
                    }
                }
                
                lineDiv.appendChild(charSpan);
            }
            
            // Add line break if not last line
            if (lineIndex < lines.length - 1) {
                const lineBreak = document.createElement('span');
                lineBreak.className = 'math-char-element math-line-break';
                lineBreak.innerHTML = '<br>';
                lineDiv.appendChild(lineBreak);
            }
            
            this.mathCodeContainer.appendChild(lineDiv);
        }
    },
    
    // Syntax highlighting helpers for math code
    isMathCodeKeyword: function(line, index) {
        const keywords = ['def', 'class', 'return', 'print', 'import', 'if', 'else', 'for', 'while', 'assert'];
        const substr = line.substr(index);
        for (const keyword of keywords) {
            if (substr.startsWith(keyword) && 
                (substr.length === keyword.length || !/\w/.test(substr[keyword.length]))) {
                return true;
            }
        }
        return false;
    },
    
    isMathCodeNumber: function(line, index) {
        const char = line[index];
        return /\d/.test(char) || (char === '.' && index > 0 && /\d/.test(line[index-1]));
    },
    
    isMathCodeOperator: function(char) {
        return '=+-*/%<>!&|^~@:.,;'.includes(char);
    },
    
    isMathCodeString: function(line, index) {
        const char = line[index];
        return char === '"' || char === "'" || char === 'f' || char === 'r';
    },
    
    checkMathAnswer: function() {
        const userAnswer = parseFloat(this.mathNumberInput.value);
        
        if (isNaN(userAnswer)) {
            this.showFeedback('Please enter a valid number!', 'error');
            return;
        }
        
        const correctAnswer = parseFloat(this.mathGameState.correctAnswer);
        const tolerance = 0.01; // For floating point comparisons
        
        const isCorrect = Math.abs(userAnswer - correctAnswer) < tolerance;
        
        this.mathGameState.userAnswer = userAnswer;
        this.mathGameState.isMathCorrect = isCorrect;
        
        // Record problem time
        if (this.mathGameState.currentProblemStartTime) {
            const timeTaken = (new Date() - this.mathGameState.currentProblemStartTime) / 1000;
            this.mathGameState.problemTimes.push(timeTaken);
        }
        
        if (isCorrect) {
            this.showFeedback('✓ Correct! Now type the code below', 'success');
            this.mathGameState.streak++;
            this.mathGameState.bestStreak = Math.max(this.mathGameState.bestStreak, this.mathGameState.streak);
            
            // Show code typing section
            this.codeTypingSection.style.display = 'block';
            setTimeout(() => {
                this.codeTypingTarget.focus();
                this.positionCodeCursor();
            }, 300);
            
            // Disable math input
            this.mathNumberInput.disabled = true;
            
            // Start typing timer
            this.mathGameState.startTime = new Date();
            this.startTypingTimer();
        } else {
            this.showFeedback('✗ Incorrect. Try again!', 'error');
            this.mathGameState.streak = 0;
            this.mathNumberInput.select();
        }
        
        // Update stats
        this.updateMathStats();
    },
    
    handleCodeKeyDown: function(e) {
        // Only process if math is correct and we're in typing phase
        if (!this.mathGameState.isMathCorrect || this.mathGameState.isTypingComplete) {
            return;
        }
        
        // Prevent default for keys we handle
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
        }
        
        // Start typing timer on first keystroke if not already started
        if (!this.mathGameState.startTime && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            this.mathGameState.startTime = new Date();
            this.startTypingTimer();
        }
        
        // Handle backspace
        if (e.key === 'Backspace') {
            this.handleCodeBackspace();
            return;
        }
        
        // Handle tab (4 spaces)
        if (e.key === 'Tab') {
            e.preventDefault();
            this.handleCodeTab();
            return;
        }
        
        // Handle enter (new line)
        if (e.key === 'Enter') {
            this.handleCodeEnter();
            return;
        }
        
        // Ignore control keys
        if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
        
        // Handle regular character input
        this.handleCodeCharacter(e.key);
    },
    
    handleCodeCharacter: function(char) {
        const code = this.mathGameState.codeToType;
        const currentIndex = this.mathGameState.currentCharIndex;
        
        // Check if we're at the end
        if (currentIndex >= code.length) {
            return;
        }
        
        // Update keystrokes count
        this.mathGameState.totalKeystrokes++;
        
        const expectedChar = code[currentIndex];
        const isCorrect = char === expectedChar;
        
        // Store typed character
        this.mathGameState.typedChars.push({
            char: char,
            isCorrect: isCorrect,
            position: currentIndex
        });
        
        // Update error count
        if (!isCorrect) {
            this.mathGameState.totalErrors++;
        }
        
        // Move to next character
        this.mathGameState.currentCharIndex++;
        
        // Update display - overlay typed character
        this.overlayMathTypedCharacter(char, currentIndex, isCorrect);
        
        // Position cursor for next character
        this.positionCodeCursor();
        
        // Update typing stats
        this.updateTypingStats();
        
        // Check if code is complete
        if (this.mathGameState.currentCharIndex === code.length) {
            this.completeCodeTyping();
        }
    },
    
    overlayMathTypedCharacter: function(char, index, isCorrect) {
        // Get the original character element
        const charElements = document.querySelectorAll('.math-char-element');
        if (index >= charElements.length) return;
        
        const originalCharEl = charElements[index];
        
        // Create overlay element
        const overlayEl = document.createElement('div');
        overlayEl.className = `math-typed-overlay-char ${isCorrect ? 'math-correct' : 'math-incorrect'}`;
        overlayEl.textContent = char;
        
        // Get position of original character
        const rect = originalCharEl.getBoundingClientRect();
        const containerRect = this.mathCodeContainer.getBoundingClientRect();
        
        // Position overlay exactly over original character
        overlayEl.style.left = (rect.left - containerRect.left) + 'px';
        overlayEl.style.top = (rect.top - containerRect.top) + 'px';
        overlayEl.style.width = rect.width + 'px';
        overlayEl.style.height = rect.height + 'px';
        
        // Add to container
        this.mathCodeContainer.appendChild(overlayEl);
        
        // Store reference
        this.mathGameState.typedChars[this.mathGameState.typedChars.length - 1].overlayEl = overlayEl;
    },
    
    handleCodeBackspace: function() {
        if (this.mathGameState.currentCharIndex > 0) {
            // Remove last typed character overlay
            const lastTyped = this.mathGameState.typedChars.pop();
            if (lastTyped && lastTyped.overlayEl) {
                lastTyped.overlayEl.remove();
            }
            
            // Move back one character
            this.mathGameState.currentCharIndex--;
            
            // Update stats (backspace counts as a keystroke)
            this.mathGameState.totalKeystrokes++;
            
            // Position cursor
            this.positionCodeCursor();
            
            // Update typing stats
            this.updateTypingStats();
        }
    },
    
    handleCodeTab: function() {
        // Add 4 spaces for tab
        for (let i = 0; i < 4; i++) {
            this.handleCodeCharacter(' ');
        }
    },
    
    handleCodeEnter: function() {
        this.handleCodeCharacter('\n');
    },
    
    positionCodeCursor: function() {
        // Remove existing cursor
        const existingCursor = document.querySelector('.math-typing-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // If completed, don't show cursor
        if (this.mathGameState.isTypingComplete || this.mathGameState.currentCharIndex >= this.mathGameState.codeToType.length) {
            return;
        }
        
        // Get current character element
        const charElements = document.querySelectorAll('.math-char-element');
        if (this.mathGameState.currentCharIndex >= charElements.length) return;
        
        const currentCharEl = charElements[this.mathGameState.currentCharIndex];
        const rect = currentCharEl.getBoundingClientRect();
        const containerRect = this.mathCodeContainer.getBoundingClientRect();
        
        // Create cursor
        const cursor = document.createElement('div');
        cursor.className = 'math-typing-cursor';
        cursor.style.left = (rect.left - containerRect.left) + 'px';
        cursor.style.top = (rect.top - containerRect.top) + 'px';
        cursor.style.width = '2px';
        cursor.style.height = rect.height + 'px';
        
        this.mathCodeContainer.appendChild(cursor);
    },
    
    completeCodeTyping: function() {
        this.mathGameState.isTypingComplete = true;
        
        // Stop typing timer
        clearInterval(this.typingTimerInterval);
        
        // Remove cursor
        const cursor = document.querySelector('.math-typing-cursor');
        if (cursor) cursor.remove();
        
        // Calculate typing accuracy
        const accuracy = this.mathGameState.totalKeystrokes > 0 
            ? Math.round(((this.mathGameState.totalKeystrokes - this.mathGameState.totalErrors) / this.mathGameState.totalKeystrokes) * 100)
            : 100;
        
        // Calculate score for this problem
        const timeBonus = Math.max(0, 30 - (this.mathGameState.problemTimes[this.mathGameState.problemTimes.length - 1] || 0));
        const accuracyBonus = accuracy;
        const streakBonus = this.mathGameState.streak * 5;
        const difficultyMultiplier = {
            easy: 1,
            medium: 1.5,
            hard: 2,
            expert: 3
        }[this.mathGameState.currentDifficulty];
        
        const problemScore = Math.round(
            (100 + timeBonus + accuracyBonus + streakBonus) * difficultyMultiplier
        );
        
        this.mathGameState.score += problemScore;
        this.mathGameState.problemsSolved++;
        
        // Update stats
        this.updateMathStats();
        this.updateMathProgress();
        
        // Show feedback
        this.showFeedback(`Perfect! +${problemScore} points`, 'success');
        
        // Check if level is complete
        if (this.mathGameState.problemsSolved >= this.mathGameState.totalProblems) {
            setTimeout(() => this.completeMathLevel(), 1000);
        } else {
            // Generate new problem after delay
            setTimeout(() => this.generateNewMathProblem(), 1500);
        }
    },
    
    updateMathStats: function() {
        // Update score
        this.mathScore.textContent = this.mathGameState.score;
        
        // Update correct count
        this.mathCorrect.textContent = this.mathGameState.problemsSolved;
        
        // Update time
        if (this.mathGameState.problemTimes.length > 0) {
            const avgTime = this.mathGameState.problemTimes.reduce((a, b) => a + b, 0) / this.mathGameState.problemTimes.length;
            this.mathTime.textContent = `${avgTime.toFixed(1)}s`;
        }
        
        // Update speed (problems per minute)
        if (this.mathGameState.problemTimes.length > 0) {
            const totalTime = this.mathGameState.problemTimes.reduce((a, b) => a + b, 0);
            const problemsPerMinute = totalTime > 0 ? (this.mathGameState.problemsSolved / totalTime) * 60 : 0;
            this.mathSpeed.textContent = `${problemsPerMinute.toFixed(1)}/min`;
        }
    },
    
    updateTypingStats: function() {
        // Calculate typing speed (WPM)
        let speed = 0;
        if (this.mathGameState.startTime && !this.mathGameState.isTypingComplete) {
            const timeElapsed = (new Date() - this.mathGameState.startTime) / 1000 / 60;
            const wordsTyped = this.mathGameState.currentCharIndex / 5;
            speed = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        }
        this.typingSpeedValue.textContent = speed;
        
        // Calculate typing accuracy
        let accuracy = 100;
        if (this.mathGameState.totalKeystrokes > 0) {
            accuracy = Math.max(0, Math.round(((this.mathGameState.totalKeystrokes - this.mathGameState.totalErrors) / this.mathGameState.totalKeystrokes) * 100));
        }
        this.typingAccuracyValue.textContent = `${accuracy}%`;
        
        // Update errors
        this.typingErrorsValue.textContent = this.mathGameState.totalErrors;
        
        // Store for game state
        this.mathGameState.typingSpeed = speed;
        this.mathGameState.typingAccuracy = accuracy;
    },
    
    updateMathProgress: function() {
        const progress = (this.mathGameState.problemsSolved / this.mathGameState.totalProblems) * 100;
        this.mathProgressBar.style.width = `${progress}%`;
        this.mathProgressText.textContent = `${this.mathGameState.problemsSolved}/${this.mathGameState.totalProblems}`;
        
        // Change progress bar color based on streak
        if (this.mathGameState.streak >= 5) {
            this.mathProgressBar.style.background = 'linear-gradient(to right, #ffd700, #ff9900)';
        } else if (this.mathGameState.streak >= 3) {
            this.mathProgressBar.style.background = 'linear-gradient(to right, #4dff88, #00cc66)';
        } else {
            this.mathProgressBar.style.background = 'linear-gradient(to right, #4facfe, #00f2fe)';
        }
    },
    
    startTypingTimer: function() {
        if (this.typingTimerInterval) {
            clearInterval(this.typingTimerInterval);
        }
        
        this.typingTimerInterval = setInterval(() => {
            if (!this.mathGameState.isTypingComplete && this.mathGameState.startTime) {
                this.updateTypingStats();
            }
        }, 100);
    },
    
    completeMathLevel: function() {
        // Calculate final stats
        const avgTime = this.mathGameState.problemTimes.length > 0 
            ? this.mathGameState.problemTimes.reduce((a, b) => a + b, 0) / this.mathGameState.problemTimes.length 
            : 0;
        const avgTypingAccuracy = this.mathGameState.typingAccuracy;
        
        // Update results panel
        document.getElementById('finalMathScore').textContent = this.mathGameState.score;
        document.getElementById('finalProblemsSolved').textContent = `${this.mathGameState.problemsSolved}/${this.mathGameState.totalProblems}`;
        document.getElementById('finalAverageTime').textContent = `${avgTime.toFixed(1)}s`;
        document.getElementById('finalTypingAccuracy').textContent = `${avgTypingAccuracy}%`;
        
        // Show results panel
        this.mathResultsPanel.style.display = 'block';
        setTimeout(() => {
            this.mathResultsPanel.style.opacity = '1';
            this.mathResultsPanel.style.transform = 'translateY(0)';
        }, 10);
        
        // Check for achievements
        this.checkMathAchievements();
    },
    
    nextMathLevel: function() {
        // Hide results panel
        this.mathResultsPanel.style.opacity = '0';
        this.mathResultsPanel.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            // Reset for next level
            this.mathGameState.problemsSolved = 0;
            this.mathGameState.problemTimes = [];
            this.mathGameState.streak = 0;
            this.updateMathProgress();
            this.generateNewMathProblem();
        }, 300);
    },
    
    restartMathGame: function() {
        // Hide results panel
        this.mathResultsPanel.style.opacity = '0';
        this.mathResultsPanel.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            // Reset game state
            this.mathGameState = {
                currentProblem: null,
                correctAnswer: null,
                codeToType: '',
                userAnswer: null,
                isMathCorrect: false,
                currentCharIndex: 0,
                typedChars: [],
                totalErrors: 0,
                totalKeystrokes: 0,
                startTime: null,
                isTypingComplete: false,
                currentDifficulty: 'easy',
                score: 0,
                problemsSolved: 0,
                totalProblems: 10,
                problemTimes: [],
                currentProblemStartTime: null,
                typingSpeed: 0,
                typingAccuracy: 100,
                streak: 0,
                bestStreak: 0,
                achievements: []
            };
            
            // Update UI
            this.updateMathStats();
            this.updateMathProgress();
            this.updateTypingStats();
            
            // Generate new problem
            this.generateNewMathProblem();
        }, 300);
    },
    
    changeMathDifficulty: function(level) {
        // Update active button
        document.querySelectorAll('.math-difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update level indicator
        document.querySelector('.math-level-indicator').textContent = 
            level.charAt(0).toUpperCase() + level.slice(1);
        
        // Update game state
        this.mathGameState.currentDifficulty = level;
        
        // Reset and generate new problem
        this.restartMathGame();
    },
    
    showMathHint: function() {
        const hints = {
            easy: "Hint: For addition and subtraction, double-check your arithmetic.",
            medium: "Hint: Remember order of operations (PEMDAS).",
            hard: "Hint: For division, consider if the answer should be decimal or integer.",
            expert: "Hint: These are advanced operations. Use calculator if needed."
        };
        
        this.showFeedback(hints[this.mathGameState.currentDifficulty], 'info');
    },
    
    showFeedback: function(message, type) {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.math-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `math-feedback math-feedback-${type}`;
        feedback.textContent = message;
        
        // Add to DOM
        document.querySelector('.math-problem-section').appendChild(feedback);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.style.opacity = '0';
                setTimeout(() => {
                    if (feedback.parentNode) {
                        feedback.remove();
                    }
                }, 300);
            }
        }, 3000);
    },
    
    checkMathAchievements: function() {
        const newAchievements = [];
        
        // Score achievements
        if (this.mathGameState.score >= 5000 && !this.mathGameState.achievements.includes('math_master')) {
            newAchievements.push({name: 'Math Master', description: 'Scored 5000+ points'});
            this.mathGameState.achievements.push('math_master');
        }
        
        // Streak achievements
        if (this.mathGameState.bestStreak >= 10 && !this.mathGameState.achievements.includes('unstoppable')) {
            newAchievements.push({name: 'Unstoppable', description: '10+ problem streak'});
            this.mathGameState.achievements.push('unstoppable');
        }
        
        // Speed achievements
        const avgTime = this.mathGameState.problemTimes.length > 0 
            ? this.mathGameState.problemTimes.reduce((a, b) => a + b, 0) / this.mathGameState.problemTimes.length 
            : 0;
        
        if (avgTime < 5 && this.mathGameState.problemTimes.length >= 5 && 
            !this.mathGameState.achievements.includes('lightning_fast')) {
            newAchievements.push({name: 'Lightning Fast', description: 'Average <5s per problem'});
            this.mathGameState.achievements.push('lightning_fast');
        }
        
        // Show achievement notification if any earned
        if (newAchievements.length > 0) {
            this.showMathAchievementNotification(newAchievements);
        }
    },
    
    showMathAchievementNotification: function(achievements) {
        const notification = document.createElement('div');
        notification.className = 'math-achievement-notification';
        notification.innerHTML = `
            <h4><i class="fas fa-trophy"></i> Math Achievement Unlocked!</h4>
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
    
    startMathGame: function() {
        // Add CSS for math game
        const style = document.createElement('style');
        style.textContent = `
            .math-game-container {
                background: rgba(30, 30, 60, 0.9);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 20px;
                border: 1px solid rgba(100, 100, 255, 0.2);
            }
            
            .math-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(100, 100, 255, 0.2);
            }
            
            .math-header h3 {
                color: #6c63ff;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .math-level-indicator {
                background: rgba(108, 99, 255, 0.2);
                padding: 3px 10px;
                border-radius: 12px;
                font-size: 0.8rem;
                color: #6c63ff;
                font-weight: bold;
            }
            
            .math-actions {
                display: flex;
                gap: 10px;
            }
            
            .math-problem-section {
                background: rgba(20, 20, 40, 0.7);
                border-radius: 10px;
                padding: 25px;
                margin-bottom: 25px;
            }
            
            .math-problem-display h2 {
                font-size: 2.5rem;
                color: #fff;
                text-align: center;
                margin: 0 0 20px 0;
                font-weight: 600;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            
            .math-problem-hint {
                background: rgba(108, 99, 255, 0.1);
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 25px;
                border-left: 3px solid #6c63ff;
            }
            
            .math-problem-hint p {
                color: #b0b0ff;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .answer-input-wrapper {
                display: flex;
                gap: 15px;
                margin-bottom: 30px;
                align-items: center;
                justify-content: center;
            }
            
            .math-input {
                padding: 15px 20px;
                font-size: 1.5rem;
                width: 200px;
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(108, 99, 255, 0.3);
                border-radius: 8px;
                color: #fff;
                transition: all 0.3s;
            }
            
            .math-input:focus {
                outline: none;
                border-color: #6c63ff;
                box-shadow: 0 0 15px rgba(108, 99, 255, 0.3);
            }
            
            .math-input::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
            
            .action-btn.small {
                padding: 12px 24px;
                font-size: 1rem;
            }
            
            .code-typing-section {
                margin-top: 30px;
                padding-top: 30px;
                border-top: 1px solid rgba(108, 99, 255, 0.2);
            }
            
            .typing-instructions {
                margin-bottom: 15px;
            }
            
            .typing-instructions p {
                color: #b0b0ff;
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 0;
            }
            
            .code-typing-target {
                position: relative;
                background: rgba(10, 10, 30, 0.8);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 15px;
                border: 1px solid rgba(108, 99, 255, 0.2);
                min-height: 150px;
                overflow-x: auto;
                cursor: text;
                outline: none;
            }
            
            .code-typing-target:focus {
                border-color: #6c63ff;
                box-shadow: 0 0 15px rgba(108, 99, 255, 0.3);
            }
            
            .math-code-line {
                position: relative;
                min-height: 1.6em;
            }
            
            .math-char-element {
                position: relative;
                display: inline-block;
                min-width: 8px;
                font-family: 'Courier New', monospace;
                font-size: 1.1rem;
                color: rgba(224, 224, 255, 0.8);
            }
            
            .math-char-element.math-keyword {
                color: #ff79c6;
            }
            
            .math-char-element.math-number {
                color: #bd93f9;
                font-weight: bold;
            }
            
            .math-char-element.math-operator {
                color: #ffb86c;
            }
            
            .math-char-element.math-string {
                color: #f1fa8c;
            }
            
            .math-typed-overlay-char {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Courier New', monospace;
                font-size: 1.1rem;
                font-weight: bold;
                z-index: 10;
                pointer-events: none;
                animation: mathFadeIn 0.1s ease-out;
                border-radius: 2px;
            }
            
            .math-typed-overlay-char.math-correct {
                color: #50fa7b;
                background-color: rgba(80, 250, 123, 0.1);
            }
            
            .math-typed-overlay-char.math-incorrect {
                color: #ff5555;
                background-color: rgba(255, 85, 85, 0.15);
                text-decoration: underline;
            }
            
            @keyframes mathFadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .math-typing-cursor {
                position: absolute;
                background-color: #6c63ff;
                width: 2px;
                z-index: 20;
                pointer-events: none;
                animation: mathBlink 1s infinite;
            }
            
            @keyframes mathBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            .math-stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin: 25px 0;
            }
            
            .stat-box {
                background: rgba(40, 40, 80, 0.7);
                border-radius: 10px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: transform 0.3s;
            }
            
            .stat-box:hover {
                transform: translateY(-2px);
            }
            
            .stat-icon {
                width: 50px;
                height: 50px;
                background: rgba(108, 99, 255, 0.2);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: #6c63ff;
            }
            
            .stat-content {
                display: flex;
                flex-direction: column;
            }
            
            .stat-label {
                color: #b0b0ff;
                font-size: 0.9rem;
                margin-bottom: 5px;
            }
            
            .stat-value {
                color: #fff;
                font-size: 1.8rem;
                font-weight: bold;
            }
            
            .typing-stats-section {
                background: rgba(20, 20, 40, 0.7);
                border-radius: 10px;
                padding: 20px;
                margin: 25px 0;
            }
            
            .typing-stats-section h4 {
                color: #6c63ff;
                margin: 0 0 15px 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .typing-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
            }
            
            .typing-stat {
                background: rgba(40, 40, 80, 0.5);
                padding: 15px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .typing-stat span:first-child {
                color: #b0b0ff;
                font-size: 0.9rem;
                margin-bottom: 8px;
            }
            
            .typing-stat span:last-child {
                color: #fff;
                font-size: 1.4rem;
                font-weight: bold;
            }
            
            .math-feedback {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 15px 30px;
                border-radius: 8px;
                font-weight: bold;
                z-index: 1000;
                animation: slideDown 0.3s ease-out;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
            
            .math-feedback-success {
                background: linear-gradient(to right, #4dff88, #00cc66);
                color: #003311;
            }
            
            .math-feedback-error {
                background: linear-gradient(to right, #ff4d4d, #cc0000);
                color: white;
            }
            
            .math-feedback-warning {
                background: linear-gradient(to right, #ffcc00, #ff9900);
                color: #332200;
            }
            
            .math-feedback-info {
                background: linear-gradient(to right, #4facfe, #00f2fe);
                color: #003344;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            .math-achievement-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #6c63ff, #4a42cc);
                color: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 1000;
                max-width: 300px;
                transition: opacity 0.3s;
            }
            
            .math-difficulty-btn {
                padding: 8px 16px;
                background: rgba(108, 99, 255, 0.1);
                border: 1px solid rgba(108, 99, 255, 0.3);
                color: #b0b0ff;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .math-difficulty-btn:hover {
                background: rgba(108, 99, 255, 0.2);
            }
            
            .math-difficulty-btn.active {
                background: #6c63ff;
                color: white;
                font-weight: bold;
            }
            
            @media (max-width: 768px) {
                .math-header {
                    flex-direction: column;
                    gap: 15px;
                    align-items: flex-start;
                }
                
                .math-actions {
                    width: 100%;
                    justify-content: center;
                }
                
                .answer-input-wrapper {
                    flex-direction: column;
                }
                
                .math-input {
                    width: 100%;
                    max-width: 200px;
                }
                
                .math-stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .math-problem-display h2 {
                    font-size: 2rem;
                }
                
                .code-typing-target {
                    padding: 15px;
                }
                
                .math-char-element {
                    font-size: 1rem;
                }
                
                .math-typed-overlay-char {
                    font-size: 1rem;
                }
            }
            
            @media (max-width: 480px) {
                .math-stats-grid {
                    grid-template-columns: 1fr;
                }
                
                .typing-stats {
                    grid-template-columns: 1fr;
                }
                
                .math-problem-display h2 {
                    font-size: 1.8rem;
                }
                
                .math-char-element {
                    font-size: 0.9rem;
                }
                
                .math-typed-overlay-char {
                    font-size: 0.9rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Focus on input
        this.mathNumberInput.focus();
    },
    
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};