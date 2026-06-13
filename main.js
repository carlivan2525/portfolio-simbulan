/* ===========================
   Portfolio Data
   =========================== */
const PROFILE = {
  name: "Carl Ivan Ken Simbulan",
  tagline: "4th Year Information Technology Student | Aspiring Software Developer",
  email: "carlivan@example.com",
  github: "https://github.com/carlivan2525",
  linkedin: "https://www.linkedin.com/in/carl-ivan-ken-simbulan-212439359/",
  resumeUrl: null,
};

const SKILLS = [
  {
    category: "Programming Languages / Markup & Styling",
    items: [
      { name: "HTML",       icon: "devicon-html5-plain colored" },
      { name: "CSS",        icon: "devicon-css3-plain colored" },
      { name: "PHP",        icon: "devicon-php-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    ],
  },
  {
    category: "Frameworks / Libraries",
    items: [
      { name: "React",      icon: "devicon-react-original colored" },
      { name: "Vite",       icon: "devicon-vitejs-plain colored" },
      { name: "Laravel",    icon: "devicon-laravel-plain colored" },
      { name: "Node.js",    icon: "devicon-nodejs-plain colored" },
      { name: "Express",    icon: "devicon-express-original" },
      { name: "Bootstrap",  icon: "devicon-bootstrap-plain colored" },
      { name: "Tailwind",   icon: "devicon-tailwindcss-plain colored" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "SQL",        icon: "devicon-mysql-plain colored" },
      { name: "MongoDB",    icon: "devicon-mongodb-plain colored" },
    ],
  },
  {
    category: "Tools & Standards",
    items: [
      { name: "REST APIs",  icon: "fa fa-plug" },
      { name: "EDI",        icon: "fa fa-exchange-alt" },
      { name: "GitHub",     icon: "devicon-github-original" },
      { name: "Figma",      icon: "devicon-figma-plain colored" },
    ],
  },
];

const PROJECTS = [
  {
    title: "CarGO — EDI-Enabled Logistics Management System",
    period: "May 2026 – May 2026",
    description: "CarGO is a full-stack Logistics Management System built to simulate real-world supply chain workflows using the ANSI X12 EDI standard. It automates end-to-end B2B data exchanges, freight transactions, and route tracking. The system features an automated 8-stage transaction pipeline that parses and processes inbound/outbound EDI documents (204, 990, 214, 210, 820, 997) for seamless load tendering and billing. For routing, I integrated Leaflet and OpenStreetMap with an interactive freight rate calculator covering over 3,785 Philippine cities, factoring in vehicle-based pricing and distance multipliers. It also includes a real-time financial ledger with secure token-based PDF invoice generation, automated digital payout workflows, and a live dashboard for active shipment monitoring.",
    techStack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    image: "MKFF.png",
    imageAlt: "CarGO Logistics Management System screenshot",
    demoUrl: null,
    repoUrl: "https://github.com/carlivan2525/Cargo_Logistics",
  },
  {
    title: "Real-Time Unit Traceability System (EdgeSensor Assembly)",
    period: "Jan 2026 – Apr 2026",
    description: "Developed and deployed a real-time digital traceability system for the EdgeSensor assembly line at MKFF LASERTEKNIQUE International Inc., transitioning manual factory workflows into modern Industry 4.0 standards. The system tracks units across a 15-station manufacturing pipeline using an integrated QR code scanner module to monitor live locations, unit history, and operational bottlenecks. An AI-driven root cause analysis module automatically detects manufacturing defects and translates complex error data into clean visual trends and graphs. The platform achieved a 4.22/5.00 ISO/IEC 25010 technical quality rating and a 4.77/5.00 UAT score from factory operators and management.",
    techStack: ["React.js", "Bootstrap 5", "PHP", "REST APIs", "MySQL"],
    image: "CARGO.png",
    imageAlt: "MKFF LASERTEKNIQUE Real-Time Unit Traceability System screenshot",
    demoUrl: null,
    repoUrl: "https://github.com/carlivan2525/mkffwebsystem",
  },
];

/* ===========================
   Typewriter Effect
   =========================== */
function initTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;
  const text = "Hello, I'm";

  function typeOut(cb) {
    let i = 0;
    function step() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) setTimeout(step, 80);
      else cb && setTimeout(cb, 5000);
    }
    step();
  }

  function eraseOut(cb) {
    let i = el.textContent.length;
    function step() {
      el.textContent = text.slice(0, i);
      i--;
      if (i >= 0) setTimeout(step, 40);
      else cb && setTimeout(cb, 300);
    }
    step();
  }

  function loop() {
    typeOut(() => eraseOut(() => loop()));
  }

  loop();
}


