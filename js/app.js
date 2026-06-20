/* ============================================================
   KRESZ Code Web App — Bootstrap / orchestration
   ============================================================ */
(function (global) {
  "use strict";

  const K = global.KRESZ;
  const { $, $$, icon } = K.ui;
  const { t } = K.i18n;

  /* ---------- Home: feature cards ---------- */
  function buildFeatures() {
    const grid = $("#featureGrid");
    if (!grid) return;
    const feats = [
      { icon: "book", key: "signs" },
      { icon: "cars", key: "vehicles" },
      { icon: "quiz", key: "quiz" },
      { icon: "palette", key: "theme" },
    ];
    grid.innerHTML = feats
      .map(
        (f, i) => `
      <div class="feature-card reveal d${i + 1}">
        <div class="feature-icon">${icon(f.icon)}</div>
        <h3>${t("home.feature." + f.key + ".title")}</h3>
        <p>${t("home.feature." + f.key + ".desc")}</p>
      </div>`
      )
      .join("");
  }

  /* ---------- Home: floating sign hero ---------- */
  function buildHero() {
    const wrap = $("#heroVisual");
    if (!wrap) return;
    const pick = (id) => {
      const s = K.SIGNS.find((x) => x.id === id);
      return s ? s.svg : "";
    };
    const floats = [
      { id: "p-stop", top: "2%", left: "34%", rot: "-8deg", d: "0s" },
      { id: "pr-no-entry", top: "20%", left: "76%", rot: "6deg", d: "0.4s" },
      { id: "p-priority-road", top: "54%", left: "82%", rot: "-5deg", d: "0.8s" },
      { id: "i-crossing", top: "76%", left: "58%", rot: "7deg", d: "1.2s" },
      { id: "pr-speed-50", top: "70%", left: "6%", rot: "-6deg", d: "1.6s" },
      { id: "m-roundabout", top: "30%", left: "-2%", rot: "8deg", d: "2s" },
    ];
    wrap.innerHTML = `
      <div class="hero-orbit"></div>
      <div class="hero-orbit inner"></div>
      <div class="hero-center">
        <svg viewBox="0 0 100 100">
          <polygon points="50,10 92,82 8,82" fill="#fff" stroke="#e4002b" stroke-width="9" stroke-linejoin="round"/>
          <rect x="44" y="34" width="12" height="26" rx="3" fill="#1a1a1a"/>
          <circle cx="50" cy="70" r="6" fill="#1a1a1a"/>
        </svg>
      </div>
      ${floats
        .map(
          (f) =>
            `<div class="float-sign" style="top:${f.top};left:${f.left};--rot:${f.rot};animation-delay:${f.d}">${pick(
              f.id
            )}</div>`
        )
        .join("")}`;
  }

  /* ---------- Language button label ---------- */
  function updateLangButton() {
    const el = $("#langToggle .lang-current");
    if (el) el.textContent = K.i18n.getLang().toUpperCase();
  }

  /* ---------- Wiring ---------- */
  function wire() {
    // navigation (nav links, brand, hero/cta buttons, drawer links)
    $$("[data-view-link]").forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        K.ui.showView(el.getAttribute("data-view-link"));
      })
    );

    $("#themeToggle")?.addEventListener("click", K.ui.toggleTheme);

    $("#langToggle")?.addEventListener("click", () => {
      K.i18n.toggle();
      updateLangButton();
      K.ui.toast(K.i18n.getLang() === "hu" ? "Magyar nyelv" : "English language");
    });

    $("#menuToggle")?.addEventListener("click", () => {
      const open = $("#mobileDrawer")?.classList.contains("open");
      open ? K.ui.closeDrawer() : K.ui.openDrawer();
    });
    $("#drawerBackdrop")?.addEventListener("click", K.ui.closeDrawer);

    // rebuild home content when language changes
    document.addEventListener("kresz:langchange", () => {
      buildFeatures();
      buildHero();
      updateLangButton();
      K.ui.scanReveals($('.view[data-view="home"]'));
    });

    window.addEventListener("hashchange", () => {
      const v = location.hash.replace("#", "");
      if (v) K.ui.showView(v, { scroll: false });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    K.ui.initTheme();
    K.i18n.apply();
    updateLangButton();

    buildFeatures();
    buildHero();

    K.ui.initReveal();
    K.ui.initHeaderScroll();

    K.signs.init();
    K.vehicles.init();
    K.quiz.init();

    wire();

    // initial route
    const start = location.hash.replace("#", "");
    K.ui.showView(start || "home", { scroll: false });

    // reveal + counters for the first paint
    K.ui.scanReveals(document);
    K.ui.animateCounters(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
