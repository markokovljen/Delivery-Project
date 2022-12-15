using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext dc;

        public OrderRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddOrder(Order order)
        {
            dc.Orders.Add(order);
        }

        public async Task<List<Order>> GetOrdersForDeliverer(int delivererId)
        {
            List<Order> orders = await dc.Orders.Include(o => o.OrderProducts)
                                                .Where(o => o.DelivererId == delivererId && (o.Status == "Delivering" || o.Status == "Finished"))
                                                .ToListAsync();
            return orders;
            
        }

        public async Task<List<Order>> GetPendingOrderListForDelivererAsync(int id)
        {
            var orders = await dc.Orders.Where(o=> o.Status == "Pending")
                                       .Include(op=>op.OrderProducts)
                                       .ToListAsync();
            return orders;

        }
        public async Task<Order> GetOrder(int orderId)
        {
            Order order = await dc.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
            return order;
        }

        public async Task<List<Order>> GetCurrentOrdersForUser(int userId)
        {
            List<Order> orders = await dc.Orders.Include(o => o.OrderProducts)
                                                 .Where(o => o.UserId == userId && (o.Status == "Delivering" || o.Status == "Finished"))
                                                 .ToListAsync();
            return orders;
        }

        public async Task<List<Order>> GetAllOrders()
        {
            List<Order> orders = await dc.Orders.Include(o => o.OrderProducts)
                                                 .ToListAsync();
          
            return orders;
        }

        public async Task<Order> GetDeliveringOrderForDeliverer(int delivererId)
        {
            Order order = await dc.Orders.FirstOrDefaultAsync(o => o.DelivererId == delivererId && o.Status == "Delivering");
            return order;
        }

        public async Task<List<Order>> GetDeliveringOrdersForUser(int userId)
        {
            List<Order> orders = await dc.Orders.Where(o => o.UserId == userId && o.Status == "Delivering").ToListAsync();
            return orders;
        }
    }
}
