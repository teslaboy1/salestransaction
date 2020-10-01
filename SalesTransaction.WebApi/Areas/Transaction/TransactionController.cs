using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Model.Transaction;
using SalesTransaction.Service.Transaction;
using SalesTransaction.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesTransaction.WebApi.Areas.Transaction
{
    public class TransactionController: BaseController
    {
        private ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public IActionResult AllTransactionDetail()
        {
            try
            {
                dynamic jsonString = _transactionService.GetAllTransactionDetail();
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public IActionResult AddTransaction([FromBody] MvAddTransaction transaction)
        {
            try
            {
                var added = _transactionService.AddTransaction(transaction);
                if (!added)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public IActionResult EditTransaction([FromBody] MvEditTransaction transaction)
        {
            try
            {
                var edited = _transactionService.EditTransaction(transaction);
                if (!edited)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}

