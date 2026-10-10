// # code: script.js

"use strict";

// ==================================
// MOBILE MENU
// ==================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

// ==================================
// SCROLL PROGRESS BAR
// ==================================

const progressBar = document.querySelector(".scroll-progress");

function updateProgress() {
  if (!progressBar) return;

  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;

  progressBar.style.width = progress + "%";
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ==================================
// FOOTER YEAR
// ==================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ==================================
// CONTACT FORM
// ==================================

// Add your real EmailJS settings here when available.
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const submitButton = document.getElementById("submitButton");

if (contactForm && formNote && submitButton) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    // Do not pretend an email was sent if settings are missing.
    if (
      EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" ||
      EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
      EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID"
    ) {
      formNote.textContent =
        "Email sending is not configured yet. You can email edohcharity09@gmail.com directly.";
      return;
    }

    if (!window.emailjs) {
      formNote.textContent =
        "The email service did not load. Check your internet connection and try again.";
      return;
    }

    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formNote.textContent = "Sending your message...";

    try {
      await window.emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
      });

      const result = await window.emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm
      );

      if (result.status !== 200) {
        throw new Error("Email service did not confirm the request.");
      }

      formNote.textContent =
        "Your message was accepted by the email service. Thank you!";

      contactForm.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      formNote.textContent =
        "Message could not be sent. Please try again or email edohcharity09@gmail.com directly.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}