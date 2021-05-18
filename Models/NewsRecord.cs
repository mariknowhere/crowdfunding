using System;

namespace Crowdfunding.Models {
  public class NewsRecord {
    public int Id { get; set; }
    public string Content { get; set; }
    public string Title { get; set; }
    public string Image { get; set; }

    public Company Company { get; set; }
    public int CompanyId { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}