using System;
using Microsoft.AspNetCore.Http;

namespace Crowdfunding.Models {
  public class CompanyDto {
    public string Name { get; set; }
    public string Description { get; set; }

    public int Amount { get; set; }

    public string Subject { get; set; }
    public IFormFile Image { get; set; }
    public string Video { get; set; }
    public DateTime EndDate { get; set; }
  }
}