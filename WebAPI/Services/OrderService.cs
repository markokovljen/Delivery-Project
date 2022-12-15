using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Errors;
using WebAPI.Extensions;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public OrderService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        public async Task<List<OrderResponseDto>> GetPendingOrderListForDelivererAsync(int id)
        {
            var orders = await unitOfWork.OrderRepository.GetPendingOrderListForDelivererAsync(id);

            List<OrderResponseDto> orderResponseList = await GetOrderResponseList(orders);

            return orderResponseList;
        }

        public async Task<List<OrderResponseDto>> GetOrdersForDeliverer(int delivererId)
        {
            List<Order> orders = await unitOfWork.OrderRepository.GetOrdersForDeliverer(delivererId);

            List<OrderResponseDto> orderResponseList = await GetOrderResponseList(orders);

            return orderResponseList;
        }

        public async Task<List<OrderResponseDto>> GetOrderResponseList(List<Order> orders)
        {
            List<OrderResponseDto> orderResponseList = new List<OrderResponseDto>();
            foreach (var item in orders)
            {
                OrderResponseDto orderResponse = await GetOrderResponse(item);
                orderResponseList.Add(orderResponse);
            }
            return orderResponseList;
        }

        public async Task<bool> UpdateCurrentOrderDeliverer(int delivererId)
        {
            Order order = await unitOfWork.OrderRepository.GetDeliveringOrderForDeliverer(delivererId);
            if (order == null)
            {
                return false;
            }
            if (DateTime.Now > order.DeliveryTime)
            {
                order.Status = "Finished";              
            }

            await unitOfWork.SaveAsync();

            return true;
        }

        public async Task<bool> UpdateCurrentOrdersUser(int userId)
        {
            List<Order> orders = await unitOfWork.OrderRepository.GetDeliveringOrdersForUser(userId);

            if (orders.Count == 0)
            {
                return false;
            }

            foreach (var order in orders)
            {

                if (DateTime.Now > order.DeliveryTime)
                {
                    order.Status = "Finished";
                    continue;
                }
            }

            await unitOfWork.SaveAsync();

            return true;
        }

        private async Task<OrderResponseDto> GetOrderResponse(Order item)
        {
            OrderResponseDto orderResponse = mapper.Map<OrderResponseDto>(item);
            List<ProductForOrderDto> products = new List<ProductForOrderDto>();
            foreach (var item2 in item.OrderProducts)
            {
                Product product = await unitOfWork.ProductRepository.GetProductAsync(item2.ProductId);
                ProductForOrderDto productDto = mapper.Map<ProductForOrderDto>(product);
                productDto.Quantity = item2.Quantity;
                products.Add(productDto);
            }
            orderResponse.Products = products;
            return orderResponse;
        }

        public async Task<List<OrderResponseDto>> GetCurrentOrdersForUser(int userId)
        {
            List<Order> orders = await unitOfWork.OrderRepository.GetCurrentOrdersForUser(userId);

            List<OrderResponseDto> orderResponseList = await GetOrderResponseList(orders);

            return orderResponseList;
        }

        public async Task<List<OrderResponseDto>> GetOrdersForAdmin()
        {
            List<Order> orders = await unitOfWork.OrderRepository.GetAllOrders();

            List<OrderResponseDto> orderResponseList = await GetOrderResponseList(orders);

            return orderResponseList;
        }

        public async Task AddOrder(OrderDto orderDto)
        {
            if (orderDto.Comment.IsEmpty() || orderDto.HomeAddress.IsEmpty() || orderDto.OrderPrice == 0 || orderDto.UserId == 0)
            {
                throw new ApiError("You can not leave a blank filed!");

            }

            if (orderDto.Products.Count() == 0)
            {
                throw new ApiError("You can not have 0 products in your order!");
            }

            Order order = mapper.Map<Order>(orderDto);
            order.DelivererId = 0;
            order.Status = "Pending";
            order.DeliveryTime = new DateTime();

            unitOfWork.OrderRepository.AddOrder(order);

            await unitOfWork.SaveAsync();

            order.OrderProducts = new List<OrderProduct>();
            foreach (var product in orderDto.Products)
            {
                OrderProduct orderProduct = new OrderProduct();
                orderProduct.OrderId = order.Id;
                orderProduct.ProductId = product.ProductId;
                orderProduct.Quantity = product.Quantity;
                order.OrderProducts.Add(orderProduct);
                unitOfWork.OrderProductRepository.AddOrderProduct(orderProduct);
            }

            await unitOfWork.SaveAsync();
        }

        public async Task<bool> CheckDelivererBusy(int delivererId)
        {
            List<Order> orders = await unitOfWork.OrderRepository.GetAllOrders();
            bool result = false;
            orders.ForEach(o =>
            {
                if (o.DelivererId == delivererId && o.Status == "Delivering")
                {
                    result = true;
                }
            });
            return result;
        }


        public async Task<bool> TakeOrder(int delivererId, int orderId)
        {
            Order order = await unitOfWork.OrderRepository.GetOrder(orderId);

            if (order == null)
            {
                return false;
            }
            order.DelivererId = delivererId;
            order.Status = "Delivering";
            Random rand = new Random();
            int time = rand.Next(10, 50);
            order.DeliveryTime = DateTime.Now.AddMinutes(time);

            await unitOfWork.SaveAsync();

            return true;
        }
    }
}
