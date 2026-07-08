(function () {
  "use strict";

  const config = window.LACERTA_CONFIG || {};
  const serviceIconMap = {
    "Raccoon Removal": "paw-print",
    "Squirrel Removal": "tree-pine",
    "Bat Removal": "moon",
    "Bird Control": "feather",
    "Snake Removal": "waves",
    "Attic Wildlife Cleanup": "home"
  };

  function getConfig(path) {
    return path.split(".").reduce((value, key) => value && value[key], config) || "";
  }

  function pageName() {
    const name = window.location.pathname.split("/").pop();
    return name || "index.html";
  }

  function serviceLinks(extraClass) {
    return (config.services || []).map((service) => {
      const icon = serviceIconMap[service.title] || "leaf";
      return `<a class="${extraClass || ""}" href="${service.url}">
        <span>${service.title}</span>
        <i data-lucide="${icon}" aria-hidden="true"></i>
      </a>`;
    }).join("");
  }

  function injectHeader() {
    const host = document.querySelector("[data-site-header]");
    if (!host) return;

    host.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header" data-header>
        <div class="header-shell">
          <a class="brand-link" href="index.html" aria-label="Lacerta home">
            <img src="assets/images/logo.svg" alt="Lacerta" width="380" height="84">
          </a>

          <nav class="desktop-nav" aria-label="Primary navigation">
            <a href="index.html" data-nav-link>Home</a>
            <a href="about.html" data-nav-link>About</a>
            <div class="nav-services" data-services-menu>
              <a href="all-services.html" data-nav-link>Services</a>
              <button class="services-toggle" type="button" aria-expanded="false" aria-label="Open services menu" data-services-toggle>
                <i data-lucide="chevron-down" aria-hidden="true"></i>
              </button>
              <div class="services-dropdown" role="menu" data-services-dropdown>
                ${serviceLinks("dropdown-link")}
              </div>
            </div>
            <a href="contact.html" data-nav-link>Contact</a>
          </nav>

          <div class="header-actions">
            <a class="icon-button" href="${config.contact.phoneHref}" aria-label="Start request by phone" data-phone-href>
              <i data-lucide="phone" aria-hidden="true"></i>
            </a>
            <a class="icon-button desktop-only" href="contact.html" aria-label="Open contact page">
              <i data-lucide="mail" aria-hidden="true"></i>
            </a>
            <button class="menu-button" type="button" aria-label="Open menu" aria-controls="mobileMenu" aria-expanded="false" data-menu-button>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M4 7h16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path>
                <path d="M7 12h13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path>
                <path d="M4 17h16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div class="mobile-menu" id="mobileMenu" aria-hidden="true" data-mobile-menu>
        <div class="mobile-menu__watermark" aria-hidden="true"></div>
        <div class="mobile-menu__top">
          <img src="assets/images/logo.svg" alt="Lacerta" width="380" height="84">
          <button class="icon-button mobile-menu__close" type="button" aria-label="Close menu" data-menu-close>
            <i data-lucide="x" aria-hidden="true"></i>
          </button>
        </div>
        <nav class="mobile-menu__nav" aria-label="Mobile navigation">
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="all-services.html">Services</a>
          <a href="contact.html">Contact</a>
        </nav>
        <div class="mobile-menu__services">
          <p>Provider Categories</p>
          ${serviceLinks("mobile-service-link")}
        </div>
        <div class="mobile-menu__contact">
          <a href="${config.contact.phoneHref}" data-phone-href><i data-lucide="phone" aria-hidden="true"></i><span data-config="contact.phoneDisplay"></span></a>
          <a href="${config.contact.emailHref}" data-email-href><i data-lucide="mail" aria-hidden="true"></i><span data-config="contact.email"></span></a>
        </div>
        <p class="mobile-menu__note">Lacerta is an independent platform. We help homeowners submit wildlife concerns and compare available local provider options.</p>
      </div>
    `;
  }

  function injectFooter() {
    const host = document.querySelector("[data-site-footer]");
    if (!host) return;

    host.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a href="index.html" aria-label="Lacerta home"><img src="assets/images/logo.svg" alt="Lacerta" width="380" height="84"></a>
            <p>${config.footer.description}</p>
            <div class="footer-contact">
              <a href="${config.contact.phoneHref}" data-phone-href><i data-lucide="phone" aria-hidden="true"></i><span data-config="contact.phoneDisplay"></span></a>
              <a href="${config.contact.emailHref}" data-email-href><i data-lucide="mail" aria-hidden="true"></i><span data-config="contact.email"></span></a>
            </div>
          </div>
          <div class="footer-col">
            <h2>Company</h2>
            <p>${config.company.legalName}</p>
            <p>Company ID: ${config.company.companyId}</p>
            <p>${config.company.address}<br>${config.company.cityStateZip}<br>${config.company.country}</p>
            <p>Service area: ${config.company.serviceArea}</p>
          </div>
          <div class="footer-col">
            <h2>Navigation</h2>
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="all-services.html">Services</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="footer-col">
            <h2>Service Links</h2>
            ${(config.services || []).map((service) => `<a href="${service.url}">${service.title}</a>`).join("")}
          </div>
          <div class="footer-col">
            <h2>Legal</h2>
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="terms-of-service.html">Terms of Service</a>
            <a href="cookie-policy.html">Cookie Policy</a>
          </div>
        </div>
        <div class="container footer-disclaimer">
          <p>${config.legal.shortDisclaimer}</p>
          <p>${config.legal.fullDisclaimer}</p>
        </div>
        <div class="container footer-bottom">
          <p>${config.footer.copyright}</p>
          <p>${config.brand.tagline}</p>
        </div>
      </footer>
    `;
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function compact(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function getFullAddress() {
    return [
      config.company && config.company.address,
      config.company && config.company.cityStateZip,
      config.company && config.company.country
    ].filter(Boolean).join(", ");
  }

  function uniqueList(list) {
    return Array.from(new Set((list || []).map(compact).filter(Boolean)));
  }

  function buildConfigReplacementPairs() {
    const replace = config.replace || {};

    const fullAddress = getFullAddress();

    const pairs = [
      ...uniqueList(replace.brandNames).map((oldValue) => [oldValue, config.brand && config.brand.name]),

      ...uniqueList(replace.legalNames).map((oldValue) => [oldValue, config.company && config.company.legalName]),

      ...uniqueList(replace.companyIds).map((oldValue) => [oldValue, config.company && config.company.companyId]),

      ...uniqueList(replace.phones).map((oldValue) => [oldValue, config.contact && config.contact.phoneDisplay]),

      ...uniqueList(replace.emails).map((oldValue) => [oldValue, config.contact && config.contact.email]),

      ...uniqueList(replace.taglines).map((oldValue) => [oldValue, config.brand && config.brand.tagline]),

      ...uniqueList(replace.addresses).map((oldValue) => {
        if (oldValue.includes(",") || oldValue.includes("Street") || oldValue.includes("Way")) {
          return [oldValue, fullAddress];
        }

        return [oldValue, fullAddress];
      }),

      ["Company ID: LCW-US-48291", `Company ID: ${config.company && config.company.companyId}`],
      ["Service area: Selected local markets", `Service area: ${config.company && config.company.serviceArea}`],

      ["© 2026 Lacerta Matching Group LLC. All rights reserved.", config.footer && config.footer.copyright]
    ];

    return pairs
      .filter(([oldValue, newValue]) => compact(oldValue) && compact(newValue))
      .sort((a, b) => String(b[0]).length - String(a[0]).length);
  }

  function replaceConfigValue(value, pairs) {
    if (!value || typeof value !== "string") return value;

    let output = value;

    pairs.forEach(([oldValue, newValue]) => {
      if (!oldValue || !newValue || oldValue === newValue) return;

      output = output.replace(
        new RegExp(escapeRegExp(oldValue), "g"),
        String(newValue)
      );
    });

    return output;
  }

  function replaceTextNodes(root, pairs) {
    const walker = document.createTreeWalker(
      root || document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;

          if (!parent) return NodeFilter.FILTER_REJECT;

          if (parent.closest("script, style, noscript, svg")) {
            return NodeFilter.FILTER_REJECT;
          }

          if (!compact(node.nodeValue)) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      const nextValue = replaceConfigValue(node.nodeValue, pairs);

      if (nextValue !== node.nodeValue) {
        node.nodeValue = nextValue;
      }
    });
  }

  function replaceElementAttributes(root, pairs) {
    const attributes = [
      "alt",
      "title",
      "aria-label",
      "placeholder",
      "content",
      "value"
    ];

    (root || document).querySelectorAll("*").forEach((element) => {
      attributes.forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;

        const currentValue = element.getAttribute(attribute);
        const nextValue = replaceConfigValue(currentValue, pairs);

        if (nextValue !== currentValue) {
          element.setAttribute(attribute, nextValue);
        }
      });
    });
  }

  function updateContactLinksAndForms(root) {
    const scope = root || document;

    if (config.contact && config.contact.phoneHref) {
      scope.querySelectorAll('a[href^="tel:"], [data-phone-href]').forEach((link) => {
        link.setAttribute("href", config.contact.phoneHref);
      });
    }

    if (config.contact && config.contact.emailHref) {
      scope.querySelectorAll('a[href^="mailto:"], [data-email-href]').forEach((link) => {
        link.setAttribute("href", config.contact.emailHref);
      });
    }

    if (config.form && config.form.endpoint) {
      scope.querySelectorAll("form").forEach((form) => {
        form.setAttribute("action", config.form.endpoint);
      });
    }
  }

  function updateHeadConfig(pairs) {
    document.title = replaceConfigValue(document.title, pairs);

    document.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"]').forEach((meta) => {
      const currentValue = meta.getAttribute("content");
      const nextValue = replaceConfigValue(currentValue, pairs);

      if (nextValue !== currentValue) {
        meta.setAttribute("content", nextValue);
      }
    });

    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      const nextValue = replaceConfigValue(script.textContent, pairs);

      if (nextValue !== script.textContent) {
        script.textContent = nextValue;
      }
    });
  }

  function hydrateConfigText(root) {
    const scope = root || document;
    const pairs = buildConfigReplacementPairs();

    scope.querySelectorAll("[data-config]").forEach((node) => {
      node.textContent = getConfig(node.getAttribute("data-config"));
    });

    scope.querySelectorAll("[data-company-phone]").forEach((node) => {
      node.textContent = config.contact.phoneDisplay || "";
    });

    scope.querySelectorAll("[data-company-email]").forEach((node) => {
      node.textContent = config.contact.email || "";
    });

    scope.querySelectorAll("[data-company-address]").forEach((node) => {
      node.textContent = getFullAddress();
    });

    updateContactLinksAndForms(scope);
    replaceTextNodes(scope.body || scope, pairs);
    replaceElementAttributes(scope, pairs);
    updateHeadConfig(pairs);
  }

  function setActiveNav() {
    const current = pageName();
    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      const href = link.getAttribute("href");
      const isServicesPage = current.includes("removal") || current.includes("bird-control") || current.includes("attic-wildlife");
      const active = href === current || (href === "all-services.html" && isServicesPage);
      if (active) link.setAttribute("aria-current", "page");
    });
  }

  function setupStickyHeader() {
    const header = document.querySelector("[data-header]");
    if (!header) return;
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupServicesDropdown() {
    const menu = document.querySelector("[data-services-menu]");
    const button = document.querySelector("[data-services-toggle]");
    const dropdown = document.querySelector("[data-services-dropdown]");
    if (!menu || !button || !dropdown) return;

    let closeTimer;
    const open = () => {
      window.clearTimeout(closeTimer);
      menu.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      closeTimer = window.setTimeout(() => {
        menu.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
      }, 160);
    };

    menu.addEventListener("mouseenter", open);
    menu.addEventListener("mouseleave", close);
    menu.addEventListener("focusin", open);
    menu.addEventListener("focusout", close);
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      if (expanded) {
        menu.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
      } else {
        open();
      }
    });
  }

  function setupMobileMenu() {
    const button = document.querySelector("[data-menu-button]");
    const closeButton = document.querySelector("[data-menu-close]");
    const menu = document.querySelector("[data-mobile-menu]");
    if (!button || !menu) return;

    const open = () => {
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      button.setAttribute("aria-expanded", "true");
      document.body.classList.add("is-menu-open");
      const firstLink = menu.querySelector("a, button");
      if (firstLink) firstLink.focus({ preventScroll: true });
    };

    const close = () => {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      button.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-menu-open");
      button.focus({ preventScroll: true });
    };

    button.addEventListener("click", open);
    if (closeButton) closeButton.addEventListener("click", close);
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) close();
    });
  }

  function setupCookieBanner() {
    const key = "lacertaCookieConsent";
    let stored = null;
    try {
      stored = window.localStorage.getItem(key);
    } catch (error) {
      stored = null;
    }
    if (stored) return;

    const banner = document.createElement("aside");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML = `
      <p>We use essential browser storage to remember your cookie choice and improve this website experience. Review our <a href="privacy-policy.html">Privacy Policy</a>, <a href="cookie-policy.html">Cookie Policy</a>, and <a href="terms-of-service.html">Terms</a>.</p>
      <div class="cookie-banner__actions">
        <button class="button button--small button--gold" type="button" data-cookie-choice="accepted">Accept</button>
        <button class="button button--small button--ghost-light" type="button" data-cookie-choice="declined">Decline</button>
      </div>
    `;
    document.body.appendChild(banner);

    banner.querySelectorAll("[data-cookie-choice]").forEach((choice) => {
      choice.addEventListener("click", () => {
        try {
          window.localStorage.setItem(key, choice.getAttribute("data-cookie-choice"));
        } catch (error) {
          document.cookie = `${key}=${choice.getAttribute("data-cookie-choice")}; path=/; max-age=31536000; SameSite=Lax`;
        }
        banner.remove();
      });
    });
  }

  function initAccordions(root) {
    (root || document).querySelectorAll("[data-accordion]").forEach((accordion) => {
      accordion.querySelectorAll("[data-accordion-button]").forEach((button) => {
        button.addEventListener("click", () => {
          const item = button.closest("[data-accordion-item]");
          if (!item) return;
          const isOpen = item.classList.contains("is-open");
          accordion.querySelectorAll("[data-accordion-item]").forEach((sibling) => {
            sibling.classList.remove("is-open");
            const siblingButton = sibling.querySelector("[data-accordion-button]");
            if (siblingButton) siblingButton.setAttribute("aria-expanded", "false");
          });
          if (!isOpen) {
            item.classList.add("is-open");
            button.setAttribute("aria-expanded", "true");
          }
        });
      });
    });
  }

  function initScrollSliders(root) {
    (root || document).querySelectorAll("[data-scroll-slider]").forEach((slider) => {
      const track = slider.querySelector("[data-slider-track]");
      const prev = slider.querySelector("[data-slider-prev]");
      const next = slider.querySelector("[data-slider-next]");
      if (!track) return;

      const scroll = (direction) => {
        const amount = Math.max(280, track.clientWidth * 0.76);
        track.scrollBy({ left: direction * amount, behavior: "smooth" });
      };

      if (prev) prev.addEventListener("click", () => scroll(-1));
      if (next) next.addEventListener("click", () => scroll(1));
    });
  }

  function initLibraries() {
    if (window.AOS) {
      window.AOS.init({
        duration: 720,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
        disable: window.matchMedia("(max-width: 520px)").matches ? "phone" : false
      });
    } else {
      document.querySelectorAll("[data-aos]").forEach((node) => node.classList.add("aos-animate"));
    }

    if (window.lucide) {
      window.lucide.createIcons({
        attrs: {
          "stroke-width": 1.8
        }
      });
    }
  }

  function init() {
    injectHeader();
    injectFooter();
    hydrateConfigText();
    setActiveNav();
    setupStickyHeader();
    setupServicesDropdown();
    setupMobileMenu();
    setupCookieBanner();
    initAccordions();
    initScrollSliders();
    initLibraries();
  }

  window.Lacerta = {
    config,
    getConfig,
    hydrateConfigText,
    initAccordions,
    initScrollSliders,
    initLibraries
  };

  document.addEventListener("DOMContentLoaded", init);
})();
