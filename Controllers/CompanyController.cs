using System;
using System.Collections.Generic;
using System.Linq;
using Crowdfunding.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppContext = Crowdfunding.Models.AppContext;

namespace Crowdfunding.Controllers {
  [Authorize]
  [Route("api/company")]
  public class CompanyController : Controller {
    private readonly AppContext _context;
    private readonly MediaStorageService _mediaStorageService;

    public CompanyController(AppContext context, MediaStorageService mediaStorageService) {
      _context = context;
      _mediaStorageService = mediaStorageService;
    }

    [HttpGet]
    [AllowAnonymous]
    public List<Company> GetCompanies() => _context.Companies
      .Include(c => c.User)
      .Include(c => c.News)
      .Include(c => c.Donations)
      .ThenInclude(d => d.From)
      .ToList();

    [HttpGet("self")]
    public List<Company> GetSelfCompanies() => _context.Companies
      .Where(c => c.UserId == this.GetUserId())
      .Include(c => c.User)
      .Include(c => c.News)
      .Include(c => c.Donations)
      .ThenInclude(d => d.From)
      .ToList();

    [AllowAnonymous]
    [HttpGet("{id}")]
    public Company GetCompany(int id) {
      return _context.Companies
        .Include(c => c.User)
        .Include(c => c.News)
        .Include(c => c.Donations)
        .ThenInclude(d => d.From)
        .First(c => c.Id == id);
    }

    [HttpPost]
    public Company CreateCompany([FromForm] CompanyDto companyDto) {
      var company = new Company {
        Name = companyDto.Name,
        Description = companyDto.Description,
        Amount = companyDto.Amount,
        UserId = this.GetUserId(),
        CurrentAmount = 0,
        Video = companyDto.Video,
        Image = _mediaStorageService.UploadMedia(companyDto.Image, this.GetUserId()),
        Subject = companyDto.Subject,
        CreatedAt = DateTime.Now,
        EndDate = companyDto.EndDate,
        Donations = new List<Donation>(),
        News = new List<NewsRecord>(),
      };

      _context.Companies.Add(company);
      _context.SaveChanges();

      return company;
    }

    [HttpPost("donate/{id}")]
    public Donation Donate([FromBody] DonationDto donationDto, int id) {
      var donation = new Donation {
        Amount = donationDto.Amount,
        CompanyId = id,
        FromId = this.GetUserId(),
        CreatedAt = DateTime.Now,
      };
      _context.Donations.Add(donation);
      _context.SaveChanges();

      return donation;
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteCompany(int id) {
      _context.Companies.Remove(_context.Companies.First(c => c.Id == id));
      _context.SaveChanges();

      return Ok();
    }
  }
}