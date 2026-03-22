# Portfolio Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert a 4-page HTML/CSS/JS portfolio into a polished single-page scroll site optimised for software engineering job applications.

**Architecture:** One `index.html` with six anchor-linked sections (Hero → About → Skills → Projects → Contact). Navbar uses IntersectionObserver scroll-spy. No build tooling — vanilla HTML/CSS/JS, deployable directly on GitHub Pages.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript (ES6+), Google Fonts (Poppins)

**Spec:** `docs/superpowers/specs/2026-03-22-portfolio-improvements-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `index.html` | Rewrite | Single-page structure: all 6 sections |
| `css/styles.css` | Rewrite | All layout, component, and responsive styles |
| `js/script.js` | Rewrite | Scroll-spy, smooth scroll, mobile menu |
| `about.html` | Delete | Merged into `index.html` |
| `projects.html` | Delete | Merged into `index.html` |
| `contact.html` | Delete | Merged into `index.html` |
| `assets/images/` | Keep | User drops `profile.jpg` here |
| `assets/resume.pdf` | Keep | User drops CV here |

---

## Task 1: Scaffold `index.html`

Build the full HTML skeleton with all sections, correct IDs, and both asset links. No visual content yet — just structure.

**Files:**
- Rewrite: `index.html`

- [ ] **Step 1: Replace `index.html` with the single-page skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ben van der Westhuizen | Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <nav class="navbar">
      <span class="logo">BvdW</span>
      <button class="menu-toggle" id="menu-toggle" aria-controls="nav-links" aria-expanded="false" aria-label="Toggle navigation">☰</button>
      <ul class="nav-links" id="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="assets/resume.pdf" class="nav-resume" target="_blank" download>Resume</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="hero"><!-- Hero content --></section>
    <section id="about"><!-- About content --></section>
    <section id="skills"><!-- Skills content --></section>
    <section id="projects"><!-- Projects content --></section>
    <section id="contact"><!-- Contact content --></section>
  </main>

  <script src="js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `index.html` in a browser and verify** the page loads without errors (blank page with just the navbar shell is expected). Check the browser console for no errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: scaffold single-page index.html with section anchors"
```

---

## Task 2: Navbar — HTML + CSS

Style the sticky navbar with anchor links, scroll-spy-ready structure, and a distinct Resume button.

**Files:**
- Modify: `index.html` (navbar already in place from Task 1)
- Rewrite: `css/styles.css` — base reset + navbar styles only

- [ ] **Step 1: Replace `css/styles.css` with base reset and navbar styles**

```css
/* ===== CSS Custom Properties ===== */
:root {
  --bg:           #0a192f;
  --bg-light:     #112240;
  --text:         #ccd6f6;
  --text-muted:   #8892b0;
  --accent:       #64ffda;
  --card:         #112240;
  --header-height: 70px;
  --max-width:    1000px;
}

/* ===== Reset ===== */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
  font-size: 16px;
}

a {
  text-decoration: none;
  color: inherit;
}

/* ===== Navbar ===== */
header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 0 2.5rem;
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--bg-light);
}

.logo {
  color: var(--accent);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--accent);
}

.nav-resume {
  padding: 0.45rem 1.1rem;
  border: 1px solid var(--accent);
  border-radius: 4px;
  color: var(--accent) !important;
  font-size: 0.85rem;
  transition: background-color 0.2s ease, color 0.2s ease !important;
}

.nav-resume:hover {
  background-color: rgba(100, 255, 218, 0.1);
}

/* ===== Mobile menu toggle ===== */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.6rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.menu-toggle:hover {
  color: var(--accent);
}

/* ===== Section base ===== */
section {
  padding: 6rem 2rem;
}

.section-inner {
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;
}

.section-title::after {
  content: '';
  display: block;
  height: 1px;
  background: var(--bg-light);
  flex: 1;
}

.section-title span {
  color: var(--accent);
  font-size: 1rem;
  font-weight: 400;
  font-family: monospace;
}

/* ===== Mobile: Navbar ===== */
@media (max-width: 768px) {
  .navbar {
    padding: 0 1.5rem;
    position: relative;
  }

  .menu-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    background-color: var(--bg-light);
    border-top: 1px solid var(--bg);
    padding: 0.5rem 0;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links li {
    width: 100%;
    padding: 0.9rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .nav-links li:last-child {
    border-bottom: none;
  }

  .nav-resume {
    border: none !important;
    padding: 0 !important;
  }
}
```

