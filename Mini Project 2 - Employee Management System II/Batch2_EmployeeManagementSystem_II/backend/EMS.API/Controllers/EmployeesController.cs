using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/employees")]
public class EmployeesController : ControllerBase
{
    private readonly EmployeeService _service;

    public EmployeesController(EmployeeService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin,Viewer")]
    public async Task<IActionResult> GetAll([FromQuery] EmployeeQueryParams query)
    {
        var result = await _service.GetAllAsync(query);
        return Ok(result);
    }

    [HttpGet("dashboard")]
    [Authorize(Roles = "Admin,Viewer")]
    public async Task<IActionResult> GetDashboard()
    {
        var result = await _service.GetDashboardAsync();
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin,Viewer")]
    public async Task<IActionResult> GetById(int id)
    {
        var emp = await _service.GetByIdAsync(id);
        if (emp == null) return NotFound(new { message = "Employee not found" });
        return Ok(emp);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] EmployeeRequestDto dto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        try
        {
            var emp = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = emp.Id }, emp);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] EmployeeRequestDto dto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        try
        {
            var updated = await _service.UpdateAsync(id, dto);
            if (updated == null) return NotFound(new { message = "Employee not found" });
            return Ok(updated);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted) return NotFound(new { message = "Employee not found" });
        return Ok(new { message = "Deleted successfully" });
    }
}
