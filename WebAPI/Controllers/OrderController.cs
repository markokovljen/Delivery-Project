using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Errors;
using WebAPI.Extensions;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    public class OrderController : BaseController
    {
        private readonly IOrderService orderService;

        public OrderController(IOrderService orderService)
        {
            this.orderService = orderService;
        }

        [HttpGet("list/deliverer/{id}")]
        [Authorize(Roles = "deliverer")]
        public async Task<IActionResult> GetPendingOrderListForDeliverer(int id)
        {
            List<OrderResponseDto> orders = await orderService.GetPendingOrderListForDelivererAsync(id);

            return Ok(orders);
        }


        [HttpPut("deliverer/updatecurrentorder/{delivererId}")]
        [Authorize(Roles = "deliverer")]
        public async Task<IActionResult> UpdateCurrentOrderDeliverer(int delivererId)
        {
            bool result = await orderService.UpdateCurrentOrderDeliverer(delivererId);

            if (!result)
            {
                return BadRequest();
            }
     
            return Ok();
        }

        [HttpPut("user/updatecurrentorder/{userId}")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> UpdateCurrentOrderUser(int userId)
        {
            bool result = await orderService.UpdateCurrentOrdersUser(userId);

            if (!result)
            {
                return BadRequest();
            }
 
            return Ok();
        }

        [HttpGet("deliverer/currentorder/{delivererId}")]
        [Authorize(Roles = "deliverer")]
        public async Task<IActionResult> GetCurrentOrderForDeliverer(int delivererId)
        {
            List<OrderResponseDto> orders = await orderService.GetOrdersForDeliverer(delivererId);

            return Ok(orders);
        }

        [HttpGet("user/currentorder/{userId}")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> GetCurrentOrderForUser(int userId)
        {
            List<OrderResponseDto> orders = await orderService.GetCurrentOrdersForUser(userId);

            return Ok(orders);
        }

        [HttpGet("admin/currentorder")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> GetOrderForAdmin()
        {
            List<OrderResponseDto> orders = await orderService.GetOrdersForAdmin();

            return Ok(orders);
        }

        [HttpPost("add")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> AddOrder(OrderDto orderDto)
        {
            await orderService.AddOrder(orderDto);

            return Ok();
        }

        [HttpPut("deliverer/take/{delivererId}/{orderId}")]
        [Authorize(Roles = "deliverer")]
        public async Task<IActionResult> TakeOrder(int delivererId, int orderId)
        {
            bool result = await orderService.CheckDelivererBusy(delivererId);

            if (result)
            {
                return BadRequest();
            }

            result = await orderService.TakeOrder(delivererId, orderId);

            if(!result)
            {
                return BadRequest();
            }
            
            return Ok();
        }
    }
}
