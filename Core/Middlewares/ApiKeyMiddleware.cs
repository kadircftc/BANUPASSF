using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Middlewares
{
    public class ApiKeyMiddleware
    {
        private readonly RequestDelegate _next;

        public ApiKeyMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var path = context.Request.Path.Value;
            var endpoint=path.Split("/").Last();
            if (path.StartsWith("secured"))
            {
                if (!context.Request.Headers.ContainsKey("ApiKey"))
                {
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsync("API Key is required");
                    return;
                }

                var apiKey = context.Request.Headers["ApiKey"].ToString();
                if (apiKey != "d145s142-sdttf-3fasf-aqQI-DFWS") 
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await context.Response.WriteAsync("Invalid API Key");
                    return;
                }
                else 
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await context.Response.WriteAsync("Success");
                    return;
                }
            }

            await _next(context);
        }
    }

}
