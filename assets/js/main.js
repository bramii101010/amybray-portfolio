/**
 * Amy Bray Portfolio - Professional JavaScript
 * Enhanced functionality for all pages
 */

(function() {
  'use strict';

  // ========== THEME MANAGEMENT ==========
  const root = document.documentElement;
  const toggleButton = document.getElementById('theme-toggle');
  
  const getPreferredTheme = () => {
    const stored = localStorage.getItem('amy-portfolio-theme');
    if (stored && ['light', 'dark'].includes(stored)) {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    // Add transition class for smooth theme switching
    root.classList.add('theme-transitioning');
    
    // Apply theme
    root.setAttribute('data-theme', theme);
    localStorage.setItem('amy-portfolio-theme', theme);

    // Update toggle button
    if (toggleButton) {
      toggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
      toggleButton.setAttribute('aria-label', 
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
      toggleButton.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
    }

    // Remove transition class after animation
    setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 300);
  };

  const toggleTheme = () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  // Initialize theme
  applyTheme(getPreferredTheme());

  // Bind theme toggle event
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleTheme);
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('amy-portfolio-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ========== NAVIGATION ENHANCEMENTS ==========
  const handleActiveStates = () => {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-btn');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.remove('active');
      
      // Check if current page matches this nav item
      if (href === currentPage || 
          (currentPage === '/' && href === '/') ||
          (currentPage.endsWith('/') && href === currentPage.slice(0, -1)) ||
          (currentPage.includes(href.replace('/', '')) && href !== '/')) {
        link.classList.add('active');
      }
    });
  };

  // Setup smooth scrolling for anchor links
  const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ========== ANIMATION UTILITIES ==========
  const setupScrollAnimations = () => {
    // Only add animations if user allows motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .featured-card, .stat-item').forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  };

  // ========== UTILITY FUNCTIONS ==========
  const updateCopyrightYear = () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  };

  const enhanceKeyboardNavigation = () => {
    // Add focus indicators for keyboard users
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  };

  // ========== HEADER SCROLL EFFECTS ==========
  const setupHeaderEffects = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(handleScroll);
    });
  };

  // ========== INITIALIZATION ==========
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    handleActiveStates();
    setupSmoothScrolling();
    setupScrollAnimations();
    updateCopyrightYear();
    enhanceKeyboardNavigation();
    setupHeaderEffects();
    
    // Performance logging (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log('🚀 Page Performance:', {
              'Load Time': `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`,
              'DOM Ready': `${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms`
            });
          }
        }, 0);
      });
    }
  });

  // Add CSS for animations
  const additionalStyles = `
    /* Theme transition */
    .theme-transitioning,
    .theme-transitioning * {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }

    /* Scroll animations */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    /* Stagger animation delays */
    .animate-on-scroll:nth-child(1) { transition-delay: 0ms; }
    .animate-on-scroll:nth-child(2) { transition-delay: 100ms; }
    .animate-on-scroll:nth-child(3) { transition-delay: 200ms; }
    .animate-on-scroll:nth-child(4) { transition-delay: 300ms; }

    /* Header scroll effects */
    .site-header.scrolled {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: var(--shadow-soft);
    }

    :root[data-theme="dark"] .site-header.scrolled {
      background: rgba(30, 41, 59, 0.98);
    }

    /* Keyboard navigation */
    .keyboard-navigation *:focus {
      outline: 2px solid var(--accent-primary) !important;
      outline-offset: 2px !important;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .animate-on-scroll {
        opacity: 1;
        transform: none;
        transition: none;
      }
      
      .accent-blob {
        animation: none !important;
      }
    }
  `;

  // Inject additional styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);

})();
