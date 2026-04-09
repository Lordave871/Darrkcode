(function(){
  'use strict';
  const SEARCH_ID = 'skill-search';
  const modal = document.getElementById('kc-modal');
  const modalTitle = document.getElementById('kc-modal-title');
  const modalBody = document.getElementById('kc-modal-body');
  const modalClose = document.querySelector('.kc-modal-close');
  const backToHomeBtn = document.getElementById('back-to-home');

  // small helpers
  const $ = id => document.getElementById(id);
  function debounce(fn, t=160){ let tmr; return (...a)=>{ clearTimeout(tmr); tmr = setTimeout(()=>fn.apply(this,a), t); }; }

  // Load details from JSON file
  let DETAILS = {};
  fetch('details.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      DETAILS = data;
      console.log('Details loaded successfully');
    })
    .catch(error => {
      console.error('Error loading details.json:', error);
      // Fallback content if JSON fails to load
      DETAILS = {
        "ml-intro": "<h4>Introduction to Machine Learning</h4><p>Learn the fundamentals of machine learning, including supervised and unsupervised learning, key algorithms, and real-world applications.</p><ul><li>What is Machine Learning?</li><li>Types of ML: Supervised, Unsupervised, Reinforcement</li><li>Common ML Algorithms</li><li>Real-world Applications</li></ul>",
        "ml-linear": "<h4>Linear Regression</h4><p>Master linear regression for predictive modeling and understand the mathematics behind this fundamental algorithm.</p><ul><li>Simple and Multiple Linear Regression</li><li>Cost Functions and Gradient Descent</li><li>Model Evaluation Metrics</li><li>Regularization Techniques</li></ul>",
        "ml-logistic": "<h4>Logistic Regression</h4><p>Understand logistic regression for classification problems and binary outcomes.</p><ul><li>Binary Classification</li><li>Sigmoid Function</li><li>Maximum Likelihood Estimation</li><li>Model Interpretation</li></ul>"
      };
    });

  // build topic map on init
  const TOPICS = {};
  document.querySelectorAll('.kc-card').forEach(card=>{
    const key = card.dataset.topic;
    const title = card.dataset.title || card.querySelector('h3')?.textContent || key;
    TOPICS[key] = { title };
    // click and keyboard
    card.addEventListener('click', ()=> openTopic(key));
    card.addEventListener('keyup', (e)=> { if(e.key === 'Enter' || e.key === ' ') openTopic(key); });
    // hover class for visual polish
    card.addEventListener('pointerenter', ()=> card.classList.add('is-hovered'));
    card.addEventListener('pointerleave', ()=> card.classList.remove('is-hovered'));
  });

  // wire up per-card buttons (Details)
  document.querySelectorAll('.card-btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation(); // avoid double firing on card
      const key = btn.dataset.topic;
      if(key) openTopic(key);
    });
  });

  let activeTopic = null;

  function openTopic(key){
    activeTopic = key;
    const t = TOPICS[key] || { title: key };
    modalTitle.textContent = t.title;
    
    // Check if details are available
    if (DETAILS[key]) {
      modalBody.innerHTML = `<div class="kc-detail">${DETAILS[key]}</div>`;
    } else {
      // Show loading or fallback content
      modalBody.innerHTML = `
        <div class="kc-detail">
          <h4>${t.title}</h4>
          <p>Content loading for this topic...</p>
          <p>Detailed information about ${t.title} will be displayed here once available.</p>
          <ul>
            <li>Comprehensive learning materials</li>
            <li>Practical examples and exercises</li>
            <li>Real-world applications</li>
            <li>Best practices and tips</li>
          </ul>
        </div>
      `;
    }
    
    modal.style.display = 'flex'; 
    modal.setAttribute('aria-hidden','false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal(){
    modal.classList.remove('open');
    setTimeout(()=>{ 
      modal.style.display='none'; 
      modal.setAttribute('aria-hidden','true'); 
      activeTopic = null; 
      document.body.style.overflow = ''; // Restore scrolling
    }, 220);
  }

  // Event listeners for modal
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e)=> { 
    if(e.target === modal) closeModal(); 
  });
  document.addEventListener('keydown', (e)=> { 
    if(e.key === 'Escape') closeModal(); 
  });

  // Back to home button
  backToHomeBtn?.addEventListener('click', closeModal);

  // search filtering
  const search = document.getElementById(SEARCH_ID);
  function filter(q){
    q = String(q||'').toLowerCase().trim();
    let hasResults = false;
    
    document.querySelectorAll('.kc-card').forEach(card=>{
      const title = (card.dataset.title || card.querySelector('h3')?.textContent || '').toLowerCase();
      const topic = (card.dataset.topic || '').toLowerCase();
      const meta = card.querySelector('.card-meta')?.textContent.toLowerCase() || '';
      const text = (title + ' ' + topic + ' ' + meta);
      
      const shouldShow = !q || text.includes(q);
      card.style.display = shouldShow ? '' : 'none';
      
      if (shouldShow) hasResults = true;
    });

    // Show/hide section headers based on whether they have visible cards
    document.querySelectorAll('.kc-section').forEach(section => {
      const visibleCards = section.querySelectorAll('.kc-card[style=""]').length;
      const sectionHeader = section.querySelector('.kc-section-header');
      if (sectionHeader) {
        sectionHeader.style.display = visibleCards > 0 ? 'flex' : 'none';
      }
    });
  }
  
  if(search) {
    search.addEventListener('input', debounce(e=> filter(e.target.value), 140));
    
    // Clear search when escape is pressed in search field
    search.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && search.value) {
        search.value = '';
        filter('');
        e.stopPropagation(); // Prevent modal from closing
      }
    });
  }

  // start-first button
  document.getElementById('start-all')?.addEventListener('click', ()=>{
    const first = document.querySelector('.kc-card');
    if(first) first.click();
  });

  // notes button
  document.getElementById('open-notes')?.addEventListener('click', ()=>{
    openTopic('notes');
  });

  // Add notes to DETAILS if not already present
  if (!DETAILS.notes) {
    DETAILS.notes = `
      <h4>Learning Notes</h4>
      <p>Track your progress and take notes as you learn:</p>
      <ul>
        <li><strong>Machine Learning:</strong> Focus on understanding the math behind algorithms</li>
        <li><strong>Data Science:</strong> Practice with real datasets and projects</li>
        <li><strong>Web Development:</strong> Build projects to reinforce concepts</li>
        <li><strong>Algorithms:</strong> Solve problems regularly to improve skills</li>
      </ul>
      <p><em>Your personal notes area - customize as needed!</em></p>
    `;
  }

  // small initial animation trigger
  window.requestAnimationFrame(()=> document.body.classList.add('ready'));
})();