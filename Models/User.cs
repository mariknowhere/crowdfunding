using System.Collections.Generic;

namespace Crowdfunding.Models {
  public class User {
    public string Email { get; set; }
    public string Username { get; set; }
    public string Name { get; set; }
    public string Password { get; set; } 
    public int Id { get; set; }
    
    public ICollection<Company> Companies { get; set; } 
  }
}