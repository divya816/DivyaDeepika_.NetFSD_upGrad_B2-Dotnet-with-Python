using System.ComponentModel.DataAnnotations;

public class EmployeeRequestDto
{
    [Required, MaxLength(100)] public string FirstName { get; set; } = string.Empty;
    [Required, MaxLength(100)] public string LastName { get; set; } = string.Empty;
    [Required, EmailAddress, MaxLength(200)] public string Email { get; set; } = string.Empty;
    [Required, RegularExpression("^\\d{10}$")] public string Phone { get; set; } = string.Empty;
    [Required] public string Department { get; set; } = string.Empty;
    [Required, MaxLength(100)] public string Designation { get; set; } = string.Empty;
    [Range(0.01, double.MaxValue)] public decimal Salary { get; set; }
    [Required] public DateTime JoinDate { get; set; }
    [Required] public string Status { get; set; } = string.Empty;
}

public class DashboardSummaryDto
{
    public int TotalEmployees { get; set; }
    public int ActiveEmployees { get; set; }
    public int InactiveEmployees { get; set; }
    public int TotalDepartments { get; set; }
}

public class DepartmentBreakdownDto
{
    public string Department { get; set; } = string.Empty;
    public int Count { get; set; }
    public int Percentage { get; set; }
}

public class DashboardResponseDto
{
    public DashboardSummaryDto Summary { get; set; } = new();
    public List<DepartmentBreakdownDto> DepartmentBreakdown { get; set; } = new();
    public List<Employee> RecentEmployees { get; set; } = new();
}
