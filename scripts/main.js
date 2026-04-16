const menuButton = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");
const topbar = document.querySelector(".topbar");
const yearNode = document.querySelector("[data-year]");
const contactForm = document.querySelector(".contact-form");
const footerForm = document.querySelector(".footer-news__form");
const revealItems = document.querySelectorAll("[data-reveal]");
const sections = document.querySelectorAll(".section");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const closeMenu = () => {
  if (!menuButton || !menuPanel) {
    return;
  }

  menuButton.setAttribute("aria-expanded", "false");
  menuPanel.hidden = true;
  document.body.classList.remove("menu-open");
};

const showState = (element) => {
  if (!element) {
    return;
  }

  element.hidden = false;

  window.clearTimeout(element._stateTimer);
  element._stateTimer = window.setTimeout(() => {
    element.hidden = true;
  }, 3200);
};

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (menuButton && menuPanel) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuPanel.hidden = isOpen;
    document.body.classList.toggle("menu-open", !isOpen);
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Node) || menuPanel.hidden) {
      return;
    }

    if (menuPanel.contains(target) || menuButton.contains(target)) {
      return;
    }

    closeMenu();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const state = contactForm.querySelector(".form-state");
    showState(state);
    contactForm.reset();
  });
}

if (footerForm) {
  footerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const state = document.querySelector(".footer-news__state");
    showState(state);
    footerForm.reset();
  });
}

if (topbar) {
  const syncTopbar = () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  syncTopbar();
  window.addEventListener("scroll", syncTopbar, { passive: true });
}

if (!prefersReducedMotion) {
  const staggerGroups = Array.from(document.querySelectorAll("[data-stagger]"));

  staggerGroups.forEach((group) => {
    const step = Number(group.dataset.stagger || 0.08);
    const items = Array.from(group.querySelectorAll("[data-reveal]")).filter(
      (item) => item.closest("[data-stagger]") === group
    );

    items.forEach((item, index) => {
      item.style.setProperty("--delay", `${(index * step).toFixed(2)}s`);
    });
  });
}

if (revealItems.length) {
  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}

if (sections.length) {
  if (prefersReducedMotion) {
    sections.forEach((section) => section.classList.add("is-active"));
  } else {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "-10% 0px -32% 0px"
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }
}
