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
    public class ProductRenderController : ApiController
    {
        string strConnection = ConfigurationManager.ConnectionStrings["CosmeticAppDB"].ConnectionString;

        [HttpGet]
        public HttpResponseMessage GetAllProductRender()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select id,name,type,price,img from tblProducts";
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
        public HttpResponseMessage GetProductRenderByID(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select id,name,type,price,img from tblProducts where id=@id";
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
        [HttpGet]
        public HttpResponseMessage GetProductRenderByName(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select id,name,type,price,img from tblProducts where name like '%" + id + "%'";

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
        public HttpResponseMessage GetAllProductRenderPrice()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select id,price from tblProducts";
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

