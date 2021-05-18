using System.Linq;
using Crowdfunding.Models;
using Microsoft.AspNetCore.Mvc;

namespace Crowdfunding.Controllers {
  [Route("api/auth/login")]
  public class AuthController : Controller {
    private readonly AppContext _appContext;
    private readonly JwtService _jwtService;
    private readonly HashService _hasher;

    public AuthController(AppContext appContext, JwtService jwtService, HashService hasher) {
     _appContext = appContext;
      _jwtService = jwtService;
      _hasher = hasher;
    }

    [HttpPost]
    public AuthResult Login([FromBody] AuthDto authDto) {
      var passwordHash = _hasher.HashPassword(authDto.Password, "qwe123qwe123");
      var validatedUser = _appContext.Users.FirstOrDefault(
        user => user.Username == authDto.Username && user.Password == passwordHash
      );

      return new AuthResult {
        Token = validatedUser != null
          ? _jwtService.CreateJwt(validatedUser.Id)
          : null,
        Error = validatedUser != null ? null : "Неверный логин или пароль.",
        User = validatedUser
      };
    }
  }
}