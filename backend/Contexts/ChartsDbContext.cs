using Microsoft.EntityFrameworkCore;
using Models;

namespace Contexts
{
    public class ChartsDbContext : DbContext
    {
        public ChartsDbContext(DbContextOptions<ChartsDbContext> options)
            : base(options)
        {
        }

        public DbSet<Chart> Charts { get; set; }
    }
}