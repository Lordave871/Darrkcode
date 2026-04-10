(function(){
  function createCard(item){
    const a = item.href || '#';
    const btnText = item.action || 'Explore';
    const div = document.createElement('article');
    div.className = 'pl-card';
    div.setAttribute('data-language', item.id);
    
    // Only use logo image, no fallback text or symbols
    const iconHtml = item.logo ? `
      <div class="pl-icon">
        <img src="${item.logo}" alt="${item.title} logo">
      </div>
    ` : '';
    
    div.innerHTML = `
      <div>
        ${iconHtml}
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
      <a class="open" href="${a}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${btnText}
      </a>
    `;
    return div;
  }
  
  // Add staggered animation
  function animateCards() {
    const cards = document.querySelectorAll('.pl-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }
  
  // Load cards from card.json
  function loadCardsFromJSON() {
    const languages = document.getElementById('languages-grid');
    if(!languages) return;
    
    // Show loading state
    languages.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--muted)">
        <p>Loading programming languages...</p>
      </div>
    `;
    
    fetch('card.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        languages.innerHTML = '';
        
        if (data.languages && data.languages.length > 0) {
          data.languages.forEach(it => languages.appendChild(createCard(it)));
          // Animate cards after they're loaded
          setTimeout(animateCards, 100);
        } else {
          // If no languages data, show fallback cards
          showFallbackCards(languages);
        }
      })
      .catch(err => {
        console.error('Failed to load card.json', err);
        // Instead of showing error, show fallback cards
        showFallbackCards(languages);
      });
  }
  
  // Fallback cards in case JSON fails to load
  function showFallbackCards(container) {
    const fallbackLanguages = [
    {
      "id": "python",
      "icon": "Py",
      "logo": "./static/programming-language/images/python.png",
      "title": "Python",
      "desc": "Beginner-friendly language perfect for web development, data science, AI, and automation. Clean syntax and vast ecosystem.",
      "action": "Start Python",
      "href": "/python",
      "level": "Beginner",
      "popularity": 1,
      "category": ["web", "data", "ai", "automation"]
    },
    {
      "id": "javascript",
      "icon": "JS",
      "logo": "./static/programming-language/images/javascript.png",
      "title": "JavaScript",
      "desc": "The essential web language for interactive front-end and powerful back-end with Node.js. Runs everywhere.",
      "action": "Learn JS",
      "href": "/javascript",
      "level": "Beginner",
      "popularity": 2,
      "category": ["web", "frontend", "backend", "mobile"]
    },
    {
      "id": "java",
      "icon": "Jv",
      "logo": "./static/programming-language/images/java.png",
      "title": "Java",
      "desc": "Enterprise-grade language for large-scale applications, Android development, and cross-platform solutions.",
      "action": "Explore Java",
      "href": "/java",
      "level": "Intermediate",
      "popularity": 3,
      "category": ["enterprise", "android", "backend", "big-data"]
    },
    {
      "id": "csharp",
      "icon": "C#",
      "logo": "./static/programming-language/images/csharp.png",
      "title": "C#",
      "desc": "Microsoft's versatile language for Windows apps, game development with Unity, and modern web applications.",
      "action": "Discover C#",
      "href": "/csharp",
      "level": "Intermediate",
      "popularity": 4,
      "category": ["windows", "games", "web", "enterprise"]
    },
    {
      "id": "cpp",
      "icon": "C++",
      "logo": "./static/programming-language/images/cpp.png",
      "title": "C++",
      "desc": "High-performance language for game engines, operating systems, and performance-critical applications.",
      "action": "Master C++",
      "href": "/cpp",
      "level": "Advanced",
      "popularity": 5,
      "category": ["systems", "games", "embedded", "performance"]
    },
    {
      "id": "go",
      "icon": "Go",
      "logo": "./static/programming-language/images/go.svg",
      "title": "Go",
      "desc": "Google's simple and efficient language for concurrent systems, cloud services, and high-performance backends.",
      "action": "Build with Go",
      "href": "/go",
      "level": "Intermediate",
      "popularity": 6,
      "category": ["backend", "cloud", "concurrent", "microservices"]
    },
    {
      "id": "rust",
      "icon": "Rs",
      "logo": "./static/programming-language/images/rust.svg",
      "title": "Rust",
      "desc": "Memory-safe systems programming with zero-cost abstractions. Perfect for safety-critical applications.",
      "action": "Code Rust",
      "href": "/rust",
      "level": "Advanced",
      "popularity": 7,
      "category": ["systems", "safety", "webassembly", "embedded"]
    },
    {
      "id": "typescript",
      "icon": "TS",
      "logo": "./static/programming-language/images/typescript.png",
      "title": "TypeScript",
      "desc": "JavaScript with type safety for large-scale applications. Better tooling and fewer runtime errors.",
      "action": "Type Safe JS",
      "href": "/typescript",
      "level": "Intermediate",
      "popularity": 8,
      "category": ["web", "frontend", "backend", "enterprise"]
    },
    {
      "id": "ruby",
      "icon": "Rb",
      "logo": "./static/programming-language/images/ruby.png",
      "title": "Ruby",
      "desc": "Elegant and expressive language known for Ruby on Rails - perfect for rapid web development.",
      "action": "Ruby Journey",
      "href": "/ruby",
      "level": "Beginner",
      "popularity": 9,
      "category": ["web", "backend", "scripting", "prototyping"]
    },
    {
      "id": "php",
      "icon": "PHP",
      "logo": "./static/programming-language/images/php.svg",
      "title": "PHP",
      "desc": "Server-side scripting language powering 78% of the web. Great for WordPress and web applications.",
      "action": "PHP Power",
      "href": "/php",
      "level": "Beginner",
      "popularity": 10,
      "category": ["web", "backend", "cms", "server-side"]
    },
    {
      "id": "swift",
      "icon": "Sw",
      "logo": "./static/programming-language/images/swift.svg",
      "title": "Swift",
      "desc": "Apple's modern language for iOS, macOS, watchOS development. Fast, safe, and expressive.",
      "action": "Swift Apps",
      "href": "/swift",
      "level": "Intermediate",
      "popularity": 11,
      "category": ["mobile", "apple", "ios", "macos"]
    },
    {
      "id": "kotlin",
      "icon": "Kt",
      "logo": "./static/programming-language/images/kotlin.svg",
      "title": "Kotlin",
      "desc": "Modern language for Android development, backend services, and multiplatform applications.",
      "action": "Kotlin Dev",
      "href": "/kotlin",
      "level": "Intermediate",
      "popularity": 12,
      "category": ["android", "backend", "multiplatform", "web"]
    }
    ];
    
    container.innerHTML = '';
    fallbackLanguages.forEach(it => container.appendChild(createCard(it)));
    setTimeout(animateCards, 100);
  }
  
  // Alternative: Directly embed the data in JavaScript instead of fetching
  function loadCardsDirectly() {
    const languages = document.getElementById('languages-grid');
    if(!languages) return;
    
    const languagesData = [
    {
      "id": "python",
      "icon": "Py",
      "logo": "./static/programming-language/images/python.png",
      "title": "Python",
      "desc": "Beginner-friendly language perfect for web development, data science, AI, and automation. Clean syntax and vast ecosystem.",
      "action": "Start Python",
      "href": "/learn/python",
      "level": "Beginner",
      "popularity": 1,
      "category": ["web", "data", "ai", "automation"]
    },
    {
      "id": "javascript",
      "icon": "JS",
      "logo": "./static/programming-language/images/javascript.png",
      "title": "JavaScript",
      "desc": "The essential web language for interactive front-end and powerful back-end with Node.js. Runs everywhere.",
      "action": "Learn JS",
      "href": "/learn/javascript",
      "level": "Beginner",
      "popularity": 2,
      "category": ["web", "frontend", "backend", "mobile"]
    },
    {
      "id": "java",
      "icon": "Jv",
      "logo": "./static/programming-language/images/java.png",
      "title": "Java",
      "desc": "Enterprise-grade language for large-scale applications, Android development, and cross-platform solutions.",
      "action": "Explore Java",
      "href": "/learn/java",
      "level": "Intermediate",
      "popularity": 3,
      "category": ["enterprise", "android", "backend", "big-data"]
    },
    {
      "id": "csharp",
      "icon": "C#",
      "logo": "./static/programming-language/images/csharp.png",
      "title": "C#",
      "desc": "Microsoft's versatile language for Windows apps, game development with Unity, and modern web applications.",
      "action": "Discover C#",
      "href": "/learn/csharp",
      "level": "Intermediate",
      "popularity": 4,
      "category": ["windows", "games", "web", "enterprise"]
    },
    {
      "id": "cpp",
      "icon": "C++",
      "logo": "./static/programming-language/images/cpp.png",
      "title": "C++",
      "desc": "High-performance language for game engines, operating systems, and performance-critical applications.",
      "action": "Master C++",
      "href": "/learn/cpp",
      "level": "Advanced",
      "popularity": 5,
      "category": ["systems", "games", "embedded", "performance"]
    },
    {
      "id": "go",
      "icon": "Go",
      "logo": "./static/programming-language/images/go.svg",
      "title": "Go",
      "desc": "Google's simple and efficient language for concurrent systems, cloud services, and high-performance backends.",
      "action": "Build with Go",
      "href": "/learn/go",
      "level": "Intermediate",
      "popularity": 6,
      "category": ["backend", "cloud", "concurrent", "microservices"]
    },
    {
      "id": "rust",
      "icon": "Rs",
      "logo": "./static/programming-language/images/rust.svg",
      "title": "Rust",
      "desc": "Memory-safe systems programming with zero-cost abstractions. Perfect for safety-critical applications.",
      "action": "Code Rust",
      "href": "/learn/rust",
      "level": "Advanced",
      "popularity": 7,
      "category": ["systems", "safety", "webassembly", "embedded"]
    },
    {
      "id": "typescript",
      "icon": "TS",
      "logo": "./static/programming-language/images/typescript.png",
      "title": "TypeScript",
      "desc": "JavaScript with type safety for large-scale applications. Better tooling and fewer runtime errors.",
      "action": "Type Safe JS",
      "href": "/learn/typescript",
      "level": "Intermediate",
      "popularity": 8,
      "category": ["web", "frontend", "backend", "enterprise"]
    },
    {
      "id": "ruby",
      "icon": "Rb",
      "logo": "./static/programming-language/images/ruby.png",
      "title": "Ruby",
      "desc": "Elegant and expressive language known for Ruby on Rails - perfect for rapid web development.",
      "action": "Ruby Journey",
      "href": "/learn/ruby",
      "level": "Beginner",
      "popularity": 9,
      "category": ["web", "backend", "scripting", "prototyping"]
    },
    {
      "id": "php",
      "icon": "PHP",
      "logo": "./static/programming-language/images/php.svg",
      "title": "PHP",
      "desc": "Server-side scripting language powering 78% of the web. Great for WordPress and web applications.",
      "action": "PHP Power",
      "href": "/learn/php",
      "level": "Beginner",
      "popularity": 10,
      "category": ["web", "backend", "cms", "server-side"]
    },
    {
      "id": "swift",
      "icon": "Sw",
      "logo": "./static/programming-language/images/swift.svg",
      "title": "Swift",
      "desc": "Apple's modern language for iOS, macOS, watchOS development. Fast, safe, and expressive.",
      "action": "Swift Apps",
      "href": "/learn/swift",
      "level": "Intermediate",
      "popularity": 11,
      "category": ["mobile", "apple", "ios", "macos"]
    },
    {
      "id": "kotlin",
      "icon": "Kt",
      "logo": "./static/programming-language/images/kotlin.svg",
      "title": "Kotlin",
      "desc": "Modern language for Android development, backend services, and multiplatform applications.",
      "action": "Kotlin Dev",
      "href": "/learn/kotlin",
      "level": "Intermediate",
      "popularity": 12,
      "category": ["android", "backend", "multiplatform", "web"]
    }
    ];
    
    languages.innerHTML = '';
    languagesData.forEach(it => languages.appendChild(createCard(it)));
    setTimeout(animateCards, 100);
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Try loading from JSON first, if fails use direct data
    loadCardsFromJSON();
    
    // OR use this line instead to always load directly (no JSON dependency):
    // loadCardsDirectly();
  });
  
})();
