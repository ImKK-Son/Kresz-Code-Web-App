/* ============================================================
   KRESZ Code Web App — UI infrastructure
   Theme, routing, scroll-reveal, counters, confetti, icons
   ============================================================ */
(function (global) {
  "use strict";

  const K = (global.KRESZ = global.KRESZ || {});
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- Inline icon library ---------- */
  const ICONS = {
    bicycle:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M5.5 17.5 9 9h5l2.5 8.5M9 9l-1.5-3M14 9l2 3"/></svg>',
    moped:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17h6l2-6h3l1 3M9 11l3-4h3"/></svg>',
    motorcycle:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="16" r="3.5"/><circle cx="19" cy="16" r="3.5"/><path d="M5 16l4-5h6l3 5M9 11l-2-3M13 8h4l2 3"/></svg>',
    car:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5v4a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1z"/><path d="M5 13h14"/></svg>',
    truck:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6h11v11H2zM13 9h4l4 4v4h-8z"/><circle cx="6.5" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></svg>',
    bus:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 11h18M7 4v7M12 4v7M17 4v7"/><circle cx="7" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/></svg>',
    tractor:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="16" r="4"/><circle cx="18" cy="17" r="3"/><path d="M7 12V7h4l2 5M11 7h4v5"/></svg>',
    book:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h11a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-1a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h1z"/></svg>',
    cars:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l1.5-4A2 2 0 0 1 6.4 8H14a2 2 0 0 1 1.9 1.3L17 13v4H3z"/><circle cx="6.5" cy="17" r="1.4"/><circle cx="13.5" cy="17" r="1.4"/><path d="M19 7h2v8"/></svg>',
    quiz:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.7-2.5 2-2.5 3.5"/><circle cx="12" cy="17.5" r="0.6" fill="currentColor"/></svg>',
    palette:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 1.8-3 2 2 0 0 1 1.8-3H18a3 3 0 0 0 3-3 9 9 0 0 0-9-9z"/><circle cx="7.5" cy="11" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16.5" cy="11" r="1"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4.5 4.5L19 7"/></svg>',
    x:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    play:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    trophy:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v4a5 5 0 0 1-10 0zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 18h6M10 14v4M14 14v4"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };
  function icon(name) {
    return ICONS[name] || "";
  }

  /* ---------- Theme ---------- */
  const THEME_KEY = "kresz.theme";
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const theme =
      saved ||
      (matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    // brief flash for a smooth, deliberate transition
    const flash = $(".theme-flash");
    if (flash) {
      flash.style.background = next === "dark" ? "#080b16" : "#eef1f9";
      flash.classList.add("active");
      setTimeout(() => flash.classList.remove("active"), 320);
    }
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      next === "dark" ? "#080b16" : "#0050a0"
    );
  }

  /* ---------- Scroll reveal ---------- */
  let revealObserver;
  function initReveal() {
    if (!("IntersectionObserver" in global)) {
      revealObserver = null; // fallback handled in scanReveals
      return;
    }
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
  }
  function scanReveals(root) {
    const els = $$(".reveal:not(.in)", root);
    if (!revealObserver) {
      // No IntersectionObserver: just show everything (never leave content hidden).
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    els.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Counters ---------- */
  function animateCounters(root) {
    $$("[data-count]", root).forEach((el) => {
      if (el.dataset.done) return;
      const target = parseInt(el.getAttribute("data-count"), 10) || 0;
      el.dataset.done = "1";
      const dur = 1400;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- Router ---------- */
  const VIEWS = ["home", "signs", "vehicles", "quiz", "about"];
  let currentView = "home";
  function showView(view, opts) {
    if (!VIEWS.includes(view)) view = "home";
    currentView = view;
    $$(".view").forEach((v) => v.classList.toggle("active", v.dataset.view === view));
    $$("[data-view-link]").forEach((l) =>
      l.classList.toggle("active", l.getAttribute("data-view-link") === view)
    );
    if (location.hash !== "#" + view) {
      try {
        history.replaceState(null, "", "#" + view);
      } catch (e) {
        location.hash = view; // fallback for restricted environments
      }
    }
    closeDrawer();
    if (!opts || opts.scroll !== false) window.scrollTo({ top: 0, behavior: "smooth" });
    const root = $('.view[data-view="' + view + '"]');
    // Re-run entrance animations for this view's content.
    requestAnimationFrame(() => {
      scanReveals(root);
      if (view === "home") animateCounters(root);
    });
    document.dispatchEvent(new CustomEvent("kresz:viewchange", { detail: { view } }));
  }
  function getView() {
    return currentView;
  }

  /* ---------- Mobile drawer ---------- */
  function openDrawer() {
    $("#mobileDrawer")?.classList.add("open");
    $("#drawerBackdrop")?.classList.add("show");
    $("#menuToggle")?.setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    $("#mobileDrawer")?.classList.remove("open");
    $("#drawerBackdrop")?.classList.remove("show");
    $("#menuToggle")?.setAttribute("aria-expanded", "false");
  }

  /* ---------- Header scroll state + progress ---------- */
  function initHeaderScroll() {
    const header = $("#siteHeader");
    const bar = $("#scrollProgress");
    function onScroll() {
      const y = window.scrollY;
      header?.classList.toggle("scrolled", y > 8);
      if (bar) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Confetti ---------- */
  function confetti(count) {
    const layer = document.createElement("div");
    layer.className = "confetti-layer";
    const colors = ["#3b6ef5", "#6a5cff", "#e4002b", "#16a34a", "#f59e0b", "#8b5cf6"];
    const n = count || 80;
    for (let i = 0; i < n; i++) {
      const c = document.createElement("span");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[(Math.random() * colors.length) | 0];
      c.style.animationDuration = 2.4 + Math.random() * 1.8 + "s";
      c.style.animationDelay = Math.random() * 0.5 + "s";
      c.style.width = 6 + Math.random() * 8 + "px";
      c.style.height = 10 + Math.random() * 10 + "px";
      if (Math.random() > 0.6) c.style.borderRadius = "50%";
      layer.appendChild(c);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 5000);
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    let el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.innerHTML = '<span class="toast-dot"></span><span class="toast-msg"></span>';
      document.body.appendChild(el);
    }
    el.querySelector(".toast-msg").textContent = msg;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }

  K.ui = {
    $, $$, icon, initTheme, toggleTheme,
    initReveal, scanReveals, animateCounters,
    showView, getView, openDrawer, closeDrawer,
    initHeaderScroll, confetti, toast,
  };
})(window);
