using SalesTransaction.Model.Product;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Service.Product
{
    public interface IProductService
    {
        bool AddProduct(MvAddProduct product);
        dynamic GetAllProductDetail();
        bool EditProduct(MvEditProduct product);

    }
}
