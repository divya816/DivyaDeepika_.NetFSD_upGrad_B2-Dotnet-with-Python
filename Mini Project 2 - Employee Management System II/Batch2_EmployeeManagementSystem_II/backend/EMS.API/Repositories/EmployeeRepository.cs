using Microsoft.EntityFrameworkCore;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly AppDbContext _context;
    public EmployeeRepository(AppDbContext context) => _context = context;

    public IQueryable<Employee> GetQuery() => _context.Employees.AsQueryable();

    public async Task<Employee?> GetByIdAsync(int id) => await _context.Employees.FindAsync(id);

    public async Task AddAsync(Employee emp)
    {
        _context.Employees.Add(emp);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Employee emp)
    {
        _context.Employees.Update(emp);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Employee emp)
    {
        _context.Employees.Remove(emp);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> EmailExists(string email, int? excludeId = null)
    {
        return await _context.Employees.AnyAsync(e => e.Email == email && (excludeId == null || e.Id != excludeId));
    }
}