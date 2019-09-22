using Microsoft.EntityFrameworkCore;

namespace WebService.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) {}

        public DbSet<UserModel> Users { get; set; }
    }
}