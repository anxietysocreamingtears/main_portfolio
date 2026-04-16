const menuButton = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");
const topbar = document.querySelector(".topbar");
const yearNode = document.querySelector("[data-year]");
const contactForm = document.querySelector(".contact-form");
const footerForm = document.querySelector(".footer-news__form");
const revealItems = document.querySelectorAll("[data-reveal]");

const closeMenu = () => {
  if (!menuButton || !menuPanel) {
    return;
  }

  menuButton.setAttribute("aria-expanded", "false");
  menuPanel.hidden = true;
  document.body.classList.remove("menu-open");
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
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeMenu();
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (menuPanel.hidden) {
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

    if (state) {
      state.hidden = false;
    }

    contactForm.reset();
  });
}

if (footerForm) {
  footerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const state = document.querySelector(".footer-news__state");

    if (state) {
      state.hidden = false;
    }

    footerForm.reset();
  });
}

if (topbar) {
  const syncTopbar = () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  syncTopbar();
  window.addEventListener("scroll", syncTopbar, { passive: true });
}

if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}
