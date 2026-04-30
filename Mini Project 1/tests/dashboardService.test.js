const createDashboardService = (employeeService) => ({
  getSummary: () => {
    const employees = employeeService.getAll();
    return {
      total: employees.length,
      active: employees.filter((e) => e.status === "Active").length,
      inactive: employees.filter((e) => e.status === "Inactive").length,
      departments: new Set(employees.map((e) => e.department)).size
    };
  },
  getDepartmentBreakdown: () => {
    const employees = employeeService.getAll();
    const total = employees.length || 1;
    const counts = employees.reduce((acc, employee) => {
      acc[employee.department] = (acc[employee.department] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([department, count]) => ({
      department,
      count,
      percentage: Math.round((count / total) * 100)
    }));
  },
  getRecentEmployees: () => [...employeeService.getAll()].sort((a, b) => b.id - a.id).slice(0, 5)
});

describe("dashboardService", () => {
  const employees = [
    { id: 1, department: "Engineering", status: "Active" },
    { id: 2, department: "HR", status: "Inactive" },
    { id: 3, department: "Engineering", status: "Active" },
    { id: 4, department: "Marketing", status: "Active" }
  ];

  const employeeService = {
    getAll: jest.fn(() => employees)
  };

  const service = createDashboardService(employeeService);

  test("returns correct summary", () => {
    const summary = service.getSummary();
    expect(summary.total).toBe(4);
    expect(summary.active).toBe(3);
    expect(summary.inactive).toBe(1);
    expect(summary.departments).toBe(3);
  });

  test("returns department breakdown", () => {
    const breakdown = service.getDepartmentBreakdown();
    const engineering = breakdown.find((item) => item.department === "Engineering");
    expect(engineering.count).toBe(2);
  });

  test("returns recent employees by id desc", () => {
    const recent = service.getRecentEmployees();
    expect(recent[0].id).toBe(4);
  });
});