using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
            return new AuthResponseDto { Success = false, Message = "Username and Password are required" };

        if (dto.Password.Length < 6)
            return new AuthResponseDto { Success = false, Message = "Password must be at least 6 characters" };

        dto.Role = string.IsNullOrWhiteSpace(dto.Role) ? "Viewer" : dto.Role;
        if (dto.Role != "Admin" && dto.Role != "Viewer")
            return new AuthResponseDto { Success = false, Message = "Role must be Admin or Viewer" };

        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == dto.Username.ToLower());
        if (existingUser != null)
            return new AuthResponseDto { Success = false, Message = "Username already exists" };

        var user = new AppUser
        {
            Username = dto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password, 12),
            Role = dto.Role,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new AuthResponseDto
        {
            Success = true,
            Username = user.Username,
            Role = user.Role,
            Token = GenerateToken(user),
            Message = "Registration successful"
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
            return new AuthResponseDto { Success = false, Message = "Username and Password are required" };

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == dto.Username.ToLower());
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return new AuthResponseDto { Success = false, Message = "Invalid credentials" };

        return new AuthResponseDto
        {
            Success = true,
            Username = user.Username,
            Role = user.Role,
            Token = GenerateToken(user),
            Message = "Login successful"
        };
    }

    private string GenerateToken(AppUser user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var hours = double.TryParse(_config["Jwt:ExpiryHours"], out var expiryHours) ? expiryHours : 8;

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(hours),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
