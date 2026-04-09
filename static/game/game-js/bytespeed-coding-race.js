window.PatternMatch = {
    init: function(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3><i class="fas fa-racing-flag"></i> ByteSpeed Coding Race</h3>
                <p>Race against time typing code patterns! Beat the clock and climb the leaderboard.</p>
                <div class="race-controls">
                    <button class="race-btn active" data-mode="sprint">Sprint Race</button>
                    <button class="race-btn" data-mode="marathon">Marathon</button>
                    <button class="race-btn" data-mode="pattern">Pattern Match</button>
                </div>
            </div>
            
            <div class="race-game-container">
                <div class="race-header">
                    <h3><i class="fas fa-code"></i> Coding Race <span class="race-mode-indicator">Sprint</span></h3>
                    <div class="race-actions">
                        <button class="action-btn" id="newRaceBtn">
                            <i class="fas fa-play-circle"></i> Start Race
                        </button>
                        <button class="action-btn" id="pauseRaceBtn">
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button class="action-btn" id="raceLeaderboardBtn">
                            <i class="fas fa-trophy"></i> Leaderboard
                        </button>
                    </div>
                </div>
                
                <div class="race-info-section">
                    <div class="race-timer-container">
                        <div class="race-timer" id="raceTimer">
                            <i class="fas fa-clock"></i>
                            <span id="timerValue">60</span>
                        </div>
                        <div class="race-progress">
                            <div class="lap-counter">
                                <i class="fas fa-flag-checkered"></i>
                                Lap: <span id="lapCount">1</span>/<span id="totalLaps">5</span>
                            </div>
                            <div class="speedometer">
                                <i class="fas fa-tachometer-alt"></i>
                                Speed: <span id="currentSpeed">0</span> WPM
                            </div>
                        </div>
                    </div>
                    
                    <div class="race-track">
                        <div class="track-visual">
                            <div class="track-line"></div>
                            <div class="car-icon" id="raceCar">
                                <i class="fas fa-car"></i>
                            </div>
                            <div class="checkpoint" id="checkpoint1"></div>
                            <div class="checkpoint" id="checkpoint2"></div>
                            <div class="checkpoint" id="checkpoint3"></div>
                            <div class="checkpoint" id="checkpoint4"></div>
                            <div class="checkpoint" id="checkpoint5"></div>
                        </div>
                    </div>
                </div>
                
                <div class="race-challenge-section">
                    <div class="challenge-header">
                        <div class="pattern-info">
                            <span class="pattern-type" id="patternType">For Loop</span>
                            <span class="pattern-complexity" id="patternComplexity">Basic</span>
                            <span class="pattern-points">Points: <span id="patternPoints">100</span></span>
                        </div>
                        <div class="time-bonus">
                            <i class="fas fa-bolt"></i>
                            Time Bonus: <span id="timeBonus">+0</span>
                        </div>
                    </div>
                    
                    <div class="code-race-area">
                        <div class="typing-target" id="raceTypingTarget" tabindex="0">
                            <div class="code-container" id="raceCodeContainer">
                                <!-- Code will be dynamically inserted here -->
                            </div>
                        </div>
                        
                        <div class="typing-hint">
                            <p><i class="fas fa-info-circle"></i> Type fast and accurately! Speed affects your car's position on the track.</p>
                        </div>
                    </div>
                    
                    <div class="race-feedback">
                        <div class="combo-meter">
                            <div class="combo-bar" id="comboBar"></div>
                            <div class="combo-text">
                                <i class="fas fa-fire"></i>
                                Combo: <span id="comboCount">0</span>x
                            </div>
                        </div>
                        <div class="accuracy-display">
                            <div class="accuracy-bar">
                                <div class="accuracy-fill" id="accuracyFill"></div>
                            </div>
                            <div class="accuracy-text">
                                Accuracy: <span id="currentAccuracy">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="race-stats-section">
                    <div class="race-stats-grid">
                        <div class="race-stat">
                            <div class="race-stat-icon">
                                <i class="fas fa-flag-checkered"></i>
                            </div>
                            <div class="race-stat-content">
                                <span class="race-stat-label">Lap Time</span>
                                <span class="race-stat-value" id="lapTime">0.0s</span>
                            </div>
                        </div>
                        <div class="race-stat">
                            <div class="race-stat-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="race-stat-content">
                                <span class="race-stat-label">Total Score</span>
                                <span class="race-stat-value" id="totalScore">0</span>
                            </div>
                        </div>
                        <div class="race-stat">
                            <div class="race-stat-icon">
                                <i class="fas fa-bolt"></i>
                            </div>
                            <div class="race-stat-content">
                                <span class="race-stat-label">Best Speed</span>
                                <span class="race-stat-value" id="bestSpeed">0 WPM</span>
                            </div>
                        </div>
                        <div class="race-stat">
                            <div class="race-stat-icon">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <div class="race-stat-content">
                                <span class="race-stat-label">Best Accuracy</span>
                                <span class="race-stat-value" id="bestAccuracy">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="race-controls-section">
                    <div class="control-buttons">
                        <button class="control-btn turbo-btn" id="turboBtn" disabled>
                            <i class="fas fa-rocket"></i> Turbo Boost
                        </button>
                        <button class="control-btn" id="skipPatternBtn">
                            <i class="fas fa-forward"></i> Skip Pattern
                        </button>
                        <button class="control-btn" id="hintBtn">
                            <i class="fas fa-lightbulb"></i> Get Hint
                        </button>
                    </div>
                    <div class="turbo-charge">
                        <div class="turbo-bar">
                            <div class="turbo-fill" id="turboFill"></div>
                        </div>
                        <div class="turbo-text">Turbo: <span id="turboCharge">0%</span></div>
                    </div>
                </div>
                
                <div class="race-results-panel" id="raceResultsPanel">
                    <div class="race-results-content">
                        <h3><i class="fas fa-flag-checkered"></i> Race Complete!</h3>
                        <div class="race-summary">
                            <div class="summary-stat">
                                <span>Final Score:</span>
                                <span class="summary-value" id="finalRaceScore">0</span>
                            </div>
                            <div class="summary-stat">
                                <span>Average Speed:</span>
                                <span class="summary-value" id="averageRaceSpeed">0 WPM</span>
                            </div>
                            <div class="summary-stat">
                                <span>Average Accuracy:</span>
                                <span class="summary-value" id="averageRaceAccuracy">100%</span>
                            </div>
                            <div class="summary-stat">
                                <span>Total Time:</span>
                                <span class="summary-value" id="totalRaceTime">0.0s</span>
                            </div>
                            <div class="summary-stat">
                                <span>Laps Completed:</span>
                                <span class="summary-value" id="lapsCompleted">0/5</span>
                            </div>
                        </div>
                        
                        <div class="race-achievements">
                            <h4><i class="fas fa-trophy"></i> Race Achievements</h4>
                            <div class="achievements-list" id="raceAchievementsList">
                                <!-- Achievements will be added here -->
                            </div>
                        </div>
                        
                        <div class="race-actions">
                            <button class="action-btn primary" id="raceAgainBtn">
                                <i class="fas fa-redo"></i> Race Again
                            </button>
                            <button class="action-btn" id="shareRaceBtn">
                                <i class="fas fa-share-alt"></i> Share Results
                            </button>
                            <button class="action-btn" id="viewLeaderboardBtn">
                                <i class="fas fa-trophy"></i> View Leaderboard
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="leaderboard-panel" id="leaderboardPanel">
                    <div class="leaderboard-content">
                        <h3><i class="fas fa-trophy"></i> ByteSpeed Leaderboard</h3>
                        <div class="leaderboard-tabs">
                            <button class="leaderboard-tab active" data-period="daily">Daily</button>
                            <button class="leaderboard-tab" data-period="weekly">Weekly</button>
                            <button class="leaderboard-tab" data-period="alltime">All Time</button>
                        </div>
                        <div class="leaderboard-table">
                            <div class="leaderboard-header">
                                <div class="rank-header">Rank</div>
                                <div class="name-header">Player</div>
                                <div class="score-header">Score</div>
                                <div class="speed-header">Speed</div>
                                <div class="date-header">Date</div>
                            </div>
                            <div class="leaderboard-body" id="leaderboardBody">
                                <!-- Leaderboard entries will be added here -->
                            </div>
                        </div>
                        <div class="leaderboard-actions">
                            <button class="action-btn" id="closeLeaderboardBtn">
                                <i class="fas fa-times"></i> Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="keyboard-shortcuts">
                <h4><i class="fas fa-keyboard"></i> Race Controls</h4>
                <div class="shortcuts-grid">
                    <div class="shortcut">
                        <kbd>Space</kbd>
                        <span>Start/Pause Race</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Tab</kbd>
                        <span>Focus typing area</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + R</kbd>
                        <span>New race</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Shift</kbd>
                        <span>Activate turbo (when charged)</span>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize the race typing game
        setTimeout(() => this.initRaceTypingGame(), 100);
    },
    
    initRaceTypingGame: function() {
        // Game state for race typing
        this.raceGameState = {
            currentCode: '',
            typedChars: [],
            startTime: null,
            isRacing: false,
            isPaused: false,
            currentCharIndex: 0,
            totalErrors: 0,
            totalKeystrokes: 0,
            currentMode: 'sprint',
            score: 0,
            turboCharge: 0,
            turboActive: false,
            comboCount: 0,
            maxCombo: 0,
            lapCount: 1,
            totalLaps: 5,
            lapTimes: [],
            currentLapStartTime: null,
            raceTime: 60,
            timeRemaining: 60,
            timerInterval: null,
            currentPatternType: '',
            currentPatternComplexity: '',
            raceSpeed: 0,
            raceAccuracy: 100,
            bestSpeed: 0,
            bestAccuracy: 100,
            achievements: [],
            leaderboard: [],
            currentRaceId: null,
            carPosition: 0,
            checkpointTimes: []
        };
        
        // Race patterns database
        this.racePatterns = {
            types: ['For Loop', 'While Loop', 'Function', 'If Statement', 'Array Method', 'String Method', 'Object', 'Promise', 'Async/Await', 'Event Listener'],
            complexities: ['Basic', 'Intermediate', 'Advanced', 'Expert'],
            
            patterns: [
                // Basic Patterns
                {
                    type: 'For Loop',
                    complexity: 'Basic',
                    code: "for (let i = 0; i < 10; i++) {\n    console.log(i);\n}",
                    points: 100,
                    timeBonus: 30
                },
                {
                    type: 'While Loop',
                    complexity: 'Basic',
                    code: "let i = 0;\nwhile (i < 10) {\n    console.log(i);\n    i++;\n}",
                    points: 110,
                    timeBonus: 35
                },
                {
                    type: 'If Statement',
                    complexity: 'Basic',
                    code: "if (score > 100) {\n    console.log('High score!');\n} else {\n    console.log('Keep trying!');\n}",
                    points: 90,
                    timeBonus: 25
                },
                
                // Intermediate Patterns
                {
                    type: 'Array Method',
                    complexity: 'Intermediate',
                    code: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled);",
                    points: 150,
                    timeBonus: 40
                },
                {
                    type: 'Function',
                    complexity: 'Intermediate',
                    code: "function calculateSum(a, b) {\n    return a + b;\n}\nconst result = calculateSum(5, 3);",
                    points: 140,
                    timeBonus: 45
                },
                {
                    type: 'String Method',
                    complexity: 'Intermediate',
                    code: "const message = 'Hello World';\nconst upperCase = message.toUpperCase();\nconst reversed = message.split('').reverse().join('');",
                    points: 160,
                    timeBonus: 50
                },
                
                // Advanced Patterns
                {
                    type: 'Object',
                    complexity: 'Advanced',
                    code: "const user = {\n    name: 'John',\n    age: 30,\n    greet() {\n        return `Hello, ${this.name}`;\n    }\n};",
                    points: 200,
                    timeBonus: 60
                },
                {
                    type: 'Promise',
                    complexity: 'Advanced',
                    code: "fetch('https://api.example.com/data')\n    .then(response => response.json())\n    .then(data => console.log(data))\n    .catch(error => console.error(error));",
                    points: 220,
                    timeBonus: 65
                },
                {
                    type: 'Async/Await',
                    complexity: 'Advanced',
                    code: "async function getUser(id) {\n    try {\n        const response = await fetch(`/api/users/${id}`);\n        return await response.json();\n    } catch (error) {\n        console.error(error);\n    }\n}",
                    points: 230,
                    timeBonus: 70
                },
                
                // Expert Patterns
                {
                    type: 'Event Listener',
                    complexity: 'Expert',
                    code: "document.addEventListener('DOMContentLoaded', () => {\n    const button = document.querySelector('#submit');\n    button.addEventListener('click', (event) => {\n        event.preventDefault();\n        console.log('Form submitted!');\n    });\n});",
                    points: 300,
                    timeBonus: 90
                },
                {
                    type: 'Array Method',
                    complexity: 'Expert',
                    code: "const data = [1, 2, 3, 4, 5];\nconst result = data\n    .filter(x => x % 2 === 0)\n    .map(x => x * x)\n    .reduce((sum, x) => sum + x, 0);",
                    points: 280,
                    timeBonus: 85
                },
                {
                    type: 'For Loop',
                    complexity: 'Expert',
                    code: "for (let i = 0; i < matrix.length; i++) {\n    for (let j = 0; j < matrix[i].length; j++) {\n        console.log(`Element at [${i}][${j}] = ${matrix[i][j]}`);\n    }\n}",
                    points: 270,
                    timeBonus: 80
                }
            ]
        };
        
        // Initialize UI elements
        this.raceTypingTarget = document.getElementById('raceTypingTarget');
        this.raceCodeContainer = document.getElementById('raceCodeContainer');
        this.raceTimer = document.getElementById('timerValue');
        this.lapCount = document.getElementById('lapCount');
        this.totalLaps = document.getElementById('totalLaps');
        this.currentSpeed = document.getElementById('currentSpeed');
        this.raceCar = document.getElementById('raceCar');
        this.patternType = document.getElementById('patternType');
        this.patternComplexity = document.getElementById('patternComplexity');
        this.patternPoints = document.getElementById('patternPoints');
        this.timeBonus = document.getElementById('timeBonus');
        this.comboBar = document.getElementById('comboBar');
        this.comboCount = document.getElementById('comboCount');
        this.accuracyFill = document.getElementById('accuracyFill');
        this.currentAccuracy = document.getElementById('currentAccuracy');
        this.lapTime = document.getElementById('lapTime');
        this.totalScore = document.getElementById('totalScore');
        this.bestSpeed = document.getElementById('bestSpeed');
        this.bestAccuracy = document.getElementById('bestAccuracy');
        this.turboFill = document.getElementById('turboFill');
        this.turboCharge = document.getElementById('turboCharge');
        this.raceResultsPanel = document.getElementById('raceResultsPanel');
        this.leaderboardPanel = document.getElementById('leaderboardPanel');
        
        // Set initial race parameters based on mode
        this.setupRaceMode();
        
        // Event listeners
        this.setupRaceEventListeners();
        
        // Start the game
        this.startRaceGame();
    },
    
    setupRaceEventListeners: function() {
        // Typing on the code container
        this.raceTypingTarget.addEventListener('keydown', (e) => this.handleRaceKeyDown(e));
        this.raceTypingTarget.addEventListener('click', () => {
            this.raceTypingTarget.focus();
            this.positionRaceCursor();
        });
        
        // Global shortcuts
        document.addEventListener('keydown', (e) => {
            // Space to start/pause race
            if (e.key === ' ' && e.target !== this.raceTypingTarget) {
                e.preventDefault();
                if (!this.raceGameState.isRacing) {
                    this.startRace();
                } else if (!this.raceGameState.isPaused) {
                    this.pauseRace();
                } else {
                    this.resumeRace();
                }
            }
            
            // Ctrl + R for new race
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                this.newRace();
            }
            
            // Shift for turbo boost
            if (e.key === 'Shift' && this.raceGameState.turboCharge >= 100) {
                e.preventDefault();
                this.activateTurbo();
            }
            
            // Tab to focus typing area
            if (e.key === 'Tab' && !this.raceGameState.isRacing) {
                e.preventDefault();
                this.raceTypingTarget.focus();
            }
        });
        
        // Race mode buttons
        document.querySelectorAll('.race-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeRaceMode(e.target.dataset.mode));
        });
        
        // Action buttons
        document.getElementById('newRaceBtn').addEventListener('click', () => this.startRace());
        document.getElementById('pauseRaceBtn').addEventListener('click', () => this.togglePauseRace());
        document.getElementById('raceLeaderboardBtn').addEventListener('click', () => this.showLeaderboard());
        document.getElementById('turboBtn').addEventListener('click', () => this.activateTurbo());
        document.getElementById('skipPatternBtn').addEventListener('click', () => this.skipPattern());
        document.getElementById('hintBtn').addEventListener('click', () => this.showRaceHint());
        document.getElementById('raceAgainBtn').addEventListener('click', () => this.newRace());
        document.getElementById('shareRaceBtn').addEventListener('click', () => this.shareRaceResults());
        document.getElementById('viewLeaderboardBtn').addEventListener('click', () => this.showLeaderboard());
        document.getElementById('closeLeaderboardBtn').addEventListener('click', () => this.hideLeaderboard());
        
        // Leaderboard tabs
        document.querySelectorAll('.leaderboard-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.changeLeaderboardPeriod(e.target.dataset.period));
        });
        
        // Initialize panels as hidden
        this.raceResultsPanel.style.display = 'none';
        this.leaderboardPanel.style.display = 'none';
    },
    
    setupRaceMode: function() {
        // Set race parameters based on mode
        switch(this.raceGameState.currentMode) {
            case 'sprint':
                this.raceGameState.totalLaps = 5;
                this.raceGameState.raceTime = 60;
                this.raceGameState.timeRemaining = 60;
                break;
            case 'marathon':
                this.raceGameState.totalLaps = 10;
                this.raceGameState.raceTime = 120;
                this.raceGameState.timeRemaining = 120;
                break;
            case 'pattern':
                this.raceGameState.totalLaps = 8;
                this.raceGameState.raceTime = 90;
                this.raceGameState.timeRemaining = 90;
                break;
        }
        
        // Update UI
        document.querySelector('.race-mode-indicator').textContent = 
            this.raceGameState.currentMode.charAt(0).toUpperCase() + 
            this.raceGameState.currentMode.slice(1);
        
        this.totalLaps.textContent = this.raceGameState.totalLaps;
        this.raceTimer.textContent = this.raceGameState.timeRemaining;
        
        // Reset game state for new mode
        this.resetRaceState();
        
        // Load first pattern
        this.loadNewPattern();
    },
    
    resetRaceState: function() {
        this.raceGameState.currentCharIndex = 0;
        this.raceGameState.typedChars = [];
        this.raceGameState.totalErrors = 0;
        this.raceGameState.totalKeystrokes = 0;
        this.raceGameState.isRacing = false;
        this.raceGameState.isPaused = false;
        this.raceGameState.score = 0;
        this.raceGameState.turboCharge = 0;
        this.raceGameState.turboActive = false;
        this.raceGameState.comboCount = 0;
        this.raceGameState.maxCombo = 0;
        this.raceGameState.lapCount = 1;
        this.raceGameState.lapTimes = [];
        this.raceGameState.currentLapStartTime = null;
        this.raceGameState.carPosition = 0;
        this.raceGameState.checkpointTimes = [];
        this.raceGameState.currentRaceId = Date.now().toString();
        
        // Update UI
        this.lapCount.textContent = '1';
        this.totalScore.textContent = '0';
        this.bestSpeed.textContent = '0 WPM';
        this.bestAccuracy.textContent = '100%';
        this.currentSpeed.textContent = '0';
        this.currentAccuracy.textContent = '100%';
        this.comboCount.textContent = '0';
        this.lapTime.textContent = '0.0s';
        this.turboCharge.textContent = '0%';
        
        // Reset visual elements
        this.comboBar.style.width = '0%';
        this.accuracyFill.style.width = '100%';
        this.turboFill.style.width = '0%';
        this.updateCarPosition(0);
        
        // Clear any existing overlays
        document.querySelectorAll('.race-typed-overlay-char').forEach(el => el.remove());
        
        // Enable/disable buttons
        document.getElementById('turboBtn').disabled = true;
        document.getElementById('pauseRaceBtn').innerHTML = '<i class="fas fa-pause"></i> Pause';
    },
    
    loadNewPattern: function() {
        // Reset typing state
        this.raceGameState.currentCharIndex = 0;
        this.raceGameState.typedChars = [];
        this.raceGameState.totalErrors = 0;
        this.raceGameState.totalKeystrokes = 0;
        
        // Clear previous code
        this.raceCodeContainer.innerHTML = '';
        document.querySelectorAll('.race-typed-overlay-char').forEach(el => el.remove());
        const cursor = document.querySelector('.race-typing-cursor');
        if (cursor) cursor.remove();
        
        // Select pattern based on current mode and lap
        let pattern;
        if (this.raceGameState.currentMode === 'pattern') {
            // For pattern mode, select specific pattern types
            const patternTypes = this.getPatternsForLap(this.raceGameState.lapCount);
            pattern = patternTypes[Math.floor(Math.random() * patternTypes.length)];
        } else {
            // For other modes, select random pattern with appropriate complexity
            const lapDifficulty = Math.min(Math.ceil(this.raceGameState.lapCount / 2), 4);
            const availablePatterns = this.racePatterns.patterns.filter(p => {
                const complexityIndex = this.racePatterns.complexities.indexOf(p.complexity) + 1;
                return complexityIndex <= lapDifficulty;
            });
            
            pattern = availablePatterns[Math.floor(Math.random() * availablePatterns.length)];
        }
        
        // Update game state
        this.raceGameState.currentCode = pattern.code;
        this.raceGameState.currentPatternType = pattern.type;
        this.raceGameState.currentPatternComplexity = pattern.complexity;
        
        // Start lap timer
        this.raceGameState.currentLapStartTime = new Date();
        
        // Update UI
        this.patternType.textContent = pattern.type;
        this.patternComplexity.textContent = pattern.complexity;
        this.patternPoints.textContent = pattern.points;
        this.timeBonus.textContent = `+${pattern.timeBonus}`;
        
        // Render code
        this.renderRaceCode();
        
        // Focus on typing target if race is active
        if (this.raceGameState.isRacing && !this.raceGameState.isPaused) {
            this.raceTypingTarget.focus();
            this.positionRaceCursor();
        }
        
        // Update combo display
        this.updateComboDisplay();
    },
    
    getPatternsForLap: function(lap) {
        // Return specific pattern types for each lap in pattern mode
        const lapPatterns = [
            ['For Loop', 'While Loop'],
            ['If Statement', 'Function'],
            ['Array Method', 'String Method'],
            ['Object', 'Promise'],
            ['Async/Await', 'Event Listener'],
            ['For Loop', 'Array Method', 'Object'],
            ['Function', 'Promise', 'Async/Await'],
            ['Event Listener', 'String Method', 'While Loop']
        ];
        
        const lapIndex = (lap - 1) % lapPatterns.length;
        return this.racePatterns.patterns.filter(p => 
            lapPatterns[lapIndex].includes(p.type)
        );
    },
    
    renderRaceCode: function() {
        const code = this.raceGameState.currentCode;
        
        // Clear container
        this.raceCodeContainer.innerHTML = '';
        
        // Split code into lines
        const lines = code.split('\n');
        
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'race-code-line';
            
            // Process each character in the line
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                const charSpan = document.createElement('span');
                charSpan.className = 'race-char-element';
                charSpan.dataset.index = lineIndex * 1000 + i;
                
                // Handle special characters
                if (char === ' ') {
                    charSpan.innerHTML = '&nbsp;';
                    charSpan.classList.add('race-space-char');
                } else if (char === '\t') {
                    charSpan.innerHTML = '&nbsp;&nbsp;';
                    charSpan.classList.add('race-tab-char');
                } else {
                    charSpan.textContent = char;
                    
                    // Add syntax highlighting
                    if (this.isRaceKeyword(line, i)) {
                        charSpan.classList.add('race-keyword');
                    } else if (this.isRaceString(line, i)) {
                        charSpan.classList.add('race-string');
                    } else if (this.isRaceNumber(line, i)) {
                        charSpan.classList.add('race-number');
                    } else if (this.isRaceOperator(char)) {
                        charSpan.classList.add('race-operator');
                    } else if (this.isRaceBracket(char)) {
                        charSpan.classList.add('race-bracket');
                    }
                }
                
                lineDiv.appendChild(charSpan);
            }
            
            // Add line break if not last line
            if (lineIndex < lines.length - 1) {
                const lineBreak = document.createElement('span');
                lineBreak.className = 'race-char-element race-line-break';
                lineBreak.innerHTML = '<br>';
                lineDiv.appendChild(lineBreak);
            }
            
            this.raceCodeContainer.appendChild(lineDiv);
        }
    },
    
    // Syntax highlighting helpers
    isRaceKeyword: function(line, index) {
        const keywords = ['for', 'let', 'const', 'var', 'if', 'else', 'while', 'function', 'return', 
                         'console', 'log', 'async', 'await', 'try', 'catch', 'fetch', 'document', 
                         'addEventListener', 'querySelector', 'preventDefault'];
        const substr = line.substr(index);
        for (const keyword of keywords) {
            if (substr.startsWith(keyword) && 
                (substr.length === keyword.length || !/\w/.test(substr[keyword.length]))) {
                return true;
            }
        }
        return false;
    },
    
    isRaceString: function(line, index) {
        const char = line[index];
        return char === '"' || char === "'" || char === '`';
    },
    
    isRaceNumber: function(line, index) {
        const char = line[index];
        return /\d/.test(char);
    },
    
    isRaceOperator: function(char) {
        return '=+-*/%<>!&|^~@:.,;?'.includes(char);
    },
    
    isRaceBracket: function(char) {
        return '{}[]()'.includes(char);
    },
    
    handleRaceKeyDown: function(e) {
        // Only process if race is active and not paused
        if (!this.raceGameState.isRacing || this.raceGameState.isPaused) {
            return;
        }
        
        // Prevent default for keys we handle
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
        }
        
        // Start typing timer on first keystroke if not already started
        if (!this.raceGameState.startTime && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            this.raceGameState.startTime = new Date();
        }
        
        // Handle backspace
        if (e.key === 'Backspace') {
            this.handleRaceBackspace();
            return;
        }
        
        // Handle tab (2 spaces)
        if (e.key === 'Tab') {
            e.preventDefault();
            this.handleRaceTab();
            return;
        }
        
        // Handle enter (new line)
        if (e.key === 'Enter') {
            this.handleRaceEnter();
            return;
        }
        
        // Ignore control keys
        if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
        
        // Handle regular character input
        this.handleRaceCharacter(e.key);
    },
    
    handleRaceCharacter: function(char) {
        const code = this.raceGameState.currentCode;
        const currentIndex = this.raceGameState.currentCharIndex;
        
        // Check if we're at the end
        if (currentIndex >= code.length) {
            return;
        }
        
        // Update keystrokes count
        this.raceGameState.totalKeystrokes++;
        
        const expectedChar = code[currentIndex];
        const isCorrect = char === expectedChar;
        
        // Store typed character
        this.raceGameState.typedChars.push({
            char: char,
            isCorrect: isCorrect,
            position: currentIndex
        });
        
        // Update error count
        if (!isCorrect) {
            this.raceGameState.totalErrors++;
            this.raceGameState.comboCount = 0; // Reset combo on error
        } else {
            this.raceGameState.comboCount++;
            this.raceGameState.maxCombo = Math.max(this.raceGameState.maxCombo, this.raceGameState.comboCount);
            
            // Add turbo charge for correct keystrokes
            this.raceGameState.turboCharge = Math.min(100, this.raceGameState.turboCharge + 0.5);
            this.updateTurboDisplay();
        }
        
        // Move to next character
        this.raceGameState.currentCharIndex++;
        
        // Update display - overlay typed character
        this.overlayRaceTypedCharacter(char, currentIndex, isCorrect);
        
        // Position cursor for next character
        this.positionRaceCursor();
        
        // Update race stats
        this.updateRaceStats();
        
        // Update car position based on speed
        this.updateCarPositionBasedOnSpeed();
        
        // Check if code is complete
        if (this.raceGameState.currentCharIndex === code.length) {
            this.completePattern();
        }
    },
    
    overlayRaceTypedCharacter: function(char, index, isCorrect) {
        // Get the original character element
        const charElements = document.querySelectorAll('.race-char-element');
        if (index >= charElements.length) return;
        
        const originalCharEl = charElements[index];
        
        // Create overlay element
        const overlayEl = document.createElement('div');
        overlayEl.className = `race-typed-overlay-char ${isCorrect ? 'race-correct' : 'race-incorrect'}`;
        overlayEl.textContent = char;
        
        // Get position of original character
        const rect = originalCharEl.getBoundingClientRect();
        const containerRect = this.raceCodeContainer.getBoundingClientRect();
        
        // Position overlay exactly over original character
        overlayEl.style.left = (rect.left - containerRect.left) + 'px';
        overlayEl.style.top = (rect.top - containerRect.top) + 'px';
        overlayEl.style.width = rect.width + 'px';
        overlayEl.style.height = rect.height + 'px';
        
        // Add to container
        this.raceCodeContainer.appendChild(overlayEl);
        
        // Store reference
        this.raceGameState.typedChars[this.raceGameState.typedChars.length - 1].overlayEl = overlayEl;
    },
    
    handleRaceBackspace: function() {
        if (this.raceGameState.currentCharIndex > 0) {
            // Remove last typed character overlay
            const lastTyped = this.raceGameState.typedChars.pop();
            if (lastTyped && lastTyped.overlayEl) {
                lastTyped.overlayEl.remove();
            }
            
            // Move back one character
            this.raceGameState.currentCharIndex--;
            
            // Update stats (backspace counts as a keystroke)
            this.raceGameState.totalKeystrokes++;
            
            // Position cursor
            this.positionRaceCursor();
            
            // Update race stats
            this.updateRaceStats();
        }
    },
    
    handleRaceTab: function() {
        // Add 2 spaces for tab in race game
        for (let i = 0; i < 2; i++) {
            this.handleRaceCharacter(' ');
        }
    },
    
    handleRaceEnter: function() {
        this.handleRaceCharacter('\n');
    },
    
    positionRaceCursor: function() {
        // Remove existing cursor
        const existingCursor = document.querySelector('.race-typing-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // If not racing or paused, don't show cursor
        if (!this.raceGameState.isRacing || this.raceGameState.isPaused || 
            this.raceGameState.currentCharIndex >= this.raceGameState.currentCode.length) {
            return;
        }
        
        // Get current character element
        const charElements = document.querySelectorAll('.race-char-element');
        if (this.raceGameState.currentCharIndex >= charElements.length) return;
        
        const currentCharEl = charElements[this.raceGameState.currentCharIndex];
        const rect = currentCharEl.getBoundingClientRect();
        const containerRect = this.raceCodeContainer.getBoundingClientRect();
        
        // Create cursor
        const cursor = document.createElement('div');
        cursor.className = 'race-typing-cursor';
        cursor.style.left = (rect.left - containerRect.left) + 'px';
        cursor.style.top = (rect.top - containerRect.top) + 'px';
        cursor.style.width = '2px';
        cursor.style.height = rect.height + 'px';
        
        this.raceCodeContainer.appendChild(cursor);
    },
    
    updateRaceStats: function() {
        // Calculate typing speed (WPM)
        let speed = 0;
        if (this.raceGameState.startTime) {
            const timeElapsed = (new Date() - this.raceGameState.startTime) / 1000 / 60;
            const wordsTyped = this.raceGameState.currentCharIndex / 5;
            speed = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        }
        
        // Update speed display
        this.currentSpeed.textContent = speed;
        this.raceGameState.raceSpeed = speed;
        this.raceGameState.bestSpeed = Math.max(this.raceGameState.bestSpeed, speed);
        this.bestSpeed.textContent = `${this.raceGameState.bestSpeed} WPM`;
        
        // Calculate accuracy
        let accuracy = 100;
        if (this.raceGameState.totalKeystrokes > 0) {
            accuracy = Math.max(0, Math.round(((this.raceGameState.totalKeystrokes - this.raceGameState.totalErrors) / this.raceGameState.totalKeystrokes) * 100));
        }
        
        // Update accuracy display
        this.currentAccuracy.textContent = `${accuracy}%`;
        this.accuracyFill.style.width = `${accuracy}%`;
        this.raceGameState.raceAccuracy = accuracy;
        this.raceGameState.bestAccuracy = Math.max(this.raceGameState.bestAccuracy, accuracy);
        this.bestAccuracy.textContent = `${this.raceGameState.bestAccuracy}%`;
        
        // Update lap time
        if (this.raceGameState.currentLapStartTime) {
            const lapTime = (new Date() - this.raceGameState.currentLapStartTime) / 1000;
            this.lapTime.textContent = `${lapTime.toFixed(1)}s`;
        }
        
        // Update combo display
        this.updateComboDisplay();
    },
    
    updateComboDisplay: function() {
        this.comboCount.textContent = this.raceGameState.comboCount;
        const comboPercent = Math.min(100, this.raceGameState.comboCount * 10);
        this.comboBar.style.width = `${comboPercent}%`;
        
        // Change color based on combo
        if (this.raceGameState.comboCount >= 20) {
            this.comboBar.style.background = 'linear-gradient(to right, #ff0000, #ff9900)';
        } else if (this.raceGameState.comboCount >= 10) {
            this.comboBar.style.background = 'linear-gradient(to right, #ff9900, #ffff00)';
        } else {
            this.comboBar.style.background = 'linear-gradient(to right, #00cc00, #00ff00)';
        }
    },
    
    updateTurboDisplay: function() {
        this.turboCharge.textContent = `${Math.round(this.raceGameState.turboCharge)}%`;
        this.turboFill.style.width = `${this.raceGameState.turboCharge}%`;
        
        // Enable/disable turbo button
        const turboBtn = document.getElementById('turboBtn');
        turboBtn.disabled = this.raceGameState.turboCharge < 100;
        
        // Change color based on charge
        if (this.raceGameState.turboCharge >= 100) {
            this.turboFill.style.background = 'linear-gradient(to right, #00ccff, #0066ff)';
            turboBtn.classList.add('charged');
        } else if (this.raceGameState.turboCharge >= 50) {
            this.turboFill.style.background = 'linear-gradient(to right, #00ccff, #0099ff)';
            turboBtn.classList.remove('charged');
        } else {
            this.turboFill.style.background = 'linear-gradient(to right, #66ccff, #3399ff)';
            turboBtn.classList.remove('charged');
        }
    },
    
    updateCarPositionBasedOnSpeed: function() {
        // Calculate progress based on typing progress and speed
        const progress = this.raceGameState.currentCharIndex / this.raceGameState.currentCode.length;
        const speedMultiplier = this.raceGameState.raceSpeed / 100; // Normalize speed
        const newPosition = progress * 80 + speedMultiplier * 20; // 0-100 scale
        
        this.updateCarPosition(newPosition);
    },
    
    updateCarPosition: function(position) {
        this.raceGameState.carPosition = Math.min(100, Math.max(0, position));
        this.raceCar.style.left = `${this.raceGameState.carPosition}%`;
        
        // Check if car reached checkpoints
        this.checkCheckpoints();
    },
    
    checkCheckpoints: function() {
        const checkpoints = [20, 40, 60, 80, 100];
        checkpoints.forEach((checkpoint, index) => {
            if (this.raceGameState.carPosition >= checkpoint && 
                !this.raceGameState.checkpointTimes[index]) {
                this.raceGameState.checkpointTimes[index] = new Date();
                
                // Visual feedback for checkpoint
                const checkpointEl = document.getElementById(`checkpoint${index + 1}`);
                checkpointEl.classList.add('reached');
                setTimeout(() => checkpointEl.classList.remove('reached'), 1000);
                
                // Play checkpoint sound (would be implemented with audio API)
                this.showFeedback(`✓ Checkpoint ${index + 1} reached!`, 'success');
            }
        });
    },
    
    completePattern: function() {
        // Calculate pattern completion time
        const patternTime = this.raceGameState.currentLapStartTime ? 
            (new Date() - this.raceGameState.currentLapStartTime) / 1000 : 0;
        
        // Calculate score for this pattern
        const basePoints = parseInt(this.patternPoints.textContent);
        const timeBonus = parseInt(this.timeBonus.textContent.replace('+', ''));
        const accuracyBonus = this.raceGameState.raceAccuracy;
        const speedBonus = Math.min(this.raceGameState.raceSpeed, 200) * 0.5;
        const comboBonus = this.raceGameState.comboCount * 2;
        const turboMultiplier = this.raceGameState.turboActive ? 1.5 : 1;
        
        const patternScore = Math.round(
            (basePoints + timeBonus + accuracyBonus + speedBonus + comboBonus) * turboMultiplier
        );
        
        // Update total score
        this.raceGameState.score += patternScore;
        this.totalScore.textContent = this.raceGameState.score;
        
        // Record lap time
        this.raceGameState.lapTimes.push(patternTime);
        
        // Check if lap is complete
        const patternsPerLap = this.raceGameState.currentMode === 'sprint' ? 3 : 
                              this.raceGameState.currentMode === 'marathon' ? 2 : 1;
        
        if (this.raceGameState.lapTimes.length >= patternsPerLap) {
            this.completeLap();
        } else {
            // Load next pattern in same lap
            setTimeout(() => {
                this.loadNewPattern();
                this.showFeedback(`+${patternScore} points! Next pattern...`, 'success');
            }, 500);
        }
    },
    
    completeLap: function() {
        // Calculate lap score
        const lapTime = this.raceGameState.lapTimes.reduce((a, b) => a + b, 0);
        const lapScore = this.raceGameState.lapTimes.length > 0 ? 
            Math.round(this.raceGameState.score / this.raceGameState.lapTimes.length) : 0;
        
        // Update lap count
        this.raceGameState.lapCount++;
        this.lapCount.textContent = this.raceGameState.lapCount;
        
        // Reset lap data
        this.raceGameState.lapTimes = [];
        
        // Check if race is complete
        if (this.raceGameState.lapCount > this.raceGameState.totalLaps) {
            this.completeRace();
        } else {
            // Move car back to start of next lap
            this.updateCarPosition(0);
            
            // Load first pattern of next lap
            setTimeout(() => {
                this.loadNewPattern();
                this.showFeedback(`🎉 Lap ${this.raceGameState.lapCount - 1} complete!`, 'success');
            }, 1000);
        }
    },
    
    completeRace: function() {
        // Stop race
        this.raceGameState.isRacing = false;
        clearInterval(this.raceGameState.timerInterval);
        
        // Calculate final stats
        const totalTime = this.raceGameState.raceTime - this.raceGameState.timeRemaining;
        const averageSpeed = this.raceGameState.bestSpeed;
        const averageAccuracy = this.raceGameState.bestAccuracy;
        
        // Update results panel
        document.getElementById('finalRaceScore').textContent = this.raceGameState.score;
        document.getElementById('averageRaceSpeed').textContent = `${averageSpeed} WPM`;
        document.getElementById('averageRaceAccuracy').textContent = `${averageAccuracy}%`;
        document.getElementById('totalRaceTime').textContent = `${totalTime.toFixed(1)}s`;
        document.getElementById('lapsCompleted').textContent = `${this.raceGameState.totalLaps}/${this.raceGameState.totalLaps}`;
        
        // Check for achievements
        const achievements = this.checkRaceAchievements();
        this.displayRaceAchievements(achievements);
        
        // Save to leaderboard
        this.saveToLeaderboard();
        
        // Show results panel
        this.raceResultsPanel.style.display = 'block';
        setTimeout(() => {
            this.raceResultsPanel.style.opacity = '1';
        }, 10);
    },
    
    startRace: function() {
        if (this.raceGameState.isRacing) return;
        
        this.raceGameState.isRacing = true;
        this.raceGameState.isPaused = false;
        this.raceGameState.startTime = new Date();
        this.raceGameState.currentLapStartTime = new Date();
        
        // Start race timer
        this.startRaceTimer();
        
        // Focus on typing target
        this.raceTypingTarget.focus();
        this.positionRaceCursor();
        
        // Update UI
        document.getElementById('pauseRaceBtn').innerHTML = '<i class="fas fa-pause"></i> Pause';
        this.showFeedback('🏁 Race started! Type fast!', 'success');
    },
    
    startRaceTimer: function() {
        if (this.raceGameState.timerInterval) {
            clearInterval(this.raceGameState.timerInterval);
        }
        
        this.raceGameState.timerInterval = setInterval(() => {
            if (this.raceGameState.isRacing && !this.raceGameState.isPaused) {
                this.raceGameState.timeRemaining--;
                this.raceTimer.textContent = this.raceGameState.timeRemaining;
                
                // Update timer color when time is running low
                if (this.raceGameState.timeRemaining <= 10) {
                    this.raceTimer.parentElement.classList.add('warning');
                }
                
                if (this.raceGameState.timeRemaining <= 0) {
                    this.timeUp();
                }
            }
        }, 1000);
    },
    
    timeUp: function() {
        clearInterval(this.raceGameState.timerInterval);
        this.showFeedback('⏰ Time\'s up! Race complete.', 'error');
        this.completeRace();
    },
    
    togglePauseRace: function() {
        if (!this.raceGameState.isRacing) return;
        
        if (this.raceGameState.isPaused) {
            this.resumeRace();
        } else {
            this.pauseRace();
        }
    },
    
    pauseRace: function() {
        this.raceGameState.isPaused = true;
        document.getElementById('pauseRaceBtn').innerHTML = '<i class="fas fa-play"></i> Resume';
        this.showFeedback('⏸️ Race paused', 'info');
    },
    
    resumeRace: function() {
        this.raceGameState.isPaused = false;
        document.getElementById('pauseRaceBtn').innerHTML = '<i class="fas fa-pause"></i> Pause';
        this.raceTypingTarget.focus();
        this.showFeedback('▶️ Race resumed', 'success');
    },
    
    newRace: function() {
        // Reset and start new race
        this.resetRaceState();
        this.setupRaceMode();
        this.hideRaceResults();
        this.showFeedback('🔄 New race ready! Click Start Race to begin.', 'info');
    },
    
    changeRaceMode: function(mode) {
        // Update active button
        document.querySelectorAll('.race-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update game state
        this.raceGameState.currentMode = mode;
        
        // Reset and setup new mode
        this.newRace();
    },
    
    activateTurbo: function() {
        if (this.raceGameState.turboCharge < 100 || this.raceGameState.turboActive) return;
        
        this.raceGameState.turboActive = true;
        this.raceGameState.turboCharge = 0;
        
        // Visual effects
        document.body.classList.add('turbo-active');
        this.showFeedback('🚀 TURBO BOOST ACTIVATED!', 'turbo');
        
        // Turbo lasts for 10 seconds
        setTimeout(() => {
            this.raceGameState.turboActive = false;
            document.body.classList.remove('turbo-active');
            this.showFeedback('Turbo boost ended', 'info');
        }, 10000);
        
        // Update display
        this.updateTurboDisplay();
    },
    
    skipPattern: function() {
        if (!this.raceGameState.isRacing) return;
        
        // Penalty for skipping
        this.raceGameState.score = Math.max(0, this.raceGameState.score - 50);
        this.totalScore.textContent = this.raceGameState.score;
        
        // Load new pattern
        this.loadNewPattern();
        this.showFeedback('⏭️ Pattern skipped (-50 points)', 'warning');
    },
    
    showRaceHint: function() {
        const hints = {
            'For Loop': 'Remember the three parts: initialization, condition, and increment.',
            'While Loop': 'Make sure to update the condition variable inside the loop.',
            'Function': 'Don\'t forget the parentheses and curly braces.',
            'If Statement': 'Pay attention to the condition and else clause.',
            'Array Method': 'Chain methods with dots and use arrow functions.',
            'String Method': 'Methods often return new strings, they don\'t modify the original.',
            'Object': 'Use curly braces and colons to separate keys and values.',
            'Promise': 'Chain .then() and .catch() methods properly.',
            'Async/Await': 'Use try/catch blocks for error handling.',
            'Event Listener': 'Remember the event type and callback function parameters.'
        };
        
        const hint = hints[this.raceGameState.currentPatternType] || 
                    'Type carefully and pay attention to special characters!';
        
        this.showFeedback(`💡 Hint: ${hint}`, 'info');
    },
    
    checkRaceAchievements: function() {
        const achievements = [];
        
        // Score achievements
        if (this.raceGameState.score >= 5000) {
            achievements.push({name: 'Speed Master', description: 'Scored 5000+ points in a race'});
        }
        if (this.raceGameState.score >= 10000) {
            achievements.push({name: 'Racing Legend', description: 'Scored 10000+ points in a race'});
        }
        
        // Speed achievements
        if (this.raceGameState.bestSpeed >= 100) {
            achievements.push({name: 'Lightning Fast', description: 'Reached 100+ WPM'});
        }
        if (this.raceGameState.bestSpeed >= 150) {
            achievements.push({name: 'Speed Demon', description: 'Reached 150+ WPM'});
        }
        
        // Accuracy achievements
        if (this.raceGameState.bestAccuracy >= 95) {
            achievements.push({name: 'Precision Expert', description: '95%+ accuracy'});
        }
        if (this.raceGameState.bestAccuracy === 100) {
            achievements.push({name: 'Perfect Race', description: '100% accuracy'});
        }
        
        // Combo achievements
        if (this.raceGameState.maxCombo >= 50) {
            achievements.push({name: 'Combo King', description: '50+ combo streak'});
        }
        
        // Time achievements
        if (this.raceGameState.timeRemaining >= 30) {
            achievements.push({name: 'Early Finish', description: 'Finished with 30+ seconds remaining'});
        }
        
        return achievements;
    },
    
    displayRaceAchievements: function(achievements) {
        const achievementsList = document.getElementById('raceAchievementsList');
        achievementsList.innerHTML = '';
        
        if (achievements.length === 0) {
            achievementsList.innerHTML = '<p class="no-achievements">No achievements earned this race. Keep practicing!</p>';
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
    
    saveToLeaderboard: function() {
        // Get existing leaderboard from localStorage
        const storedLeaderboard = localStorage.getItem('bytespeedLeaderboard') || '[]';
        let leaderboard = JSON.parse(storedLeaderboard);
        
        // Add new entry
        const entry = {
            id: this.raceGameState.currentRaceId,
            player: 'Player', // In a real app, this would be the user's name
            score: this.raceGameState.score,
            speed: this.raceGameState.bestSpeed,
            accuracy: this.raceGameState.bestAccuracy,
            mode: this.raceGameState.currentMode,
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now()
        };
        
        leaderboard.push(entry);
        
        // Sort by score (descending) and keep top 50
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 50);
        
        // Save back to localStorage
        localStorage.setItem('bytespeedLeaderboard', JSON.stringify(leaderboard));
        
        // Update game state
        this.raceGameState.leaderboard = leaderboard;
    },
    
    showLeaderboard: function() {
        this.leaderboardPanel.style.display = 'block';
        setTimeout(() => {
            this.leaderboardPanel.style.opacity = '1';
        }, 10);
        
        this.loadLeaderboard('daily');
    },
    
    hideLeaderboard: function() {
        this.leaderboardPanel.style.opacity = '0';
        setTimeout(() => {
            this.leaderboardPanel.style.display = 'none';
        }, 300);
    },
    
    changeLeaderboardPeriod: function(period) {
        // Update active tab
        document.querySelectorAll('.leaderboard-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Load leaderboard for selected period
        this.loadLeaderboard(period);
    },
    
    loadLeaderboard: function(period) {
        const leaderboardBody = document.getElementById('leaderboardBody');
        leaderboardBody.innerHTML = '';
        
        // Filter leaderboard by period
        let filteredLeaderboard = [...this.raceGameState.leaderboard];
        const now = Date.now();
        
        if (period === 'daily') {
            const oneDayAgo = now - (24 * 60 * 60 * 1000);
            filteredLeaderboard = filteredLeaderboard.filter(entry => entry.timestamp > oneDayAgo);
        } else if (period === 'weekly') {
            const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
            filteredLeaderboard = filteredLeaderboard.filter(entry => entry.timestamp > oneWeekAgo);
        }
        // 'alltime' uses all entries
        
        // Sort by score
        filteredLeaderboard.sort((a, b) => b.score - a.score);
        
        // Display leaderboard
        if (filteredLeaderboard.length === 0) {
            leaderboardBody.innerHTML = `
                <div class="leaderboard-empty">
                    <i class="fas fa-chart-line"></i>
                    <p>No records yet. Be the first to set a high score!</p>
                </div>
            `;
            return;
        }
        
        filteredLeaderboard.slice(0, 10).forEach((entry, index) => {
            const row = document.createElement('div');
            row.className = 'leaderboard-row';
            row.innerHTML = `
                <div class="rank-cell ${index < 3 ? 'top-rank' : ''}">
                    ${index + 1}
                    ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
                </div>
                <div class="name-cell">${entry.player}</div>
                <div class="score-cell">${entry.score.toLocaleString()}</div>
                <div class="speed-cell">${entry.speed} WPM</div>
                <div class="date-cell">${entry.date}</div>
            `;
            leaderboardBody.appendChild(row);
        });
    },
    
    shareRaceResults: function() {
        const score = this.raceGameState.score;
        const speed = this.raceGameState.bestSpeed;
        const accuracy = this.raceGameState.bestAccuracy;
        
        const shareText = `I scored ${score} points in ByteSpeed Coding Race with ${speed} WPM and ${accuracy}% accuracy! 🏁💻`;
        
        if (navigator.share) {
            navigator.share({
                title: 'ByteSpeed Race Results',
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
    
    hideRaceResults: function() {
        this.raceResultsPanel.style.opacity = '0';
        setTimeout(() => {
            this.raceResultsPanel.style.display = 'none';
        }, 300);
    },
    
    showFeedback: function(message, type) {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.race-feedback-message');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `race-feedback-message race-feedback-${type}`;
        feedback.innerHTML = message;
        
        // Add to DOM
        document.querySelector('.race-game-container').appendChild(feedback);
        
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
    
    startRaceGame: function() {
        // Add CSS for race game
        const style = document.createElement('style');
        style.textContent = `
            .race-game-container {
                background: rgba(20, 20, 40, 0.95);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 20px;
                border: 2px solid rgba(255, 0, 0, 0.3);
                position: relative;
                overflow: hidden;
            }
            
            .race-game-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, 
                    #ff0000 0%, 
                    #ff9900 20%, 
                    #ffff00 40%, 
                    #00ff00 60%, 
                    #00ccff 80%, 
                    #0066ff 100%);
                z-index: 1;
            }
            
            .race-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(255, 0, 0, 0.2);
            }
            
            .race-header h3 {
                color: #ff0000;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
                text-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
            }
            
            .race-mode-indicator {
                background: rgba(255, 0, 0, 0.2);
                padding: 3px 10px;
                border-radius: 12px;
                font-size: 0.8rem;
                color: #ff0000;
                font-weight: bold;
                border: 1px solid rgba(255, 0, 0, 0.3);
            }
            
            .race-actions {
                display: flex;
                gap: 10px;
            }
            
            .race-controls {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            .race-btn {
                padding: 8px 16px;
                background: rgba(255, 0, 0, 0.1);
                border: 1px solid rgba(255, 0, 0, 0.3);
                color: #ff9999;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: bold;
            }
            
            .race-btn:hover {
                background: rgba(255, 0, 0, 0.2);
                transform: translateY(-1px);
            }
            
            .race-btn.active {
                background: linear-gradient(45deg, #ff0000, #ff6600);
                color: white;
                box-shadow: 0 2px 8px rgba(255, 0, 0, 0.3);
            }
            
            .race-info-section {
                background: rgba(30, 30, 60, 0.7);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 25px;
                border: 1px solid rgba(255, 0, 0, 0.2);
            }
            
            .race-timer-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .race-timer {
                background: rgba(255, 0, 0, 0.2);
                color: #ff0000;
                padding: 15px 25px;
                border-radius: 10px;
                font-size: 2rem;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 15px;
                border: 2px solid rgba(255, 0, 0, 0.3);
                text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
            }
            
            .race-timer.warning {
                animation: pulse 1s infinite;
                background: rgba(255, 0, 0, 0.3);
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            .race-progress {
                display: flex;
                gap: 30px;
            }
            
            .lap-counter, .speedometer {
                background: rgba(255, 255, 255, 0.1);
                padding: 10px 20px;
                border-radius: 8px;
                color: #fff;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .lap-counter i, .speedometer i {
                color: #ff9900;
            }
            
            .race-track {
                background: rgba(10, 10, 20, 0.8);
                border-radius: 8px;
                padding: 20px;
                position: relative;
                height: 80px;
                overflow: hidden;
            }
            
            .track-visual {
                position: relative;
                height: 100%;
            }
            
            .track-line {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, 
                    #333 0%, 
                    #666 25%, 
                    #999 50%, 
                    #666 75%, 
                    #333 100%);
                transform: translateY(-50%);
            }
            
            .car-icon {
                position: absolute;
                top: 50%;
                left: 0%;
                transform: translate(-50%, -50%);
                font-size: 2rem;
                color: #ff0000;
                text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
                transition: left 0.5s ease-out;
                z-index: 10;
            }
            
            .checkpoint {
                position: absolute;
                top: 50%;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.3);
                border: 2px solid #00ff00;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                z-index: 5;
            }
            
            #checkpoint1 { left: 20%; }
            #checkpoint2 { left: 40%; }
            #checkpoint3 { left: 60%; }
            #checkpoint4 { left: 80%; }
            #checkpoint5 { left: 100%; }
            
            .checkpoint.reached {
                background: #00ff00;
                box-shadow: 0 0 15px #00ff00;
                animation: checkpointGlow 0.5s;
            }
            
            @keyframes checkpointGlow {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.5); }
            }
            
            .race-challenge-section {
                background: rgba(30, 30, 60, 0.7);
                border-radius: 10px;
                padding: 25px;
                margin-bottom: 25px;
                border: 1px solid rgba(255, 0, 0, 0.2);
            }
            
            .challenge-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .pattern-info {
                display: flex;
                gap: 15px;
                align-items: center;
            }
            
            .pattern-type, .pattern-complexity, .pattern-points {
                padding: 5px 12px;
                border-radius: 15px;
                font-size: 0.9rem;
                font-weight: bold;
            }
            
            .pattern-type {
                background: rgba(0, 150, 255, 0.2);
                color: #0096ff;
                border: 1px solid rgba(0, 150, 255, 0.3);
            }
            
            .pattern-complexity {
                background: rgba(255, 150, 0, 0.2);
                color: #ff9600;
                border: 1px solid rgba(255, 150, 0, 0.3);
            }
            
            .pattern-points {
                background: rgba(0, 255, 150, 0.2);
                color: #00ff96;
                border: 1px solid rgba(0, 255, 150, 0.3);
            }
            
            .time-bonus {
                background: rgba(255, 0, 150, 0.2);
                color: #ff0096;
                padding: 8px 16px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: bold;
            }
            
            .code-race-area {
                margin-bottom: 20px;
            }
            
            .typing-target {
                position: relative;
                background: rgba(10, 10, 20, 0.9);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 15px;
                border: 2px solid rgba(255, 0, 0, 0.3);
                min-height: 200px;
                overflow-x: auto;
                cursor: text;
                outline: none;
            }
            
            .typing-target:focus {
                border-color: #ff0000;
                box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);
            }
            
            .code-container {
                position: relative;
                font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                font-size: 1.2rem;
                line-height: 1.6;
                color: rgba(224, 224, 255, 0.9);
                white-space: pre-wrap;
                user-select: none;
            }
            
            .race-code-line {
                position: relative;
                min-height: 1.6em;
            }
            
            .race-char-element {
                position: relative;
                display: inline-block;
                min-width: 9px;
            }
            
            .race-char-element.race-keyword {
                color: #ff6600;
                font-weight: bold;
            }
            
            .race-char-element.race-string {
                color: #00ff00;
            }
            
            .race-char-element.race-number {
                color: #ff00ff;
                font-weight: bold;
            }
            
            .race-char-element.race-operator {
                color: #ffff00;
            }
            
            .race-char-element.race-bracket {
                color: #00ffff;
                font-weight: bold;
            }
            
            .race-char-element.race-space-char {
                background-color: rgba(255, 255, 255, 0.05);
                border-radius: 2px;
            }
            
            .race-typed-overlay-char {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                font-size: 1.2rem;
                font-weight: bold;
                z-index: 10;
                pointer-events: none;
                animation: raceFadeIn 0.05s ease-out;
                border-radius: 2px;
                text-shadow: 0 0 5px currentColor;
            }
            
            .race-typed-overlay-char.race-correct {
                color: #00ff00;
                background-color: rgba(0, 255, 0, 0.1);
            }
            
            .race-typed-overlay-char.race-incorrect {
                color: #ff0000;
                background-color: rgba(255, 0, 0, 0.15);
                text-decoration: line-through;
                animation: shake 0.1s;
            }
            
            @keyframes raceFadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                75% { transform: translateX(2px); }
            }
            
            .race-typing-cursor {
                position: absolute;
                background-color: #ff0000;
                width: 3px;
                z-index: 20;
                pointer-events: none;
                animation: raceBlink 0.8s infinite;
                box-shadow: 0 0 10px #ff0000;
            }
            
            @keyframes raceBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            .race-feedback {
                display: flex;
                gap: 30px;
                margin-top: 20px;
            }
            
            .combo-meter, .accuracy-display {
                flex: 1;
                background: rgba(255, 255, 255, 0.1);
                padding: 15px;
                border-radius: 8px;
            }
            
            .combo-bar, .accuracy-bar {
                height: 10px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 5px;
                overflow: hidden;
                margin-bottom: 8px;
            }
            
            .combo-bar {
                background: linear-gradient(90deg, 
                    #00cc00 0%, 
                    #ffff00 50%, 
                    #ff0000 100%);
            }
            
            .accuracy-fill {
                height: 100%;
                background: linear-gradient(90deg, #00cc00, #00ff00);
                width: 100%;
                transition: width 0.3s;
            }
            
            .combo-text, .accuracy-text {
                display: flex;
                align-items: center;
                gap: 8px;
                color: white;
                font-weight: bold;
            }
            
            .combo-text i {
                color: #ff9900;
            }
            
            .race-stats-section {
                margin: 25px 0;
            }
            
            .race-stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .race-stat {
                background: linear-gradient(135deg, rgba(255, 0, 0, 0.1), rgba(255, 100, 0, 0.1));
                border-radius: 10px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: transform 0.3s;
                border: 1px solid rgba(255, 0, 0, 0.2);
            }
            
            .race-stat:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(255, 0, 0, 0.2);
            }
            
            .race-stat-icon {
                width: 50px;
                height: 50px;
                background: rgba(255, 0, 0, 0.2);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: #ff0000;
            }
            
            .race-stat-content {
                display: flex;
                flex-direction: column;
            }
            
            .race-stat-label {
                color: #ff9999;
                font-size: 0.9rem;
                margin-bottom: 5px;
            }
            
            .race-stat-value {
                color: #fff;
                font-size: 1.8rem;
                font-weight: bold;
                text-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
            }
            
            .race-controls-section {
                background: rgba(30, 30, 60, 0.7);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 25px;
                border: 1px solid rgba(255, 0, 0, 0.2);
            }
            
            .control-buttons {
                display: flex;
                gap: 15px;
                margin-bottom: 15px;
            }
            
            .control-btn {
                flex: 1;
                padding: 12px;
                background: rgba(255, 0, 0, 0.1);
                border: 1px solid rgba(255, 0, 0, 0.3);
                color: #ff9999;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-weight: bold;
                transition: all 0.3s;
            }
            
            .control-btn:hover:not(:disabled) {
                background: rgba(255, 0, 0, 0.2);
                transform: translateY(-2px);
            }
            
            .control-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .turbo-btn.charged {
                background: linear-gradient(45deg, #0066ff, #00ccff);
                color: white;
                border-color: #00ccff;
                animation: pulseBlue 1s infinite;
            }
            
            @keyframes pulseBlue {
                0%, 100% { box-shadow: 0 0 10px rgba(0, 204, 255, 0.5); }
                50% { box-shadow: 0 0 20px rgba(0, 204, 255, 0.8); }
            }
            
            .turbo-charge {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .turbo-bar {
                flex: 1;
                height: 12px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                overflow: hidden;
            }
            
            .turbo-fill {
                height: 100%;
                background: linear-gradient(90deg, #3399ff, #0066ff);
                width: 0%;
                transition: width 0.5s;
            }
            
            .turbo-text {
                color: #66ccff;
                font-weight: bold;
                min-width: 80px;
            }
            
            .race-results-panel {
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
            
            .race-results-content {
                max-width: 800px;
                margin: 50px auto;
                background: rgba(30, 30, 60, 0.95);
                border-radius: 15px;
                padding: 40px;
                border: 2px solid rgba(255, 0, 0, 0.3);
            }
            
            .race-summary {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            
            .summary-stat {
                background: rgba(255, 255, 255, 0.1);
                padding: 20px;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .summary-stat span:first-child {
                color: #ff9999;
                font-size: 0.9rem;
            }
            
            .summary-value {
                color: #fff;
                font-size: 1.5rem;
                font-weight: bold;
                color: #ff0000;
            }
            
            .race-achievements {
                margin: 30px 0;
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
            }
            
            .race-achievements h4 {
                color: #ff9900;
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
                border-left: 4px solid #ff9900;
            }
            
            .achievement-icon {
                color: #ff9900;
                font-size: 1.5rem;
            }
            
            .no-achievements {
                text-align: center;
                color: #999;
                font-style: italic;
                padding: 20px;
            }
            
            .race-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
            }
            
            .leaderboard-panel {
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
            
            .leaderboard-content {
                max-width: 1000px;
                margin: 50px auto;
                background: rgba(30, 30, 60, 0.95);
                border-radius: 15px;
                padding: 40px;
                border: 2px solid rgba(255, 0, 0, 0.3);
            }
            
            .leaderboard-tabs {
                display: flex;
                gap: 10px;
                margin: 20px 0;
            }
            
            .leaderboard-tab {
                padding: 10px 20px;
                background: rgba(255, 0, 0, 0.1);
                border: 1px solid rgba(255, 0, 0, 0.3);
                color: #ff9999;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .leaderboard-tab.active {
                background: #ff0000;
                color: white;
            }
            
            .leaderboard-table {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                overflow: hidden;
                margin: 20px 0;
            }
            
            .leaderboard-header {
                display: grid;
                grid-template-columns: 80px 2fr 1fr 1fr 1fr;
                background: rgba(255, 0, 0, 0.2);
                padding: 15px;
                color: white;
                font-weight: bold;
            }
            
            .leaderboard-body {
                max-height: 400px;
                overflow-y: auto;
            }
            
            .leaderboard-row {
                display: grid;
                grid-template-columns: 80px 2fr 1fr 1fr 1fr;
                padding: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                color: white;
            }
            
            .leaderboard-row:nth-child(even) {
                background: rgba(255, 255, 255, 0.02);
            }
            
            .rank-cell {
                font-weight: bold;
                color: #ff9900;
            }
            
            .top-rank {
                color: #ff0000;
                font-size: 1.1rem;
            }
            
            .leaderboard-empty {
                text-align: center;
                padding: 60px;
                color: #999;
            }
            
            .leaderboard-empty i {
                font-size: 3rem;
                margin-bottom: 20px;
                color: #ff0000;
                opacity: 0.5;
            }
            
            .race-feedback-message {
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
            }
            
            .race-feedback-success {
                background: linear-gradient(45deg, rgba(0, 255, 0, 0.9), rgba(0, 200, 0, 0.9));
                color: white;
                border: 2px solid #00ff00;
            }
            
            .race-feedback-error {
                background: linear-gradient(45deg, rgba(255, 0, 0, 0.9), rgba(200, 0, 0, 0.9));
                color: white;
                border: 2px solid #ff0000;
            }
            
            .race-feedback-info {
                background: linear-gradient(45deg, rgba(0, 150, 255, 0.9), rgba(0, 100, 200, 0.9));
                color: white;
                border: 2px solid #0096ff;
            }
            
            .race-feedback-warning {
                background: linear-gradient(45deg, rgba(255, 150, 0, 0.9), rgba(200, 100, 0, 0.9));
                color: white;
                border: 2px solid #ff9600;
            }
            
            .race-feedback-turbo {
                background: linear-gradient(45deg, rgba(0, 200, 255, 0.9), rgba(0, 100, 255, 0.9));
                color: white;
                border: 2px solid #00ccff;
                animation: turboGlow 0.5s infinite alternate;
            }
            
            @keyframes turboGlow {
                from { box-shadow: 0 0 20px rgba(0, 204, 255, 0.7); }
                to { box-shadow: 0 0 40px rgba(0, 204, 255, 1); }
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
            
            body.turbo-active {
                animation: turboBackground 0.5s infinite alternate;
            }
            
            @keyframes turboBackground {
                from { background-color: rgba(0, 0, 0, 0.5); }
                to { background-color: rgba(0, 100, 255, 0.1); }
            }
            
            @media (max-width: 768px) {
                .race-header {
                    flex-direction: column;
                    gap: 15px;
                    align-items: flex-start;
                }
                
                .race-actions {
                    width: 100%;
                    justify-content: center;
                }
                
                .race-timer-container {
                    flex-direction: column;
                    gap: 15px;
                }
                
                .race-progress {
                    width: 100%;
                    justify-content: space-between;
                }
                
                .race-stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .race-feedback {
                    flex-direction: column;
                    gap: 15px;
                }
                
                .control-buttons {
                    flex-direction: column;
                }
                
                .race-summary {
                    grid-template-columns: 1fr;
                }
                
                .leaderboard-header, .leaderboard-row {
                    grid-template-columns: 60px 1fr 1fr 1fr;
                    font-size: 0.9rem;
                }
                
                .date-header, .date-cell {
                    display: none;
                }
                
                .code-container {
                    font-size: 1rem;
                }
                
                .race-typed-overlay-char {
                    font-size: 1rem;
                }
            }
            
            @media (max-width: 480px) {
                .race-stats-grid {
                    grid-template-columns: 1fr;
                }
                
                .pattern-info {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                }
                
                .challenge-header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 15px;
                }
                
                .code-container {
                    font-size: 0.9rem;
                }
                
                .race-typed-overlay-char {
                    font-size: 0.9rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Focus on typing target
        this.raceTypingTarget.focus();
    }
};