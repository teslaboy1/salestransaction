using System;
using System.Collections.Generic;
using System.Text;
using SalesTransaction.Model.Account;

namespace SalesTransaction.Service.Account
{
    public interface IAccountService
    {
        dynamic GetLogin(MvLogin login);
        dynamic GetUserDetail(string json);
        dynamic GetAllUserDetail();
    }
}