- [ ] **Step 2: Open in browser and verify** the navbar is sticky, blurred, has correct links, and the Resume button has a cyan outline. Resize to mobile width and confirm the hamburger icon appears.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add navbar styles with anchor links and resume button"
```

---

## Task 3: Hero Section — HTML + CSS

Build the two-column hero with name, subtitle, tagline, CTAs, social links, and profile photo.

**Files:**
- Modify: `index.html` — replace `<section id="hero">` comment with full content
- Modify: `css/styles.css` — append hero styles

- [ ] **Step 1: Replace the hero section comment in `index.html`**

```html
<section id="hero">
  <div class="hero-inner">
    <div class="hero-text">
      <p class="hero-greeting">Hi, my name is</p>
      <h1 class="hero-name">Ben van der Westhuizen</h1>
      <h2 class="hero-subtitle">Third-year Computer Science Student · Stellenbosch University</h2>
      <p class="hero-tagline">I build compilers, backends, and everything in between.</p>
      <div class="hero-ctas">
        <a href="#projects" class="btn-primary">View My Work</a>
        <a href="assets/resume.pdf" class="btn-outline" target="_blank" download>Resume ↓</a>
      </div>
      <div class="hero-socials">
        <a href="https://github.com/BenFransvdW" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/ben-van-f-der-westhuizen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="mailto:benvdwest7@gmail.com" aria-label="Email">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>
    </div>
    <div class="hero-photo">
      <img src="assets/images/profile.jpg" alt="Ben van der Westhuizen" onerror="this.parentElement.style.display='none'">
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append hero CSS to `css/styles.css`**

```css
/* ===== Hero ===== */
#hero {
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  padding: 4rem 2rem;
}

.hero-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  width: 100%;
}

.hero-text {
  flex: 1;
}

.hero-greeting {
  color: var(--accent);
  font-family: monospace;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.hero-name {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--text);
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.hero-tagline {
  color: var(--text-muted);
  font-size: 1rem;
  max-width: 480px;
  margin-bottom: 2rem;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.btn-primary {
  padding: 0.75rem 1.75rem;
  border-radius: 4px;
  background-color: var(--accent);
  color: var(--bg);
  font-weight: 700;
  font-size: 0.9rem;
  transition: opacity 0.2s ease;
  cursor: pointer;
  border: none;
}

.btn-primary:hover {
  opacity: 0.85;
}

.btn-outline {
  padding: 0.75rem 1.75rem;
  border-radius: 4px;
  border: 1px solid var(--accent);
  color: var(--accent);
  font-weight: 600;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.btn-outline:hover {
  background-color: rgba(100, 255, 218, 0.1);
}

.hero-socials {
  display: flex;
  gap: 1.25rem;
  align-items: center;
}

.hero-socials a {
  color: var(--text-muted);
  transition: color 0.2s ease, transform 0.2s ease;
  display: flex;
}

.hero-socials a:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

.hero-photo {
  flex-shrink: 0;
}

.hero-photo img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent);
  box-shadow: 0 0 0 6px rgba(100, 255, 218, 0.08);
}

/* ===== Mobile: Hero ===== */
@media (max-width: 768px) {
  #hero {
    padding: 3rem 1.5rem;
  }

  .hero-inner {
    flex-direction: column-reverse;
    gap: 2rem;
    text-align: center;
  }

  .hero-tagline {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-ctas {
    justify-content: center;
  }

  .hero-socials {
    justify-content: center;
  }

  .hero-photo img {
    width: 140px;
    height: 140px;
  }
}
```

