using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Model.Customer
{
    public class MvAddCustomer
    {
        [Required]
        public string firstName { get; set; }
        [Required]
        public string middleName { get; set; }
        [Required]
        public string surname { get; set; }
        [Required]
        public long contactNo { get; set; }
        [Required]
        public int insertPersonId { get; set; }
        [Required]
        public DateTime insertDate { get; set; }

    }

    public class MvEditCustomer
    {
        [Required]
        public int customerId { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string middleName { get; set; }
        [Required]
        public string surname { get; set; }
        [Required]
        public long contactNo { get; set; }
        [Required]
        public int insertPersonId { get; set; }
        [Required]
        public DateTime insertDate { get; set; }


    }
}
