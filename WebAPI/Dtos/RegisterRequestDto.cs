using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class RegisterRequestDto
    {
        [Required(ErrorMessage = "UserName is mandatory field")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "FirstName is mandatory field")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "LastName is mandatory field")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Email is mandatory field")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is mandatory field")]
        [StringLength(50, MinimumLength = 8)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm password is mandatory field")]
        [StringLength(50, MinimumLength = 8)]
        public string ConfirmPassword { get; set; }


        [Required(ErrorMessage = "Address is mandatory field")]
        public string Address { get; set; }
        [Required(ErrorMessage = "DateOfBirth is mandatory field")]
        public DateTime DateOfBirth { get; set; }

        public string Role { get; set; }

        public int Id { get; set; }

    }
}
