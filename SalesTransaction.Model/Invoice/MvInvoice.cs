using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Application.Model.Invoice
{
    public class MvInvoice
    {
        [Required]
        public int salesTransactionId { get; set; }
        //[Required]
        //public int customerid { get; set; }
        //[Required]
        //public string customerName { get; set; }
        //[Required]
        //public int amount { get; set; }
        //[Required]
        //public int amountAfterDiscount { get; set; }
        //[Required]
        //public int insertPersonId { get; set; }
    }

    public class MvInvoiceDescription
    {
        [Required]
        public int invoiceId { get; set; }
        //public int customerId { get; set; }
        //public string customerName { get; set; }
        //public int amount { get; set; }
        //public int amountAfterDiscount { get; set; }
        //public int insertPersonId { get; set; }
    }

}