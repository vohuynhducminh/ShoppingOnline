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
    public class CartController : ApiController
    {
        string strConnection = ConfigurationManager.ConnectionStrings["CosmeticAppDB"].ConnectionString;

        [HttpGet]
        public HttpResponseMessage GetAllCart()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblCarts";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            if (cnn.State == ConnectionState.Closed)
            {
                cnn.Open();
            }
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            cnn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
        [HttpGet]
        public HttpResponseMessage GetCartByID(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblCarts where id=@id";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", id);
            if (cnn.State == ConnectionState.Closed)
            {
                cnn.Open();
            }
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            cnn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
        [HttpPost]

        public string AddCart(Cart cart)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Insert tblCarts values(@id,@product_id,@code_id,@shoppingcart_id,@quantity)";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", cart.id);
            cmd.Parameters.AddWithValue("@product_id", cart.product_id);
            cmd.Parameters.AddWithValue("@code_id", cart.code_id);
            cmd.Parameters.AddWithValue("@shoppingcart_id", cart.shoppingcart_id);
            cmd.Parameters.AddWithValue("@quantity", cart.quantity);

            try
            {
                if (cnn.State == ConnectionState.Closed)
                {
                    cnn.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
                cnn.Close();
                return "Added successfully";


            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        [HttpPut]
        public string UpdateCart(Cart cart)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Update tblCarts set product_id=@product_id,code_id=@code_id,quantity=@quantity," +
              "shoppingcart_id=@shoppingcart_id where id=@id";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", cart.id);
            cmd.Parameters.AddWithValue("@product_id", cart.product_id);
            cmd.Parameters.AddWithValue("@code_id", cart.code_id);
            cmd.Parameters.AddWithValue("@quantity", cart.quantity);
            cmd.Parameters.AddWithValue("@shoppingcart_id", cart.shoppingcart_id);
            try
            {
                if (cnn.State == ConnectionState.Closed)
                {
                    cnn.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
                cnn.Close();
                return "Update successfully";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        [HttpDelete]
        public string DeleteCart(string id)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Delete tblCarts where id=@id";

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
                cnn.Close();
                return "Delete Successfully !";

            }
            catch (Exception ex)
            {
                return ex.ToString();

            }

        }

        [HttpGet]
        public HttpResponseMessage GetCartID()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select id from tblCarts";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            if (cnn.State == ConnectionState.Closed)
            {
                cnn.Open();
            }
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            cnn.Close();
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }

    }
}
