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

  const parallaxSections = document.querySelectorAll(".lacerta-parallax-stats");

  const updateParallaxSections = () => {
    parallaxSections.forEach((section) => {
      const bg = section.querySelector(".lacerta-parallax-stats__bg");
      if (!bg) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewportHeight) return;

      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const move = (progress - 0.5) * 70;

      bg.style.transform = `translateY(${move}px)`;
    });
  };

  function initRequestVoicesSwiper(root = document) {
    const sliders = root.querySelectorAll(".lacerta-request-voices__swiper");

    sliders.forEach((slider) => {
      if (slider.classList.contains("is-initialized")) return;
      if (typeof Swiper === "undefined") return;

      slider.classList.add("is-initialized");

      new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 26,
        loop: true,
        speed: 700,
        grabCursor: true,
        autoplay: {
          delay: 4200,
          disableOnInteraction: false
        },
        pagination: {
          el: slider.querySelector(".lacerta-request-voices__pagination"),
          clickable: true
        },
        navigation: {
          nextEl: slider.querySelector(".lacerta-request-voices__next"),
          prevEl: slider.querySelector(".lacerta-request-voices__prev")
        },
        breakpoints: {
          980: {
            slidesPerView: 2,
            spaceBetween: 34
          }
        }
      });
    });
  }

  initRequestVoicesSwiper();

  let parallaxTicking = false;

  window.addEventListener("scroll", () => {
    if (parallaxTicking) return;

    window.requestAnimationFrame(() => {
      updateParallaxSections();
      parallaxTicking = false;
    });

    parallaxTicking = true;
  }, { passive: true });

  window.addEventListener("resize", updateParallaxSections);
  window.addEventListener("load", updateParallaxSections);

  function initParallax() {
    const bg = document.querySelector(".parallax-banner__bg");
    if (!bg || window.matchMedia("(max-width: 760px)").matches) return;

    const update = () => {
      const rect = bg.parentElement.getBoundingClientRect();
      const shift = Math.max(-68, Math.min(68, rect.top * -0.09));
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
