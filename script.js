(function () {
  const form = document.getElementById("access-form");
  if (!form) return;

  const fields = {
    firstName: document.getElementById("firstName"),
    email: document.getElementById("email"),
    homeownerStatus: document.getElementById("homeownerStatus"),
    interest: document.getElementById("interest"),
    cityState: document.getElementById("cityState"),
    concern: document.getElementById("concern"),
  };

  const status = document.getElementById("form-status");

  function setError(name, message) {
    const field = fields[name];
    const error = document.getElementById(name + "-error");
    if (!field || !error) return;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message || "";
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function validate() {
    const values = {
      firstName: fields.firstName.value.trim(),
      email: fields.email.value.trim(),
      homeownerStatus: fields.homeownerStatus.value.trim(),
      interest: fields.interest.value.trim(),
      cityState: fields.cityState.value.trim(),
      concern: fields.concern.value.trim(),
    };

    const errors = {};

    if (!values.firstName) {
      errors.firstName = "Please enter your first name.";
    }

    if (!values.email) {
      errors.email = "Please enter your email address.";
    } else if (!validateEmail(values.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!values.homeownerStatus) {
      errors.homeownerStatus = "Please choose the option that fits best.";
    }

    if (!values.interest) {
      errors.interest = "Please tell us what brought you here.";
    } else if (values.interest.length < 8) {
      errors.interest = "Please add a little more detail.";
    }

    if (values.cityState && values.cityState.length < 2) {
      errors.cityState = "Please enter a valid city/state.";
    }

    return errors;
  }

  Object.keys(fields).forEach(function (name) {
    const field = fields[name];
    if (!field) return;
    field.addEventListener("input", function () {
      setError(name, "");
      if (status) status.hidden = true;
    });
    field.addEventListener("change", function () {
      setError(name, "");
      if (status) status.hidden = true;
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const errors = validate();
    const names = Object.keys(fields);

    names.forEach(function (name) {
      setError(name, errors[name] || "");
    });

    if (Object.keys(errors).length > 0) {
      if (status) status.hidden = false;
      const firstErrorField = names.map(function (name) { return fields[name]; }).find(function (field) {
        return field && field.getAttribute("aria-invalid") === "true";
      });
      if (firstErrorField) firstErrorField.focus();
      return;
    }

    window.location.href = "./confirmation.html";
  });
})();
