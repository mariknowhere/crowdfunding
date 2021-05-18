using Microsoft.EntityFrameworkCore;

namespace Crowdfunding.Models {
  public class AppContext : DbContext {
    public DbSet<Company> Companies { get; set; }
    public DbSet<Donation> Donations { get; set; }
    public DbSet<NewsRecord> News { get; set; }
    public DbSet<User> Users { get; set; }

    public AppContext(DbContextOptions<AppContext> options) : base(options) {
    }
  }
}