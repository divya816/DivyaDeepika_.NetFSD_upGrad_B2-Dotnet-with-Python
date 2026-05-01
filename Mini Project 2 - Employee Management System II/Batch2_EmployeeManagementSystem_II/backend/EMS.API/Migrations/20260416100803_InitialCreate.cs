using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EMS.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Designation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Salary = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    JoinDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "CreatedAt", "Department", "Designation", "Email", "FirstName", "JoinDate", "LastName", "Phone", "Salary", "Status", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Engineering", "Software Engineer", "priya.menon@xyz.com", "Priya", new DateTime(2022, 6, 15, 0, 0, 0, 0, DateTimeKind.Utc), "Menon", "9876543210", 750000m, "Active", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, new DateTime(2026, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), "Marketing", "Marketing Analyst", "arjun.sharma@xyz.com", "Arjun", new DateTime(2021, 9, 10, 0, 0, 0, 0, DateTimeKind.Utc), "Sharma", "9876543211", 680000m, "Active", new DateTime(2026, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 3, new DateTime(2026, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), "HR", "HR Executive", "neha.kapoor@xyz.com", "Neha", new DateTime(2023, 1, 5, 0, 0, 0, 0, DateTimeKind.Utc), "Kapoor", "9876543212", 620000m, "Active", new DateTime(2026, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 4, new DateTime(2026, 1, 4, 0, 0, 0, 0, DateTimeKind.Utc), "Finance", "Financial Analyst", "rohan.iyer@xyz.com", "Rohan", new DateTime(2020, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Iyer", "9876543213", 710000m, "Inactive", new DateTime(2026, 1, 4, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 5, new DateTime(2026, 1, 5, 0, 0, 0, 0, DateTimeKind.Utc), "Operations", "Operations Coordinator", "sneha.rao@xyz.com", "Sneha", new DateTime(2022, 3, 20, 0, 0, 0, 0, DateTimeKind.Utc), "Rao", "9876543214", 590000m, "Active", new DateTime(2026, 1, 5, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 6, new DateTime(2026, 1, 6, 0, 0, 0, 0, DateTimeKind.Utc), "Engineering", "QA Engineer", "kiran.patel@xyz.com", "Kiran", new DateTime(2021, 12, 12, 0, 0, 0, 0, DateTimeKind.Utc), "Patel", "9876543215", 700000m, "Inactive", new DateTime(2026, 1, 6, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 7, new DateTime(2026, 1, 7, 0, 0, 0, 0, DateTimeKind.Utc), "Marketing", "Content Strategist", "meera.joshi@xyz.com", "Meera", new DateTime(2023, 7, 18, 0, 0, 0, 0, DateTimeKind.Utc), "Joshi", "9876543216", 640000m, "Active", new DateTime(2026, 1, 7, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 8, new DateTime(2026, 1, 8, 0, 0, 0, 0, DateTimeKind.Utc), "HR", "Talent Acquisition Specialist", "amit.verma@xyz.com", "Amit", new DateTime(2022, 8, 8, 0, 0, 0, 0, DateTimeKind.Utc), "Verma", "9876543217", 610000m, "Inactive", new DateTime(2026, 1, 8, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 9, new DateTime(2026, 1, 9, 0, 0, 0, 0, DateTimeKind.Utc), "Finance", "Accountant", "divya.nair@xyz.com", "Divya", new DateTime(2021, 5, 25, 0, 0, 0, 0, DateTimeKind.Utc), "Nair", "9876543218", 660000m, "Active", new DateTime(2026, 1, 9, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 10, new DateTime(2026, 1, 10, 0, 0, 0, 0, DateTimeKind.Utc), "Operations", "Logistics Lead", "vikram.singh@xyz.com", "Vikram", new DateTime(2020, 2, 14, 0, 0, 0, 0, DateTimeKind.Utc), "Singh", "9876543219", 720000m, "Active", new DateTime(2026, 1, 10, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 11, new DateTime(2026, 1, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Engineering", "UI Developer", "ananya.das@xyz.com", "Ananya", new DateTime(2024, 1, 12, 0, 0, 0, 0, DateTimeKind.Utc), "Das", "9876543220", 730000m, "Active", new DateTime(2026, 1, 11, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 12, new DateTime(2026, 1, 12, 0, 0, 0, 0, DateTimeKind.Utc), "Marketing", "SEO Specialist", "rahul.kulkarni@xyz.com", "Rahul", new DateTime(2023, 4, 9, 0, 0, 0, 0, DateTimeKind.Utc), "Kulkarni", "9876543221", 605000m, "Inactive", new DateTime(2026, 1, 12, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 13, new DateTime(2026, 1, 13, 0, 0, 0, 0, DateTimeKind.Utc), "HR", "HR Manager", "pooja.bhat@xyz.com", "Pooja", new DateTime(2020, 6, 30, 0, 0, 0, 0, DateTimeKind.Utc), "Bhat", "9876543222", 780000m, "Active", new DateTime(2026, 1, 13, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 14, new DateTime(2026, 1, 14, 0, 0, 0, 0, DateTimeKind.Utc), "Finance", "Finance Manager", "sanjay.gupta@xyz.com", "Sanjay", new DateTime(2019, 10, 3, 0, 0, 0, 0, DateTimeKind.Utc), "Gupta", "9876543223", 810000m, "Active", new DateTime(2026, 1, 14, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 15, new DateTime(2026, 1, 15, 0, 0, 0, 0, DateTimeKind.Utc), "Operations", "Operations Manager", "lavanya.krishnan@xyz.com", "Lavanya", new DateTime(2021, 1, 22, 0, 0, 0, 0, DateTimeKind.Utc), "Krishnan", "9876543224", 790000m, "Inactive", new DateTime(2026, 1, 15, 0, 0, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "PasswordHash", "Role", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "$2a$11$8lxccSmzuJXmquxaX2YHmuDq8gKqKdfNt97LB7jBGT2bB2FvRQfG2", "Admin", "admin" },
                    { 2, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "$2a$11$XcbftHSmdlcfJ.0YqfOZy.AylEwEDpKhjHa1DOTdFq.5FzPVaMOZ6", "Viewer", "viewer" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_Email",
                table: "Employees",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
