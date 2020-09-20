using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Model.Account
{
    public class MvAccount
    {
    }

    public class MvLogin
    {
        //public int UserId { get; set; }            
        //[Required]
        public string UserName {get; set;}

        //[Required]
        public string Password { get; set;}
    }
}
