using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<AppUser> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.Property(e => e.Salary).HasPrecision(18, 2);
            entity.HasIndex(e => e.Email).IsUnique();
        });

        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.HasIndex(u => u.Username).IsUnique();
        });

        modelBuilder.Entity<AppUser>().HasData(
            new AppUser { Id = 1, Username = "admin", PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"), Role = "Admin", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new AppUser { Id = 2, Username = "viewer", PasswordHash = BCrypt.Net.BCrypt.HashPassword("viewer123"), Role = "Viewer", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
        );

        modelBuilder.Entity<Employee>().HasData(
            new Employee { Id = 1, FirstName = "Priya", LastName = "Menon", Email = "priya.menon@xyz.com", Phone = "9876543210", Department = "Engineering", Designation = "Software Engineer", Salary = 750000m, JoinDate = new DateTime(2022, 6, 15, 0, 0, 0, DateTimeKind.Utc), Status = "Active", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 2, FirstName = "Arjun", LastName = "Sharma", Email = "arjun.sharma@xyz.com", Phone = "9876543211", Department = "Marketing", Designation = "Marketing Analyst", Salary = 680000m, JoinDate = new DateTime(2021, 9, 10, 0, 0, 0, DateTimeKind.Utc), Status = "Active", CreatedAt = new DateTime(2026, 1, 2, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 2, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 3, FirstName = "Neha", LastName = "Kapoor", Email = "neha.kapoor@xyz.com", Phone = "9876543212", Department = "HR", Designation = "HR Executive", Salary = 620000m, JoinDate = new DateTime(2023, 1, 5, 0, 0, 0, DateTimeKind.Utc), Status = "Active", CreatedAt = new DateTime(2026, 1, 3, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 3, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 4, FirstName = "Rohan", LastName = "Iyer", Email = "rohan.iyer@xyz.com", Phone = "9876543213", Department = "Finance", Designation = "Financial Analyst", Salary = 710000m, JoinDate = new DateTime(2020, 11, 1, 0, 0, 0, DateTimeKind.Utc), Status = "Inactive", CreatedAt = new DateTime(2026, 1, 4, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 4, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 5, FirstName = "Sneha", LastName = "Rao", Email = "sneha.rao@xyz.com", Phone = "9876543214", Department = "Operations", Designation = "Operations Coordinator", Salary = 590000m, JoinDate = new DateTime(2022, 3, 20, 0, 0, 0, DateTimeKind.Utc), Status = "Active", CreatedAt = new DateTime(2026, 1, 5, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 5, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 6, FirstName = "Kiran", LastName = "Patel", Email = "kiran.patel@xyz.com", Phone = "9876543215", Department = "Engineering", Designation = "QA Engineer", Salary = 700000m, JoinDate = new DateTime(2021, 12, 12, 0, 0, 0, DateTimeKind.Utc), Status = "Inactive", CreatedAt = new DateTime(2026, 1, 6, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 6, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 7, FirstName = "Meera", LastName = "Joshi", Email = "meera.joshi@xyz.com", Phone = "9876543216", Department = "Marketing", Designation = "Content Strategist", Salary = 640000m, JoinDate = new DateTime(2023, 7, 18, 0, 0, 0, DateTimeKind.Utc), Status = "Active", CreatedAt = new DateTime(2026, 1, 7, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 7, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 8, FirstName = "Amit", LastName = "Verma", Email = "amit.verma@xyz.com", Phone = "9876543217", Department = "HR", Designation = "Talent Acquisition Specialist", Salary = 610000m, JoinDate = new DateTime(2022, 8, 8, 0, 0, 0, DateTimeKind.Utc), Status = "Inactive", CreatedAt = new DateTime(2026, 1, 8, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 8, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 9, FirstName = "Divya", LastName = "Nair", Email = "divya.nair@xyz.com", Phone = "9876543218", Department = "Finance", Designation = "Accountant", Salary = 660000m, JoinDate = new DateTime(2021, 5, 25, 0, 0, 0, DateTimeKind.Utc), Status = "Active", CreatedAt = new DateTime(2026, 1, 9, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 9, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 10, FirstName = "Vikram", LastName = "Singh", Email = "vikram.singh@xyz.com", Phone = "9876543219", Department = "Operations", Designation = "Logistics Lead", Salary = 720000m, JoinDate = new DateTime(2020, 2, 14, 0, 0, 0, DateTimeKind.Utc), Status = "Active", CreatedAt = new DateTime(2026, 1, 10, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 10, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 11, FirstName = "Ananya", LastName = "Das", Email = "ananya.das@xyz.com", Phone = "9876543220", Department = "Engineering", Designation = "UI Developer", Salary = 730000m, JoinDate = new DateTime(2024, 1, 12, 0, 0, 0, DateTimeKind.Utc), Status = "Active", CreatedAt = new DateTime(2026, 1, 11, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 11, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 12, FirstName = "Rahul", LastName = "Kulkarni", Email = "rahul.kulkarni@xyz.com", Phone = "9876543221", Department = "Marketing", Designation = "SEO Specialist", Salary = 605000m, JoinDate = new DateTime(2023, 4, 9, 0, 0, 0, DateTimeKind.Utc), Status = "Inactive", CreatedAt = new DateTime(2026, 1, 12, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 12, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 13, FirstName = "Pooja", LastName = "Bhat", Email = "pooja.bhat@xyz.com", Phone = "9876543222", Department = "HR", Designation = "HR Manager", Salary = 780000m, JoinDate = new DateTime(2020, 6, 30, 0, 0, 0, DateTimeKind.Utc), Status = "Active", CreatedAt = new DateTime(2026, 1, 13, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 13, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 14, FirstName = "Sanjay", LastName = "Gupta", Email = "sanjay.gupta@xyz.com", Phone = "9876543223", Department = "Finance", Designation = "Finance Manager", Salary = 810000m, JoinDate = new DateTime(2019, 10, 3, 0, 0, 0, DateTimeKind.Utc), Status = "Active", CreatedAt = new DateTime(2026, 1, 14, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 14, 0, 0, 0, DateTimeKind.Utc) },
            new Employee { Id = 15, FirstName = "Lavanya", LastName = "Krishnan", Email = "lavanya.krishnan@xyz.com", Phone = "9876543224", Department = "Operations", Designation = "Operations Manager", Salary = 790000m, JoinDate = new DateTime(2021, 1, 22, 0, 0, 0, DateTimeKind.Utc), Status = "Inactive", CreatedAt = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc), UpdatedAt = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc) }
        );
    }
}
