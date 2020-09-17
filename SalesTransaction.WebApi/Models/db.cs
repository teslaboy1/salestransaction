﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Data.SqlClient;

namespace SalesTransaction.WebApi.Models
{
    public class db
    {
        SqlConnection con;
        public db()
        { var configuration = GetConfiguration();
            con = new SqlConnection(configuration.GetSection(""))
                }

        public IConfigurationRoot GetConfiguration()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return builder.Build();
        }
    }

   

}
