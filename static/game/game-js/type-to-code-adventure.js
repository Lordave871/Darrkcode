window.MemoryCards = {
    init: function(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3><i class="fas fa-memory"></i> Type-to-Code Adventure</h3>
                <p>Type the code to unlock memory challenges! Complete typing challenges to earn memory cards.</p>
                <div class="mode-selector">
                    <button class="mode-btn active" data-mode="practice">Practice Mode</button>
                    <button class="mode-btn" data-mode="timed">Timed Challenge</button>
                    <button class="mode-btn" data-mode="memory">Memory Cards</button>
                </div>
            </div>
            
            <div class="memory-game-container">
                <div class="game-header">
                    <h3><i class="fas fa-code"></i> Code Challenge <span class="game-mode-indicator">Practice</span></h3>
                    <div class="game-actions">
                        <button class="action-btn" id="newMemoryChallengeBtn">
                            <i class="fas fa-redo"></i> New Challenge
                        </button>
                        <button class="action-btn" id="memoryHintBtn">
                            <i class="fas fa-lightbulb"></i> Hint
                        </button>
                        <button class="action-btn" id="memoryCardsBtn">
                            <i class="fas fa-layer-group"></i> View Cards
                        </button>
                    </div>
                </div>
                
                <div class="challenge-section">
                    <div class="challenge-info">
                        <div class="challenge-type">
                            <span class="challenge-tag" id="challengeCategory">Async/Await</span>
                            <span class="challenge-difficulty" id="challengeDifficulty">Medium</span>
                        </div>
                        <div class="challenge-description">
                            <p id="challengeDescription">Type this async function to unlock memory cards</p>
                        </div>
                    </div>
                    
                    <div class="code-typing-area">
                        <div class="typing-target" id="memoryTypingTarget" tabindex="0">
                            <div class="code-container" id="memoryCodeContainer">
                                <!-- Code will be dynamically inserted here -->
                            </div>
                        </div>
                        
                        <div class="typing-hint">
                            <p><i class="fas fa-info-circle"></i> Type the code exactly as shown. Special characters matter!</p>
                        </div>
                    </div>
                    
                    <div class="card-reward-section">
                        <div class="card-reward-info">
                            <h4><i class="fas fa-gift"></i> Card Reward</h4>
                            <p>Complete this challenge to earn: <span id="cardRewardName">Async Function Card</span></p>
                            <div class="card-preview" id="cardPreview">
                                <div class="card-front">
                                    <div class="card-header">Async/Await</div>
                                    <div class="card-content">const getUser = async (id) => { ... }</div>
                                    <div class="card-footer">Memory Card #1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar" id="memoryProgressBar"></div>
                    <div class="progress-text">Typing Progress: <span id="memoryProgressText">0%</span></div>
                </div>
                
                <div class="typing-stats-section">
                    <div class="typing-stats">
                        <div class="typing-stat">
                            <div class="stat-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Speed (WPM)</span>
                                <span class="stat-value" id="memorySpeed">0</span>
                            </div>
                        </div>
                        <div class="typing-stat">
                            <div class="stat-icon">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Accuracy</span>
                                <span class="stat-value" id="memoryAccuracy">100%</span>
                            </div>
                        </div>
                        <div class="typing-stat">
                            <div class="stat-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Time</span>
                                <span class="stat-value" id="memoryTime">0.0s</span>
                            </div>
                        </div>
                        <div class="typing-stat">
                            <div class="stat-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Score</span>
                                <span class="stat-value" id="memoryScore">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="memory-cards-section">
                    <h4><i class="fas fa-layer-group"></i> Your Memory Cards <span class="cards-count">(0)</span></h4>
                    <div class="cards-container" id="memoryCardsContainer">
                        <div class="no-cards-message">
                            <i class="fas fa-inbox"></i>
                            <p>Complete typing challenges to unlock memory cards!</p>
                        </div>
                    </div>
                </div>
                
                <div class="results-panel" id="memoryResultsPanel">
                    <h3><i class="fas fa-trophy"></i> Challenge Complete!</h3>
                    <div class="result-stats">
                        <div class="result-stat">
                            <span>Typing Speed:</span>
                            <span id="finalMemorySpeed">0 WPM</span>
                        </div>
                        <div class="result-stat">
                            <span>Typing Accuracy:</span>
                            <span id="finalMemoryAccuracy">100%</span>
                        </div>
                        <div class="result-stat">
                            <span>Time Taken:</span>
                            <span id="finalMemoryTime">0.0s</span>
                        </div>
                        <div class="result-stat">
                            <span>Card Earned:</span>
                            <span id="earnedCardName">None</span>
                        </div>
                    </div>
                    <div class="new-card-earned" id="newCardEarned">
                        <h4><i class="fas fa-gift"></i> New Card Unlocked!</h4>
                        <div class="earned-card-preview" id="earnedCardPreview"></div>
                        <p>This card has been added to your collection</p>
                    </div>
                    <div class="result-actions">
                        <button class="action-btn primary" id="nextMemoryChallengeBtn">
                            <i class="fas fa-forward"></i> Next Challenge
                        </button>
                        <button class="action-btn" id="viewCardsBtn">
                            <i class="fas fa-layer-group"></i> View Cards
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="keyboard-shortcuts">
                <h4><i class="fas fa-keyboard"></i> Code Shortcuts</h4>
                <div class="shortcuts-grid">
                    <div class="shortcut">
                        <kbd>Tab</kbd>
                        <span>Indentation (2 spaces)</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + ]</kbd>
                        <span>Special characters</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + C</kbd>
                        <span>New memory challenge</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Esc</kbd>
                        <span>Reset typing</span>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize the memory typing game
        setTimeout(() => this.initMemoryTypingGame(), 100);
    },
    
    initMemoryTypingGame: function() {
        // Game state for memory typing
        this.memoryGameState = {
            currentCode: '',
            typedChars: [],
            startTime: null,
            isComplete: false,
            currentCharIndex: 0,
            totalErrors: 0,
            totalKeystrokes: 0,
            currentMode: 'practice',
            score: 0,
            timeLimit: null,
            timerInterval: null,
            memoryCards: [],
            unlockedCards: [],
            currentCardReward: null,
            achievements: [],
            streak: 0,
            bestStreak: 0,
            totalChallenges: 0,
            completedChallenges: 0
        };
        
        // Memory cards database
        this.memoryCardsData = {
            categories: ['Async/Await', 'Array Methods', 'String Methods', 'DOM Manipulation', 'ES6 Features', 'React Patterns', 'Node.js', 'CSS Tricks'],
            difficulties: ['Easy', 'Medium', 'Hard', 'Expert'],
            
            cards: [
                {
                    id: 1,
                    name: 'Async/Await Pattern',
                    category: 'Async/Await',
                    difficulty: 'Medium',
                    description: 'Modern async pattern using async/await',
                    code: "const getUser = async (id) => {\n    try {\n        const response = await fetch(`/api/user/${id}`);\n        return await response.json();\n    } catch (error) {\n        console.error('Error:', error);\n    }\n}",
                    points: 50,
                    color: '#3498db'
                },
                {
                    id: 2,
                    name: 'Array Map Method',
                    category: 'Array Methods',
                    difficulty: 'Easy',
                    description: 'Transform array elements with map()',
                    code: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]",
                    points: 30,
                    color: '#2ecc71'
                },
                {
                    id: 3,
                    name: 'Promise.all Pattern',
                    category: 'Async/Await',
                    difficulty: 'Hard',
                    description: 'Execute multiple promises concurrently',
                    code: "const fetchMultiple = async (urls) => {\n    try {\n        const promises = urls.map(url => fetch(url));\n        const responses = await Promise.all(promises);\n        return await Promise.all(responses.map(r => r.json()));\n    } catch (error) {\n        console.error('Error:', error);\n    }\n}",
                    points: 70,
                    color: '#3498db'
                },
                {
                    id: 4,
                    name: 'Template Literals',
                    category: 'ES6 Features',
                    difficulty: 'Easy',
                    description: 'Modern string interpolation',
                    code: "const name = 'John';\nconst age = 30;\nconst message = `Hello, my name is ${name} and I am ${age} years old.`;\nconsole.log(message);",
                    points: 25,
                    color: '#e74c3c'
                },
                {
                    id: 5,
                    name: 'Event Listener',
                    category: 'DOM Manipulation',
                    difficulty: 'Medium',
                    description: 'Handle DOM events properly',
                    code: "const button = document.querySelector('#myButton');\nbutton.addEventListener('click', (event) => {\n    event.preventDefault();\n    console.log('Button clicked!');\n});",
                    points: 40,
                    color: '#9b59b6'
                },
                {
                    id: 6,
                    name: 'Debounce Function',
                    category: 'React Patterns',
                    difficulty: 'Expert',
                    description: 'Optimize event handlers',
                    code: "const debounce = (func, delay) => {\n    let timeoutId;\n    return (...args) => {\n        clearTimeout(timeoutId);\n        timeoutId = setTimeout(() => func.apply(this, args), delay);\n    };\n};",
                    points: 80,
                    color: '#1abc9c'
                },
                {
                    id: 7,
                    name: 'Array Reduce',
                    category: 'Array Methods',
                    difficulty: 'Medium',
                    description: 'Accumulate array values',
                    code: "const numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((accumulator, current) => {\n    return accumulator + current;\n}, 0);\nconsole.log(sum); // 15",
                    points: 45,
                    color: '#2ecc71'
                },
                {
                    id: 8,
                    name: 'Flexbox Center',
                    category: 'CSS Tricks',
                    difficulty: 'Easy',
                    description: 'Perfect centering with flexbox',
                    code: ".container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n}",
                    points: 20,
                    color: '#f39c12'
                }
            ],
            
            // Additional code challenges (without cards)
            challenges: [
                "const users = users.filter(user => user.active && user.age > 18);",
                "const uniqueArray = [...new Set(array)];",
                "const isPalindrome = str => str === str.split('').reverse().join('');",
                "const getRandomHex = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;",
                "const formatDate = date => new Date(date).toLocaleDateString('en-US');",
                "const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);",
                "const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));",
                "const chunkArray = (arr, size) => Array.from({length: Math.ceil(arr.length/size)}, (_,i) => arr.slice(i*size, i*size+size));"
            ]
        };
        
        // Initialize UI elements
        this.memoryTypingTarget = document.getElementById('memoryTypingTarget');
        this.memoryCodeContainer = document.getElementById('memoryCodeContainer');
        this.memorySpeed = document.getElementById('memorySpeed');
        this.memoryAccuracy = document.getElementById('memoryAccuracy');
        this.memoryTime = document.getElementById('memoryTime');
        this.memoryScore = document.getElementById('memoryScore');
        this.memoryProgressBar = document.getElementById('memoryProgressBar');
        this.memoryProgressText = document.getElementById('memoryProgressText');
        this.memoryResultsPanel = document.getElementById('memoryResultsPanel');
        this.memoryCardsContainer = document.getElementById('memoryCardsContainer');
        this.cardsCount = document.querySelector('.cards-count');
        this.cardPreview = document.getElementById('cardPreview');
        this.cardRewardName = document.getElementById('cardRewardName');
        this.challengeCategory = document.getElementById('challengeCategory');
        this.challengeDifficulty = document.getElementById('challengeDifficulty');
        this.challengeDescription = document.getElementById('challengeDescription');
        
        // Set initial challenge
        this.loadNewMemoryChallenge();
        
        // Event listeners
        this.setupMemoryEventListeners();
        
        // Start the game
        this.startMemoryGame();
    },
    
    setupMemoryEventListeners: function() {
        // Typing on the code container
        this.memoryTypingTarget.addEventListener('keydown', (e) => this.handleMemoryKeyDown(e));
        this.memoryTypingTarget.addEventListener('click', () => {
            this.memoryTypingTarget.focus();
            this.positionMemoryCursor();
        });
        
        // Global shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl + C for new challenge
            if (e.ctrlKey && e.key === 'c') {
                e.preventDefault();
                this.loadNewMemoryChallenge();
            }
            // ESC to reset current challenge
            if (e.key === 'Escape') {
                e.preventDefault();
                this.resetCurrentMemoryChallenge();
            }
            // Ctrl + ] for special characters help
            if (e.ctrlKey && e.key === ']') {
                e.preventDefault();
                this.showSpecialCharsHelp();
            }
        });
        
        // Mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeMemoryMode(e.target.dataset.mode));
        });
        
        // Action buttons
        document.getElementById('newMemoryChallengeBtn').addEventListener('click', () => this.loadNewMemoryChallenge());
        document.getElementById('memoryHintBtn').addEventListener('click', () => this.showMemoryHint());
        document.getElementById('memoryCardsBtn').addEventListener('click', () => this.showMemoryCards());
        document.getElementById('nextMemoryChallengeBtn').addEventListener('click', () => this.nextMemoryChallenge());
        document.getElementById('viewCardsBtn').addEventListener('click', () => this.showMemoryCards());
        
        // Initialize results panel as hidden
        this.memoryResultsPanel.style.display = 'none';
        document.getElementById('newCardEarned').style.display = 'none';
    },
    
    handleMemoryKeyDown: function(e) {
        // Prevent default for keys we handle
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
        }
        
        // Start timer on first valid keystroke
        if (!this.memoryGameState.startTime && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            this.memoryGameState.startTime = new Date();
            this.startMemoryTimer();
        }
        
        // Handle backspace
        if (e.key === 'Backspace') {
            this.handleMemoryBackspace();
            return;
        }
        
        // Handle tab (add 2 spaces)
        if (e.key === 'Tab') {
            this.handleMemoryTab();
            return;
        }
        
        // Handle enter (new line)
        if (e.key === 'Enter') {
            this.handleMemoryEnter();
            return;
        }
        
        // Ignore control keys
        if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
        
        // Handle regular character input
        this.handleMemoryCharacter(e.key);
    },
    
    handleMemoryCharacter: function(char) {
        const code = this.memoryGameState.currentCode;
        const currentIndex = this.memoryGameState.currentCharIndex;
        
        // Check if we're at the end
        if (currentIndex >= code.length) {
            return;
        }
        
        // Update keystrokes count
        this.memoryGameState.totalKeystrokes++;
        
        const expectedChar = code[currentIndex];
        const isCorrect = char === expectedChar;
        
        // Store typed character
        this.memoryGameState.typedChars.push({
            char: char,
            isCorrect: isCorrect,
            position: currentIndex
        });
        
        // Update error count
        if (!isCorrect) {
            this.memoryGameState.totalErrors++;
        }
        
        // Move to next character
        this.memoryGameState.currentCharIndex++;
        
        // Update display - overlay typed character
        this.overlayMemoryTypedCharacter(char, currentIndex, isCorrect);
        
        // Position cursor for next character
        this.positionMemoryCursor();
        
        // Update stats
        this.updateMemoryStats();
        
        // Check if code is complete
        if (this.memoryGameState.currentCharIndex === code.length) {
            this.completeMemoryChallenge();
        }
    },
    
    overlayMemoryTypedCharacter: function(char, index, isCorrect) {
        // Get the original character element
        const charElements = document.querySelectorAll('.memory-char-element');
        if (index >= charElements.length) return;
        
        const originalCharEl = charElements[index];
        
        // Create overlay element
        const overlayEl = document.createElement('div');
        overlayEl.className = `memory-typed-overlay-char ${isCorrect ? 'memory-correct' : 'memory-incorrect'}`;
        overlayEl.textContent = char;
        
        // Get position of original character
        const rect = originalCharEl.getBoundingClientRect();
        const containerRect = this.memoryCodeContainer.getBoundingClientRect();
        
        // Position overlay exactly over original character
        overlayEl.style.left = (rect.left - containerRect.left) + 'px';
        overlayEl.style.top = (rect.top - containerRect.top) + 'px';
        overlayEl.style.width = rect.width + 'px';
        overlayEl.style.height = rect.height + 'px';
        
        // Add to container
        this.memoryCodeContainer.appendChild(overlayEl);
        
        // Store reference
        this.memoryGameState.typedChars[this.memoryGameState.typedChars.length - 1].overlayEl = overlayEl;
    },
    
    handleMemoryBackspace: function() {
        if (this.memoryGameState.currentCharIndex > 0) {
            // Remove last typed character overlay
            const lastTyped = this.memoryGameState.typedChars.pop();
            if (lastTyped && lastTyped.overlayEl) {
                lastTyped.overlayEl.remove();
            }
            
            // Move back one character
            this.memoryGameState.currentCharIndex--;
            
            // Update stats (backspace counts as a keystroke)
            this.memoryGameState.totalKeystrokes++;
            
            // Position cursor
            this.positionMemoryCursor();
            
            // Update stats
            this.updateMemoryStats();
        }
    },
    
    handleMemoryTab: function() {
        // Add 2 spaces for tab in memory game
        for (let i = 0; i < 2; i++) {
            this.handleMemoryCharacter(' ');
        }
    },
    
    handleMemoryEnter: function() {
        this.handleMemoryCharacter('\n');
    },
    
    positionMemoryCursor: function() {
        // Remove existing cursor
        const existingCursor = document.querySelector('.memory-typing-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // If completed, don't show cursor
        if (this.memoryGameState.isComplete || this.memoryGameState.currentCharIndex >= this.memoryGameState.currentCode.length) {
            return;
        }
        
        // Get current character element
        const charElements = document.querySelectorAll('.memory-char-element');
        if (this.memoryGameState.currentCharIndex >= charElements.length) return;
        
        const currentCharEl = charElements[this.memoryGameState.currentCharIndex];
        const rect = currentCharEl.getBoundingClientRect();
        const containerRect = this.memoryCodeContainer.getBoundingClientRect();
        
        // Create cursor
        const cursor = document.createElement('div');
        cursor.className = 'memory-typing-cursor';
        cursor.style.left = (rect.left - containerRect.left) + 'px';
        cursor.style.top = (rect.top - containerRect.top) + 'px';
        cursor.style.width = '2px';
        cursor.style.height = rect.height + 'px';
        
        this.memoryCodeContainer.appendChild(cursor);
    },
    
    loadNewMemoryChallenge: function() {
        // Reset game state
        this.resetMemoryGameState();
        
        // Determine if we should give a card reward
        const giveCardReward = Math.random() > 0.6; // 40% chance for card reward
        let challengeData;
        
        if (giveCardReward && this.memoryCardsData.cards.length > 0) {
            // Select a random card that hasn't been unlocked
            const availableCards = this.memoryCardsData.cards.filter(card => 
                !this.memoryGameState.unlockedCards.includes(card.id)
            );
            
            if (availableCards.length > 0) {
                const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
                challengeData = {
                    code: randomCard.code,
                    category: randomCard.category,
                    difficulty: randomCard.difficulty,
                    description: `Type this ${randomCard.category.toLowerCase()} pattern to earn a memory card`,
                    cardReward: randomCard
                };
            }
        }
        
        // If no card reward or no available cards, use regular challenge
        if (!challengeData) {
            const randomChallenge = this.memoryCardsData.challenges[
                Math.floor(Math.random() * this.memoryCardsData.challenges.length)
            ];
            const category = this.memoryCardsData.categories[
                Math.floor(Math.random() * this.memoryCardsData.categories.length)
            ];
            const difficulty = this.memoryCardsData.difficulties[
                Math.floor(Math.random() * this.memoryCardsData.difficulties.length)
            ];
            
            challengeData = {
                code: randomChallenge,
                category: category,
                difficulty: difficulty,
                description: `Type this ${category.toLowerCase()} code snippet`,
                cardReward: null
            };
        }
        
        // Update game state
        this.memoryGameState.currentCode = challengeData.code;
        this.memoryGameState.currentCardReward = challengeData.cardReward;
        
        // Update UI
        this.challengeCategory.textContent = challengeData.category;
        this.challengeDifficulty.textContent = challengeData.difficulty;
        this.challengeDescription.textContent = challengeData.description;
        
        if (challengeData.cardReward) {
            this.cardRewardName.textContent = challengeData.cardReward.name;
            this.updateCardPreview(challengeData.cardReward);
            this.cardPreview.style.display = 'block';
        } else {
            this.cardRewardName.textContent = 'Practice Points Only';
            this.cardPreview.style.display = 'none';
        }
        
        // Update game mode indicator
        document.querySelector('.game-mode-indicator').textContent = 
            this.memoryGameState.currentMode.charAt(0).toUpperCase() + 
            this.memoryGameState.currentMode.slice(1);
        
        // Render code
        this.renderMemoryCode();
        
        // Clear any existing overlays
        document.querySelectorAll('.memory-typed-overlay-char').forEach(el => el.remove());
        
        // Reset stats
        this.updateMemoryStats();
        
        // Reset progress
        this.updateMemoryProgress();
        
        // Focus on typing target
        this.memoryTypingTarget.focus();
        
        // Position cursor at start
        this.positionMemoryCursor();
        
        // Start timer if in timed mode
        if (this.memoryGameState.currentMode === 'timed') {
            this.startTimedMode();
        }
    },
    
    resetMemoryGameState: function() {
        this.memoryGameState.typedChars = [];
        this.memoryGameState.currentCharIndex = 0;
        this.memoryGameState.totalErrors = 0;
        this.memoryGameState.totalKeystrokes = 0;
        this.memoryGameState.isComplete = false;
        this.memoryGameState.startTime = null;
        
        // Clear timer if exists
        if (this.memoryGameState.timerInterval) {
            clearInterval(this.memoryGameState.timerInterval);
            this.memoryGameState.timerInterval = null;
        }
    },
    
    resetCurrentMemoryChallenge: function() {
        this.resetMemoryGameState();
        document.querySelectorAll('.memory-typed-overlay-char').forEach(el => el.remove());
        this.updateMemoryStats();
        this.updateMemoryProgress();
        this.memoryTypingTarget.focus();
        this.positionMemoryCursor();
    },
    
    renderMemoryCode: function() {
        const code = this.memoryGameState.currentCode;
        let html = '';
        
        // Clear container
        this.memoryCodeContainer.innerHTML = '';
        
        // Split code into lines
        const lines = code.split('\n');
        
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'memory-code-line';
            
            // Process each character in the line
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                const charSpan = document.createElement('span');
                charSpan.className = 'memory-char-element';
                charSpan.dataset.index = lineIndex * 1000 + i;
                
                // Handle special characters
                if (char === ' ') {
                    charSpan.innerHTML = '&nbsp;';
                    charSpan.classList.add('memory-space-char');
                } else if (char === '\t') {
                    charSpan.innerHTML = '&nbsp;&nbsp;'; // 2 spaces for memory game
                    charSpan.classList.add('memory-tab-char');
                } else {
                    charSpan.textContent = char;
                    
                    // Add syntax highlighting
                    if (this.isMemoryKeyword(line, i)) {
                        charSpan.classList.add('memory-keyword');
                    } else if (this.isMemoryString(line, i)) {
                        charSpan.classList.add('memory-string');
                    } else if (this.isMemoryNumber(line, i)) {
                        charSpan.classList.add('memory-number');
                    } else if (this.isMemoryOperator(char)) {
                        charSpan.classList.add('memory-operator');
                    } else if (this.isMemorySpecialChar(char)) {
                        charSpan.classList.add('memory-special');
                    }
                }
                
                lineDiv.appendChild(charSpan);
            }
            
            // Add line break if not last line
            if (lineIndex < lines.length - 1) {
                const lineBreak = document.createElement('span');
                lineBreak.className = 'memory-char-element memory-line-break';
                lineBreak.innerHTML = '<br>';
                lineDiv.appendChild(lineBreak);
            }
            
            this.memoryCodeContainer.appendChild(lineDiv);
        }
    },
    
    // Syntax highlighting helpers
    isMemoryKeyword: function(line, index) {
        const keywords = ['const', 'let', 'var', 'function', 'async', 'await', 'return', 'try', 'catch', 
                         'if', 'else', 'for', 'while', 'class', 'new', 'console', 'log', 'fetch'];
        const substr = line.substr(index);
        for (const keyword of keywords) {
            if (substr.startsWith(keyword) && 
                (substr.length === keyword.length || !/\w/.test(substr[keyword.length]))) {
                return true;
            }
        }
        return false;
    },
    
    isMemoryString: function(line, index) {
        const char = line[index];
        return char === '"' || char === "'" || char === '`' || char === '/';
    },
    
    isMemoryNumber: function(line, index) {
        const char = line[index];
        return /\d/.test(char);
    },
    
    isMemoryOperator: function(char) {
        return '=+-*/%<>!&|^~@:.,;?'.includes(char);
    },
    
    isMemorySpecialChar: function(char) {
        return '{}[]()'.includes(char);
    },
    
    updateMemoryStats: function() {
        // Calculate typing speed (WPM)
        let speed = 0;
        if (this.memoryGameState.startTime && !this.memoryGameState.isComplete) {
            const timeElapsed = (new Date() - this.memoryGameState.startTime) / 1000 / 60;
            const wordsTyped = this.memoryGameState.currentCharIndex / 5;
            speed = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        }
        this.memorySpeed.textContent = speed;
        
        // Calculate accuracy
        let accuracy = 100;
        if (this.memoryGameState.totalKeystrokes > 0) {
            accuracy = Math.max(0, Math.round(((this.memoryGameState.totalKeystrokes - this.memoryGameState.totalErrors) / this.memoryGameState.totalKeystrokes) * 100));
        }
        this.memoryAccuracy.textContent = `${accuracy}%`;
        
        // Update time
        let timeElapsed = 0;
        if (this.memoryGameState.startTime && !this.memoryGameState.isComplete) {
            timeElapsed = (new Date() - this.memoryGameState.startTime) / 1000;
        }
        this.memoryTime.textContent = `${timeElapsed.toFixed(1)}s`;
        
        // Calculate score (for current challenge)
        const progress = this.memoryGameState.currentCharIndex / this.memoryGameState.currentCode.length;
        const baseScore = Math.round(progress * 100);
        const accuracyBonus = accuracy;
        const speedBonus = Math.min(speed, 100);
        
        this.memoryGameState.score = Math.round(
            baseScore + 
            (accuracyBonus * 0.5) + 
            (speedBonus * 0.3)
        );
        
        this.memoryScore.textContent = this.memoryGameState.score;
    },
    
    updateMemoryProgress: function() {
        const progress = (this.memoryGameState.currentCharIndex / this.memoryGameState.currentCode.length) * 100;
        this.memoryProgressBar.style.width = `${progress}%`;
        this.memoryProgressText.textContent = `${Math.round(progress)}%`;
        
        // Change progress bar color based on accuracy
        const accuracy = parseInt(this.memoryAccuracy.textContent);
        if (accuracy >= 95) {
            this.memoryProgressBar.style.background = 'linear-gradient(to right, #9b59b6, #8e44ad)';
        } else if (accuracy >= 85) {
            this.memoryProgressBar.style.background = 'linear-gradient(to right, #3498db, #2980b9)';
        } else {
            this.memoryProgressBar.style.background = 'linear-gradient(to right, #e74c3c, #c0392b)';
        }
    },
    
    startMemoryTimer: function() {
        if (this.memoryTimerInterval) {
            clearInterval(this.memoryTimerInterval);
        }
        
        this.memoryTimerInterval = setInterval(() => {
            if (!this.memoryGameState.isComplete && this.memoryGameState.startTime) {
                this.updateMemoryStats();
                this.updateMemoryProgress();
            }
        }, 100);
    },
    
    startTimedMode: function() {
        // Set time limit based on code length
        const codeLength = this.memoryGameState.currentCode.length;
        this.memoryGameState.timeLimit = Math.max(30, Math.min(codeLength * 0.5, 120)); // 30-120 seconds
        
        // Start countdown timer
        let timeLeft = this.memoryGameState.timeLimit;
        const timerDisplay = document.createElement('div');
        timerDisplay.className = 'timed-mode-timer';
        timerDisplay.innerHTML = `<i class="fas fa-hourglass-half"></i> Time: ${timeLeft}s`;
        
        const challengeSection = document.querySelector('.challenge-section');
        challengeSection.appendChild(timerDisplay);
        
        this.memoryGameState.timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.innerHTML = `<i class="fas fa-hourglass-half"></i> Time: ${timeLeft}s`;
            
            if (timeLeft <= 10) {
                timerDisplay.classList.add('warning');
            }
            
            if (timeLeft <= 0) {
                clearInterval(this.memoryGameState.timerInterval);
                this.showFeedback('Time\'s up! Challenge failed.', 'error');
                setTimeout(() => this.loadNewMemoryChallenge(), 2000);
            }
        }, 1000);
    },
    
    completeMemoryChallenge: function() {
        this.memoryGameState.isComplete = true;
        this.memoryGameState.totalChallenges++;
        this.memoryGameState.completedChallenges++;
        this.memoryGameState.streak++;
        this.memoryGameState.bestStreak = Math.max(this.memoryGameState.bestStreak, this.memoryGameState.streak);
        
        // Stop timer
        clearInterval(this.memoryTimerInterval);
        if (this.memoryGameState.timerInterval) {
            clearInterval(this.memoryGameState.timerInterval);
            this.memoryGameState.timerInterval = null;
        }
        
        // Remove cursor
        const cursor = document.querySelector('.memory-typing-cursor');
        if (cursor) cursor.remove();
        
        // Calculate final stats
        const timeTaken = this.memoryGameState.startTime ? 
            (new Date() - this.memoryGameState.startTime) / 1000 : 0;
        const words = this.memoryGameState.currentCode.length / 5;
        const minutes = timeTaken / 60;
        const finalSpeed = minutes > 0 ? Math.round(words / minutes) : 0;
        const finalAccuracy = this.memoryGameState.totalKeystrokes > 0 ?
            Math.round(((this.memoryGameState.totalKeystrokes - this.memoryGameState.totalErrors) / this.memoryGameState.totalKeystrokes) * 100) : 100;
        
        // Calculate final score
        const timeBonus = Math.max(0, 30 - timeTaken);
        const accuracyBonus = finalAccuracy;
        const lengthBonus = this.memoryGameState.currentCode.length * 0.1;
        const streakBonus = this.memoryGameState.streak * 10;
        const modeMultiplier = this.memoryGameState.currentMode === 'timed' ? 1.5 : 1;
        
        const finalScore = Math.round(
            (100 + timeBonus + accuracyBonus + lengthBonus + streakBonus) * modeMultiplier
        );
        
        // Update results panel
        document.getElementById('finalMemorySpeed').textContent = `${finalSpeed} WPM`;
        document.getElementById('finalMemoryAccuracy').textContent = `${finalAccuracy}%`;
        document.getElementById('finalMemoryTime').textContent = `${timeTaken.toFixed(2)}s`;
        
        // Check if card was earned
        if (this.memoryGameState.currentCardReward) {
            // Add card to collection if not already there
            if (!this.memoryGameState.unlockedCards.includes(this.memoryGameState.currentCardReward.id)) {
                this.memoryGameState.unlockedCards.push(this.memoryGameState.currentCardReward.id);
                this.memoryGameState.memoryCards.push(this.memoryGameState.currentCardReward);
                
                // Update UI
                document.getElementById('earnedCardName').textContent = this.memoryGameState.currentCardReward.name;
                document.getElementById('newCardEarned').style.display = 'block';
                
                // Show earned card preview
                const earnedCardPreview = document.getElementById('earnedCardPreview');
                earnedCardPreview.innerHTML = this.createCardHTML(this.memoryGameState.currentCardReward);
                
                // Update cards count
                this.updateCardsDisplay();
                
                this.showFeedback(`🎉 Card Unlocked: ${this.memoryGameState.currentCardReward.name}`, 'success');
            }
        } else {
            document.getElementById('earnedCardName').textContent = 'Practice Points';
            document.getElementById('newCardEarned').style.display = 'none';
        }
        
        // Show results panel
        this.memoryResultsPanel.style.display = 'block';
        setTimeout(() => {
            this.memoryResultsPanel.style.opacity = '1';
            this.memoryResultsPanel.style.transform = 'translateY(0)';
        }, 10);
        
        // Check for achievements
        this.checkMemoryAchievements(finalSpeed, finalAccuracy);
    },
    
    nextMemoryChallenge: function() {
        // Hide results panel
        this.memoryResultsPanel.style.opacity = '0';
        this.memoryResultsPanel.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.loadNewMemoryChallenge();
        }, 300);
    },
    
    changeMemoryMode: function(mode) {
        // Update active button
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update game state
        this.memoryGameState.currentMode = mode;
        
        // Load new challenge with new mode
        this.loadNewMemoryChallenge();
    },
    
    showMemoryHint: function() {
        const hints = {
            practice: "Focus on accuracy. Take your time to type each character correctly.",
            timed: "Balance speed and accuracy. Watch the timer!",
            memory: "Try to remember the code patterns for future reference."
        };
        
        const currentHint = hints[this.memoryGameState.currentMode] || 
                           "Pay attention to special characters like brackets, quotes, and backticks.";
        
        this.showFeedback(`💡 Hint: ${currentHint}`, 'info');
    },
    
    showSpecialCharsHelp: function() {
        const helpText = `
            Special Characters Guide:
            • Backticks (\`) for template literals
            • Curly braces {} for code blocks
            • Parentheses () for functions
            • Square brackets [] for arrays
            • Quotes ' " for strings
            • Semicolon ; for statement endings
        `;
        
        this.showFeedback(helpText, 'info');
    },
    
    showMemoryCards: function() {
        // Toggle cards display
        const cardsSection = document.querySelector('.memory-cards-section');
        if (cardsSection.style.display === 'none') {
            cardsSection.style.display = 'block';
            this.updateCardsDisplay();
        } else {
            cardsSection.style.display = 'none';
        }
    },
    
    updateCardsDisplay: function() {
        const container = this.memoryCardsContainer;
        
        // Update cards count
        this.cardsCount.textContent = `(${this.memoryGameState.memoryCards.length})`;
        
        if (this.memoryGameState.memoryCards.length === 0) {
            container.innerHTML = `
                <div class="no-cards-message">
                    <i class="fas fa-inbox"></i>
                    <p>Complete typing challenges to unlock memory cards!</p>
                </div>
            `;
            return;
        }
        
        // Display cards
        container.innerHTML = '';
        this.memoryGameState.memoryCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card-item';
            cardElement.innerHTML = this.createCardHTML(card);
            container.appendChild(cardElement);
        });
    },
    
    createCardHTML: function(card) {
        return `
            <div class="card" style="border-color: ${card.color}">
                <div class="card-header" style="background: ${card.color}">
                    ${card.category}
                    <span class="card-difficulty">${card.difficulty}</span>
                </div>
                <div class="card-body">
                    <h5>${card.name}</h5>
                    <p class="card-description">${card.description}</p>
                    <div class="card-code-preview">
                        <code>${card.code.substring(0, 40)}${card.code.length > 40 ? '...' : ''}</code>
                    </div>
                    <div class="card-points">
                        <i class="fas fa-star"></i> ${card.points} points
                    </div>
                </div>
                <div class="card-footer">
                    Card #${card.id}
                </div>
            </div>
        `;
    },
    
    updateCardPreview: function(card) {
        this.cardPreview.innerHTML = `
            <div class="card-front" style="border-color: ${card.color}">
                <div class="card-header" style="background: ${card.color}">${card.category}</div>
                <div class="card-content">
                    <h5>${card.name}</h5>
                    <p>${card.description}</p>
                    <div class="card-preview-code">
                        <code>${card.code.substring(0, 50)}${card.code.length > 50 ? '...' : ''}</code>
                    </div>
                </div>
                <div class="card-footer">Earn ${card.points} points</div>
            </div>
        `;
    },
    
    checkMemoryAchievements: function(speed, accuracy) {
        const newAchievements = [];
        
        // Speed achievements
        if (speed >= 80 && !this.memoryGameState.achievements.includes('speed_demon')) {
            newAchievements.push({name: 'Speed Demon', description: '80+ WPM typing speed'});
            this.memoryGameState.achievements.push('speed_demon');
        }
        
        // Accuracy achievements
        if (accuracy === 100 && !this.memoryGameState.achievements.includes('perfectionist')) {
            newAchievements.push({name: 'Perfectionist', description: '100% accuracy on challenge'});
            this.memoryGameState.achievements.push('perfectionist');
        }
        
        // Card achievements
        if (this.memoryGameState.memoryCards.length >= 5 && !this.memoryGameState.achievements.includes('card_collector')) {
            newAchievements.push({name: 'Card Collector', description: 'Collected 5+ memory cards'});
            this.memoryGameState.achievements.push('card_collector');
        }
        
        // Streak achievements
        if (this.memoryGameState.streak >= 5 && !this.memoryGameState.achievements.includes('hot_streak')) {
            newAchievements.push({name: 'Hot Streak', description: '5+ consecutive challenges'});
            this.memoryGameState.achievements.push('hot_streak');
        }
        
        // Show achievement notification if any earned
        if (newAchievements.length > 0) {
            this.showMemoryAchievementNotification(newAchievements);
        }
    },
    
    showMemoryAchievementNotification: function(achievements) {
        const notification = document.createElement('div');
        notification.className = 'memory-achievement-notification';
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
    
    showFeedback: function(message, type) {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.memory-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `memory-feedback memory-feedback-${type}`;
        feedback.innerHTML = message;
        
        // Add to DOM
        document.querySelector('.memory-game-container').appendChild(feedback);
        
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
    
    startMemoryGame: function() {
        // Add CSS for memory game
        const style = document.createElement('style');
        style.textContent = `
            .memory-game-container {
                background: rgba(40, 40, 80, 0.9);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 20px;
                border: 1px solid rgba(155, 89, 182, 0.3);
            }
            
            .game-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(155, 89, 182, 0.2);
            }
            
            .game-header h3 {
                color: #9b59b6;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .game-mode-indicator {
                background: rgba(155, 89, 182, 0.2);
                padding: 3px 10px;
                border-radius: 12px;
                font-size: 0.8rem;
                color: #9b59b6;
                font-weight: bold;
            }
            
            .game-actions {
                display: flex;
                gap: 10px;
            }
            
            .mode-selector {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            .mode-btn {
                padding: 8px 16px;
                background: rgba(155, 89, 182, 0.1);
                border: 1px solid rgba(155, 89, 182, 0.3);
                color: #d7bde2;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .mode-btn:hover {
                background: rgba(155, 89, 182, 0.2);
            }
            
            .mode-btn.active {
                background: #9b59b6;
                color: white;
                font-weight: bold;
            }
            
            .challenge-section {
                background: rgba(30, 30, 60, 0.7);
                border-radius: 10px;
                padding: 25px;
                margin-bottom: 25px;
            }
            
            .challenge-info {
                margin-bottom: 20px;
            }
            
            .challenge-type {
                display: flex;
                gap: 10px;
                margin-bottom: 10px;
            }
            
            .challenge-tag {
                background: rgba(155, 89, 182, 0.2);
                color: #9b59b6;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: bold;
            }
            
            .challenge-difficulty {
                background: rgba(52, 152, 219, 0.2);
                color: #3498db;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: bold;
            }
            
            .challenge-description p {
                color: #b0b0ff;
                margin: 0;
                font-size: 1.1rem;
            }
            
            .code-typing-area {
                margin-bottom: 25px;
            }
            
            .typing-target {
                position: relative;
                background: rgba(10, 10, 30, 0.9);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 15px;
                border: 1px solid rgba(155, 89, 182, 0.2);
                min-height: 200px;
                overflow-x: auto;
                cursor: text;
                outline: none;
            }
            
            .typing-target:focus {
                border-color: #9b59b6;
                box-shadow: 0 0 15px rgba(155, 89, 182, 0.3);
            }
            
            .code-container {
                position: relative;
                font-family: 'Fira Code', 'Courier New', monospace;
                font-size: 1.1rem;
                line-height: 1.6;
                color: rgba(224, 224, 255, 0.8);
                white-space: pre-wrap;
                user-select: none;
            }
            
            .memory-code-line {
                position: relative;
                min-height: 1.6em;
            }
            
            .memory-char-element {
                position: relative;
                display: inline-block;
                min-width: 8px;
            }
            
            .memory-char-element.memory-keyword {
                color: #ff79c6;
                font-weight: 500;
            }
            
            .memory-char-element.memory-string {
                color: #f1fa8c;
            }
            
            .memory-char-element.memory-number {
                color: #bd93f9;
            }
            
            .memory-char-element.memory-operator {
                color: #ffb86c;
            }
            
            .memory-char-element.memory-special {
                color: #50fa7b;
                font-weight: bold;
            }
            
            .memory-char-element.memory-space-char {
                background-color: rgba(255, 255, 255, 0.05);
                border-radius: 2px;
            }
            
            .memory-typed-overlay-char {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Fira Code', 'Courier New', monospace;
                font-size: 1.1rem;
                font-weight: bold;
                z-index: 10;
                pointer-events: none;
                animation: memoryFadeIn 0.1s ease-out;
                border-radius: 2px;
            }
            
            .memory-typed-overlay-char.memory-correct {
                color: #50fa7b;
                background-color: rgba(80, 250, 123, 0.1);
            }
            
            .memory-typed-overlay-char.memory-incorrect {
                color: #ff5555;
                background-color: rgba(255, 85, 85, 0.15);
                text-decoration: underline;
            }
            
            @keyframes memoryFadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .memory-typing-cursor {
                position: absolute;
                background-color: #9b59b6;
                width: 2px;
                z-index: 20;
                pointer-events: none;
                animation: memoryBlink 1s infinite;
            }
            
            @keyframes memoryBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            .card-reward-section {
                background: rgba(155, 89, 182, 0.1);
                border-radius: 10px;
                padding: 20px;
                margin-top: 20px;
                border-left: 4px solid #9b59b6;
            }
            
            .card-reward-info h4 {
                color: #9b59b6;
                margin: 0 0 10px 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .card-reward-info p {
                color: #d7bde2;
                margin: 0 0 15px 0;
            }
            
            .card-preview {
                max-width: 300px;
                margin: 0 auto;
            }
            
            .card {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                border: 2px solid;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            
            .card-header {
                color: white;
                padding: 12px;
                font-weight: bold;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .card-difficulty {
                background: rgba(255,255,255,0.2);
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 0.8rem;
            }
            
            .card-content {
                padding: 15px;
            }
            
            .card-content h5 {
                margin: 0 0 10px 0;
                color: #2c3e50;
            }
            
            .card-content p {
                margin: 0 0 10px 0;
                color: #7f8c8d;
                font-size: 0.9rem;
            }
            
            .card-preview-code {
                background: #f8f9fa;
                padding: 10px;
                border-radius: 5px;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                color: #2c3e50;
            }
            
            .card-footer {
                padding: 10px;
                background: #f8f9fa;
                color: #95a5a6;
                font-size: 0.8rem;
                text-align: center;
            }
            
            .card-points {
                display: flex;
                align-items: center;
                gap: 5px;
                color: #f39c12;
                font-weight: bold;
                margin-top: 10px;
            }
            
            .typing-stats-section {
                margin: 25px 0;
            }
            
            .typing-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .typing-stat {
                background: rgba(30, 30, 60, 0.7);
                border-radius: 10px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: transform 0.3s;
            }
            
            .typing-stat:hover {
                transform: translateY(-2px);
            }
            
            .stat-icon {
                width: 50px;
                height: 50px;
                background: rgba(155, 89, 182, 0.2);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: #9b59b6;
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
            
            .memory-cards-section {
                background: rgba(30, 30, 60, 0.7);
                border-radius: 10px;
                padding: 20px;
                margin: 25px 0;
            }
            
            .memory-cards-section h4 {
                color: #9b59b6;
                margin: 0 0 20px 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .cards-count {
                background: rgba(155, 89, 182, 0.2);
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 0.8rem;
            }
            
            .cards-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
            }
            
            .memory-card-item {
                transition: transform 0.3s;
            }
            
            .memory-card-item:hover {
                transform: translateY(-5px);
            }
            
            .no-cards-message {
                grid-column: 1 / -1;
                text-align: center;
                padding: 40px;
                color: #b0b0ff;
            }
            
            .no-cards-message i {
                font-size: 3rem;
                margin-bottom: 15px;
                color: #9b59b6;
                opacity: 0.5;
            }
            
            .new-card-earned {
                background: rgba(46, 204, 113, 0.1);
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #2ecc71;
            }
            
            .new-card-earned h4 {
                color: #2ecc71;
                margin: 0 0 15px 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .earned-card-preview {
                max-width: 300px;
                margin: 0 auto 15px;
            }
            
            .memory-feedback {
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
                max-width: 80%;
                text-align: center;
            }
            
            .memory-feedback-success {
                background: linear-gradient(to right, #2ecc71, #27ae60);
                color: white;
            }
            
            .memory-feedback-error {
                background: linear-gradient(to right, #e74c3c, #c0392b);
                color: white;
            }
            
            .memory-feedback-info {
                background: linear-gradient(to right, #3498db, #2980b9);
                color: white;
            }
            
            .timed-mode-timer {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(231, 76, 60, 0.2);
                color: #e74c3c;
                padding: 8px 15px;
                border-radius: 20px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .timed-mode-timer.warning {
                background: rgba(231, 76, 60, 0.3);
                animation: pulse 1s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
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
            
            @media (max-width: 768px) {
                .game-header {
                    flex-direction: column;
                    gap: 15px;
                    align-items: flex-start;
                }
                
                .game-actions {
                    width: 100%;
                    justify-content: center;
                }
                
                .typing-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .cards-container {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .code-container {
                    font-size: 1rem;
                }
                
                .memory-typed-overlay-char {
                    font-size: 1rem;
                }
                
                .mode-selector {
                    flex-wrap: wrap;
                }
            }
            
            @media (max-width: 480px) {
                .typing-stats {
                    grid-template-columns: 1fr;
                }
                
                .cards-container {
                    grid-template-columns: 1fr;
                }
                
                .code-container {
                    font-size: 0.9rem;
                }
                
                .memory-typed-overlay-char {
                    font-size: 0.9rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Focus on typing target
        this.memoryTypingTarget.focus();
    }
};