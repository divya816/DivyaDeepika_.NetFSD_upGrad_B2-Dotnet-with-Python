window.EmployeeService = (() => {
  const getAll = () => StorageService.getEmployees();

  const getById = (id) => {
    const employees = getAll();
    return employees.find((employee) => employee.id === Number(id)) || null;
  };

  const add = (employeeData) => {
    const employees = getAll();
    const newEmployee = {
      ...employeeData,
      id: StorageService.nextEmployeeId()
    };

    employees.push(newEmployee);
    StorageService.setEmployees(employees);
    return newEmployee;
  };

  const update = (id, updatedData) => {
    const employees = getAll();
    const index = employees.findIndex((employee) => employee.id === Number(id));

    if (index === -1) {
      return null;
    }

    employees[index] = {
      ...employees[index],
      ...updatedData,
      id: Number(id)
    };

    StorageService.setEmployees(employees);
    return employees[index];
  };

  const remove = (id) => {
    const employees = getAll();
    const filteredEmployees = employees.filter((employee) => employee.id !== Number(id));
    StorageService.setEmployees(filteredEmployees);
    return true;
  };

  const search = (query, employees = getAll()) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return employees;

    return employees.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return (
        fullName.includes(normalized) ||
        employee.email.toLowerCase().includes(normalized)
      );
    });
  };

  const filterByDepartment = (department, employees = getAll()) => {
    if (!department || department === "All") return employees;
    return employees.filter((employee) => employee.department === department);
  };

  const filterByStatus = (status, employees = getAll()) => {
    if (!status || status === "All") return employees;
    return employees.filter((employee) => employee.status === status);
  };

  const applyFilters = ({ searchText, department, status }) => {
    let employees = getAll();
    employees = search(searchText, employees);
    employees = filterByDepartment(department, employees);
    employees = filterByStatus(status, employees);
    return employees;
  };

const sort = (field = "id", direction = "asc", employees = getAll()) => {
  const sorted = [...employees];

  sorted.sort((a, b) => {
    let first;
    let second;

    if (field === "id") {
      first = Number(a.id);
      second = Number(b.id);

    } else if (field === "salary") {
      first = Number(a.salary);
      second = Number(b.salary);

    } else if (field === "joinDate") {
      first = new Date(a.joinDate).getTime();
      second = new Date(b.joinDate).getTime();

    } else { // name
      first = `${a.firstName} ${a.lastName}`.toLowerCase();
      second = `${b.firstName} ${b.lastName}`.toLowerCase();
    }

    if (first < second) return direction === "asc" ? -1 : 1;
    if (first > second) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
};

  const getDepartments = () => {
    const employees = getAll();
    return ["All", ...new Set(employees.map((employee) => employee.department))];
  };

  return {
    getAll,
    getById,
    add,
    update,
    remove,
    search,
    filterByDepartment,
    filterByStatus,
    applyFilters,
    sort,
    getDepartments
  };
})();