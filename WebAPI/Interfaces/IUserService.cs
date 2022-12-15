using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserService
    {
        Task<List<RegistrationUser>> GetRegistrationListAsync();
        Task<LoginResponseDto> AuthenticateAsync(string email, string passwordText);
        Task<bool> SendRegisterRequest(RegisterRequestDto registerRequest);
        Task<bool> Register(RegisterRequestDto registerRequest);
        Task<bool> DeleteRegisterRequest(int id);
        Task<ModifyUserDto> GetUserFromDbAsync(string username);
        Task<bool> ModifyUser(string username, ModifyUserDto userRequest);
    }
}
