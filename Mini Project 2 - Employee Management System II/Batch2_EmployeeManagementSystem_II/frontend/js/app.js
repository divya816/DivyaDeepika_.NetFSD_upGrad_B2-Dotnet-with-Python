window.App = (() => {
  const state = { searchText: "", department: "All", status: "All", sortField: "name", sortDirection: "asc", page: 1, pageSize: AppConfig.PAGE_SIZE };
  let searchTimer = null;

  const loadDashboard = async () => {
    const dashboard = await DashboardService.getSummary();
    UIService.renderSummaryCards(dashboard.summary || dashboard);
    UIService.renderDepartmentBreakdown(dashboard.departmentBreakdown || []);
    UIService.renderRecentEmployees(dashboard.recentEmployees || []);
  };

  const loadEmployees = async () => {
    const result = await EmployeeService.getAll(state);
    UIService.renderEmployeeTable(result);
  };

  const refreshAll = async () => {
    UIService.renderDepartmentFilter(EmployeeService.getDepartments());
    await Promise.all([loadDashboard(), loadEmployees()]);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const formData = UIService.getAuthFormData("login");
    const errors = ValidationService.validateLoginForm(formData);
    if (Object.keys(errors).length) return UIService.showErrors(errors);
    UIService.clearErrors();
    try {
      const result = await AuthService.login(formData.username, formData.password);
      if (!result.success) return UIService.showToast("Login Failed", result.message, "danger");
      UIService.switchToAppView(result.user.username, result.user.role);
      await refreshAll();
      UIService.showToast("Welcome Back", `Hello ${result.user.username}, login successful.`, "success");
    } catch (error) {
      UIService.showToast("Login Failed", error.message || "Unable to login.", "danger");
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const formData = UIService.getAuthFormData("signup");
    const errors = ValidationService.validateSignupForm(formData);
    if (Object.keys(errors).length) return UIService.showErrors(errors);
    UIService.clearErrors();
    try {
      const result = await AuthService.signup(formData.username, formData.password, formData.role);
      UIService.showToast("Account Created", result.message, "success");
      $("#login-tab").trigger("click");
      $("#loginUsername").val(formData.username);
      $("#loginPassword").val(formData.password);
      $("#signupForm")[0].reset();
    } catch (error) {
      const serverErrors = ValidationService.mapServerErrors(error);
      if (Object.keys(serverErrors).length) UIService.showErrors(serverErrors);
      UIService.showToast("Signup Failed", error.message || "Unable to signup.", "danger");
    }
  };

  const handleEmployeeSave = async () => {
    const editingId = $("#employeeId").val();
    const employeeData = UIService.getEmployeeFormData();
    const errors = ValidationService.validateEmployeeForm(employeeData);
    if (Object.keys(errors).length) return UIService.showErrors(errors);
    UIService.clearErrors();
    try {
      if (editingId) {
        await EmployeeService.update(editingId, employeeData);
        UIService.showToast("Employee Updated", "Employee information has been updated.", "success");
      } else {
        await EmployeeService.add(employeeData);
        UIService.showToast("Employee Added", "New employee has been added successfully.", "success");
      }
      UIService.closeEmployeeModal();
      await refreshAll();
    } catch (error) {
      const serverErrors = ValidationService.mapServerErrors(error);
      if (Object.keys(serverErrors).length) UIService.showErrors(serverErrors);
      UIService.showToast("Save Failed", error.message || "Unable to save employee.", "danger");
    }
  };

  const handleDeleteConfirm = async () => {
    const id = $("#deleteEmployeeId").val();
    try {
      await EmployeeService.remove(id);
      UIService.closeDeleteModal();
      if (state.page > 1) state.page = 1;
      await refreshAll();
      UIService.showToast("Employee Removed", "The employee record has been deleted.", "danger");
    } catch (error) {
      UIService.showToast("Delete Failed", error.message || "Unable to delete employee.", "danger");
    }
  };

  const bindEvents = () => {
    $("#loginForm").on("submit", handleLoginSubmit);
    $("#signupForm").on("submit", handleSignupSubmit);
    $("#saveEmployeeBtn").on("click", handleEmployeeSave);
    $("#confirmDeleteBtn").on("click", handleDeleteConfirm);
    $("#openAddEmployeeBtn, #quickAddBtn").on("click", () => UIService.openEmployeeModal());
    $(".nav-switch").on("click", function (event) { event.preventDefault(); UIService.switchSection($(this).data("target")); });
    $("#logoutBtn").on("click", () => { AuthService.logout(); UIService.switchToAuthView(); UIService.showToast("Logged Out", "You have been logged out successfully.", "info"); });
    $("#searchInput").on("input", function () { state.searchText = $(this).val(); state.page = 1; clearTimeout(searchTimer); searchTimer = setTimeout(() => loadEmployees(), 350); });
    $("#departmentFilter").on("change", function () { state.department = $(this).val(); state.page = 1; loadEmployees(); });
    $("#statusFilter").on("change", function () { state.status = $(this).val(); state.page = 1; loadEmployees(); });
    $("#sortField").on("change", function () { state.sortField = $(this).val(); state.page = 1; loadEmployees(); });
    $("#sortDirection").on("change", function () { state.sortDirection = $(this).val(); state.page = 1; loadEmployees(); });
    $("#employeeTableBody").on("click", ".js-view", async function () { const employee = await EmployeeService.getById($(this).data("id")); if (employee) UIService.openViewModal(employee); });
    $("#employeeTableBody").on("click", ".js-edit", async function () { const employee = await EmployeeService.getById($(this).data("id")); if (employee) UIService.openEmployeeModal(employee); });
    $("#employeeTableBody").on("click", ".js-delete", async function () { const employee = await EmployeeService.getById($(this).data("id")); if (employee) UIService.openDeleteModal(employee); });
    $("#paginationBar").on("click", ".js-page", function (event) { event.preventDefault(); const nextPage = Number($(this).data("page")); if (nextPage > 0) { state.page = nextPage; loadEmployees(); } });
  };

  const bootstrapApp = async () => {
    bindEvents();
    UIService.renderDepartmentFilter(EmployeeService.getDepartments());
    UIService.switchToAuthView();
  };

  return { bootstrapApp };
})();
$(document).ready(() => { App.bootstrapApp(); });
