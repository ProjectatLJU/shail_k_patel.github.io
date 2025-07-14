// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navigation active state
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile nav when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate skill progress bars
      if (entry.target.classList.contains('skills-section')) {
        animateSkillBars();
      }
      
      // Animate project cards with stagger
      if (entry.target.classList.contains('projects-section')) {
        const cards = entry.target.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 150);
        });
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .skills-section, .projects-section, .education-section, .contact-section').forEach(el => {
  observer.observe(el);
});

// Add animation classes to elements
function addAnimationClasses() {
  // Hero elements
  document.querySelector('.hero-text')?.classList.add('slide-in-left');
  document.querySelector('.hero-image')?.classList.add('slide-in-right');
  
  // Project cards
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.classList.add('fade-in');
  });
  
  // Skill categories
  document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.classList.add('scale-in');
  });
  
  // Education elements
  document.querySelector('.education-card')?.classList.add('fade-in');
  document.querySelector('.semester-tabs')?.classList.add('fade-in');
  
  // Contact elements
  document.querySelector('.contact-info')?.classList.add('slide-in-left');
  document.querySelector('.contact-cta')?.classList.add('slide-in-right');
  
  // Section headers
  document.querySelectorAll('.section-header').forEach(header => {
    header.classList.add('fade-in');
  });
}

// Animate skill progress bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    setTimeout(() => {
      bar.style.width = `${progress}%`;
    }, 200);
  });
}

// Education semester tabs
function initEducationTabs() {
  const tabButtons = document.querySelectorAll('.tab-button:not(.disabled)');
  const tabContents = document.querySelectorAll('.semester-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const semester = button.getAttribute('data-semester');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.querySelector(`[data-semester="${semester}"].semester-content`)?.classList.add('active');
    });
  });
}

// Parallax effect for floating shapes
function initParallax() {
  const shapes = document.querySelectorAll('.shape');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.1;
      shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * speed * 0.1}deg)`;
    });
  });
}

// Navbar background on scroll
function initNavbarScroll() {
  const navbar = document.querySelector('.nav-container');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.backdropFilter = 'blur(20px)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(20px)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// Project card hover effects
function initProjectHovers() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Button ripple effect
function initButtonRipples() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Typing animation for hero subtitle
function initTypingAnimation() {
  const subtitle = document.querySelector('.subtitle-text');
  if (!subtitle) return;
  
  const text = subtitle.textContent;
  subtitle.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  setTimeout(typeWriter, 1000);
}

// Email functionality
function tryMailto(mailtoUrl) {
  const emailWindow = window.open(mailtoUrl, "_blank");
  setTimeout(() => {
    if (!emailWindow || emailWindow.closed || typeof emailWindow.closed === "undefined") {
      const params = mailtoUrl.split("?")[1];
      const subject = params?.match(/subject=([^&]*)/)?.[1] || "";
      const body = params?.match(/body=([^&]*)/)?.[1] || "";
      const to = mailtoUrl.split("?")[0].replace("mailto:", "");
      window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    } else {
      emailWindow.close();
    }
  }, 500);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  addAnimationClasses();
  initEducationTabs();
  initParallax();
  initNavbarScroll();
  initProjectHovers();
  initButtonRipples();
  initTypingAnimation();
  
  // Set default active tab
  document.querySelector('.tab-button[data-semester="1"]')?.click();
});

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      flex-direction: column;
      padding: 2rem;
      gap: 1rem;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .nav-links.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .nav-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
`;
document.head.appendChild(style);