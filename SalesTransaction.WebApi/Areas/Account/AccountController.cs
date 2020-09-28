using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SalesTransaction.WebApi.Areas.Base;
using SalesTransaction.Model.Account;
using SalesTransaction.Service.Account;
using Microsoft.AspNetCore.Mvc;

namespace SalesTransaction.WebApi.Areas.Account
{
    public class AccountController : BaseController
    {
        private IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] MvLogin login)
        {
            try
            {
                dynamic jsonString = _accountService.GetLogin(login);
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        public IActionResult UserDetail(string json)
        {
            try
            {
                dynamic jsonString = _accountService.GetUserDetail(json);
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        public IActionResult AllUserDetail()
        {
            try
            {
                dynamic jsonString = _accountService.GetAllUserDetail();
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        
        }
    }
}
