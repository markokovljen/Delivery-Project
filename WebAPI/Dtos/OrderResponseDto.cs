using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Dtos
{
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int DelivererId { get; set; }
        public string HomeAddress { get; set; }
        public string Comment { get; set; }
        public string Status { get; set; }
        public int OrderPrice { get; set; }
        public DateTime DeliveryTime { get; set; }
        public List<ProductForOrderDto> Products { get; set; } 
    }
}
