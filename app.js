/**
 * Modern Full Stack Developer Portfolio Logic
 * Recruiter-optimized interactions, project modals, filtering & resume viewer.
 */

// Project database with recruiter-focused engineering highlights
const projectsData = [
  {
    id: "codepulse",
    title: "CodePulse AI",
    category: "fullstack",
    subtitle: "AI-Powered Automated Code Review & Engineering Analytics Suite",
    description: "An intelligent static analysis and continuous PR monitoring system that analyzes pull request velocity, code smells, and performance bottlenecks using LLM embeddings and tree-sitter AST parsing.",
    image: "assets/project-codepulse.jpg",
    tags: ["Next.js 14", "TypeScript", "Node.js", "PostgreSQL", "OpenAI API", "Docker", "Tailwind CSS"],
    metrics: [
      { label: "Turnaround Time", value: "-40% PR cycle time" },
      { label: "Repositories Analyzed", value: "1,200+ Repos" },
      { label: "Code Smells Flagged", value: "98.4% Precision" }
    ],
    highlights: [
      "Designed asynchronous worker pipeline with BullMQ & Redis to process large code diffs without blocking the user-facing API.",
      "Implemented AST parser to extract semantic call graphs before querying OpenAI embeddings, slashing LLM token cost by 62%.",
      "Constructed interactive velocity dashboard with Next.js App Router, Tailwind CSS, and Server-Sent Events (SSE) for live PR status."
    ],
    architecture: "Frontend built on Next.js 14 with Server Actions & Tailwind. The backend utilizes Node.js/Express microservices, Redis job queue, PostgreSQL via Prisma ORM, and Docker containerized workers.",
    demoUrl: "https://github.com",
    githubUrl: "https://github.com"
  },
  {
    id: "paymentflow",
    title: "PaymentFlow Engine",
    category: "backend",
    subtitle: "High-Throughput Global Payments & Subscription Settlement Engine",
    description: "Distributed transaction settlement engine designed for multi-currency processing with idempotency guarantees, automated reconciliations, and instant merchant webhooks.",
    image: "assets/project-paymentflow.jpg",
    tags: ["React", "TypeScript", "Express.js", "Redis", "PostgreSQL", "Stripe API", "Docker"],
    metrics: [
      { label: "Throughput", value: "3,500 req/sec" },
      { label: "p99 Latency", value: "< 75ms" },
      { label: "Zero Double-Spends", value: "100% Idempotent" }
    ],
    highlights: [
      "Engineered atomic distributed locks using Redis Redlock algorithm to eliminate race conditions across concurrent payout requests.",
      "Implemented resilient exponential backoff webhook dispatch queue handling thousands of external merchant notifications.",
      "Built interactive reconciliation dashboard with React & Tailwind CSS featuring exportable audit logs and real-time ledger balance charts."
    ],
    architecture: "Express.js REST APIs with strict TypeScript types, PostgreSQL with row-level locking for ledger balances, Redis in-memory cache, and Stripe SDK integration.",
    demoUrl: "https://github.com",
    githubUrl: "https://github.com"
  },
  {
    id: "sprintsync",
    title: "SprintSync Workspace",
    category: "fullstack",
    subtitle: "Real-time Collaborative Agile Board & Interactive Documentation Hub",
    description: "Modern productivity tool connecting engineering sprint planning with living markdown documentation, live cursor presence, and instant task dependency graphing.",
    image: "assets/project-sprintsync.jpg",
    tags: ["React", "TypeScript", "Socket.io", "Node.js", "MongoDB", "Tailwind CSS", "Zustand"],
    metrics: [
      { label: "Sync Latency", value: "< 25ms WebSocket" },
      { label: "Active Connections", value: "5,000+ Concurrent" },
      { label: "State Reliability", value: "CRDT Conflict-Free" }
    ],
    highlights: [
      "Built conflict-free collaborative document editing utilizing Yjs CRDTs and WebSocket broadcast channels.",
      "Designed fluid drag-and-drop Kanban sprint board with optimistic UI updates and instant rollback on network failures.",
      "Implemented granular role-based access control (RBAC) and JWT authentication with automated token refreshing."
    ],
    architecture: "React frontend with Zustand state management, Socket.io bi-directional messaging layer, Node.js API gateway, and MongoDB database with indexing on sprint entities.",
    demoUrl: "https://github.com",
    githubUrl: "https://github.com"
  },
  {
    id: "taskmatrix",
    title: "CloudPulse Daemon & CLI",
    category: "backend",
    subtitle: "Lightweight Distributed Cron & Task Queue Worker Framework",
    description: "Developer-first CLI and background daemon for scheduling, monitoring, and executing distributed workflows with automated dead-letter queues and Slack/Discord alerting.",
    image: "assets/project-codepulse.jpg",
    tags: ["Node.js", "Go", "Docker", "RabbitMQ", "PostgreSQL", "Bash/CLI"],
    metrics: [
      { label: "Daily Jobs Processed", value: "500K+ Jobs" },
      { label: "Memory Footprint", value: "< 35MB RAM" },
      { label: "Worker Recovery", value: "Self-healing in 1s" }
    ],
    highlights: [
      "Authored clean interactive CLI in Node.js/Go with real-time progress bars, color-coded log streams, and config validation.",
      "Built resilient worker heartbeat system that re-queues orphaned tasks automatically upon container restarts.",
      "Configured complete GitHub Actions CI/CD pipeline with automated unit, integration tests, and multi-architecture Docker image builds."
    ],
    architecture: "Golang daemon core, RabbitMQ message broker, PostgreSQL audit logging, and cross-platform npm CLI interface.",
    demoUrl: "https://github.com",
    githubUrl: "https://github.com"
  }
];

