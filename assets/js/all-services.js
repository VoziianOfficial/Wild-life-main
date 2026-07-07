(function () {
  "use strict";

  function initShowcase() {
    const image = document.querySelector("[data-showcase-image]");
    const title = document.querySelector("[data-showcase-title]");
    const description = document.querySelector("[data-showcase-description]");
    const link = document.querySelector("[data-showcase-link]");
    const items = Array.from(document.querySelectorAll("[data-showcase-item]"));
    if (!image || !title || !description || !link || !items.length) return;

    const activate = (item) => {
      items.forEach((node) => node.classList.remove("is-active"));
      item.classList.add("is-active");
      image.style.opacity = "0";
      window.setTimeout(() => {
        image.src = item.dataset.image;
        image.alt = item.dataset.title;
        title.textContent = item.dataset.title;
        description.textContent = item.dataset.description;
        link.href = item.dataset.url;
        image.style.opacity = "1";
      }, 120);
    };

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => activate(item));
      item.addEventListener("focus", () => activate(item));
      item.addEventListener("click", () => activate(item));
    });

    activate(items[0]);
  }

  document.addEventListener("DOMContentLoaded", initShowcase);
})();
