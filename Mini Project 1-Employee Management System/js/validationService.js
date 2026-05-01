window.ValidationService = (() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const validateSignupForm = ({
    fullName,
    employeeIdSignup,
    signupEmail,
    signupPhone,
    dob,
    gender,
    username,
    password,
    confirmPassword
  }) => {
    const errors = {};

    if (!fullName || !fullName.trim()) {
      errors.fullName = "Full name is required.";
    }

    if (!employeeIdSignup || !employeeIdSignup.trim()) {
      errors.employeeIdSignup = "Employee ID is required.";
    }

    if (!signupEmail || !signupEmail.trim()) {
      errors.signupEmail = "Email address is required.";
    } else if (!emailRegex.test(signupEmail)) {
      errors.signupEmail = "Please enter a valid email address.";
    }

    if (!signupPhone || !signupPhone.trim()) {
      errors.signupPhone = "Phone number is required.";
    } else if (!phoneRegex.test(signupPhone)) {
      errors.signupPhone = "Phone number must contain exactly 10 digits.";
    }

    if (!dob || !dob.trim()) {
      errors.dob = "Date of birth is required.";
    }

    if (!gender || !gender.trim()) {
      errors.gender = "Gender is required.";
    }

    if (!username || !username.trim()) {
      errors.signupUsername = "Username is required.";
    }

    if (!password) {
      errors.signupPassword = "Password is required.";
    } else if (password.length < 6) {
      errors.signupPassword = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const validateLoginForm = ({ username, password }) => {
    const errors = {};

    if (!username || !username.trim()) {
      errors.loginUsername = "Username is required.";
    }

    if (!password) {
      errors.loginPassword = "Password is required.";
    }

    return errors;
  };

  const validateEmployeeForm = (employeeData, editingId = null) => {
    const errors = {};

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "department",
      "designation",
      "salary",
      "joinDate",
      "status",
      "workMode"
    ];

    requiredFields.forEach((field) => {
      if (!employeeData[field] || `${employeeData[field]}`.trim() === "") {
        errors[field] = "This field is required.";
      }
    });

    if (employeeData.email && !emailRegex.test(employeeData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (employeeData.phone && !phoneRegex.test(employeeData.phone)) {
      errors.phone = "Phone number must contain exactly 10 digits.";
    }

    if (employeeData.salary && Number(employeeData.salary) <= 0) {
      errors.salary = "Salary must be a positive number.";
    }

    const duplicateEmail = EmployeeService.getAll().find((employee) => {
      const sameEmail = employee.email.toLowerCase() === employeeData.email.toLowerCase();
      const differentRecord = editingId ? employee.id !== Number(editingId) : true;
      return sameEmail && differentRecord;
    });

    if (duplicateEmail) {
      errors.email = "This email already exists.";
    }

    return errors;
  };

  return {
    validateSignupForm,
    validateLoginForm,
    validateEmployeeForm
  };
})();