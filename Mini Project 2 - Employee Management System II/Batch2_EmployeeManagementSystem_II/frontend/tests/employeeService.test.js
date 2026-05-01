const createEmployeeService = (storage) => ({
  getAll: () => storage.getEmployees(),
  add: (employeeData) => {
    const employees = storage.getEmployees();
    const newEmployee = { ...employeeData, id: storage.nextEmployeeId() };
    employees.push(newEmployee);
    storage.setEmployees(employees);
    return newEmployee;
  },
  update: (id, updatedData) => {
    const employees = storage.getEmployees();
    const index = employees.findIndex((employee) => employee.id === Number(id));
    if (index === -1) return null;
    employees[index] = { ...employees[index], ...updatedData, id: Number(id) };
    storage.setEmployees(employees);
    return employees[index];
  },
  remove: (id) => {
    const employees = storage.getEmployees();
    storage.setEmployees(employees.filter((employee) => employee.id !== Number(id)));
    return true;
  },
  search: (query, employees) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return employees;
    return employees.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return fullName.includes(normalized) || employee.email.toLowerCase().includes(normalized);
    });
  },
  filterByDepartment: (department, employees) =>
    department === "All" ? employees : employees.filter((employee) => employee.department === department),
  sort: (field, direction, employees) => {
    const sorted = [...employees];
    sorted.sort((a, b) => {
      let first;
      let second;

      if (field === "salary") {
        first = Number(a.salary);
        second = Number(b.salary);
      } else {
        first = `${a.firstName} ${a.lastName}`.toLowerCase();
        second = `${b.firstName} ${b.lastName}`.toLowerCase();
      }

      if (first < second) return direction === "asc" ? -1 : 1;
      if (first > second) return direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }
});

describe("employeeService", () => {
  let storage;
  let service;

  beforeEach(() => {
    let employees = [
      { id: 1, firstName: "Priya", lastName: "Prabhu", email: "priya@mail.com", department: "Engineering", salary: 100 },
      { id: 2, firstName: "Arjun", lastName: "Sharma", email: "arjun@mail.com", department: "Marketing", salary: 200 }
    ];

    storage = {
      getEmployees: jest.fn(() => [...employees]),
      setEmployees: jest.fn((updated) => { employees = [...updated]; }),
      nextEmployeeId: jest.fn(() => 3)
    };

    service = createEmployeeService(storage);
  });

  test("adds an employee", () => {
    const employee = service.add({
      firstName: "Neha",
      lastName: "Kapoor",
      email: "neha@mail.com",
      department: "HR",
      salary: 300
    });

    expect(employee.id).toBe(3);
    expect(storage.setEmployees).toHaveBeenCalled();
  });

  test("updates an employee", () => {
    const updated = service.update(1, { salary: 999 });
    expect(updated.salary).toBe(999);
  });

  test("removes an employee", () => {
    service.remove(2);
    expect(storage.setEmployees).toHaveBeenCalled();
  });

  test("searches by name or email", () => {
    const employees = storage.getEmployees();
    const result = service.search("priya", employees);
    expect(result).toHaveLength(1);
  });

  test("filters by department", () => {
    const employees = storage.getEmployees();
    const result = service.filterByDepartment("Engineering", employees);
    expect(result).toHaveLength(1);
  });

  test("sorts by salary descending", () => {
    const employees = storage.getEmployees();
    const result = service.sort("salary", "desc", employees);
    expect(result[0].salary).toBe(200);
  });
});