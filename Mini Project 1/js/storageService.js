window.StorageService = (() => {
  const EMPLOYEE_KEY = "UpHire_employees";
  const ADMIN_KEY = "UpHire_admin";
  const SESSION_KEY = "UpHire_session";

  const clone = (value) => JSON.parse(JSON.stringify(value));

  const init = () => {
    if (!localStorage.getItem(EMPLOYEE_KEY)) {
      localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(AppData.seedEmployees));
    }

    if (!localStorage.getItem(ADMIN_KEY)) {
      localStorage.setItem(ADMIN_KEY, JSON.stringify(AppData.seedAdmin));
    }
  };

  const getEmployees = () => clone(JSON.parse(localStorage.getItem(EMPLOYEE_KEY) || "[]"));

  const setEmployees = (employees) => {
    localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employees));
    return clone(employees);
  };

  const getAdmin = () => clone(JSON.parse(localStorage.getItem(ADMIN_KEY) || "{}"));

  const setAdmin = (admin) => {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
    return clone(admin);
  };

  const setSession = (sessionData) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  };

  const getSession = () => clone(JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"));

  const clearSession = () => {
    sessionStorage.removeItem(SESSION_KEY);
  };

  const nextEmployeeId = () => {
    const employees = getEmployees();
    if (!employees.length) return 1;
    return Math.max(...employees.map((employee) => employee.id)) + 1;
  };

  return {
    init,
    getEmployees,
    setEmployees,
    getAdmin,
    setAdmin,
    setSession,
    getSession,
    clearSession,
    nextEmployeeId
  };
})();