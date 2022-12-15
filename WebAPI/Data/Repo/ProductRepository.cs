using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext dc;

        public ProductRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddProduct(Product product)
        {
            dc.Products.Add(product);
        }

        public async Task<Product> GetProductAsync(int id)
        {
            return await dc.Products.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Product>> GetProductesAsync()
        {
            var productes = await dc.Products.ToListAsync();
            return productes;
        }
    }
}
