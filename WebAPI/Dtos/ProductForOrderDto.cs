using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class ProductForOrderDto
    {
        public string Name { get; set; }
        public string Ingredient { get; set; }
        public int Quantity { get; set; }
    }
}
