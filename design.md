# Design Document: Personal Portfolio Website

## Overview

A single-page portfolio website for Carl Ivan Ken Simbulan built with plain HTML, CSS, and vanilla JavaScript — no build tooling or framework required. All content lives in one `index.html` file with a linked `styles.css` and `main.js`. This keeps deployment trivially simple (any static host, GitHub Pages, Netlify, etc.) while meeting all requirements.

The site uses a black (#0a0a0a background) and blue (#2563EB primary accent) color palette with white body text. Sections stack vertically in a single scroll: Navigation → Hero → Skills → Projects → Contact → Footer.

---

## Architecture

```
personal-portfolio/
├── index.html        # Markup for all sections
├── styles.css        # Global styles, theme, responsive layout
├── main.js           # Navigation scroll, mobile menu, form validation
└── assets/
    └── images/       # Profile photo (optional), project screenshots
```

The site is entirely static. No back-end is needed. The contact form uses client-side validation and, for actual delivery, can be wired to a third-party form service (Formspree, Web3Forms) via a `<form action="...">` attribute — no JavaScript change required.

---

## Components and Interfaces

### Navigation

- Fixed `<header>` at top, `z-index` above content
- Logo/name text on the left, nav links on the right
- On mobile (≤768px): links hidden, hamburger button toggles a dropdown
- Smooth scroll handled by CSS `scroll-behavior: smooth` + JS fallback
- Active link highlight updates on scroll using `IntersectionObserver`

### Hero Section

- Full viewport height (`min-height: 100vh`)
- Centered content: name, tagline, two CTA buttons
- Subtle animated gradient background accent (CSS keyframes)
- CTA 1 → scrolls to Projects; CTA 2 → links to Contact or triggers resume download

### Skills Section

- Three sub-groups: Programming Languages, Frameworks/Libraries, Tools & Platforms
- Each skill rendered as a pill/badge with an icon (via devicons CDN or SVG inline)
- Responsive flex-wrap layout

### Projects Section

- CSS Grid layout: `repeat(auto-fit, minmax(300px, 1fr))`
- Each Project_Card is a `<article>` containing:
  - Title (`<h3>`)
  - Description (`<p>`)
  - Tech stack tags (small `<span>` badges)
  - Action links: "Live Demo" and "GitHub" (conditionally rendered by presence of URL)
- Card hover: slight elevation (box-shadow) and border highlight in accent blue

### Contact Section

- Left column: direct links (email `mailto:`, GitHub, LinkedIn) with icons
- Right column: contact form (`<form>`)
  - Fields: Name (`<input>`), Email (`<input type="email">`), Message (`<textarea>`)
  - Submit button
  - Inline validation: required-field check, email format check
  - Success message shown on valid submission (JS replaces form with confirmation `<div>`)

### Footer

- Simple centered `<footer>`: copyright text, repeated social links

---

## Data Models

All portfolio content is declared as a JavaScript data object in `main.js`, keeping HTML markup clean and making content updates easy.

```js
// main.js (data section)

const PROFILE = {
  name: "Carl Ivan Ken Simbulan",
  tagline: "4th Year Computer Science Student | Aspiring Software Developer",
  email: "carlivan@example.com",
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  resumeUrl: "./assets/resume.pdf", // optional
};

const SKILLS = [
  { category: "Programming Languages", items: ["Python", "JavaScript", "Java", "C++"] },
  { category: "Frameworks / Libraries", items: ["React", "Node.js", "Express", "Bootstrap"] },
  { category: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Figma"] },
];

const PROJECTS = [
  {
    title: "Project Title",
    description: "A short description of what this project does and its impact.",
    techStack: ["React", "Node.js", "MongoDB"],
    demoUrl: "https://example.com",   // null if not available
    repoUrl: "https://github.com/...", // null if not available
  },
  // ... more projects
];
```

The `renderSkills()` and `renderProjects()` functions read from these arrays and generate DOM nodes, so adding or updating content requires changing only the data, not the markup.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navigation links cover all sections

*For any* rendered page, every section ID defined in the page (`#hero`, `#skills`, `#projects`, `#contact`) must have a corresponding anchor link present in the Navigation bar.

**Validates: Requirements 1.1**

---

### Property 2: Project cards render all required fields

*For any* project object in the PROJECTS data array, the rendered Project_Card in the DOM must contain the project title, description, and at least one tech stack tag.

**Validates: Requirements 4.1**

---

### Property 3: Conditional links appear only when URL is present

*For any* project object, a "Live Demo" link must appear in the rendered card if and only if `demoUrl` is non-null; a "GitHub" link must appear if and only if `repoUrl` is non-null.

**Validates: Requirements 4.2, 4.3**

---

### Property 4: Form rejects empty required fields

*For any* submission of the contact form where at least one required field (name, email, message) is empty or whitespace-only, the form must NOT submit and must display at least one validation error message.

**Validates: Requirements 5.5, 5.6**

---

### Property 5: Form accepts fully filled submissions

*For any* submission of the contact form where all required fields (name, email, message) contain non-whitespace values and email is a valid format, the form must display a success confirmation message.

**Validates: Requirements 5.5**

---

### Property 6: Social links open in a new tab

*For any* external social/profile link rendered on the page (GitHub, LinkedIn, email aside), the anchor element must have `target="_blank"` and `rel="noopener noreferrer"`.

**Validates: Requirements 5.3**

---

### Property 7: Skills categories are all rendered

*For any* category defined in the SKILLS data array, a corresponding category heading and at least one skill badge must appear in the rendered Skills_Section.

**Validates: Requirements 3.1, 3.3**

---

## Error Handling

| Scenario | Handling |
|---|---|
| Contact form — empty required field | Inline error message below the field; form submission prevented |
| Contact form — invalid email format | Inline error below email field; submission prevented |
| Contact form — network/service failure | Display a generic error message; keep form data intact |
| Missing project image | Use a CSS placeholder background; `alt` text always set |
| Resume PDF not found | CTA button gracefully falls back to linking to Contact section |

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are used together for comprehensive coverage.

**Unit Tests** — cover specific examples, edge cases, and error conditions:
- Navigation renders with correct number of links
- A project with `demoUrl: null` produces no "Live Demo" link
- A project with valid URLs produces both links
- Form shows error on empty name, empty email, empty message
- Form shows error on malformed email (e.g., `"notanemail"`)
- Form shows success on all-valid input
- Social links have correct `target` and `rel` attributes

**Property-Based Tests** — verify universal properties across randomized inputs.

Library: **fast-check** (JavaScript, no build step required via CDN or npm)

Each property test runs a minimum of **100 iterations**.

| Property | Test Description |
|---|---|
| Property 2 | For any array of project objects, every rendered card contains title, description, and ≥1 tech tag |
| Property 3 | For any project with/without URLs, link presence matches URL presence |
| Property 4 | For any form input where ≥1 required field is blank/whitespace, `validateForm()` returns false |
| Property 5 | For any form input where all fields are non-empty and email is valid, `validateForm()` returns true |
| Property 7 | For any SKILLS array, every category in the data appears as a rendered heading |

**Tag format for test annotations:**
`// Feature: personal-portfolio, Property N: <property text>`

### Testing Tools

- **Unit + Property tests**: Jest (with `@jest-environment jsdom`) + fast-check
- Run with: `npx jest --testEnvironment jsdom`
- Minimum 100 iterations per `fc.assert` call
