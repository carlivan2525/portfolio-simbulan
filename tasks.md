# Implementation Plan: Personal Portfolio Website

## Overview

Incrementally build a single-page portfolio site using HTML, CSS, and vanilla JavaScript. Each task wires its output into the running page so no code is left orphaned.

## Tasks

- [x] 1. Set up project structure and base HTML shell
  - Create `index.html` with semantic structure: `<header>`, `<main>` containing `<section>` elements for hero/skills/projects/contact, and `<footer>`
  - Create empty `styles.css` linked in `<head>` and empty `main.js` linked before `</body>`
  - Create `assets/images/` directory placeholder
  - Add section IDs: `#hero`, `#skills`, `#projects`, `#contact`
  - _Requirements: 6.2_

- [x] 2. Implement global styles and theme
  - [x] 2.1 Define CSS variables and base reset
    - Set `--color-bg: #0a0a0a`, `--color-accent: #2563EB`, `--color-text: #ffffff` and supporting shades
    - Apply box-sizing reset, margin/padding reset, and `scroll-behavior: smooth`
    - Set base typography (font-family, line-height, font-size scale)
    - _Requirements: 1.3_
  - [x] 2.2 Implement responsive breakpoints
    - Define media query breakpoints for mobile (≤768px), tablet (≤1024px), desktop
    - _Requirements: 1.4_

- [ ] 3. Implement Navigation component
  - [x] 3.1 Build fixed navigation bar
    - Write `<header>` markup with logo/name text left and `<nav>` links right (href pointing to each section ID)
    - Style with `position: fixed`, background, and z-index
    - _Requirements: 1.1_
  - [x] 3.2 Implement mobile hamburger menu
    - Add hamburger `<button>` element (hidden on desktop, visible on mobile)
    - Write JS toggle to show/hide nav links on click
    - _Requirements: 1.5_
  - [ ] 3.3 Write unit tests for navigation
    - Test that all four section IDs have corresponding nav anchor hrefs
    - Test that hamburger toggle adds/removes the active class
    - _Requirements: 1.1, 1.5_

- [ ] 4. Implement Hero Section
  - [x] 4.1 Build Hero Section markup and styles
    - Write `<section id="hero">` with name `<h1>`, tagline `<p>`, and two CTA `<a>` buttons
    - Style to fill full viewport height with centered content and CSS gradient accent
    - Wire CTA 1 href to `#projects` and CTA 2 href to `#contact`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [ ] 4.2 Write unit tests for Hero Section
    - Test that the hero element contains the full name string
    - Test that CTA 1 href equals `#projects` and CTA 2 href equals `#contact`
    - _Requirements: 2.1, 2.3, 2.4_

- [ ] 5. Implement Skills data and rendering
  - [x] 5.1 Define SKILLS data and renderSkills() function
    - Declare `SKILLS` array in `main.js` with three categories: Programming Languages, Frameworks/Libraries, Tools & Platforms
    - Write `renderSkills()` to generate category headings and skill badge elements, appending them to `#skills`
    - Call `renderSkills()` on `DOMContentLoaded`
    - _Requirements: 3.1, 3.2, 3.3_
  - [ ] 5.2 Write property test for skills rendering
    - **Property 7: Skills categories are all rendered**
    - For any SKILLS array, every category defined in the data must appear as a rendered heading with at least one skill badge
    - **Validates: Requirements 3.1, 3.3**
    - `// Feature: personal-portfolio, Property 7: skills categories are all rendered`

