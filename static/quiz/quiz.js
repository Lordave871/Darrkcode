// Quiz data - programming languages and computer science quizzes
const quizData = [
    {
        id: 1,
        title: "JavaScript Fundamentals",
        description: "Test your knowledge of JavaScript basics including variables, functions, and control structures.",
        category: "programming",
        questions: 15,
        time: "20 min",
        difficulty: "Beginner",
        icon: "fab fa-js-square"
    },
    {
        id: 2,
        title: "Python Programming",
        description: "Master Python concepts from basic syntax to advanced features like list comprehensions.",
        category: "programming",
        questions: 20,
        time: "30 min",
        difficulty: "Intermediate",
        icon: "fab fa-python"
    },
    {
        id: 3,
        title: "Data Structures",
        description: "Understand arrays, linked lists, stacks, queues, trees, and graphs with practical questions.",
        category: "cs",
        questions: 25,
        time: "45 min",
        difficulty: "Advanced",
        icon: "fas fa-project-diagram"
    },
    {
        id: 4,
        title: "Algorithms",
        description: "Test your algorithmic thinking with problems on sorting, searching, and optimization.",
        category: "cs",
        questions: 18,
        time: "35 min",
        difficulty: "Advanced",
        icon: "fas fa-calculator"
    },
    {
        id: 5,
        title: "HTML & CSS",
        description: "Check your web development skills with HTML tags, CSS selectors, and layout techniques.",
        category: "web",
        questions: 12,
        time: "15 min",
        difficulty: "Beginner",
        icon: "fab fa-html5"
    },
    {
        id: 6,
        title: "React.js Concepts",
        description: "Assess your React knowledge including components, state, props, hooks, and lifecycle.",
        category: "web",
        questions: 16,
        time: "25 min",
        difficulty: "Intermediate",
        icon: "fab fa-react"
    },
    {
        id: 7,
        title: "SQL & Databases",
        description: "Test your database skills with SQL queries, joins, normalization, and transactions.",
        category: "data",
        questions: 22,
        time: "40 min",
        difficulty: "Intermediate",
        icon: "fas fa-database"
    },
    {
        id: 8,
        title: "Machine Learning Basics",
        description: "Evaluate your understanding of ML concepts, algorithms, and model evaluation.",
        category: "data",
        questions: 14,
        time: "30 min",
        difficulty: "Advanced",
        icon: "fas fa-brain"
    },
    {
        id: 9,
        title: "Java Programming",
        description: "Test your Java skills including OOP concepts, exceptions, collections, and multithreading.",
        category: "programming",
        questions: 18,
        time: "30 min",
        difficulty: "Intermediate",
        icon: "fab fa-java"
    },
    {
        id: 10,
        title: "Operating Systems",
        description: "Check your knowledge of processes, memory management, file systems, and synchronization.",
        category: "cs",
        questions: 20,
        time: "35 min",
        difficulty: "Advanced",
        icon: "fas fa-desktop"
    },
    {
        id: 11,
        title: "C++ Programming",
        description: "Master C++ concepts including pointers, memory management, templates, and STL.",
        category: "programming",
        questions: 22,
        time: "40 min",
        difficulty: "Advanced",
        icon: "fas fa-copyright"
    },
    {
        id: 12,
        title: "Computer Networks",
        description: "Test your networking knowledge including OSI model, TCP/IP, routing, and security.",
        category: "cs",
        questions: 16,
        time: "25 min",
        difficulty: "Intermediate",
        icon: "fas fa-network-wired"
    },
    {
        id: 13,
        title: "Flutter Fundamentals",
        description: "Master Flutter framework for building cross-platform mobile applications with Dart.",
        category: "mobile",
        questions: 18,
        time: "30 min",
        difficulty: "Beginner",
        icon: "fas fa-mobile-alt"
    },
    {
        id: 14,
        title: "React Native Basics",
        description: "Learn React Native for building native mobile apps using JavaScript and React.",
        category: "mobile",
        questions: 16,
        time: "25 min",
        difficulty: "Intermediate",
        icon: "fab fa-react"
    },
    {
        id: 15,
        title: "Swift Programming",
        description: "Explore Swift language for iOS and macOS app development with modern syntax.",
        category: "mobile",
        questions: 20,
        time: "35 min",
        difficulty: "Intermediate",
        icon: "fas fa-apple"
    },
    {
        id: 16,
        title: "Kotlin for Android",
        description: "Master Kotlin programming language for Android app development.",
        category: "mobile",
        questions: 19,
        time: "32 min",
        difficulty: "Intermediate",
        icon: "fas fa-android"
    },
    {
        id: 17,
        title: "Mobile App UI/UX Design",
        description: "Learn mobile app design principles, user experience, and interface best practices.",
        category: "mobile",
        questions: 14,
        time: "22 min",
        difficulty: "Beginner",
        icon: "fas fa-paint-brush"
    },
    {
        id: 18,
        title: "AWS Fundamentals",
        description: "Understand Amazon Web Services core services, EC2, S3, and cloud architecture.",
        category: "devops",
        questions: 25,
        time: "40 min",
        difficulty: "Intermediate",
        icon: "fab fa-aws"
    },
    {
        id: 19,
        title: "Docker & Containerization",
        description: "Learn Docker containers, images, and containerized application deployment.",
        category: "devops",
        questions: 22,
        time: "35 min",
        difficulty: "Intermediate",
        icon: "fab fa-docker"
    },
    {
        id: 20,
        title: "Kubernetes Orchestration",
        description: "Master Kubernetes for container orchestration and scaling applications.",
        category: "devops",
        questions: 24,
        time: "38 min",
        difficulty: "Advanced",
        icon: "fas fa-cube"
    },
    {
        id: 21,
        title: "CI/CD Pipelines",
        description: "Learn continuous integration and deployment with Jenkins, GitLab CI, and GitHub Actions.",
        category: "devops",
        questions: 20,
        time: "32 min",
        difficulty: "Intermediate",
        icon: "fas fa-code-branch"
    },
    {
        id: 22,
        title: "Infrastructure as Code",
        description: "Explore Terraform and Ansible for managing infrastructure through code.",
        category: "devops",
        questions: 18,
        time: "30 min",
        difficulty: "Advanced",
        icon: "fas fa-server"
    },
    {
        id: 23,
        title: "Network Security Basics",
        description: "Learn fundamentals of network security, firewalls, VPN, and threat prevention.",
        category: "security",
        questions: 20,
        time: "32 min",
        difficulty: "Intermediate",
        icon: "fas fa-shield-alt"
    },
    {
        id: 24,
        title: "Web Application Security",
        description: "Understand OWASP top 10 vulnerabilities, SQL injection, XSS, and secure coding.",
        category: "security",
        questions: 22,
        time: "36 min",
        difficulty: "Intermediate",
        icon: "fas fa-lock"
    },
    {
        id: 25,
        title: "Cryptography & Encryption",
        description: "Master encryption algorithms, hashing, digital signatures, and SSL/TLS.",
        category: "security",
        questions: 18,
        time: "30 min",
        difficulty: "Advanced",
        icon: "fas fa-key"
    },
    {
        id: 26,
        title: "Penetration Testing",
        description: "Learn ethical hacking techniques, vulnerability assessment, and penetration testing.",
        category: "security",
        questions: 19,
        time: "33 min",
        difficulty: "Advanced",
        icon: "fas fa-user-secret"
    },
    {
        id: 27,
        title: "Identity & Access Management",
        description: "Understand authentication, authorization, OAuth, LDAP, and IAM best practices.",
        category: "security",
        questions: 17,
        time: "28 min",
        difficulty: "Intermediate",
        icon: "fas fa-user-check"
    },
    {
        id: 28,
        title: "Blockchain Fundamentals",
        description: "Learn blockchain technology, distributed ledgers, and cryptocurrency basics.",
        category: "blockchain",
        questions: 16,
        time: "26 min",
        difficulty: "Beginner",
        icon: "fas fa-link"
    },
    {
        id: 29,
        title: "Smart Contracts with Solidity",
        description: "Master Solidity programming for Ethereum smart contracts and decentralized apps.",
        category: "blockchain",
        questions: 20,
        time: "34 min",
        difficulty: "Advanced",
        icon: "fas fa-file-contract"
    },
    {
        id: 30,
        title: "Bitcoin & Cryptocurrency",
        description: "Understand Bitcoin, cryptocurrency wallets, transactions, and mining.",
        category: "blockchain",
        questions: 17,
        time: "28 min",
        difficulty: "Beginner",
        icon: "fab fa-bitcoin"
    },
    {
        id: 31,
        title: "DeFi & Web3 Development",
        description: "Explore decentralized finance, DeFi protocols, and Web3 application development.",
        category: "blockchain",
        questions: 19,
        time: "31 min",
        difficulty: "Advanced",
        icon: "fas fa-exchange-alt"
    },
    {
        id: 32,
        title: "Consensus Mechanisms",
        description: "Learn PoW, PoS, Byzantine algorithms, and different blockchain consensus methods.",
        category: "blockchain",
        questions: 15,
        time: "24 min",
        difficulty: "Advanced",
        icon: "fas fa-handshake"
    },
    {
        id: 33,
        title: "TypeScript Mastery",
        description: "Learn TypeScript for type-safe JavaScript development with interfaces, generics, and decorators.",
        category: "programming",
        questions: 17,
        time: "28 min",
        difficulty: "Intermediate",
        icon: "fas fa-code"
    },
    {
        id: 34,
        title: "Go Programming",
        description: "Master Go language for building fast, efficient systems with goroutines and concurrency.",
        category: "programming",
        questions: 16,
        time: "26 min",
        difficulty: "Intermediate",
        icon: "fas fa-gavel"
    },
    {
        id: 35,
        title: "Rust Programming",
        description: "Explore Rust for systems programming with memory safety and zero-cost abstractions.",
        category: "programming",
        questions: 20,
        time: "33 min",
        difficulty: "Advanced",
        icon: "fas fa-crab"
    },
    {
        id: 36,
        title: "Ruby on Rails",
        description: "Learn Ruby and Rails framework for rapid web application development.",
        category: "programming",
        questions: 15,
        time: "24 min",
        difficulty: "Intermediate",
        icon: "fas fa-gem"
    },
    {
        id: 37,
        title: "PHP & Backend Development",
        description: "Master PHP for server-side development, Laravel framework, and database integration.",
        category: "programming",
        questions: 18,
        time: "30 min",
        difficulty: "Intermediate",
        icon: "fab fa-php"
    },
    {
        id: 38,
        title: "Compiler Design",
        description: "Understand lexical analysis, parsing, code generation, and compiler optimization.",
        category: "cs",
        questions: 19,
        time: "32 min",
        difficulty: "Advanced",
        icon: "fas fa-cogs"
    },
    {
        id: 39,
        title: "Artificial Intelligence",
        description: "Learn AI concepts, search algorithms, knowledge representation, and intelligent systems.",
        category: "cs",
        questions: 18,
        time: "30 min",
        difficulty: "Advanced",
        icon: "fas fa-robot"
    },
    {
        id: 40,
        title: "Theory of Computation",
        description: "Explore automata theory, formal languages, computability, and Turing machines.",
        category: "cs",
        questions: 21,
        time: "36 min",
        difficulty: "Advanced",
        icon: "fas fa-infinity"
    },
    {
        id: 41,
        title: "Graph Theory",
        description: "Master graph algorithms, traversal, shortest paths, and tree structures.",
        category: "cs",
        questions: 17,
        time: "28 min",
        difficulty: "Advanced",
        icon: "fas fa-share-alt"
    },
    {
        id: 42,
        title: "Microprocessor Architecture",
        description: "Learn CPU design, instruction sets, pipelines, caching, and memory hierarchy.",
        category: "cs",
        questions: 16,
        time: "26 min",
        difficulty: "Advanced",
        icon: "fas fa-microchip"
    },
    {
        id: 43,
        title: "Vue.js Framework",
        description: "Learn Vue.js for building interactive user interfaces with reactive data binding.",
        category: "web",
        questions: 16,
        time: "26 min",
        difficulty: "Intermediate",
        icon: "fab fa-vuejs"
    },
    {
        id: 44,
        title: "Angular & TypeScript",
        description: "Master Angular framework for building enterprise-scale web applications.",
        category: "web",
        questions: 19,
        time: "31 min",
        difficulty: "Advanced",
        icon: "fas fa-layer-group"
    },
    {
        id: 45,
        title: "Node.js & Express",
        description: "Learn Node.js runtime, Express framework, and REST API development.",
        category: "web",
        questions: 17,
        time: "28 min",
        difficulty: "Intermediate",
        icon: "fab fa-node-js"
    },
    {
        id: 46,
        title: "GraphQL APIs",
        description: "Master GraphQL for efficient API queries, mutations, and real-time subscriptions.",
        category: "web",
        questions: 15,
        time: "25 min",
        difficulty: "Intermediate",
        icon: "fas fa-bezier-curve"
    },
    {
        id: 47,
        title: "Web Performance & Optimization",
        description: "Learn performance metrics, lazy loading, caching, and optimization techniques.",
        category: "web",
        questions: 14,
        time: "23 min",
        difficulty: "Intermediate",
        icon: "fas fa-tachometer-alt"
    },
    {
        id: 48,
        title: "Pandas & Data Analysis",
        description: "Master Pandas library for data manipulation, cleaning, and exploratory analysis.",
        category: "data",
        questions: 18,
        time: "30 min",
        difficulty: "Intermediate",
        icon: "fas fa-chart-bar"
    },
    {
        id: 49,
        title: "Data Visualization",
        description: "Learn Matplotlib, Seaborn, Plotly for creating effective data visualizations.",
        category: "data",
        questions: 15,
        time: "25 min",
        difficulty: "Beginner",
        icon: "fas fa-chart-line"
    },
    {
        id: 50,
        title: "Statistics & Probability",
        description: "Understand statistical concepts, probability distributions, hypothesis testing.",
        category: "data",
        questions: 20,
        time: "33 min",
        difficulty: "Intermediate",
        icon: "fas fa-dice"
    },
    {
        id: 51,
        title: "Deep Learning & Neural Networks",
        description: "Explore deep learning with TensorFlow, Keras, and neural network architectures.",
        category: "data",
        questions: 19,
        time: "32 min",
        difficulty: "Advanced",
        icon: "fas fa-network-wired"
    },
    {
        id: 52,
        title: "Natural Language Processing",
        description: "Master NLP techniques, text processing, sentiment analysis, and language models.",
        category: "data",
        questions: 17,
        time: "28 min",
        difficulty: "Advanced",
        icon: "fas fa-language"
    }
];

