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
    public class HistoryController : ApiController
    {
        string strConnection = ConfigurationManager.ConnectionStrings["CosmeticAppDB"].ConnectionString;

        [HttpGet]
        public HttpResponseMessage GetAllHistory()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblHistory";
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
        public HttpResponseMessage GetHistoryByID(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblHistory where id=@id";
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
        public HttpResponseMessage GetHistoryByUserID(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select order_id from tblHistory where user_id=@id";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id",id);
            if (cnn.State == ConnectionState.Closed)
            {
                cnn.Open();
            }
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dt);
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
        [HttpPost]

        public string AddHistory(History his)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Insert tblHistory values(@id,@order_id,@user_id,@status)";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", his.id);
            cmd.Parameters.AddWithValue("@user_id", his.user_id);
            cmd.Parameters.AddWithValue("@order_id", his.order_id);
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
        
       
        [HttpDelete]
        public string DeleteOrder(string id)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Delete tblHistory where id=@id";

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
