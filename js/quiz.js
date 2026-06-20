/* ============================================================
   KRESZ Code Web App — Quiz engine
   Setup → runner (per-question feedback) → results → review
   ============================================================ */
(function (global) {
  "use strict";

  const K = global.KRESZ;
  const { $, $$, icon } = K.ui;
  const { t, tr } = K.i18n;

  const CAT_ORDER = [
    "all", "general", "signs", "priority",
    "moped", "motorcycle", "car", "truck", "bus", "bicycle",
  ];
  const CAT_ICONS = {
    all: icon("quiz"),
    general: icon("book"),
    signs:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 4l9 16H3z"/><path d="M12 10v4" stroke-linecap="round"/><circle cx="12" cy="17" r="0.7" fill="currentColor"/></svg>',
    priority:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3l9 9-9 9-9-9z"/></svg>',
    moped: icon("moped"),
    motorcycle: icon("motorcycle"),
    car: icon("car"),
    truck: icon("truck"),
    bus: icon("bus"),
    bicycle: icon("bicycle"),
  };
  const LETTERS = ["A", "B", "C", "D", "E"];

  // session state
  let selCat = "all";
  let selLen = 10;
  let quizQs = [];
  let idx = 0;
  let score = 0;
  let answered = false;
  let record = [];

  /* ---------- helpers ---------- */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function poolFor(cat) {
    return cat === "all" ? K.QUESTIONS : K.QUESTIONS.filter((q) => q.cat === cat);
  }
  function catLabel(cat) {
    return cat === "all" ? t("quiz.setup.all") : t("qcat." + cat);
  }
  function signSvg(id) {
    const s = K.SIGNS.find((x) => x.id === id);
    return s ? s.svg : "";
  }
  function bestKey(cat) {
    return "kresz.best." + cat;
  }
  function getBest(cat) {
    return parseInt(localStorage.getItem(bestKey(cat)) || "0", 10);
  }
  function setBest(cat, pct) {
    if (pct > getBest(cat)) localStorage.setItem(bestKey(cat), String(pct));
  }

  /* ---------- SETUP screen ---------- */
  function showSetup() {
    const mount = $("#quizMount");
    const best = getBest(selCat);
    mount.innerHTML = `
      <div class="quiz-setup">
        ${
          best > 0
            ? `<div class="quiz-best">${icon("trophy")} ${t("quiz.progress.best")}: ${best}%</div>`
            : ""
        }
        <div class="quiz-setup-label">${t("quiz.setup.category")}</div>
        <div class="quiz-cat-grid" id="quizCatGrid">
          ${CAT_ORDER.map((cat) => {
            const avail = poolFor(cat).length;
            return `<button class="quiz-cat-btn ${cat === selCat ? "selected" : ""}" data-cat="${cat}" ${
              avail === 0 ? "disabled style='opacity:.4'" : ""
            }>
              <span class="qc-icon">${CAT_ICONS[cat] || ""}</span>
              <span>${catLabel(cat)}<br><small style="color:var(--text-muted);font-weight:600">${avail} ${t(
              "quiz.questions"
            )}</small></span>
            </button>`;
          }).join("")}
        </div>

        <div class="quiz-setup-label">${t("quiz.setup.length")}</div>
        <div class="quiz-len-row" id="quizLenRow">
          ${[5, 10, 15, 999]
            .map(
              (n) =>
                `<button class="len-btn ${n === selLen ? "selected" : ""}" data-len="${n}">${
                  n === 999 ? t("signs.filter.all") : n
                }</button>`
            )
            .join("")}
        </div>

        <button class="btn btn-primary btn-block" id="quizStartBtn">
          ${icon("play")}<span>${t("quiz.setup.start")}</span>
        </button>
      </div>`;

    $$("#quizCatGrid .quiz-cat-btn").forEach((b) =>
      b.addEventListener("click", () => {
        selCat = b.getAttribute("data-cat");
        showSetup();
      })
    );
    $$("#quizLenRow .len-btn").forEach((b) =>
      b.addEventListener("click", () => {
        selLen = parseInt(b.getAttribute("data-len"), 10);
        $$("#quizLenRow .len-btn").forEach((x) =>
          x.classList.toggle("selected", x === b)
        );
      })
    );
    $("#quizStartBtn").addEventListener("click", () => start());
  }

  /* ---------- START ---------- */
  function start() {
    const pool = shuffle(poolFor(selCat));
    const take = Math.min(selLen, pool.length);
    quizQs = pool.slice(0, take).map((q) => {
      const perm = shuffle(q.options.hu.map((_, i) => i));
      return { ref: q, perm, correct: perm.indexOf(q.answer) };
    });
    idx = 0;
    score = 0;
    answered = false;
    record = [];
    renderQuestion();
  }

  function startCategory(cat) {
    selCat = poolFor(cat).length ? cat : "all";
    if (selLen === 999) selLen = 10;
    start();
  }

  /* ---------- QUESTION ---------- */
  function renderQuestion() {
    answered = false;
    const item = quizQs[idx];
    const q = item.ref;
    const lang = K.i18n.getLang();
    const opts = item.perm
      .map(
        (origIdx, i) => `
        <button class="quiz-option" data-i="${i}" style="animation-delay:${i * 0.06}s">
          <span class="opt-key">${LETTERS[i]}</span>
          <span class="opt-text">${q.options[lang][origIdx]}</span>
          <span class="opt-mark">${icon("check")}</span>
        </button>`
      )
      .join("");

    const mount = $("#quizMount");
    mount.innerHTML = `
      <div class="quiz-runner">
        <div class="quiz-topbar">
          <span class="quiz-counter">${t("quiz.question")} <b>${idx + 1}</b> ${t(
      "quiz.of"
    )} ${quizQs.length}</span>
          <span class="quiz-score-pill">${icon("trophy")} <span id="scoreVal">${score}</span></span>
        </div>
        <div class="quiz-progress"><div class="quiz-progress-bar" id="qProgress"></div></div>
        <div class="quiz-card">
          ${q.sign ? `<div class="quiz-sign-display">${signSvg(q.sign)}</div>` : ""}
          <h3 class="quiz-question">${tr(q.q)}</h3>
          <div class="quiz-options" id="quizOptions">${opts}</div>
          <div id="quizFeedbackSlot"></div>
          <div class="quiz-actions" id="quizActions"></div>
        </div>
      </div>`;

    requestAnimationFrame(() => {
      $("#qProgress").style.width = ((idx) / quizQs.length) * 100 + "%";
    });

    $$("#quizOptions .quiz-option").forEach((btn) =>
      btn.addEventListener("click", () => answer(parseInt(btn.getAttribute("data-i"), 10)))
    );
  }

  function answer(choice) {
    if (answered) return;
    answered = true;
    const item = quizQs[idx];
    const correct = item.correct;
    const isRight = choice === correct;
    if (isRight) {
      score++;
      $("#scoreVal").textContent = score;
    }
    record.push({ item, choice, isRight });

    const btns = $$("#quizOptions .quiz-option");
    btns.forEach((b, i) => {
      b.disabled = true;
      if (i === correct) b.classList.add("correct");
      else if (i === choice) b.classList.add("wrong");
      else b.classList.add("dim");
    });

    // feedback
    const q = item.ref;
    $("#quizFeedbackSlot").innerHTML = `
      <div class="quiz-feedback ${isRight ? "good" : "bad"}">
        <div class="quiz-feedback-title">
          ${isRight ? icon("check") : icon("x")} ${isRight ? t("quiz.correct") : t("quiz.incorrect")}
        </div>
        <span class="explain-label">${t("quiz.explanation")}</span>
        <p>${tr(q.explain)}</p>
      </div>`;

    const last = idx === quizQs.length - 1;
    $("#quizActions").innerHTML = `
      <button class="btn btn-primary" id="nextBtn">
        <span>${last ? t("quiz.finish") : t("quiz.next")}</span>${last ? "" : icon("arrow")}
      </button>`;
    $("#nextBtn").addEventListener("click", next);

    $("#qProgress").style.width = ((idx + 1) / quizQs.length) * 100 + "%";
  }

  function next() {
    if (idx < quizQs.length - 1) {
      idx++;
      renderQuestion();
      $("#quizMount").scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      showResults();
    }
  }

  /* ---------- RESULTS ---------- */
  function showResults() {
    const total = quizQs.length;
    const pct = total ? Math.round((score / total) * 100) : 0;
    setBest(selCat, pct);

    let msg;
    if (pct === 100) msg = t("quiz.results.perfect");
    else if (pct >= 80) msg = t("quiz.results.great");
    else if (pct >= 60) msg = t("quiz.results.good");
    else msg = t("quiz.results.practice");

    const r = 86;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct / 100);

    $("#quizMount").innerHTML = `
      <div class="quiz-results">
        <div class="result-ring">
          <svg viewBox="0 0 200 200">
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#3b6ef5"/>
                <stop offset="100%" stop-color="#8b5cf6"/>
              </linearGradient>
            </defs>
            <circle class="ring-bg" cx="100" cy="100" r="${r}"/>
            <circle class="ring-fg" cx="100" cy="100" r="${r}"
              style="stroke-dasharray:${circ}; stroke-dashoffset:${offset}; --circ:${circ}"/>
          </svg>
          <div class="ring-label">
            <div>
              <div class="result-pct" id="resultPct">0%</div>
              <div class="ring-sub">${catLabel(selCat)}</div>
            </div>
          </div>
        </div>
        <div class="result-message">${msg}</div>
        <p class="result-detail">${t("quiz.results.youscored")}
          <b>${score}/${total}</b> ${t("quiz.results.correct")}</p>
        <div class="result-actions">
          <button class="btn btn-primary" id="retryBtn">${t("quiz.results.retry")}</button>
          <button class="btn btn-ghost" id="reviewBtn">${t("quiz.results.review")}</button>
          <button class="btn btn-ghost" id="newBtn">${t("quiz.results.newquiz")}</button>
        </div>
        <div id="reviewMount"></div>
      </div>`;

    // animate percentage number
    const pctEl = $("#resultPct");
    const startT = performance.now();
    (function tick(now) {
      const p = Math.min((now - startT) / 1200, 1);
      pctEl.textContent = Math.round(pct * (1 - Math.pow(1 - p, 3))) + "%";
      if (p < 1) requestAnimationFrame(tick);
    })(startT);

    if (pct >= 80) K.ui.confetti(pct === 100 ? 140 : 90);

    $("#retryBtn").addEventListener("click", () => {
      start();
      $("#quizMount").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    $("#newBtn").addEventListener("click", showSetup);
    $("#reviewBtn").addEventListener("click", () => {
      const rm = $("#reviewMount");
      if (rm.dataset.open) {
        rm.innerHTML = "";
        rm.dataset.open = "";
      } else {
        renderReview(rm);
        rm.dataset.open = "1";
        rm.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  /* ---------- REVIEW ---------- */
  function renderReview(mount) {
    const lang = K.i18n.getLang();
    mount.innerHTML =
      `<h3 style="margin:20px 0 4px;text-align:center">${t("quiz.review.title")}</h3>` +
      `<div class="quiz-review">` +
      record
        .map((rec, n) => {
          const q = rec.item.ref;
          const correctOrig = rec.item.perm[rec.item.correct];
          const yourOrig = rec.item.perm[rec.choice];
          return `
        <div class="review-item ${rec.isRight ? "" : "miss"}">
          <div class="review-q">
            <span class="rq-icon">${rec.isRight ? icon("check") : icon("x")}</span>
            <span>${n + 1}. ${tr(q.q)}</span>
          </div>
          <div class="review-ans yours ${rec.isRight ? "correct" : "miss"}">
            <span class="ra-label">${t("quiz.review.your")}:</span> ${q.options[lang][yourOrig]}
          </div>
          ${
            rec.isRight
              ? ""
              : `<div class="review-ans correct"><span class="ra-label">${t(
                  "quiz.review.correct"
                )}:</span> ${q.options[lang][correctOrig]}</div>`
          }
        </div>`;
        })
        .join("") +
      `</div>`;
  }

  /* ---------- init ---------- */
  function init() {
    showSetup();
    document.addEventListener("kresz:langchange", () => {
      // Only the setup screen is safe to fully re-localize live.
      if ($("#quizMount .quiz-setup")) showSetup();
    });
  }

  K.quiz = { init, startCategory };
})(window);
