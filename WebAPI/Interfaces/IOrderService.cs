using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IOrderService
    {
        Task<List<OrderResponseDto>> GetPendingOrderListForDelivererAsync(int id);
        Task<bool> UpdateCurrentOrderDeliverer(int delivererId);
        Task<bool> UpdateCurrentOrdersUser(int userId);
        Task<List<OrderResponseDto>> GetOrdersForDeliverer(int delivererId);
        Task<List<OrderResponseDto>> GetCurrentOrdersForUser(int userId);
        Task<List<OrderResponseDto>> GetOrdersForAdmin();
        Task AddOrder(OrderDto order);
        Task<bool> CheckDelivererBusy(int delivererId);
        Task<bool> TakeOrder(int delivererId, int orderId);
    }
}
