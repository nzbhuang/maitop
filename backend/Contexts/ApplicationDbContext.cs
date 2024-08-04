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
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Score> Scores { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.Scores);

            modelBuilder.Entity<Chart>()
                .HasKey(e => e.ChartId);

            modelBuilder.Entity<Score>()
                .HasOne(s => s.Chart)
                .WithMany()
                .HasForeignKey(s => s.ChartId);

            base.OnModelCreating(modelBuilder);
        }
    }
}