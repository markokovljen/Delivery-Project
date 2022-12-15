using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace WebAPI.Errors
{
    [Serializable]
    public class ApiError : Exception
    {
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorDetails { get; set; }

        public ApiError()
        {

        }

        public ApiError(string message) : base(String.Format(message))
        {

        }

    }
}
