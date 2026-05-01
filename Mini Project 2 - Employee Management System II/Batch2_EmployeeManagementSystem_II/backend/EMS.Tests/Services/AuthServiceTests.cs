using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

[TestFixture]
public class AuthServiceTests
{
    private AppDbContext _context;
    private AuthService _service;

    [SetUp]
    public void Setup()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString()) // fresh DB every test
            .Options;

        _context = new AppDbContext(options);

        // Seed user
        _context.Users.Add(new AppUser
        {
            Username = "admin",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
            Role = "Admin"
        });

        _context.SaveChanges();

        var config = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string>
            {
                { "Jwt:Key", "TestSecretKey123456789TestSecretKey" }, // longer key safer
                { "Jwt:Issuer", "EMS.API" },
                { "Jwt:Audience", "EMS.Client" }
            })
            .Build();

        _service = new AuthService(_context, config);
    }

    [TearDown]
    public void TearDown()
    {
        _context.Dispose();
    }

    [Test]
    public async Task Login_ValidCredentials_ReturnsToken()
    {
        // Act
        var result = await _service.LoginAsync(new LoginDto
        {
            Username = "admin",
            Password = "admin123"
        });

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Success, Is.True);

        // safer assertion
        Assert.That(string.IsNullOrEmpty(result.Token), Is.False);
    }

    [Test]
    public async Task Login_InvalidPassword_ReturnsFailure()
    {
        // Act
        var result = await _service.LoginAsync(new LoginDto
        {
            Username = "admin",
            Password = "wrongpass"
        });

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Success, Is.False);

        // safer assertion
        Assert.That(string.IsNullOrEmpty(result.Token), Is.True);
    }
}