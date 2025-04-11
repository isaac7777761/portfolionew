// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
      document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', document.body.dataset.theme);
  });

  // Set initial theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = savedTheme;

  // Active nav link highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar a');

  window.addEventListener('scroll', () => {
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
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card').forEach(card => {
      observer.observe(card);
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
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
                  alert('Message sent successfully!');
                  this.reset();
              } else {
                  throw new Error('Network response was not ok');
              }
          })
          .catch(error => {
              alert('There was a problem sending your message. Please try again later.');
              console.error('Error:', error);
          });
      });
  }
});




document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.navbar ul');
    
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.navbar ul li a').forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('show');
      });
    });
  });