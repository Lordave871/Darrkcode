window.SyntaxSort = {
    init: function(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3><i class="fas fa-terminal"></i> TypeSkill Hacker Mode</h3>
                <p>Arrange the code blocks in the correct order! Then type the complete code to prove your skills.</p>
                <div class="puzzle-controls">
                    <button class="puzzle-btn active" data-mode="syntax">Syntax Puzzle</button>
                    <button class="puzzle-btn" data-mode="logic">Logic Puzzle</button>
                    <button class="puzzle-btn" data-mode="algorithm">Algorithm Puzzle</button>
                </div>
            </div>
            
            <div class="syntax-game-container">
                <div class="game-header">
                    <h3><i class="fas fa-code"></i> Code Puzzle <span class="puzzle-mode-indicator">Syntax</span></h3>
                    <div class="game-actions">
                        <button class="action-btn" id="newPuzzleBtn">
                            <i class="fas fa-redo"></i> New Puzzle
                        </button>
                        <button class="action-btn" id="puzzleHintBtn">
                            <i class="fas fa-lightbulb"></i> Hint
                        </button>
                        <button class="action-btn" id="puzzleSolutionBtn">
                            <i class="fas fa-eye"></i> Show Solution
                        </button>
                    </div>
                </div>
                
                <div class="puzzle-info-section">
                    <div class="puzzle-description">
                        <div class="puzzle-type">
                            <span class="puzzle-category" id="puzzleCategory">Function Definition</span>
                            <span class="puzzle-difficulty" id="puzzleDifficulty">Easy</span>
                        </div>
                        <div class="puzzle-instructions">
                            <p><i class="fas fa-mouse-pointer"></i> <strong>Step 1:</strong> Drag and drop the code blocks into the correct order</p>
                            <p><i class="fas fa-keyboard"></i> <strong>Step 2:</strong> Type the complete code in the correct sequence</p>
                        </div>
                    </div>
                    
                    <div class="puzzle-progress">
                        <div class="progress-stage">
                            <div class="stage-icon">
                                <i class="fas fa-list-ol"></i>
                            </div>
                            <div class="stage-text">
                                <span class="stage-label">Puzzle Order</span>
                                <span class="stage-status" id="orderStatus">Not Verified</span>
                            </div>
                        </div>
                        <div class="progress-stage">
                            <div class="stage-icon">
                                <i class="fas fa-keyboard"></i>
                            </div>
                            <div class="stage-text">
                                <span class="stage-label">Typing Test</span>
                                <span class="stage-status" id="typingStatus">Not Started</span>
                            </div>
                        </div>
                        <div class="progress-stage">
                            <div class="stage-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="stage-text">
                                <span class="stage-label">Puzzle Score</span>
                                <span class="stage-status" id="puzzleScore">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="puzzle-section">
                    <div class="puzzle-drag-area">
                        <h4><i class="fas fa-sort"></i> Arrange Code Blocks</h4>
                        <div class="drag-instructions">
                            <p><i class="fas fa-info-circle"></i> Drag blocks to reorder. Green = correct position, Red = wrong position</p>
                        </div>
                        <div class="syntax-sort-container" id="syntaxSortContainer">
                            <!-- Code blocks will be dynamically inserted here -->
                        </div>
                        <div class="puzzle-controls">
                            <button class="action-btn" id="checkOrderBtn">
                                <i class="fas fa-check"></i> Check Order
                            </button>
                            <button class="action-btn" id="resetOrderBtn">
                                <i class="fas fa-undo"></i> Reset Order
                            </button>
                            <button class="action-btn" id="autoArrangeBtn">
                                <i class="fas fa-magic"></i> Auto-arrange
                            </button>
                        </div>
                    </div>
                    
                    <div class="puzzle-typing-area">
                        <h4><i class="fas fa-keyboard"></i> Type the Complete Code</h4>
                        <div class="typing-instructions">
                            <p><i class="fas fa-code"></i> Now type the complete code based on your arrangement above</p>
                        </div>
                        <div class="code-preview" id="codePreview">
                            <!-- Complete code preview will be shown here -->
                        </div>
                        <div class="typing-target" id="puzzleTypingTarget" tabindex="0">
                            <div class="code-container" id="puzzleCodeContainer">
                                <!-- Typing area for the complete code -->
                            </div>
                        </div>
                        <div class="typing-stats">
                            <div class="typing-stat">
                                <span>Typing Progress</span>
                                <span class="stat-value" id="typingProgress">0%</span>
                            </div>
                            <div class="typing-stat">
                                <span>Typing Accuracy</span>
                                <span class="stat-value" id="typingAccuracy">100%</span>
                            </div>
                            <div class="typing-stat">
                                <span>Time</span>
                                <span class="stat-value" id="typingTime">0.0s</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="puzzle-stats-section">
                    <div class="stats-grid">
                        <div class="stat-box">
                            <div class="stat-icon">
                                <i class="fas fa-puzzle-piece"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Puzzles Solved</span>
                                <span class="stat-value" id="puzzlesSolved">0</span>
                            </div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-icon">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Order Accuracy</span>
                                <span class="stat-value" id="orderAccuracy">0%</span>
                            </div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Avg. Typing Speed</span>
                                <span class="stat-value" id="avgTypingSpeed">0 WPM</span>
                            </div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Total Score</span>
                                <span class="stat-value" id="totalScore">0</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="puzzle-hints-section">
                    <div class="hints-container">
                        <h4><i class="fas fa-lightbulb"></i> Puzzle Hints</h4>
                        <div class="hints-list" id="hintsList">
                            <!-- Hints will be dynamically added here -->
                        </div>
                        <div class="hint-controls">
                            <button class="hint-btn" id="nextHintBtn">
                                <i class="fas fa-forward"></i> Next Hint
                            </button>
                            <button class="hint-btn" id="revealHintBtn">
                                <i class="fas fa-eye"></i> Reveal Hint
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="puzzle-results-panel" id="puzzleResultsPanel">
                    <div class="results-content">
                        <h3><i class="fas fa-trophy"></i> Puzzle Complete!</h3>
                        <div class="results-summary">
                            <div class="result-stat">
                                <span>Puzzle Score:</span>
                                <span class="result-value" id="finalPuzzleScore">0</span>
                            </div>
                            <div class="result-stat">
                                <span>Order Accuracy:</span>
                                <span class="result-value" id="finalOrderAccuracy">0%</span>
                            </div>
                            <div class="result-stat">
                                <span>Typing Speed:</span>
                                <span class="result-value" id="finalTypingSpeed">0 WPM</span>
                            </div>
                            <div class="result-stat">
                                <span>Typing Accuracy:</span>
                                <span class="result-value" id="finalTypingAccuracy">100%</span>
                            </div>
                            <div class="result-stat">
                                <span>Time Taken:</span>
                                <span class="result-value" id="finalTimeTaken">0.0s</span>
                            </div>
                        </div>
                        
                        <div class="achievements-earned">
                            <h4><i class="fas fa-award"></i> Achievements Earned</h4>
                            <div class="achievements-list" id="achievementsList">
                                <!-- Achievements will be added here -->
                            </div>
                        </div>
                        
                        <div class="results-actions">
                            <button class="action-btn primary" id="nextPuzzleBtn">
                                <i class="fas fa-forward"></i> Next Puzzle
                            </button>
                            <button class="action-btn" id="retryPuzzleBtn">
                                <i class="fas fa-redo"></i> Try Again
                            </button>
                            <button class="action-btn" id="sharePuzzleBtn">
                                <i class="fas fa-share-alt"></i> Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="keyboard-shortcuts">
                <h4><i class="fas fa-keyboard"></i> Puzzle Shortcuts</h4>
                <div class="shortcuts-grid">
                    <div class="shortcut">
                        <kbd>Space</kbd>
                        <span>Check puzzle order</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Tab</kbd>
                        <span>Switch to typing area</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + S</kbd>
                        <span>New puzzle</span>
                    </div>
                    <div class="shortcut">
                        <kbd>H</kbd>
                        <span>Show hint</span>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize the syntax sort game
        setTimeout(() => this.initSyntaxSortGame(), 100);
    },
    
    initSyntaxSortGame: function() {
        // Game state for syntax sort
        this.puzzleGameState = {
            currentPuzzle: null,
            currentCodeBlocks: [],
            correctOrder: [],
            currentOrder: [],
            isOrderCorrect: false,
            isTypingComplete: false,
            isTypingStarted: false,
            currentMode: 'syntax',
            score: 0,
            puzzlesSolved: 0,
            orderAttempts: 0,
            correctOrderAttempts: 0,
            typingStartTime: null,
            typingEndTime: null,
            typingErrors: 0,
            typingKeystrokes: 0,
            typingAccuracy: 100,
            typingSpeed: 0,
            totalScore: 0,
            hintsUsed: 0,
            hintsRevealed: 0,
            achievements: [],
            currentHintIndex: 0,
            isDragging: false,
            dragSource: null,
            dragTarget: null
        };
        
        // Puzzle database
        this.puzzleDatabase = {
            syntax: [
                {
                    id: 1,
                    category: 'Function Definition',
                    difficulty: 'Easy',
                    description: 'Arrange the function definition in correct order',
                    codeBlocks: [
                        "function calculateSum(a, b) {",
                        "    return a + b;",
                        "}",
                        "const result = calculateSum(5, 3);",
                        "console.log(result);"
                    ],
                    hints: [
                        "Function declarations start with 'function' keyword",
                        "The function body goes between curly braces",
                        "Functions are called with parentheses",
                        "Results are often stored in variables",
                        "Use console.log to output results"
                    ],
                    solution: "function calculateSum(a, b) {\n    return a + b;\n}\nconst result = calculateSum(5, 3);\nconsole.log(result);",
                    points: 100
                },
                {
                    id: 2,
                    category: 'If-Else Statement',
                    difficulty: 'Easy',
                    description: 'Arrange the conditional logic in correct order',
                    codeBlocks: [
                        "if (score >= 90) {",
                        "    console.log('Grade: A');",
                        "} else if (score >= 80) {",
                        "    console.log('Grade: B');",
                        "} else {",
                        "    console.log('Grade: C');",
                        "}"
                    ],
                    hints: [
                        "if statements start with the condition",
                        "else if comes after if",
                        "else comes last",
                        "Each block has its own curly braces",
                        "Conditions go inside parentheses"
                    ],
                    solution: "if (score >= 90) {\n    console.log('Grade: A');\n} else if (score >= 80) {\n    console.log('Grade: B');\n} else {\n    console.log('Grade: C');\n}",
                    points: 120
                },
                {
                    id: 3,
                    category: 'For Loop',
                    difficulty: 'Medium',
                    description: 'Arrange the loop structure correctly',
                    codeBlocks: [
                        "for (let i = 0; i < 10; i++) {",
                        "    console.log(i);",
                        "}"
                    ],
                    hints: [
                        "for loops have three parts: initialization, condition, increment",
                        "The loop body goes inside curly braces",
                        "Semicolons separate the three parts",
                        "Variable declaration comes first"
                    ],
                    solution: "for (let i = 0; i < 10; i++) {\n    console.log(i);\n}",
                    points: 150
                }
            ],
            
            logic: [
                {
                    id: 4,
                    category: 'Array Methods',
                    difficulty: 'Medium',
                    description: 'Arrange array operations in logical order',
                    codeBlocks: [
                        "const numbers = [1, 2, 3, 4, 5];",
                        "const doubled = numbers.map(num => num * 2);",
                        "const evenNumbers = doubled.filter(num => num % 2 === 0);",
                        "const sum = evenNumbers.reduce((total, num) => total + num, 0);",
                        "console.log(sum);"
                    ],
                    hints: [
                        "First declare the array",
                        "map() transforms each element",
                        "filter() selects elements based on condition",
                        "reduce() accumulates values",
                        "Finally, log the result"
                    ],
                    solution: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconst evenNumbers = doubled.filter(num => num % 2 === 0);\nconst sum = evenNumbers.reduce((total, num) => total + num, 0);\nconsole.log(sum);",
                    points: 200
                },
                {
                    id: 5,
                    category: 'Promise Chain',
                    difficulty: 'Hard',
                    description: 'Arrange promise-based async operations',
                    codeBlocks: [
                        "fetch('https://api.example.com/data')",
                        "    .then(response => response.json())",
                        "    .then(data => {",
                        "        console.log(data);",
                        "        return processData(data);",
                        "    })",
                        "    .catch(error => console.error(error));"
                    ],
                    hints: [
                        "Start with the fetch() call",
                        ".then() handles successful responses",
                        ".json() parses the response",
                        "Additional .then() for data processing",
                        ".catch() handles errors"
                    ],
                    solution: "fetch('https://api.example.com/data')\n    .then(response => response.json())\n    .then(data => {\n        console.log(data);\n        return processData(data);\n    })\n    .catch(error => console.error(error));",
                    points: 250
                }
            ],
            
            algorithm: [
                {
                    id: 6,
                    category: 'Binary Search',
                    difficulty: 'Hard',
                    description: 'Arrange the binary search algorithm',
                    codeBlocks: [
                        "function binarySearch(arr, target) {",
                        "    let left = 0;",
                        "    let right = arr.length - 1;",
                        "    while (left <= right) {",
                        "        const mid = Math.floor((left + right) / 2);",
                        "        if (arr[mid] === target) {",
                        "            return mid;",
                        "        }",
                        "        if (arr[mid] < target) {",
                        "            left = mid + 1;",
                        "        } else {",
                        "            right = mid - 1;",
                        "        }",
                        "    }",
                        "    return -1;",
                        "}"
                    ],
                    hints: [
                        "Function definition comes first",
                        "Initialize left and right pointers",
                        "While loop continues while left <= right",
                        "Calculate mid point",
                        "Compare with target and adjust pointers",
                        "Return -1 if not found"
                    ],
                    solution: "function binarySearch(arr, target) {\n    let left = 0;\n    let right = arr.length - 1;\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        if (arr[mid] === target) {\n            return mid;\n        }\n        if (arr[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return -1;\n}",
                    points: 300
                },
                {
                    id: 7,
                    category: 'Quick Sort',
                    difficulty: 'Expert',
                    description: 'Arrange the quick sort algorithm',
                    codeBlocks: [
                        "function quickSort(arr) {",
                        "    if (arr.length <= 1) {",
                        "        return arr;",
                        "    }",
                        "    const pivot = arr[Math.floor(arr.length / 2)];",
                        "    const left = [];",
                        "    const right = [];",
                        "    for (let i = 0; i < arr.length; i++) {",
                        "        if (i === Math.floor(arr.length / 2)) {",
                        "            continue;",
                        "        }",
                        "        if (arr[i] < pivot) {",
                        "            left.push(arr[i]);",
                        "        } else {",
                        "            right.push(arr[i]);",
                        "        }",
                        "    }",
                        "    return [...quickSort(left), pivot, ...quickSort(right)];",
                        "}"
                    ],
                    hints: [
                        "Base case: array length <= 1",
                        "Choose a pivot element",
                        "Create left and right arrays",
                        "Partition elements around pivot",
                        "Recursively sort left and right",
                        "Combine results with pivot"
                    ],
                    solution: "function quickSort(arr) {\n    if (arr.length <= 1) {\n        return arr;\n    }\n    const pivot = arr[Math.floor(arr.length / 2)];\n    const left = [];\n    const right = [];\n    for (let i = 0; i < arr.length; i++) {\n        if (i === Math.floor(arr.length / 2)) {\n            continue;\n        }\n        if (arr[i] < pivot) {\n            left.push(arr[i]);\n        } else {\n            right.push(arr[i]);\n        }\n    }\n    return [...quickSort(left), pivot, ...quickSort(right)];\n}",
                    points: 350
                }
            ]
        };
        
        // Initialize UI elements
        this.syntaxSortContainer = document.getElementById('syntaxSortContainer');
        this.puzzleTypingTarget = document.getElementById('puzzleTypingTarget');
        this.puzzleCodeContainer = document.getElementById('puzzleCodeContainer');
        this.codePreview = document.getElementById('codePreview');
        this.puzzleCategory = document.getElementById('puzzleCategory');
        this.puzzleDifficulty = document.getElementById('puzzleDifficulty');
        this.orderStatus = document.getElementById('orderStatus');
        this.typingStatus = document.getElementById('typingStatus');
        this.puzzleScore = document.getElementById('puzzleScore');
        this.typingProgress = document.getElementById('typingProgress');
        this.typingAccuracy = document.getElementById('typingAccuracy');
        this.typingTime = document.getElementById('typingTime');
        this.puzzlesSolved = document.getElementById('puzzlesSolved');
        this.orderAccuracy = document.getElementById('orderAccuracy');
        this.avgTypingSpeed = document.getElementById('avgTypingSpeed');
        this.totalScore = document.getElementById('totalScore');
        this.hintsList = document.getElementById('hintsList');
        this.puzzleResultsPanel = document.getElementById('puzzleResultsPanel');
        
        // Load first puzzle
        this.loadNewPuzzle();
        
        // Event listeners
        this.setupPuzzleEventListeners();
        
        // Initialize drag and drop
        this.initDragAndDrop();
        
        // Start the game
        this.startSyntaxSortGame();
    },
    
    setupPuzzleEventListeners: function() {
        // Puzzle mode buttons
        document.querySelectorAll('.puzzle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changePuzzleMode(e.target.dataset.mode));
        });
        
        // Action buttons
        document.getElementById('newPuzzleBtn').addEventListener('click', () => this.loadNewPuzzle());
        document.getElementById('puzzleHintBtn').addEventListener('click', () => this.showPuzzleHint());
        document.getElementById('puzzleSolutionBtn').addEventListener('click', () => this.showSolution());
        document.getElementById('checkOrderBtn').addEventListener('click', () => this.checkOrder());
        document.getElementById('resetOrderBtn').addEventListener('click', () => this.resetOrder());
        document.getElementById('autoArrangeBtn').addEventListener('click', () => this.autoArrange());
        document.getElementById('nextHintBtn').addEventListener('click', () => this.nextHint());
        document.getElementById('revealHintBtn').addEventListener('click', () => this.revealHint());
        document.getElementById('nextPuzzleBtn').addEventListener('click', () => this.nextPuzzle());
        document.getElementById('retryPuzzleBtn').addEventListener('click', () => this.retryPuzzle());
        document.getElementById('sharePuzzleBtn').addEventListener('click', () => this.sharePuzzleResults());
        
        // Typing events
        this.puzzleTypingTarget.addEventListener('keydown', (e) => this.handlePuzzleKeyDown(e));
        this.puzzleTypingTarget.addEventListener('click', () => {
            this.puzzleTypingTarget.focus();
            this.positionPuzzleCursor();
        });
        
        // Global shortcuts
        document.addEventListener('keydown', (e) => {
            // Space to check order
            if (e.key === ' ' && e.target !== this.puzzleTypingTarget) {
                e.preventDefault();
                this.checkOrder();
            }
            
            // Tab to switch to typing area
            if (e.key === 'Tab' && this.puzzleGameState.isOrderCorrect) {
                e.preventDefault();
                this.puzzleTypingTarget.focus();
            }
            
            // Ctrl + S for new puzzle
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.loadNewPuzzle();
            }
            
            // H for hint
            if (e.key === 'h' && !e.ctrlKey) {
                e.preventDefault();
                this.showPuzzleHint();
            }
        });
        
        // Initialize results panel as hidden
        this.puzzleResultsPanel.style.display = 'none';
    },
    
    initDragAndDrop: function() {
        this.setupDragEvents();
    },
    
    setupDragEvents: function() {
        let draggedItem = null;
        
        // Drag start event
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('syntax-item')) {
                draggedItem = e.target;
                e.target.classList.add('dragging');
                e.dataTransfer.setData('text/plain', e.target.id);
                e.dataTransfer.effectAllowed = 'move';
            }
        });
        
        // Drag end event
        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('syntax-item')) {
                e.target.classList.remove('dragging');
                draggedItem = null;
                
                // Update visual feedback for all items
                this.updateBlockPositions();
            }
        });
        
        // Drag over event
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (draggedItem) {
                e.dataTransfer.dropEffect = 'move';
            }
        });
        
        // Drop event
        document.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!draggedItem || !e.target.closest('.syntax-sort-container')) return;
            
            const dropTarget = e.target.classList.contains('syntax-item') 
                ? e.target 
                : e.target.closest('.syntax-item');
            
            if (dropTarget && dropTarget !== draggedItem) {
                const container = this.syntaxSortContainer;
                const draggedIndex = Array.from(container.children).indexOf(draggedItem);
                const dropIndex = Array.from(container.children).indexOf(dropTarget);
                
                if (draggedIndex < dropIndex) {
                    container.insertBefore(draggedItem, dropTarget.nextSibling);
                } else {
                    container.insertBefore(draggedItem, dropTarget);
                }
                
                // Update game state
                this.updateCurrentOrder();
                
                // Visual feedback
                this.updateBlockPositions();
                
                // Check if order is correct
                this.checkOrderVisual();
            }
        });
        
        // Make container a drop target
        this.syntaxSortContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (draggedItem) {
                e.dataTransfer.dropEffect = 'move';
            }
        });
        
        this.syntaxSortContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedItem && !e.target.classList.contains('syntax-item')) {
                this.syntaxSortContainer.appendChild(draggedItem);
                this.updateCurrentOrder();
                this.updateBlockPositions();
                this.checkOrderVisual();
            }
        });
    },
    
    loadNewPuzzle: function() {
        // Reset game state for new puzzle
        this.resetPuzzleState();
        
        // Select random puzzle from current mode
        const puzzles = this.puzzleDatabase[this.puzzleGameState.currentMode];
        const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        
        // Update game state
        this.puzzleGameState.currentPuzzle = randomPuzzle;
        this.puzzleGameState.currentCodeBlocks = [...randomPuzzle.codeBlocks];
        this.puzzleGameState.correctOrder = [...randomPuzzle.codeBlocks];
        
        // Shuffle blocks for the puzzle
        this.shuffleBlocks();
        this.puzzleGameState.currentOrder = [...this.puzzleGameState.currentCodeBlocks];
        
        // Update UI
        this.puzzleCategory.textContent = randomPuzzle.category;
        this.puzzleDifficulty.textContent = randomPuzzle.difficulty;
        
        // Update mode indicator
        document.querySelector('.puzzle-mode-indicator').textContent = 
            this.puzzleGameState.currentMode.charAt(0).toUpperCase() + 
            this.puzzleGameState.currentMode.slice(1);
        
        // Render code blocks
        this.renderCodeBlocks();
        
        // Update code preview
        this.updateCodePreview();
        
        // Load hints
        this.loadHints();
        
        // Update stats
        this.updateStats();
        
        // Reset status indicators
        this.orderStatus.textContent = 'Not Verified';
        this.orderStatus.className = 'stage-status';
        this.typingStatus.textContent = 'Not Started';
        this.typingStatus.className = 'stage-status';
        
        // Focus on first block
        this.focusFirstBlock();
    },
    
    resetPuzzleState: function() {
        this.puzzleGameState.isOrderCorrect = false;
        this.puzzleGameState.isTypingComplete = false;
        this.puzzleGameState.isTypingStarted = false;
        this.puzzleGameState.typingStartTime = null;
        this.puzzleGameState.typingEndTime = null;
        this.puzzleGameState.typingErrors = 0;
        this.puzzleGameState.typingKeystrokes = 0;
        this.puzzleGameState.typingAccuracy = 100;
        this.puzzleGameState.typingSpeed = 0;
        this.puzzleGameState.currentHintIndex = 0;
        
        // Clear typing area
        this.puzzleCodeContainer.innerHTML = '';
        document.querySelectorAll('.puzzle-typed-overlay-char').forEach(el => el.remove());
        
        // Reset typing stats
        this.typingProgress.textContent = '0%';
        this.typingAccuracy.textContent = '100%';
        this.typingTime.textContent = '0.0s';
        
        // Hide results panel
        this.hideResultsPanel();
    },
    
    shuffleBlocks: function() {
        // Fisher-Yates shuffle algorithm
        const blocks = this.puzzleGameState.currentCodeBlocks;
        for (let i = blocks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
        }
    },
    
    renderCodeBlocks: function() {
        // Clear container
        this.syntaxSortContainer.innerHTML = '';
        
        // Create and append code blocks
        this.puzzleGameState.currentCodeBlocks.forEach((block, index) => {
            const blockElement = document.createElement('div');
            blockElement.className = 'syntax-item';
            blockElement.id = `block-${index}`;
            blockElement.draggable = true;
            blockElement.dataset.index = index;
            
            blockElement.innerHTML = `
                <span class="block-number">${index + 1}</span>
                <span class="syntax-text">${this.escapeHtml(block)}</span>
                <span class="drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </span>
            `;
            
            this.syntaxSortContainer.appendChild(blockElement);
        });
        
        // Re-initialize drag events for new blocks
        this.setupBlockEvents();
    },
    
    setupBlockEvents: function() {
        const blocks = document.querySelectorAll('.syntax-item');
        
        blocks.forEach(block => {
            // Click to select
            block.addEventListener('click', (e) => {
                if (!e.target.classList.contains('drag-handle') && 
                    !e.target.classList.contains('fa-grip-vertical')) {
                    this.selectBlock(block);
                }
            });
            
            // Keyboard navigation
            block.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.selectBlock(block);
                }
                
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.moveBlockUp(block);
                }
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.moveBlockDown(block);
                }
            });
            
            // Make blocks focusable
            block.tabIndex = 0;
        });
    },
    
    selectBlock: function(block) {
        // Remove selection from all blocks
        document.querySelectorAll('.syntax-item').forEach(b => {
            b.classList.remove('selected');
        });
        
        // Add selection to clicked block
        block.classList.add('selected');
        block.focus();
    },
    
    moveBlockUp: function(block) {
        const container = this.syntaxSortContainer;
        const index = Array.from(container.children).indexOf(block);
        
        if (index > 0) {
            container.insertBefore(block, container.children[index - 1]);
            this.updateCurrentOrder();
            this.updateBlockPositions();
            this.checkOrderVisual();
            block.focus();
        }
    },
    
    moveBlockDown: function(block) {
        const container = this.syntaxSortContainer;
        const index = Array.from(container.children).indexOf(block);
        
        if (index < container.children.length - 1) {
            container.insertBefore(block, container.children[index + 1].nextSibling);
            this.updateCurrentOrder();
            this.updateBlockPositions();
            this.checkOrderVisual();
            block.focus();
        }
    },
    
    updateCurrentOrder: function() {
        const blocks = Array.from(this.syntaxSortContainer.children);
        this.puzzleGameState.currentOrder = blocks.map(block => {
            const textElement = block.querySelector('.syntax-text');
            return this.unescapeHtml(textElement.textContent);
        });
    },
    
    updateBlockPositions: function() {
        const blocks = document.querySelectorAll('.syntax-item');
        
        blocks.forEach((block, index) => {
            // Update block number
            const numberElement = block.querySelector('.block-number');
            if (numberElement) {
                numberElement.textContent = index + 1;
            }
            
            // Remove all position classes
            block.classList.remove('correct-position', 'wrong-position', 'close-position');
            
            // Check if this block is in the correct position
            const blockText = this.unescapeHtml(block.querySelector('.syntax-text').textContent);
            const correctIndex = this.puzzleGameState.correctOrder.indexOf(blockText);
            
            if (index === correctIndex) {
                block.classList.add('correct-position');
            } else if (Math.abs(index - correctIndex) <= 1) {
                block.classList.add('close-position');
            } else {
                block.classList.add('wrong-position');
            }
        });
    },
    
    checkOrderVisual: function() {
        // Just update visual feedback without changing status
        this.updateBlockPositions();
    },
    
    checkOrder: function() {
        this.puzzleGameState.orderAttempts++;
        
        const isCorrect = this.isOrderCorrect();
        this.puzzleGameState.isOrderCorrect = isCorrect;
        
        if (isCorrect) {
            this.orderStatus.textContent = '✓ Correct!';
            this.orderStatus.className = 'stage-status correct';
            this.typingStatus.textContent = 'Ready to Type';
            this.typingStatus.className = 'stage-status ready';
            
            // Enable typing area
            this.puzzleTypingTarget.tabIndex = 0;
            this.puzzleTypingTarget.focus();
            
            // Update code preview with correct order
            this.updateCodePreview();
            
            // Show success feedback
            this.showFeedback('🎉 Correct order! Now type the complete code.', 'success');
            
            // Update order accuracy
            this.puzzleGameState.correctOrderAttempts++;
            this.updateOrderAccuracy();
            
            // Calculate partial score for correct order
            const orderScore = this.calculateOrderScore();
            this.puzzleGameState.score = orderScore;
            this.puzzleScore.textContent = orderScore;
            
        } else {
            this.orderStatus.textContent = '✗ Incorrect';
            this.orderStatus.className = 'stage-status incorrect';
            
            // Show error feedback
            this.showFeedback('Order is incorrect. Try again!', 'error');
            
            // Highlight incorrect positions
            this.highlightIncorrectPositions();
        }
    },
    
    isOrderCorrect: function() {
        return JSON.stringify(this.puzzleGameState.currentOrder) === 
               JSON.stringify(this.puzzleGameState.correctOrder);
    },
    
    highlightIncorrectPositions: function() {
        const blocks = document.querySelectorAll('.syntax-item');
        
        blocks.forEach((block, index) => {
            const blockText = this.unescapeHtml(block.querySelector('.syntax-text').textContent);
            const correctIndex = this.puzzleGameState.correctOrder.indexOf(blockText);
            
            if (index !== correctIndex) {
                block.classList.add('incorrect-animation');
                setTimeout(() => {
                    block.classList.remove('incorrect-animation');
                }, 1000);
            }
        });
    },
    
    calculateOrderScore: function() {
        const basePoints = this.puzzleGameState.currentPuzzle.points;
        const attempts = this.puzzleGameState.orderAttempts;
        const hintPenalty = this.puzzleGameState.hintsUsed * 10;
        const revealPenalty = this.puzzleGameState.hintsRevealed * 20;
        
        // Calculate score based on attempts
        let score = basePoints;
        if (attempts > 1) {
            score = Math.max(0, basePoints - (attempts - 1) * 15);
        }
        
        // Apply penalties
        score = Math.max(0, score - hintPenalty - revealPenalty);
        
        return score;
    },
    
    updateOrderAccuracy: function() {
        if (this.puzzleGameState.orderAttempts > 0) {
            const accuracy = Math.round(
                (this.puzzleGameState.correctOrderAttempts / this.puzzleGameState.orderAttempts) * 100
            );
            this.orderAccuracy.textContent = `${accuracy}%`;
        }
    },
    
    resetOrder: function() {
        // Reset to original shuffled order
        this.puzzleGameState.currentCodeBlocks = [...this.puzzleGameState.currentPuzzle.codeBlocks];
        this.shuffleBlocks();
        this.puzzleGameState.currentOrder = [...this.puzzleGameState.currentCodeBlocks];
        
        // Re-render blocks
        this.renderCodeBlocks();
        
        // Reset visual feedback
        this.orderStatus.textContent = 'Not Verified';
        this.orderStatus.className = 'stage-status';
        
        // Reset score for this puzzle
        this.puzzleGameState.score = 0;
        this.puzzleScore.textContent = '0';
        
        // Show feedback
        this.showFeedback('Order reset to initial arrangement', 'info');
    },
    
    autoArrange: function() {
        // Arrange blocks in correct order with penalty
        this.puzzleGameState.currentCodeBlocks = [...this.puzzleGameState.correctOrder];
        this.puzzleGameState.currentOrder = [...this.puzzleGameState.correctOrder];
        
        // Re-render blocks
        this.renderCodeBlocks();
        
        // Apply penalty for using auto-arrange
        const penalty = 50;
        this.puzzleGameState.score = Math.max(0, (this.puzzleGameState.currentPuzzle.points - penalty) / 2);
        this.puzzleScore.textContent = this.puzzleGameState.score;
        
        // Mark order as correct
        this.puzzleGameState.isOrderCorrect = true;
        this.orderStatus.textContent = '✓ Auto-arranged';
        this.orderStatus.className = 'stage-status auto';
        
        // Show feedback
        this.showFeedback('Auto-arranged with penalty. Score reduced.', 'warning');
    },
    
    updateCodePreview: function() {
        let previewCode = '';
        
        if (this.puzzleGameState.isOrderCorrect) {
            // Show correct solution
            previewCode = this.puzzleGameState.currentPuzzle.solution;
        } else {
            // Show current arrangement
            previewCode = this.puzzleGameState.currentOrder.join('\n');
        }
        
        // Format code with syntax highlighting
        const formattedCode = this.formatCode(previewCode);
        this.codePreview.innerHTML = formattedCode;
        
        // Set up typing area
        this.setupTypingArea();
    },
    
    formatCode: function(code) {
        // Simple syntax highlighting
        const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 
                         'console', 'log', 'fetch', 'then', 'catch', 'async', 'await'];
        
        const lines = code.split('\n');
        let formatted = '';
        
        lines.forEach(line => {
            let formattedLine = this.escapeHtml(line);
            
            // Highlight keywords
            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'g');
                formattedLine = formattedLine.replace(regex, 
                    `<span class="code-keyword">${keyword}</span>`);
            });
            
            // Highlight strings
            formattedLine = formattedLine.replace(/(['"`].*?['"`])/g, 
                '<span class="code-string">$1</span>');
            
            // Highlight numbers
            formattedLine = formattedLine.replace(/\b(\d+)\b/g, 
                '<span class="code-number">$1</span>');
            
            // Highlight operators
            formattedLine = formattedLine.replace(/([=+\-*/%<>!&|^~]+)/g, 
                '<span class="code-operator">$1</span>');
            
            formatted += formattedLine + '<br>';
        });
        
        return formatted;
    },
    
    setupTypingArea: function() {
        // Clear typing area
        this.puzzleCodeContainer.innerHTML = '';
        
        const code = this.puzzleGameState.currentPuzzle.solution;
        const lines = code.split('\n');
        
        lines.forEach((line, lineIndex) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'puzzle-code-line';
            
            // Add line number
            const lineNumber = document.createElement('span');
            lineNumber.className = 'line-number';
            lineNumber.textContent = lineIndex + 1;
            lineDiv.appendChild(lineNumber);
            
            // Add characters
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                const charSpan = document.createElement('span');
                charSpan.className = 'puzzle-char-element';
                charSpan.dataset.index = lineIndex * 1000 + i;
                charSpan.textContent = char === ' ' ? ' ' : char;
                
                if (char === ' ') {
                    charSpan.classList.add('puzzle-space-char');
                } else if (char === '\t') {
                    charSpan.textContent = '    ';
                    charSpan.classList.add('puzzle-tab-char');
                }
                
                lineDiv.appendChild(charSpan);
            }
            
            // Add line break if not last line
            if (lineIndex < lines.length - 1) {
                const lineBreak = document.createElement('span');
                lineBreak.className = 'puzzle-char-element puzzle-line-break';
                lineBreak.innerHTML = '<br>';
                lineDiv.appendChild(lineBreak);
            }
            
            this.puzzleCodeContainer.appendChild(lineDiv);
        });
        
        // Position cursor at start
        this.positionPuzzleCursor();
    },
    
    handlePuzzleKeyDown: function(e) {
        // Only process if order is correct and typing is not complete
        if (!this.puzzleGameState.isOrderCorrect || this.puzzleGameState.isTypingComplete) {
            return;
        }
        
        // Start timer on first keystroke
        if (!this.puzzleGameState.isTypingStarted) {
            this.puzzleGameState.isTypingStarted = true;
            this.puzzleGameState.typingStartTime = new Date();
            this.typingStatus.textContent = 'Typing...';
            this.typingStatus.className = 'stage-status typing';
            this.startTypingTimer();
        }
        
        // Prevent default for keys we handle
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
        }
        
        // Handle backspace
        if (e.key === 'Backspace') {
            this.handlePuzzleBackspace();
            return;
        }
        
        // Handle tab (4 spaces)
        if (e.key === 'Tab') {
            e.preventDefault();
            this.handlePuzzleTab();
            return;
        }
        
        // Handle enter (new line)
        if (e.key === 'Enter') {
            this.handlePuzzleEnter();
            return;
        }
        
        // Ignore control keys
        if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
        
        // Handle regular character input
        this.handlePuzzleCharacter(e.key);
    },
    
    handlePuzzleCharacter: function(char) {
        const code = this.puzzleGameState.currentPuzzle.solution;
        const currentIndex = this.getCurrentTypingIndex();
        
        // Check if we're at the end
        if (currentIndex >= code.length) {
            return;
        }
        
        // Update keystrokes count
        this.puzzleGameState.typingKeystrokes++;
        
        const expectedChar = code[currentIndex];
        const isCorrect = char === expectedChar;
        
        // Update error count
        if (!isCorrect) {
            this.puzzleGameState.typingErrors++;
        }
        
        // Update display - overlay typed character
        this.overlayPuzzleTypedCharacter(char, currentIndex, isCorrect);
        
        // Move to next character
        this.advanceTypingIndex();
        
        // Update typing stats
        this.updateTypingStats();
        
        // Check if typing is complete
        if (this.getCurrentTypingIndex() >= code.length) {
            this.completeTyping();
        }
    },
    
    getCurrentTypingIndex: function() {
        // Calculate current typing index based on typed characters
        const typedChars = document.querySelectorAll('.puzzle-typed-overlay-char');
        return typedChars.length;
    },
    
    advanceTypingIndex: function() {
        // Position cursor for next character
        this.positionPuzzleCursor();
    },
    
    overlayPuzzleTypedCharacter: function(char, index, isCorrect) {
        // Get the original character element
        const charElements = document.querySelectorAll('.puzzle-char-element');
        if (index >= charElements.length) return;
        
        const originalCharEl = charElements[index];
        
        // Create overlay element
        const overlayEl = document.createElement('div');
        overlayEl.className = `puzzle-typed-overlay-char ${isCorrect ? 'puzzle-correct' : 'puzzle-incorrect'}`;
        overlayEl.textContent = char;
        
        // Get position of original character
        const rect = originalCharEl.getBoundingClientRect();
        const containerRect = this.puzzleCodeContainer.getBoundingClientRect();
        
        // Position overlay exactly over original character
        overlayEl.style.left = (rect.left - containerRect.left) + 'px';
        overlayEl.style.top = (rect.top - containerRect.top) + 'px';
        overlayEl.style.width = rect.width + 'px';
        overlayEl.style.height = rect.height + 'px';
        
        // Add to container
        this.puzzleCodeContainer.appendChild(overlayEl);
    },
    
    handlePuzzleBackspace: function() {
        const typedChars = document.querySelectorAll('.puzzle-typed-overlay-char');
        if (typedChars.length > 0) {
            // Remove last typed character overlay
            const lastTyped = typedChars[typedChars.length - 1];
            lastTyped.remove();
            
            // Update stats (backspace counts as a keystroke)
            this.puzzleGameState.typingKeystrokes++;
            
            // Position cursor
            this.positionPuzzleCursor();
            
            // Update typing stats
            this.updateTypingStats();
        }
    },
    
    handlePuzzleTab: function() {
        // Add 4 spaces for tab
        for (let i = 0; i < 4; i++) {
            this.handlePuzzleCharacter(' ');
        }
    },
    
    handlePuzzleEnter: function() {
        this.handlePuzzleCharacter('\n');
    },
    
    positionPuzzleCursor: function() {
        // Remove existing cursor
        const existingCursor = document.querySelector('.puzzle-typing-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // If typing complete, don't show cursor
        if (this.puzzleGameState.isTypingComplete || 
            this.getCurrentTypingIndex() >= this.puzzleGameState.currentPuzzle.solution.length) {
            return;
        }
        
        // Get current character element
        const charElements = document.querySelectorAll('.puzzle-char-element');
        const currentIndex = this.getCurrentTypingIndex();
        
        if (currentIndex >= charElements.length) return;
        
        const currentCharEl = charElements[currentIndex];
        const rect = currentCharEl.getBoundingClientRect();
        const containerRect = this.puzzleCodeContainer.getBoundingClientRect();
        
        // Create cursor
        const cursor = document.createElement('div');
        cursor.className = 'puzzle-typing-cursor';
        cursor.style.left = (rect.left - containerRect.left) + 'px';
        cursor.style.top = (rect.top - containerRect.top) + 'px';
        cursor.style.width = '2px';
        cursor.style.height = rect.height + 'px';
        
        this.puzzleCodeContainer.appendChild(cursor);
    },
    
    startTypingTimer: function() {
        if (this.typingTimerInterval) {
            clearInterval(this.typingTimerInterval);
        }
        
        this.typingTimerInterval = setInterval(() => {
            if (this.puzzleGameState.isTypingStarted && !this.puzzleGameState.isTypingComplete) {
                this.updateTypingStats();
            }
        }, 100);
    },
    
    updateTypingStats: function() {
        // Calculate typing progress
        const totalChars = this.puzzleGameState.currentPuzzle.solution.length;
        const typedChars = this.getCurrentTypingIndex();
        const progress = (typedChars / totalChars) * 100;
        this.typingProgress.textContent = `${Math.round(progress)}%`;
        
        // Calculate typing accuracy
        let accuracy = 100;
        if (this.puzzleGameState.typingKeystrokes > 0) {
            accuracy = Math.max(0, Math.round(
                ((this.puzzleGameState.typingKeystrokes - this.puzzleGameState.typingErrors) / 
                 this.puzzleGameState.typingKeystrokes) * 100
            ));
        }
        this.typingAccuracy.textContent = `${accuracy}%`;
        this.puzzleGameState.typingAccuracy = accuracy;
        
        // Update time
        if (this.puzzleGameState.typingStartTime) {
            const timeElapsed = (new Date() - this.puzzleGameState.typingStartTime) / 1000;
            this.typingTime.textContent = `${timeElapsed.toFixed(1)}s`;
        }
        
        // Calculate typing speed (WPM)
        if (this.puzzleGameState.typingStartTime) {
            const timeElapsed = (new Date() - this.puzzleGameState.typingStartTime) / 1000 / 60;
            const wordsTyped = typedChars / 5;
            const speed = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
            this.puzzleGameState.typingSpeed = speed;
        }
    },
    
    completeTyping: function() {
        this.puzzleGameState.isTypingComplete = true;
        this.puzzleGameState.typingEndTime = new Date();
        
        // Stop typing timer
        clearInterval(this.typingTimerInterval);
        
        // Remove cursor
        const cursor = document.querySelector('.puzzle-typing-cursor');
        if (cursor) cursor.remove();
        
        // Update status
        this.typingStatus.textContent = '✓ Complete';
        this.typingStatus.className = 'stage-status complete';
        
        // Calculate final score
        this.calculateFinalScore();
        
        // Update game stats
        this.updateGameStats();
        
        // Show results panel
        this.showResultsPanel();
        
        // Check for achievements
        this.checkAchievements();
        
        // Show success feedback
        this.showFeedback('🎊 Puzzle Complete! Great job!', 'success');
    },
    
    calculateFinalScore: function() {
        // Base score from order arrangement
        let finalScore = this.puzzleGameState.score;
        
        // Add typing bonus
        const typingTime = (this.puzzleGameState.typingEndTime - this.puzzleGameState.typingStartTime) / 1000;
        const timeBonus = Math.max(0, 60 - typingTime);
        const accuracyBonus = this.puzzleGameState.typingAccuracy;
        const speedBonus = Math.min(this.puzzleGameState.typingSpeed, 100);
        
        const typingScore = Math.round(
            (timeBonus * 2) + 
            (accuracyBonus * 1.5) + 
            (speedBonus * 1.2)
        );
        
        finalScore += typingScore;
        
        // Apply hint penalties
        const hintPenalty = this.puzzleGameState.hintsUsed * 15;
        const revealPenalty = this.puzzleGameState.hintsRevealed * 25;
        finalScore = Math.max(0, finalScore - hintPenalty - revealPenalty);
        
        // Update game state
        this.puzzleGameState.score = finalScore;
        this.puzzleGameState.totalScore += finalScore;
        
        // Update UI
        this.puzzleScore.textContent = finalScore;
        this.totalScore.textContent = this.puzzleGameState.totalScore;
        
        // Update results panel
        document.getElementById('finalPuzzleScore').textContent = finalScore;
        document.getElementById('finalTypingSpeed').textContent = `${this.puzzleGameState.typingSpeed} WPM`;
        document.getElementById('finalTypingAccuracy').textContent = `${this.puzzleGameState.typingAccuracy}%`;
        document.getElementById('finalTimeTaken').textContent = `${typingTime.toFixed(1)}s`;
        
        // Calculate order accuracy for this puzzle
        const orderAccuracy = this.puzzleGameState.isOrderCorrect ? 100 : 0;
        document.getElementById('finalOrderAccuracy').textContent = `${orderAccuracy}%`;
    },
    
    updateGameStats: function() {
        // Update puzzles solved
        this.puzzleGameState.puzzlesSolved++;
        this.puzzlesSolved.textContent = this.puzzleGameState.puzzlesSolved;
        
        // Update average typing speed
        if (this.puzzleGameState.puzzlesSolved > 0) {
            const avgSpeed = Math.round(
                this.puzzleGameState.typingSpeed / this.puzzleGameState.puzzlesSolved
            );
            this.avgTypingSpeed.textContent = `${avgSpeed} WPM`;
        }
        
        // Update total score
        this.totalScore.textContent = this.puzzleGameState.totalScore;
    },
    
    showResultsPanel: function() {
        this.puzzleResultsPanel.style.display = 'block';
        setTimeout(() => {
            this.puzzleResultsPanel.style.opacity = '1';
        }, 10);
    },
    
    hideResultsPanel: function() {
        this.puzzleResultsPanel.style.opacity = '0';
        setTimeout(() => {
            this.puzzleResultsPanel.style.display = 'none';
        }, 300);
    },
    
    changePuzzleMode: function(mode) {
        // Update active button
        document.querySelectorAll('.puzzle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update game state
        this.puzzleGameState.currentMode = mode;
        
        // Load new puzzle in new mode
        this.loadNewPuzzle();
    },
    
    loadHints: function() {
        const hints = this.puzzleGameState.currentPuzzle.hints;
        this.hintsList.innerHTML = '';
        
        hints.forEach((hint, index) => {
            const hintElement = document.createElement('div');
            hintElement.className = 'hint-item';
            hintElement.innerHTML = `
                <div class="hint-number">${index + 1}</div>
                <div class="hint-text">${hint}</div>
            `;
            this.hintsList.appendChild(hintElement);
        });
        
        // Reset hint index
        this.puzzleGameState.currentHintIndex = 0;
        this.puzzleGameState.hintsUsed = 0;
        this.puzzleGameState.hintsRevealed = 0;
    },
    
    showPuzzleHint: function() {
        if (this.puzzleGameState.currentHintIndex >= this.puzzleGameState.currentPuzzle.hints.length) {
            this.showFeedback('No more hints available!', 'info');
            return;
        }
        
        const hint = this.puzzleGameState.currentPuzzle.hints[this.puzzleGameState.currentHintIndex];
        this.showFeedback(`💡 Hint ${this.puzzleGameState.currentHintIndex + 1}: ${hint}`, 'info');
        
        this.puzzleGameState.currentHintIndex++;
        this.puzzleGameState.hintsUsed++;
    },
    
    nextHint: function() {
        this.showPuzzleHint();
    },
    
    revealHint: function() {
        // Reveal all hints at once with penalty
        const hints = this.puzzleGameState.currentPuzzle.hints;
        let hintText = 'All hints:\n';
        
        hints.forEach((hint, index) => {
            hintText += `${index + 1}. ${hint}\n`;
        });
        
        this.showFeedback(hintText, 'warning');
        this.puzzleGameState.hintsRevealed++;
        this.puzzleGameState.currentHintIndex = hints.length;
    },
    
    showSolution: function() {
        const solution = this.puzzleGameState.currentPuzzle.solution;
        this.showFeedback(`Solution:\n${solution}`, 'warning');
        
        // Apply maximum penalty
        this.puzzleGameState.score = Math.max(0, this.puzzleGameState.currentPuzzle.points * 0.1);
        this.puzzleScore.textContent = this.puzzleGameState.score;
        
        // Mark as auto-arranged
        this.autoArrange();
    },
    
    nextPuzzle: function() {
        this.hideResultsPanel();
        setTimeout(() => {
            this.loadNewPuzzle();
        }, 300);
    },
    
    retryPuzzle: function() {
        this.hideResultsPanel();
        setTimeout(() => {
            this.resetPuzzleState();
            this.resetOrder();
            this.showFeedback('Puzzle reset. Try again!', 'info');
        }, 300);
    },
    
    sharePuzzleResults: function() {
        const score = this.puzzleGameState.score;
        const puzzleName = this.puzzleGameState.currentPuzzle.category;
        const difficulty = this.puzzleGameState.currentPuzzle.difficulty;
        
        const shareText = `I scored ${score} points on a ${difficulty} ${puzzleName} puzzle in TypeSkill Hacker Mode! 🧩💻`;
        
        if (navigator.share) {
            navigator.share({
                title: 'TypeSkill Puzzle Results',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showFeedback('Results copied to clipboard!', 'success');
            });
        }
    },
    
    checkAchievements: function() {
        const achievements = [];
        
        // Score achievements
        if (this.puzzleGameState.score >= 300) {
            achievements.push({name: 'Puzzle Master', description: 'Scored 300+ points on a puzzle'});
        }
        
        // Speed achievements
        if (this.puzzleGameState.typingSpeed >= 80) {
            achievements.push({name: 'Fast Typist', description: '80+ WPM typing speed'});
        }
        
        // Accuracy achievements
        if (this.puzzleGameState.typingAccuracy === 100) {
            achievements.push({name: 'Perfect Accuracy', description: '100% typing accuracy'});
        }
        
        // Puzzle count achievements
        if (this.puzzleGameState.puzzlesSolved >= 5) {
            achievements.push({name: 'Puzzle Solver', description: 'Solved 5+ puzzles'});
        }
        if (this.puzzleGameState.puzzlesSolved >= 10) {
            achievements.push({name: 'Puzzle Expert', description: 'Solved 10+ puzzles'});
        }
        
        // Display achievements
        this.displayAchievements(achievements);
    },
    
    displayAchievements: function(achievements) {
        const achievementsList = document.getElementById('achievementsList');
        achievementsList.innerHTML = '';
        
        if (achievements.length === 0) {
            achievementsList.innerHTML = '<p class="no-achievements">Keep practicing to earn achievements!</p>';
            return;
        }
        
        achievements.forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = 'achievement-item';
            achievementEl.innerHTML = `
                <div class="achievement-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="achievement-content">
                    <strong>${achievement.name}</strong>
                    <p>${achievement.description}</p>
                </div>
            `;
            achievementsList.appendChild(achievementEl);
        });
    },
    
    showFeedback: function(message, type) {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.puzzle-feedback-message');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `puzzle-feedback-message puzzle-feedback-${type}`;
        feedback.innerHTML = message;
        
        // Add to DOM
        document.querySelector('.syntax-game-container').appendChild(feedback);
        
        // Remove after 4 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.style.opacity = '0';
                setTimeout(() => {
                    if (feedback.parentNode) {
                        feedback.remove();
                    }
                }, 300);
            }
        }, 4000);
    },
    
    focusFirstBlock: function() {
        const firstBlock = this.syntaxSortContainer.querySelector('.syntax-item');
        if (firstBlock) {
            firstBlock.focus();
        }
    },
    
    updateStats: function() {
        // Update all displayed stats
        this.puzzlesSolved.textContent = this.puzzleGameState.puzzlesSolved;
        this.orderAccuracy.textContent = this.orderAccuracy.textContent;
        this.avgTypingSpeed.textContent = this.avgTypingSpeed.textContent;
        this.totalScore.textContent = this.puzzleGameState.totalScore;
    },
    
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    unescapeHtml: function(text) {
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.textContent;
    },
    
    startSyntaxSortGame: function() {
        // Add CSS for syntax sort game
        const style = document.createElement('style');
        style.textContent = `
            .syntax-game-container {
                background: rgba(30, 40, 60, 0.95);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 20px;
                border: 2px solid rgba(0, 200, 255, 0.3);
                position: relative;
                overflow: hidden;
            }
            
            .syntax-game-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, 
                    #00c8ff 0%, 
                    #0088ff 50%, 
                    #0044ff 100%);
                z-index: 1;
            }
            
            .game-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(0, 200, 255, 0.2);
            }
            
            .game-header h3 {
                color: #00c8ff;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
                text-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
            }
            
            .puzzle-mode-indicator {
                background: rgba(0, 200, 255, 0.2);
                padding: 3px 10px;
                border-radius: 12px;
                font-size: 0.8rem;
                color: #00c8ff;
                font-weight: bold;
                border: 1px solid rgba(0, 200, 255, 0.3);
            }
            
            .game-actions {
                display: flex;
                gap: 10px;
            }
            
            .puzzle-controls {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            .puzzle-btn {
                padding: 8px 16px;
                background: rgba(0, 200, 255, 0.1);
                border: 1px solid rgba(0, 200, 255, 0.3);
                color: #88ddff;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: bold;
            }
            
            .puzzle-btn:hover {
                background: rgba(0, 200, 255, 0.2);
                transform: translateY(-1px);
            }
            
            .puzzle-btn.active {
                background: linear-gradient(45deg, #00c8ff, #0088ff);
                color: white;
                box-shadow: 0 2px 8px rgba(0, 200, 255, 0.3);
            }
            
            .puzzle-info-section {
                background: rgba(20, 30, 50, 0.7);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 25px;
                border: 1px solid rgba(0, 200, 255, 0.2);
            }
            
            .puzzle-description {
                margin-bottom: 20px;
            }
            
            .puzzle-type {
                display: flex;
                gap: 15px;
                margin-bottom: 15px;
            }
            
            .puzzle-category, .puzzle-difficulty {
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: bold;
            }
            
            .puzzle-category {
                background: rgba(0, 200, 255, 0.2);
                color: #00c8ff;
                border: 1px solid rgba(0, 200, 255, 0.3);
            }
            
            .puzzle-difficulty {
                background: rgba(0, 255, 150, 0.2);
                color: #00ff96;
                border: 1px solid rgba(0, 255, 150, 0.3);
            }
            
            .puzzle-instructions {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 15px;
            }
            
            .puzzle-instructions p {
                color: #aaddff;
                margin: 8px 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .puzzle-progress {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .progress-stage {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                padding: 15px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: transform 0.3s;
            }
            
            .progress-stage:hover {
                transform: translateY(-2px);
            }
            
            .stage-icon {
                width: 40px;
                height: 40px;
                background: rgba(0, 200, 255, 0.2);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                color: #00c8ff;
            }
            
            .stage-text {
                display: flex;
                flex-direction: column;
            }
            
            .stage-label {
                color: #88ddff;
                font-size: 0.9rem;
                margin-bottom: 5px;
            }
            
            .stage-status {
                color: white;
                font-size: 1.2rem;
                font-weight: bold;
            }
            
            .stage-status.correct {
                color: #00ff00;
            }
            
            .stage-status.incorrect {
                color: #ff0000;
            }
            
            .stage-status.ready {
                color: #ffff00;
            }
            
            .stage-status.typing {
                color: #00c8ff;
                animation: pulse 1s infinite;
            }
            
            .stage-status.complete {
                color: #00ff00;
                text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
            }
            
            .stage-status.auto {
                color: #ff9900;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            .puzzle-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 25px;
                margin-bottom: 25px;
            }
            
            @media (max-width: 992px) {
                .puzzle-section {
                    grid-template-columns: 1fr;
                }
            }
            
            .puzzle-drag-area, .puzzle-typing-area {
                background: rgba(20, 30, 50, 0.7);
                border-radius: 10px;
                padding: 20px;
                border: 1px solid rgba(0, 200, 255, 0.2);
            }
            
            .puzzle-drag-area h4, .puzzle-typing-area h4 {
                color: #00c8ff;
                margin: 0 0 15px 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .drag-instructions, .typing-instructions {
                background: rgba(0, 200, 255, 0.1);
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 20px;
                border-left: 3px solid #00c8ff;
            }
            
            .drag-instructions p, .typing-instructions p {
                color: #aaddff;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .syntax-sort-container {
                min-height: 300px;
                background: rgba(10, 15, 25, 0.8);
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
                border: 2px dashed rgba(0, 200, 255, 0.3);
            }
            
            .syntax-item {
                background: rgba(30, 40, 60, 0.9);
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 10px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                cursor: move;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: all 0.3s;
                user-select: none;
            }
            
            .syntax-item:hover {
                background: rgba(40, 50, 70, 0.9);
                transform: translateX(5px);
            }
            
            .syntax-item.dragging {
                opacity: 0.5;
                background: rgba(0, 200, 255, 0.2);
                border: 2px dashed #00c8ff;
            }
            
            .syntax-item.selected {
                background: rgba(0, 200, 255, 0.2);
                border: 2px solid #00c8ff;
                box-shadow: 0 0 15px rgba(0, 200, 255, 0.3);
            }
            
            .syntax-item.correct-position {
                border-left: 4px solid #00ff00;
                background: rgba(0, 255, 0, 0.05);
            }
            
            .syntax-item.wrong-position {
                border-left: 4px solid #ff0000;
                background: rgba(255, 0, 0, 0.05);
            }
            
            .syntax-item.close-position {
                border-left: 4px solid #ffff00;
                background: rgba(255, 255, 0, 0.05);
            }
            
            @keyframes incorrectShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            
            .syntax-item.incorrect-animation {
                animation: incorrectShake 0.5s;
                background: rgba(255, 0, 0, 0.2);
            }
            
            .block-number {
                width: 30px;
                height: 30px;
                background: rgba(0, 200, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #00c8ff;
                font-weight: bold;
                font-size: 0.9rem;
                flex-shrink: 0;
            }
            
            .syntax-text {
                flex: 1;
                color: white;
                font-family: 'Courier New', monospace;
                font-size: 1rem;
                word-break: break-all;
            }
            
            .drag-handle {
                color: rgba(255, 255, 255, 0.5);
                cursor: grab;
                padding: 5px;
                font-size: 1.2rem;
            }
            
            .drag-handle:hover {
                color: #00c8ff;
            }
            
            .code-preview {
                background: rgba(10, 15, 25, 0.9);
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
                border: 1px solid rgba(0, 200, 255, 0.3);
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                color: #e0e0ff;
                line-height: 1.6;
                max-height: 200px;
                overflow-y: auto;
            }
            
            .code-keyword {
                color: #ff79c6;
                font-weight: bold;
            }
            
            .code-string {
                color: #f1fa8c;
            }
            
            .code-number {
                color: #bd93f9;
                font-weight: bold;
            }
            
            .code-operator {
                color: #ffb86c;
            }
            
            .typing-target {
                position: relative;
                background: rgba(10, 15, 25, 0.9);
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
                border: 2px solid rgba(0, 200, 255, 0.3);
                min-height: 200px;
                overflow-x: auto;
                cursor: text;
                outline: none;
            }
            
            .typing-target:focus {
                border-color: #00c8ff;
                box-shadow: 0 0 20px rgba(0, 200, 255, 0.4);
            }
            
            .code-container {
                position: relative;
                font-family: 'Courier New', monospace;
                font-size: 1rem;
                line-height: 1.6;
                color: rgba(224, 224, 255, 0.8);
                white-space: pre-wrap;
                user-select: none;
            }
            
            .puzzle-code-line {
                position: relative;
                min-height: 1.6em;
                display: flex;
            }
            
            .line-number {
                width: 40px;
                color: rgba(255, 255, 255, 0.3);
                font-size: 0.9rem;
                text-align: right;
                padding-right: 10px;
                user-select: none;
                flex-shrink: 0;
            }
            
            .puzzle-char-element {
                position: relative;
                display: inline-block;
                min-width: 8px;
            }
            
            .puzzle-char-element.puzzle-space-char {
                background-color: rgba(255, 255, 255, 0.05);
                border-radius: 2px;
            }
            
            .puzzle-typed-overlay-char {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Courier New', monospace;
                font-size: 1rem;
                font-weight: bold;
                z-index: 10;
                pointer-events: none;
                animation: puzzleFadeIn 0.1s ease-out;
                border-radius: 2px;
            }
            
            .puzzle-typed-overlay-char.puzzle-correct {
                color: #00ff00;
                background-color: rgba(0, 255, 0, 0.1);
            }
            
            .puzzle-typed-overlay-char.puzzle-incorrect {
                color: #ff0000;
                background-color: rgba(255, 0, 0, 0.15);
                text-decoration: line-through;
            }
            
            @keyframes puzzleFadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .puzzle-typing-cursor {
                position: absolute;
                background-color: #00c8ff;
                width: 2px;
                z-index: 20;
                pointer-events: none;
                animation: puzzleBlink 1s infinite;
                box-shadow: 0 0 10px #00c8ff;
            }
            
            @keyframes puzzleBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            .typing-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 10px;
            }
            
            .typing-stat {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 12px;
                text-align: center;
            }
            
            .typing-stat span:first-child {
                color: #88ddff;
                font-size: 0.9rem;
                display: block;
                margin-bottom: 5px;
            }
            
            .typing-stat .stat-value {
                color: white;
                font-size: 1.3rem;
                font-weight: bold;
            }
            
            .puzzle-stats-section {
                margin: 25px 0;
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .stat-box {
                background: linear-gradient(135deg, rgba(0, 200, 255, 0.1), rgba(0, 150, 255, 0.1));
                border-radius: 10px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: transform 0.3s;
                border: 1px solid rgba(0, 200, 255, 0.2);
            }
            
            .stat-box:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0, 200, 255, 0.2);
            }
            
            .stat-icon {
                width: 50px;
                height: 50px;
                background: rgba(0, 200, 255, 0.2);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: #00c8ff;
            }
            
            .stat-content {
                display: flex;
                flex-direction: column;
            }
            
            .stat-label {
                color: #88ddff;
                font-size: 0.9rem;
                margin-bottom: 5px;
            }
            
            .stat-value {
                color: #fff;
                font-size: 1.8rem;
                font-weight: bold;
                text-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
            }
            
            .puzzle-hints-section {
                background: rgba(20, 30, 50, 0.7);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 25px;
                border: 1px solid rgba(0, 200, 255, 0.2);
            }
            
            .hints-container h4 {
                color: #00c8ff;
                margin: 0 0 15px 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .hints-list {
                margin-bottom: 20px;
            }
            
            .hint-item {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: all 0.3s;
            }
            
            .hint-item:hover {
                background: rgba(255, 255, 255, 0.08);
                transform: translateX(5px);
            }
            
            .hint-number {
                width: 30px;
                height: 30px;
                background: rgba(0, 200, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #00c8ff;
                font-weight: bold;
                font-size: 0.9rem;
                flex-shrink: 0;
            }
            
            .hint-text {
                color: #aaddff;
                flex: 1;
            }
            
            .hint-controls {
                display: flex;
                gap: 10px;
            }
            
            .hint-btn {
                flex: 1;
                padding: 12px;
                background: rgba(0, 200, 255, 0.1);
                border: 1px solid rgba(0, 200, 255, 0.3);
                color: #88ddff;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-weight: bold;
                transition: all 0.3s;
            }
            
            .hint-btn:hover {
                background: rgba(0, 200, 255, 0.2);
                transform: translateY(-2px);
            }
            
            .puzzle-results-panel {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: none;
                opacity: 0;
                transition: opacity 0.3s;
                z-index: 100;
                overflow-y: auto;
            }
            
            .results-content {
                max-width: 800px;
                margin: 50px auto;
                background: rgba(20, 30, 50, 0.95);
                border-radius: 15px;
                padding: 40px;
                border: 2px solid rgba(0, 200, 255, 0.3);
            }
            
            .results-summary {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            
            .result-stat {
                background: rgba(255, 255, 255, 0.1);
                padding: 20px;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .result-stat span:first-child {
                color: #88ddff;
                font-size: 0.9rem;
            }
            
            .result-value {
                color: #fff;
                font-size: 1.5rem;
                font-weight: bold;
                color: #00c8ff;
            }
            
            .achievements-earned {
                margin: 30px 0;
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
            }
            
            .achievements-earned h4 {
                color: #00ff96;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .achievements-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .achievement-item {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                border-left: 4px solid #00ff96;
            }
            
            .achievement-icon {
                color: #00ff96;
                font-size: 1.5rem;
            }
            
            .no-achievements {
                text-align: center;
                color: #999;
                font-style: italic;
                padding: 20px;
            }
            
            .results-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
            }
            
            .puzzle-feedback-message {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 15px 30px;
                border-radius: 10px;
                font-weight: bold;
                z-index: 1000;
                animation: slideDown 0.3s ease-out;
                box-shadow: 0 5px 20px rgba(0,0,0,0.5);
                text-align: center;
                max-width: 80%;
                backdrop-filter: blur(10px);
                white-space: pre-line;
            }
            
            .puzzle-feedback-success {
                background: linear-gradient(45deg, rgba(0, 255, 150, 0.9), rgba(0, 200, 120, 0.9));
                color: white;
                border: 2px solid #00ff96;
            }
            
            .puzzle-feedback-error {
                background: linear-gradient(45deg, rgba(255, 0, 100, 0.9), rgba(200, 0, 80, 0.9));
                color: white;
                border: 2px solid #ff0064;
            }
            
            .puzzle-feedback-info {
                background: linear-gradient(45deg, rgba(0, 200, 255, 0.9), rgba(0, 150, 200, 0.9));
                color: white;
                border: 2px solid #00c8ff;
            }
            
            .puzzle-feedback-warning {
                background: linear-gradient(45deg, rgba(255, 150, 0, 0.9), rgba(200, 100, 0, 0.9));
                color: white;
                border: 2px solid #ff9600;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-30px);
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
                
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .results-summary {
                    grid-template-columns: 1fr;
                }
                
                .puzzle-section {
                    grid-template-columns: 1fr;
                }
                
                .syntax-sort-container {
                    min-height: 200px;
                }
                
                .typing-target {
                    min-height: 150px;
                }
                
                .results-actions {
                    flex-direction: column;
                }
            }
            
            @media (max-width: 480px) {
                .stats-grid {
                    grid-template-columns: 1fr;
                }
                
                .puzzle-type {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                }
                
                .puzzle-progress {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Focus on first block
        this.focusFirstBlock();
    }
};