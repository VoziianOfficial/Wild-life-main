function initServiceCounters(root = document) {
  const sections = root.querySelectorAll("[data-count-section]");

  sections.forEach((section) => {
    if (section.classList.contains("is-counted")) return;

    const counters = section.querySelectorAll("[data-service-count]");
    if (!counters.length) return;

    const runCounters = () => {
      section.classList.add("is-counted");

      counters.forEach((counter) => {
        const target = Number.parseInt(counter.dataset.count || "0", 10);
        const duration = 900;
        const startTime = performance.now();

        const update = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(target * eased);

          counter.textContent = String(value).padStart(2, "0");

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = String(target).padStart(2, "0");
          }
        };

        requestAnimationFrame(update);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounters();
        observer.disconnect();
      });
    }, { threshold: 0.35 });

    observer.observe(section);
  });
}

initServiceCounters();


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
