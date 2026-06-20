/* ============================================================
   KRESZ Code Web App — UI translations (i18n)
   Languages: Hungarian (hu) + English (en)
   ============================================================ */
(function (global) {
  "use strict";

  const TRANSLATIONS = {
    hu: {
      // --- App / brand ---
      "app.title": "KRESZ Tanuló",
      "app.tagline": "Magyar közúti közlekedési szabályok — táblák, járművek és kvízek",

      // --- Navigation ---
      "nav.home": "Főoldal",
      "nav.signs": "Táblák",
      "nav.vehicles": "Járművek",
      "nav.quiz": "Kvíz",
      "nav.about": "Névjegy",
      "nav.menu": "Menü",

      // --- Controls ---
      "ctrl.theme.toggle": "Téma váltása",
      "ctrl.lang.toggle": "Nyelv váltása",
      "ctrl.light": "Világos",
      "ctrl.dark": "Sötét",

      // --- Hero ---
      "hero.badge": "Magyarország · KRESZ",
      "hero.title": "Tanuld meg a KRESZ-t okosan",
      "hero.subtitle":
        "Interaktív magyarázatok a közúti jelzőtáblákról, minden járműkategóriához igazított kvízek, és látványos, modern felület — egy helyen.",
      "hero.cta.signs": "Táblák felfedezése",
      "hero.cta.quiz": "Kvíz indítása",
      "hero.stat.signs": "Közlekedési tábla",
      "hero.stat.vehicles": "Járműkategória",
      "hero.stat.questions": "Kvízkérdés",

      // --- Home features ---
      "home.features.title": "Amit a KRESZ Tanuló kínál",
      "home.features.subtitle": "Minden, ami a sikeres vizsgához kell — átláthatóan.",
      "home.feature.signs.title": "Táblamagyarázatok",
      "home.feature.signs.desc":
        "Több mint hatvan közlekedési tábla kategóriánként rendezve, részletes magyarázattal és kereséssel.",
      "home.feature.vehicles.title": "Minden járműkategória",
      "home.feature.vehicles.desc":
        "Segédmotortól (AM) a motorkerékpáron át a tehergépkocsiig és buszig — kategóriánkénti szabályok.",
      "home.feature.quiz.title": "Okos kvízek",
      "home.feature.quiz.desc":
        "Válassz járműkategóriát vagy témát, kapj azonnali visszajelzést és magyarázatot minden kérdéshez.",
      "home.feature.theme.title": "Testreszabható kinézet",
      "home.feature.theme.desc":
        "Sötét és világos téma, magyar és angol nyelv, finom animációk — ahogy neked kényelmes.",
      "home.cta.title": "Készen állsz a vizsgára?",
      "home.cta.desc": "Tedd próbára a tudásod egy gyors kvízzel bármelyik járműkategóriában.",
      "home.cta.button": "Kezdjük!",

      // --- Signs ---
      "signs.title": "Közlekedési táblák",
      "signs.subtitle": "Böngészd a táblákat kategóriánként, vagy keress rá névre.",
      "signs.search.placeholder": "Keresés tábla neve vagy leírás alapján…",
      "signs.filter.all": "Összes",
      "signs.count": "tábla",
      "signs.empty": "Nincs a keresésnek megfelelő tábla.",
      "signs.detail.meaning": "Jelentése",
      "signs.detail.category": "Kategória",
      "signs.detail.close": "Bezárás",
      "signs.detail.prev": "Előző",
      "signs.detail.next": "Következő",

      // --- Sign categories ---
      "cat.warning": "Veszélyt jelző táblák",
      "cat.priority": "Elsőbbséget szabályozó táblák",
      "cat.prohibitory": "Tilalmi táblák",
      "cat.mandatory": "Utasítást adó táblák",
      "cat.information": "Tájékoztató táblák",

      // --- Vehicles ---
      "vehicles.title": "Járműkategóriák",
      "vehicles.subtitle":
        "A magyar vezetői engedély kategóriái és a rájuk vonatkozó legfontosabb szabályok.",
      "vehicles.minage": "Korhatár",
      "vehicles.years": "év",
      "vehicles.maxspeed": "Sebesség",
      "vehicles.allows": "Mit vezethetsz vele",
      "vehicles.rules": "Fontos szabályok",
      "vehicles.quizcta": "Kvíz ehhez a kategóriához",

      // --- Quiz ---
      "quiz.title": "KRESZ Kvíz",
      "quiz.subtitle": "Válassz egy témát vagy járműkategóriát, és tedd próbára a tudásod!",
      "quiz.setup.category": "Válassz kategóriát",
      "quiz.setup.length": "Kérdések száma",
      "quiz.setup.start": "Kvíz indítása",
      "quiz.setup.all": "Vegyes (összes téma)",
      "quiz.questions": "kérdés",
      "quiz.question": "Kérdés",
      "quiz.of": "/",
      "quiz.score": "Pontszám",
      "quiz.next": "Következő",
      "quiz.finish": "Befejezés",
      "quiz.correct": "Helyes!",
      "quiz.incorrect": "Helytelen",
      "quiz.explanation": "Magyarázat",
      "quiz.skip": "Kihagyás",
      "quiz.results.title": "Kvíz eredménye",
      "quiz.results.perfect": "Tökéletes! Hibátlan teljesítmény! 🏆",
      "quiz.results.great": "Nagyszerű! Készen állsz a vizsgára. 🎉",
      "quiz.results.good": "Szép munka! Még egy kis gyakorlás és tökéletes lesz. 👍",
      "quiz.results.practice": "Ne add fel! Gyakorolj még a táblákkal. 💪",
      "quiz.results.youscored": "Elért eredményed:",
      "quiz.results.correct": "helyes válasz",
      "quiz.results.retry": "Újra",
      "quiz.results.review": "Válaszok átnézése",
      "quiz.results.newquiz": "Új kvíz",
      "quiz.review.title": "Válaszok áttekintése",
      "quiz.review.your": "A te válaszod",
      "quiz.review.correct": "Helyes válasz",
      "quiz.review.skipped": "(kihagyva)",
      "quiz.progress.best": "Legjobb eredmény",

      // --- Quiz categories ---
      "qcat.general": "Általános szabályok",
      "qcat.signs": "Táblafelismerés",
      "qcat.priority": "Elsőbbség és kereszteződés",
      "qcat.moped": "Segédmotor (AM)",
      "qcat.motorcycle": "Motorkerékpár (A)",
      "qcat.car": "Személygépkocsi (B)",
      "qcat.truck": "Tehergépkocsi (C)",
      "qcat.bus": "Autóbusz (D)",
      "qcat.bicycle": "Kerékpár",

      // --- About ---
      "about.title": "A KRESZ Tanulóról",
      "about.intro":
        "Ez az alkalmazás a magyar KRESZ (Közúti Rendelkezések Egységes Szabályozása) tanulását segíti modern, interaktív formában.",
      "about.disclaimer.title": "Fontos megjegyzés",
      "about.disclaimer.text":
        "Ez egy oktatási segédeszköz, és nem helyettesíti a hivatalos KRESZ tananyagot vagy a hatósági vizsgát. A pontos és aktuális szabályokért mindig a hatályos jogszabályokat és hivatalos forrásokat vedd alapul.",
      "about.features.title": "Funkciók",
      "about.feat.1": "Több mint 60 közlekedési tábla magyarázata kategóriánként",
      "about.feat.2": "Minden vezetői engedély kategória (AM, A, B, C, D, T és kerékpár)",
      "about.feat.3": "Interaktív kvízek azonnali visszajelzéssel és magyarázattal",
      "about.feat.4": "Sötét és világos téma, magyar és angol nyelv",
      "about.feat.5": "Az eredményeid a böngésződben tárolódnak — adatküldés nélkül",
      "about.tech.title": "Hogyan használd",
      "about.tech.text":
        "Böngészd a táblákat a részletes magyarázatokért, ismerd meg a járműkategóriákat, majd a kvízekkel ellenőrizd a tudásod. A téma és a nyelv a fejlécben bármikor váltható.",

      // --- Footer ---
      "footer.made": "Készült a biztonságosabb közlekedésért",
      "footer.disclaimer": "Oktatási célú alkalmazás — nem hivatalos forrás.",

      // --- Misc ---
      "misc.back": "Vissza",
      "misc.loading": "Betöltés…",
    },

    en: {
      // --- App / brand ---
      "app.title": "KRESZ Learner",
      "app.tagline": "Hungarian road rules — signs, vehicles and quizzes",

      // --- Navigation ---
      "nav.home": "Home",
      "nav.signs": "Signs",
      "nav.vehicles": "Vehicles",
      "nav.quiz": "Quiz",
      "nav.about": "About",
      "nav.menu": "Menu",

      // --- Controls ---
      "ctrl.theme.toggle": "Toggle theme",
      "ctrl.lang.toggle": "Switch language",
      "ctrl.light": "Light",
      "ctrl.dark": "Dark",

      // --- Hero ---
      "hero.badge": "Hungary · Highway Code",
      "hero.title": "Master the Hungarian road code",
      "hero.subtitle":
        "Interactive explanations of road signs, quizzes tailored to every vehicle category, and a sleek, modern interface — all in one place.",
      "hero.cta.signs": "Explore signs",
      "hero.cta.quiz": "Start a quiz",
      "hero.stat.signs": "Road signs",
      "hero.stat.vehicles": "Vehicle categories",
      "hero.stat.questions": "Quiz questions",

      // --- Home features ---
      "home.features.title": "What KRESZ Learner offers",
      "home.features.subtitle": "Everything you need to pass the exam — clearly laid out.",
      "home.feature.signs.title": "Sign explanations",
      "home.feature.signs.desc":
        "Over sixty road signs organised by category, with detailed explanations and instant search.",
      "home.feature.vehicles.title": "Every vehicle category",
      "home.feature.vehicles.desc":
        "From moped (AM) through motorcycles to trucks and buses — rules broken down per category.",
      "home.feature.quiz.title": "Smart quizzes",
      "home.feature.quiz.desc":
        "Pick a vehicle category or topic, get instant feedback and an explanation for every question.",
      "home.feature.theme.title": "Make it yours",
      "home.feature.theme.desc":
        "Dark and light themes, Hungarian and English, smooth animations — set up the way you like it.",
      "home.cta.title": "Ready for the exam?",
      "home.cta.desc": "Put your knowledge to the test with a quick quiz in any vehicle category.",
      "home.cta.button": "Let's go!",

      // --- Signs ---
      "signs.title": "Road signs",
      "signs.subtitle": "Browse signs by category, or search by name.",
      "signs.search.placeholder": "Search by sign name or description…",
      "signs.filter.all": "All",
      "signs.count": "signs",
      "signs.empty": "No signs match your search.",
      "signs.detail.meaning": "Meaning",
      "signs.detail.category": "Category",
      "signs.detail.close": "Close",
      "signs.detail.prev": "Previous",
      "signs.detail.next": "Next",

      // --- Sign categories ---
      "cat.warning": "Warning signs",
      "cat.priority": "Priority signs",
      "cat.prohibitory": "Prohibitory signs",
      "cat.mandatory": "Mandatory signs",
      "cat.information": "Information signs",

      // --- Vehicles ---
      "vehicles.title": "Vehicle categories",
      "vehicles.subtitle":
        "The categories of the Hungarian driving licence and the key rules that apply to each.",
      "vehicles.minage": "Minimum age",
      "vehicles.years": "years",
      "vehicles.maxspeed": "Speed",
      "vehicles.allows": "What you may drive",
      "vehicles.rules": "Key rules",
      "vehicles.quizcta": "Quiz for this category",

      // --- Quiz ---
      "quiz.title": "KRESZ Quiz",
      "quiz.subtitle": "Choose a topic or vehicle category and put your knowledge to the test!",
      "quiz.setup.category": "Choose a category",
      "quiz.setup.length": "Number of questions",
      "quiz.setup.start": "Start quiz",
      "quiz.setup.all": "Mixed (all topics)",
      "quiz.questions": "questions",
      "quiz.question": "Question",
      "quiz.of": "of",
      "quiz.score": "Score",
      "quiz.next": "Next",
      "quiz.finish": "Finish",
      "quiz.correct": "Correct!",
      "quiz.incorrect": "Incorrect",
      "quiz.explanation": "Explanation",
      "quiz.skip": "Skip",
      "quiz.results.title": "Quiz results",
      "quiz.results.perfect": "Perfect! A flawless run! 🏆",
      "quiz.results.great": "Great job! You're ready for the exam. 🎉",
      "quiz.results.good": "Nice work! A little more practice and you've got it. 👍",
      "quiz.results.practice": "Don't give up! Keep practising the signs. 💪",
      "quiz.results.youscored": "Your result:",
      "quiz.results.correct": "correct answers",
      "quiz.results.retry": "Retry",
      "quiz.results.review": "Review answers",
      "quiz.results.newquiz": "New quiz",
      "quiz.review.title": "Answer review",
      "quiz.review.your": "Your answer",
      "quiz.review.correct": "Correct answer",
      "quiz.review.skipped": "(skipped)",
      "quiz.progress.best": "Best score",

      // --- Quiz categories ---
      "qcat.general": "General rules",
      "qcat.signs": "Sign recognition",
      "qcat.priority": "Priority & junctions",
      "qcat.moped": "Moped (AM)",
      "qcat.motorcycle": "Motorcycle (A)",
      "qcat.car": "Car (B)",
      "qcat.truck": "Truck (C)",
      "qcat.bus": "Bus (D)",
      "qcat.bicycle": "Bicycle",

      // --- About ---
      "about.title": "About KRESZ Learner",
      "about.intro":
        "This app helps you learn the Hungarian highway code (KRESZ) in a modern, interactive way.",
      "about.disclaimer.title": "Important note",
      "about.disclaimer.text":
        "This is an educational aid and does not replace the official KRESZ curriculum or the state exam. Always rely on the current legislation and official sources for precise, up-to-date rules.",
      "about.features.title": "Features",
      "about.feat.1": "Explanations for 60+ road signs, organised by category",
      "about.feat.2": "Every licence category (AM, A, B, C, D, T and bicycle)",
      "about.feat.3": "Interactive quizzes with instant feedback and explanations",
      "about.feat.4": "Dark and light themes, Hungarian and English languages",
      "about.feat.5": "Your results are stored in your browser — no data is sent anywhere",
      "about.tech.title": "How to use it",
      "about.tech.text":
        "Browse the signs for detailed explanations, learn the vehicle categories, then check your knowledge with the quizzes. Switch theme and language any time from the header.",

      // --- Footer ---
      "footer.made": "Built for safer roads",
      "footer.disclaimer": "Educational app — not an official source.",

      // --- Misc ---
      "misc.back": "Back",
      "misc.loading": "Loading…",
    },
  };

  global.KRESZ = global.KRESZ || {};
  global.KRESZ.TRANSLATIONS = TRANSLATIONS;
})(window);
