using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class OrderDto
    {
        public int UserId { get; set; }
        public string HomeAddress { get; set; }
        public string Comment { get; set; }
        public int OrderPrice { get; set; }

        public ProductsQuantityDto[] Products { get; set; }
    }
}