// Initialize DOM events after content loaded
document.addEventListener("DOMContentLoaded", () => {
  // Render Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Setup Projects Filter
  initProjectFilters();

  // Setup Project Modal
  initProjectModal();

  // Setup Resume Modal
  initResumeModal();

  // Setup Contact Form & Clipboard
  initContactActions();

  // Setup Mobile Navigation
  initMobileNav();

  // Setup Scrollspy
  initScrollspy();
});

/* ---------------- Project Filtering ---------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-zinc-900", "text-white", "shadow-sm");
        b.classList.add("bg-white", "text-zinc-600", "hover:bg-zinc-100");
      });

      btn.classList.add("bg-zinc-900", "text-white", "shadow-sm");
      btn.classList.remove("bg-white", "text-zinc-600", "hover:bg-zinc-100");

      const category = btn.getAttribute("data-category");

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

/* ---------------- Project Deep Dive Modal ---------------- */
function initProjectModal() {
  const modalBackdrop = document.getElementById("project-modal");
  const closeBtn = document.getElementById("close-project-modal");
  const viewDetailBtns = document.querySelectorAll(".view-project-details");

  if (!modalBackdrop) return;

  function openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    // Populate modal content
    document.getElementById("modal-project-title").textContent = project.title;
    document.getElementById("modal-project-subtitle").textContent = project.subtitle;
    document.getElementById("modal-project-desc").textContent = project.description;
    document.getElementById("modal-project-img").src = project.image;
    document.getElementById("modal-project-img").alt = project.title;
    document.getElementById("modal-project-architecture").textContent = project.architecture;

    // Tags
    const tagsContainer = document.getElementById("modal-project-tags");
    tagsContainer.innerHTML = project.tags
      .map(tag => `<span class="px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 font-mono-tag">${tag}</span>`)
      .join("");

    // Metrics
    const metricsContainer = document.getElementById("modal-project-metrics");
    metricsContainer.innerHTML = project.metrics
      .map(m => `
        <div class="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3 text-center">
          <div class="text-xs text-zinc-500 font-medium">${m.label}</div>
          <div class="text-sm md:text-base font-bold text-zinc-900 mt-1">${m.value}</div>
        </div>
      `).join("");

    // Highlights
    const highlightsContainer = document.getElementById("modal-project-highlights");
    highlightsContainer.innerHTML = project.highlights
      .map(h => `
        <li class="flex items-start gap-2.5 text-sm text-zinc-600">
          <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0"></i>
          <span>${h}</span>
        </li>
      `).join("");

    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeModal() {
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  viewDetailBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project-id");
      openModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
      closeModal();
    }
  });
}

/* ---------------- Resume Quick-Viewer Modal ---------------- */
function initResumeModal() {
  const resumeModal = document.getElementById("resume-modal");
  const openBtns = document.querySelectorAll(".open-resume-btn");
  const closeBtn = document.getElementById("close-resume-modal");
  const printBtn = document.getElementById("print-resume-btn");

  if (!resumeModal) return;

  function openResume() {
    resumeModal.classList.add("active");
    document.body.style.overflow = "hidden";
    if (window.lucide) window.lucide.createIcons();
  }

  function closeResume() {
    resumeModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  openBtns.forEach(btn => btn.addEventListener("click", openResume));
  if (closeBtn) closeBtn.addEventListener("click", closeResume);

  resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) closeResume();
  });

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

/* ---------------- Contact & Clipboard Actions ---------------- */
function initContactActions() {
  // Copy Email button
  const copyEmailBtn = document.getElementById("copy-email-btn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = "alex.rivera.dev@email.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email address copied to clipboard!", "success");
      }).catch(() => {
        showToast("alex.rivera.dev@email.com", "info");
      });
    });
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast("Thank you! Your message has been sent. I will respond within 24 hours.", "success");
        if (window.lucide) window.lucide.createIcons();
      }, 900);
    });
  }
}

/* ---------------- Toast Notification ---------------- */
function showToast(message, type = "success") {
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");
  const toastIcon = document.getElementById("toast-icon");

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;

  if (type === "success") {
    toastIcon.className = "w-5 h-5 text-emerald-500 shrink-0";
    toastIcon.setAttribute("data-lucide", "check-circle");
  } else {
    toastIcon.className = "w-5 h-5 text-blue-500 shrink-0";
    toastIcon.setAttribute("data-lucide", "info");
  }

  if (window.lucide) window.lucide.createIcons();

  toast.classList.remove("opacity-0", "translate-y-6", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-6", "pointer-events-none");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, 3500);
}

/* ---------------- Mobile Navigation ---------------- */
function initMobileNav() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    if (isHidden) {
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

/* ---------------- Scroll-spy for Navbar ---------------- */
function initScrollspy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}
