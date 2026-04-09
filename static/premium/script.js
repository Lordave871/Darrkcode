// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Mobile dropdown toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close dropdown when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Typing effect in banner
    const typingText = document.querySelector('.typing-text');
    const words = ['Faster', 'Better', 'Smarter', 'Cleaner', 'Stronger'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeEffect() {
        if (isPaused) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete character
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Type character
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Determine typing speed
        let typeSpeed = 120;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(typeEffect, 1000);
    
    // Terminal cursor animation
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
    
    // Content sections data
    const sectionsData = [
        {
            id: 'ai',
            title: 'AI & Machine Learning',
            subtitle: 'Master neural networks, NLP, and computer vision',
            icon: 'fas fa-brain',
            color: '#00D4AA'
        },
        {
            id: 'web',
            title: 'Web Development',
            subtitle: 'Build modern web applications with latest frameworks',
            icon: 'fas fa-code',
            color: '#6C5CE7'
        },
        {
            id: 'data',
            title: 'Data Science',
            subtitle: 'Transform data into actionable insights',
            icon: 'fas fa-chart-bar',
            color: '#FF6584'
        },
        {
            id: 'mobile',
            title: 'Mobile Development',
            subtitle: 'Create native and cross-platform mobile apps',
            icon: 'fas fa-mobile-alt',
            color: '#00D4AA'
        },
        {
            id: 'devops',
            title: 'DevOps & Cloud',
            subtitle: 'Master deployment, scaling, and infrastructure',
            icon: 'fas fa-server',
            color: '#6C5CE7'
        },
        {
            id: 'algorithms',
            title: 'Algorithms',
            subtitle: 'Solve complex problems with efficient solutions',
            icon: 'fas fa-project-diagram',
            color: '#FF6584'
        }
    ];
    
    // Card data for each section
    const cardData = [
        {
            title: "Neural Networks Fundamentals",
            description: "Build neural networks from scratch with Python",
            duration: "2.5h",
            lessons: 14,
            level: "Intermediate",
            icon: "fas fa-network-wired",
            color: "#00D4AA",
            code: "import torch\nimport numpy as np\n\nclass NeuralNet:\n    def __init__(self):\n        self.layers = []"
        },
        {
            title: "React Advanced Patterns",
            description: "Master React hooks, context, and performance",
            duration: "3h",
            lessons: 16,
            level: "Advanced",
            icon: "fab fa-react",
            color: "#6C5CE7",
            code: "const useCustomHook = () => {\n    const [state, setState] = useState();\n    return { state };\n};"
        },
        {
            title: "Data Visualization with D3",
            description: "Create interactive data visualizations",
            duration: "4h",
            lessons: 18,
            level: "Intermediate",
            icon: "fas fa-chart-line",
            color: "#FF6584",
            code: "d3.select('svg')\n    .append('circle')\n    .attr('r', 50)\n    .style('fill', '#00D4AA');"
        },
        {
            title: "Flutter Mobile Development",
            description: "Build beautiful cross-platform apps",
            duration: "5h",
            lessons: 20,
            level: "Beginner",
            icon: "fab fa-flutter",
            color: "#00D4AA",
            code: "class HomePage extends StatelessWidget {\n    @override\n    Widget build(BuildContext context) {\n        return Container();\n    }\n}"
        },
        {
            title: "Docker & Kubernetes",
            description: "Containerize and orchestrate applications",
            duration: "3.5h",
            lessons: 15,
            level: "Intermediate",
            icon: "fab fa-docker",
            color: "#6C5CE7",
            code: "FROM node:alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ['npm', 'start']"
        },
        {
            title: "Advanced Algorithms",
            description: "Master dynamic programming and graphs",
            duration: "6h",
            lessons: 24,
            level: "Advanced",
            icon: "fas fa-sitemap",
            color: "#FF6584",
            code: "function dijkstra(graph, start) {\n    let distances = {};\n    let pq = new PriorityQueue();\n}"
        }
    ];
    
    // Generate content sections
    const contentContainer = document.getElementById('content-sections');
    
    sectionsData.forEach((section, index) => {
        // Create section element
        const sectionElement = document.createElement('section');
        sectionElement.className = 'content-section';
        sectionElement.id = section.id;
        
        // Section header
        sectionElement.innerHTML = `
            <div class="section-header">
                <div>
                    <h2 class="section-title">
                        <div class="section-icon">
                            <i class="${section.icon}"></i>
                        </div>
                        ${section.title}
                    </h2>
                    <p class="section-subtitle">${section.subtitle}</p>
                </div>
                <a href="#" class="view-all">
                    View All <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <div class="cards-container">
                <button class="nav-btn left">
                    <i class="fas fa-chevron-left"></i>
                </button>
                
                <div class="cards-wrapper" data-section="${section.id}">
                    <!-- Cards will be inserted here -->
                </div>
                
                <button class="nav-btn right">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        
        contentContainer.appendChild(sectionElement);
        
        // Add cards to this section
        const cardsWrapper = sectionElement.querySelector('.cards-wrapper');
        
        cardData.forEach((card, cardIndex) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            
            // Generate random difficulty badge
            const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
            const difficulty = difficulties[cardIndex % 3];
            
            cardElement.innerHTML = `
                <div class="card-badge">PREMIUM</div>
                
                <div class="card-thumbnail">
                    <div class="thumbnail-content">
                        <i class="${card.icon} thumbnail-icon"></i>
                        <div class="thumbnail-code">${card.code.split('\n')[0]}</div>
                    </div>
                    <div class="thumbnail-overlay">
                        <button class="code-preview-btn">
                            <i class="fas fa-code"></i>
                        </button>
                    </div>
                </div>
                
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="card-title">${card.title}</h3>
                        <p class="card-description">${card.description}</p>
                    </div>
                    
                    <div class="card-meta">
                        <div class="meta-item">
                            <i class="far fa-clock"></i>
                            <span>${card.duration}</span>
                        </div>
                        <div class="meta-item">
                            <i class="far fa-file-alt"></i>
                            <span>${card.lessons} lessons</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-signal"></i>
                            <span>${difficulty}</span>
                        </div>
                    </div>
                    
                    <div class="card-actions">
                        <button class="action-btn download-btn">
                            <i class="fas fa-download"></i>
                            Code
                        </button>
                        <button class="action-btn code-btn">
                            <i class="fas fa-play"></i>
                            Run
                        </button>
                    </div>
                </div>
            `;
            
            cardsWrapper.appendChild(cardElement);
        });
        
        // Add scroll functionality for this section
        const leftBtn = sectionElement.querySelector('.nav-btn.left');
        const rightBtn = sectionElement.querySelector('.nav-btn.right');
        const cardsContainer = cardsWrapper;
        
        leftBtn.addEventListener('click', () => {
            cardsContainer.scrollBy({
                left: -280,
                behavior: 'smooth'
            });
        });
        
        rightBtn.addEventListener('click', () => {
            cardsContainer.scrollBy({
                left: 280,
                behavior: 'smooth'
            });
        });
        
        // Auto-scroll cards with pause on hover
        let autoScrollInterval;
        let isHovering = false;
        
        const startAutoScroll = () => {
            if (isHovering) return;
            
            autoScrollInterval = setInterval(() => {
                // Check if we're at the end
                if (cardsContainer.scrollLeft + cardsContainer.clientWidth >= cardsContainer.scrollWidth - 10) {
                    // Scroll back to start
                    cardsContainer.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    cardsContainer.scrollBy({
                        left: 280,
                        behavior: 'smooth'
                    });
                }
            }, 4000);
        };
        
        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };
        
        // Start auto-scroll for this section
        startAutoScroll();
        
        // Pause auto-scroll on hover
        cardsContainer.addEventListener('mouseenter', () => {
            isHovering = true;
            stopAutoScroll();
        });
        
        cardsContainer.addEventListener('mouseleave', () => {
            isHovering = false;
            startAutoScroll();
        });
        
        // Button functionality
        const downloadBtns = sectionElement.querySelectorAll('.download-btn');
        const codeBtns = sectionElement.querySelectorAll('.code-btn');
        const previewBtns = sectionElement.querySelectorAll('.code-preview-btn');
        
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const cardTitle = this.closest('.card').querySelector('.card-title').textContent;
                
                // Animation effect
                this.innerHTML = '<i class="fas fa-check"></i> Copied';
                this.style.background = 'rgba(80, 250, 123, 0.1)';
                this.style.color = '#50FA7B';
                this.style.borderColor = 'rgba(80, 250, 123, 0.3)';
                
                // Show terminal notification
                showTerminalNotification(`Code for "${cardTitle}" copied to clipboard`);
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-download"></i> Code';
                    this.style.background = '';
                    this.style.color = '';
                    this.style.borderColor = '';
                }, 2000);
            });
        });
        
        codeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const cardTitle = this.closest('.card').querySelector('.card-title').textContent;
                showTerminalNotification(`Running "${cardTitle}" code example...`);
            });
        });
        
        previewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const cardTitle = this.closest('.card').querySelector('.card-title').textContent;
                showTerminalNotification(`Previewing "${cardTitle}" source code...`);
            });
        });
        
        // Card click for details
        const cards = sectionElement.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.action-btn') && !e.target.closest('.code-preview-btn')) {
                    const cardTitle = this.querySelector('.card-title').textContent;
                    showTerminalNotification(`Loading "${cardTitle}" course details...`);
                }
        });
    });
    
    // View All buttons
    document.querySelectorAll('.view-all').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionTitle = this.closest('.section-header').querySelector('.section-title').textContent;
            showTerminalNotification(`Loading all ${sectionTitle} courses...`);
        });
    });
    
    // Terminal buttons
    document.querySelectorAll('.terminal-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('close')) {
                showTerminalNotification('Terminal closed');
            } else if (this.classList.contains('minimize')) {
                showTerminalNotification('Terminal minimized');
            } else {
                showTerminalNotification('Terminal maximized');
            }
        });
    });
    });
    
    // FAB (Terminal button)
    const terminalFab = document.querySelector('.terminal-fab');
    terminalFab.addEventListener('click', function() {
        showTerminalNotification('Opening developer terminal...');
        // Animate button
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
    
    // Show/hide FAB based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            terminalFab.style.opacity = '1';
            terminalFab.style.visibility = 'visible';
            terminalFab.style.transform = 'scale(1)';
        } else {
            terminalFab.style.opacity = '0';
            terminalFab.style.visibility = 'hidden';
            terminalFab.style.transform = 'scale(0.8)';
        }
        
        // Header effect on scroll
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.9)';
            header.style.backdropFilter = 'blur(15px)';
        }
    });
    
    // Terminal notification system
    function showTerminalNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.terminal-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'terminal-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-terminal"></i>
                <span>${message}</span>
                <span class="notification-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(30, 30, 46, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 212, 170, 0.3);
            border-radius: 8px;
            padding: 12px 16px;
            color: var(--terminal-text);
            font-family: 'Fira Code', monospace;
            font-size: 13px;
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // Add some initial notification
    setTimeout(() => {
        showTerminalNotification('Dark Code v2.0 initialized');
        setTimeout(() => {
            showTerminalNotification('Loading premium courses...');
        }, 1000);
    }, 1500);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navLinks.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Add some dynamic code lines to background
    function addBinaryLines() {
        const binaryRain = document.querySelector('.binary-rain');
        for (let i = 0; i < 5; i++) {
            const line = document.createElement('div');
            line.className = 'binary-line';
            line.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                width: 1px;
                height: 100%;
                background: linear-gradient(to bottom, transparent, rgba(0, 212, 170, 0.1), transparent);
                animation: binaryFlow ${15 + Math.random() * 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            binaryRain.appendChild(line);
        }
    }
    
    addBinaryLines();
    addBinaryLines();
});