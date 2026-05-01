window.UIService = (() => {
  const toastEl = document.getElementById("appToast");
  const toastInstance = toastEl ? new bootstrap.Toast(toastEl, { delay: 2600 }) : null;
  const employeeModal = document.getElementById("employeeModal") ? new bootstrap.Modal(document.getElementById("employeeModal")) : null;
  const viewEmployeeModal = document.getElementById("viewEmployeeModal") ? new bootstrap.Modal(document.getElementById("viewEmployeeModal")) : null;
  const deleteModal = document.getElementById("deleteModal") ? new bootstrap.Modal(document.getElementById("deleteModal")) : null;
  const departmentClassMap = { Engineering: "dept-engineering", Marketing: "dept-marketing", HR: "dept-hr", Finance: "dept-finance", Operations: "dept-operations" };
  const getInitials = (firstName = "", lastName = "") => `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount || 0);
  const clearErrors = () => $(".field-error").text("");
  const showErrors = (errors) => { clearErrors(); Object.entries(errors).forEach(([field, message]) => $(`[data-error-for="${field}"]`).text(message)); };
  const showToast = (title, message, type = "info") => { if (!toastEl || !toastInstance) return; $("#toastTitle").text(title); $("#toastBody").text(message); toastEl.classList.remove("toast-success","toast-danger","toast-info"); toastEl.classList.add(`toast-${type}`); toastInstance.show(); };
  const renderSummaryCards = (summary) => {
    const cards = [
      { label: "Total Employees", value: summary.totalEmployees ?? summary.total ?? 0, icon: "bi-people-fill", className: "summary-primary" },
      { label: "Active Employees", value: summary.activeEmployees ?? summary.active ?? 0, icon: "bi-person-check-fill", className: "summary-success" },
      { label: "Inactive Employees", value: summary.inactiveEmployees ?? summary.inactive ?? 0, icon: "bi-person-dash-fill", className: "summary-danger" },
      { label: "Departments", value: summary.totalDepartments ?? summary.departments ?? 0, icon: "bi-diagram-3-fill", className: "summary-warning" }
    ];
    $("#summaryCards").html(cards.map((card) => `<div class="col-md-6 col-xl-3"><div class="summary-card ${card.className}"><div class="summary-icon"><i class="bi ${card.icon}"></i></div><div class="summary-label">${card.label}</div><div class="summary-value">${card.value}</div></div></div>`).join(""));
  };
  const renderDepartmentBreakdown = (items = []) => {
    $("#departmentBreakdown").html(items.map((item) => `<div class="dept-progress-item"><div class="d-flex justify-content-between"><span>${item.department}</span><span>${item.count}</span></div><div class="progress mt-2"><div class="progress-bar" role="progressbar" style="width:${item.percentage || 0}%"></div></div></div>`).join(""));
  };
  const renderRecentEmployees = (employees = []) => {
    $("#recentEmployees").html(employees.map((employee) => `<div class="recent-employee-item"><div class="d-flex align-items-center gap-3"><div class="avatar-circle sm">${getInitials(employee.firstName, employee.lastName)}</div><div><div class="fw-semibold">${employee.firstName} ${employee.lastName}</div><div class="text-muted small">${employee.designation}</div></div></div><div><span class="dept-pill ${departmentClassMap[employee.department] || "dept-operations"}">${employee.department}</span></div></div>`).join(""));
  };
  const renderDepartmentFilter = (departments) => $("#departmentFilter").html(departments.map((department) => `<option value="${department}">${department === "All" ? "All Departments" : department}</option>`).join(""));
  const renderEmployeeTable = (pagedResult) => {
    const employees = pagedResult?.data || [];
    if (!employees.length) { $("#employeeTableBody").html(""); $("#emptyState").removeClass("d-none"); renderPagination(pagedResult); updateRecordCount(pagedResult); return; }
    $("#emptyState").addClass("d-none");
    $("#employeeTableBody").html(employees.map((employee) => `<tr><td>#${employee.id}</td><td><div class="avatar-circle sm">${getInitials(employee.firstName, employee.lastName)}</div></td><td><div class="employee-name">${employee.firstName} ${employee.lastName}</div><div class="employee-email">${employee.designation}</div></td><td>${employee.email}</td><td>${employee.phone}</td><td><span class="dept-pill ${departmentClassMap[employee.department] || "dept-operations"}">${employee.department}</span></td><td>${employee.designation}</td><td>${formatCurrency(employee.salary)}</td><td>${String(employee.joinDate).slice(0,10)}</td><td><span class="status-badge ${employee.status === "Active" ? "status-active" : "status-inactive"}">${employee.status}</span></td><td class="text-center"><button class="action-btn btn-view js-view" data-id="${employee.id}" title="View"><i class="bi bi-eye"></i></button><button class="action-btn btn-edit js-edit admin-only" data-id="${employee.id}" title="Edit"><i class="bi bi-pencil"></i></button><button class="action-btn btn-delete js-delete admin-only" data-id="${employee.id}" title="Delete"><i class="bi bi-trash"></i></button></td></tr>`).join(""));
    renderPagination(pagedResult); updateRecordCount(pagedResult); applyRoleUI(AuthService.getRole());
  };
  const renderPagination = (pagedResult = {}) => {
    const page = pagedResult.page || 1; const totalPages = pagedResult.totalPages || 1;
    const items = [];
    items.push(`<li class="page-item ${page <= 1 ? "disabled" : ""}"><a class="page-link js-page" href="#" data-page="${page - 1}">Prev</a></li>`);
    for (let i = 1; i <= totalPages; i += 1) items.push(`<li class="page-item ${i === page ? "active" : ""}"><a class="page-link js-page" href="#" data-page="${i}">${i}</a></li>`);
    items.push(`<li class="page-item ${page >= totalPages ? "disabled" : ""}"><a class="page-link js-page" href="#" data-page="${page + 1}">Next</a></li>`);
    $("#paginationBar").html(items.join(""));
  };
  const updateRecordCount = (pagedResult = {}) => {
    const total = pagedResult.totalCount || 0; const page = pagedResult.page || 1; const pageSize = pagedResult.pageSize || AppConfig.PAGE_SIZE; const start = total ? (page - 1) * pageSize + 1 : 0; const end = Math.min(page * pageSize, total); $("#recordCountLabel").text(`Showing ${start}-${end} of ${total} employees`);
  };
  const fillEmployeeForm = (employee = null) => { clearErrors(); if (!employee) { $("#employeeModalTitle").text("Add Employee"); $("#saveEmployeeBtn").text("Save Employee"); $("#employeeForm")[0].reset(); $("#employeeId").val(""); return; } $("#employeeModalTitle").text("Edit Employee"); $("#saveEmployeeBtn").text("Update Employee"); $("#employeeId").val(employee.id); $("#firstName").val(employee.firstName); $("#lastName").val(employee.lastName); $("#email").val(employee.email); $("#phone").val(employee.phone); $("#department").val(employee.department); $("#designation").val(employee.designation); $("#salary").val(employee.salary); $("#joinDate").val(String(employee.joinDate).slice(0,10)); $("#status").val(employee.status); };
  const openEmployeeModal = (employee = null) => { fillEmployeeForm(employee); employeeModal?.show(); };
  const closeEmployeeModal = () => employeeModal?.hide();
  const openViewModal = (employee) => { $("#viewEmployeeBody").html(`<div class="profile-wrap"><div class="avatar-circle">${getInitials(employee.firstName, employee.lastName)}</div><h4 class="fw-bold mb-1">${employee.firstName} ${employee.lastName}</h4><p class="text-muted mb-3">${employee.designation}</p><div class="profile-meta"><div class="profile-meta-card"><div class="label">Email</div><div>${employee.email}</div></div><div class="profile-meta-card"><div class="label">Phone</div><div>${employee.phone}</div></div><div class="profile-meta-card"><div class="label">Salary</div><div>${formatCurrency(employee.salary)}</div></div><div class="profile-meta-card"><div class="label">Join Date</div><div>${String(employee.joinDate).slice(0,10)}</div></div><div class="profile-meta-card"><div class="label">Status</div><div>${employee.status}</div></div><div class="profile-meta-card"><div class="label">Department</div><div>${employee.department}</div></div></div></div>`); viewEmployeeModal?.show(); };
  const openDeleteModal = (employee) => { $("#deleteEmployeeName").text(`${employee.firstName} ${employee.lastName}`); $("#deleteEmployeeId").val(employee.id); deleteModal?.show(); };
  const closeDeleteModal = () => deleteModal?.hide();
  const getEmployeeFormData = () => ({ firstName: $("#firstName").val().trim(), lastName: $("#lastName").val().trim(), email: $("#email").val().trim(), phone: $("#phone").val().trim(), department: $("#department").val(), designation: $("#designation").val().trim(), salary: Number($("#salary").val()), joinDate: $("#joinDate").val(), status: $("#status").val() });
  const getAuthFormData = (type) => type === "login" ? { username: $("#loginUsername").val().trim(), password: $("#loginPassword").val() } : { username: $("#signupUsername").val().trim(), password: $("#signupPassword").val(), confirmPassword: $("#confirmPassword").val(), role: $("#signupRole").val() || "Viewer" };
  const switchToAppView = (username, role = "Viewer") => { $("#authView").addClass("d-none"); $("#appView").removeClass("d-none"); $("#mainNavbar").removeClass("d-none"); $("#navUsername").text(username); $("#navRoleBadge").text(role); $("#navUserAvatar").text((username || "A").charAt(0).toUpperCase()); applyRoleUI(role); };
  const switchToAuthView = () => { $("#authView").removeClass("d-none"); $("#appView").addClass("d-none"); $("#mainNavbar").addClass("d-none"); };
  const switchSection = (targetId) => { $(".page-section").addClass("d-none"); $(`#${targetId}`).removeClass("d-none"); $(".nav-switch").removeClass("active"); $(`.nav-switch[data-target="${targetId}"]`).addClass("active"); };
  const updateGeoStatus = (text) => $("#geoStatus").text(text);
  const applyRoleUI = (role = "Viewer") => { const isAdmin = role === "Admin"; $(".admin-only").toggleClass("d-none", !isAdmin); $("#viewerNotice").toggleClass("d-none", isAdmin); $("#navRoleBadge").toggleClass("text-bg-danger", isAdmin).toggleClass("text-bg-secondary", !isAdmin); };
  return { showToast, showErrors, clearErrors, renderSummaryCards, renderDepartmentBreakdown, renderRecentEmployees, renderDepartmentFilter, renderEmployeeTable, openEmployeeModal, closeEmployeeModal, openViewModal, openDeleteModal, closeDeleteModal, getEmployeeFormData, getAuthFormData, switchToAppView, switchToAuthView, switchSection, updateGeoStatus, applyRoleUI };
})();
