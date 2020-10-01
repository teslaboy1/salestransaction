using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SalesTransaction.DataAccess;
using SalesTransaction.Model.Transaction;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace SalesTransaction.Service.Transaction
{
    public class TransactionService : ITransactionService
    {
        private DataAccessHelper _da;
        private readonly string _connectionString;
        private readonly int _commandTimeout;
        private IConfiguration _configuration;


        public TransactionService(IConfiguration configuration)
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
        public dynamic GetAllTransactionDetail()
        {
            using (var con = _da.GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpAllTransactionDetailSel";
                cmd.CommandTimeout = _commandTimeout;

                using (SqlDataReader redr = cmd.ExecuteReader())
                {
                    try
                    {
                        if (redr.HasRows)
                        {
                            return _da.GetJson(redr);
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

        public bool AddTransaction(MvAddTransaction transaction)
        {
            using (var con = _da.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(transaction);
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpSalesTransactionIns_JSON";
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

        public bool EditTransaction(MvEditTransaction transaction)
        {
            using (var con = _da.GetConnection())
            {
                var jsonNew = JsonConvert.SerializeObject(transaction);
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpSalesTransactionUpd_Json";
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

