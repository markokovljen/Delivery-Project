using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        void AddRegisterRequest(RegistrationUser registrationUser);
        void AddUser(User user);
        void DeleteRegisterRequest(RegistrationUser registrationUser);
        Task<bool> CheckUserAlreadyExistsAsync(string email);
        Task<User> GetUserWithEmailAsync(string email);
        Task<RegistrationUser> GetUserWithIdAsync(int id);
        Task<List<RegistrationUser>> GetRegistrationListAsync();

    }
}
