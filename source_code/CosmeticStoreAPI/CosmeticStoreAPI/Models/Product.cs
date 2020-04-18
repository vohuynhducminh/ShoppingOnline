using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CosmeticStoreAPI.Models
{
    public class Product
    {
        public string id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string producer { get; set; }
        public int quantity { get; set; }
        public int price { get; set; }
        public int description { get; set; }
        public bool status { get; set; }
    }
}