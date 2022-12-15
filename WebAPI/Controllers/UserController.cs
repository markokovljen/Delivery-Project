using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Errors;
using WebAPI.Extensions;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("list")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> GetRegistrationList()
        {
            List<RegistrationUser> registrationList = await userService.GetRegistrationListAsync();
            return Ok(registrationList);
        }

        //api/user/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var loginResponse = await userService.AuthenticateAsync(loginRequestDto.Email, loginRequestDto.Password);
            return Ok(loginResponse);

        }

        [HttpPost("sendregisterrequest")]
        [AllowAnonymous]
        public async Task<IActionResult> SendRegisterRequest(RegisterRequestDto registerRequest)
        {
            bool result = await userService.SendRegisterRequest(registerRequest);

            if (!result)
                return BadRequest();

            return Ok();
        }

        //api/user/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterRequestDto registerRequest)
        {
            bool result = await userService.Register(registerRequest);

            if (!result)
                return BadRequest("Registration user does not exist");

            return StatusCode(201);
        }
        [HttpDelete("deleteregisterrequest/{id}")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> RejectRegisterRequest(int id)
        {
            bool result = await userService.DeleteRegisterRequest(id);

            if (!result)
                return BadRequest("User does not exist");

            return Ok();
        }

        [HttpGet("user/{username}")]
        [Authorize(Roles = "administrator,deliverer,user")]
        public async Task<IActionResult> GetUser(string username)
        {
            ModifyUserDto modifyUser = await userService.GetUserFromDbAsync(username);

            if (modifyUser == null)
            {
                return BadRequest();
            }
            return Ok(modifyUser);
        }

        [HttpPut("user/{username}")]
        [Authorize(Roles = "administrator,deliverer,user")]
        public async Task<IActionResult> ModifyUser(string username, ModifyUserDto userRequest)
        {
            bool result = await userService.ModifyUser(username, userRequest);

            if (!result)
            {
                return BadRequest();
            }
            return StatusCode(200);

        }
    }
}
