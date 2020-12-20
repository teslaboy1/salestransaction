using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SalesTransaction.WebApi.Areas.Base;
using SalesTransaction.Application.Service.Invoice;
using SalesTransaction.Application.Model.Invoice;

namespace SalesTransaction.Application.WebApi.Areas.Invoice
{
    public class InvoiceController : BaseController
    {
        private IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }


        [HttpPost]
        public IActionResult AddInvoice([FromBody] IEnumerable<MvInvoice> sales)
        {
            try
            {
                var added = _invoiceService.AddInvoice(sales);
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

        [HttpGet]
        public IActionResult AllInvoiceDetail()
        {
            try
            {
                dynamic jsonString = _invoiceService.GetAllInvoiceDetail();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult InvoiceDescription(string json)
        {
            try
            {
                dynamic jsonString = _invoiceService.GetInvoiceDescription(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }


    }
}