/* =========================================================
   WALKADON LOGISTICS — Core interactions
   Navigation, mobile menu, FAQ, back-to-top, sticky nav
   ========================================================= */

(function () {
  "use strict";

  /* ---- Sticky nav on scroll ---- */
  const nav = document.querySelector("[data-nav]");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile drawer ---- */
  const toggle = document.querySelector("[data-nav-toggle]");
  const drawer = document.querySelector("[data-nav-drawer]");
  if (toggle && drawer) {
    const closeDrawer = () => {
      drawer.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", () => {
      const open = drawer.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll("[data-faq]").forEach(item => {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", String(open));
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
    });
  });

  /* ---- Back to top ---- */
  const backTop = document.querySelector("[data-back-top]");
  if (backTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) backTop.classList.add("is-visible");
      else backTop.classList.remove("is-visible");
    }, { passive: true });
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- Highlight active nav link ---- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link, .nav__drawer a").forEach(link => {
    const href = link.getAttribute("href");
    if (href && href === path) link.classList.add("is-active");
  });

  /* ---- Smooth scrolling for internal anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      if (targetId.length <= 1) return;
      const el = document.querySelector(targetId);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ---- Current year in footer ---- */
  const yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
