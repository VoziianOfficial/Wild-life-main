(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".legal-sidebar a").forEach((link) => {
      link.addEventListener("click", () => {
        link.blur();
      });
    });
  });
})();
