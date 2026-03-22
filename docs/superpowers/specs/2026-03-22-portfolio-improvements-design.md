# Portfolio Improvements Design

**Date:** 2026-03-22
**Goal:** Full overhaul of BenFransvdW.github.io to maximise impact for software engineering job/internship applications.

---

## 1. Context

The current site is a multi-page HTML/CSS/JS portfolio with four separate pages (index, about, projects, contact). It uses a dark navy + cyan colour scheme and a responsive navbar. The main weaknesses identified:

- No resume/CV download
- No LinkedIn link
- Project cards lack tech stacks, GitHub links, and depth
- Multi-page navigation feels dated compared to single-page portfolio norms
- No profile photo adds a personal element

---

## 2. Approach

**Single-page scroll** — merge all four pages into one `index.html` with anchor-linked sections. The navbar switches from page links to anchor links. No build tooling; stays deployable directly on GitHub Pages as vanilla HTML/CSS/JS.

---

## 3. File Structure

```
index.html              ← single page, all sections
css/styles.css          ← rewritten for single-page layout
js/script.js            ← rewritten: smooth scroll, scroll-spy nav, mobile menu
assets/
  images/
    profile.jpg         ← user provides headshot
  resume.pdf            ← user provides CV
.gitignore              ← includes .superpowers/
```

The files `about.html`, `projects.html`, and `contact.html` are removed.

---

## 4. Page Sections (top to bottom)

### 4.1 Navbar

- Sticky, blur backdrop (keep existing style)
- Logo/name left, nav links right
- Links: About · Skills · Projects · Contact
- All links are anchor links (`#about`, `#skills`, `#projects`, `#contact`)
- Active link highlighted via scroll-spy (JS IntersectionObserver)
- Hamburger menu on mobile (keep existing toggle behaviour)
- Resume download button as a distinct outlined button in the nav

### 4.2 Hero (`#hero`)

Full-viewport section, vertically centered. Two-column layout:

**Left column (~60% width):**
- Small cyan label: `"Hi, my name is"`
- Large name: `Ben van der Westhuizen` (white, bold, large)
- Subtitle: `Third-year Computer Science Student · Stellenbosch University`
- Tagline: `"I build compilers, backends, and everything in between."`
- Two CTA buttons:
  - **View My Work** — filled cyan, smooth-scrolls to `#projects`
  - **Resume ↓** — outlined cyan, downloads `assets/resume.pdf`
- Social icon row: GitHub, LinkedIn, Email (small icon links, open in new tab)

**Right column (~40% width):**
- Circular `<img src="assets/images/profile.jpg">` with cyan ring border
- Falls below text on mobile (flex-direction: column)
- **Fallback:** if `profile.jpg` is absent, the right column is hidden (`display: none`) so the left column expands to full width without a broken layout

### 4.3 About (`#about`)

- Section heading: `"About Me"` with cyan underline accent
- Two-column layout: bio text left, fact list right
- Bio text: retain substance from current `about.html`
- Fact list (right): University, Year, Location, Interests

### 4.4 Skills (`#skills`)

- Section heading: `"What I Work With"`
- Three labelled columns:
  - **Languages** — Java, Python, C, JavaScript, SQL, x86 NASM Assembly
  - **Web & Tools** — HTML, CSS, Git & GitHub, Docker, Tailscale
  - **Concepts** — OOP, Compiler Construction, Algorithm Design, Data Analysis, Automation
- Each skill rendered as a small pill/badge (dark background, cyan text — consistent with project card tags)

### 4.5 Projects (`#projects`)

- Section heading: `"Things I've Built"`
- 2-column card grid; collapses to 1 column on mobile
- Card anatomy:
  - Title + optional `Featured` cyan pill badge
  - Short description (2–3 sentences)
  - Tech stack pills (dark background, cyan text)
  - GitHub link (opens in new tab) — omitted if repo is private/unavailable
  - Hover lift animation (keep existing style)
- Cards ordered by recruiter impact:

| # | Title | Featured | Description | Tech Stack | Repo URL |
|---|---|---|---|---|---|
| 1 | WISTL Compiler | ✅ | A full compilation pipeline for the WISTL teaching language — lexer, parser, semantic analyser, and JVM bytecode generator. | C, JVM Bytecode, Compiler Design | _user provides_ |
| 2 | Homelab | ✅ | Self-hosted infrastructure on a Raspberry Pi 5 — Pi-hole for DNS ad-blocking, Audiobookshelf, Plex, and Tailscale VPN for secure remote access. | Raspberry Pi, Docker, Linux, Tailscale | _no public repo_ |
| 3 | Statera | | Java desktop application for work-life balance featuring Focus Mode and a workaholic filter to enforce healthy work patterns. | Java, OOP, Desktop UI | _user provides_ |
| 4 | Quasi-Palindromic DNA Analysis Utility | | Analyses DNA sequences to detect quasi-palindromic patterns, supporting bioinformatics research workflows. | Java, Algorithm Design | _user provides_ |
| 5 | Python Board Game | | Two-player command-line board game with full turn management, input validation, and win detection. | Python | _user provides_ |
| 6 | Personal Website | | This portfolio — a responsive single-page site built with vanilla HTML, CSS, and JavaScript. | HTML, CSS, JavaScript | _user provides_ |

### 4.6 Contact (`#contact`)

- Section heading: `"Get In Touch"`
- Short paragraph: `"I'm currently open to internship and graduate opportunities. Whether you have a question or just want to say hi, my inbox is always open."`
- Three contact items as large clickable links:
  - Email — `benvdwest7@gmail.com`
  - GitHub — `github.com/BenFransvdW`
  - LinkedIn — user provides URL (placeholder: `https://linkedin.com/in/PLACEHOLDER`)
- Resume download button (outlined cyan, same style as hero) for recruiters who scroll to the bottom
- No contact form

---

## 5. Design System

| Token | Value |
|---|---|
| Background | `#0a192f` |
| Light background | `#112240` |
| Text | `#ccd6f6` |
| Muted text | `#8892b0` |
| Accent | `#64ffda` |
| Card background | `#112240` |
| Border radius | `4px` |
| Font | System font stack (keep existing) |

---

## 6. JavaScript Behaviour

- **Smooth scroll** — clicking nav anchor links scrolls smoothly to sections
- **Scroll-spy** — IntersectionObserver highlights the active nav link as user scrolls
- **Mobile menu** — hamburger toggle (keep existing behaviour, update for anchor links)
- **No frameworks** — vanilla JS only

---

## 7. User-Provided Assets

The following must be added by the user before the site is complete:

| Asset | Path | Notes |
|---|---|---|
| Profile photo | `assets/images/profile.jpg` | Headshot, ideally square |
| Resume/CV | `assets/resume.pdf` | PDF format |
| LinkedIn URL | In `index.html` | Replace placeholder |
| GitHub repo URLs | In `index.html` | One per project card |

---

## 8. Out of Scope

- Blog or writing section
- Dark/light theme toggle
- Animation framework (Framer Motion, GSAP, etc.)
- Backend or contact form
- Per-project detail pages
