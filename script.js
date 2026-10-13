/**
 * ADITYA AHIR - PORTFOLIO INTERACTIVITY SCRIPT
 * Vanilla JavaScript (Zero external dependencies, local-first compatible)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Dark / Light Theme Toggle
  initThemeToggle();

  // 3. Typing Effect in Hero
  initTypingEffect();

  // 4. Mobile Navigation Drawer
  initMobileNav();

  // 5. ScrollSpy & Active Navigation
  initScrollSpy();

  // 6. Git Clone Command Copying
  initGitCloneCopy();

  // 7. Clipboard Copy for Email
  initEmailCopy();

  // 8. Contact Form Handling
  initContactForm();

  // 9. Back to Top Button
  initBackToTop();
});

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const rootHtml = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('aditya_portfolio_theme') || 'dark';
  rootHtml.setAttribute('data-theme', savedTheme);

  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const currentTheme = rootHtml.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    rootHtml.setAttribute('data-theme', newTheme);
    localStorage.setItem('aditya_portfolio_theme', newTheme);
  });
}

/* ==========================================================================
   TYPING ANIMATION
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const phrases = [
    'Semiconductor & Chip Design',
    'VLSI & Digital Electronics',
    'Embedded Systems & Microcontrollers',
    'Computer Architecture',
    'Gen AI & Real-World Problem Solving'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 70;
  const deletingSpeed = 40;
  const pauseEnd = 1600;
  const pauseStart = 400;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      typingElement.textContent = currentPhrase.substring(0, charIndex);
    } else {
      charIndex++;
      typingElement.textContent = currentPhrase.substring(0, charIndex);
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = pauseStart;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 500);
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  };

  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside of menu
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   SCROLLSPY & ACTIVE NAVIGATION
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 130;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ==========================================================================
   GIT CLONE COMMAND CLIPBOARD COPY
   ========================================================================== */
function initGitCloneCopy() {
  const cloneBtn = document.getElementById('copyCloneBtn');
  const cloneBtnText = document.getElementById('cloneBtnText');
  const cloneCmd = 'git clone https://github.com/adityaahir3/ECE-FIRST-YEAR.git';

  if (!cloneBtn || !cloneBtnText) return;

  cloneBtn.addEventListener('click', () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cloneCmd).then(() => {
        showCloneFeedback();
      }).catch(() => {
        fallbackCopyText(cloneCmd, showCloneFeedback);
      });
    } else {
      fallbackCopyText(cloneCmd, showCloneFeedback);
    }
  });

  function showCloneFeedback() {
    cloneBtnText.textContent = '✓ Copied!';
    setTimeout(() => {
      cloneBtnText.textContent = 'Copy';
    }, 2200);
  }
}

/* ==========================================================================
   CLIPBOARD COPY FOR EMAIL
   ========================================================================== */
function initEmailCopy() {
  const emailText = 'Adityayadav823862@gmail.com';
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const quickCopyBtn = document.getElementById('copyEmailQuickBtn');

  function copyAction(buttonElement, labelElement) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailText).then(() => {
        notifyCopied(buttonElement, labelElement);
      }).catch(() => {
        fallbackCopyText(emailText, () => notifyCopied(buttonElement, labelElement));
      });
    } else {
      fallbackCopyText(emailText, () => notifyCopied(buttonElement, labelElement));
    }
  }

  function notifyCopied(buttonElement, labelElement) {
    if (labelElement) {
      const originalText = labelElement.textContent;
      labelElement.textContent = '✓ Copied to Clipboard!';
      setTimeout(() => {
        labelElement.textContent = originalText;
      }, 2500);
    } else if (buttonElement) {
      const originalText = buttonElement.textContent;
      buttonElement.textContent = '✓ Copied!';
      setTimeout(() => {
        buttonElement.textContent = originalText;
      }, 2500);
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => copyAction(copyBtn, copyBtnText));
  }

  if (quickCopyBtn) {
    quickCopyBtn.addEventListener('click', () => copyAction(quickCopyBtn, null));
  }
}

function fallbackCopyText(text, callback) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    if (callback) callback();
  } catch (err) {
    alert(`Copied: ${text}`);
  }
  document.body.removeChild(tempInput);
}

/* ==========================================================================
   CONTACT FORM SUBMISSION & VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form || !feedback) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const subjectInput = document.getElementById('messageSubject');
  const messageInput = document.getElementById('senderMessage');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
    }

    // Validate Email
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      subjectInput.classList.add('is-invalid');
      isValid = false;
    } else {
      subjectInput.classList.remove('is-invalid');
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageInput.classList.add('is-invalid');
      isValid = false;
    } else {
      messageInput.classList.remove('is-invalid');
    }

    if (!isValid) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please check the highlighted fields above.';
      return;
    }

    // Success State
    feedback.className = 'form-feedback success';
    feedback.innerHTML = `
      <strong>Message ready!</strong> Thank you, ${escapeHtml(nameInput.value.trim())}. 
      <br>Opening your email client to send to <em>Adityayadav823862@gmail.com</em>...
    `;

    // Construct mailto link as direct communication fallback
    const mailtoUrl = `mailto:Adityayadav823862@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent("From: " + nameInput.value.trim() + " (" + emailInput.value.trim() + ")\n\n" + messageInput.value.trim())}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1200);

    form.reset();
  });

  // Realtime cleanup of error states upon typing
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        input.classList.remove('is-invalid');
      }
    });
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ==========================================================================
   BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
