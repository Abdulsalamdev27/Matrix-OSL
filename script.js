
const menuToggle = document.querySelector("#menu-toggle");
const menuOverlay = document.querySelector("#menu-overlay");
const menuClose = document.querySelector("#menu-close");
const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector("#nav-links");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

// Keep the copyright year current.
document.querySelector("#year").textContent =
  new Date().getFullYear();

function openMenu() {
  navLinks.classList.remove("translate-x-full");
  menuOverlay.classList.remove("opacity-0", "invisible");

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");
  menuIcon.textContent = "✕";

  document.body.classList.add("overflow-hidden");
}

function closeMenu() {
  navLinks.classList.add("translate-x-full");
  menuOverlay.classList.add("opacity-0", "invisible");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuIcon.textContent = "☰";

  document.body.classList.remove("overflow-hidden");
}

menuToggle.addEventListener("click", () => {
  const isOpen =
    menuToggle.getAttribute("aria-expanded") === "true";

  isOpen ? closeMenu() : openMenu();
});

menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

// Close the menu when a navigation link is clicked.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the mobile menu when the user presses Escape.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Reset the mobile menu when resizing to desktop.
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
});

// Prepare an email enquiry.
// This opens the visitor's configured email application.
// It does not send or store form data on a server.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);

  const name = formData.get("name");
  const email = formData.get("email");
  const service = formData.get("service");
  const message = formData.get("message");

  const subject = encodeURIComponent(
    `Service enquiry: ${service}`
  );

  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Work email: ${email}\n` +
    `Service of interest: ${service}\n\n` +
    `Message:\n${message}`
  );

  formStatus.textContent =
    "Opening your email application to prepare the enquiry.";

  window.location.href =
    `mailto:info@Matrixosl.example?subject=${subject}&body=${body}`;
});