- [ ] 6. Implement Projects data and rendering
  - [x] 6.1 Define PROJECTS data and renderProjects() function
    - Declare `PROJECTS` array in `main.js` with at least two sample projects including title, description, techStack, demoUrl, repoUrl
    - Write `renderProjects()` to generate `<article>` Project_Cards and append to `#projects`
    - Conditionally render "Live Demo" link only when `demoUrl` is non-null; "GitHub" link only when `repoUrl` is non-null
    - Style cards in CSS Grid: `repeat(auto-fit, minmax(300px, 1fr))` with hover elevation effect
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [ ] 6.2 Write property test for project card rendering
    - **Property 2: Project cards render all required fields**
    - For any array of project objects, every rendered card must contain the title, description, and ≥1 tech tag
    - **Validates: Requirements 4.1**
    - `// Feature: personal-portfolio, Property 2: project cards render all required fields`
  - [ ] 6.3 Write property test for conditional project links
    - **Property 3: Conditional links appear only when URL is present**
    - For any project object, "Live Demo" link present iff demoUrl non-null; "GitHub" link present iff repoUrl non-null
    - **Validates: Requirements 4.2, 4.3**
    - `// Feature: personal-portfolio, Property 3: conditional links appear only when URL is present`

- [ ] 7. Checkpoint — verify navigation, hero, skills, and projects
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement Contact Section
  - [x] 8.1 Build contact info and social links
    - Write email `<a href="mailto:...">` link and anchor links for GitHub and LinkedIn
    - Add `target="_blank" rel="noopener noreferrer"` to all external links
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 8.2 Build contact form with client-side validation
    - Write `<form>` with name, email, and message fields plus submit button
    - Write `validateForm()` in `main.js`: returns false and shows inline error if any required field is empty/whitespace or email format is invalid; returns true and shows success message on valid input
    - Replace form with success `<div>` on valid submission
    - _Requirements: 5.4, 5.5, 5.6_
  - [ ] 8.3 Write property test for form validation — invalid inputs
    - **Property 4: Form rejects empty required fields**
    - For any form input where ≥1 required field is empty or whitespace-only, `validateForm()` must return false
    - **Validates: Requirements 5.6**
    - `// Feature: personal-portfolio, Property 4: form rejects empty required fields`
  - [ ] 8.4 Write property test for form validation — valid inputs
    - **Property 5: Form accepts fully filled submissions**
    - For any form input where all fields are non-empty and email format is valid, `validateForm()` must return true
    - **Validates: Requirements 5.5**
    - `// Feature: personal-portfolio, Property 5: form accepts fully filled submissions`
  - [ ] 8.5 Write unit tests for contact section
    - Test that social links have `target="_blank"` and `rel="noopener noreferrer"`
    - Test that email link uses `mailto:` protocol
    - **Property 6: Social links open in a new tab**
    - **Validates: Requirements 5.3**
    - `// Feature: personal-portfolio, Property 6: social links open in a new tab`

- [ ] 9. Implement Footer and accessibility polish
  - [x] 9.1 Build Footer
    - Write `<footer>` with copyright text and repeated social icon links
    - _Requirements: 6.2_
  - [x] 9.2 Add accessibility attributes
    - Add `alt` text to all `<img>` elements
    - Ensure all interactive elements are keyboard-focusable with visible `:focus-visible` CSS styles
    - Verify color contrast meets 4.5:1 ratio using CSS variable values
    - _Requirements: 6.3, 6.4, 6.5_
  - [ ] 9.3 Write property test for image alt text
    - **Property: All images have non-empty alt text**
    - For any img element rendered in the DOM, the alt attribute must be a non-empty string
    - **Validates: Requirements 6.3**
    - `// Feature: personal-portfolio, Property: all images have non-empty alt text`
  - [ ] 9.4 Write unit test for semantic HTML structure
    - Test that the DOM contains `<header>`, `<main>`, `<section>`, and `<footer>` elements
    - _Requirements: 6.2_

- [x] 10. Wire active navigation highlight on scroll
  - Implement `IntersectionObserver` in `main.js` to add/remove an `active` CSS class on nav links as their corresponding sections enter/leave the viewport
  - _Requirements: 1.1, 1.2_

- [ ] 11. Final checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required — comprehensive coverage from the start
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests use **fast-check** with minimum 100 iterations per `fc.assert` call
- Unit tests use **Jest** with `@jest-environment jsdom`
- Run tests with: `npx jest --testEnvironment jsdom`
