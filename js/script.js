// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    menuToggle.textContent = isActive ? '✕' : '☰';
  });

  // Close mobile menu when any anchor link is clicked
  navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

// ===== Scroll-spy: highlight active nav link =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0,
});

sections.forEach(section => observer.observe(section));

// ===== Profile photo fallback =====
const profileImg = document.querySelector('.hero-photo img');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    const photoCol = profileImg.closest('.hero-photo');
    if (photoCol) photoCol.style.display = 'none';
  });
}
