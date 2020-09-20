using System;
using System.Data;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text;
using SalesTransaction.Model.Account;
using SalesTransaction.DataAccess;
using SalesTransaction.Service.Account;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace SalesTransaction.Service.Account
{
    public class AccountService : IAccountService
    {
        private DataAccessHelper _da;
        private readonly int _commandTimeout;
        private readonly string _connectionString;
        private IConfiguration _configuration;

        public AccountService(IConfiguration configuration)
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

        public dynamic GetLogin(MvLogin login)
        {
            using (var con = _da.GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SpUserSel";
                cmd.Parameters.AddWithValue("@UserName",login.UserName);
                cmd.Parameters.AddWithValue("@Password", login.Password);
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

        public dynamic GetUserDetail(String json)
        {
            using (var con = _da.GetConnection())
            {
                var cmd = con.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                dynamic jsonNew = JsonConvert.DeserializeObject(json);
                cmd.CommandText = "SpUserDetailSel";
                cmd.Parameters.AddWithValue("@UserId", Convert.ToString(jsonNew.UserId));
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
    }
}