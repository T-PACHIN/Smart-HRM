const root = document.documentElement;
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.textContent = navLinks.classList.contains('open') ? '×' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.textContent = '☰';
  }));
}

const savedTheme = localStorage.getItem('bombhr-theme');
if (savedTheme) root.dataset.theme = savedTheme;
if (themeToggle) themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('bombhr-theme', root.dataset.theme);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

if (navLinks && location.pathname.endsWith('index.html') || (navLinks && location.pathname.endsWith('/'))) {
  const sections = [...document.querySelectorAll('main section[id]')];
  const navItems = [...navLinks.querySelectorAll('a[href^="#"]')];
  window.addEventListener('scroll', () => {
    let current = 'home';
    sections.forEach(section => { if (window.scrollY >= section.offsetTop - 180) current = section.id; });
    navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  });
}

document.querySelectorAll('[data-modal-open]').forEach(btn => btn.addEventListener('click', () => {
  const modal = document.getElementById(btn.dataset.modalOpen);
  if (modal) { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
}));
document.querySelectorAll('[data-modal-close]').forEach(btn => btn.addEventListener('click', () => {
  const modal = btn.closest('.modal');
  if (modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
}));

const form = document.getElementById('demoForm');
const toast = document.getElementById('toast');
if (form && toast) form.addEventListener('submit', e => {
  e.preventDefault(); toast.classList.add('show'); form.reset();
  setTimeout(() => toast.classList.remove('show'), 3200);
});


const contactForm = document.getElementById('contactForm');
const contactToast = document.getElementById('contactToast');
if (contactForm && contactToast) contactForm.addEventListener('submit', e => {
  e.preventDefault();
  contactToast.classList.add('show');
  contactForm.reset();
  setTimeout(() => contactToast.classList.remove('show'), 3600);
});
