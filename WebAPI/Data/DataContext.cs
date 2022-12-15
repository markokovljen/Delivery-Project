using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<RegistrationUser> RegistrationUsers { get; set; }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderProduct>()
                .HasKey(cs => new { cs.OrderId, cs.ProductId });
            modelBuilder.Entity<OrderProduct>()
                .HasOne(cs => cs.Order)
                .WithMany(c => c.OrderProducts)
                .HasForeignKey(cs => cs.OrderId);
            modelBuilder.Entity<OrderProduct>()
                .HasOne(cs => cs.Product)
                .WithMany(s => s.OrderProducts)
                .HasForeignKey(cs => cs.ProductId);
        }
    }
}
