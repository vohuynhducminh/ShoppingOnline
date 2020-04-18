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
    public class ShoppingCartController : ApiController
    {
        string strConnection = ConfigurationManager.ConnectionStrings["CosmeticAppDB"].ConnectionString;
        [HttpGet]
        public HttpResponseMessage GetShoppingCart()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblShoppingCart";
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
        public HttpResponseMessage GetShoppingByID(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblShoppingCart where id=@id";
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
        [HttpGet]
        public HttpResponseMessage GetShoppingID()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);

            string SQL = "select id from tblShoppingCart";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            if (cnn.State == ConnectionState.Closed)
            {
                cnn.Open();
            }
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
        [HttpPost]
        public string AddShoppingCart(ShoppingCart scart)
        {
            DataTable dt = new DataTable();
        string result;
        SqlConnection cnn = new SqlConnection(strConnection);
        string SQL = "Insert tblShoppingCart values(@id,@totalPrice)";
        SqlCommand cmd = new SqlCommand(SQL, cnn);
        cmd.Parameters.AddWithValue("@id", scart.id);
            cmd.Parameters.AddWithValue("@totalPrice", scart.totalPrice);
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
    }
    }

