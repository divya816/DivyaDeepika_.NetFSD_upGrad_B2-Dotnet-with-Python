window.EmployeeService = (() => {
  const buildQueryString = (state = {}) => {
    const params = new URLSearchParams();
    if (state.searchText) params.set("search", state.searchText);
    if (state.department && state.department !== "All") params.set("department", state.department);
    if (state.status && state.status !== "All") params.set("status", state.status);
    params.set("sortBy", state.sortField || "name");
    params.set("sortDir", state.sortDirection || "asc");
    params.set("page", state.page || 1);
    params.set("pageSize", state.pageSize || AppConfig.PAGE_SIZE);
    return `?${params.toString()}`;
  };

  const getAll = async (state) => StorageService.getEmployees(buildQueryString(state));
  const getById = async (id) => StorageService.getEmployeeById(id);
  const add = async (employeeData) => StorageService.addEmployee(employeeData);
  const update = async (id, employeeData) => StorageService.updateEmployee(id, employeeData);
  const remove = async (id) => StorageService.removeEmployee(id);

  const getDepartments = () => ["All", "Engineering", "Marketing", "HR", "Finance", "Operations"];

  return { getAll, getById, add, update, remove, getDepartments };
})();
