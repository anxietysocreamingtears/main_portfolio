const menuButton = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");
const yearNode = document.querySelector("[data-year]");
const contactForm = document.querySelector(".contact-form");
const footerForm = document.querySelector(".footer-news__form");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (menuButton && menuPanel) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuPanel.hidden = isOpen;
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuPanel.hidden = true;
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    menuButton.setAttribute("aria-expanded", "false");
    menuPanel.hidden = true;
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
