using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IOrderRepository
    {
        void AddOrder(Order order);
        Task<List<Order>> GetPendingOrderListForDelivererAsync(int id);
        Task<Order> GetOrder(int orderId);      
        Task<List<Order>> GetOrdersForDeliverer(int delivererId);
        Task<Order> GetDeliveringOrderForDeliverer(int delivererId);
        Task<List<Order>> GetCurrentOrdersForUser(int userId);
        Task<List<Order>> GetDeliveringOrdersForUser(int userId);
        Task<List<Order>> GetAllOrders();
    }
}
