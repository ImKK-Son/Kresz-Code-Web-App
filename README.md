# 🚦 KRESZ Tanuló — Hungarian Road Code Web App

An interactive web app for learning the Hungarian highway code (**KRESZ** —
_Közúti Rendelkezések Egységes Szabályozása_). It explains road signs, breaks
down every driving-licence (vehicle) category, and lets you test yourself with
quizzes — all in a sleek, animated interface with **dark/light themes** and a
**Hungarian 🇭🇺 / English 🇬🇧 language toggle**.

> ⚠️ **Educational aid only.** This app does **not** replace the official KRESZ
> curriculum or the state exam. Always rely on current legislation and official
> sources for precise, up-to-date rules.

---

## ✨ Features

- **📑 Road sign explorer** — 63 signs across 5 categories (warning, priority,
  prohibitory, mandatory, information), each with a crisp inline-SVG graphic,
  category filtering, instant search and a detailed explanation modal you can
  page through with the keyboard.
- **🚗 Every vehicle category** — Bicycle, Moped (**AM**), motorcycles
  (**A1 / A2 / A**), car (**B / B+E**), truck (**C / C+E**), bus (**D**) and
  agricultural tractor (**T**) — each with minimum age, speed limits, what it
  lets you drive, and the key rules.
- **🧠 Smart quizzes** — A bank of **150+ questions**: rule questions for every
  topic and vehicle category (general, priority, moped, motorcycle, car, truck,
  bus, bicycle) **plus an automatically generated recognition question for every
  road sign**. Pick a topic or vehicle category, choose the length, and get
  **instant feedback + an explanation** for every question. Shuffled questions
  and answers, progress bar, animated score ring, confetti on great scores, an
  answer review, and your **best score saved locally**.
- **🎨 Customisation** — One-tap **dark/light** theme and **HU/EN** language
  toggle; both persist in your browser.
- **💫 Many animations** — Animated aurora background, scroll-reveal, floating
  hero signs, counters, smooth view transitions, hover/press micro-interactions
  (all respecting `prefers-reduced-motion`).
- **🔒 Private & offline-friendly** — No back end, no tracking. Everything runs
  in the browser; progress is stored in `localStorage`.

## 🚀 Running it

It's a **dependency-free static site** — no build step.

**Option A — open directly:** double-click `index.html`. (Works offline; the
web font falls back to your system font with no internet.)

**Option B — local server (recommended):**

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```

Or deploy the folder as-is to **GitHub Pages**, Netlify, Vercel, etc.

## 🗂️ Project structure

```
.
├── index.html              # App shell, views, modal
├── css/
│   ├── styles.css          # Theme tokens, layout, components
│   └── animations.css      # Keyframes, scroll-reveal, quiz & vehicle UI
└── js/
    ├── data/
    │   ├── translations.js  # HU/EN UI strings (i18n)
    │   ├── signs-data.js    # Road signs + inline SVGs
    │   ├── vehicles-data.js # Licence categories
    │   └── quiz-data.js     # Quiz question bank
    ├── i18n.js              # Language state & helpers
    ├── ui.js               # Theme, routing, reveal, confetti, icons
    ├── signs.js            # Signs explorer
    ├── vehicles.js         # Vehicle categories
    ├── quiz.js             # Quiz engine
    └── app.js              # Bootstrap / wiring
```

## 🛠️ Extending the content

- **Add a sign:** append an entry to `SIGNS` in `js/data/signs-data.js`
  (reuse the `warn()`, `prohibit()`, `mandatory()`, `info()` SVG helpers).
- **Add a quiz question:** append to `QUESTIONS` in `js/data/quiz-data.js`.
  Set `cat` to a category id; optionally set `sign` to a sign `id` to show its
  graphic. `answer` is the 0-based index of the correct option.
- **Add a UI string:** add the same key to **both** `hu` and `en` in
  `js/data/translations.js`.

## ✅ Tech notes

- Vanilla HTML/CSS/JS — no framework, no bundler.
- Classic (non-module) scripts so it runs from `file://` as well as a server.
- CSS custom properties drive theming; signs are inline SVG for crisp, offline,
  animatable graphics.

---

Built for safer roads. 🚙💨
