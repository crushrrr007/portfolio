/* ==================== CURSOR ==================== */
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--cx', e.clientX + 'px');
  document.body.style.setProperty('--cy', e.clientY + 'px');
});

/* ==================== NAV SCROLL ==================== */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ==================== HAMBURGER ==================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ==================== SCROLL REVEAL ==================== */
const reveals = document.querySelectorAll('.reveal, .section-label');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add reveal class to elements that should animate in
const revealTargets = [
  '.about-text', '.about-stats', '.stat-card',
  '.skill-group', '.project-card', '.edu-item',
  '.extra-card', '.contact-inner', '.contact-deco'
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = i * 80;
  });
});

reveals.forEach(el => observer.observe(el));
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ==================== ACTIVE NAV LINK ==================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--ink)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ==================== SKILL TAG HOVER RIPPLE ==================== */
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', () => {
    tag.style.transform = 'scale(0.95)';
    setTimeout(() => tag.style.transform = '', 150);
  });
});

/* ==================== TYPEWRITER EFFECT (hero eyebrow) ==================== */
const eyebrowText = document.querySelector('.hero-eyebrow span:last-child');
if (eyebrowText) {
  const original = eyebrowText.textContent;
  eyebrowText.textContent = '';
  let i = 0;
  const type = () => {
    if (i < original.length) {
      eyebrowText.textContent += original[i++];
      setTimeout(type, 40);
    }
  };
  setTimeout(type, 600);
}

/* ==================== STAGGER PROJECT CARDS ==================== */
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

/* ==================== SMOOTH SCROLL OFFSET (for fixed nav) ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
