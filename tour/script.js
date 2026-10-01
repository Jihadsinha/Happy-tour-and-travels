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

// Tab switching
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
}));

// Search form validation and submission
document.querySelector('#searchForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const destination = document.querySelector('#destination').value.trim();
  const travelDate = document.querySelector('#travelDate').value;
  const travelers = document.querySelector('#travelers').value;
  const type = document.querySelector('.tab.active').textContent;
  const msg = document.querySelector('#searchMessage');

  // Validation
  if (!destination || !travelDate || !travelers) {
    msg.textContent = '❌ Please fill in all fields to search.';
    msg.style.color = '#d32f2f';
    return;
  }

  // Success message
  msg.textContent = `✓ Searching ${type.toLowerCase()} options for ${destination} on ${travelDate}...`;
  msg.style.color = '#07864d';
  
  // Here you would typically send this to a backend API
  console.log({
    destination,
    travelDate,
    travelers,
    type,
    timestamp: new Date().toISOString()
  });

  // Clear after 3 seconds
  setTimeout(() => {
    msg.textContent = '';
  }, 3000);
});

// Contact form validation and submission
document.querySelector('#contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#contactName').value.trim();
  const email = document.querySelector('#contactEmail').value.trim();
  const phone = document.querySelector('#contactPhone').value.trim();
  const destination = document.querySelector('#contactDestination').value.trim();
  const message = document.querySelector('#contactMessage').value.trim();
  const formMessage = document.querySelector('#formMessage');

  // Validation
  if (!name || !email || !message) {
    formMessage.textContent = '❌ Please fill in all required fields.';
    formMessage.style.color = '#d32f2f';
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.textContent = '❌ Please enter a valid email address.';
    formMessage.style.color = '#d32f2f';
    return;
  }

  // Success
  formMessage.textContent = '✓ Thank you! Your enquiry has been received. We\'ll contact you soon!';
  formMessage.style.color = '#07864d';

  console.log({
    name,
    email,
    phone,
    destination,
    message,
    timestamp: new Date().toISOString()
  });

  // Reset form after 3 seconds
  setTimeout(() => {
    document.querySelector('#contactForm').reset();
    formMessage.textContent = '';
  }, 3000);
});