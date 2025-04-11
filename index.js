document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', document.body.dataset.theme);
        // Optional: Update ARIA label for accessibility
        themeToggle.setAttribute('aria-label', 
          `${document.body.dataset.theme} theme`);
      });
  
      // Set initial theme
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.body.dataset.theme = savedTheme;
    }
  
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.navbar ul');
    
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        // Optional: Update ARIA expanded state
        const expanded = navMenu.classList.contains('show');
        mobileMenuBtn.setAttribute('aria-expanded', expanded);
      });
      
      // Close menu when clicking on a link
      document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', function() {
          navMenu.classList.remove('show');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      }); 
    }
  
    // Active nav link highlighting with throttling
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
  
    if (sections.length && navLinks.length) {
      let isScrolling;
      window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          let current = '';
          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 300) {
              current = section.getAttribute('id');
            }
          });
  
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
              link.classList.add('active');
            }
          });
        }, 100);
      });
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Optional: Unobserve after animation if needed
          // observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.project-card, .animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Optional: Add loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
  
        const formData = new FormData(this);
        
        fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok');
        })
        .then(data => {
          alert('Message sent successfully!');
          this.reset();
        })
        .catch(error => {
          alert('There was a problem sending your message. Please try again later.');
          console.error('Error:', error);
        })
        .finally(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        });
      });
    }
  });