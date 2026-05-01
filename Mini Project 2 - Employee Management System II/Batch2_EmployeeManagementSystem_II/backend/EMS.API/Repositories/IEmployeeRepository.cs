public interface IEmployeeRepository
{
    IQueryable<Employee> GetQuery();
    Task<Employee?> GetByIdAsync(int id);
    Task AddAsync(Employee emp);
    Task UpdateAsync(Employee emp);
    Task DeleteAsync(Employee emp);
    Task<bool> EmailExists(string email, int? excludeId = null);
}