window.UIService = (() => {
  const toastEl = document.getElementById("appToast");
  const toastInstance = toastEl ? new bootstrap.Toast(toastEl, { delay: 2600 }) : null;

  const employeeModal = document.getElementById("employeeModal")
    ? new bootstrap.Modal(document.getElementById("employeeModal"))
    : null;

  const viewEmployeeModal = document.getElementById("viewEmployeeModal")
    ? new bootstrap.Modal(document.getElementById("viewEmployeeModal"))
    : null;

  const deleteModal = document.getElementById("deleteModal")
    ? new bootstrap.Modal(document.getElementById("deleteModal"))
    : null;

  const departmentClassMap = {
    Engineering: "dept-engineering",
    Marketing: "dept-marketing",
    HR: "dept-hr",
    Finance: "dept-finance",
    Operations: "dept-operations"
  };

  const getInitials = (firstName = "", lastName = "") =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  const clearErrors = () => {
    $(".field-error").text("");
  };

  const showErrors = (errors) => {
    clearErrors();
    Object.entries(errors).forEach(([field, message]) => {
      $(`[data-error-for="${field}"]`).text(message);
    });
  };

  const showToast = (title, message, type = "info") => {
    if (!toastEl || !toastInstance) return;

    $("#toastTitle").text(title);
    $("#toastBody").text(message);

    toastEl.classList.remove("toast-success", "toast-danger", "toast-info");
    toastEl.classList.add(`toast-${type}`);

    toastInstance.show();
  };

  const renderSummaryCards = (summary) => {
    const cards = [
      {
        label: "Total Employees",
        value: summary.total,
        icon: "bi-people-fill",
        className: "summary-primary"
      },
      {
        label: "Active Employees",
        value: summary.active,
        icon: "bi-person-check-fill",
        className: "summary-success"
      },
      {
        label: "Inactive Employees",
        value: summary.inactive,
        icon: "bi-person-dash-fill",
        className: "summary-danger"
      },
      {
        label: "Departments",
        value: summary.departments,
        icon: "bi-diagram-3-fill",
        className: "summary-warning"
      }
    ];

    const html = cards.map((card) => `
      <div class="col-md-6 col-xl-3">
        <div class="summary-card ${card.className}">
          <div class="summary-icon">
            <i class="bi ${card.icon}"></i>
          </div>
          <div class="summary-label">${card.label}</div>
          <div class="summary-value">${card.value}</div>
        </div>
      </div>
    `).join("");

    $("#summaryCards").html(html);
  };

  const renderDepartmentBreakdown = (items) => {
    const html = items.map((item) => `
      <div class="department-row">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="dept-pill ${departmentClassMap[item.department] || "dept-operations"}">${item.department}</span>
          <div class="fw-semibold">${item.count} employees • ${item.percentage}%</div>
        </div>
        <div class="progress custom-progress">
          <div class="progress-bar ${departmentClassMap[item.department] || ""}" style="width: ${item.percentage}%"></div>
        </div>
      </div>
    `).join("");

    $("#departmentBreakdown").html(html);
  };

  const renderRecentEmployees = (employees) => {
    const html = employees.map((employee) => `
      <div class="recent-item">
        <div class="recent-meta">
          <div class="avatar-circle sm">${getInitials(employee.firstName, employee.lastName)}</div>
          <div>
            <div class="fw-semibold">${employee.firstName} ${employee.lastName}</div>
            <div class="small text-muted">${employee.designation}</div>
          </div>
        </div>
        <div class="text-end">
          <div>
            <span class="dept-pill ${departmentClassMap[employee.department] || "dept-operations"}">${employee.department}</span>
          </div>
          <div class="mt-2">
            <span class="status-badge ${employee.status === "Active" ? "status-active" : "status-inactive"}">${employee.status}</span>
          </div>
        </div>
      </div>
    `).join("");

    $("#recentEmployees").html(html);
  };

  const renderDepartmentFilter = (departments) => {
    const html = departments.map((department) => {
      const label = department === "All" ? "All Departments" : department;
      return `<option value="${department}">${label}</option>`;
    }).join("");

    $("#departmentFilter").html(html);
  };

  const renderEmployeeTable = (employees) => {
    if (!employees.length) {
      $("#employeeTableBody").html("");
      $("#emptyState").removeClass("d-none");
      return;
    }

    $("#emptyState").addClass("d-none");

    const html = employees.map((employee) => `
      <tr>
        <td>#${employee.id}</td>
        <td><div class="avatar-circle sm">${getInitials(employee.firstName, employee.lastName)}</div></td>
        <td>
          <div class="employee-name">${employee.firstName} ${employee.lastName}</div>
          <div class="employee-email">${employee.workMode}</div>
        </td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td><span class="dept-pill ${departmentClassMap[employee.department] || "dept-operations"}">${employee.department}</span></td>
        <td>${employee.designation}</td>
        <td>${formatCurrency(employee.salary)}</td>
        <td>${employee.joinDate}</td>
        <td>
          <span class="status-badge ${employee.status === "Active" ? "status-active" : "status-inactive"}">
            ${employee.status}
          </span>
        </td>
        <td class="text-center">
          <button class="action-btn btn-view js-view" data-id="${employee.id}" title="View">
            <i class="bi bi-eye"></i>
          </button>
          <button class="action-btn btn-edit js-edit" data-id="${employee.id}" title="Edit">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="action-btn btn-delete js-delete" data-id="${employee.id}" title="Delete">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join("");

    $("#employeeTableBody").html(html);
  };

  const fillEmployeeForm = (employee = null) => {
    clearErrors();

    if (!employee) {
      $("#employeeModalTitle").text("Add Employee");
      $("#saveEmployeeBtn").text("Save Employee");
      $("#employeeForm")[0].reset();
      $("#employeeId").val("");
      return;
    }

    $("#employeeModalTitle").text("Edit Employee");
    $("#saveEmployeeBtn").text("Update Employee");

    $("#employeeId").val(employee.id);
    $("#firstName").val(employee.firstName);
    $("#lastName").val(employee.lastName);
    $("#email").val(employee.email);
    $("#phone").val(employee.phone);
    $("#department").val(employee.department);
    $("#designation").val(employee.designation);
    $("#salary").val(employee.salary);
    $("#joinDate").val(employee.joinDate);
    $("#status").val(employee.status);
    $("#workMode").val(employee.workMode);
  };

  const openEmployeeModal = (employee = null) => {
    fillEmployeeForm(employee);
    employeeModal.show();
  };

  const closeEmployeeModal = () => employeeModal.hide();

  const openViewModal = (employee) => {
    const html = `
      <div class="profile-wrap">
        <div class="avatar-circle">${getInitials(employee.firstName, employee.lastName)}</div>
        <h4 class="fw-bold mb-1">${employee.firstName} ${employee.lastName}</h4>
        <div class="mb-3">
          <span class="dept-pill ${departmentClassMap[employee.department] || "dept-operations"}">${employee.department}</span>
        </div>
        <p class="text-muted mb-0">${employee.designation}</p>

        <div class="profile-meta">
          <div class="profile-meta-card">
            <div class="label">Email</div>
            <div>${employee.email}</div>
          </div>
          <div class="profile-meta-card">
            <div class="label">Phone</div>
            <div>${employee.phone}</div>
          </div>
          <div class="profile-meta-card">
            <div class="label">Salary</div>
            <div>${formatCurrency(employee.salary)}</div>
          </div>
          <div class="profile-meta-card">
            <div class="label">Join Date</div>
            <div>${employee.joinDate}</div>
          </div>
          <div class="profile-meta-card">
            <div class="label">Status</div>
            <div><span class="status-badge ${employee.status === "Active" ? "status-active" : "status-inactive"}">${employee.status}</span></div>
          </div>
          <div class="profile-meta-card">
            <div class="label">Work Mode</div>
            <div>${employee.workMode}</div>
          </div>
        </div>
      </div>
    `;

    $("#viewEmployeeBody").html(html);
    viewEmployeeModal.show();
  };

  const openDeleteModal = (employee) => {
    $("#deleteEmployeeName").text(`${employee.firstName} ${employee.lastName}`);
    $("#deleteEmployeeId").val(employee.id);
    deleteModal.show();
  };

  const closeDeleteModal = () => deleteModal.hide();

  const getEmployeeFormData = () => ({
    firstName: $("#firstName").val().trim(),
    lastName: $("#lastName").val().trim(),
    email: $("#email").val().trim(),
    phone: $("#phone").val().trim(),
    department: $("#department").val(),
    designation: $("#designation").val().trim(),
    salary: Number($("#salary").val()),
    joinDate: $("#joinDate").val(),
    status: $("#status").val(),
    workMode: $("#workMode").val()
  });

  const getAuthFormData = (type) => {
    if (type === "login") {
      return {
        username: $("#loginUsername").val().trim(),
        password: $("#loginPassword").val()
      };
    }

    return {
      fullName: $("#fullName").val().trim(),
      employeeIdSignup: $("#employeeIdSignup").val().trim(),
      signupEmail: $("#signupEmail").val().trim(),
      signupPhone: $("#signupPhone").val().trim(),
      dob: $("#dob").val(),
      gender: $("#gender").val(),
      username: $("#signupUsername").val().trim(),
      password: $("#signupPassword").val(),
      confirmPassword: $("#confirmPassword").val()
    };
  };

  const switchToAppView = (username) => {
    $("#authView").addClass("d-none");
    $("#appView").removeClass("d-none");
    $("#mainNavbar").removeClass("d-none");
    $("#navUsername").text(username);
    $("#navUserAvatar").text((username || "A").charAt(0).toUpperCase());
  };

  const switchToAuthView = () => {
    $("#authView").removeClass("d-none");
    $("#appView").addClass("d-none");
    $("#mainNavbar").addClass("d-none");
    $(".nav-switch").removeClass("active");
    $('.nav-switch[data-target="dashboardView"]').addClass("active");
    $(".page-section").addClass("d-none");
    $("#dashboardView").removeClass("d-none");
  };

  const switchSection = (targetId) => {
    $(".page-section").addClass("d-none");
    $(`#${targetId}`).removeClass("d-none");
    $(".nav-switch").removeClass("active");
    $(`.nav-switch[data-target="${targetId}"]`).addClass("active");
  };

  const updateGeoStatus = (text) => {
    $("#geoStatus").text(text);
  };

  return {
    showToast,
    showErrors,
    clearErrors,
    renderSummaryCards,
    renderDepartmentBreakdown,
    renderRecentEmployees,
    renderDepartmentFilter,
    renderEmployeeTable,
    openEmployeeModal,
    closeEmployeeModal,
    openViewModal,
    openDeleteModal,
    closeDeleteModal,
    getEmployeeFormData,
    getAuthFormData,
    switchToAppView,
    switchToAuthView,
    switchSection,
    updateGeoStatus
  };
})();