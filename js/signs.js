/* ============================================================
   KRESZ Code Web App — Signs explorer (grid, filter, search, modal)
   ============================================================ */
(function (global) {
  "use strict";

  const K = global.KRESZ;
  const { $, $$ } = K.ui;
  const { t, tr } = K.i18n;

  let activeCat = "all";
  let query = "";
  let filtered = [];
  let modalIndex = -1;

  function catColor(id) {
    const c = K.SIGN_CATEGORIES.find((x) => x.id === id);
    return c ? c.color : "var(--primary)";
  }

  /* ---------- Filters ---------- */
  function renderFilters() {
    const wrap = $("#signFilters");
    if (!wrap) return;
    const chips = [
      `<button class="chip ${activeCat === "all" ? "active" : ""}" data-cat="all">${t(
        "signs.filter.all"
      )}</button>`,
    ];
    K.SIGN_CATEGORIES.forEach((c) => {
      chips.push(
        `<button class="chip ${activeCat === c.id ? "active" : ""}" data-cat="${c.id}" style="--chip-color:${c.color}">
           <span class="chip-dot"></span>${t("cat." + c.id)}
         </button>`
      );
    });
    wrap.innerHTML = chips.join("");
    $$(".chip", wrap).forEach((chip) =>
      chip.addEventListener("click", () => {
        activeCat = chip.getAttribute("data-cat");
        renderFilters();
        renderGrid();
      })
    );
  }

  /* ---------- Grid ---------- */
  function computeFiltered() {
    const q = query.trim().toLowerCase();
    filtered = K.SIGNS.filter((s) => {
      if (activeCat !== "all" && s.category !== activeCat) return false;
      if (!q) return true;
      return (
        tr(s.name).toLowerCase().includes(q) ||
        tr(s.desc).toLowerCase().includes(q)
      );
    });
  }

  function renderGrid() {
    computeFiltered();
    const grid = $("#signsGrid");
    const empty = $("#signsEmpty");
    const count = $("#signCount");
    if (!grid) return;

    count.textContent = filtered.length + " " + t("signs.count");
    empty.hidden = filtered.length !== 0;

    grid.innerHTML = filtered
      .map(
        (s, i) => `
      <button class="sign-card reveal" data-sign-index="${i}" style="--tag-color:${catColor(
          s.category
        )}; animation-delay:${Math.min(i * 0.03, 0.4)}s">
        <div class="sign-thumb">${s.svg}</div>
        <h4>${tr(s.name)}</h4>
        <span class="sign-cat-tag">${t("cat." + s.category)}</span>
      </button>`
      )
      .join("");

    $$(".sign-card", grid).forEach((card) =>
      card.addEventListener("click", () =>
        openModal(parseInt(card.getAttribute("data-sign-index"), 10))
      )
    );
    K.ui.scanReveals(grid);
  }

  /* ---------- Modal ---------- */
  function openModal(index) {
    if (index < 0 || index >= filtered.length) return;
    modalIndex = index;
    renderModal();
    const modal = $("#signModal");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    const modal = $("#signModal");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalIndex = -1;
  }
  function renderModal() {
    const s = filtered[modalIndex];
    if (!s) return;
    const color = catColor(s.category);
    $("#signModalBody").innerHTML = `
      <div class="modal-sign" style="--tag-color:${color}">${s.svg}</div>
      <h3>${tr(s.name)}</h3>
      <span class="modal-cat" style="--tag-color:${color}">${t("cat." + s.category)}</span>
      <div>
        <span class="modal-meaning-label">${t("signs.detail.meaning")}</span>
        <p class="modal-meaning">${tr(s.desc)}</p>
      </div>`;
    $("#signPrev").disabled = filtered.length < 2;
    $("#signNext").disabled = filtered.length < 2;
  }
  function step(dir) {
    if (modalIndex < 0) return;
    modalIndex = (modalIndex + dir + filtered.length) % filtered.length;
    const body = $("#signModalBody");
    body.style.animation = "none";
    // restart entrance animation of the sign
    requestAnimationFrame(() => renderModal());
  }

  /* ---------- Init ---------- */
  function init() {
    renderFilters();
    renderGrid();

    const search = $("#signSearch");
    search?.addEventListener("input", (e) => {
      query = e.target.value;
      renderGrid();
    });

    $$("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
    $("#signPrev")?.addEventListener("click", () => step(-1));
    $("#signNext")?.addEventListener("click", () => step(1));

    document.addEventListener("keydown", (e) => {
      if (!$("#signModal").classList.contains("open")) return;
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });

    // Re-render text on language change.
    document.addEventListener("kresz:langchange", () => {
      renderFilters();
      renderGrid();
      if (modalIndex >= 0) renderModal();
    });
  }

  K.signs = { init, openByCategory: (cat) => { activeCat = cat; renderFilters(); renderGrid(); } };
})(window);