function renderSkillsTicker() {
  const ticker = document.getElementById("skills-ticker");
  if (!ticker) return;

  const allSkills = SKILLS.flatMap(cat => cat.items);

  // Desktop: double list for seamless loop
  [...allSkills, ...allSkills].forEach((skill) => {
    const badge = document.createElement("span");
    badge.className = "ticker-badge";

    const icon = document.createElement("i");
    icon.className = skill.icon;
    icon.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.textContent = skill.name;

    badge.appendChild(icon);
    badge.appendChild(label);
    ticker.appendChild(badge);
  });

  // Mobile: show one badge at a time with pop animation
  function initMobileCycle() {
    if (window.innerWidth > 768) return;

    const badges = ticker.querySelectorAll(".ticker-badge");
    // Only use first half (non-duplicate)
    const mobileBadges = Array.from(badges).slice(0, allSkills.length);
    let current = 0;

    function showNext() {
      mobileBadges.forEach(b => {
        b.classList.remove("active");
        b.style.animation = "none";
      });
      const current_badge = mobileBadges[current];
      current_badge.classList.add("active");
      void current_badge.offsetWidth;
      current_badge.style.animation = "badge-slide 0.4s ease";
      current = (current + 1) % mobileBadges.length;
    }

    showNext();
    setInterval(showNext, 1800);
  }

  initMobileCycle();
  window.addEventListener("resize", initMobileCycle);
}

/* ===========================
   Render Projects
   =========================== */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  PROJECTS.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    // Image
    if (project.image) {
      const imgWrapper = document.createElement("div");
      imgWrapper.className = "project-img-wrapper";
      const img = document.createElement("img");
      img.src = project.image;
      img.alt = project.imageAlt || project.title;
      img.className = "project-img";
      img.loading = "lazy";
      imgWrapper.appendChild(img);
      card.appendChild(imgWrapper);
    }

    // Title
    const title = document.createElement("h3");
    title.textContent = project.title;
    card.appendChild(title);

    // Period
    if (project.period) {
      const period = document.createElement("p");
      period.className = "project-period";
      period.textContent = project.period;
      card.appendChild(period);
    }

    // Tech Stack
    const techWrapper = document.createElement("div");
    techWrapper.className = "project-tech";
    project.techStack.forEach((tech) => {
      const tag = document.createElement("span");
      tag.className = "tech-tag";
      tag.textContent = tech;
      techWrapper.appendChild(tag);
    });
    card.appendChild(techWrapper);

    // Links + View Details row
    const linksWrapper = document.createElement("div");
    linksWrapper.className = "project-links";

    // "View Details" button inside links row
    const detailsBtn = document.createElement("button");
    detailsBtn.className = "btn btn-primary btn-details";
    detailsBtn.textContent = "View Details";
    detailsBtn.addEventListener("click", () => openModal(project));
    linksWrapper.appendChild(detailsBtn);

    if (project.demoUrl) {
      const demoLink = document.createElement("a");
      demoLink.href = project.demoUrl;
      demoLink.target = "_blank";
      demoLink.rel = "noopener noreferrer";
      demoLink.className = "project-link";
      demoLink.innerHTML = '<i class="fa fa-external-link" aria-hidden="true"></i> Live Demo';
      linksWrapper.appendChild(demoLink);
    }

    if (project.repoUrl) {
      const repoLink = document.createElement("a");
      repoLink.href = project.repoUrl;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.className = "btn btn-secondary btn-details";
      repoLink.innerHTML = '<i class="fab fa-github" aria-hidden="true"></i> GitHub';
      linksWrapper.appendChild(repoLink);
    }

    if (linksWrapper.children.length > 0) {
      card.appendChild(linksWrapper);
    }

    grid.appendChild(card);
  });
}

/* ===========================
   Modal
   =========================== */
function openModal(project) {
  const overlay = document.getElementById("modal-overlay");
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-period").textContent = project.period || "";
  document.getElementById("modal-description").textContent = project.description;

  const techEl = document.getElementById("modal-tech");
  techEl.innerHTML = "";
  project.techStack.forEach((tech) => {
    const tag = document.createElement("span");
    tag.className = "tech-tag";
    tag.textContent = tech;
    techEl.appendChild(tag);
  });

  overlay.classList.add("active");
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

function initModal() {
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}


function validateForm(name, email, message) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Name is required.";
  }
  if (!email || email.trim() === "") {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!message || message.trim() === "") {
    errors.message = "Message is required.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameVal = document.getElementById("form-name").value;
    const emailVal = document.getElementById("form-email").value;
    const messageVal = document.getElementById("form-message").value;

    // Clear previous errors
    ["name", "email", "message"].forEach((field) => {
      const errorEl = document.getElementById(`error-${field}`);
      const inputEl = document.getElementById(`form-${field}`);
      if (errorEl) errorEl.textContent = "";
      if (inputEl) inputEl.classList.remove("invalid");
    });

    const result = validateForm(nameVal, emailVal, messageVal);

    if (!result.valid) {
      Object.entries(result.errors).forEach(([field, msg]) => {
        const errorEl = document.getElementById(`error-${field}`);
        const inputEl = document.getElementById(`form-${field}`);
        if (errorEl) errorEl.textContent = msg;
        if (inputEl) inputEl.classList.add("invalid");
      });
      return;
    }

    // Show success
    const wrapper = document.getElementById("contact-form-wrapper");
    wrapper.innerHTML = `
      <div class="form-success">
        <i class="fa fa-check-circle" aria-hidden="true"></i>
        <h3>Message Sent!</h3>
        <p>Thanks for reaching out, I'll get back to you soon.</p>
      </div>
    `;
  });
}

