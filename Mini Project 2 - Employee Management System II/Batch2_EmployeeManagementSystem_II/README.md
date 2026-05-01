# Employee Management System - Mini Project 2

## Name
Malyavantham Divya Deepika

## Project Structure
- EMS.API -> .NET 8 Web API backend
- frontend -> HTML, CSS, JavaScript frontend
- EMS.Tests -> NUnit + Moq test project

## Prerequisites
- .NET SDK 8.0+
- SQL Server 2022
- Visual Studio 2026
- VS Code + Live Server

## Backend Setup
1. Open EMS.API in Visual Studio
2. Open Package Manager Console
3. Run:
   Add-Migration InitialCreate
   Update-Database
4. Press F5 or run:
   dotnet run

## Backend URL
- API Base URL: http://localhost:<port>
- Swagger UI: http://localhost:<port>/swagger/index.html
example:
- API Base URL: http://localhost:5000
- Swagger UI: http://localhost:5000/swagger/index.html

## Authentication Note

* Login is required to access employee APIs
	
### Admin
- Username: admin
- Password: admin123

### Viewer
- Username: viewer
- Password: viewer123

* JWT token must be sent in Authorization header:
  Authorization: Bearer <token>
* Admin has full access (CRUD)
* Viewer has read-only access



## Frontend Setup
1. Open frontend folder in VS Code
2. Right click index.html
3. Open with Live Server

## Login Credentials

### Admin
- Username: admin
- Password: admin123

### Viewer
- Username: viewer
- Password: viewer123

## Features
- JWT Authentication
- Role-based Authorization
- Admin / Viewer access
- Employee CRUD
- Dashboard
- Server-side Search, Filter, Sort, Pagination
- Swagger documentation
- SQL Server persistence