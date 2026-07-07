(function () {
  "use strict";

  function initServiceMiniNav() {
    const links = Array.from(document.querySelectorAll("[data-service-mini-link]"));
    if (!links.length) return;

    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const update = () => {
      const current = sections.find((section) => section.getBoundingClientRect().top > -80);
      if (!current) return;
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", initServiceMiniNav);
})();
