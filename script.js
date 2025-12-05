// =====================================================
// THEME TOGGLE
// =====================================================
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

// =====================================================
// MOBILE NAV TOGGLE
// =====================================================
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

// =====================================================
// BACK TO TOP BUTTON
// =====================================================
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =====================================================
// FADE-IN ON SCROLL
// =====================================================
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

// =====================================================
// PREMIUM ACCORDION BEHAVIOR
// =====================================================
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const accordion = header.closest(".accordion");
    if (!accordion) return;

    const content = accordion.querySelector(".accordion-content");
    if (!content) return;

    const isOpen = accordion.classList.toggle("open");

    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = 0;
    }
  });
});

// =====================================================
// CLICKABLE TAGS -> SMOOTH SCROLL TO RESEARCH SECTIONS
// =====================================================
document.querySelectorAll(".research-tags .tag").forEach((tag) => {
  tag.addEventListener("click", () => {
    const targetId = tag.getAttribute("data-target");
    const el = document.getElementById(targetId);
    if (!el) return;

    // optional active state
    document.querySelectorAll(".research-tags .tag").forEach((t) =>
      t.classList.remove("active")
    );
    tag.classList.add("active");

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// =====================================================
// PUBLICATION FILTERS (PUBLICATIONS PAGE)
// =====================================================
const pubFilterButtons = document.querySelectorAll(".pub-filter");
const pubCards = document.querySelectorAll(".pub-card");

if (pubFilterButtons.length && pubCards.length) {
  pubFilterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const topic = btn.getAttribute("data-topic");

      pubFilterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      pubCards.forEach((card) => {
        const cardTopic = card.getAttribute("data-topic");
        if (topic === "all" || cardTopic === topic) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// =====================================================
// BIBTEX TOGGLE (PUBLICATIONS PAGE)
// =====================================================
document.querySelectorAll(".pub-bib-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".pub-card");
    if (!card) return;
    const bib = card.querySelector(".pub-bib");
    if (!bib) return;

    bib.style.display = bib.style.display === "block" ? "none" : "block";
  });
});

// =====================================================
// COPY CITATION TO CLIPBOARD (PUBLICATIONS PAGE)
// =====================================================
document.querySelectorAll(".pub-copy").forEach((btn) => {
  btn.addEventListener("click", () => {
    const text = btn.getAttribute("data-text");
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => {
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          setTimeout(() => {
            btn.innerHTML = original;
          }, 1500);
        },
        () => {
          alert("Could not copy citation. Please copy manually.");
        }
      );
    } else {
      // Fallback
      alert("Clipboard API not available. Please copy manually.");
    }
  });
});
