const createAuthService = (storage) => ({
  signup: (username, password) => {
    const admin = storage.getAdmin();
    if (admin.username && admin.username.toLowerCase() === username.toLowerCase()) {
      return { success: false };
    }
    storage.setAdmin({ username, password });
    return { success: true };
  },
  login: (username, password) => {
    const admin = storage.getAdmin();
    if (admin.username === username && admin.password === password) {
      storage.setSession({ username });
      return { success: true };
    }
    return { success: false };
  },
  logout: () => storage.clearSession()
});

describe("authService", () => {
  let storage;
  let service;
  let admin;

  beforeEach(() => {
    admin = { username: "admin", password: "Admin@123" };

    storage = {
      getAdmin: jest.fn(() => admin),
      setAdmin: jest.fn((newAdmin) => { admin = newAdmin; }),
      setSession: jest.fn(),
      clearSession: jest.fn()
    };

    service = createAuthService(storage);
  });

  test("prevents duplicate signup", () => {
    const result = service.signup("admin", "test123");
    expect(result.success).toBe(false);
  });

  test("allows unique signup", () => {
    const result = service.signup("newadmin", "test123");
    expect(result.success).toBe(true);
    expect(storage.setAdmin).toHaveBeenCalled();
  });

  test("logs in with correct credentials", () => {
    const result = service.login("admin", "Admin@123");
    expect(result.success).toBe(true);
    expect(storage.setSession).toHaveBeenCalled();
  });

  test("rejects invalid credentials", () => {
    const result = service.login("admin", "wrong");
    expect(result.success).toBe(false);
  });

  test("logs out", () => {
    service.logout();
    expect(storage.clearSession).toHaveBeenCalled();
  });
});