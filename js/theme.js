(function (global) {
  "use strict";

  var STORAGE_KEY = "portfolio-theme";
  var META_COLORS = { dark: "#0a0a0a", light: "#f8f8f8" };

  function applyTheme(theme) {
    if (theme !== "light" && theme !== "dark") theme = "dark";

    document.documentElement.setAttribute("data-theme", theme);

    var meta = document.getElementById("meta-theme-color");
    if (meta) meta.setAttribute("content", META_COLORS[theme]);

    document.querySelectorAll(".theme-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-theme-value") === theme;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore */
    }
  }

  function getInitialTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {
      /* ignore */
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  }

  function init() {
    var theme = document.documentElement.getAttribute("data-theme");
    if (theme !== "light" && theme !== "dark") {
      theme = getInitialTheme();
    }
    applyTheme(theme);

    document.querySelectorAll(".theme-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTheme(btn.getAttribute("data-theme-value"));
      });
    });
  }

  global.PortfolioTheme = { init: init, applyTheme: applyTheme };
})(window);
