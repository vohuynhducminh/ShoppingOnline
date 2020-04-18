using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CosmeticStoreAPI.Models
{
    public class Order
    {
        public string id { get; set; }
        public string user_id { get; set; }
        public string shoppingcart_id { get; set; }
        public DateTime date { get; set; }
        public string place { get; set; }
        public string city_id { get; set; }
        public string delivery_id { get; set; }
        public string payment_id { get; set; }
        public bool status { get; set; }

    }
}