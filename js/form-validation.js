/* =========================================================
   WALKADON LOGISTICS — Web3Forms AJAX Validation
========================================================= */

(function () {
  "use strict";

  const forms = document.querySelectorAll("[data-validate]");
  if (!forms.length) return;

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRx = /^[+\-\d\s()]{7,}$/;

  const showError = (input, msg) => {
    input.classList.add("invalid");
    const err = input.closest(".form__group")?.querySelector(".error");
    if (err) err.textContent = msg;
  };

  const clearError = (input) => {
    input.classList.remove("invalid");
    const err = input.closest(".form__group")?.querySelector(".error");
    if (err) err.textContent = "";
  };

  const validateField = (input) => {
    const value = (input.value || "").trim();

    if (input.hasAttribute("required") && !value) {
      showError(input, "This field is required.");
      return false;
    }

    if (input.type === "email" && value && !emailRx.test(value)) {
      showError(input, "Please enter a valid email address.");
      return false;
    }

    if (input.type === "tel" && value && !phoneRx.test(value)) {
      showError(input, "Please enter a valid phone number.");
      return false;
    }

    clearError(input);
    return true;
  };

  forms.forEach((form) => {
    const fields = form.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let valid = true;

      fields.forEach((field) => {
        if (!validateField(field)) valid = false;
      });

      if (!valid) {
        form.querySelector(".invalid")?.focus();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      const originalHTML = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = "Sending...";

      try {

        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form)
        });

        const data = await response.json();

        if (data.success) {

          const success = form.querySelector(".form__success");

          if (success) {
            success.classList.add("is-visible");
            success.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }

          form.reset();

        } else {

          alert(data.message || "Failed to send message.");

        }

      } catch (err) {

        alert("Network error. Please try again.");

      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;

    });

  });

})();