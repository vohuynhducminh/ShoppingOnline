using CosmeticStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CosmeticStoreAPI.Controllers
{
    public class OrderController : ApiController
    {
        string strConnection = ConfigurationManager.ConnectionStrings["CosmeticAppDB"].ConnectionString;

        [HttpGet]
        public HttpResponseMessage GetAllOrder()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblOrders";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            if (cnn.State == ConnectionState.Closed)
            {
                cnn.Open();
            }
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
        [HttpGet]
        public HttpResponseMessage GetOrderByID(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblOrders where id=@id";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", id);
            if (cnn.State == ConnectionState.Closed)
            {
                cnn.Open();
            }
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
        [HttpPost]
       
        public string AddOrder(Order ord)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Insert tblOrders values(@id,@user_id,@date,@place,@city_id,@delivery_id,@payment_id,@status,@shoppingcart_id)";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", ord.id);
            cmd.Parameters.AddWithValue("@user_id", ord.user_id);
            cmd.Parameters.AddWithValue("@date", ord.date);
            cmd.Parameters.AddWithValue("@place", ord.place);
            cmd.Parameters.AddWithValue("@city_id", ord.city_id);
            cmd.Parameters.AddWithValue("@delivery_id", ord.delivery_id);
            cmd.Parameters.AddWithValue("@payment_id", ord.payment_id);
            cmd.Parameters.AddWithValue("@status", "1");
            cmd.Parameters.AddWithValue("@shoppingcart_id", ord.shoppingcart_id);

            try
            {
                if (cnn.State == ConnectionState.Closed)
                {
                    cnn.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
                return "Added successfully";


            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        [HttpPut]
        public string UpdateOrder(Order ord)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Update tblOrders set user_id=@user_id,date=@date,place=@place," +
                "city_id=@city_id,delivery_id=@delivery_id,payment_id=@payment_id,status=@status,shoppingcart_id=@shoppingcart_id where id=@id";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", ord.id);
            cmd.Parameters.AddWithValue("@user_id", ord.user_id);
            cmd.Parameters.AddWithValue("@date", ord.date);
            cmd.Parameters.AddWithValue("@place", ord.place);
            cmd.Parameters.AddWithValue("@city_id", ord.city_id);
            cmd.Parameters.AddWithValue("@delivery_id", ord.delivery_id);
            cmd.Parameters.AddWithValue("@payment_id", ord.payment_id);
            cmd.Parameters.AddWithValue("@status", "1");
            cmd.Parameters.AddWithValue("@shoppingcart_id", ord.shoppingcart_id);
            try
            {
                if (cnn.State == ConnectionState.Closed)
                {
                    cnn.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
                return "Update successfully";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        [HttpDelete]
        public string DeleteOrder(string id)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Delete tblOrders where id=@id";

            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", id);
            try
            {
                if (cnn.State == ConnectionState.Closed)
                {
                    cnn.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
                return "Delete Successfully !";

            }
            catch (Exception ex)
            {
                return ex.ToString();

            }

        }
    }
}
