const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

const setMenuState = (isOpen) => {
  nav?.classList.toggle('open', isOpen);
  menuToggle?.setAttribute('aria-expanded', String(isOpen));
  menuToggle?.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
};

const closeMenu = () => setMenuState(false);

const toggleMenu = () => {
  if (!nav) return;
  const isOpen = !nav.classList.contains('open');
  setMenuState(isOpen);
};

menuToggle?.addEventListener('click', toggleMenu);
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('click', (event) => {
  const clickedInsideNav = nav?.contains(event.target);
  const clickedToggle = menuToggle?.contains(event.target);
  if (nav && !clickedInsideNav && !clickedToggle && nav.classList.contains('open')) {
    closeMenu();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
}));

document.querySelector('#searchForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const destination = document.querySelector('#destination').value.trim();
  const type = document.querySelector('.tab.active').textContent;
  const msg = document.querySelector('#searchMessage');
  msg.textContent = destination
    ? `Searching ${type.toLowerCase()} options for ${destination}...`
    : `Please enter a destination to search ${type.toLowerCase()} options.`;
});

document.querySelector('#contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('#contactMessage').textContent =
    'Thank you! Your enquiry form is ready to connect to your email/CRM.';
});
