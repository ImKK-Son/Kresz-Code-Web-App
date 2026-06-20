/* ============================================================
   KRESZ Code Web App — i18n / language management
   ============================================================ */
(function (global) {
  "use strict";

  const K = (global.KRESZ = global.KRESZ || {});
  const STORE_KEY = "kresz.lang";
  const SUPPORTED = ["hu", "en"];

  let lang =
    localStorage.getItem(STORE_KEY) ||
    (navigator.language && navigator.language.startsWith("en") ? "en" : "hu");
  if (!SUPPORTED.includes(lang)) lang = "hu";

  /** Translate a UI key. */
  function t(key) {
    const dict = K.TRANSLATIONS[lang] || {};
    return dict[key] != null ? dict[key] : key;
  }

  /** Translate a data object of shape { hu, en }. */
  function tr(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] != null ? obj[lang] : obj.hu || obj.en || "";
  }

  function getLang() {
    return lang;
  }

  /** Apply translations to all elements carrying data-i18n / data-i18n-attr. */
  function apply(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    scope.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      // format: "attr|key" (one or more, comma-separated)
      el.getAttribute("data-i18n-attr")
        .split(",")
        .forEach((pair) => {
          const [attr, key] = pair.split("|");
          if (attr && key) el.setAttribute(attr.trim(), t(key.trim()));
        });
    });
    document.documentElement.lang = lang;
  }

  function setLang(next) {
    if (!SUPPORTED.includes(next) || next === lang) return;
    lang = next;
    localStorage.setItem(STORE_KEY, lang);
    apply();
    // Notify views to re-render their dynamic content.
    document.dispatchEvent(new CustomEvent("kresz:langchange", { detail: { lang } }));
  }

  function toggle() {
    setLang(lang === "hu" ? "en" : "hu");
  }

  K.i18n = { t, tr, getLang, setLang, toggle, apply, SUPPORTED };
})(window);
