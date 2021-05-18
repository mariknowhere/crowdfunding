namespace Crowdfunding.Models {
  public class AuthResult {
    public string Token { get; set; }
    public string Error { get; set; }
    public User User { get; set; }
  }
}