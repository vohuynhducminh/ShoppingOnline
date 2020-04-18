using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CosmeticStoreAPI.Models
{
    public class History
    {
        public string id { get; set; }
        public string order_id { get; set; }
        public string user_id { get; set; }
        public string status { get; set; }
    }
}