using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Crowdfunding {
  public class Program {
    public static void Main(string[] args) => CreateHostBuilder(args).Build().Run();

    public static IHostBuilder CreateHostBuilder(string[] args) => Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(ConfigureWebHost);
    
    private static void ConfigureWebHost(IWebHostBuilder builder) => builder
      .UseStartup<Startup>()
      .UseUrls($"http://*:{5000}");
  }
}