// DOM Elements
const quizCardsContainer = document.getElementById('quizCards');
const tabButtons = document.querySelectorAll('.tab-btn');
const loadMoreBtn = document.querySelector('.load-more-btn');
const startQuizBtn = document.querySelector('.start-quiz-btn');
const viewAllBtn = document.querySelector('.view-all-btn');

// State variables
let currentCategory = 'all';
let displayedQuizzes = 6;

// Modal variables
let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderQuizCards();
    setupEventListeners();
    
    // Quiz option interactions for the animated quiz
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.2)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
        });
        
        option.addEventListener('click', function() {
            this.style.background = 'var(--accent2)';
            this.style.transform += ' scale(1.3)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.transform = this.style.transform.replace(' scale(1.3)', '');
            }, 500);
        });
    });
});

// Render quiz cards based on category
function renderQuizCards() {
    const filteredQuizzes = currentCategory === 'all' 
        ? quizData 
        : quizData.filter(quiz => quiz.category === currentCategory);
    
    const quizzesToShow = filteredQuizzes;
    
    quizCardsContainer.innerHTML = '';
    
    if (quizzesToShow.length === 0) {
        quizCardsContainer.innerHTML = `
            <div class="no-quizzes-message">
                <i class="fas fa-search"></i>
                <h3>No quizzes found for this category</h3>
                <p>Try selecting a different category or check back later for new quizzes.</p>
            </div>
        `;
        return;
    }
    
    quizzesToShow.forEach((quiz, index) => {
        const card = document.createElement('div');
        card.className = 'quiz-card';
        card.dataset.category = quiz.category;
        card.style.animationDelay = `${index * 0.1}s`;
        
        let difficultyColor = '';
        if (quiz.difficulty === 'Beginner') {
            difficultyColor = '#4ecdc4';
        } else if (quiz.difficulty === 'Intermediate') {
            difficultyColor = '#ffd93d';
        } else {
            difficultyColor = '#ff6b6b';
        }
        
        card.innerHTML = `
            <div class="quiz-card-header">
                <span class="quiz-category" style="background: ${getCategoryColor(quiz.category)}">${getCategoryName(quiz.category)}</span>
                <h3 class="quiz-card-title">${quiz.title}</h3>
                <p class="quiz-card-description">${quiz.description}</p>
            </div>
            <div class="quiz-card-footer">
                <div class="quiz-stats">
                    <div class="quiz-stat">
                        <i class="fas fa-chart-line"></i>
                        <span style="color: ${difficultyColor}; font-weight: 700;">${quiz.difficulty}</span>
                    </div>
                </div>
                <button class="start-quiz-btn-card" data-id="${quiz.id}">
                    Start
                </button>
            </div>
        `;
        
        quizCardsContainer.appendChild(card);
    });
    
    // Add event listeners to card buttons
    document.querySelectorAll('.start-quiz-btn-card').forEach(btn => {
        btn.addEventListener('click', function() {
            const quizId = parseInt(this.dataset.id);
            const quiz = quizData.find(q => q.id === quizId);
            
            // Fetch quiz data from JSON
            fetchAndStartQuiz(quiz);
        });
    });
}

