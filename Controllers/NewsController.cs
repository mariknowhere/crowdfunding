using System;
using Crowdfunding.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AppContext = Crowdfunding.Models.AppContext;

namespace Crowdfunding.Controllers {
  [Authorize]
  [Route("api/news")]
  public class NewsController: Controller {
    private readonly AppContext _appContext;
    private readonly MediaStorageService _mediaStorageService;
    
    public NewsController(AppContext appContext, MediaStorageService mediaStorageService) {
      _appContext = appContext;
      _mediaStorageService = mediaStorageService;
    }

    [HttpPost("{id}")]
    public NewsRecord CreateRecord([FromForm] NewsRecordDto newsRecordDto, int id) {
      var record = new NewsRecord {
        CompanyId = id,
        Content = newsRecordDto.Content,
        Image = _mediaStorageService.UploadMedia(newsRecordDto.Image, this.GetUserId()),
        Title = newsRecordDto.Title,
        CreatedAt = DateTime.Now
      };
      
      _appContext.News.AddRange(record);
      _appContext.SaveChanges();

      return record;
    }
  }
}