- [ ] **Step 3: Open in browser and verify** the hero renders with name, subtitle, tagline, two buttons, social icons, and the photo circle (the image will be broken until you add `profile.jpg` — that's expected; confirm the right column disappears cleanly via the `onerror` handler).

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add hero section with photo, CTAs, and social links"
```

---

## Task 4: About + Skills Sections — HTML + CSS

**Files:**
- Modify: `index.html` — replace `#about` and `#skills` section comments
- Modify: `css/styles.css` — append about and skills styles

- [ ] **Step 1: Replace the about section comment in `index.html`**

```html
<section id="about">
  <div class="section-inner">
    <h2 class="section-title"><span>01.</span> About Me</h2>
    <div class="about-grid">
      <div class="about-bio">
        <p>I'm a third-year Computer Science student at Stellenbosch University with a passion for building things — from low-level compiler pipelines to self-hosted infrastructure. I enjoy working across the full stack, with a particular interest in backend engineering, systems programming, and algorithm design.</p>
        <p>Outside of coursework, I run a homelab on a Raspberry Pi 5, experiment with Docker-based services, and enjoy tackling problems that sit at the intersection of theory and practice.</p>
      </div>
      <ul class="about-facts">
        <li><span>University</span>Stellenbosch University</li>
        <li><span>Year</span>Third-year (2026)</li>
        <li><span>Location</span>Stellenbosch, South Africa</li>
        <li><span>Interests</span>Compilers · Backend · Homelabbing</li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace the skills section comment in `index.html`**

```html
<section id="skills">
  <div class="section-inner">
    <h2 class="section-title"><span>02.</span> What I Work With</h2>
    <div class="skills-grid">
      <div class="skill-group">
        <h3>Languages</h3>
        <ul>
          <li>Java</li>
          <li>Python</li>
          <li>C</li>
          <li>JavaScript</li>
          <li>SQL</li>
          <li>x86 NASM Assembly</li>
        </ul>
      </div>
      <div class="skill-group">
        <h3>Web &amp; Tools</h3>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>Git &amp; GitHub</li>
          <li>Docker</li>
          <li>Tailscale</li>
        </ul>
      </div>
      <div class="skill-group">
        <h3>Concepts</h3>
        <ul>
          <li>OOP</li>
          <li>Compiler Construction</li>
          <li>Algorithm Design</li>
          <li>Data Analysis</li>
          <li>Automation</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Append about and skills CSS to `css/styles.css`**

```css
/* ===== About ===== */
.about-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 3rem;
  align-items: start;
}

.about-bio p {
  color: var(--text-muted);
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.about-facts {
  list-style: none;
  background-color: var(--bg-light);
  border-radius: 8px;
  padding: 1.5rem;
}

.about-facts li {
  display: flex;
  flex-direction: column;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.88rem;
  color: var(--text);
}

.about-facts li:last-child {
  border-bottom: none;
}

.about-facts li span {
  color: var(--accent);
  font-size: 0.7rem;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2px;
}

/* ===== Skills ===== */
#skills {
  background-color: var(--bg-light);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.skill-group h3 {
  color: var(--accent);
  font-size: 0.85rem;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.skill-group ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-group li {
  background-color: var(--bg);
  color: var(--accent);
  font-size: 0.78rem;
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  border: 1px solid rgba(100, 255, 218, 0.2);
}

/* ===== Mobile: About + Skills ===== */
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  section {
    padding: 4rem 1.5rem;
  }
}
```

- [ ] **Step 4: Verify in browser** — About section shows bio left and facts card right. Skills section has three columns of pill badges on a slightly lighter background. Both collapse to single column on mobile.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add about and skills sections"
```

---

## Task 5: Projects Section — HTML + CSS

**Files:**
- Modify: `index.html` — replace `#projects` section comment
- Modify: `css/styles.css` — append project card styles

- [ ] **Step 1: Replace the projects section comment in `index.html`**

```html
<section id="projects">
  <div class="section-inner">
    <h2 class="section-title"><span>03.</span> Things I've Built</h2>
    <div class="projects-grid">

      <!-- WISTL Compiler -->
      <div class="project-card">
        <div class="project-card-header">
          <h3>WISTL Compiler</h3>
          <span class="badge-featured">Featured</span>
        </div>
        <p>A full compilation pipeline for the WISTL teaching language — lexer, parser, semantic analyser, and JVM bytecode generator built in C.</p>
        <div class="project-tags">
          <span>C</span>
          <span>JVM Bytecode</span>
          <span>Compiler Design</span>
        </div>
        <div class="project-links">
          <!-- <a href="YOUR_REPO_URL" target="_blank" rel="noopener noreferrer">GitHub ↗</a> -->
        </div>
      </div>

      <!-- Homelab -->
      <div class="project-card">
        <div class="project-card-header">
          <h3>Homelab</h3>
          <span class="badge-featured">Featured</span>
        </div>
        <p>Self-hosted infrastructure on a Raspberry Pi 5 — Pi-hole for DNS ad-blocking, Audiobookshelf, Plex media server, and Tailscale VPN for secure remote access.</p>
        <div class="project-tags">
          <span>Raspberry Pi</span>
          <span>Docker</span>
          <span>Linux</span>
          <span>Tailscale</span>
        </div>
        <div class="project-links">
          <!-- No public repo -->
        </div>
      </div>

      <!-- Statera -->
      <div class="project-card">
        <div class="project-card-header">
          <h3>Statera</h3>
        </div>
        <p>Java desktop application for work-life balance featuring a Focus Mode and a workaholic filter to enforce healthy work patterns.</p>
        <div class="project-tags">
          <span>Java</span>
          <span>OOP</span>
          <span>Desktop UI</span>
        </div>
        <div class="project-links">
          <!-- <a href="YOUR_REPO_URL" target="_blank" rel="noopener noreferrer">GitHub ↗</a> -->
        </div>
      </div>

      <!-- DNA Analysis -->
      <div class="project-card">
        <div class="project-card-header">
          <h3>Quasi-Palindromic DNA Analysis Utility</h3>
        </div>
        <p>Analyses DNA sequences to detect quasi-palindromic patterns, supporting bioinformatics research workflows.</p>
        <div class="project-tags">
          <span>Java</span>
          <span>Algorithm Design</span>
        </div>
        <div class="project-links">
          <!-- <a href="YOUR_REPO_URL" target="_blank" rel="noopener noreferrer">GitHub ↗</a> -->
        </div>
      </div>

      <!-- Python Board Game -->
      <div class="project-card">
        <div class="project-card-header">
          <h3>Python Board Game</h3>
        </div>
        <p>Two-player command-line board game with full turn management, input validation, and win detection.</p>
        <div class="project-tags">
          <span>Python</span>
        </div>
        <div class="project-links">
          <!-- <a href="YOUR_REPO_URL" target="_blank" rel="noopener noreferrer">GitHub ↗</a> -->
        </div>
      </div>

      <!-- Personal Website -->
      <div class="project-card">
        <div class="project-card-header">
          <h3>Personal Website</h3>
        </div>
        <p>This portfolio — a responsive single-page site built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step.</p>
        <div class="project-tags">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
        </div>
        <div class="project-links">
          <a href="https://github.com/BenFransvdW/BenFransvdW.github.io" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </div>

    </div>
  </div>
</section>
```

> **Note:** GitHub repo URLs are left commented out. To activate a link, remove the comment markers around the `<a>` tag and replace `YOUR_REPO_URL` with the actual URL.

- [ ] **Step 2: Append project card CSS to `css/styles.css`**

```css
/* ===== Projects ===== */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.project-card {
  background-color: var(--card);
  border-radius: 8px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(100, 255, 218, 0.08);
}

.project-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.project-card-header h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
}

.badge-featured {
  font-size: 0.65rem;
  font-family: monospace;
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  background-color: rgba(100, 255, 218, 0.1);
  color: var(--accent);
  border: 1px solid rgba(100, 255, 218, 0.3);
  white-space: nowrap;
}

.project-card p {
  color: var(--text-muted);
  font-size: 0.88rem;
  line-height: 1.6;
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.project-tags span {
  background-color: var(--bg);
  color: var(--accent);
  font-size: 0.72rem;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  border: 1px solid rgba(100, 255, 218, 0.15);
}

.project-links {
  display: flex;
  gap: 1rem;
  min-height: 1.2rem;
}

.project-links a {
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.project-links a:hover {
  opacity: 0.7;
}

/* ===== Mobile: Projects ===== */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify in browser** — 2-column card grid with Featured badges on first two cards, pill tags, and the Personal Website card showing a GitHub link. Cards lift on hover.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add projects section with 2-col card grid and tech tags"
```

---

## Task 6: Contact Section — HTML + CSS

**Files:**
- Modify: `index.html` — replace `#contact` section comment
- Modify: `css/styles.css` — append contact styles

- [ ] **Step 1: Replace the contact section comment in `index.html`**

```html
<section id="contact">
  <div class="section-inner contact-inner">
    <h2 class="section-title"><span>04.</span> Get In Touch</h2>
    <p class="contact-intro">I'm currently open to internship and graduate opportunities. Whether you have a question or just want to say hi, my inbox is always open.</p>
    <div class="contact-links">
      <a href="mailto:benvdwest7@gmail.com" class="contact-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        benvdwest7@gmail.com
      </a>
      <a href="https://github.com/BenFransvdW" target="_blank" rel="noopener noreferrer" class="contact-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        github.com/BenFransvdW
      </a>
      <a href="https://www.linkedin.com/in/ben-van-f-der-westhuizen/" target="_blank" rel="noopener noreferrer" class="contact-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        linkedin.com/in/ben-van-f-der-westhuizen
      </a>
    </div>
    <a href="assets/resume.pdf" class="btn-outline" target="_blank" download style="margin-top: 2.5rem; display: inline-block;">Download Resume ↓</a>
  </div>
</section>
```

- [ ] **Step 2: Append contact CSS to `css/styles.css`**

```css
/* ===== Contact ===== */
#contact {
  background-color: var(--bg-light);
}

.contact-inner {
  text-align: center;
}

.contact-inner .section-title {
  justify-content: center;
}

.contact-inner .section-title::after {
  display: none;
}

.contact-intro {
  color: var(--text-muted);
  font-size: 0.95rem;
  max-width: 520px;
  margin: 0 auto 2.5rem;
}

.contact-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text);
  font-size: 0.95rem;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: 1px solid var(--bg);
  background-color: var(--bg);
  transition: border-color 0.2s ease, color 0.2s ease;
  width: 100%;
  max-width: 360px;
}

.contact-link svg {
  color: var(--accent);
  flex-shrink: 0;
}

.contact-link:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

- [ ] **Step 3: Verify in browser** — Contact section shows intro paragraph, three clickable contact items with icons, and a Resume download button. Everything is centered.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add contact section with email, GitHub, LinkedIn, and resume link"
```

---

## Task 7: JavaScript — Scroll-Spy, Smooth Scroll, Mobile Menu

Replace the existing `js/script.js` entirely. The new script handles: mobile hamburger toggle, closing the menu when an anchor link is clicked, and highlighting the active nav link as the user scrolls.

**Files:**
- Rewrite: `js/script.js`

- [ ] **Step 1: Replace `js/script.js` with the new implementation**

```js
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
```

- [ ] **Step 2: Verify in browser:**
  - Open the site and slowly scroll through all sections — the active nav link should update as each section enters the viewport
  - On mobile width, tap the hamburger — menu opens; tap an anchor link — menu closes and page scrolls to the section
  - Resume link in nav opens/downloads correctly

- [ ] **Step 3: Commit**

```bash
git add js/script.js
git commit -m "feat: add scroll-spy nav, mobile menu close-on-click"
```

---

## Task 8: Remove Old Pages + Final Cleanup

**Files:**
- Delete: `about.html`, `projects.html`, `contact.html`

- [ ] **Step 1: Delete the old page files**

```bash
git rm about.html projects.html contact.html
```

- [ ] **Step 2: Verify in browser** — navigate to `index.html`, confirm all sections render correctly end-to-end. Check:
  - Hero: name, subtitle, tagline, two buttons, social icons
  - About: bio text + facts card
  - Skills: three pill-grouped columns
  - Projects: 2-column grid, Featured badges, tags
  - Contact: three contact links + resume button
  - Nav scroll-spy works through all sections

- [ ] **Step 3: Final commit**

```bash
git commit -m "chore: remove old multi-page HTML files"
```

---

## Post-Implementation: User Asset Checklist

Once the code is complete, the user must add:

| Asset | Action |
|---|---|
| Profile photo | Drop `profile.jpg` into `assets/images/` — circular photo in hero will appear |
| Resume/CV | Drop `resume.pdf` into `assets/` — both Resume buttons become active |
| GitHub repo URLs | In `index.html`, find the commented-out `<a>` tags in each project card and replace `YOUR_REPO_URL` with the real URL |
