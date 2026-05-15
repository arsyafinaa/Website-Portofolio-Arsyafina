/* script.js — Arsyafina Portfolio*/

document.addEventListener('DOMContentLoaded', () => {

  /*
     1. AOS (Animate On Scroll) – initialization
*/
  AOS.init({
    duration: 750,       // animation duration in ms
    easing: 'ease-out-cubic',
    once: true,          // animate only once
    offset: 80,          // trigger 80px before element enters viewport
  });


  /*
     2. THEME TOGGLE
     Toggle between 'blue' and 'brown' themes.
     Theme is stored in localStorage so it persists.
 */
  const htmlEl       = document.documentElement;  // <html> element
  const themeBtn     = document.getElementById('themeToggleBtn');
  const themeIcon    = document.getElementById('themeIcon');

  // Load saved theme or default to 'blue'
  const savedTheme = localStorage.getItem('arsyafina-theme') || 'blue';
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next    = current === 'blue' ? 'brown' : 'blue';
    applyTheme(next);
    localStorage.setItem('arsyafina-theme', next);
  });

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (theme === 'brown') {
      themeIcon.className = 'bi bi-sun-fill';        // show sun icon on brown theme
    } else {
      themeIcon.className = 'bi bi-moon-stars-fill'; // show moon icon on blue theme
    }
  }


  /* 3. NAVBAR — scroll effect (adds .scrolled class)*/
  const navbar = document.getElementById('mainNavbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // run on load in case page is already scrolled


  /*4. NAVBAR — active link highlighting on scroll*/
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');

  function highlightActiveNav() {
    let scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);


  /*5. NAVBAR — close mobile menu on link click*/
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = document.getElementById('navMenu');
      const collapseInstance = bootstrap.Collapse.getInstance(bsCollapse);
      if (collapseInstance) collapseInstance.hide();
    });
  });


  /*
     6. SKILL BARS — animate width on scroll into view
     Uses IntersectionObserver for performance.
*/
const skillBars = document.querySelectorAll('.skill-progress-fill');

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{

    if(entry.isIntersecting){

      const bar = entry.target;
      const width = bar.getAttribute('data-width');

      bar.style.width = width + '%';

      observer.unobserve(bar);

    }

  });
},{ threshold: 0.3 });

skillBars.forEach(bar=>{
  observer.observe(bar);
});

  /*7. BACK TO TOP BUTTON — show/hide on scroll*/
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });


  /*8. CONTACT FORM — send button click feedback*/
  const sendBtn = document.getElementById('contact-form-submit-btn');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const nameInput  = document.querySelector('#contact-form-name-field input');
      const emailInput = document.querySelector('#contact-form-email-field input');
      const msgInput   = document.querySelector('#contact-form-message-field textarea');

      // Basic validation
      if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
        sendBtn.textContent = '⚠ Please fill all fields!';
        sendBtn.style.background = '#e53935';
        setTimeout(() => {
          sendBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Message';
          sendBtn.style.background = '';
        }, 2500);
        return;
      }

      // Success feedback
      sendBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Message Sent!';
      sendBtn.style.background = '#43a047';
      nameInput.value  = '';
      emailInput.value = '';
      msgInput.value   = '';

      setTimeout(() => {
        sendBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Message';
        sendBtn.style.background = '';
      }, 3000);
    });
  }


  /*9. SKILL CARDS — tilt/hover 3D effect*/
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left - rect.width / 2;
      const y      = e.clientY - rect.top  - rect.height / 2;
      const rotateX = -(y / rect.height) * 14;
      const rotateY =  (x / rect.width)  * 14;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /*10. PROJECT CARDS — 3D tilt on hover*/
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left - rect.width / 2;
      const y      = e.clientY - rect.top  - rect.height / 2;
      const rotateX = -(y / rect.height) * 8;
      const rotateY =  (x / rect.width)  * 8;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /*11. TYPEWRITER EFFECT — Hero title accent line*/
  const titleAccent = document.querySelector('.hero-title-accent');
  if (titleAccent) {
    const text = titleAccent.textContent;
    titleAccent.textContent = '';
    let i = 0;
    const typeTimer = setInterval(() => {
      titleAccent.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(typeTimer);
    }, 120);
  }


  /*12. SMOOTH PAGE ENTRY — staggered hero content
*/
  const heroItems = document.querySelectorAll('[data-aos]');
  // AOS handles this; nothing extra needed here.

}); // end DOMContentLoaded
