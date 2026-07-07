(function () {
  "use strict";

  function initProviderTabs() {
    const tabs = Array.from(document.querySelectorAll("[data-provider-tab]"));
    const panels = Array.from(document.querySelectorAll("[data-provider-panel]"));
    if (!tabs.length || !panels.length) return;

    const activate = (id) => {
      tabs.forEach((tab) => {
        const active = tab.dataset.providerTab === id;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.providerPanel === id);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activate(tab.dataset.providerTab));
    });

    activate(tabs[0].dataset.providerTab);
  }

  document.addEventListener("DOMContentLoaded", initProviderTabs);
})();
