window.StorageService = (() => {
  const buildHeaders = (withAuth = true) => {
    const headers = { "Content-Type": "application/json" };
    if (withAuth && window.AuthService?.getToken) {
      const token = window.AuthService.getToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  const parseResponse = async (response) => {
    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const error = new Error(payload?.message || payload?.title || `HTTP ${response.status}`);
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return payload;
  };

  const request = async (path, options = {}) => {
    const response = await fetch(`${AppConfig.API_BASE_URL}${path}`, {
      ...options,
      headers: { ...buildHeaders(options.withAuth !== false), ...(options.headers || {}) }
    });
    return parseResponse(response);
  };

  return {
    register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data), withAuth: false }),
    login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data), withAuth: false }),
    getEmployees: (queryString = "") => request(`/employees${queryString}`),
    getEmployeeById: (id) => request(`/employees/${id}`),
    getDashboard: () => request("/employees/dashboard"),
    addEmployee: (data) => request("/employees", { method: "POST", body: JSON.stringify(data) }),
    updateEmployee: (id, data) => request(`/employees/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    removeEmployee: (id) => request(`/employees/${id}`, { method: "DELETE" })
  };
})();
