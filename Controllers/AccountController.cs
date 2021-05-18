using System.Linq;
using Crowdfunding.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Crowdfunding.Controllers {
  [Authorize]
  [Route("api/account")]
  public class AccountController : Controller {
    private readonly AppContext _context;
    private readonly HashService _passwordHasher;


    public AccountController(
      AppContext context, HashService passwordHasher
    ) {
      _context = context;
      _passwordHasher = passwordHasher;
    }

    [HttpGet("self")]
    public IActionResult GetCurrentUser() {
      if (!_context.Users.Any()) {
        return Unauthorized();
      }
      
      return Ok(_context.Users.First(user => user.Id == this.GetUserId()));
    }
    
    [HttpPost]
    [AllowAnonymous]
    public ActionResult CreateUser([FromBody] UserDto userDto) {
      if (_context.Users.Any(u => u.Username == userDto.Username)) {
        return UnprocessableEntity("User already exists");
      }
      
      var user = new User {
        Email = userDto.Email,
        Password = _passwordHasher.HashPassword( userDto.Password, "qwe123qwe123"),
        Username = userDto.Username,
        Name = userDto.Name
      };

      _context.Users.Add(user);
      _context.SaveChanges();

      return Ok(user);
    }
  }
}