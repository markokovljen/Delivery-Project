using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<User> GetUserWithEmailAsync(string email)
        {
            User user = await dc.Users.FirstOrDefaultAsync(x => x.Email == email);
            return user;
        }

        public void AddRegisterRequest(RegistrationUser registrationUser)
        {
            dc.RegistrationUsers.Add(registrationUser);
        }

        public async Task<bool> CheckUserAlreadyExistsAsync(string email)
        {
            return await dc.Users.AnyAsync(x => x.Email == email);
        }

        public async Task<List<RegistrationUser>> GetRegistrationListAsync()
        {
            var registrationList = await dc.RegistrationUsers.ToListAsync();
            return registrationList;
        }

        public void DeleteRegisterRequest(RegistrationUser registrationUser)
        {
            dc.RegistrationUsers.Remove(registrationUser);
        }

        public void AddUser(User user)
        {
            dc.Users.Add(user);
        }

        public async Task<RegistrationUser> GetUserWithIdAsync(int id)
        {
            RegistrationUser registrationUser = await dc.RegistrationUsers.FirstOrDefaultAsync(ru => ru.Id == id);
            return registrationUser;
        }

    }
}
