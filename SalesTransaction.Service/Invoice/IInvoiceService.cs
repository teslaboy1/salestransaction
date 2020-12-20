using SalesTransaction.Application.Model.Invoice;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Service.Invoice
{
    public interface IInvoiceService
    {
        bool AddInvoice(IEnumerable<MvInvoice> sales);
        dynamic GetAllInvoiceDetail();
        dynamic GetInvoiceDescription(String json);
    }
}