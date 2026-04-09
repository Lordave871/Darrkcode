window.AlgorithmMaster = {
    init: function(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3><i class="fas fa-keyboard"></i> Keyboard Coder Quest</h3>
                <p>Type directly on the algorithm code! Your typed letters will appear OVER the original letters.</p>
                <div class="game-controls">
                    <div class="algorithm-category">
                        <span>Category:</span>
                        <select id="algorithmCategory">
                            <option value="searching">Searching Algorithms</option>
                            <option value="sorting">Sorting Algorithms</option>
                            <option value="graph">Graph Algorithms</option>
                            <option value="dp">Dynamic Programming</option>
                            <option value="datastructures">Data Structures</option>
                        </select>
                    </div>
                    <div class="complexity-selector">
                        <button class="complexity-btn active" data-complexity="easy">O(n)</button>
                        <button class="complexity-btn" data-complexity="medium">O(n log n)</button>
                        <button class="complexity-btn" data-complexity="hard">O(n²)</button>
                        <button class="complexity-btn" data-complexity="expert">Advanced</button>
                    </div>
                </div>
            </div>
            
            <div class="code-editor">
                <div class="code-header">
                    <h3><i class="fas fa-code"></i> Algorithm Challenge <span class="algorithm-name">Binary Search</span></h3>
                    <div class="algorithm-info">
                        <span class="time-complexity">Time: O(log n)</span>
                        <span class="space-complexity">Space: O(1)</span>
                    </div>
                </div>
                
                <div class="algorithm-description">
                    <p id="algorithmDesc">Binary search finds the position of a target value within a sorted array by comparing the target value to the middle element...</p>
                </div>
                
                <!-- Main typing area - letters typed will overlay here -->
                <div class="typing-target" id="typingTarget" tabindex="0">
                    <div class="code-container" id="codeContainer">
                        <!-- Algorithm code will be dynamically inserted here -->
                    </div>
                </div>
                
                <div class="typing-hint">
                    <p><i class="fas fa-info-circle"></i> Focus on the algorithm code and start typing. Each letter you type appears over the original letter.</p>
                </div>
                
                <div class="challenge-progress">
                    <div class="progress-info">
                        <div class="level-display">
                            <span>Level <span id="currentLevel">1</span>/10</span>
                            <div class="xp-bar">
                                <div class="xp-fill" id="xpFill"></div>
                            </div>
                            <span>XP: <span id="currentXP">0</span>/100</span>
                        </div>
                        <div class="streak-display">
                            <i class="fas fa-fire"></i>
                            <span>Streak: <span id="streakCount">0</span></span>
                        </div>
                    </div>
                    <div class="badges-earned">
                        <h4><i class="fas fa-medal"></i> Badges</h4>
                        <div class="badges-container" id="badgesContainer">
                            <div class="badge-placeholder">Earn badges by completing challenges!</div>
                        </div>
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
                        <span><i class="fas fa-bolt"></i> Efficiency</span>
                        <span class="typing-efficiency">0%</span>
                    </div>
                </div>
                
                <div class="completion-screen" id="completionScreen">
                    <div class="completion-content">
                        <h3><i class="fas fa-trophy"></i> Algorithm Mastered!</h3>
                        <div class="completion-stats">
                            <div class="completion-stat">
                                <span>Algorithm:</span>
                                <span id="completedAlgorithm">Binary Search</span>
                            </div>
                            <div class="completion-stat">
                                <span>Performance Score:</span>
                                <span id="performanceScore">0</span>
                            </div>
                            <div class="completion-stat">
                                <span>New Badge:</span>
                                <span id="newBadge">-</span>
                            </div>
                            <div class="completion-stat">
                                <span>XP Earned:</span>
                                <span id="xpEarned">+10</span>
                            </div>
                        </div>
                        <div class="completion-actions">
                            <button class="action-btn primary" id="nextAlgorithmBtn">
                                <i class="fas fa-forward"></i> Next Algorithm
                            </button>
                            <button class="action-btn" id="practiceAgainBtn">
                                <i class="fas fa-redo"></i> Practice Again
                            </button>
                            <button class="action-btn" id="viewDetailsBtn">
                                <i class="fas fa-info-circle"></i> View Details
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="algorithm-details" id="algorithmDetails">
                    <h4><i class="fas fa-info-circle"></i> Algorithm Details</h4>
                    <div class="details-content">
                        <div class="detail-section">
                            <h5>Time Complexity</h5>
                            <p id="detailTimeComplexity">O(log n)</p>
                        </div>
                        <div class="detail-section">
                            <h5>Space Complexity</h5>
                            <p id="detailSpaceComplexity">O(1)</p>
                        </div>
                        <div class="detail-section">
                            <h5>Best Use Cases</h5>
                            <p id="detailUseCases">Sorted arrays, large datasets</p>
                        </div>
                        <div class="detail-section">
                            <h5>Visualization</h5>
                            <div class="visualization" id="algorithmVisualization">
                                <!-- Visualization will be inserted here -->
                            </div>
                        </div>
                    </div>
                    <button class="close-details" id="closeDetailsBtn">
                        <i class="fas fa-times"></i>
                    </button>
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
                        <kbd>Tab</kbd>
                        <span>Insert 4 spaces</span>
                    </div>
                    <div class="shortcut">
                        <kbd>ESC</kbd>
                        <span>Reset current algorithm</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + N</kbd>
                        <span>New algorithm</span>
                    </div>
                </div>
            </div>
            
            <div class="leaderboard-panel">
                <h3><i class="fas fa-crown"></i> Algorithm Masters Leaderboard</h3>
                <div class="leaderboard-content">
                    <table class="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Coder</th>
                                <th>Level</th>
                                <th>Score</th>
                                <th>Algorithms</th>
                            </tr>
                        </thead>
                        <tbody id="leaderboardBody">
                            <!-- Leaderboard rows will be inserted here -->
                        </tbody>
                    </table>
                </div>
                <div class="personal-stats">
                    <h4>Your Stats</h4>
                    <div class="personal-stats-grid">
                        <div class="personal-stat">
                            <span>Total Algorithms</span>
                            <span id="totalAlgorithms">0</span>
                        </div>
                        <div class="personal-stat">
                            <span>Highest WPM</span>
                            <span id="highestWPM">0</span>
                        </div>
                        <div class="personal-stat">
                            <span>Average Accuracy</span>
                            <span id="averageAccuracy">0%</span>
                        </div>
                        <div class="personal-stat">
                            <span>Mastery Level</span>
                            <span id="masteryLevel">Beginner</span>
                        </div>
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
            currentAlgorithm: null,
            typedChars: [],
            startTime: null,
            endTime: null,
            isComplete: false,
            currentCharIndex: 0,
            totalErrors: 0,
            totalKeystrokes: 0,
            currentCategory: 'searching',
            currentComplexity: 'easy',
            score: 0,
            level: 1,
            xp: 0,
            streak: 0,
            badges: [],
            totalAlgorithms: 0,
            highestWPM: 0,
            totalAccuracy: 0,
            gamesPlayed: 0,
            efficiency: 0,
            lastKeyPressTime: null,
            averageKeyPressDelay: 0
        };
        
        // Algorithms database
        this.algorithms = {
            searching: {
                easy: [
                    {
                        name: "Linear Search",
                        code: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}`,
                        description: "Linear search sequentially checks each element of the array until a match is found or the whole array has been searched.",
                        timeComplexity: "O(n)",
                        spaceComplexity: "O(1)",
                        useCases: "Unsorted arrays, small datasets"
                    },
                    {
                        name: "Binary Search",
                        code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
                        description: "Binary search finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
                        timeComplexity: "O(log n)",
                        spaceComplexity: "O(1)",
                        useCases: "Sorted arrays, large datasets"
                    }
                ],
                medium: [
                    {
                        name: "Jump Search",
                        code: `function jumpSearch(arr, target) {
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(step, n)) return -1;
    }
    
    return arr[prev] === target ? prev : -1;
}`,
                        description: "Jump search checks fewer elements by jumping ahead by fixed steps and then performing linear search when the target is bounded.",
                        timeComplexity: "O(√n)",
                        spaceComplexity: "O(1)",
                        useCases: "Sorted arrays, uniform distribution"
                    }
                ]
            },
            sorting: {
                easy: [
                    {
                        name: "Bubble Sort",
                        code: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
                        description: "Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
                        timeComplexity: "O(n²)",
                        spaceComplexity: "O(1)",
                        useCases: "Educational purposes, small arrays"
                    },
                    {
                        name: "Selection Sort",
                        code: `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}`,
                        description: "Selection sort divides the input list into two parts: sorted and unsorted, repeatedly selecting the smallest element from unsorted part.",
                        timeComplexity: "O(n²)",
                        spaceComplexity: "O(1)",
                        useCases: "Small arrays, when memory write is costly"
                    }
                ],
                medium: [
                    {
                        name: "Insertion Sort",
                        code: `function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
                        description: "Insertion sort builds the final sorted array one item at a time, much like sorting playing cards in your hands.",
                        timeComplexity: "O(n²)",
                        spaceComplexity: "O(1)",
                        useCases: "Small datasets, almost sorted arrays"
                    }
                ]
            },
            graph: {
                medium: [
                    {
                        name: "BFS (Breadth First Search)",
                        code: `function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        for (const neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
}`,
                        description: "BFS explores graph level by level, visiting all neighbors at the present depth before moving to nodes at the next depth level.",
                        timeComplexity: "O(V + E)",
                        spaceComplexity: "O(V)",
                        useCases: "Shortest path in unweighted graphs, web crawling"
                    },
                    {
                        name: "DFS (Depth First Search)",
                        code: `function dfs(graph, start) {
    const visited = new Set();
    const result = [];
    
    function traverse(vertex) {
        if (!vertex || visited.has(vertex)) return;
        
        visited.add(vertex);
        result.push(vertex);
        
        for (const neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                traverse(neighbor);
            }
        }
    }
    
    traverse(start);
    return result;
}`,
                        description: "DFS explores as far as possible along each branch before backtracking, using recursion or a stack.",
                        timeComplexity: "O(V + E)",
                        spaceComplexity: "O(V)",
                        useCases: "Topological sorting, path finding, cycle detection"
                    }
                ]
            }
        };
        
        // Badges database
        this.badges = {
            speed_demon: { name: "Speed Demon", icon: "fa-bolt", color: "#FFD700" },
            perfect_coder: { name: "Perfect Coder", icon: "fa-star", color: "#4CAF50" },
            algorithm_master: { name: "Algorithm Master", icon: "fa-crown", color: "#9C27B0" },
            consistency_king: { name: "Consistency King", icon: "fa-fire", color: "#FF5722" },
            quick_learner: { name: "Quick Learner", icon: "fa-brain", color: "#2196F3" },
            graph_expert: { name: "Graph Expert", icon: "fa-project-diagram", color: "#FF9800" },
            sorting_pro: { name: "Sorting Pro", icon: "fa-sort-amount-down", color: "#00BCD4" }
        };
        
        // Initialize UI elements
        this.typingTarget = document.getElementById('typingTarget');
        this.codeContainer = document.getElementById('codeContainer');
        this.typingSpeed = document.querySelector('.typing-speed');
        this.typingAccuracy = document.querySelector('.typing-accuracy');
        this.typingTime = document.querySelector('.typing-time');
        this.typingScore = document.querySelector('.typing-score');
        this.typingEfficiency = document.querySelector('.typing-efficiency');
        this.completionScreen = document.getElementById('completionScreen');
        this.algorithmDetails = document.getElementById('algorithmDetails');
        this.currentLevel = document.getElementById('currentLevel');
        this.currentXP = document.getElementById('currentXP');
        this.xpFill = document.getElementById('xpFill');
        this.streakCount = document.getElementById('streakCount');
        this.badgesContainer = document.getElementById('badgesContainer');
        this.leaderboardBody = document.getElementById('leaderboardBody');
        
        // Load saved game state
        this.loadGameState();
        
        // Set initial algorithm
        this.loadNewAlgorithm();
        
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
            // Ctrl + N for new algorithm
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.loadNewAlgorithm();
            }
            // ESC to reset current algorithm
            if (e.key === 'Escape') {
                e.preventDefault();
                this.resetCurrentAlgorithm();
            }
        });
        
        // Category selector
        document.getElementById('algorithmCategory').addEventListener('change', (e) => {
            this.gameState.currentCategory = e.target.value;
            this.loadNewAlgorithm();
        });
        
        // Complexity buttons
        document.querySelectorAll('.complexity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeComplexity(e.target.dataset.complexity));
        });
        
        // Action buttons
        document.getElementById('nextAlgorithmBtn').addEventListener('click', () => this.nextAlgorithm());
        document.getElementById('practiceAgainBtn').addEventListener('click', () => this.practiceAgain());
        document.getElementById('viewDetailsBtn').addEventListener('click', () => this.showAlgorithmDetails());
        document.getElementById('closeDetailsBtn').addEventListener('click', () => this.hideAlgorithmDetails());
        
        // Initialize completion screen as hidden
        this.completionScreen.style.display = 'none';
        this.algorithmDetails.style.display = 'none';
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
        const code = this.gameState.currentAlgorithm.code;
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
        if (this.gameState.isComplete || this.gameState.currentCharIndex >= this.gameState.currentAlgorithm.code.length) {
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
    
    loadNewAlgorithm: function() {
        // Reset game state
        this.resetGameState();
        
        // Get random algorithm for current category and complexity
        const categoryAlgorithms = this.algorithms[this.gameState.currentCategory];
        if (!categoryAlgorithms) return;
        
        const complexityAlgorithms = categoryAlgorithms[this.gameState.currentComplexity];
        if (!complexityAlgorithms || complexityAlgorithms.length === 0) {
            // Fallback to easy complexity if none available
            this.gameState.currentComplexity = 'easy';
            this.changeComplexity('easy');
            return;
        }
        
        const randomAlgorithm = complexityAlgorithms[Math.floor(Math.random() * complexityAlgorithms.length)];
        this.gameState.currentAlgorithm = randomAlgorithm;
        
        // Update UI with algorithm info
        document.querySelector('.algorithm-name').textContent = randomAlgorithm.name;
        document.getElementById('algorithmDesc').textContent = randomAlgorithm.description;
        document.querySelector('.time-complexity').textContent = `Time: ${randomAlgorithm.timeComplexity}`;
        document.querySelector('.space-complexity').textContent = `Space: ${randomAlgorithm.spaceComplexity}`;
        
        // Update details panel
        document.getElementById('detailTimeComplexity').textContent = randomAlgorithm.timeComplexity;
        document.getElementById('detailSpaceComplexity').textContent = randomAlgorithm.spaceComplexity;
        document.getElementById('detailUseCases').textContent = randomAlgorithm.useCases;
        
        // Render original code
        this.renderCode();
        
        // Clear any existing overlays
        document.querySelectorAll('.typed-overlay-char').forEach(el => el.remove());
        
        // Update stats
        this.updateStats();
        
        // Focus on typing target
        this.typingTarget.focus();
        
        // Position cursor at start
        this.positionCursor();
        
        // Generate visualization
        this.generateVisualization();
        
        // Update progress UI
        this.updateProgressUI();
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
    },
    
    resetCurrentAlgorithm: function() {
        this.resetGameState();
        document.querySelectorAll('.typed-overlay-char').forEach(el => el.remove());
        this.updateStats();
        this.typingTarget.focus();
        this.positionCursor();
    },
    
    renderCode: function() {
        const code = this.gameState.currentAlgorithm.code;
        
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
                    if (this.gameState.currentAlgorithm.language === 'javascript') {
                        // Simple keyword detection
                        const keywordMatch = line.substr(i).match(/^(function|if|else|for|while|return|let|const|var|class)/);
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
            
            // Update highest WPM
            if (speed > this.gameState.highestWPM) {
                this.gameState.highestWPM = speed;
            }
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
        
        // Calculate efficiency (based on consistent typing speed)
        let efficiency = 100;
        if (this.gameState.averageKeyPressDelay > 0) {
            // Lower delay = higher efficiency
            efficiency = Math.max(0, Math.min(100, Math.round((500 - this.gameState.averageKeyPressDelay) / 5)));
        }
        this.gameState.efficiency = efficiency;
        this.typingEfficiency.textContent = `${efficiency}%`;
        
        // Calculate score
        const algorithmComplexity = this.getComplexityMultiplier();
        this.gameState.score = Math.round(
            (speed * 5) + 
            (accuracy * 3) + 
            (efficiency * 2) +
            (this.gameState.level * 10 * algorithmComplexity) -
            (this.gameState.totalErrors * 2)
        );
        
        this.typingScore.textContent = Math.max(0, this.gameState.score);
    },
    
    getComplexityMultiplier: function() {
        const multipliers = {
            'easy': 1,
            'medium': 1.5,
            'hard': 2,
            'expert': 3
        };
        return multipliers[this.gameState.currentComplexity] || 1;
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
        const words = this.gameState.currentAlgorithm.code.length / 5;
        const minutes = timeTaken / 60;
        const finalSpeed = Math.round(words / minutes);
        const finalAccuracy = Math.round(((this.gameState.totalKeystrokes - this.gameState.totalErrors) / this.gameState.totalKeystrokes) * 100);
        
        // Update game stats
        this.gameState.gamesPlayed++;
        this.gameState.totalAlgorithms++;
        this.gameState.totalAccuracy = (this.gameState.totalAccuracy * (this.gameState.gamesPlayed - 1) + finalAccuracy) / this.gameState.gamesPlayed;
        
        // Increase streak
        this.gameState.streak++;
        
        // Calculate XP earned
        const xpEarned = Math.round(
            10 + 
            (finalSpeed / 5) + 
            (finalAccuracy / 10) +
            (this.getComplexityMultiplier() * 5)
        );
        
        this.gameState.xp += xpEarned;
        
        // Check for level up
        while (this.gameState.xp >= 100) {
            this.gameState.xp -= 100;
            this.gameState.level++;
            this.showLevelUpNotification();
        }
        
        // Check for badges
        this.checkBadges(finalSpeed, finalAccuracy);
        
        // Update completion screen
        document.getElementById('completedAlgorithm').textContent = this.gameState.currentAlgorithm.name;
        document.getElementById('performanceScore').textContent = this.gameState.score;
        document.getElementById('xpEarned').textContent = `+${xpEarned}`;
        
        // Update UI
        this.updateProgressUI();
        this.updatePersonalStats();
        this.updateLeaderboard();
        
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
        this.currentLevel.textContent = this.gameState.level;
        this.currentXP.textContent = this.gameState.xp;
        this.xpFill.style.width = `${this.gameState.xp}%`;
        this.streakCount.textContent = this.gameState.streak;
        
        // Update badges display
        this.updateBadgesDisplay();
    },
    
    updateBadgesDisplay: function() {
        this.badgesContainer.innerHTML = '';
        
        if (this.gameState.badges.length === 0) {
            this.badgesContainer.innerHTML = '<div class="badge-placeholder">Earn badges by completing challenges!</div>';
            return;
        }
        
        this.gameState.badges.forEach(badgeKey => {
            const badge = this.badges[badgeKey];
            if (badge) {
                const badgeEl = document.createElement('div');
                badgeEl.className = 'badge';
                badgeEl.innerHTML = `<i class="fas ${badge.icon}"></i>`;
                badgeEl.title = badge.name;
                badgeEl.style.color = badge.color;
                this.badgesContainer.appendChild(badgeEl);
            }
        });
    },
    
    checkBadges: function(speed, accuracy) {
        const newBadges = [];
        
        // Speed badges
        if (speed >= 80 && !this.gameState.badges.includes('speed_demon')) {
            newBadges.push('speed_demon');
            this.gameState.badges.push('speed_demon');
        }
        
        // Accuracy badges
        if (accuracy === 100 && !this.gameState.badges.includes('perfect_coder')) {
            newBadges.push('perfect_coder');
            this.gameState.badges.push('perfect_coder');
        }
        
        // Consistency badges
        if (this.gameState.streak >= 5 && !this.gameState.badges.includes('consistency_king')) {
            newBadges.push('consistency_king');
            this.gameState.badges.push('consistency_king');
        }
        
        // Show badge notification if any earned
        if (newBadges.length > 0) {
            this.showBadgeNotification(newBadges);
        }
    },
    
    showBadgeNotification: function(badgeKeys) {
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        
        const badgeNames = badgeKeys.map(key => this.badges[key].name).join(', ');
        notification.innerHTML = `
            <div class="badge-notification-content">
                <i class="fas fa-medal"></i>
                <div>
                    <h4>New Badge${badgeKeys.length > 1 ? 's' : ''} Earned!</h4>
                    <p>${badgeNames}</p>
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
    
    showLevelUpNotification: function() {
        const notification = document.createElement('div');
        notification.className = 'levelup-notification';
        notification.innerHTML = `
            <div class="levelup-content">
                <i class="fas fa-level-up-alt"></i>
                <div>
                    <h4>Level Up!</h4>
                    <p>You've reached Level ${this.gameState.level}</p>
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
    
    nextAlgorithm: function() {
        // Hide completion screen
        this.completionScreen.style.opacity = '0';
        this.completionScreen.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.loadNewAlgorithm();
        }, 300);
    },
    
    practiceAgain: function() {
        // Reset and restart current algorithm
        this.completionScreen.style.opacity = '0';
        this.completionScreen.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.loadNewAlgorithm();
        }, 300);
    },
    
    changeComplexity: function(complexity) {
        // Update active button
        document.querySelectorAll('.complexity-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update game state
        this.gameState.currentComplexity = complexity;
        
        // Load new algorithm with new complexity
        this.loadNewAlgorithm();
    },
    
    showAlgorithmDetails: function() {
        this.algorithmDetails.style.display = 'block';
        setTimeout(() => {
            this.algorithmDetails.style.opacity = '1';
            this.algorithmDetails.style.transform = 'translateY(0)';
        }, 10);
    },
    
    hideAlgorithmDetails: function() {
        this.algorithmDetails.style.opacity = '0';
        this.algorithmDetails.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            this.algorithmDetails.style.display = 'none';
        }, 300);
    },
    
    generateVisualization: function() {
        const visualization = document.getElementById('algorithmVisualization');
        const algorithmName = this.gameState.currentAlgorithm.name;
        
        let html = '';
        
        if (algorithmName.includes('Search')) {
            html = `
                <div class="search-visualization">
                    <div class="array-container">
                        <div class="array-label">Array: [1, 3, 5, 7, 9, 11, 13]</div>
                        <div class="array-elements">
                            <div class="array-element">1</div>
                            <div class="array-element">3</div>
                            <div class="array-element">5</div>
                            <div class="array-element">7</div>
                            <div class="array-element">9</div>
                            <div class="array-element">11</div>
                            <div class="array-element">13</div>
                        </div>
                    </div>
                    <div class="search-target">Target: 9</div>
                    <div class="search-pointer" id="searchPointer">↑</div>
                </div>
            `;
        } else if (algorithmName.includes('Sort')) {
            html = `
                <div class="sort-visualization">
                    <div class="sort-stages">
                        <div class="sort-stage">
                            <span>Initial:</span>
                            <div class="stage-array">[5, 2, 8, 1, 9]</div>
                        </div>
                        <div class="sort-stage">
                            <span>Step 1:</span>
                            <div class="stage-array">[2, 5, 8, 1, 9]</div>
                        </div>
                        <div class="sort-stage">
                            <span>Step 2:</span>
                            <div class="stage-array">[2, 5, 1, 8, 9]</div>
                        </div>
                        <div class="sort-stage">
                            <span>Sorted:</span>
                            <div class="stage-array sorted">[1, 2, 5, 8, 9]</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (algorithmName.includes('BFS') || algorithmName.includes('DFS')) {
            html = `
                <div class="graph-visualization">
                    <div class="graph-container">
                        <div class="graph-node" style="top: 50px; left: 100px;">A</div>
                        <div class="graph-node" style="top: 50px; left: 200px;">B</div>
                        <div class="graph-node" style="top: 150px; left: 50px;">C</div>
                        <div class="graph-node" style="top: 150px; left: 150px;">D</div>
                        <div class="graph-node" style="top: 150px; left: 250px;">E</div>
                        <div class="graph-connection" style="top: 70px; left: 120px; width: 80px;"></div>
                        <div class="graph-connection" style="top: 100px; left: 70px; transform: rotate(45deg); width: 80px;"></div>
                        <div class="graph-connection" style="top: 100px; left: 170px; transform: rotate(-45deg); width: 80px;"></div>
                        <div class="graph-connection" style="top: 170px; left: 170px; width: 80px;"></div>
                    </div>
                    <div class="graph-traversal">Traversal: A → B → C → D → E</div>
                </div>
            `;
        } else {
            html = '<p>Visualization not available for this algorithm.</p>';
        }
        
        visualization.innerHTML = html;
    },
    
    updatePersonalStats: function() {
        document.getElementById('totalAlgorithms').textContent = this.gameState.totalAlgorithms;
        document.getElementById('highestWPM').textContent = this.gameState.highestWPM;
        document.getElementById('averageAccuracy').textContent = `${Math.round(this.gameState.totalAccuracy)}%`;
        
        // Determine mastery level
        let masteryLevel = 'Beginner';
        if (this.gameState.level >= 5) masteryLevel = 'Intermediate';
        if (this.gameState.level >= 8) masteryLevel = 'Advanced';
        if (this.gameState.level >= 10) masteryLevel = 'Expert';
        if (this.gameState.badges.length >= 5) masteryLevel = 'Master';
        
        document.getElementById('masteryLevel').textContent = masteryLevel;
    },
    
    updateLeaderboard: function() {
        // Sample leaderboard data
        const leaderboardData = [
            { rank: 1, name: 'CodeMaster42', level: 15, score: 12500, algorithms: 47 },
            { rank: 2, name: 'AlgoNinja', level: 12, score: 9800, algorithms: 35 },
            { rank: 3, name: 'BinaryQueen', level: 10, score: 8500, algorithms: 30 },
            { rank: 4, name: 'SortingSavant', level: 9, score: 7200, algorithms: 28 },
            { rank: 5, name: 'GraphGuru', level: 8, score: 6500, algorithms: 25 }
        ];
        
        // Add current player at appropriate rank
        const currentPlayer = {
            rank: 6,
            name: 'You',
            level: this.gameState.level,
            score: this.gameState.score * this.gameState.gamesPlayed,
            algorithms: this.gameState.totalAlgorithms
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
                    <td>${player.level}</td>
                    <td>${player.score.toLocaleString()}</td>
                    <td>${player.algorithms}</td>
                </tr>
            `;
        });
        
        this.leaderboardBody.innerHTML = html;
    },
    
    saveGameState: function() {
        try {
            localStorage.setItem('keyboardCoderQuest', JSON.stringify(this.gameState));
        } catch (e) {
            console.log('Could not save game state:', e);
        }
    },
    
    loadGameState: function() {
        try {
            const saved = localStorage.getItem('keyboardCoderQuest');
            if (saved) {
                const savedState = JSON.parse(saved);
                // Merge saved state with defaults
                Object.assign(this.gameState, savedState);
                
                // Update UI with loaded state
                this.updateProgressUI();
                this.updatePersonalStats();
                this.updateLeaderboard();
            }
        } catch (e) {
            console.log('Could not load game state:', e);
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
                min-height: 250px;
                max-height: 400px;
                overflow-y: auto;
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
                font-size: 1.2rem;
                line-height: 1.6;
                color: rgba(224, 224, 255, 0.7);
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
            
            .badge-notification, .levelup-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 1002;
                max-width: 300px;
                opacity: 1;
                transition: opacity 0.3s;
            }
            
            .badge-notification-content, .levelup-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .badge-notification i, .levelup-notification i {
                font-size: 2rem;
            }
            
            .challenge-progress {
                background: rgba(15, 22, 46, 0.8);
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
                border: 1px solid rgba(64, 224, 208, 0.2);
            }
            
            .progress-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            .level-display {
                display: flex;
                align-items: center;
                gap: 15px;
                flex: 1;
            }
            
            .xp-bar {
                flex: 2;
                height: 10px;
                background: rgba(30, 30, 70, 0.7);
                border-radius: 5px;
                overflow: hidden;
            }
            
            .xp-fill {
                height: 100%;
                width: 0%;
                background: linear-gradient(to right, #4facfe, #00f2fe);
                transition: width 0.5s;
            }
            
            .streak-display {
                display: flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #ff7e5f, #feb47b);
                padding: 8px 15px;
                border-radius: 20px;
                color: white;
                font-weight: bold;
            }
            
            .badges-earned h4 {
                margin-bottom: 15px;
                color: #00f2fe;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .badges-container {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                min-height: 50px;
            }
            
            .badge {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(30, 30, 70, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                border: 2px solid;
                transition: transform 0.3s;
            }
            
            .badge:hover {
                transform: scale(1.2);
            }
            
            .badge-placeholder {
                color: #b0b0ff;
                font-style: italic;
                padding: 10px;
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
                border: 2px solid #00f2fe;
                box-shadow: 0 0 30px rgba(0, 242, 254, 0.3);
            }
            
            .completion-content h3 {
                text-align: center;
                margin-bottom: 30px;
                color: #00f2fe;
                font-size: 2rem;
            }
            
            .completion-stats {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin-bottom: 30px;
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
            
            .completion-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .algorithm-details {
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
            
            .algorithm-details h4 {
                color: #00f2fe;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .details-content {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }
            
            .detail-section {
                background: rgba(30, 30, 70, 0.7);
                padding: 20px;
                border-radius: 10px;
            }
            
            .detail-section h5 {
                color: #4facfe;
                margin-bottom: 10px;
            }
            
            .detail-section p {
                color: #e0e0ff;
            }
            
            .visualization {
                margin-top: 15px;
            }
            
            .close-details {
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
            
            .leaderboard-panel {
                margin-top: 30px;
                background: rgba(15, 22, 46, 0.8);
                border-radius: 15px;
                padding: 25px;
                border: 1px solid rgba(64, 224, 208, 0.2);
            }
            
            .leaderboard-panel h3 {
                color: #00f2fe;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .leaderboard-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 25px;
            }
            
            .leaderboard-table th {
                background: rgba(64, 224, 208, 0.2);
                color: #00f2fe;
                padding: 12px;
                text-align: left;
            }
            
            .leaderboard-table td {
                padding: 12px;
                border-bottom: 1px solid rgba(64, 224, 208, 0.1);
                color: #e0e0ff;
            }
            
            .leaderboard-table tr.current-player {
                background: rgba(64, 224, 208, 0.1);
                font-weight: bold;
            }
            
            .leaderboard-table tr.current-player td {
                color: #00f2fe;
            }
            
            .personal-stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .personal-stat {
                background: rgba(30, 30, 70, 0.7);
                padding: 15px;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
            }
            
            .personal-stat span:first-child {
                color: #b0b0ff;
            }
            
            .personal-stat span:last-child {
                color: #00f2fe;
                font-weight: bold;
            }
            
            .game-controls {
                display: flex;
                gap: 20px;
                margin-top: 20px;
                flex-wrap: wrap;
            }
            
            .algorithm-category, .complexity-selector {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .algorithm-category select {
                background: rgba(30, 30, 70, 0.7);
                color: #e0e0ff;
                border: 1px solid rgba(64, 224, 208, 0.3);
                padding: 8px 15px;
                border-radius: 8px;
                outline: none;
            }
            
            .algorithm-category select:focus {
                border-color: #00f2fe;
            }
            
            .complexity-btn {
                padding: 8px 15px;
                border-radius: 8px;
                background: rgba(30, 30, 70, 0.7);
                border: 1px solid rgba(64, 224, 208, 0.3);
                color: #b0b0ff;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: 600;
                font-family: 'Courier New', monospace;
            }
            
            .complexity-btn.active {
                background: linear-gradient(to right, #4facfe, #00f2fe);
                color: #0f0c29;
                border-color: #4facfe;
                box-shadow: 0 0 15px rgba(79, 172, 254, 0.5);
            }
            
            .complexity-btn:hover:not(.active) {
                background: rgba(64, 224, 208, 0.2);
                transform: translateY(-2px);
            }
            
            .algorithm-info {
                display: flex;
                gap: 15px;
                color: #b0b0ff;
                font-size: 0.9rem;
            }
            
            .algorithm-description {
                background: rgba(30, 30, 70, 0.7);
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 20px;
                border-left: 4px solid #4facfe;
            }
            
            .algorithm-description p {
                color: #e0e0ff;
                line-height: 1.5;
            }
            
            @media (max-width: 768px) {
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
                
                .typing-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .completion-stats {
                    grid-template-columns: 1fr;
                }
                
                .completion-actions {
                    flex-direction: column;
                }
                
                .details-content {
                    grid-template-columns: 1fr;
                }
                
                .game-controls {
                    flex-direction: column;
                }
            }
            
            @media (max-width: 480px) {
                .typing-stats {
                    grid-template-columns: 1fr;
                }
                
                .progress-info {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .level-display {
                    flex-direction: column;
                    gap: 10px;
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