// THEME TOGGLE
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
  }
}

// initial theme
setTheme(storedTheme || (prefersDark ? "dark" : "light"));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

// MOBILE NAV TOGGLE
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });
}

// BACK TO TOP BUTTON
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// FADE-IN ON SCROLL
const faders = document.querySelectorAll(".fade-in");
if ("IntersectionObserver" in window && faders.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  faders.forEach((el) => observer.observe(el));
}
// ACCORDION
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const accordion = header.parentElement;
    accordion.classList.toggle("open");

    const content = accordion.querySelector(".accordion-content");
    if (accordion.classList.contains("open")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = 0;
    }
  });
});
// Accordion behavior
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const accordion = header.closest(".accordion");
    accordion.classList.toggle("open");

    const content = accordion.querySelector(".accordion-content");
    if (accordion.classList.contains("open")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = 0;
    }
  });
});

// Clickable tags -> smooth scroll to section
document.querySelectorAll(".research-tags .tag").forEach(tag => {
  tag.addEventListener("click", () => {
    const targetId = tag.getAttribute("data-target");
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});


