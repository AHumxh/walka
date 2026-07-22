/* =========================================================
   WALKADON LOGISTICS — Scroll reveal + counter animations
   ========================================================= */

(function () {
  "use strict";

  /* ---- IntersectionObserver reveal ---- */
  const revealItems = document.querySelectorAll(".reveal, .reveal-stagger, .reveal-left, .reveal-right");
  if ("IntersectionObserver" in window && revealItems.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    revealItems.forEach(el => io.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll("[data-counter]");
  const runCounter = (el) => {
    const target = parseFloat(el.getAttribute("data-counter")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      const formatted = target >= 1000
        ? Math.round(val).toLocaleString()
        : (target % 1 === 0 ? Math.round(val) : val.toFixed(1));
      el.textContent = formatted + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => co.observe(c));
  }
})();
