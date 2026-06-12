# Requirements Document

## Introduction

A personal portfolio website for Carl Ivan Ken Simbulan, a 4th year college student. The site showcases his projects, skills, and contact information with a clean black and blue theme. It serves as a professional online presence for prospective employers, collaborators, and academic connections.

## Glossary

- **Portfolio_Site**: The personal portfolio web application for Carl Ivan Ken Simbulan
- **Visitor**: Any person browsing the portfolio website
- **Project_Card**: A UI component displaying a single project's summary (title, description, tech stack, links)
- **Hero_Section**: The landing/intro section at the top of the page
- **Skills_Section**: The section displaying technical and soft skills
- **Projects_Section**: The section displaying project cards
- **Contact_Section**: The section with contact information and/or a contact form
- **Navigation**: The site-wide header navigation bar

## Requirements

### Requirement 1: Site Layout and Navigation

**User Story:** As a visitor, I want to navigate the portfolio site easily, so that I can find the information I need without confusion.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a Navigation bar fixed at the top of the page containing links to each main section (Hero, Skills, Projects, Contact).
2. WHEN a visitor clicks a Navigation link, THE Portfolio_Site SHALL smoothly scroll to the corresponding section.
3. THE Portfolio_Site SHALL apply a black and blue color theme consistently across all sections.
4. THE Portfolio_Site SHALL be responsive and render correctly on desktop, tablet, and mobile screen sizes.
5. WHEN the page is viewed on a mobile device, THE Navigation SHALL collapse into a hamburger menu.

---

### Requirement 2: Hero Section

**User Story:** As a visitor, I want to see a clear introduction when I land on the site, so that I immediately understand who Carl is and what he does.

#### Acceptance Criteria

1. THE Hero_Section SHALL display Carl Ivan Ken Simbulan's full name prominently.
2. THE Hero_Section SHALL display a short tagline or role description (e.g., "4th Year Computer Science Student | Aspiring Software Developer").
3. THE Hero_Section SHALL display a call-to-action button that links to the Projects_Section.
4. THE Hero_Section SHALL display a secondary call-to-action button that links to the Contact_Section or downloads a resume.

---

### Requirement 3: Skills Section

**User Story:** As a visitor, I want to see Carl's technical skills, so that I can assess his capabilities quickly.

#### Acceptance Criteria

1. THE Skills_Section SHALL display a categorized list of technical skills (e.g., Languages, Frameworks, Tools).
2. WHEN skills are displayed, THE Skills_Section SHALL render each skill with a label and a visual indicator (e.g., icon or badge).
3. THE Skills_Section SHALL display at least the following categories: Programming Languages, Frameworks/Libraries, and Tools & Platforms.

---

### Requirement 4: Projects Section

**User Story:** As a visitor, I want to browse Carl's projects, so that I can evaluate his hands-on experience and technical work.

#### Acceptance Criteria

1. THE Projects_Section SHALL display one or more Project_Cards, each containing a project title, short description, and tech stack used.
2. WHEN a project has a live demo URL, THE Project_Card SHALL display a link to the live demo.
3. WHEN a project has a source code repository URL, THE Project_Card SHALL display a link to the repository.
4. THE Projects_Section SHALL display projects in a responsive grid layout.

---

### Requirement 5: Contact Section

**User Story:** As a visitor, I want to find Carl's contact details, so that I can reach out to him for opportunities or collaboration.

#### Acceptance Criteria

1. THE Contact_Section SHALL display Carl's email address.
2. THE Contact_Section SHALL display links to Carl's social/professional profiles (e.g., GitHub, LinkedIn).
3. WHEN a visitor clicks a social profile link, THE Portfolio_Site SHALL open the link in a new browser tab.
4. THE Contact_Section SHALL display a contact form with fields for the visitor's name, email, and message.
5. WHEN a visitor submits the contact form with all required fields filled, THE Contact_Section SHALL display a success confirmation message.
6. IF a visitor submits the contact form with one or more required fields empty, THEN THE Contact_Section SHALL display a validation error indicating which fields are required.

---

### Requirement 6: Performance and Accessibility

**User Story:** As a visitor, I want the portfolio site to load quickly and be accessible, so that I have a good experience regardless of my device or ability.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL load its initial view within 3 seconds on a standard broadband connection.
2. THE Portfolio_Site SHALL use semantic HTML elements (e.g., `<header>`, `<main>`, `<section>`, `<footer>`) throughout its structure.
3. THE Portfolio_Site SHALL provide descriptive `alt` text for all images.
4. WHEN interactive elements are focused via keyboard, THE Portfolio_Site SHALL display a visible focus indicator.
5. THE Portfolio_Site SHALL maintain a color contrast ratio of at least 4.5:1 for all body text against its background.
