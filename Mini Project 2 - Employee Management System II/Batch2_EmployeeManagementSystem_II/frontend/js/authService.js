window.AuthService = (() => {
  let _session = null;

  const normalizeRole = (role) => role || "Viewer";

  const signup = async (username, password, role = "Viewer") => {
    const result = await StorageService.register({ username, password, role });
    return {
      success: !!result?.success,
      message: result?.message || "Registration completed.",
      role: normalizeRole(result?.role),
      username: result?.username || username,
      token: result?.token || ""
    };
  };

  const login = async (username, password) => {
    const result = await StorageService.login({ username, password });

    if (!result?.success) {
      return { success: false, message: result?.message || "Invalid credentials." };
    }

    _session = {
      username: result.username,
      role: normalizeRole(result.role),
      token: result.token,
      loginTime: new Date().toISOString()
    };

    return { success: true, user: { username: _session.username, role: _session.role } };
  };

  const logout = () => { _session = null; };
  const isLoggedIn = () => !!_session?.token;
  const getCurrentUser = () => _session;
  const getToken = () => _session?.token || "";
  const getRole = () => _session?.role || "Viewer";
  const isAdmin = () => getRole() === "Admin";

  return { signup, login, logout, isLoggedIn, getCurrentUser, getToken, getRole, isAdmin };
})();
