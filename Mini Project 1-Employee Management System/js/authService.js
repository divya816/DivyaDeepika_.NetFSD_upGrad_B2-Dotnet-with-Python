window.AuthService = (() => {
  const signup = (username, password) => {
    const admin = StorageService.getAdmin();

    if (admin.username && admin.username.toLowerCase() === username.toLowerCase()) {
      return {
        success: false,
        message: "This username already exists. Please choose another one."
      };
    }

    const newAdmin = { username, password };
    StorageService.setAdmin(newAdmin);

    return {
      success: true,
      message: "Account created successfully. Please login with your new credentials."
    };
  };

  const login = (username, password) => {
    const admin = StorageService.getAdmin();

    const isValid =
      admin.username === username &&
      admin.password === password;

    if (!isValid) {
      return {
        success: false,
        message: "Invalid credentials. Please check username and password."
      };
    }

    StorageService.setSession({
      username: admin.username,
      loginTime: new Date().toISOString()
    });

    return {
      success: true,
      user: { username: admin.username }
    };
  };

  const logout = () => {
    StorageService.clearSession();
  };

  const isLoggedIn = () => Boolean(StorageService.getSession());

  const getCurrentUser = () => StorageService.getSession();

  return {
    signup,
    login,
    logout,
    isLoggedIn,
    getCurrentUser
  };
})();