window.App = (() => {
  const state = {
    filters: {
      searchText: "",
      department: "All",
      status: "All"
    },
    sort: {
      field: "id",
      direction: "asc"
    }
  };

  const refreshDashboard = async () => {
    await Promise.resolve();

    const summary = DashboardService.getSummary();
    const departmentBreakdown = DashboardService.getDepartmentBreakdown();
    const recentEmployees = DashboardService.getRecentEmployees();

    UIService.renderSummaryCards(summary);
    UIService.renderDepartmentBreakdown(departmentBreakdown);
    UIService.renderRecentEmployees(recentEmployees);
  };

  const refreshEmployeeTable = async () => {
    await Promise.resolve();

    const filtered = EmployeeService.applyFilters(state.filters);
    const sorted = EmployeeService.sort(state.sort.field, state.sort.direction, filtered);
    UIService.renderEmployeeTable(sorted);
  };

  const refreshDepartmentFilter = () => {
    UIService.renderDepartmentFilter(EmployeeService.getDepartments());
  };

  const refreshAll = async () => {
    refreshDepartmentFilter();
    await refreshDashboard();
    await refreshEmployeeTable();
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const formData = UIService.getAuthFormData("login");
    const errors = ValidationService.validateLoginForm(formData);

    if (Object.keys(errors).length) {
      UIService.showErrors(errors);
      return;
    }

    UIService.clearErrors();

    const result = AuthService.login(formData.username, formData.password);

    if (!result.success) {
      UIService.showToast("Login Failed", result.message, "danger");
      return;
    }

    UIService.switchToAppView(result.user.username);
    refreshAll();
    UIService.showToast("Welcome Back", `Hello ${result.user.username}, login successful.`, "success");
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    const formData = UIService.getAuthFormData("signup");
    const errors = ValidationService.validateSignupForm(formData);

    if (Object.keys(errors).length) {
      UIService.showErrors(errors);
      return;
    }

    UIService.clearErrors();

    const result = AuthService.signup(formData.username, formData.password);

    if (!result.success) {
      UIService.showToast("Signup Failed", result.message, "danger");
      return;
    }

    UIService.showToast("Account Created", result.message, "success");
    $("#signupForm")[0].reset();
    $("#loginUsername").val(formData.username);
    $("#loginPassword").val(formData.password);

    const loginTabButton = document.getElementById("login-tab");
    const loginTab = new bootstrap.Tab(loginTabButton);
    loginTab.show();

    setTimeout(() => {
      document.getElementById("loginUsername").focus();
    }, 100);
  };

  const handleEmployeeSave = async () => {
    const editingId = $("#employeeId").val();
    const employeeData = UIService.getEmployeeFormData();
    const errors = ValidationService.validateEmployeeForm(employeeData, editingId);

    if (Object.keys(errors).length) {
      UIService.showErrors(errors);
      return;
    }

    UIService.clearErrors();

    if (editingId) {
      EmployeeService.update(editingId, employeeData);
      UIService.showToast("Employee Updated", "Employee information has been updated.", "success");
    } else {
      EmployeeService.add(employeeData);
      UIService.showToast("Employee Added", "New employee has been added successfully.", "success");
    }

    UIService.closeEmployeeModal();
    await refreshAll();
  };

  const handleDeleteConfirm = async () => {
    const id = $("#deleteEmployeeId").val();
    EmployeeService.remove(id);
    UIService.closeDeleteModal();
    UIService.showToast("Employee Removed", "The employee record has been deleted.", "danger");
    await refreshAll();
  };

  const openAddModal = () => UIService.openEmployeeModal();

  const bindEvents = () => {
    $("#loginForm").on("submit", handleLoginSubmit);
    $("#signupForm").on("submit", handleSignupSubmit);
    $("#saveEmployeeBtn").on("click", handleEmployeeSave);
    $("#confirmDeleteBtn").on("click", handleDeleteConfirm);

    $("#openAddEmployeeBtn, #quickAddBtn").on("click", openAddModal);

    $(".nav-switch").on("click", function (event) {
      event.preventDefault();
      UIService.switchSection($(this).data("target"));
    });

    $("#logoutBtn").on("click", () => {
      AuthService.logout();
      UIService.switchToAuthView();
      UIService.showToast("Logged Out", "You have been logged out successfully.", "info");
    });

    $("#searchInput").on("input", async function () {
      state.filters.searchText = $(this).val();
      await refreshEmployeeTable();
    });

    $("#departmentFilter").on("change", async function () {
      state.filters.department = $(this).val();
      await refreshEmployeeTable();
    });

    $("#statusFilter").on("change", async function () {
      state.filters.status = $(this).val();
      await refreshEmployeeTable();
    });

    $("#sortField").on("change", async function () {
      state.sort.field = $(this).val();
      await refreshEmployeeTable();
    });

    $("#sortDirection").on("change", async function () {
      state.sort.direction = $(this).val();
      await refreshEmployeeTable();
    });

    $("#employeeTableBody").on("click", ".js-view", function () {
      const employee = EmployeeService.getById($(this).data("id"));
      if (employee) UIService.openViewModal(employee);
    });

    $("#employeeTableBody").on("click", ".js-edit", function () {
      const employee = EmployeeService.getById($(this).data("id"));
      if (employee) UIService.openEmployeeModal(employee);
    });

    $("#employeeTableBody").on("click", ".js-delete", function () {
      const employee = EmployeeService.getById($(this).data("id"));
      if (employee) UIService.openDeleteModal(employee);
    });

    $("#dashboardLocateBtn").on("click", () => {
      if (!navigator.geolocation) {
        UIService.updateGeoStatus("Geolocation is not supported by this browser.");
        UIService.showToast("Geolocation", "Your browser does not support geolocation.", "info");
        return;
      }

      UIService.updateGeoStatus("Fetching location...");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const text = `Lat ${latitude.toFixed(2)}, Lng ${longitude.toFixed(2)}`;
          UIService.updateGeoStatus(text);
          UIService.showToast("Location Found", "Geolocation fetched successfully.", "success");
        },
        () => {
          UIService.updateGeoStatus("Permission denied or location unavailable.");
          UIService.showToast("Location Unavailable", "Could not fetch your current location.", "danger");
        }
      );
    });
  };

  const bootstrapApp = async () => {
    StorageService.init();
    bindEvents();

    if (AuthService.isLoggedIn()) {
      const user = AuthService.getCurrentUser();
      UIService.switchToAppView(user.username);
      await refreshAll();
    } else {
      UIService.switchToAuthView();
    }
  };

  return {
    bootstrapApp
  };
})();

$(document).ready(() => {
  App.bootstrapApp();
});