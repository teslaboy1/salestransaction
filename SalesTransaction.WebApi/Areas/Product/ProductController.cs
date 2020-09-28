using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Model.Product;
using SalesTransaction.Service.Product;
using SalesTransaction.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesTransaction.WebApi.Areas.Product
{
    public class ProductController : BaseController
    {
        private IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult AllProductDetail()
        {
            try
            {
                dynamic jsonString = _productService.GetAllProductDetail();
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public IActionResult AddProduct([FromBody] MvAddProduct product)
        {
            try
            {
                var added = _productService.AddProduct(product);
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
        public IActionResult EditProduct([FromBody] MvEditProduct product)
        {
            try
            {
                var edited = _productService.EditProduct(product);
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
