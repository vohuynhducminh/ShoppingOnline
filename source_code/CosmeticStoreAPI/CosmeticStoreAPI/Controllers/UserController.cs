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
    public class UserController : ApiController
    {
        string strConnection= ConfigurationManager.ConnectionStrings["CosmeticAppDB"].ConnectionString;
      
        [HttpGet]
        public HttpResponseMessage GetAllUser()
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = @"select * from tblUsers";
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
        public HttpResponseMessage GetUserByID(string id)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select * from tblUsers where username=@id";
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
        public HttpResponseMessage GetLogin(string id,string password)
        {
            DataTable dt = new DataTable();
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "select username,name,address, role_id, number,email,city_id from tblUsers where username=@id and password=@password";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@password", password);
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
        public string AddUser(User user)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Insert tblUsers values(@Username,@Password,@Name,@Address,@Number,@RoleID,@Status,@Email,@CityID)";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@Username", user.username);
            cmd.Parameters.AddWithValue("@Password", user.password);
            cmd.Parameters.AddWithValue("@Name", user.name);
            cmd.Parameters.AddWithValue("@Address", user.address);
            cmd.Parameters.AddWithValue("@Email", user.email);
            cmd.Parameters.AddWithValue("@Number", user.number);
            cmd.Parameters.AddWithValue("@RoleID", user.role_id);
            cmd.Parameters.AddWithValue("@CityID", user.city_id);
            cmd.Parameters.AddWithValue("@Status", true);

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
        public string UpdateUser(User user)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Update tblUsers set password=@Password,name=@Name,address=@Address,number=@Number," +
                "role_id=@RoleID,status=@Status,email=@Email,city_id=@CityID where username=@Username";
            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@Username", user.username);
            cmd.Parameters.AddWithValue("@Password", user.password);
            cmd.Parameters.AddWithValue("@Name", user.name);
            cmd.Parameters.AddWithValue("@Address", user.address);
            cmd.Parameters.AddWithValue("@Email", user.email);
            cmd.Parameters.AddWithValue("@Number", user.number);
            cmd.Parameters.AddWithValue("@RoleID", user.role_id);
            cmd.Parameters.AddWithValue("@CityID", user.city_id);
            cmd.Parameters.AddWithValue("@Status", user.status);
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
        public string Delete(string id)
        {
            DataTable dt = new DataTable();
            string result;
            SqlConnection cnn = new SqlConnection(strConnection);
            string SQL = "Delete tblUsers where username=@Username";

            SqlCommand cmd = new SqlCommand(SQL, cnn);
            cmd.Parameters.AddWithValue("@Username", id);
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

    }
}
