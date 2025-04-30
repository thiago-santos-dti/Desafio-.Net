using Microsoft.EntityFrameworkCore;
using LeadsManagementAPI.Models;

namespace LeadsManagementAPI.Data
{
    public class LeadsDbContext : DbContext
    {
        public LeadsDbContext(DbContextOptions<LeadsDbContext> options) : base(options) { }

        public DbSet<Lead> Leads { get; set; }
    }
}

