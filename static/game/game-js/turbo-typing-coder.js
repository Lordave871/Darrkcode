window.GitAdventure = {
    init: function(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3><i class="fab fa-git-alt"></i> Turbo Typing Coder</h3>
                <p>Type Git commands at turbo speed! Master version control through typing challenges.</p>
                <div class="git-level-selector">
                    <button class="level-btn active" data-level="beginner">Beginner</button>
                    <button class="level-btn" data-level="intermediate">Intermediate</button>
                    <button class="level-btn" data-level="advanced">Advanced</button>
                    <button class="level-btn" data-level="expert">Expert</button>
                </div>
            </div>
            
            <div class="git-game-container">
                <div class="git-header">
                    <h3><i class="fas fa-terminal"></i> Git Command Challenge <span class="git-level-indicator">Beginner</span></h3>
                    <div class="git-actions">
                        <button class="action-btn" id="newGitChallengeBtn">
                            <i class="fas fa-redo"></i> New Challenge
                        </button>
                        <button class="action-btn" id="gitHintBtn">
                            <i class="fas fa-lightbulb"></i> Hint
                        </button>
                        <button class="action-btn" id="gitSimulationBtn">
                            <i class="fas fa-play"></i> Simulate
                        </button>
                    </div>
                </div>
                
                <div class="git-challenge-section">
                    <div class="challenge-scenario">
                        <div class="scenario-header">
                            <i class="fas fa-code-branch"></i>
                            <h4>Git Scenario</h4>
                            <span class="scenario-difficulty" id="scenarioDifficulty">Beginner</span>
                        </div>
                        <div class="scenario-description" id="scenarioDescription">
                            <!-- Scenario description will be inserted here -->
                        </div>
                    </div>
                    
                    <div class="terminal-simulation">
                        <div class="terminal-header">
                            <div class="terminal-tabs">
                                <div class="terminal-tab active">Terminal</div>
                                <div class="terminal-tab">Output</div>
                            </div>
                            <div class="terminal-controls">
                                <button class="terminal-btn" title="Clear">
                                    <i class="fas fa-eraser"></i>
                                </button>
                                <button class="terminal-btn" title="Copy">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                        <div class="terminal-body">
                            <div class="terminal-prompt">
                                <span class="prompt-user">coder@git:</span>
                                <span class="prompt-path">~/projects</span>
                                <span class="prompt-symbol">$</span>
                            </div>
                            <div class="typing-target" id="gitTypingTarget" tabindex="0">
                                <div class="command-container" id="gitCommandContainer">
                                    <!-- Git command will be inserted here -->
                                </div>
                            </div>
                            <div class="terminal-output" id="terminalOutput">
                                <!-- Command output will be shown here -->
                            </div>
                        </div>
                        <div class="terminal-hint">
                            <p><i class="fas fa-info-circle"></i> Type the Git command exactly as shown. Pay attention to spaces and special characters!</p>
                        </div>
                    </div>
                    
                    <div class="command-explanation-section">
                        <div class="explanation-header">
                            <i class="fas fa-book"></i>
                            <h4>Command Explanation</h4>
                        </div>
                        <div class="explanation-content">
                            <div class="command-syntax">
                                <span class="syntax-label">Syntax:</span>
                                <code class="syntax-code" id="commandSyntax">git init [directory]</code>
                            </div>
                            <div class="command-description" id="commandDescription">
                                <!-- Command description will be inserted here -->
                            </div>
                            <div class="command-options" id="commandOptions">
                                <!-- Command options will be inserted here -->
                            </div>
                            <div class="command-examples" id="commandExamples">
                                <!-- Command examples will be inserted here -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="git-progress-section">
                    <div class="progress-indicators">
                        <div class="progress-indicator">
                            <div class="indicator-icon">
                                <i class="fas fa-flag"></i>
                            </div>
                            <div class="indicator-content">
                                <span class="indicator-label">Stage</span>
                                <span class="indicator-value" id="currentStage">1/10</span>
                            </div>
                        </div>
                        <div class="progress-indicator">
                            <div class="indicator-icon">
                                <i class="fas fa-bolt"></i>
                            </div>
                            <div class="indicator-content">
                                <span class="indicator-label">Turbo Streak</span>
                                <span class="indicator-value" id="turboStreak">0</span>
                            </div>
                        </div>
                        <div class="progress-indicator">
                            <div class="indicator-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="indicator-content">
                                <span class="indicator-label">Commands Mastered</span>
                                <span class="indicator-value" id="commandsMastered">0</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="progress-container">
                        <div class="progress-bar" id="gitProgressBar"></div>
                        <div class="progress-text">Git Progress: <span id="gitProgressText">10%</span></div>
                    </div>
                </div>
                
                <div class="git-stats-section">
                    <div class="stats-grid">
                        <div class="git-stat">
                            <div class="stat-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Typing Speed</span>
                                <span class="stat-value" id="gitTypingSpeed">0 WPM</span>
                            </div>
                        </div>
                        <div class="git-stat">
                            <div class="stat-icon">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Accuracy</span>
                                <span class="stat-value" id="gitAccuracy">100%</span>
                            </div>
                        </div>
                        <div class="git-stat">
                            <div class="stat-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Response Time</span>
                                <span class="stat-value" id="responseTime">0.0s</span>
                            </div>
                        </div>
                        <div class="git-stat">
                            <div class="stat-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-label">Git Score</span>
                                <span class="stat-value" id="gitScore">0</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="turbo-meter">
                        <div class="turbo-label">
                            <i class="fas fa-rocket"></i>
                            <span>Turbo Mode</span>
                            <span class="turbo-percent" id="turboPercent">0%</span>
                        </div>
                        <div class="turbo-bar">
                            <div class="turbo-fill" id="turboFill"></div>
                        </div>
                        <div class="turbo-hint">
                            <p><i class="fas fa-info-circle"></i> Type quickly and accurately to fill the turbo meter!</p>
                        </div>
                    </div>
                </div>
                
                <div class="git-branch-visualization">
                    <h4><i class="fas fa-project-diagram"></i> Git Branch Visualization</h4>
                    <div class="branch-container" id="branchContainer">
                        <!-- Branch visualization will be generated here -->
                    </div>
                    <div class="branch-legend">
                        <div class="legend-item">
                            <span class="legend-color main"></span>
                            <span class="legend-text">main branch</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color feature"></span>
                            <span class="legend-text">feature branch</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color commit"></span>
                            <span class="legend-text">commit</span>
                        </div>
                    </div>
                </div>
                
                <div class="git-cheatsheet">
                    <div class="cheatsheet-header">
                        <h4><i class="fas fa-clipboard-list"></i> Git Commands Cheatsheet</h4>
                        <button class="cheatsheet-toggle" id="cheatsheetToggle">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    <div class="cheatsheet-content" id="cheatsheetContent">
                        <!-- Cheatsheet content will be generated here -->
                    </div>
                </div>
                
                <div class="git-results-panel" id="gitResultsPanel">
                    <div class="results-content">
                        <h3><i class="fas fa-trophy"></i> Stage Complete!</h3>
                        <div class="stage-summary">
                            <div class="summary-stat">
                                <span>Stage Score:</span>
                                <span class="summary-value" id="stageScore">0</span>
                            </div>
                            <div class="summary-stat">
                                <span>Average Speed:</span>
                                <span class="summary-value" id="stageSpeed">0 WPM</span>
                            </div>
                            <div class="summary-stat">
                                <span>Average Accuracy:</span>
                                <span class="summary-value" id="stageAccuracy">100%</span>
                            </div>
                            <div class="summary-stat">
                                <span>Time Taken:</span>
                                <span class="summary-value" id="stageTime">0.0s</span>
                            </div>
                        </div>
                        
                        <div class="git-achievements">
                            <h4><i class="fas fa-award"></i> Git Achievements</h4>
                            <div class="achievements-list" id="gitAchievementsList">
                                <!-- Achievements will be added here -->
                            </div>
                        </div>
                        
                        <div class="next-stage-preview">
                            <h4><i class="fas fa-forward"></i> Next Stage Preview</h4>
                            <div class="preview-content" id="nextStagePreview">
                                <!-- Next stage preview will be added here -->
                            </div>
                        </div>
                        
                        <div class="results-actions">
                            <button class="action-btn primary" id="nextGitStageBtn">
                                <i class="fas fa-forward"></i> Next Stage
                            </button>
                            <button class="action-btn" id="retryGitStageBtn">
                                <i class="fas fa-redo"></i> Retry Stage
                            </button>
                            <button class="action-btn" id="shareGitResultsBtn">
                                <i class="fas fa-share-alt"></i> Share Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="keyboard-shortcuts">
                <h4><i class="fas fa-keyboard"></i> Git Shortcuts</h4>
                <div class="shortcuts-grid">
                    <div class="shortcut">
                        <kbd>Tab</kbd>
                        <span>Autocomplete suggestions</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + G</kbd>
                        <span>New git challenge</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Space</kbd>
                        <span>Simulate command</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl + T</kbd>
                        <span>Toggle cheatsheet</span>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize the git typing game
        setTimeout(() => this.initGitTypingGame(), 100);
    },
    
    initGitTypingGame: function() {
        // Game state for git typing
        this.gitGameState = {
            currentCommand: '',
            currentScenario: null,
            typedChars: [],
            startTime: null,
            isComplete: false,
            currentCharIndex: 0,
            totalErrors: 0,
            totalKeystrokes: 0,
            currentLevel: 'beginner',
            currentStage: 1,
            totalStages: 10,
            score: 0,
            turboCharge: 0,
            turboActive: false,
            commandsMastered: [],
            typingSpeed: 0,
            typingAccuracy: 100,
            responseTimes: [],
            streak: 0,
            bestStreak: 0,
            achievements: [],
            branchState: {
                main: [],
                features: {},
                currentBranch: 'main'
            }
        };
        
        // Git commands database
        this.gitCommands = {
            beginner: [
                {
                    command: "git init project-name",
                    scenario: "You're starting a new project and need to initialize a Git repository",
                    description: "Initializes a new Git repository in the specified directory",
                    syntax: "git init [directory]",
                    options: [
                        "-q, --quiet: Only print error and warning messages",
                        "--bare: Create a bare repository"
                    ],
                    examples: [
                        "git init my-project",
                        "git init . (initializes in current directory)",
                        "git init --bare shared-repo"
                    ],
                    output: "Initialized empty Git repository in /path/to/project-name/.git/",
                    points: 100,
                    branchEffect: "creates initial commit on main branch"
                },
                {
                    command: "git clone https://github.com/user/repo.git",
                    scenario: "You found an interesting project on GitHub and want to work on it locally",
                    description: "Clones a repository into a new directory",
                    syntax: "git clone [repository] [directory]",
                    options: [
                        "--depth [n]: Create a shallow clone with history truncated to n commits",
                        "--branch [name]: Clone a specific branch"
                    ],
                    examples: [
                        "git clone https://github.com/user/repo.git",
                        "git clone git@github.com:user/repo.git",
                        "git clone --branch develop https://github.com/user/repo.git"
                    ],
                    output: "Cloning into 'repo'...\nremote: Enumerating objects: 100, done.\nremote: Counting objects: 100% (100/100), done.\nremote: Compressing objects: 100% (75/75), done.\nremote: Total 100 (delta 25), reused 100 (delta 25), pack-reused 0\nReceiving objects: 100% (100/100), 25.00 KiB | 1.25 MiB/s, done.\nResolving deltas: 100% (25/25), done.",
                    points: 120,
                    branchEffect: "creates local copy with all branches"
                },
                {
                    command: "git status",
                    scenario: "You've been working on some files and want to see what changes you've made",
                    description: "Shows the working tree status",
                    syntax: "git status [options]",
                    options: [
                        "-s, --short: Give the output in the short format",
                        "--porcelain: Give the output in an easy-to-parse format for scripts"
                    ],
                    examples: [
                        "git status",
                        "git status -s (short format)",
                        "git status --porcelain"
                    ],
                    output: "On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n  (use \"git restore <file>...\" to discard changes in working directory)\n        modified:   index.html\n\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n        new-feature.js\n\nno changes added to commit (use \"git add\" and/or \"git commit -a\")",
                    points: 80,
                    branchEffect: "no branch change"
                }
            ],
            
            intermediate: [
                {
                    command: "git add .",
                    scenario: "You've finished working on multiple files and want to stage all changes for commit",
                    description: "Adds file contents to the index (staging area)",
                    syntax: "git add [filepattern]",
                    options: [
                        "-p, --patch: Interactively choose hunks of patch between the index and the work tree",
                        "-A, --all: Add changes from all tracked and untracked files"
                    ],
                    examples: [
                        "git add . (add all changes)",
                        "git add index.html (add specific file)",
                        "git add -p (interactive add)"
                    ],
                    output: "",
                    points: 90,
                    branchEffect: "stages changes for commit"
                },
                {
                    command: "git commit -m \"Add new feature\"",
                    scenario: "You've staged your changes and want to create a commit with a descriptive message",
                    description: "Records changes to the repository",
                    syntax: "git commit [options]",
                    options: [
                        "-m [msg]: Use the given <msg> as the commit message",
                        "-a: Automatically stage files that have been modified and deleted"
                    ],
                    examples: [
                        "git commit -m \"Initial commit\"",
                        "git commit -am \"Quick commit with message\"",
                        "git commit (opens editor for message)"
                    ],
                    output: "[main 1a2b3c4] Add new feature\n 1 file changed, 25 insertions(+), 10 deletions(-)",
                    points: 110,
                    branchEffect: "creates new commit on current branch"
                },
                {
                    command: "git branch feature/login",
                    scenario: "You're starting work on a new authentication feature and need to create a branch",
                    description: "Creates, lists, or deletes branches",
                    syntax: "git branch [branchname]",
                    options: [
                        "-d [name]: Delete a branch",
                        "-a: List both remote-tracking and local branches"
                    ],
                    examples: [
                        "git branch feature/login",
                        "git branch (list branches)",
                        "git branch -d old-feature"
                    ],
                    output: "",
                    points: 100,
                    branchEffect: "creates new feature branch"
                },
                {
                    command: "git checkout feature/login",
                    scenario: "You need to switch to the feature branch you just created",
                    description: "Switches branches or restores working tree files",
                    syntax: "git checkout [branch]",
                    options: [
                        "-b [name]: Create and switch to a new branch",
                        "-- [file]: Discard changes in working directory for specified file"
                    ],
                    examples: [
                        "git checkout feature/login",
                        "git checkout -b new-feature",
                        "git checkout -- index.html"
                    ],
                    output: "Switched to branch 'feature/login'",
                    points: 95,
                    branchEffect: "switches to feature branch"
                }
            ],
            
            advanced: [
                {
                    command: "git merge feature/login",
                    scenario: "You've finished the login feature and want to merge it back into the main branch",
                    description: "Joins two or more development histories together",
                    syntax: "git merge [branch]",
                    options: [
                        "--no-ff: Create a merge commit even when the merge resolves as a fast-forward",
                        "--squash: Squash changes from multiple commits into a single commit"
                    ],
                    examples: [
                        "git merge feature/login",
                        "git merge --no-ff develop",
                        "git merge --squash hotfix"
                    ],
                    output: "Merge made by the 'ort' strategy.\n index.html | 10 +++++-----\n 1 file changed, 5 insertions(+), 5 deletions(-)",
                    points: 150,
                    branchEffect: "merges feature branch into main"
                },
                {
                    command: "git rebase main",
                    scenario: "You've been working on a feature branch and want to incorporate the latest changes from main",
                    description: "Reapply commits on top of another base tip",
                    syntax: "git rebase [base]",
                    options: [
                        "-i, --interactive: Make a list of commits to be rebased and open in editor",
                        "--continue: Continue rebasing after resolving conflicts"
                    ],
                    examples: [
                        "git rebase main",
                        "git rebase -i HEAD~3",
                        "git rebase --continue"
                    ],
                    output: "Successfully rebased and updated refs/heads/feature.",
                    points: 180,
                    branchEffect: "rebases current branch onto main"
                },
                {
                    command: "git push origin main",
                    scenario: "You've completed your work and want to push your commits to the remote repository",
                    description: "Updates remote refs along with associated objects",
                    syntax: "git push [remote] [branch]",
                    options: [
                        "-u, --set-upstream: Set upstream for tracking",
                        "--force: Force push (use with caution!)"
                    ],
                    examples: [
                        "git push origin main",
                        "git push -u origin feature",
                        "git push origin --delete old-branch"
                    ],
                    output: "Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (3/3), done.\nWriting objects: 100% (3/3), 450 bytes | 450.00 KiB/s, done.\nTotal 3 (delta 2), reused 0 (delta 0), pack-reused 0\nremote: Resolving deltas: 100% (2/2), completed with 2 local objects.\nTo https://github.com/user/repo.git\n   a1b2c3d..e4f5g6h  main -> main",
                    points: 130,
                    branchEffect: "pushes commits to remote"
                },
                {
                    command: "git pull origin main",
                    scenario: "You want to get the latest changes from the remote repository",
                    description: "Fetches from and integrates with another repository or a local branch",
                    syntax: "git pull [remote] [branch]",
                    options: [
                        "--rebase: Rebase local commits on top of fetched commits",
                        "--no-commit: Don't create a merge commit"
                    ],
                    examples: [
                        "git pull origin main",
                        "git pull --rebase origin develop",
                        "git pull origin feature/login"
                    ],
                    output: "remote: Enumerating objects: 5, done.\nremote: Counting objects: 100% (5/5), done.\nremote: Compressing objects: 100% (3/3), done.\nremote: Total 3 (delta 2), reused 3 (delta 2), pack-reused 0\nUnpacking objects: 100% (3/3), 450 bytes | 150.00 KiB/s, done.\nFrom https://github.com/user/repo\n   e4f5g6h..a1b2c3d  main     -> origin/main\nUpdating e4f5g6h..a1b2c3d\nFast-forward\n index.html | 2 ++\n 1 file changed, 2 insertions(+)",
                    points: 120,
                    branchEffect: "pulls latest changes from remote"
                }
            ],
            
            expert: [
                {
                    command: "git stash",
                    scenario: "You need to switch branches but have uncommitted changes you're not ready to commit",
                    description: "Stashes the changes in a dirty working directory away",
                    syntax: "git stash [command]",
                    options: [
                        "push: Push a new stash onto the stash stack",
                        "pop: Remove a single stashed state and apply it",
                        "list: List the stashes"
                    ],
                    examples: [
                        "git stash",
                        "git stash push -m \"Work in progress\"",
                        "git stash pop"
                    ],
                    output: "Saved working directory and index state WIP on main: a1b2c3d Add feature",
                    points: 140,
                    branchEffect: "saves uncommitted changes"
                },
                {
                    command: "git cherry-pick a1b2c3d",
                    scenario: "You want to apply a specific commit from another branch to your current branch",
                    description: "Apply the changes introduced by some existing commits",
                    syntax: "git cherry-pick [commit]",
                    options: [
                        "-n, --no-commit: Apply changes without making a commit",
                        "-x: Append a line that says \"(cherry picked from commit...)\""
                    ],
                    examples: [
                        "git cherry-pick a1b2c3d",
                        "git cherry-pick -n feature-commit",
                        "git cherry-pick a1b2c3d..e4f5g6h"
                    ],
                    output: "[main f7g8h9i] Add specific feature from other branch\n Date: Thu Jan 1 12:00:00 2023 +0000\n 1 file changed, 15 insertions(+), 5 deletions(-)",
                    points: 160,
                    branchEffect: "applies specific commit to current branch"
                },
                {
                    command: "git reset --hard HEAD~1",
                    scenario: "You made a commit by mistake and want to completely remove it",
                    description: "Resets current HEAD to the specified state",
                    syntax: "git reset [mode] [commit]",
                    options: [
                        "--soft: Does not touch the index file or the working tree",
                        "--mixed: Resets the index but not the working tree",
                        "--hard: Resets the index and working tree"
                    ],
                    examples: [
                        "git reset --hard HEAD~1",
                        "git reset --soft HEAD^",
                        "git reset --mixed origin/main"
                    ],
                    output: "HEAD is now at a1b2c3d Previous commit message",
                    points: 170,
                    branchEffect: "removes last commit"
                },
                {
                    command: "git log --oneline --graph --all",
                    scenario: "You want to see a visual representation of your repository's commit history",
                    description: "Shows commit logs",
                    syntax: "git log [options]",
                    options: [
                        "--oneline: Shows each commit on a single line",
                        "--graph: Draws a text-based graphical representation",
                        "--all: Shows all branches"
                    ],
                    examples: [
                        "git log --oneline --graph --all",
                        "git log -p (show patch)",
                        "git log --since=\"2 weeks ago\""
                    ],
                    output: "* e4f5g6h (HEAD -> main) Add new feature\n* a1b2c3d (origin/main) Initial commit\n| * f7g8h9i (feature/login) Login page\n|/  \n* d0e1f2g Base setup",
                    points: 125,
                    branchEffect: "shows commit history"
                }
            ]
        };
        
        // Initialize UI elements
        this.gitTypingTarget = document.getElementById('gitTypingTarget');
        this.gitCommandContainer = document.getElementById('gitCommandContainer');
        this.terminalOutput = document.getElementById('terminalOutput');
        this.scenarioDescription = document.getElementById('scenarioDescription');
        this.commandSyntax = document.getElementById('commandSyntax');
        this.commandDescription = document.getElementById('commandDescription');
        this.commandOptions = document.getElementById('commandOptions');
        this.commandExamples = document.getElementById('commandExamples');
        this.currentStage = document.getElementById('currentStage');
        this.turboStreak = document.getElementById('turboStreak');
        this.commandsMastered = document.getElementById('commandsMastered');
        this.gitProgressBar = document.getElementById('gitProgressBar');
        this.gitProgressText = document.getElementById('gitProgressText');
        this.gitTypingSpeed = document.getElementById('gitTypingSpeed');
        this.gitAccuracy = document.getElementById('gitAccuracy');
        this.responseTime = document.getElementById('responseTime');
        this.gitScore = document.getElementById('gitScore');
        this.turboPercent = document.getElementById('turboPercent');
        this.turboFill = document.getElementById('turboFill');
        this.branchContainer = document.getElementById('branchContainer');
        this.cheatsheetContent = document.getElementById('cheatsheetContent');
        this.gitResultsPanel = document.getElementById('gitResultsPanel');
        
        // Load first command
        this.loadNewGitCommand();
        
        // Initialize branch visualization
        this.initBranchVisualization();
        
        // Initialize cheatsheet
        this.initCheatsheet();
        
        // Event listeners
        this.setupGitEventListeners();
        
        // Start the game
        this.startGitGame();
    },
    
    setupGitEventListeners: function() {
        // Typing on the command container
        this.gitTypingTarget.addEventListener('keydown', (e) => this.handleGitKeyDown(e));
        this.gitTypingTarget.addEventListener('click', () => {
            this.gitTypingTarget.focus();
            this.positionGitCursor();
        });
        
        // Level selector buttons
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeGitLevel(e.target.dataset.level));
        });
        
        // Action buttons
        document.getElementById('newGitChallengeBtn').addEventListener('click', () => this.loadNewGitCommand());
        document.getElementById('gitHintBtn').addEventListener('click', () => this.showGitHint());
        document.getElementById('gitSimulationBtn').addEventListener('click', () => this.simulateCommand());
        document.getElementById('nextGitStageBtn').addEventListener('click', () => this.nextGitStage());
        document.getElementById('retryGitStageBtn').addEventListener('click', () => this.retryGitStage());
        document.getElementById('shareGitResultsBtn').addEventListener('click', () => this.shareGitResults());
        document.getElementById('cheatsheetToggle').addEventListener('click', () => this.toggleCheatsheet());
        
        // Terminal controls
        document.querySelectorAll('.terminal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.closest('.terminal-btn').querySelector('.fa-eraser')) {
                    this.clearTerminal();
                } else if (e.target.closest('.terminal-btn').querySelector('.fa-copy')) {
                    this.copyCommand();
                }
            });
        });
        
        // Terminal tabs
        document.querySelectorAll('.terminal-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.terminal-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                if (e.target.textContent === 'Output') {
                    this.showTerminalOutput();
                } else {
                    this.showTerminalInput();
                }
            });
        });
        
        // Global shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl + G for new challenge
            if (e.ctrlKey && e.key === 'g') {
                e.preventDefault();
                this.loadNewGitCommand();
            }
            
            // Space to simulate command
            if (e.key === ' ' && this.gitGameState.isComplete && !e.ctrlKey) {
                e.preventDefault();
                this.simulateCommand();
            }
            
            // Ctrl + T to toggle cheatsheet
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                this.toggleCheatsheet();
            }
            
            // Tab for autocomplete
            if (e.key === 'Tab' && this.gitTypingTarget === document.activeElement) {
                e.preventDefault();
                this.autocompleteCommand();
            }
        });
        
        // Initialize results panel as hidden
        this.gitResultsPanel.style.display = 'none';
    },
    
    loadNewGitCommand: function() {
        // Reset typing state
        this.gitGameState.currentCharIndex = 0;
        this.gitGameState.typedChars = [];
        this.gitGameState.totalErrors = 0;
        this.gitGameState.totalKeystrokes = 0;
        this.gitGameState.isComplete = false;
        this.gitGameState.startTime = null;
        
        // Clear previous command
        this.gitCommandContainer.innerHTML = '';
        document.querySelectorAll('.git-typed-overlay-char').forEach(el => el.remove());
        const cursor = document.querySelector('.git-typing-cursor');
        if (cursor) cursor.remove();
        
        // Clear terminal output
        this.terminalOutput.innerHTML = '';
        
        // Select random command from current level
        const commands = this.gitCommands[this.gitGameState.currentLevel];
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        
        // Update game state
        this.gitGameState.currentCommand = randomCommand.command;
        this.gitGameState.currentScenario = randomCommand;
        
        // Render command
        this.renderGitCommand();
        
        // Update scenario and description
        this.updateScenarioInfo();
        
        // Update progress indicators
        this.updateProgressIndicators();
        
        // Focus on typing target
        this.gitTypingTarget.focus();
        
        // Position cursor at start
        this.positionGitCursor();
        
        // Reset turbo if not active
        if (!this.gitGameState.turboActive) {
            this.gitGameState.turboCharge = 0;
            this.updateTurboDisplay();
        }
    },
    
    renderGitCommand: function() {
        const command = this.gitGameState.currentCommand;
        
        // Clear container
        this.gitCommandContainer.innerHTML = '';
        
        // Create line container
        const lineDiv = document.createElement('div');
        lineDiv.className = 'git-command-line';
        
        // Add prompt
        const promptSpan = document.createElement('span');
        promptSpan.className = 'command-prompt';
        promptSpan.textContent = '$ ';
        lineDiv.appendChild(promptSpan);
        
        // Process each character in the command
        for (let i = 0; i < command.length; i++) {
            const char = command[i];
            const charSpan = document.createElement('span');
            charSpan.className = 'git-char-element';
            charSpan.dataset.index = i;
            
            // Handle special characters
            if (char === ' ') {
                charSpan.innerHTML = '&nbsp;';
                charSpan.classList.add('git-space-char');
            } else {
                charSpan.textContent = char;
                
                // Add syntax highlighting for git commands
                if (this.isGitKeyword(command, i)) {
                    charSpan.classList.add('git-keyword');
                } else if (this.isGitOption(command, i)) {
                    charSpan.classList.add('git-option');
                } else if (this.isGitArgument(command, i)) {
                    charSpan.classList.add('git-argument');
                } else if (this.isGitUrl(command, i)) {
                    charSpan.classList.add('git-url');
                }
            }
            
            lineDiv.appendChild(charSpan);
        }
        
        this.gitCommandContainer.appendChild(lineDiv);
    },
    
    // Syntax highlighting helpers for git commands
    isGitKeyword: function(command, index) {
        const gitKeywords = ['git', 'init', 'clone', 'status', 'add', 'commit', 'branch', 
                           'checkout', 'merge', 'rebase', 'push', 'pull', 'stash', 
                           'cherry-pick', 'reset', 'log', 'fetch', 'remote', 'tag'];
        const substr = command.substr(index);
        for (const keyword of gitKeywords) {
            if (substr.startsWith(keyword) && 
                (substr.length === keyword.length || !/\w/.test(substr[keyword.length]))) {
                return true;
            }
        }
        return false;
    },
    
    isGitOption: function(command, index) {
        const char = command[index];
        return char === '-' && (command[index + 1] === '-' || /[a-zA-Z]/.test(command[index + 1]));
    },
    
    isGitArgument: function(command, index) {
        // Check if this is likely an argument (not part of a keyword or option)
        const prevChar = index > 0 ? command[index - 1] : '';
        const nextChar = index < command.length - 1 ? command[index + 1] : '';
        
        if (prevChar === ' ' && nextChar !== ' ' && nextChar !== '-') {
            const wordStart = index;
            let wordEnd = index;
            while (wordEnd < command.length && command[wordEnd] !== ' ') {
                wordEnd++;
            }
            const word = command.substring(wordStart, wordEnd);
            
            // Check if it's not a keyword
            const gitKeywords = ['git', 'init', 'clone', 'status', 'add', 'commit', 'branch', 
                               'checkout', 'merge', 'rebase', 'push', 'pull', 'stash', 
                               'cherry-pick', 'reset', 'log'];
            return !gitKeywords.includes(word);
        }
        return false;
    },
    
    isGitUrl: function(command, index) {
        const substr = command.substr(index);
        return substr.startsWith('http://') || substr.startsWith('https://') || 
               substr.startsWith('git@') || substr.includes('.git');
    },
    
    updateScenarioInfo: function() {
        const scenario = this.gitGameState.currentScenario;
        
        // Update scenario description
        this.scenarioDescription.innerHTML = `<p>${scenario.scenario}</p>`;
        
        // Update command syntax
        this.commandSyntax.textContent = scenario.syntax;
        
        // Update command description
        this.commandDescription.innerHTML = `<p>${scenario.description}</p>`;
        
        // Update command options
        if (scenario.options && scenario.options.length > 0) {
            let optionsHtml = '<div class="options-list"><strong>Common Options:</strong><ul>';
            scenario.options.forEach(option => {
                optionsHtml += `<li><code>${option}</code></li>`;
            });
            optionsHtml += '</ul></div>';
            this.commandOptions.innerHTML = optionsHtml;
        } else {
            this.commandOptions.innerHTML = '';
        }
        
        // Update command examples
        if (scenario.examples && scenario.examples.length > 0) {
            let examplesHtml = '<div class="examples-list"><strong>Examples:</strong><ul>';
            scenario.examples.forEach(example => {
                examplesHtml += `<li><code>${example}</code></li>`;
            });
            examplesHtml += '</ul></div>';
            this.commandExamples.innerHTML = examplesHtml;
        } else {
            this.commandExamples.innerHTML = '';
        }
        
        // Update level indicator
        document.querySelector('.git-level-indicator').textContent = 
            this.gitGameState.currentLevel.charAt(0).toUpperCase() + 
            this.gitGameState.currentLevel.slice(1);
        
        // Update scenario difficulty
        document.getElementById('scenarioDifficulty').textContent = 
            this.gitGameState.currentLevel.charAt(0).toUpperCase() + 
            this.gitGameState.currentLevel.slice(1);
    },
    
    updateProgressIndicators: function() {
        // Update stage indicator
        this.currentStage.textContent = `${this.gitGameState.currentStage}/${this.gitGameState.totalStages}`;
        
        // Update turbo streak
        this.turboStreak.textContent = this.gitGameState.streak;
        
        // Update commands mastered
        this.commandsMastered.textContent = this.gitGameState.commandsMastered.length;
        
        // Update progress bar
        const progress = (this.gitGameState.currentStage / this.gitGameState.totalStages) * 100;
        this.gitProgressBar.style.width = `${progress}%`;
        this.gitProgressText.textContent = `${Math.round(progress)}%`;
    },
    
    handleGitKeyDown: function(e) {
        // Prevent default for keys we handle
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
        }
        
        // Start timer on first valid keystroke
        if (!this.gitGameState.startTime && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            this.gitGameState.startTime = new Date();
            this.startGitTimer();
        }
        
        // Handle backspace
        if (e.key === 'Backspace') {
            this.handleGitBackspace();
            return;
        }
        
        // Handle tab for autocomplete
        if (e.key === 'Tab') {
            this.autocompleteCommand();
            return;
        }
        
        // Handle enter to complete command
        if (e.key === 'Enter') {
            if (this.gitGameState.isComplete) {
                this.simulateCommand();
            }
            return;
        }
        
        // Ignore control keys
        if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
        
        // Handle regular character input
        this.handleGitCharacter(e.key);
    },
    
    handleGitCharacter: function(char) {
        const command = this.gitGameState.currentCommand;
        const currentIndex = this.gitGameState.currentCharIndex;
        
        // Check if we're at the end
        if (currentIndex >= command.length) {
            return;
        }
        
        // Update keystrokes count
        this.gitGameState.totalKeystrokes++;
        
        const expectedChar = command[currentIndex];
        const isCorrect = char === expectedChar;
        
        // Store typed character
        this.gitGameState.typedChars.push({
            char: char,
            isCorrect: isCorrect,
            position: currentIndex
        });
        
        // Update error count
        if (!isCorrect) {
            this.gitGameState.totalErrors++;
            this.gitGameState.streak = 0; // Reset streak on error
            
            // Reduce turbo charge on error
            this.gitGameState.turboCharge = Math.max(0, this.gitGameState.turboCharge - 5);
            this.updateTurboDisplay();
        } else {
            this.gitGameState.streak++;
            this.gitGameState.bestStreak = Math.max(this.gitGameState.bestStreak, this.gitGameState.streak);
            
            // Add turbo charge for correct keystrokes
            if (this.gitGameState.turboActive) {
                this.gitGameState.turboCharge = Math.min(100, this.gitGameState.turboCharge + 2);
            } else {
                this.gitGameState.turboCharge = Math.min(100, this.gitGameState.turboCharge + 1);
            }
            this.updateTurboDisplay();
        }
        
        // Move to next character
        this.gitGameState.currentCharIndex++;
        
        // Update display - overlay typed character
        this.overlayGitTypedCharacter(char, currentIndex, isCorrect);
        
        // Position cursor for next character
        this.positionGitCursor();
        
        // Update git stats
        this.updateGitStats();
        
        // Check if command is complete
        if (this.gitGameState.currentCharIndex === command.length) {
            this.completeGitCommand();
        }
    },
    
    overlayGitTypedCharacter: function(char, index, isCorrect) {
        // Get the original character element
        const charElements = document.querySelectorAll('.git-char-element');
        if (index >= charElements.length) return;
        
        const originalCharEl = charElements[index];
        
        // Create overlay element
        const overlayEl = document.createElement('div');
        overlayEl.className = `git-typed-overlay-char ${isCorrect ? 'git-correct' : 'git-incorrect'}`;
        overlayEl.textContent = char;
        
        // Get position of original character
        const rect = originalCharEl.getBoundingClientRect();
        const containerRect = this.gitCommandContainer.getBoundingClientRect();
        
        // Position overlay exactly over original character
        overlayEl.style.left = (rect.left - containerRect.left) + 'px';
        overlayEl.style.top = (rect.top - containerRect.top) + 'px';
        overlayEl.style.width = rect.width + 'px';
        overlayEl.style.height = rect.height + 'px';
        
        // Add to container
        this.gitCommandContainer.appendChild(overlayEl);
        
        // Store reference
        this.gitGameState.typedChars[this.gitGameState.typedChars.length - 1].overlayEl = overlayEl;
    },
    
    handleGitBackspace: function() {
        if (this.gitGameState.currentCharIndex > 0) {
            // Remove last typed character overlay
            const lastTyped = this.gitGameState.typedChars.pop();
            if (lastTyped && lastTyped.overlayEl) {
                lastTyped.overlayEl.remove();
            }
            
            // Move back one character
            this.gitGameState.currentCharIndex--;
            
            // Update stats (backspace counts as a keystroke)
            this.gitGameState.totalKeystrokes++;
            
            // Position cursor
            this.positionGitCursor();
            
            // Update git stats
            this.updateGitStats();
        }
    },
    
    autocompleteCommand: function() {
        const command = this.gitGameState.currentCommand;
        const currentIndex = this.gitGameState.currentCharIndex;
        
        if (currentIndex >= command.length) return;
        
        // Get the remaining part of the command
        const remaining = command.substring(currentIndex);
        
        // Find the next word or space
        let autocompleteLength = 0;
        if (remaining[0] === ' ') {
            // If at a space, complete the next word
            const nextSpace = remaining.indexOf(' ', 1);
            autocompleteLength = nextSpace === -1 ? remaining.length : nextSpace;
        } else {
            // Complete current word
            const nextSpace = remaining.indexOf(' ');
            autocompleteLength = nextSpace === -1 ? remaining.length : nextSpace;
        }
        
        // Auto-type the suggested characters
        for (let i = 0; i < autocompleteLength; i++) {
            this.handleGitCharacter(remaining[i]);
        }
    },
    
    positionGitCursor: function() {
        // Remove existing cursor
        const existingCursor = document.querySelector('.git-typing-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // If completed, don't show cursor
        if (this.gitGameState.isComplete || this.gitGameState.currentCharIndex >= this.gitGameState.currentCommand.length) {
            return;
        }
        
        // Get current character element
        const charElements = document.querySelectorAll('.git-char-element');
        if (this.gitGameState.currentCharIndex >= charElements.length) return;
        
        const currentCharEl = charElements[this.gitGameState.currentCharIndex];
        const rect = currentCharEl.getBoundingClientRect();
        const containerRect = this.gitCommandContainer.getBoundingClientRect();
        
        // Create cursor
        const cursor = document.createElement('div');
        cursor.className = 'git-typing-cursor';
        cursor.style.left = (rect.left - containerRect.left) + 'px';
        cursor.style.top = (rect.top - containerRect.top) + 'px';
        cursor.style.width = '2px';
        cursor.style.height = rect.height + 'px';
        
        this.gitCommandContainer.appendChild(cursor);
    },
    
    startGitTimer: function() {
        if (this.gitTimerInterval) {
            clearInterval(this.gitTimerInterval);
        }
        
        this.gitTimerInterval = setInterval(() => {
            if (!this.gitGameState.isComplete && this.gitGameState.startTime) {
                this.updateGitStats();
            }
        }, 100);
    },
    
    updateGitStats: function() {
        // Calculate typing speed (WPM)
        let speed = 0;
        if (this.gitGameState.startTime && !this.gitGameState.isComplete) {
            const timeElapsed = (new Date() - this.gitGameState.startTime) / 1000 / 60;
            const wordsTyped = this.gitGameState.currentCharIndex / 5;
            speed = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
        }
        this.gitTypingSpeed.textContent = `${speed} WPM`;
        this.gitGameState.typingSpeed = speed;
        
        // Calculate accuracy
        let accuracy = 100;
        if (this.gitGameState.totalKeystrokes > 0) {
            accuracy = Math.max(0, Math.round(((this.gitGameState.totalKeystrokes - this.gitGameState.totalErrors) / this.gitGameState.totalKeystrokes) * 100));
        }
        this.gitAccuracy.textContent = `${accuracy}%`;
        this.gitGameState.typingAccuracy = accuracy;
        
        // Update response time
        if (this.gitGameState.startTime && !this.gitGameState.isComplete) {
            const timeElapsed = (new Date() - this.gitGameState.startTime) / 1000;
            this.responseTime.textContent = `${timeElapsed.toFixed(1)}s`;
        }
        
        // Update turbo streak
        this.turboStreak.textContent = this.gitGameState.streak;
        
        // Update turbo display
        this.updateTurboDisplay();
        
        // Check for turbo activation
        if (this.gitGameState.turboCharge >= 100 && !this.gitGameState.turboActive) {
            this.activateTurbo();
        }
    },
    
    updateTurboDisplay: function() {
        this.turboPercent.textContent = `${Math.round(this.gitGameState.turboCharge)}%`;
        this.turboFill.style.width = `${this.gitGameState.turboCharge}%`;
        
        // Change color based on charge level
        if (this.gitGameState.turboCharge >= 100) {
            this.turboFill.style.background = 'linear-gradient(to right, #ff0000, #ff9900)';
        } else if (this.gitGameState.turboCharge >= 75) {
            this.turboFill.style.background = 'linear-gradient(to right, #ff9900, #ffff00)';
        } else if (this.gitGameState.turboCharge >= 50) {
            this.turboFill.style.background = 'linear-gradient(to right, #ffff00, #00ff00)';
        } else {
            this.turboFill.style.background = 'linear-gradient(to right, #00ff00, #009900)';
        }
    },
    
    activateTurbo: function() {
        this.gitGameState.turboActive = true;
        
        // Visual effects
        document.querySelector('.turbo-meter').classList.add('turbo-active');
        this.showGitFeedback('🚀 TURBO MODE ACTIVATED! Double points and faster typing!', 'turbo');
        
        // Turbo lasts for 15 seconds
        setTimeout(() => {
            this.gitGameState.turboActive = false;
            this.gitGameState.turboCharge = 0;
            document.querySelector('.turbo-meter').classList.remove('turbo-active');
            this.showGitFeedback('Turbo mode ended', 'info');
            this.updateTurboDisplay();
        }, 15000);
    },
    
    completeGitCommand: function() {
        this.gitGameState.isComplete = true;
        
        // Stop timer
        clearInterval(this.gitTimerInterval);
        
        // Record response time
        if (this.gitGameState.startTime) {
            const responseTime = (new Date() - this.gitGameState.startTime) / 1000;
            this.gitGameState.responseTimes.push(responseTime);
        }
        
        // Remove cursor
        const cursor = document.querySelector('.git-typing-cursor');
        if (cursor) cursor.remove();
        
        // Calculate score for this command
        this.calculateCommandScore();
        
        // Add command to mastered list if not already there
        const commandName = this.gitGameState.currentCommand.split(' ')[1] || 'unknown';
        if (!this.gitGameState.commandsMastered.includes(commandName)) {
            this.gitGameState.commandsMastered.push(commandName);
            this.commandsMastered.textContent = this.gitGameState.commandsMastered.length;
        }
        
        // Update branch visualization
        this.updateBranchVisualization();
        
        // Show command ready feedback
        this.showGitFeedback('✓ Command ready! Press Enter or click Simulate to execute.', 'success');
        
        // Enable simulate button
        document.getElementById('gitSimulationBtn').disabled = false;
    },
    
    calculateCommandScore: function() {
        const basePoints = this.gitGameState.currentScenario.points;
        const timeTaken = this.gitGameState.startTime ? 
            (new Date() - this.gitGameState.startTime) / 1000 : 0;
        const accuracy = this.gitGameState.typingAccuracy;
        
        // Calculate time bonus (faster = more points)
        const timeBonus = Math.max(0, 30 - timeTaken);
        
        // Calculate accuracy bonus
        const accuracyBonus = accuracy;
        
        // Calculate streak bonus
        const streakBonus = this.gitGameState.streak * 2;
        
        // Calculate turbo multiplier
        const turboMultiplier = this.gitGameState.turboActive ? 2 : 1;
        
        // Calculate final score
        const commandScore = Math.round(
            (basePoints + timeBonus + accuracyBonus + streakBonus) * turboMultiplier
        );
        
        // Update game score
        this.gitGameState.score += commandScore;
        this.gitScore.textContent = this.gitGameState.score;
        
        return commandScore;
    },
    
    simulateCommand: function() {
        if (!this.gitGameState.isComplete) return;
        
        const scenario = this.gitGameState.currentScenario;
        
        // Clear previous output
        this.terminalOutput.innerHTML = '';
        
        // Create output container
        const outputDiv = document.createElement('div');
        outputDiv.className = 'command-output';
        
        // Add timestamp
        const timestamp = new Date().toLocaleTimeString();
        const timeSpan = document.createElement('div');
        timeSpan.className = 'output-timestamp';
        timeSpan.textContent = `[${timestamp}]`;
        outputDiv.appendChild(timeSpan);
        
        // Add command that was executed
        const commandSpan = document.createElement('div');
        commandSpan.className = 'output-command';
        commandSpan.innerHTML = `<span class="prompt-symbol">$</span> ${this.gitGameState.currentCommand}`;
        outputDiv.appendChild(commandSpan);
        
        // Add output (simulated)
        const outputText = document.createElement('div');
        outputText.className = 'output-text';
        outputText.textContent = scenario.output;
        outputDiv.appendChild(outputText);
        
        // Add to terminal
        this.terminalOutput.appendChild(outputDiv);
        
        // Scroll to bottom
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
        
        // Switch to output tab
        document.querySelectorAll('.terminal-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.terminal-tab')[1].classList.add('active');
        
        // Show feedback
        this.showGitFeedback('Command simulated successfully!', 'success');
        
        // Check if stage is complete
        setTimeout(() => {
            this.checkStageComplete();
        }, 1000);
    },
    
    checkStageComplete: function() {
        // Each stage requires 3 commands to be completed
        const commandsPerStage = 3;
        
        if (this.gitGameState.currentStage % commandsPerStage === 0) {
            // Stage complete!
            this.completeStage();
        } else {
            // Load next command after delay
            setTimeout(() => {
                this.loadNewGitCommand();
                this.showGitFeedback('Next command loaded!', 'info');
            }, 2000);
        }
    },
    
    completeStage: function() {
        // Calculate stage statistics
        const stageScore = this.gitGameState.score;
        const avgSpeed = this.gitGameState.typingSpeed;
        const avgAccuracy = this.gitGameState.typingAccuracy;
        const avgResponseTime = this.gitGameState.responseTimes.length > 0 ?
            this.gitGameState.responseTimes.reduce((a, b) => a + b, 0) / this.gitGameState.responseTimes.length : 0;
        
        // Update results panel
        document.getElementById('stageScore').textContent = stageScore;
        document.getElementById('stageSpeed').textContent = `${avgSpeed} WPM`;
        document.getElementById('stageAccuracy').textContent = `${avgAccuracy}%`;
        document.getElementById('stageTime').textContent = `${avgResponseTime.toFixed(1)}s`;
        
        // Update next stage preview
        this.updateNextStagePreview();
        
        // Check for achievements
        const achievements = this.checkGitAchievements();
        this.displayGitAchievements(achievements);
        
        // Show results panel
        this.gitResultsPanel.style.display = 'block';
        setTimeout(() => {
            this.gitResultsPanel.style.opacity = '1';
        }, 10);
    },
    
    updateNextStagePreview: function() {
        const nextStage = this.gitGameState.currentStage + 1;
        let previewText = '';
        
        if (nextStage <= this.gitGameState.totalStages) {
            if (nextStage <= 3) {
                previewText = 'Next: Learn about branching and merging';
            } else if (nextStage <= 6) {
                previewText = 'Next: Advanced Git workflows and collaboration';
            } else if (nextStage <= 9) {
                previewText = 'Next: Expert Git techniques and troubleshooting';
            } else {
                previewText = 'Final Stage: Git mastery challenge!';
            }
        } else {
            previewText = 'Congratulations! You have completed all Git stages!';
        }
        
        document.getElementById('nextStagePreview').textContent = previewText;
    },
    
    nextGitStage: function() {
        // Hide results panel
        this.gitResultsPanel.style.opacity = '0';
        
        setTimeout(() => {
            this.gitResultsPanel.style.display = 'none';
            
            // Increment stage
            this.gitGameState.currentStage++;
            
            // Reset stage-specific stats
            this.gitGameState.responseTimes = [];
            
            // Update progress indicators
            this.updateProgressIndicators();
            
            // Load new command
            this.loadNewGitCommand();
            
            // Show feedback
            this.showGitFeedback(`Starting Stage ${this.gitGameState.currentStage}!`, 'success');
        }, 300);
    },
    
    retryGitStage: function() {
        // Hide results panel
        this.gitResultsPanel.style.opacity = '0';
        
        setTimeout(() => {
            this.gitResultsPanel.style.display = 'none';
            
            // Reset stage score
            this.gitGameState.score = 0;
            this.gitScore.textContent = '0';
            
            // Reset other stats
            this.gitGameState.responseTimes = [];
            this.gitGameState.streak = 0;
            this.gitGameState.turboCharge = 0;
            
            // Update displays
            this.updateProgressIndicators();
            this.updateTurboDisplay();
            this.turboStreak.textContent = '0';
            
            // Load new command
            this.loadNewGitCommand();
            
            // Show feedback
            this.showGitFeedback('Stage restarted. Try again!', 'info');
        }, 300);
    },
    
    changeGitLevel: function(level) {
        // Update active button
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update game state
        this.gitGameState.currentLevel = level;
        
        // Reset to first stage of new level
        this.gitGameState.currentStage = 1;
        this.gitGameState.score = 0;
        this.gitGameState.commandsMastered = [];
        this.gitGameState.responseTimes = [];
        this.gitGameState.streak = 0;
        this.gitGameState.turboCharge = 0;
        
        // Update displays
        this.gitScore.textContent = '0';
        this.commandsMastered.textContent = '0';
        this.turboStreak.textContent = '0';
        this.updateProgressIndicators();
        this.updateTurboDisplay();
        
        // Load new command
        this.loadNewGitCommand();
        
        // Show feedback
        this.showGitFeedback(`Switched to ${level} level!`, 'success');
    },
    
    showGitHint: function() {
        const scenario = this.gitGameState.currentScenario;
        const commandParts = scenario.command.split(' ');
        const gitCommand = commandParts[1] || 'unknown';
        
        const hints = {
            'init': 'Use git init to create a new repository',
            'clone': 'git clone copies a repository from a remote source',
            'status': 'git status shows the state of your working directory',
            'add': 'git add stages changes for commit',
            'commit': 'git commit saves your staged changes',
            'branch': 'git branch creates or lists branches',
            'checkout': 'git checkout switches branches or restores files',
            'merge': 'git merge combines branches',
            'rebase': 'git rebase reapplies commits on another base',
            'push': 'git push uploads commits to a remote repository',
            'pull': 'git pull downloads and merges from a remote',
            'stash': 'git stash temporarily shelves changes',
            'cherry-pick': 'git cherry-pick applies specific commits',
            'reset': 'git reset undoes changes',
            'log': 'git log shows commit history'
        };
        
        const hint = hints[gitCommand] || 'Type the command exactly as shown, including spaces and special characters.';
        this.showGitFeedback(`💡 Hint: ${hint}`, 'info');
    },
    
    clearTerminal: function() {
        this.terminalOutput.innerHTML = '';
        this.showGitFeedback('Terminal output cleared', 'info');
    },
    
    copyCommand: function() {
        const command = this.gitGameState.currentCommand;
        navigator.clipboard.writeText(command).then(() => {
            this.showGitFeedback('Command copied to clipboard!', 'success');
        });
    },
    
    showTerminalOutput: function() {
        // Already implemented in simulateCommand
    },
    
    showTerminalInput: function() {
        // Switch back to typing view
        this.gitTypingTarget.focus();
    },
    
    initBranchVisualization: function() {
        // Initialize with a simple branch structure
        this.gitGameState.branchState = {
            main: ['Initial commit', 'Add README', 'Setup project'],
            features: {
                'feature/login': ['Create login page', 'Add authentication'],
                'feature/dashboard': ['Create dashboard layout']
            },
            currentBranch: 'main'
        };
        
        this.updateBranchVisualization();
    },
    
    updateBranchVisualization: function() {
        const branchState = this.gitGameState.branchState;
        const container = this.branchContainer;
        
        // Clear container
        container.innerHTML = '';
        
        // Create main branch
        const mainBranch = document.createElement('div');
        mainBranch.className = 'branch-line main-branch';
        
        // Add commits to main branch
        branchState.main.forEach((commit, index) => {
            const commitCircle = document.createElement('div');
            commitCircle.className = 'commit-circle';
            commitCircle.title = commit;
            commitCircle.textContent = index + 1;
            mainBranch.appendChild(commitCircle);
            
            // Add connecting line except for last commit
            if (index < branchState.main.length - 1) {
                const line = document.createElement('div');
                line.className = 'commit-line';
                mainBranch.appendChild(line);
            }
        });
        
        container.appendChild(mainBranch);
        
        // Create feature branches
        Object.entries(branchState.features).forEach(([featureName, commits]) => {
            const featureBranch = document.createElement('div');
            featureBranch.className = 'branch-line feature-branch';
            
            // Add branching point
            const branchPoint = document.createElement('div');
            branchPoint.className = 'branch-point';
            featureBranch.appendChild(branchPoint);
            
            // Add commits to feature branch
            commits.forEach((commit, index) => {
                const commitCircle = document.createElement('div');
                commitCircle.className = 'commit-circle feature-commit';
                commitCircle.title = commit;
                commitCircle.textContent = String.fromCharCode(97 + index); // a, b, c, etc.
                featureBranch.appendChild(commitCircle);
                
                // Add connecting line except for last commit
                if (index < commits.length - 1) {
                    const line = document.createElement('div');
                    line.className = 'commit-line';
                    featureBranch.appendChild(line);
                }
            });
            
            container.appendChild(featureBranch);
        });
        
        // Highlight current branch
        this.highlightCurrentBranch();
    },
    
    highlightCurrentBranch: function() {
        // Remove previous highlighting
        document.querySelectorAll('.branch-line').forEach(line => {
            line.classList.remove('active-branch');
        });
        
        // Highlight current branch
        const currentBranch = this.gitGameState.branchState.currentBranch;
        if (currentBranch === 'main') {
            document.querySelector('.main-branch')?.classList.add('active-branch');
        } else {
            // Find and highlight feature branch
            // This is a simplified implementation
        }
    },
    
    initCheatsheet: function() {
        const cheatsheet = document.getElementById('cheatsheetContent');
        let cheatsheetHtml = '<div class="cheatsheet-grid">';
        
        // Group commands by category
        const categories = {
            'Getting Started': ['init', 'clone', 'status'],
            'Basic Snapshotting': ['add', 'commit', 'diff', 'restore'],
            'Branching & Merging': ['branch', 'checkout', 'merge', 'rebase'],
            'Sharing & Updating': ['fetch', 'pull', 'push'],
            'Inspection & Comparison': ['log', 'show', 'diff'],
            'Debugging': ['bisect', 'blame', 'grep'],
            'Patching': ['apply', 'cherry-pick', 'rebase'],
            'Advanced': ['stash', 'reset', 'revert', 'tag']
        };
        
        Object.entries(categories).forEach(([category, commands]) => {
            cheatsheetHtml += `
                <div class="cheatsheet-category">
                    <h5>${category}</h5>
                    <div class="cheatsheet-commands">
            `;
            
            commands.forEach(command => {
                // Find command description
                let description = '';
                for (const level in this.gitCommands) {
                    const found = this.gitCommands[level].find(cmd => 
                        cmd.command.includes(`git ${command}`));
                    if (found) {
                        description = found.description;
                        break;
                    }
                }
                
                cheatsheetHtml += `
                    <div class="cheatsheet-command">
                        <code>git ${command}</code>
                        <span class="command-desc">${description}</span>
                    </div>
                `;
            });
            
            cheatsheetHtml += `
                    </div>
                </div>
            `;
        });
        
        cheatsheetHtml += '</div>';
        cheatsheet.innerHTML = cheatsheetHtml;
    },
    
    toggleCheatsheet: function() {
        const content = document.getElementById('cheatsheetContent');
        const toggleBtn = document.getElementById('cheatsheetToggle');
        
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        } else {
            content.style.display = 'none';
            toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        }
    },
    
    checkGitAchievements: function() {
        const achievements = [];
        
        // Score achievements
        if (this.gitGameState.score >= 1000) {
            achievements.push({name: 'Git Guru', description: 'Scored 1000+ points'});
        }
        if (this.gitGameState.score >= 5000) {
            achievements.push({name: 'Version Control Master', description: 'Scored 5000+ points'});
        }
        
        // Speed achievements
        if (this.gitGameState.typingSpeed >= 80) {
            achievements.push({name: 'Turbo Typist', description: '80+ WPM typing speed'});
        }
        
        // Accuracy achievements
        if (this.gitGameState.typingAccuracy >= 95) {
            achievements.push({name: 'Precision Coder', description: '95%+ typing accuracy'});
        }
        if (this.gitGameState.typingAccuracy === 100) {
            achievements.push({name: 'Perfect Execution', description: '100% accuracy on a command'});
        }
        
        // Streak achievements
        if (this.gitGameState.bestStreak >= 50) {
            achievements.push({name: 'Unstoppable', description: '50+ correct keystroke streak'});
        }
        
        // Command mastery achievements
        if (this.gitGameState.commandsMastered.length >= 10) {
            achievements.push({name: 'Command Collector', description: 'Mastered 10+ Git commands'});
        }
        if (this.gitGameState.commandsMastered.length >= 20) {
            achievements.push({name: 'Git Expert', description: 'Mastered 20+ Git commands'});
        }
        
        return achievements;
    },
    
    displayGitAchievements: function(achievements) {
        const achievementsList = document.getElementById('gitAchievementsList');
        achievementsList.innerHTML = '';
        
        if (achievements.length === 0) {
            achievementsList.innerHTML = '<p class="no-achievements">Keep practicing to earn Git achievements!</p>';
            return;
        }
        
        achievements.forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = 'achievement-item';
            achievementEl.innerHTML = `
                <div class="achievement-icon">
                    <i class="fab fa-git-alt"></i>
                </div>
                <div class="achievement-content">
                    <strong>${achievement.name}</strong>
                    <p>${achievement.description}</p>
                </div>
            `;
            achievementsList.appendChild(achievementEl);
        });
    },
    
    shareGitResults: function() {
        const score = this.gitGameState.score;
        const level = this.gitGameState.currentLevel;
        const stage = this.gitGameState.currentStage;
        
        const shareText = `I scored ${score} points in Turbo Typing Coder (${level} level, stage ${stage})! 🚀💻`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Git Adventure Results',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showGitFeedback('Results copied to clipboard!', 'success');
            });
        }
    },
    
    showGitFeedback: function(message, type) {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.git-feedback-message');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `git-feedback-message git-feedback-${type}`;
        feedback.innerHTML = message;
        
        // Add to DOM
        document.querySelector('.git-game-container').appendChild(feedback);
        
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
    
    startGitGame: function() {
        // Add CSS for git game
        const style = document.createElement('style');
        style.textContent = `
            .git-game-container {
                background: rgba(10, 20, 30, 0.95);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 20px;
                border: 2px solid rgba(240, 80, 40, 0.3);
                position: relative;
                overflow: hidden;
            }
            
            .git-game-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, 
                    #f05028 0%, 
                    #ff8c00 50%, 
                    #ffd700 100%);
                z-index: 1;
            }
            
            .git-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(240, 80, 40, 0.2);
            }
            
            .git-header h3 {
                color: #f05028;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
                text-shadow: 0 0 10px rgba(240, 80, 40, 0.3);
            }
            
            .git-level-indicator {
                background: rgba(240, 80, 40, 0.2);
                padding: 3px 10px;
                border-radius: 12px;
                font-size: 0.8rem;
                color: #f05028;
                font-weight: bold;
                border: 1px solid rgba(240, 80, 40, 0.3);
            }
            
            .git-actions {
                display: flex;
                gap: 10px;
            }
            
            .git-level-selector {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            .level-btn {
                padding: 8px 16px;
                background: rgba(240, 80, 40, 0.1);
                border: 1px solid rgba(240, 80, 40, 0.3);
                color: #ffa07a;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: bold;
            }
            
            .level-btn:hover {
                background: rgba(240, 80, 40, 0.2);
                transform: translateY(-1px);
            }
            
            .level-btn.active {
                background: linear-gradient(45deg, #f05028, #ff8c00);
                color: white;
                box-shadow: 0 2px 8px rgba(240, 80, 40, 0.3);
            }
            
            .git-challenge-section {
                display: grid;
                grid-template-columns: 1fr 2fr 1fr;
                gap: 25px;
                margin-bottom: 25px;
            }
            
            @media (max-width: 1200px) {
                .git-challenge-section {
                    grid-template-columns: 1fr;
                }
            }
            
            .challenge-scenario, .command-explanation-section {
                background: rgba(20, 30, 40, 0.7);
                border-radius: 10px;
                padding: 20px;
                border: 1px solid rgba(240, 80, 40, 0.2);
            }
            
            .scenario-header, .explanation-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .scenario-header h4, .explanation-header h4 {
                color: #f05028;
                margin: 0;
                flex: 1;
            }
            
            .scenario-difficulty {
                background: rgba(240, 80, 40, 0.2);
                color: #f05028;
                padding: 3px 8px;
                border-radius: 10px;
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            .scenario-description {
                color: #ffccaa;
                line-height: 1.6;
            }
            
            .terminal-simulation {
                background: rgba(10, 15, 25, 0.9);
                border-radius: 10px;
                overflow: hidden;
                border: 1px solid rgba(240, 80, 40, 0.3);
            }
            
            .terminal-header {
                background: rgba(20, 25, 35, 0.9);
                padding: 12px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(240, 80, 40, 0.2);
            }
            
            .terminal-tabs {
                display: flex;
                gap: 2px;
            }
            
            .terminal-tab {
                padding: 6px 16px;
                background: rgba(255, 255, 255, 0.05);
                color: #aaa;
                border-radius: 4px 4px 0 0;
                cursor: pointer;
                font-size: 0.9rem;
            }
            
            .terminal-tab.active {
                background: rgba(240, 80, 40, 0.2);
                color: #f05028;
                font-weight: bold;
            }
            
            .terminal-controls {
                display: flex;
                gap: 8px;
            }
            
            .terminal-btn {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #aaa;
                width: 32px;
                height: 32px;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .terminal-btn:hover {
                background: rgba(240, 80, 40, 0.2);
                color: #f05028;
            }
            
            .terminal-body {
                padding: 20px;
                min-height: 200px;
            }
            
            .terminal-prompt {
                color: #00ff00;
                font-family: 'Courier New', monospace;
                margin-bottom: 15px;
                font-size: 1rem;
            }
            
            .prompt-user {
                color: #00ffff;
                font-weight: bold;
            }
            
            .prompt-path {
                color: #ffff00;
            }
            
            .prompt-symbol {
                color: #00ff00;
                margin: 0 5px;
            }
            
            .typing-target {
                position: relative;
                background: rgba(5, 10, 15, 0.8);
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
                border: 2px solid rgba(240, 80, 40, 0.3);
                cursor: text;
                outline: none;
            }
            
            .typing-target:focus {
                border-color: #f05028;
                box-shadow: 0 0 20px rgba(240, 80, 40, 0.4);
            }
            
            .command-container {
                position: relative;
                font-family: 'Courier New', monospace;
                font-size: 1.1rem;
                line-height: 1.6;
                color: rgba(224, 224, 255, 0.9);
                white-space: pre-wrap;
                user-select: none;
                min-height: 1.6em;
            }
            
            .git-command-line {
                position: relative;
                min-height: 1.6em;
                display: flex;
                align-items: center;
            }
            
            .command-prompt {
                color: #00ff00;
                margin-right: 10px;
                user-select: none;
            }
            
            .git-char-element {
                position: relative;
                display: inline-block;
                min-width: 9px;
            }
            
            .git-char-element.git-keyword {
                color: #ff6600;
                font-weight: bold;
            }
            
            .git-char-element.git-option {
                color: #00ffff;
            }
            
            .git-char-element.git-argument {
                color: #ffff00;
            }
            
            .git-char-element.git-url {
                color: #ff00ff;
            }
            
            .git-char-element.git-space-char {
                background-color: rgba(255, 255, 255, 0.05);
                border-radius: 2px;
            }
            
            .git-typed-overlay-char {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Courier New', monospace;
                font-size: 1.1rem;
                font-weight: bold;
                z-index: 10;
                pointer-events: none;
                animation: gitFadeIn 0.1s ease-out;
                border-radius: 2px;
                text-shadow: 0 0 5px currentColor;
            }
            
            .git-typed-overlay-char.git-correct {
                color: #00ff00;
                background-color: rgba(0, 255, 0, 0.1);
            }
            
            .git-typed-overlay-char.git-incorrect {
                color: #ff0000;
                background-color: rgba(255, 0, 0, 0.15);
                text-decoration: line-through;
                animation: shake 0.1s;
            }
            
            @keyframes gitFadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                75% { transform: translateX(2px); }
            }
            
            .git-typing-cursor {
                position: absolute;
                background-color: #f05028;
                width: 3px;
                z-index: 20;
                pointer-events: none;
                animation: gitBlink 0.8s infinite;
                box-shadow: 0 0 10px #f05028;
            }
            
            @keyframes gitBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            .terminal-output {
                background: rgba(5, 10, 15, 0.8);
                border-radius: 8px;
                padding: 15px;
                max-height: 200px;
                overflow-y: auto;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                color: #aaddff;
                line-height: 1.4;
            }
            
            .command-output {
                margin-bottom: 15px;
                border-left: 3px solid #f05028;
                padding-left: 10px;
            }
            
            .output-timestamp {
                color: #888;
                font-size: 0.8rem;
                margin-bottom: 5px;
            }
            
            .output-command {
                color: #00ff00;
                margin-bottom: 10px;
            }
            
            .output-text {
                color: #aaddff;
                white-space: pre-wrap;
            }
            
            .terminal-hint {
                background: rgba(240, 80, 40, 0.1);
                padding: 12px;
                border-top: 1px solid rgba(240, 80, 40, 0.2);
            }
            
            .terminal-hint p {
                color: #ffccaa;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 0.9rem;
            }
            
            .explanation-content {
                color: #ffccaa;
            }
            
            .command-syntax {
                background: rgba(255, 255, 255, 0.05);
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 15px;
            }
            
            .syntax-label {
                color: #00ffff;
                font-weight: bold;
                display: block;
                margin-bottom: 8px;
            }
            
            .syntax-code {
                color: #ffff00;
                font-family: 'Courier New', monospace;
                font-size: 1.1rem;
            }
            
            .command-description {
                margin-bottom: 15px;
                line-height: 1.6;
            }
            
            .options-list, .examples-list {
                background: rgba(255, 255, 255, 0.03);
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 15px;
            }
            
            .options-list strong, .examples-list strong {
                color: #00ffff;
                display: block;
                margin-bottom: 10px;
            }
            
            .options-list ul, .examples-list ul {
                margin: 0;
                padding-left: 20px;
            }
            
            .options-list li, .examples-list li {
                margin-bottom: 5px;
                color: #ffccaa;
            }
            
            .options-list code, .examples-list code {
                background: rgba(255, 255, 255, 0.1);
                padding: 2px 6px;
                border-radius: 4px;
                color: #ffff00;
                font-family: 'Courier New', monospace;
            }
            
            .git-progress-section {
                background: rgba(20, 30, 40, 0.7);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 25px;
                border: 1px solid rgba(240, 80, 40, 0.2);
            }
            
            .progress-indicators {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .progress-indicator {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 15px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: transform 0.3s;
            }
            
            .progress-indicator:hover {
                transform: translateY(-2px);
            }
            
            .indicator-icon {
                width: 40px;
                height: 40px;
                background: rgba(240, 80, 40, 0.2);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                color: #f05028;
            }
            
            .indicator-content {
                display: flex;
                flex-direction: column;
            }
            
            .indicator-label {
                color: #ffccaa;
                font-size: 0.9rem;
                margin-bottom: 5px;
            }
            
            .indicator-value {
                color: white;
                font-size: 1.3rem;
                font-weight: bold;
            }
            
            .progress-container {
                margin: 20px 0;
            }
            
            .progress-bar {
                height: 12px;
                background: linear-gradient(90deg, #f05028, #ff8c00);
                width: 10%;
                border-radius: 6px;
                transition: width 0.5s;
            }
            
            .progress-text {
                text-align: center;
                margin-top: 8px;
                color: #ffccaa;
                font-weight: bold;
            }
            
            .git-stats-section {
                margin-bottom: 25px;
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 25px;
            }
            
            .git-stat {
                background: linear-gradient(135deg, rgba(240, 80, 40, 0.1), rgba(255, 140, 0, 0.1));
                border-radius: 10px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: transform 0.3s;
                border: 1px solid rgba(240, 80, 40, 0.2);
            }
            
            .git-stat:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(240, 80, 40, 0.2);
            }
            
            .stat-icon {
                width: 50px;
                height: 50px;
                background: rgba(240, 80, 40, 0.2);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: #f05028;
            }
            
            .stat-content {
                display: flex;
                flex-direction: column;
            }
            
            .stat-label {
                color: #ffccaa;
                font-size: 0.9rem;
                margin-bottom: 5px;
            }
            
            .stat-value {
                color: #fff;
                font-size: 1.8rem;
                font-weight: bold;
                text-shadow: 0 0 10px rgba(240, 80, 40, 0.3);
            }
            
            .turbo-meter {
                background: rgba(20, 30, 40, 0.7);
                border-radius: 10px;
                padding: 20px;
                border: 2px solid rgba(240, 80, 40, 0.3);
                transition: all 0.3s;
            }
            
            .turbo-meter.turbo-active {
                border-color: #ff0000;
                box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
                animation: turboPulse 1s infinite;
            }
            
            @keyframes turboPulse {
                0%, 100% { box-shadow: 0 0 30px rgba(255, 0, 0, 0.5); }
                50% { box-shadow: 0 0 50px rgba(255, 0, 0, 0.8); }
            }
            
            .turbo-label {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
                color: white;
                font-weight: bold;
                font-size: 1.1rem;
            }
            
            .turbo-label i {
                color: #f05028;
                font-size: 1.3rem;
            }
            
            .turbo-percent {
                margin-left: auto;
                background: rgba(240, 80, 40, 0.2);
                padding: 3px 10px;
                border-radius: 10px;
                font-weight: bold;
            }
            
            .turbo-bar {
                height: 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .turbo-fill {
                height: 100%;
                width: 0%;
                border-radius: 10px;
                transition: width 0.5s, background 0.5s;
            }
            
            .turbo-hint p {
                color: #ffccaa;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 0.9rem;
            }
            
            .git-branch-visualization {
                background: rgba(20, 30, 40, 0.7);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 25px;
                border: 1px solid rgba(240, 80, 40, 0.2);
            }
            
            .git-branch-visualization h4 {
                color: #f05028;
                margin: 0 0 20px 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .branch-container {
                min-height: 150px;
                background: rgba(10, 15, 25, 0.8);
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
                position: relative;
            }
            
            .branch-line {
                display: flex;
                align-items: center;
                margin-bottom: 30px;
                position: relative;
            }
            
            .main-branch {
                justify-content: flex-start;
            }
            
            .feature-branch {
                justify-content: flex-start;
                margin-left: 60px;
                position: relative;
            }
            
            .feature-branch::before {
                content: '';
                position: absolute;
                left: -30px;
                top: 50%;
                width: 30px;
                height: 2px;
                background: #ff00ff;
            }
            
            .branch-point {
                width: 10px;
                height: 10px;
                background: #ff00ff;
                border-radius: 50%;
                margin-right: 20px;
            }
            
            .commit-circle {
                width: 40px;
                height: 40px;
                background: #00ff00;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: black;
                font-weight: bold;
                font-size: 0.9rem;
                z-index: 2;
                border: 2px solid rgba(255, 255, 255, 0.3);
            }
            
            .feature-commit {
                background: #ff00ff;
            }
            
            .commit-line {
                width: 40px;
                height: 2px;
                background: #00ff00;
                margin: 0 10px;
            }
            
            .feature-branch .commit-line {
                background: #ff00ff;
            }
            
            .branch-legend {
                display: flex;
                justify-content: center;
                gap: 30px;
                flex-wrap: wrap;
            }
            
            .legend-item {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .legend-color {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 2px solid rgba(255, 255, 255, 0.3);
            }
            
            .legend-color.main {
                background: #00ff00;
            }
            
            .legend-color.feature {
                background: #ff00ff;
            }
            
            .legend-color.commit {
                background: #ffff00;
            }
            
            .legend-text {
                color: #ffccaa;
                font-size: 0.9rem;
            }
            
            .git-cheatsheet {
                background: rgba(20, 30, 40, 0.7);
                border-radius: 10px;
                margin-bottom: 25px;
                border: 1px solid rgba(240, 80, 40, 0.2);
                overflow: hidden;
            }
            
            .cheatsheet-header {
                background: rgba(30, 40, 50, 0.9);
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
            }
            
            .cheatsheet-header h4 {
                color: #f05028;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .cheatsheet-toggle {
                background: transparent;
                border: none;
                color: #f05028;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 5px;
            }
            
            .cheatsheet-content {
                padding: 20px;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .cheatsheet-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
            }
            
            .cheatsheet-category h5 {
                color: #00ffff;
                margin: 0 0 10px 0;
                padding-bottom: 5px;
                border-bottom: 1px solid rgba(0, 255, 255, 0.3);
            }
            
            .cheatsheet-commands {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .cheatsheet-command {
                background: rgba(255, 255, 255, 0.05);
                padding: 10px;
                border-radius: 6px;
                display: flex;
                flex-direction: column;
                gap: 5px;
                transition: all 0.3s;
            }
            
            .cheatsheet-command:hover {
                background: rgba(240, 80, 40, 0.1);
                transform: translateX(5px);
            }
            
            .cheatsheet-command code {
                color: #ffff00;
                font-family: 'Courier New', monospace;
                font-size: 1rem;
                font-weight: bold;
            }
            
            .command-desc {
                color: #ffccaa;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .git-results-panel {
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
                background: rgba(20, 30, 40, 0.95);
                border-radius: 15px;
                padding: 40px;
                border: 2px solid rgba(240, 80, 40, 0.3);
            }
            
            .stage-summary {
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
                color: #ffccaa;
                font-size: 0.9rem;
            }
            
            .summary-value {
                color: #fff;
                font-size: 1.5rem;
                font-weight: bold;
                color: #f05028;
            }
            
            .git-achievements {
                margin: 30px 0;
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
            }
            
            .git-achievements h4 {
                color: #ff8c00;
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
                border-left: 4px solid #ff8c00;
            }
            
            .achievement-icon {
                color: #ff8c00;
                font-size: 1.5rem;
            }
            
            .no-achievements {
                text-align: center;
                color: #999;
                font-style: italic;
                padding: 20px;
            }
            
            .next-stage-preview {
                margin: 30px 0;
                padding: 20px;
                background: rgba(240, 80, 40, 0.1);
                border-radius: 10px;
                border-left: 4px solid #f05028;
            }
            
            .next-stage-preview h4 {
                color: #f05028;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .preview-content {
                color: #ffccaa;
                line-height: 1.6;
            }
            
            .results-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
            }
            
            .git-feedback-message {
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
            
            .git-feedback-success {
                background: linear-gradient(45deg, rgba(0, 255, 0, 0.9), rgba(0, 200, 0, 0.9));
                color: white;
                border: 2px solid #00ff00;
            }
            
            .git-feedback-error {
                background: linear-gradient(45deg, rgba(255, 0, 0, 0.9), rgba(200, 0, 0, 0.9));
                color: white;
                border: 2px solid #ff0000;
            }
            
            .git-feedback-info {
                background: linear-gradient(45deg, rgba(240, 80, 40, 0.9), rgba(200, 60, 30, 0.9));
                color: white;
                border: 2px solid #f05028;
            }
            
            .git-feedback-turbo {
                background: linear-gradient(45deg, rgba(255, 0, 0, 0.9), rgba(255, 140, 0, 0.9));
                color: white;
                border: 2px solid #ff8c00;
                animation: turboGlow 0.5s infinite alternate;
            }
            
            @keyframes turboGlow {
                from { box-shadow: 0 0 20px rgba(255, 140, 0, 0.7); }
                to { box-shadow: 0 0 40px rgba(255, 140, 0, 1); }
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
                .git-header {
                    flex-direction: column;
                    gap: 15px;
                    align-items: flex-start;
                }
                
                .git-actions {
                    width: 100%;
                    justify-content: center;
                }
                
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .progress-indicators {
                    grid-template-columns: 1fr;
                }
                
                .stage-summary {
                    grid-template-columns: 1fr;
                }
                
                .results-actions {
                    flex-direction: column;
                }
                
                .cheatsheet-grid {
                    grid-template-columns: 1fr;
                }
                
                .git-level-selector {
                    flex-wrap: wrap;
                }
            }
            
            @media (max-width: 480px) {
                .stats-grid {
                    grid-template-columns: 1fr;
                }
                
                .terminal-tabs {
                    font-size: 0.8rem;
                }
                
                .terminal-tab {
                    padding: 4px 8px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Focus on typing target
        this.gitTypingTarget.focus();
    }
};