/* ===========================
   Live Background Canvas
   =========================== */
function initLiveBg() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");

  let width, height;
  let scrollY = 0;
  let targetScrollY = 0;

  // Orbs config — each has a base position, color, size, and drift
  const orbs = [
    { x: 0.2, y: 0.2, r: 0.45, color: [40, 40, 40],    speed: 0.0004 },
    { x: 0.8, y: 0.5, r: 0.40, color: [37, 99, 235],   speed: 0.0003 },
    { x: 0.5, y: 0.9, r: 0.50, color: [60, 60, 60],    speed: 0.0005 },
    { x: 0.1, y: 0.8, r: 0.35, color: [30, 30, 30],    speed: 0.0002 },
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    // Smooth scroll lerp
    scrollY += (targetScrollY - scrollY) * 0.05;
    const scrollFraction = scrollY / (document.body.scrollHeight - window.innerHeight || 1);

    orbs.forEach((orb, i) => {
      // Drift over time + shift with scroll
      const driftX = Math.sin(time * orb.speed + i * 1.2) * 0.12;
      const driftY = Math.cos(time * orb.speed * 0.8 + i * 0.9) * 0.10;
      const scrollShift = scrollFraction * 0.4 * (i % 2 === 0 ? 1 : -1);

      const cx = (orb.x + driftX + scrollShift) * width;
      const cy = (orb.y + driftY - scrollFraction * 0.3) * height;
      const radius = orb.r * Math.min(width, height);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      const [r, g, b] = orb.color;
      grad.addColorStop(0,   `rgba(${r},${g},${b},0.35)`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},0.15)`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", () => { targetScrollY = window.scrollY; }, { passive: true });

  resize();
  requestAnimationFrame(draw);
}


function initHamburger() {
  const btn = document.getElementById("hamburger");
  const nav = document.querySelector("nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu on link click
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ===========================
   Navigation: Active Link on Scroll
   =========================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function setActive() {
    const scrollBottom = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    let current = "";

    // If near bottom of page, force last section active
    if (scrollBottom >= docHeight - 10) {
      current = sections[sections.length - 1].id;
    } else {
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top <= 80) {
          current = section.id;
        }
      });
    }

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
}

/* ===========================
   Init
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  initLiveBg();
  initTypewriter();
  renderSkillsTicker();
  renderProjects();
  initContactForm();
  initHamburger();
  initScrollSpy();
  initModal();
  initScrollAnimations();
  initThemeToggle();
});

/* ===========================
   Exports (for testing)
   =========================== */
if (typeof module !== "undefined") {
  module.exports = { validateForm, SKILLS, PROJECTS, PROFILE };
}

/* ===========================
   Scroll Fade Animations
   =========================== */
function initScrollAnimations() {
  // Elements to animate
  const targets = document.querySelectorAll(
    "#projects .project-card, #certifications .cert-card, #contact .contact-info-item, #contact .contact-socials, .section-title, .section-subtitle"
  );

  targets.forEach((el) => {
    el.classList.add("scroll-hidden");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("scroll-hidden");
          entry.target.classList.add("scroll-visible");
        } else {
          // fade out when scrolled away
          entry.target.classList.remove("scroll-visible");
          entry.target.classList.add("scroll-hidden");
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ===========================
   Theme Toggle (Light / Dark)
   =========================== */
function initThemeToggle() {
  const btnDesktop = document.getElementById("theme-toggle");
  const btnMobile  = document.getElementById("theme-toggle-mobile");
  const iconDesktop = document.getElementById("theme-icon");
  const iconMobile  = document.getElementById("theme-icon-mobile");

  function setTheme(isLight) {
    document.body.classList.toggle("light-mode", isLight);
    const iconClass = isLight ? "fa fa-moon" : "fa fa-sun";
    if (iconDesktop) iconDesktop.className = iconClass;
    if (iconMobile)  iconMobile.className  = iconClass;
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  // Restore saved preference
  const saved = localStorage.getItem("theme");
  if (saved === "light") setTheme(true);

  if (btnDesktop) btnDesktop.addEventListener("click", () => setTheme(!document.body.classList.contains("light-mode")));
  if (btnMobile)  btnMobile.addEventListener("click",  () => setTheme(!document.body.classList.contains("light-mode")));
}
