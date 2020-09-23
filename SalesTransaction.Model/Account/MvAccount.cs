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
                  
        public int userId { get; set; }
        public string UserName {get; set;}

        
        public string Password { get; set;}
    }
}
