using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Order : BaseEntity
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int DelivererId { get; set; }
        [Required]
        public string HomeAddress { get; set; }
        [Required]
        public string Comment { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public int OrderPrice { get; set; }
        [Required]
        public DateTime DeliveryTime { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
    }
}
