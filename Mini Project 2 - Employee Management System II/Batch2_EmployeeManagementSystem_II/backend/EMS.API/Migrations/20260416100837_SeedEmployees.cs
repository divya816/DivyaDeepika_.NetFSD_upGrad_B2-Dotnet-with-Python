using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMS.API.Migrations
{
    /// <inheritdoc />
    public partial class SeedEmployees : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$eV3s0EX7Zb26LkcT0PqBcOD7Dw.UF27QnmNaohyn6P2rN/FEcHHKK");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$aYNfYlUZ92ZVAAxk4dAk6.NgrvGtbo7fS4aPxJDntQ7ZTf7THGTHa");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$8lxccSmzuJXmquxaX2YHmuDq8gKqKdfNt97LB7jBGT2bB2FvRQfG2");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$XcbftHSmdlcfJ.0YqfOZy.AylEwEDpKhjHa1DOTdFq.5FzPVaMOZ6");
        }
    }
}
