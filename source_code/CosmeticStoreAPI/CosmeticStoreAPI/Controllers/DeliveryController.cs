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
    public class DeliveryController : ApiController
    {
        string strConnection = ConfigurationManager.ConnectionStrings["CosmeticAppDB"].ConnectionString;
        [HttpGet]
        public HttpResponseMessage GetAllDelivery()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblDeliveries";
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
        public HttpResponseMessage GetDeliveryByID(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblDeliveries where id=@id";
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
    }
}
