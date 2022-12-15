using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public ProductService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<int> AddProduct(ProductDto productDto)
        {
            Product product = mapper.Map<Product>(productDto);

            unitOfWork.ProductRepository.AddProduct(product);

            await unitOfWork.SaveAsync();

            return product.Id;
        }

        public async Task<List<ProductListDto>> GetProductesAsync()
        {
            List<Product> productes = await unitOfWork.ProductRepository.GetProductesAsync();
            List<ProductListDto> articleListDto = mapper.Map<List<ProductListDto>>(productes);

            return articleListDto;
        }
    }
}
