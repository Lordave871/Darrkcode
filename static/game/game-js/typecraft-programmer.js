window.PythonPractice = {
    init: function(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3><i class="fab fa-python"></i> TypeCraft Python Programmer</h3>
                <p>Type Python code to master the language! Your typed letters will appear OVER the original code.</p>
                <div class="difficulty-selector">
                    <button class="difficulty-btn active" data-level="beginner">Beginner</button>
                    <button class="difficulty-btn" data-level="intermediate">Intermediate</button>
                    <button class="difficulty-btn" data-level="advanced">Advanced</button>
                    <button class="difficulty-btn" data-level="expert">Expert</button>
                </div>
            </div>
            <div class="code-editor">
                <div class="code-header">
                    <h3><i class="fas fa-code"></i> Python Challenge <span class="level-indicator">Beginner</span></h3>
                    <div class="code-actions">
                        <button class="action-btn" id="newPythonChallengeBtn">
                            <i class="fas fa-redo"></i> New Challenge
                        </button>
                        <button class="action-btn" id="pythonHintBtn">
                            <i class="fas fa-lightbulb"></i> Hint
                        </button>
                        <button class="action-btn" id="pythonThemeToggle">
                            <i class="fas fa-moon"></i> Theme
                        </button>
                    </div>
                </div>
                
                <!-- Main typing area -->
                <div class="typing-target" id="pythonTypingTarget" tabindex="0">
                    <div class="code-container" id="pythonCodeContainer">
                        <!-- Python code will be dynamically inserted here -->
                    </div>
                </div>
                
                <div class="typing-hint">
                    <p><i class="fas fa-info-circle"></i> Focus on the Python code and start typing. Match the syntax exactly!</p>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar" id="pythonProgressBar"></div>
                    <div class="progress-text">Progress: <span id="pythonProgressText">0%</span></div>
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
                
                <div class="results-panel" id="pythonResultsPanel">
                    <h3><i class="fas fa-trophy"></i> Python Challenge Complete!</h3>
                    <div class="result-stats">
                        <div class="result-stat">
                            <span>Final Speed:</span>
                            <span id="pythonFinalSpeed">0 WPM</span>
                        </div>
                        <div class="result-stat">
                            <span>Final Accuracy:</span>
                            <span id="pythonFinalAccuracy">100%</span>
                        </div>
                        <div class="result-stat">
                            <span>Time Taken:</span>
                            <span id="pythonFinalTime">0.0s</span>
                        </div>
                        <div class="result-stat">
                            <span>Total Score:</span>
                            <span id="pythonFinalScore">0</span>
                        </div>
                    </div>
                    <div class="result-actions">
                        <button class="action-btn primary" id="nextPythonChallengeBtn">
                            <i class="fas fa-forward"></i> Next Challenge
                        </button>
                        <button class="action-btn" id="sharePythonResultsBtn">
                            <i class="fas fa-share-alt"></i> Share Results
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="keyboard-shortcuts">
                <h4><i class="fas fa-keyboard"></i> Python Keyboard Shortcuts</h4>
                <div class="shortcuts-grid">
                    <div class="shortcut">
                        <kbd>Tab</kbd>
                        <span>4 spaces (Python indentation)</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Enter</kbd>
                        <span>New line</span>
                    </div>
                    <div class="shortcut">
                        <kbd>:</kbd>
                        <span>Colon for Python blocks</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + P</kbd>
                        <span>New Python challenge</span>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize the typing game
        setTimeout(() => this.initPythonTypingGame(), 100);
    },
    
    initPythonTypingGame: function() {
        // Game state for Python practice
        this.pythonGameState = {
            currentCode: '',
            typedChars: [],
            startTime: null,
            endTime: null,
            isComplete: false,
            currentCharIndex: 0,
            totalErrors: 0,
            totalKeystrokes: 0,
            currentDifficulty: 'beginner',
            score: 0,
            isDarkTheme: true,
            currentLevel: 1,
            totalLevels: 15,
            achievements: []
        };
        
        // Python code snippets database
        this.pythonSnippets = {
            beginner: [
                "def greet(name):\n    return f'Hello, {name}!'",
                "def add(a, b):\n    return a + b",
                "def is_even(num):\n    return num % 2 == 0",
                "def square(x):\n    return x ** 2",
                "def max_of_two(a, b):\n    return a if a > b else b",
                "def factorial(n):\n    return 1 if n <= 1 else n * factorial(n-1)"
            ],
            intermediate: [
                "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
                "def list_average(numbers):\n    return sum(numbers) / len(numbers)",
                "def count_vowels(text):\n    vowels = 'aeiouAEIOU'\n    return sum(1 for char in text if char in vowels)",
                "def reverse_string(s):\n    return s[::-1]",
                "def is_palindrome(s):\n    return s == s[::-1]",
                "def find_max(numbers):\n    return max(numbers) if numbers else None"
            ],
            advanced: [
                "def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr)//2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)",
                "def binary_search(arr, target):\n    low, high = 0, len(arr)-1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1",
                "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)",
                "def merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] < right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result"
            ],
            expert: [
                "def decorator_factory(prefix):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            print(f'{prefix}: Calling {func.__name__}')\n            result = func(*args, **kwargs)\n            print(f'{prefix}: {func.__name__} returned {result}')\n            return result\n        return wrapper\n    return decorator",
                "class Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance",
                "def lru_cache(maxsize=128):\n    def decorator(func):\n        cache = {}\n        order = []\n        def wrapper(*args):\n            key = str(args)\n            if key in cache:\n                order.remove(key)\n                order.append(key)\n                return cache[key]\n            result = func(*args)\n            cache[key] = result\n            order.append(key)\n            if len(order) > maxsize:\n                oldest = order.pop(0)\n                del cache[oldest]\n            return result\n        return wrapper\n    return decorator",
                "async def fetch_data(url):\n    async with aiohttp.ClientSession() as session:\n        async with session.get(url) as response:\n            return await response.json()"
            ]
        };
        
        // Initialize UI elements
        this.pythonTypingTarget = document.getElementById('pythonTypingTarget');
        this.pythonCodeContainer = document.getElementById('pythonCodeContainer');
        this.pythonProgressBar = document.getElementById('pythonProgressBar');
        this.pythonProgressText = document.getElementById('pythonProgressText');
        this.pythonResultsPanel = document.getElementById('pythonResultsPanel');
        this.levelIndicator = document.querySelector('.level-indicator');
        
        // Set initial Python code
        this.loadNewPythonChallenge();
        
        // Event listeners
        this.setupPythonEventListeners();
        
        // Start the game
        this.startPythonGame();
    },
    
    setupPythonEventListeners: function() {
        // Typing directly on the code container
        this.pythonTypingTarget.addEventListener('keydown', (e) => this.handlePythonKeyDown(e));
        this.pythonTypingTarget.addEventListener('click', () => {
            this.pythonTypingTarget.focus();
            this.positionPythonCursor();
        });
        
        // Global keyboard shortcuts for Python
        document.addEventListener('keydown', (e) => {
            // Ctrl + P for new Python challenge
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                this.loadNewPythonChallenge();
            }
            // ESC to reset current Python challenge
            if (e.key === 'Escape') {
                e.preventDefault();
                this.resetCurrentPythonChallenge();
            }
        });
        
        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changePythonDifficulty(e.target.dataset.level));
        });
        
        // Action buttons
        document.getElementById('newPythonChallengeBtn').addEventListener('click', () => this.loadNewPythonChallenge());
        document.getElementById('pythonHintBtn').addEventListener('click', () => this.showPythonHint());
        document.getElementById('pythonThemeToggle').addEventListener('click', () => this.togglePythonTheme());
        document.getElementById('nextPythonChallengeBtn').addEventListener('click', () => this.nextPythonChallenge());
        document.getElementById('sharePythonResultsBtn').addEventListener('click', () => this.sharePythonResults());
        
        // Initialize results panel as hidden
        this.pythonResultsPanel.style.display = 'none';
    },
    
    handlePythonKeyDown: function(e) {
        // Prevent default for keys we handle
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
        }
        
        // Start timer on first valid keystroke
        if (!this.pythonGameState.startTime && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            this.pythonGameState.startTime = new Date();
            this.startPythonTimer();
        }
        
        // Handle backspace
        if (e.key === 'Backspace') {
            this.handlePythonBackspace();
            return;
        }
        
        // Handle tab (add 4 spaces for Python indentation)
        if (e.key === 'Tab') {
            this.handlePythonTab();
            return;
        }
        
        // Handle enter (new line)
        if (e.key === 'Enter') {
            this.handlePythonEnter();
            return;
        }
        
        // Ignore control keys
        if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
        
        // Handle regular character input
        this.handlePythonCharacter(e.key);
    },
    
    handlePythonCharacter: function(char) {
        const code = this.pythonGameState.currentCode;
        const currentIndex = this.pythonGameState.currentCharIndex;
        
        // Check if we're at the end
        if (currentIndex >= code.length) {
            return;
        }
        
        // Update keystrokes count
        this.pythonGameState.totalKeystrokes++;
        
        const expectedChar = code[currentIndex];
        const isCorrect = char === expectedChar;
        
        // Store typed character
        this.pythonGameState.typedChars.push({
            char: char,
            isCorrect: isCorrect,
            position: currentIndex
        });
        
        // Update error count
        if (!isCorrect) {
            this.pythonGameState.totalErrors++;
        }
        
        // Move to next character
        this.pythonGameState.currentCharIndex++;
        
        // Update display - overlay typed character
        this.overlayPythonTypedCharacter(char, currentIndex, isCorrect);
        
        // Position cursor for next character
        this.positionPythonCursor();
        
        // Update stats
        this.updatePythonStats();
        
        // Check if code is complete
        if (this.pythonGameState.currentCharIndex === code.length) {
            this.completePythonChallenge();
        }
    },
    
    overlayPythonTypedCharacter: function(char, index, isCorrect) {
        // Get the original character element
        const charElements = document.querySelectorAll('.python-char-element');
        if (index >= charElements.length) return;
        
        const originalCharEl = charElements[index];
        
        // Create overlay element
        const overlayEl = document.createElement('div');
        overlayEl.className = `python-typed-overlay-char ${isCorrect ? 'python-correct' : 'python-incorrect'}`;
        overlayEl.textContent = char;
        
        // Get position of original character
        const rect = originalCharEl.getBoundingClientRect();
        const containerRect = this.pythonCodeContainer.getBoundingClientRect();
        
        // Position overlay exactly over original character
        overlayEl.style.left = (rect.left - containerRect.left) + 'px';
        overlayEl.style.top = (rect.top - containerRect.top) + 'px';
        overlayEl.style.width = rect.width + 'px';
        overlayEl.style.height = rect.height + 'px';
        
        // Add to container
        this.pythonCodeContainer.appendChild(overlayEl);
        
        // Store reference
        this.pythonGameState.typedChars[this.pythonGameState.typedChars.length - 1].overlayEl = overlayEl;
    },
    
    handlePythonBackspace: function() {
        if (this.pythonGameState.currentCharIndex > 0) {
            // Remove last typed character overlay
            const lastTyped = this.pythonGameState.typedChars.pop();
            if (lastTyped && lastTyped.overlayEl) {
                lastTyped.overlayEl.remove();
            }
            
            // Move back one character
            this.pythonGameState.currentCharIndex--;
            
            // Update stats (backspace counts as a keystroke)
            this.pythonGameState.totalKeystrokes++;
            
            // Position cursor
            this.positionPythonCursor();
            
            // Update stats
            this.updatePythonStats();
        }
    },
    
    handlePythonTab: function() {
        // Add 4 spaces for Python indentation
        for (let i = 0; i < 4; i++) {
            this.handlePythonCharacter(' ');
        }
    },
    
    handlePythonEnter: function() {
        this.handlePythonCharacter('\n');
    },
    
    positionPythonCursor: function() {
        // Remove existing cursor
        const existingCursor = document.querySelector('.python-typing-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // If completed, don't show cursor
        if (this.pythonGameState.isComplete || this.pythonGameState.currentCharIndex >= this.pythonGameState.currentCode.length) {
            return;
        }
        
        // Get current character element
        const charElements = document.querySelectorAll('.python-char-element');
        if (this.pythonGameState.currentCharIndex >= charElements.length) return;
        
        const currentCharEl = charElements[this.pythonGameState.currentCharIndex];
        const rect = currentCharEl.getBoundingClientRect();
        const containerRect = this.pythonCodeContainer.getBoundingClientRect();
        
        // Create cursor
        const cursor = document.createElement('div');
        cursor.className = 'python-typing-cursor';
        cursor.style.left = (rect.left - containerRect.left) + 'px';
        cursor.style.top = (rect.top - containerRect.top) + 'px';
        cursor.style.width = '2px';
        cursor.style.height = rect.height + 'px';
        
        this.pythonCodeContainer.appendChild(cursor);
    },
    
    loadNewPythonChallenge: function() {
        // Reset game state
        this.resetPythonGameState();
        
        // Get random Python snippet for current difficulty
        const snippets = this.pythonSnippets[this.pythonGameState.currentDifficulty];
        const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
        
        this.pythonGameState.currentCode = randomSnippet;
        
        // Update level indicator
        this.levelIndicator.textContent = this.pythonGameState.currentDifficulty.charAt(0).toUpperCase() + 
                                         this.pythonGameState.currentDifficulty.slice(1);
        
        // Render Python code with syntax highlighting
        this.renderPythonCode();
        
        // Clear any existing overlays
        document.querySelectorAll('.python-typed-overlay-char').forEach(el => el.remove());
        
        // Reset stats
        this.updatePythonStats();
        
        // Reset progress
        this.updatePythonProgress();
        
        // Focus on typing target
        this.pythonTypingTarget.focus();
        
        // Position cursor at start
        this.positionPythonCursor();
    },
    
    resetPythonGameState: function() {
        this.pythonGameState.typedChars = [];
        this.pythonGameState.currentCharIndex = 0;
        this.pythonGameState.totalErrors = 0;
        this.pythonGameState.totalKeystrokes = 0;
        this.pythonGameState.isComplete = false;
        this.pythonGameState.startTime = null;
        this.pythonGameState.score = 0;
    },
    
    resetCurrentPythonChallenge: function() {
        this.resetPythonGameState();
        document.querySelectorAll('.python-typed-overlay-char').forEach(el => el.remove());
        this.updatePythonStats();
        this.updatePythonProgress();
        this.pythonTypingTarget.focus();
        this.positionPythonCursor();
    },
    
    renderPythonCode: function() {
        const code = this.pythonGameState.currentCode;
        let html = '';
        
        // Clear container
        this.pythonCodeContainer.innerHTML = '';
        
        // Split code into lines
        const lines = code.split('\n');
        
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'python-code-line';
            
            // Process each character in the line
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                const charSpan = document.createElement('span');
                charSpan.className = 'python-char-element';
                charSpan.dataset.index = lineIndex * 1000 + i; // Unique index
                
                // Handle special characters
                if (char === ' ') {
                    charSpan.innerHTML = '&nbsp;';
                    charSpan.classList.add('python-space-char');
                } else {
                    charSpan.textContent = char;
                    
                    // Add Python syntax highlighting
                    if (this.isPythonKeyword(line, i)) {
                        charSpan.classList.add('python-keyword');
                    } else if (this.isPythonBuiltin(line, i)) {
                        charSpan.classList.add('python-builtin');
                    } else if (this.isPythonString(line, i)) {
                        charSpan.classList.add('python-string');
                    } else if (this.isPythonNumber(line, i)) {
                        charSpan.classList.add('python-number');
                    } else if (this.isPythonOperator(char)) {
                        charSpan.classList.add('python-operator');
                    }
                }
                
                lineDiv.appendChild(charSpan);
            }
            
            // Add line break if not last line
            if (lineIndex < lines.length - 1) {
                const lineBreak = document.createElement('span');
                lineBreak.className = 'python-char-element python-line-break';
                lineBreak.innerHTML = '<br>';
                lineDiv.appendChild(lineBreak);
            }
            
            this.pythonCodeContainer.appendChild(lineDiv);
        }
    },
    
    // Python syntax highlighting helpers
    isPythonKeyword: function(line, index) {
        const pythonKeywords = ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 
                               'import', 'from', 'as', 'try', 'except', 'finally', 'with', 
                               'async', 'await', 'yield', 'lambda', 'in', 'is', 'not', 'and', 'or'];
        const substr = line.substr(index);
        for (const keyword of pythonKeywords) {
            if (substr.startsWith(keyword) && 
                (substr.length === keyword.length || !/\w/.test(substr[keyword.length]))) {
                return true;
            }
        }
        return false;
    },
    
    isPythonBuiltin: function(line, index) {
        const pythonBuiltins = ['print', 'len', 'sum', 'max', 'min', 'range', 'str', 'int', 
                               'float', 'list', 'dict', 'set', 'tuple', 'bool', 'type'];
        const substr = line.substr(index);
        for (const builtin of pythonBuiltins) {
            if (substr.startsWith(builtin) && 
                (substr.length === builtin.length || !/\w/.test(substr[builtin.length]))) {
                return true;
            }
        }
        return false;
    },
    
    isPythonString: function(line, index) {
        const char = line[index];
        return char === '"' || char === "'" || char === 'f' || char === 'r';
    },
    
    isPythonNumber: function(line, index) {
        const char = line[index];
        return /\d/.test(char);
    },
    
    isPythonOperator: function(char) {
        return '=+-*/%<>!&|^~@:.,;'.includes(char);
    },
    
    updatePythonStats: function() {
        // Calculate typing speed (WPM)
        let speed = 0;
        if (this.pythonGameState.startTime && !this.pythonGameState.isComplete) {
            const timeElapsed = (new Date() - this.pythonGameState.startTime) / 1000 / 60;
            const wordsTyped = this.pythonGameState.currentCharIndex / 5;
            speed = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        }
        document.querySelector('.typing-speed').textContent = speed;
        
        // Calculate accuracy
        let accuracy = 100;
        if (this.pythonGameState.totalKeystrokes > 0) {
            accuracy = Math.max(0, Math.round(((this.pythonGameState.totalKeystrokes - this.pythonGameState.totalErrors) / this.pythonGameState.totalKeystrokes) * 100));
        }
        document.querySelector('.typing-accuracy').textContent = `${accuracy}%`;
        
        // Update time
        let timeElapsed = 0;
        if (this.pythonGameState.startTime && !this.pythonGameState.isComplete) {
            timeElapsed = (new Date() - this.pythonGameState.startTime) / 1000;
        }
        document.querySelector('.typing-time').textContent = `${timeElapsed.toFixed(1)}s`;
        
        // Calculate score
        this.pythonGameState.score = Math.round(
            (speed * 10) + 
            (accuracy * 5) + 
            (this.pythonGameState.currentLevel * 25) -
            (this.pythonGameState.totalErrors * 2)
        );
        document.querySelector('.typing-score').textContent = Math.max(0, this.pythonGameState.score);
    },
    
    updatePythonProgress: function() {
        const progress = (this.pythonGameState.currentCharIndex / this.pythonGameState.currentCode.length) * 100;
        this.pythonProgressBar.style.width = `${progress}%`;
        this.pythonProgressText.textContent = `${Math.round(progress)}%`;
        
        // Change progress bar color based on accuracy
        const accuracy = parseInt(document.querySelector('.typing-accuracy').textContent);
        if (accuracy >= 95) {
            this.pythonProgressBar.style.background = 'linear-gradient(to right, #4dff88, #00cc66)';
        } else if (accuracy >= 85) {
            this.pythonProgressBar.style.background = 'linear-gradient(to right, #ffcc00, #ff9900)';
        } else {
            this.pythonProgressBar.style.background = 'linear-gradient(to right, #ff4d4d, #cc0000)';
        }
    },
    
    startPythonTimer: function() {
        if (this.pythonTimerInterval) {
            clearInterval(this.pythonTimerInterval);
        }
        
        this.pythonTimerInterval = setInterval(() => {
            if (!this.pythonGameState.isComplete && this.pythonGameState.startTime) {
                this.updatePythonStats();
                this.updatePythonProgress();
            }
        }, 100);
    },
    
    completePythonChallenge: function() {
        this.pythonGameState.endTime = new Date();
        this.pythonGameState.isComplete = true;
        
        // Stop timer
        clearInterval(this.pythonTimerInterval);
        
        // Remove cursor
        const cursor = document.querySelector('.python-typing-cursor');
        if (cursor) cursor.remove();
        
        // Calculate final stats
        const timeTaken = (this.pythonGameState.endTime - this.pythonGameState.startTime) / 1000;
        const words = this.pythonGameState.currentCode.length / 5;
        const minutes = timeTaken / 60;
        const finalSpeed = Math.round(words / minutes);
        const finalAccuracy = Math.round(((this.pythonGameState.totalKeystrokes - this.pythonGameState.totalErrors) / this.pythonGameState.totalKeystrokes) * 100);
        
        // Update results panel
        document.getElementById('pythonFinalSpeed').textContent = `${finalSpeed} WPM`;
        document.getElementById('pythonFinalAccuracy').textContent = `${finalAccuracy}%`;
        document.getElementById('pythonFinalTime').textContent = `${timeTaken.toFixed(2)}s`;
        document.getElementById('pythonFinalScore').textContent = this.pythonGameState.score;
        
        // Show results panel with animation
        this.pythonResultsPanel.style.display = 'block';
        setTimeout(() => {
            this.pythonResultsPanel.style.opacity = '1';
            this.pythonResultsPanel.style.transform = 'translateY(0)';
        }, 10);
        
        // Check for Python-specific achievements
        this.checkPythonAchievements(finalSpeed, finalAccuracy);
        
        // Level up if performance is good
        if (finalAccuracy >= 90 && finalSpeed >= 30) {
            this.pythonGameState.currentLevel++;
            if (this.pythonGameState.currentLevel > this.pythonGameState.totalLevels) {
                this.pythonGameState.currentLevel = this.pythonGameState.totalLevels;
            }
        }
    },
    
    nextPythonChallenge: function() {
        // Hide results panel
        this.pythonResultsPanel.style.opacity = '0';
        this.pythonResultsPanel.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.loadNewPythonChallenge();
        }, 300);
    },
    
    changePythonDifficulty: function(level) {
        // Update active button
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update game state
        this.pythonGameState.currentDifficulty = level;
        
        // Load new challenge with new difficulty
        this.loadNewPythonChallenge();
    },
    
    showPythonHint: function() {
        const hints = {
            beginner: "Focus on Python syntax: indentation (4 spaces), colons (:), and proper spacing.",
            intermediate: "Remember Python functions use 'def' and have proper return statements.",
            advanced: "Pay attention to algorithm complexity and proper Pythonic patterns.",
            expert: "This is advanced Python with decorators, async, or metaclasses. Focus on exact syntax."
        };
        
        alert(`Python Hint (${this.pythonGameState.currentDifficulty}): ${hints[this.pythonGameState.currentDifficulty]}`);
    },
    
    togglePythonTheme: function() {
        this.pythonGameState.isDarkTheme = !this.pythonGameState.isDarkTheme;
        
        const themeToggleBtn = document.getElementById('pythonThemeToggle');
        const body = document.body;
        
        if (this.pythonGameState.isDarkTheme) {
            body.style.background = 'linear-gradient(135deg, #0a2540, #1a365d, #2d3748)';
            body.style.color = '#e2e8f0';
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark';
        } else {
            body.style.background = 'linear-gradient(135deg, #f7fafc, #edf2f7, #e2e8f0)';
            body.style.color = '#2d3748';
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
        }
    },
    
    checkPythonAchievements: function(speed, accuracy) {
        const newAchievements = [];
        
        // Python-specific achievements
        if (accuracy === 100 && !this.pythonGameState.achievements.includes('python_perfectionist')) {
            newAchievements.push({name: 'Python Perfectionist', description: '100% accuracy on Python code'});
            this.pythonGameState.achievements.push('python_perfectionist');
        }
        
        if (this.pythonGameState.currentDifficulty === 'expert' && accuracy >= 95 && 
            !this.pythonGameState.achievements.includes('python_expert')) {
            newAchievements.push({name: 'Python Expert', description: '95%+ accuracy on expert Python'});
            this.pythonGameState.achievements.push('python_expert');
        }
        
        if (speed >= 80 && !this.pythonGameState.achievements.includes('python_speedster')) {
            newAchievements.push({name: 'Python Speedster', description: '80+ WPM on Python code'});
            this.pythonGameState.achievements.push('python_speedster');
        }
        
        // Show achievement notification if any earned
        if (newAchievements.length > 0) {
            this.showPythonAchievementNotification(newAchievements);
        }
    },
    
    showPythonAchievementNotification: function(achievements) {
        const notification = document.createElement('div');
        notification.className = 'python-achievement-notification';
        notification.innerHTML = `
            <h4><i class="fab fa-python"></i> Python Achievement Unlocked!</h4>
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
    
    sharePythonResults: function() {
        const speed = document.getElementById('pythonFinalSpeed').textContent;
        const accuracy = document.getElementById('pythonFinalAccuracy').textContent;
        const score = document.getElementById('pythonFinalScore').textContent;
        const level = this.levelIndicator.textContent;
        
        const shareText = `I just scored ${score} points in Python TypeCraft (${level} level) with ${speed} speed and ${accuracy} accuracy! 🐍`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Python TypeCraft Results',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Python results copied to clipboard! 🐍');
            });
        }
    },
    
    startPythonGame: function() {
        // Focus on typing target
        this.pythonTypingTarget.focus();
        
        // Add CSS for Python-specific styling
        const style = document.createElement('style');
        style.textContent = `
            .typing-target {
                position: relative;
                background: rgba(10, 37, 64, 0.95);
                border-radius: 10px;
                padding: 25px;
                margin-bottom: 20px;
                border: 1px solid rgba(52, 144, 220, 0.2);
                min-height: 200px;
                overflow-x: auto;
                box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);
                cursor: text;
                outline: none;
                font-family: 'Monaco', 'Courier New', monospace;
            }
            
            .typing-target:focus {
                border-color: #38b2ac;
                box-shadow: 0 0 15px rgba(56, 178, 172, 0.3);
            }
            
            .code-container {
                position: relative;
                font-family: 'Monaco', 'Courier New', monospace;
                font-size: 1.2rem;
                line-height: 1.6;
                color: rgba(226, 232, 240, 0.8);
                white-space: pre-wrap;
                user-select: none;
            }
            
            .python-code-line {
                position: relative;
                min-height: 1.6em;
            }
            
            .python-char-element {
                position: relative;
                display: inline-block;
                min-width: 8px;
            }
            
            .python-char-element.python-keyword {
                color: #f68787;
                font-weight: bold;
            }
            
            .python-char-element.python-builtin {
                color: #63b3ed;
            }
            
            .python-char-element.python-string {
                color: #9ae6b4;
            }
            
            .python-char-element.python-number {
                color: #fbb6ce;
            }
            
            .python-char-element.python-operator {
                color: #fbd38d;
            }
            
            .python-char-element.python-space-char {
                background-color: rgba(255, 255, 255, 0.03);
                border-radius: 2px;
            }
            
            .python-typed-overlay-char {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Monaco', 'Courier New', monospace;
                font-size: 1.2rem;
                font-weight: bold;
                z-index: 10;
                pointer-events: none;
                animation: pythonFadeIn 0.1s ease-out;
                border-radius: 2px;
            }
            
            .python-typed-overlay-char.python-correct {
                color: #68d391;
                background-color: rgba(104, 211, 145, 0.1);
            }
            
            .python-typed-overlay-char.python-incorrect {
                color: #fc8181;
                background-color: rgba(252, 129, 129, 0.15);
                text-decoration: underline;
            }
            
            @keyframes pythonFadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .python-typing-cursor {
                position: absolute;
                background-color: #38b2ac;
                width: 2px;
                z-index: 20;
                pointer-events: none;
                animation: pythonBlink 1s infinite;
            }
            
            @keyframes pythonBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            .typing-hint {
                background: rgba(30, 41, 59, 0.7);
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 20px;
                border-left: 4px solid #38b2ac;
            }
            
            .typing-hint p {
                color: #cbd5e0;
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 0;
            }
            
            .keyboard-shortcuts {
                margin-top: 30px;
                background: rgba(15, 23, 42, 0.8);
                border-radius: 15px;
                padding: 20px;
                border: 1px solid rgba(56, 178, 172, 0.2);
            }
            
            .keyboard-shortcuts h4 {
                color: #38b2ac;
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
                background: rgba(30, 41, 59, 0.9);
                padding: 5px 10px;
                border-radius: 6px;
                border: 1px solid rgba(56, 178, 172, 0.3);
                font-family: 'Courier New', monospace;
                color: #38b2ac;
                min-width: 80px;
                text-align: center;
            }
            
            .shortcut span {
                color: #cbd5e0;
                font-size: 0.9rem;
            }
            
            .python-achievement-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #2d3748, #4a5568);
                color: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 1000;
                max-width: 300px;
                transition: opacity 0.3s;
                border-left: 4px solid #38b2ac;
            }
            
            .python-achievement-notification h4 {
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .game-instructions h3 {
                color: #38b2ac;
                border-bottom: 2px solid rgba(56, 178, 172, 0.3);
                padding-bottom: 10px;
                margin-bottom: 15px;
            }
            
            .difficulty-selector {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            .difficulty-btn {
                padding: 8px 16px;
                background: rgba(56, 178, 172, 0.1);
                border: 1px solid rgba(56, 178, 172, 0.3);
                color: #cbd5e0;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .difficulty-btn:hover {
                background: rgba(56, 178, 172, 0.2);
            }
            
            .difficulty-btn.active {
                background: #38b2ac;
                color: white;
                font-weight: bold;
            }
            
            .code-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(56, 178, 172, 0.2);
            }
            
            .code-header h3 {
                color: #38b2ac;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .level-indicator {
                background: rgba(56, 178, 172, 0.2);
                padding: 3px 10px;
                border-radius: 12px;
                font-size: 0.8rem;
                color: #38b2ac;
                font-weight: bold;
            }
            
            .code-actions {
                display: flex;
                gap: 10px;
            }
            
            .action-btn {
                padding: 8px 16px;
                background: rgba(56, 178, 172, 0.1);
                border: 1px solid rgba(56, 178, 172, 0.3);
                color: #cbd5e0;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s;
            }
            
            .action-btn:hover {
                background: rgba(56, 178, 172, 0.2);
            }
            
            .action-btn.primary {
                background: linear-gradient(to right, #38b2ac, #319795);
                color: white;
                font-weight: bold;
                border: none;
            }
            
            .typing-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-top: 20px;
                padding: 20px;
                background: rgba(15, 23, 42, 0.5);
                border-radius: 10px;
            }
            
            .stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10px;
                background: rgba(30, 41, 59, 0.7);
                border-radius: 8px;
            }
            
            .stat span:first-child {
                color: #a0aec0;
                font-size: 0.9rem;
                margin-bottom: 5px;
            }
            
            .stat span:last-child {
                color: #38b2ac;
                font-size: 1.4rem;
                font-weight: bold;
            }
            
            .progress-container {
                margin: 20px 0;
                background: rgba(30, 41, 59, 0.7);
                border-radius: 10px;
                height: 10px;
                overflow: hidden;
                position: relative;
            }
            
            .progress-bar {
                height: 100%;
                width: 0%;
                background: linear-gradient(to right, #38b2ac, #319795);
                transition: width 0.3s, background 0.3s;
            }
            
            .progress-text {
                text-align: center;
                margin-top: 5px;
                font-size: 0.9rem;
                color: #a0aec0;
            }
            
            .results-panel {
                margin-top: 30px;
                background: rgba(15, 23, 42, 0.9);
                border-radius: 15px;
                padding: 25px;
                border: 1px solid rgba(56, 178, 172, 0.3);
                opacity: 0;
                transform: translateY(-20px);
                transition: opacity 0.5s, transform 0.5s;
            }
            
            .results-panel h3 {
                color: #38b2ac;
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
                background: rgba(30, 41, 59, 0.7);
                padding: 15px;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
            }
            
            .result-stat span:first-child {
                color: #cbd5e0;
            }
            
            .result-stat span:last-child {
                color: #38b2ac;
                font-weight: bold;
                font-size: 1.1rem;
            }
            
            .result-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
            }
            
            @media (max-width: 768px) {
                .code-container {
                    font-size: 1rem;
                }
                
                .python-typed-overlay-char {
                    font-size: 1rem;
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
                
                .code-header {
                    flex-direction: column;
                    gap: 15px;
                    align-items: flex-start;
                }
                
                .code-actions {
                    width: 100%;
                    justify-content: center;
                }
            }
            
            @media (max-width: 480px) {
                .typing-stats {
                    grid-template-columns: 1fr;
                }
                
                .code-container {
                    font-size: 0.9rem;
                }
                
                .python-typed-overlay-char {
                    font-size: 0.9rem;
                }
                
                .difficulty-selector {
                    flex-wrap: wrap;
                }
            }
        `;
        document.head.appendChild(style);
    }
};