// Get category color
function getCategoryColor(category) {
    const colors = {
        'programming': 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)',
        'cs': 'linear-gradient(135deg, #4ecdc4 0%, #44a3d8 100%)',
        'web': 'linear-gradient(135deg, #a8dadc 0%, #4ecdc4 100%)',
        'data': 'linear-gradient(135deg, #f38181 0%, #aa96da 100%)',
        'mobile': 'linear-gradient(135deg, #fcbad3 0%, #a8edea 100%)',
        'devops': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'security': 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)',
        'blockchain': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
    return colors[category] || colors.programming;
}

// Get category display name
function getCategoryName(category) {
    const names = {
        'programming': 'Programming',
        'cs': 'Computer Science',
        'web': 'Web Development',
        'data': 'Data Science',
        'mobile': 'Mobile Development',
        'devops': 'Cloud & DevOps',
        'security': 'Cybersecurity',
        'blockchain': 'Blockchain'
    };
    return names[category] || 'Programming';
}

// Setup event listeners
function setupEventListeners() {
    // Tab buttons
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update category and reset display count
            currentCategory = this.dataset.category;
            displayedQuizzes = 6;
            
            // Re-render cards
            renderQuizCards();
        });
    });
    
    // View all quizzes button
    viewAllBtn.addEventListener('click', function() {
        currentCategory = 'all';
        displayedQuizzes = 12;
        
        // Update active tab
        tabButtons.forEach(b => b.classList.remove('active'));
        document.querySelector('.tab-btn[data-category="all"]').classList.add('active');
        
        renderQuizCards();
        
        // Scroll to categories section
        document.querySelector('.categories-section').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Fetch quiz from JSON file and start
async function fetchAndStartQuiz(quiz) {
    let questions = [];

    try {
        const categoryMap = {
            'programming': 'programming.json',
            'cs': 'cs.json',
            'web': 'web.json',
            'data': 'data.json',
            'mobile': 'mobile.json',
            'devops': 'devops.json',
            'security': 'security.json',
            'blockchain': 'blockchain.json'
        };

        const jsonFile = categoryMap[quiz.category];
        const response = await fetch(`quiz-json/${jsonFile}`);
        const categoryData = await response.json();
        const categoryQuizData = categoryData.quizzes.find(q => q.id === quiz.id);

        if (categoryQuizData && Array.isArray(categoryQuizData.questions) && categoryQuizData.questions.length > 0) {
            questions = categoryQuizData.questions;
        }
    } catch (error) {
        console.error('Error fetching quiz:', error);
    }

    // Normalize to 30 questions with placeholders
    questions = ensureThirtyQuestions(quiz.title, questions);

    currentQuizQuestions = questions;
    currentQuestionIndex = 0;
    quizScore = 0;
    openQuizModal(quiz);
}

// Generate or pad to 30 questions
function ensureThirtyQuestions(title, existingQuestions = []) {
    const padded = Array.isArray(existingQuestions) ? [...existingQuestions] : [];
    for (let i = 0; i < padded.length; i++) {
        const q = padded[i];
        if (!Array.isArray(q.options) || q.options.length < 4) {
            q.options = (q.options || []).slice(0, 4);
            while (q.options.length < 4) q.options.push(`Option ${q.options.length + 1}`);
        }
        if (typeof q.correctAnswer !== 'number') q.correctAnswer = 0;
    }
    const target = 30;
    for (let i = padded.length; i < target; i++) {
        padded.push(createPlaceholderQuestion(title, i));
    }
    return padded.slice(0, target);
}

function createPlaceholderQuestion(title, index) {
    return {
        id: index,
        question: `${title}: sample question ${index} (replace with real question)`,
        options: [
            'Sample option A',
            'Sample option B',
            'Sample option C',
            'Sample option D'
        ],
        correctAnswer: 0
    };
}

// Open quiz modal
function openQuizModal(quiz) {
    const modal = document.getElementById('quizModal');
    if (!modal) {
        createQuizModal();
    }

    // Set title before showing
    document.getElementById('quizTitle').textContent = quiz.title;
    displayQuestion();
    document.getElementById('quizModal').style.display = 'flex';
}

// Create quiz modal if not exists
function createQuizModal() {
    const modalHTML = `
        <div class="modal-overlay" id="quizModal">
            <div class="modal">
                <div class="modal-header">
                    <h3 id="quizTitle">Quiz Title</h3>
                    <button class="close-modal-btn" onclick="closeQuizModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="progress-text" id="progressText">Question 1 of 20</div>
                    </div>
                    
                    <div class="quiz-question">
                        <h4 id="questionText">Question text here</h4>
                    </div>
                    
                    <div class="quiz-options-container" id="optionsContainer">
                        <!-- Options will be generated here -->
                    </div>
                    
                    <div class="quiz-actions">
                        <button class="btn btn-secondary" id="prevBtn" onclick="previousQuestion()" style="display: none;">
                            <i class="fas fa-chevron-left"></i> Previous
                        </button>
                        <button class="btn btn-primary" id="nextBtn" onclick="nextQuestion()">
                            Next <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex >= currentQuizQuestions.length) {
        showQuizResults();
        return;
    }
    
    const question = currentQuizQuestions[currentQuestionIndex];
    const totalQuestions = currentQuizQuestions.length;
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    
    document.getElementById('progressFill').style.width = progressPercentage + '%';
    document.getElementById('progressText').textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-modal-option';
        optionDiv.innerHTML = `
            <div class="option-letter">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionDiv.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update button visibility
    document.getElementById('prevBtn').style.display = currentQuestionIndex > 0 ? 'flex' : 'none';
    document.getElementById('nextBtn').textContent = currentQuestionIndex === totalQuestions - 1 
        ? 'Submit Quiz' 
        : 'Next';
    if (currentQuestionIndex === totalQuestions - 1) {
        document.getElementById('nextBtn').innerHTML += ' <i class="fas fa-check"></i>';
    }
}

// Select option
function selectOption(index) {
    const question = currentQuizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-modal-option');
    
    options.forEach((opt, i) => {
        opt.classList.remove('selected', 'correct', 'incorrect');
        if (i === index) {
            opt.classList.add('selected');
            if (i === question.correctAnswer) {
                quizScore++;
                opt.classList.remove('selected');
                opt.classList.add('correct');
            } else {
                opt.classList.remove('selected');
                opt.classList.add('incorrect');
            }
        }
    });
    
    // Disable further selection
    options.forEach(opt => opt.style.pointerEvents = 'none');
}

// Next question
function nextQuestion() {
    if (currentQuestionIndex < currentQuizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showQuizResults();
    }
}

// Previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Show quiz results
function showQuizResults() {
    const totalQuestions = currentQuizQuestions.length;
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 3rem; margin-bottom: 20px;">🎉</div>
            <h2 style="font-size: 1.8rem; margin-bottom: 15px; color: var(--light);">Quiz Complete!</h2>
            <div style="font-size: 2.5rem; margin: 20px 0; color: var(--primary);">
                ${quizScore}/${totalQuestions}
            </div>
            <p style="font-size: 1.2rem; color: var(--gray); margin-bottom: 15px;">
                You scored ${percentage}%
            </p>
            <div style="background: rgba(255, 107, 107, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p style="color: var(--gray);">
                    ${percentage >= 80 ? 'Excellent performance!' : percentage >= 60 ? 'Good job! Keep practicing.' : 'Try again to improve your score.'}
                </p>
            </div>
        
            <button class="btn btn-primary" onclick="closeQuizModal()" style="width: 100%;">
                Back to Quizzes
            </button>
        </div>
    `;
}


// Close quiz modal
function closeQuizModal() {
    const modal = document.getElementById('quizModal');
    if (modal) {
        modal.style.display = 'none';
    }
}