// Page Navigation
const navLinks = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.page');
const menuToggle = document.getElementById('menu-toggle');
const navLinksMenu = document.getElementById('nav-links');
const contactBtn = document.getElementById('contact-btn');

function hideAllPages() {
	pages.forEach(page => page.classList.remove('active'));
}

function showPage(pageId) {
	hideAllPages();
	const page = document.getElementById(pageId);
	if (page) {
		page.classList.add('active');
		page.setAttribute('tabindex', '-1');
		page.focus();
	}
}

// Navigation link click handling
navLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const pageId = link.getAttribute('data-page');
		showPage(pageId);

		// Close mobile menu when a link is clicked
		if (navLinksMenu) navLinksMenu.classList.remove('active');
		if (menuToggle) {
			menuToggle.textContent = '☰';
			menuToggle.setAttribute('aria-expanded', 'false');
		}
	});
});

// Hamburger menu toggle
if (menuToggle && navLinksMenu) {
	menuToggle.setAttribute('aria-expanded', 'false');
	menuToggle.addEventListener('click', () => {
		navLinksMenu.classList.toggle('active');
		const expanded = navLinksMenu.classList.contains('active');
		menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
		menuToggle.textContent = expanded ? '✕' : '☰';
	});
}

// Contact button - navigate to contact page
if (contactBtn) {
	contactBtn.addEventListener('click', () => {
		showPage('contact');
		if (navLinksMenu) navLinksMenu.classList.remove('active');
		if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
	});
}

// Initialize - show home page
showPage('home');