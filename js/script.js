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

// Dynamically center page content if there's enough vertical space
const header = document.querySelector('header');
function updateDynamicCentering() {
	pages.forEach(page => {
		const content = page.querySelector('.page-content');
		if (!content) return;
		const headerHeight = header ? header.offsetHeight : 0;
		const available = window.innerHeight - headerHeight - 40; // buffer
		if (content.scrollHeight < available) {
			page.classList.add('centered');
		} else {
			page.classList.remove('centered');
		}
	});
}

// Update centering when the window resizes and after navigation
window.addEventListener('resize', updateDynamicCentering);

const originalShowPage = showPage;
function showPageAndUpdate(pageId) {
	originalShowPage(pageId);
	// Delay to allow layout to settle
	setTimeout(updateDynamicCentering, 50);
}

// Replace usage of showPage with showPageAndUpdate where appropriate

// Navigation link click handling
navLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const pageId = link.getAttribute('data-page');
		showPageAndUpdate(pageId);

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
		showPageAndUpdate('contact');
		if (navLinksMenu) navLinksMenu.classList.remove('active');
		if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
	});
}

// Initialize - show home page
showPageAndUpdate('home');
// Initial centering pass
updateDynamicCentering();