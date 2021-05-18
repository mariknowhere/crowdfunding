using Microsoft.AspNetCore.Http;

namespace Crowdfunding.Models {
  public class NewsRecordDto {
    public string Title { get; set; }
    public string Content { get; set; }
    public IFormFile Image { get; set; }
  }
}