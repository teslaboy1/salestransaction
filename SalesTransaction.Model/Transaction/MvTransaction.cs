using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Model.Transaction
{
    public class MvAddTransaction
    {
        [Required]
        public int customerId { get; set; }
        [Required]
        public int productId { get; set; }
        [Required]
        public int quantity { get; set; }
        [Required]
        public int rate { get; set; }
        [Required]
        public int totalAmount { get; set; }
        [Required]
        public int insertPersonId { get; set; }
    }

    public class MvEditTransaction
    {
        [Required]
        public int transactionId { get; set; }
        [Required]
        public int customerId { get; set; }
        [Required]
        public int productId { get; set; }
        [Required]
        public int quantity { get; set; }
        [Required]
        public int rate { get; set; }
        [Required]
        public int totalAmount { get; set; }
        [Required]
        public int insertPersonId { get; set; }
    }


}
