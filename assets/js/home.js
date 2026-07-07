(function () {
  "use strict";

  function initHeroSlider() {
    const slides = Array.from(document.querySelectorAll("[data-home-slide]"));
    if (slides.length < 2) return;

    let index = 0;
    window.setInterval(() => {
      slides[index].classList.remove("is-active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("is-active");
    }, 5600);
  }

  function initProcessPanels() {
    const panels = Array.from(document.querySelectorAll(".path-panel"));
    if (!panels.length) return;
    panels[0].classList.add("is-active");
    panels.forEach((panel) => {
      panel.addEventListener("mouseenter", () => {
        panels.forEach((item) => item.classList.remove("is-active"));
        panel.classList.add("is-active");
      });
      panel.addEventListener("focusin", () => {
        panels.forEach((item) => item.classList.remove("is-active"));
        panel.classList.add("is-active");
      });
    });
  }

  function initParallax() {
    const bg = document.querySelector(".parallax-banner__bg");
    if (!bg || window.matchMedia("(max-width: 760px)").matches) return;

    const update = () => {
      const rect = bg.parentElement.getBoundingClientRect();
      const shift = Math.max(-32, Math.min(32, rect.top * -0.045));
      bg.style.setProperty("--parallax-shift", `${shift}px`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    initProcessPanels();
    initParallax();
  });
})();
