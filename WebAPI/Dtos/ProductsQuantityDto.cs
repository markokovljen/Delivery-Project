using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class ProductsQuantityDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
