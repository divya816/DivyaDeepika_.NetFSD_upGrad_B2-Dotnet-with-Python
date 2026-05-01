window.ValidationService = (() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateSignupForm = ({ username, password, confirmPassword }) => {
    const errors = {};
    if (!username || !username.trim()) errors.signupUsername = "Username is required.";
    if (!password) errors.signupPassword = "Password is required.";
    else if (password.length < 6) errors.signupPassword = "Password must be at least 6 characters.";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
    return errors;
  };

  const validateLoginForm = ({ username, password }) => {
    const errors = {};
    if (!username || !username.trim()) errors.loginUsername = "Username is required.";
    if (!password) errors.loginPassword = "Password is required.";
    return errors;
  };

  const validateEmployeeForm = (employeeData) => {
    const errors = {};
    ["firstName","lastName","email","phone","department","designation","salary","joinDate","status"].forEach((field) => {
      if (employeeData[field] === undefined || employeeData[field] === null || `${employeeData[field]}`.trim?.() === "") {
        errors[field] = "This field is required.";
      }
    });
    if (employeeData.email && !emailRegex.test(employeeData.email)) errors.email = "Please enter a valid email address.";
    if (employeeData.phone && !phoneRegex.test(employeeData.phone)) errors.phone = "Phone number must contain exactly 10 digits.";
    if (employeeData.salary && Number(employeeData.salary) <= 0) errors.salary = "Salary must be a positive number.";
    return errors;
  };

  const mapServerErrors = (error) => {
    const errors = {};
    if (error?.status === 409 && /email/i.test(error.message || "")) errors.email = error.message;
    if (error?.status === 409 && /username/i.test(error.message || "")) errors.signupUsername = error.message;
    if (error?.payload?.errors) {
      Object.entries(error.payload.errors).forEach(([key, messages]) => {
        const first = Array.isArray(messages) ? messages[0] : messages;
        errors[key.charAt(0).toLowerCase() + key.slice(1)] = first;
      });
    }
    return errors;
  };

  return { validateSignupForm, validateLoginForm, validateEmployeeForm, mapServerErrors };
})();
