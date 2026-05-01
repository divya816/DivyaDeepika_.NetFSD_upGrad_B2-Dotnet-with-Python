window.DashboardService = (() => {
  const getSummary = () => {
    const employees = EmployeeService.getAll();

    return {
      total: employees.length,
      active: employees.filter((employee) => employee.status === "Active").length,
      inactive: employees.filter((employee) => employee.status === "Inactive").length,
      departments: new Set(employees.map((employee) => employee.department)).size
    };
  };

  const getDepartmentBreakdown = () => {
    const employees = EmployeeService.getAll();
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
  };

  const getRecentEmployees = () => {
    return [...EmployeeService.getAll()]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
  };

  return {
    getSummary,
    getDepartmentBreakdown,
    getRecentEmployees
  };
})();