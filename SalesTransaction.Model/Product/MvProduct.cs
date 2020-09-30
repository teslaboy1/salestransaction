using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SalesTransaction.Model.Product
{
    public class MvAddProduct
    {
        [Required]
        public string productName { get; set; }
        [Required]
        public int quantityAvailable { get; set; }
        [Required]
        public int marketPrice { get; set; }
        [Required]
        public DateTime startDate { get; set; }
        [Required]
        public DateTime endDate { get; set; }
        [Required]
        public DateTime manufactureDate { get; set; }
        [Required]
        public DateTime expiryDate { get; set; }
        public int insertPersonId { get; set; }



    }

    public class MvEditProduct
    {
        [Required]
        public int productId { get; set; }
        [Required]
        public string productName { get; set; }
        [Required]
        public string quantityAvailable { get; set; }
        [Required]
        public float marketPrice { get; set; }
        [Required]
        public DateTime startDate { get; set; }
        [Required]
        public DateTime endDate { get; set; }
        [Required]
        public DateTime manufactureDate { get; set; }
        [Required]
        public DateTime expiryDate { get; set; }
        public int insertPersonId { get; set; }
        [Required]
        public DateTime insertDate { get; set; }


    }
}
