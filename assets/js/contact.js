(function () {
  "use strict";

  const messages = {
    required: "This field is required.",
    email: "Enter a valid email address.",
    phone: "Enter a phone number with at least 7 digits.",
    privacy: "Please confirm the privacy acknowledgement before submitting."
  };

  function setError(field, message) {
    const error = document.querySelector(`[data-error-for="${field.name}"]`);
    if (error) error.textContent = message || "";
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validate(form) {
    let valid = true;
    const requiredFields = ["fullName", "email", "phone", "service", "message"];

    requiredFields.forEach((name) => {
      const field = form.elements[name];
      if (!field) return;
      const value = String(field.value || "").trim();
      let message = "";
      if (!value) message = messages.required;
      if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = messages.email;
      if (name === "phone" && value && value.replace(/\D/g, "").length < 7) message = messages.phone;
      setError(field, message);
      if (message) valid = false;
    });

    const consent = form.elements.privacyConsent;
    if (consent) {
      const message = consent.checked ? "" : messages.privacy;
      setError(consent, message);
      if (message) valid = false;
    }

    return valid;
  }

  function initContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const status = form.querySelector("[data-form-status]");
    const started = form.elements.formStartedAt;
    const source = form.elements.sourcePage;
    if (started) started.value = String(Math.floor(Date.now() / 1000));
    if (source) source.value = window.location.pathname.split("/").pop() || "contact.html";

    form.addEventListener("input", (event) => {
      if (event.target.name) setError(event.target, "");
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!validate(form)) {
        if (status) {
          status.textContent = "Please review the highlighted fields.";
          status.className = "form-status is-error";
        }
        return;
      }

      const submitButton = form.querySelector("[type='submit']");
      if (submitButton) submitButton.disabled = true;
      if (status) {
        status.textContent = "Submitting your request...";
        status.className = "form-status";
      }

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form)
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Submission failed.");
        }
        form.reset();
        if (started) started.value = String(Math.floor(Date.now() / 1000));
        if (source) source.value = window.location.pathname.split("/").pop() || "contact.html";
        if (status) {
          status.textContent = data.message || "Your request was sent. Please review any provider details before continuing.";
          status.className = "form-status is-success";
        }
      } catch (error) {
        if (status) {
          status.textContent = "We could not send the request right now. Please call or email Lacerta, or try again later.";
          status.className = "form-status is-error";
        }
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initContactForm);
})();
