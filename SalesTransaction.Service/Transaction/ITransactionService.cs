using SalesTransaction.Model.Transaction;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Service.Transaction
{
    public interface ITransactionService
    {
        dynamic GetAllTransactionDetail();

        bool AddTransaction(MvAddTransaction transaction);
        bool EditTransaction(MvEditTransaction transaction);
    }
}
