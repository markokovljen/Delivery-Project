using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }

        IProductRepository ProductRepository { get; }

        IOrderRepository OrderRepository { get; }

        IOrderProductRepository OrderProductRepository { get; }
        Task<bool> SaveAsync();
    }
}
