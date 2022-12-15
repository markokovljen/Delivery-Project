using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetProductesAsync();
        Task<Product> GetProductAsync(int id);
        void AddProduct(Product product);
    }
}
