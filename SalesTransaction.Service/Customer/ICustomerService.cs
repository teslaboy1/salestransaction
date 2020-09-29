﻿using SalesTransaction.Model.Customer;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Service.Customer
{
    public interface ICustomerService
    {
        bool AddCustomer(MvAddCustomer customer);
        dynamic GetAllCustomerDetail();
        bool EditCustomer(MvEditCustomer customer);
    }
}
