using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    public class ProductController : BaseController
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProductList()
        {
            List<ProductListDto> articleListDto = await productService.GetProductesAsync();

            return Ok(articleListDto);
        }

        [HttpPost("add")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> AddProduct(ProductDto productDto)
        {
            int productId = await productService.AddProduct(productDto);
            return Ok(productId);
        }
    }
}
