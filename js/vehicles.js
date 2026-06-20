/* ============================================================
   KRESZ Code Web App — Vehicle categories view
   ============================================================ */
(function (global) {
  "use strict";

  const K = global.KRESZ;
  const { $, $$, icon } = K.ui;
  const { t, tr } = K.i18n;

  function render() {
    const grid = $("#vehicleGrid");
    if (!grid) return;

    grid.innerHTML = K.VEHICLES.map((v, i) => {
      const rules = (v.rules[K.i18n.getLang()] || v.rules.hu || [])
        .map((r) => `<li>${r}</li>`)
        .join("");
      return `
      <article class="vehicle-card reveal" style="--vc:${v.accent}; animation-delay:${Math.min(
        i * 0.05,
        0.5
      )}s">
        <div class="vehicle-head">
          <div class="vehicle-icon">${icon(v.icon)}</div>
          <div>
            <div class="vehicle-badge">${v.code}</div>
            <h3>${tr(v.name)}</h3>
          </div>
        </div>
        <div class="vehicle-body">
          <div class="vehicle-meta">
            <div class="meta-box">
              <div class="meta-label">${t("vehicles.minage")}</div>
              <div class="meta-val">${tr(v.minAge)}</div>
            </div>
            <div class="meta-box">
              <div class="meta-label">${t("vehicles.maxspeed")}</div>
              <div class="meta-val">${tr(v.speed)}</div>
            </div>
          </div>

          <div class="vehicle-section-label">${t("vehicles.allows")}</div>
          <p class="vehicle-allows">${tr(v.allows)}</p>

          <div class="vehicle-section-label">${t("vehicles.rules")}</div>
          <ul class="rule-list">${rules}</ul>

          <button class="vehicle-quiz-btn" data-quiz-cat="${v.quizCat}">
            ${icon("quiz")}<span>${t("vehicles.quizcta")}</span>
          </button>
        </div>
      </article>`;
    }).join("");

    $$(".vehicle-quiz-btn", grid).forEach((btn) =>
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-quiz-cat");
        K.ui.showView("quiz");
        K.quiz.startCategory(cat);
      })
    );

    K.ui.scanReveals(grid);
  }

  function init() {
    render();
    document.addEventListener("kresz:langchange", render);
  }

  K.vehicles = { init };
})(window);
