using NUnit.Framework;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[TestFixture]
public class EmployeeServiceTests
{
    private Mock<IEmployeeRepository> _repoMock;
    private EmployeeService _service;

    [SetUp]
    public void Setup()
    {
        _repoMock = new Mock<IEmployeeRepository>();
        _service = new EmployeeService(_repoMock.Object);
    }

    [Test]
    public async Task GetAllAsync_ReturnsAllEmployees()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee { Id = 1, FirstName = "Divya", LastName = "D", Email="a@test.com", Department="HR", Status="Active", Salary=1000 },
            new Employee { Id = 2, FirstName = "John", LastName = "J", Email="b@test.com", Department="IT", Status="Inactive", Salary=2000 }
        }.AsQueryable();

        _repoMock.Setup(r => r.GetQuery()).Returns(employees);

        var query = new EmployeeQueryParams
        {
            Page = 1,
            PageSize = 10,
            SortBy = "name",
            SortDir = "asc"
        };

        // Act
        var result = await _service.GetAllAsync(query);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.TotalCount, Is.EqualTo(2));
        Assert.That(result.Data.Count, Is.EqualTo(2));
    }

    [Test]
    public async Task GetAllAsync_SearchFilter_ReturnsFilteredResult()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee { Id = 1, FirstName = "Divya", LastName = "Deepika", Email="divya@test.com", Department="HR", Status="Active", Salary=1000 },
            new Employee { Id = 2, FirstName = "John", LastName = "Doe", Email="john@test.com", Department="IT", Status="Active", Salary=2000 }
        }.AsQueryable();

        _repoMock.Setup(r => r.GetQuery()).Returns(employees);

        var query = new EmployeeQueryParams
        {
            Search = "Divya",
            Page = 1,
            PageSize = 10
        };

        // Act
        var result = await _service.GetAllAsync(query);

        // Assert
        Assert.That(result.TotalCount, Is.EqualTo(1));
        Assert.That(result.Data.First().FirstName, Is.EqualTo("Divya"));
    }

    [Test]
    public async Task GetAllAsync_DepartmentFilter_ReturnsFilteredResult()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee { Id = 1, Department="HR", FirstName="A", LastName="B", Email="a@test.com", Status="Active", Salary=1000 },
            new Employee { Id = 2, Department="IT", FirstName="C", LastName="D", Email="c@test.com", Status="Active", Salary=2000 }
        }.AsQueryable();

        _repoMock.Setup(r => r.GetQuery()).Returns(employees);

        var query = new EmployeeQueryParams
        {
            Department = "HR",
            Page = 1,
            PageSize = 10
        };

        // Act
        var result = await _service.GetAllAsync(query);

        // Assert
        Assert.That(result.TotalCount, Is.EqualTo(1));
        Assert.That(result.Data.All(e => e.Department == "HR"), Is.True);
    }

    [Test]
    public async Task GetAllAsync_StatusFilter_ReturnsFilteredResult()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee { Id = 1, Status="Active", FirstName="A", LastName="B", Email="a@test.com", Department="HR", Salary=1000 },
            new Employee { Id = 2, Status="Inactive", FirstName="C", LastName="D", Email="c@test.com", Department="IT", Salary=2000 }
        }.AsQueryable();

        _repoMock.Setup(r => r.GetQuery()).Returns(employees);

        var query = new EmployeeQueryParams
        {
            Status = "Active",
            Page = 1,
            PageSize = 10
        };

        // Act
        var result = await _service.GetAllAsync(query);

        // Assert
        Assert.That(result.TotalCount, Is.EqualTo(1));
        Assert.That(result.Data.All(e => e.Status == "Active"), Is.True);
    }
}