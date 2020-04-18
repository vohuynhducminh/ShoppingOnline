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
    public class ProductController : ApiController
    {
        string strConnection = ConfigurationManager.ConnectionStrings["CosmeticAppDB"].ConnectionString;

        [HttpGet]
        public HttpResponseMessage GetAllProduct()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblProducts";
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
        public HttpResponseMessage GetProductByID(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblProducts where id=@id";
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
        public HttpResponseMessage GetProductByName(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblProducts where name like '%"+id+"%'";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            if (cnn.State == ConnectionState.Closed)
            {
                cnn.Open();
            }
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
        public string AddProduct(Product pro)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Insert tblProducts values(@id,@name,@type,@producer,@quantity,@price,@description,@status)";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", pro.id);
            cmd.Parameters.AddWithValue("@name", pro.name);
            cmd.Parameters.AddWithValue("@type", pro.type);
            cmd.Parameters.AddWithValue("@producer", pro.producer);
            cmd.Parameters.AddWithValue("@quantity", pro.quantity);
            cmd.Parameters.AddWithValue("@price", pro.price);
            cmd.Parameters.AddWithValue("@description", pro.description);
            cmd.Parameters.AddWithValue("@status", "1");
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
        public string UpdateProduct(Product pro)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Update tblProducts set name=@name,type=@type,producer=@producer," +
                "quantity=@quantity,price=@price,description=@description,status=@status where id=@id";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", pro.id);
            cmd.Parameters.AddWithValue("@name", pro.name);
            cmd.Parameters.AddWithValue("@type", pro.type);
            cmd.Parameters.AddWithValue("@producer", pro.producer);
            cmd.Parameters.AddWithValue("@quantity", pro.quantity);
            cmd.Parameters.AddWithValue("@price", pro.price);
            cmd.Parameters.AddWithValue("@description", pro.description);
            cmd.Parameters.AddWithValue("@status", "1");
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
        public string DeleteProduct(string id)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Delete tblProducts where id=@id";

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
