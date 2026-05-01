using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[TestFixture]
public class EmployeesControllerTests
{
    private Mock<IEmployeeRepository> _repoMock = null!;
    private EmployeeService _service = null!;
    private EmployeesController _controller = null!;

    [SetUp]
    public void Setup()
    {
        _repoMock = new Mock<IEmployeeRepository>();
        _service = new EmployeeService(_repoMock.Object);
        _controller = new EmployeesController(_service);
    }

    [Test]
    public async Task GetAll_ReturnsOkWithPagedResult()
    {
        var employees = new List<Employee>
        {
            new Employee
            {
                Id = 1,
                FirstName = "Priya",
                LastName = "Menon",
                Email = "priya@test.com",
                Phone = "9876543210",
                Department = "HR",
                Designation = "HR Executive",
                Salary = 50000,
                JoinDate = new DateTime(2024, 1, 10),
                Status = "Active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Employee
            {
                Id = 2,
                FirstName = "Rahul",
                LastName = "Kumar",
                Email = "rahul@test.com",
                Phone = "9876543211",
                Department = "Engineering",
                Designation = "Developer",
                Salary = 70000,
                JoinDate = new DateTime(2024, 2, 12),
                Status = "Inactive",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        }.AsQueryable();

        _repoMock.Setup(r => r.GetQuery()).Returns(employees);

        var query = new EmployeeQueryParams
        {
            Page = 1,
            PageSize = 10,
            SortBy = "name",
            SortDir = "asc"
        };

        var result = await _controller.GetAll(query);

        Assert.That(result, Is.InstanceOf<OkObjectResult>());

        var okResult = result as OkObjectResult;
        Assert.That(okResult, Is.Not.Null);

        var pagedResult = okResult!.Value as PagedResult<Employee>;
        Assert.That(pagedResult, Is.Not.Null);
        Assert.That(pagedResult!.TotalCount, Is.EqualTo(2));
        Assert.That(pagedResult.Page, Is.EqualTo(1));
        Assert.That(pagedResult.PageSize, Is.EqualTo(10));
        Assert.That(pagedResult.Data.Count, Is.EqualTo(2));
    }

    [Test]
    public async Task GetById_ExistingId_ReturnsOk()
    {
        var employee = new Employee
        {
            Id = 1,
            FirstName = "Anu",
            LastName = "Sharma",
            Email = "anu@test.com",
            Phone = "9876543212",
            Department = "Finance",
            Designation = "Analyst",
            Salary = 60000,
            JoinDate = new DateTime(2024, 3, 15),
            Status = "Active",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(employee);

        var result = await _controller.GetById(1);

        Assert.That(result, Is.InstanceOf<OkObjectResult>());

        var okResult = result as OkObjectResult;
        Assert.That(okResult, Is.Not.Null);

        var returnedEmployee = okResult!.Value as Employee;
        Assert.That(returnedEmployee, Is.Not.Null);
        Assert.That(returnedEmployee!.Id, Is.EqualTo(1));
        Assert.That(returnedEmployee.FirstName, Is.EqualTo("Anu"));
    }

    [Test]
    public async Task GetById_InvalidId_ReturnsNotFound()
    {
        _repoMock.Setup(r => r.GetByIdAsync(999)).ReturnsAsync((Employee?)null);

        var result = await _controller.GetById(999);

        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task Create_ValidEmployee_ReturnsCreatedAtAction()
    {
        var dto = new EmployeeRequestDto
        {
            FirstName = "Neha",
            LastName = "Reddy",
            Email = "neha@test.com",
            Phone = "9876543213",
            Department = "Marketing",
            Designation = "Executive",
            Salary = 45000,
            JoinDate = new DateTime(2024, 4, 1),
            Status = "Active"
        };

        _repoMock.Setup(r => r.EmailExists(dto.Email, null)).ReturnsAsync(false);
        _repoMock
            .Setup(r => r.AddAsync(It.IsAny<Employee>()))
            .Callback<Employee>(e => e.Id = 101)
            .Returns(Task.CompletedTask);

        var result = await _controller.Create(dto);

        Assert.That(result, Is.InstanceOf<CreatedAtActionResult>());

        var createdResult = result as CreatedAtActionResult;
        Assert.That(createdResult, Is.Not.Null);
        Assert.That(createdResult!.ActionName, Is.EqualTo("GetById"));

        var createdEmployee = createdResult.Value as Employee;
        Assert.That(createdEmployee, Is.Not.Null);
        Assert.That(createdEmployee!.Id, Is.EqualTo(101));
        Assert.That(createdEmployee.Email, Is.EqualTo("neha@test.com"));
    }

    [Test]
    public async Task Create_DuplicateEmail_ReturnsConflict()
    {
        var dto = new EmployeeRequestDto
        {
            FirstName = "Kiran",
            LastName = "Rao",
            Email = "kiran@test.com",
            Phone = "9876543214",
            Department = "Operations",
            Designation = "Manager",
            Salary = 80000,
            JoinDate = new DateTime(2024, 4, 10),
            Status = "Active"
        };

        _repoMock.Setup(r => r.EmailExists(dto.Email, null)).ReturnsAsync(true);

        var result = await _controller.Create(dto);

        Assert.That(result, Is.InstanceOf<ConflictObjectResult>());
    }

    [Test]
    public async Task Delete_ExistingId_ReturnsOk()
    {
        var employee = new Employee
        {
            Id = 5,
            FirstName = "Sita",
            LastName = "Paul",
            Email = "sita@test.com",
            Phone = "9876543215",
            Department = "HR",
            Designation = "HR Manager",
            Salary = 55000,
            JoinDate = new DateTime(2024, 4, 20),
            Status = "Active",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _repoMock.Setup(r => r.GetByIdAsync(5)).ReturnsAsync(employee);
        _repoMock.Setup(r => r.DeleteAsync(employee)).Returns(Task.CompletedTask);

        var result = await _controller.Delete(5);

        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task Delete_InvalidId_ReturnsNotFound()
    {
        _repoMock.Setup(r => r.GetByIdAsync(500)).ReturnsAsync((Employee?)null);

        var result = await _controller.Delete(500);

        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }
}
