using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CosmeticStoreAPI.Models
{
    public class User
    {
        public string username { get; set; }
        public string password { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string email { get; set; }

        public string number { get; set; }
        public string role_id { get; set; }
        public string city_id { get; set; }
        public bool status { get; set; }
    }
}