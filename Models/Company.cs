using System;
using System.Collections;
using System.Collections.Generic;

namespace Crowdfunding.Models {
  public class Company {
    public int Id { get; set; }
    public string Description { get; set; }
    public int Amount { get; set; }
    public int CurrentAmount { get; set; }
    public string Name { get; set; }
    
    public User User { get; set; }
    public int UserId { get; set; }
    public string Image { get; set; }
    public string Video { get; set; }
    public string Subject { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime EndDate { get; set; }
    
    public ICollection<Donation> Donations { get; set; }
    public ICollection<NewsRecord> News { get; set; }
  }
}