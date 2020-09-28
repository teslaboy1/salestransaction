using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SalesTransaction.DataAccess;
using SalesTransaction.Model.Product;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace SalesTransaction.Service.Product
{
    public class ProductService : IProductService
    {
        private DataAccessHelper _da;
        private readonly string _connectionString;
        private readonly int _commandTimeout;
        private IConfiguration _configuration;


        public ProductService(IConfiguration configuration)
        {
            _configuration = configuration;
            dynamic connectionString = _configuration.GetSection("ConnectionString");
            _connectionString = connectionString["DefaultConnection"];

            if (_connectionString != null)
            {
                _da = new DataAccessHelper(_connectionString);
            }

            _commandTimeout = Convert.ToInt32(connectionString["CommandTimeout"]);
        }
        public dynamic GetAllProductDetail()
        {
            using (var con = _da.GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpAllProductDetailSel";
                cmd.CommandTimeout = _commandTimeout;

                using (SqlDataReader sqlrdr = cmd.ExecuteReader())
                {
                    try
                    {
                        if (sqlrdr.HasRows)
                        {
                            return _da.GetJson(sqlrdr);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }


            }
        }

        public bool AddProduct(MvAddProduct product)
        {
            using (var con = _da.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(product);
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpProductProductRateInsTsk";
                cmd.Parameters.Add("@Json", SqlDbType.NVarChar).Value = jsonNew;
                cmd.CommandTimeout = _commandTimeout;

                int rows = cmd.ExecuteNonQuery();

                if (rows > 0)
                {
                    return true;
                }
                return false;


            }
        }

        public bool EditProduct(MvEditProduct product)
        {
            using (var con = _da.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(product);
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpProductProductRateUpdTsk";
                cmd.Parameters.Add("@Json", SqlDbType.NChar).Value = jsonNew;
                cmd.CommandTimeout = _commandTimeout;

                int rows = cmd.ExecuteNonQuery();

                if (rows > 0)
                {
                    return true;
                }
                return false;


            }
        }
    }
}
