using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using System.Security.Cryptography.X509Certificates;
using System.Data;
using Newtonsoft.Json;

namespace SalesTransaction.DataAccess
{
    public class DataAccessHelper
    {
        private SqlConnection _con;
        private string _conString;

        public DataAccessHelper(string connectionString)
        {
            _conString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            try
            {
                SetConnection();
                return _con;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void SetConnection()
        {
                _con = new SqlConnection(_conString);
                if (_con.State == ConnectionState.Closed)
                {
                    _con.Open();
                }
                else
                {
                    _con.Close();
                    _con.Open();
                }
        }

        public dynamic GetJson(SqlDataReader reader)
        {
                var dataTable = new DataTable();
                dataTable.Load(reader);

                if (dataTable.Rows[0] != null && dataTable.Rows[0]["Json"].ToString() != "")
                {
                    return JsonConvert.DeserializeObject(dataTable.Rows[0]["Json"].ToString());
                }
                else 
                {
                    return null;
                }
        }
        }
    }

