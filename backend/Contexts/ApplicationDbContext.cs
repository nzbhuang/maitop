using Microsoft.EntityFrameworkCore;
using Models;

namespace Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Chart> Charts { get; set; }
        public DbSet<User> User { get; set; } = default!;
        public DbSet<Score> Score { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.Scores)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.UserId);

            modelBuilder.Entity<Score>()
                .HasOne(s => s.Chart)
                .WithMany()
                .HasForeignKey(s => s.ChartId);

            base.OnModelCreating(modelBuilder);
        }
    }
}