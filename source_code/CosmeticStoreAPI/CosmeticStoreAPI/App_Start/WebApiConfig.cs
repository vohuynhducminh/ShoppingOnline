using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
namespace CosmeticStoreAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
                name: "GetByNameApi",
                routeTemplate: "api/{controller}/{action}/{name}",
                defaults: new { id = RouteParameter.Optional }
            );


            config.Routes.MapHttpRoute(
              name: "LoginApi",
              routeTemplate: "api/{controller}/{action}/{id}/{password}",
              defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(

              name: "UpdateApi",
              routeTemplate: "api/{controller}/{action}/{id}",
              defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            config.EnableCors(new EnableCorsAttribute("http://127.0.0.1:5001", "*", "*"));

        }
    }
}
