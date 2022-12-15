using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Errors;
using WebAPI.Extensions;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public UserService(IUnitOfWork unitOfWork, IConfiguration configuration, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.configuration = configuration;
            this.mapper = mapper;
        }

        public async Task<LoginResponseDto> AuthenticateAsync(string email, string passwordText)
        {
            User user = await unitOfWork.UserRepository.GetUserWithEmailAsync(email);
            ValidateUser(user);
            if (!MatchPasswordHash(passwordText, user.Password, user.PasswordKey))
                throw new ApiError("Invalid Password");

            var loginResponse = new LoginResponseDto();
            loginResponse.Id = user.Id;
            loginResponse.Email = user.Email;
            loginResponse.Role = user.Role;
            loginResponse.Token = CreateJWT(user);

            return loginResponse;
            
        }

        protected void ValidateUser(User user)
        {
            if (user == null)
                throw new ApiError("Invalid User email or Pass");
            if (user.PasswordKey == null)
                throw new ApiError("Invalid Password key");
        }
        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
                                                          
            {
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));
                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i]) 
                        return false;                     
                }
                return true;
            }
        }

        public async Task<List<RegistrationUser>> GetRegistrationListAsync()
        {
            List<RegistrationUser> registrationList = await unitOfWork.UserRepository.GetRegistrationListAsync();
            return registrationList;
        }

        private string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:Key").Value;

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey));

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name,user.Email),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Role,user.Role.ToString())
            }; 

            var signingCredentials = new SigningCredentials(
                    key, SecurityAlgorithms.HmacSha256Signature
            );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signingCredentials,

            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token); 
        }

        public async Task<bool> SendRegisterRequest(RegisterRequestDto registerRequest)
        {
            await ValidateRegisterRequest(registerRequest);  
            try
            {
                RegistrationUser registrationUser = mapper.Map<RegistrationUser>(registerRequest);
                unitOfWork.UserRepository.AddRegisterRequest(registrationUser);
                await unitOfWork.SaveAsync();
            }
            catch
            {
                return false;
            }
            return true;
            
        }

        private async Task ValidateRegisterRequest(RegisterRequestDto registerRequest)
        {

            if (CheckFiledsAreEmpty(registerRequest))
            {
                throw new ApiError("You can not leave a blank filed for email or password!");

            }
            else if (!PasswordMatch(registerRequest.Password, registerRequest.ConfirmPassword))
            {
                throw new ApiError("Passwords must match!");
            }
            else if (await unitOfWork.UserRepository.CheckUserAlreadyExistsAsync(registerRequest.Email))
            {
                
                throw new ApiError("User already exists, please try different user name!");
            }

        }

        private bool CheckFiledsAreEmpty(RegisterRequestDto registerRequest)
        {
            return registerRequest.UserName.IsEmpty() ||
                   registerRequest.FirstName.IsEmpty() ||
                   registerRequest.LastName.IsEmpty() ||
                   registerRequest.Email.IsEmpty() ||
                   registerRequest.Address.IsEmpty();
        }

        public async Task<bool> Register(RegisterRequestDto registerRequest)
        {
            await ValidateRegisterRequest(registerRequest);

            try
            {
                RegistrationUser registrationUser = await unitOfWork.UserRepository.GetUserWithIdAsync(registerRequest.Id);

                if (registerRequest != null)
                    unitOfWork.UserRepository.DeleteRegisterRequest(registrationUser);
                else
                {
                    throw new ApiError("Registration user does not exists");
                }

                byte[] passwordHash, passwordKey;

                HashPassword(registerRequest.Password, out passwordHash, out passwordKey);

                User user = InitializeUser(registerRequest, passwordHash, passwordKey);

                unitOfWork.UserRepository.AddUser(user);
               
                await unitOfWork.SaveAsync();
            }
            catch 
            {
                return false;
            }
            return true;
        }

        private void HashPassword(string password, out byte[] passwordHash, out byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512())//hmac ->hashbased message authetihation code
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private User InitializeUser(RegisterRequestDto registerRequest,
                                    byte[] passwordHash, byte[] passwordKey)
        {
            User user = new User();
            user.UserName = registerRequest.UserName;
            user.FirstName = registerRequest.FirstName;
            user.LastName = registerRequest.LastName;
            user.Email = registerRequest.Email;
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;
            user.Address = registerRequest.Address;
            user.DateOfBirth = registerRequest.DateOfBirth;
            user.Role = registerRequest.Role;
            return user;
        }

        public async Task<bool> DeleteRegisterRequest(int id)
        {
            try
            {
                RegistrationUser registrationUser = await unitOfWork.UserRepository.GetUserWithIdAsync(id);
                if(registrationUser == null)
                {
                    throw new ApiError("User does not exist");
                }

                unitOfWork.UserRepository.DeleteRegisterRequest(registrationUser);

                await unitOfWork.SaveAsync();
            }
            catch
            {
                return false;
            }
            return true;   
        }

        public bool PasswordMatch(string password, string passwordConfirm)
        {
            return password == passwordConfirm;
        }
        public async Task<ModifyUserDto> GetUserFromDbAsync(string username)
        {
            try
            {
                User user = await unitOfWork.UserRepository.GetUserWithEmailAsync(username);
                ModifyUserDto modifyUser = new ModifyUserDto();
                modifyUser.UserName = user.UserName;
                modifyUser.FirstName = user.FirstName;
                modifyUser.LastName = user.LastName;
                modifyUser.Address = user.Address;
                modifyUser.DateOfBirth = user.DateOfBirth;
                return modifyUser;
            }
            catch
            {
                return null;
            }
            
        }

        public async Task<bool> ModifyUser(string username, ModifyUserDto userRequest)
        {
            try
            {
                User userFromDb = await unitOfWork.UserRepository.GetUserWithEmailAsync(username);
                userFromDb.UserName = userRequest.UserName;
                userFromDb.FirstName = userRequest.FirstName;
                userFromDb.LastName = userRequest.LastName;
                userFromDb.Address = userRequest.Address;
                userFromDb.DateOfBirth = userRequest.DateOfBirth;

                await unitOfWork.SaveAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
