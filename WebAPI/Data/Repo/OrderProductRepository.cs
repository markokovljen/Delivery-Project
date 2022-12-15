using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class OrderProductRepository : IOrderProductRepository
    {
        private readonly DataContext dc;

        public OrderProductRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddOrderProduct(OrderProduct orderProduct)
        {
            dc.OrderProducts.Add(orderProduct);
        }
    }
}
