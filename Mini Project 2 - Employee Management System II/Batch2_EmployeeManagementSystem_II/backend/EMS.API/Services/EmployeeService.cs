using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

public class EmployeeService
{
    private readonly IEmployeeRepository _repo;

    public EmployeeService(IEmployeeRepository repo)
    {
        _repo = repo;
    }

    public async Task<PagedResult<Employee>> GetAllAsync(EmployeeQueryParams query)
    {
        var page = query.Page < 1 ? 1 : query.Page;
        var pageSize = query.PageSize <= 0 ? 10 : Math.Min(query.PageSize, 100);

        var data = _repo.GetQuery();
        var search = query.Search?.Trim()?.ToLower();
        var department = query.Department?.Trim()?.ToLower();
        var status = query.Status?.Trim()?.ToLower();
        var sortBy = query.SortBy?.Trim()?.ToLower() ?? "name";
        var sortDir = query.SortDir?.Trim()?.ToLower() ?? "asc";

        if (!string.IsNullOrWhiteSpace(search))
        {
            data = data.Where(e => ((e.FirstName + " " + e.LastName).ToLower().Contains(search)) || e.Email.ToLower().Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(department)) data = data.Where(e => e.Department.ToLower() == department);
        if (!string.IsNullOrWhiteSpace(status)) data = data.Where(e => e.Status.ToLower() == status);

        data = (sortBy, sortDir) switch
        {
            ("salary", "desc") => data.OrderByDescending(e => e.Salary),
            ("salary", _) => data.OrderBy(e => e.Salary),
            ("joindate", "desc") => data.OrderByDescending(e => e.JoinDate),
            ("joindate", _) => data.OrderBy(e => e.JoinDate),
            (_, "desc") => data.OrderByDescending(e => e.LastName).ThenByDescending(e => e.FirstName),
            _ => data.OrderBy(e => e.LastName).ThenBy(e => e.FirstName)
        };

        int total;
        List<Employee> employees;
        if (data.Provider is IAsyncQueryProvider)
        {
            total = await data.CountAsync();
            employees = await data.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        }
        else
        {
            total = data.Count();
            employees = data.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        }

        return new PagedResult<Employee>
        {
            Data = employees,
            TotalCount = total,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling(total / (double)pageSize)
        };
    }

    public async Task<Employee?> GetByIdAsync(int id) => await _repo.GetByIdAsync(id);

    public async Task<Employee> CreateAsync(EmployeeRequestDto dto)
    {
        if (await _repo.EmailExists(dto.Email)) throw new InvalidOperationException("Email already exists");
        var emp = new Employee
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Phone = dto.Phone,
            Department = dto.Department,
            Designation = dto.Designation,
            Salary = dto.Salary,
            JoinDate = DateTime.SpecifyKind(dto.JoinDate, DateTimeKind.Utc),
            Status = dto.Status,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        await _repo.AddAsync(emp);
        return emp;
    }

    public async Task<Employee?> UpdateAsync(int id, EmployeeRequestDto dto)
    {
        var emp = await _repo.GetByIdAsync(id);
        if (emp == null) return null;
        if (await _repo.EmailExists(dto.Email, id)) throw new InvalidOperationException("Email already exists");
        emp.FirstName = dto.FirstName;
        emp.LastName = dto.LastName;
        emp.Email = dto.Email;
        emp.Phone = dto.Phone;
        emp.Department = dto.Department;
        emp.Designation = dto.Designation;
        emp.Salary = dto.Salary;
        emp.JoinDate = DateTime.SpecifyKind(dto.JoinDate, DateTimeKind.Utc);
        emp.Status = dto.Status;
        emp.UpdatedAt = DateTime.UtcNow;
        await _repo.UpdateAsync(emp);
        return emp;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var emp = await _repo.GetByIdAsync(id);
        if (emp == null) return false;
        await _repo.DeleteAsync(emp);
        return true;
    }

    public async Task<DashboardResponseDto> GetDashboardAsync()
    {
        var query = _repo.GetQuery();
        List<Employee> employees;
        if (query.Provider is IAsyncQueryProvider) employees = await query.ToListAsync();
        else employees = query.ToList();

        var total = employees.Count;
        var departmentBreakdown = employees
            .GroupBy(e => e.Department)
            .OrderBy(g => g.Key)
            .Select(g => new DepartmentBreakdownDto
            {
                Department = g.Key,
                Count = g.Count(),
                Percentage = total == 0 ? 0 : (int)Math.Round((g.Count() * 100.0) / total)
            }).ToList();

        return new DashboardResponseDto
        {
            Summary = new DashboardSummaryDto
            {
                TotalEmployees = total,
                ActiveEmployees = employees.Count(e => e.Status == "Active"),
                InactiveEmployees = employees.Count(e => e.Status == "Inactive"),
                TotalDepartments = employees.Select(e => e.Department).Distinct().Count()
            },
            DepartmentBreakdown = departmentBreakdown,
            RecentEmployees = employees.OrderByDescending(e => e.CreatedAt).ThenByDescending(e => e.Id).Take(5).ToList()
        };
    }
}
