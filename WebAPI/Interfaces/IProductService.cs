using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductListDto>> GetProductesAsync();
        Task<int> AddProduct(ProductDto productDto);
    }
}
