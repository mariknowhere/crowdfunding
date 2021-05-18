using System;

namespace Crowdfunding.Models {
  public class Donation {
    public int Id { get; set; }
    public User From { get; set; }
    public int FromId { get; set; }
    public int Amount { get; set; }
    public DateTime CreatedAt { get; set; }
    public Company Company { get; set; }
    public int CompanyId { get; set; }
  }
}