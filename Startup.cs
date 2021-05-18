using System.IO;
using Crowdfunding.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Crowdfunding {
  public class Startup {
    public void ConfigureServices(IServiceCollection services) {
      services.AddDbContext<AppContext>(options => options.UseSqlite($"Data Source= ./{Constants.DatabaseFilename}"));
      services.AddControllers().AddNewtonJsonServices();
      services.AddTransient<JwtService>();
      services.AddAwsS3Services();
      services.AddTransient<HashService>();
      services.AddTransient<MediaStorageService>();
      services.AddSingleton(new PasswordHasher<User>());
      services.AddControllersWithViews();
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = JwtService.TokenValidationParameters;
      });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
      app.UseCors(options => options.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
      app.UseRouting();
      app.UseAuthentication();
      app.UseAuthorization();
      app.UseEndpoints(endpointRouteBuilder => {
        endpointRouteBuilder.MapControllers();
        endpointRouteBuilder.MapFallbackToFile("index.html");
      });

      if (!File.Exists($".\\{Constants.DatabaseFilename}")) {
        app.ApplicationServices.GetService<AppContext>().Database.EnsureCreated();
      }
    }
  }
}