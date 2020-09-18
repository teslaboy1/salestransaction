﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesTransaction.WebApi.Areas.Base
{

    [Produces("application/json")]
    [EnableCors("AllowOrigin"),Route("api/[controller]/[action]/{id?}")]
    public class BaseController:Controller
    {
    }
}
