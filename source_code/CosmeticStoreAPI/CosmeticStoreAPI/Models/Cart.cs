using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CosmeticStoreAPI.Models
{
    public class Cart
    {
        public string id { get; set; }
        public string product_id { get; set; }
        public string code_id { get; set; }
        public string shoppingcart_id { get; set; }
        public int quantity { get; set; }
    }
}