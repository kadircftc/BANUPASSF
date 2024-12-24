using Core.Utilities.Messages;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using MongoDB.Driver.Core.WireProtocol.Messages;
using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Security;
using System.Threading.Tasks;
using System.Linq;

namespace Core.Extensions
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;


        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(httpContext, e);
            }
        }


        private async Task HandleExceptionAsync(HttpContext httpContext, Exception e)
        {
            httpContext.Response.ContentType = "application/json";
            httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            _ = e.Message;
            string message;
            if (e is FluentValidation.ValidationException validationException)
            {
                httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;

               
                var errors = validationException.Errors
                    .Select(err => new { PropertyName = err.PropertyName, ErrorMessage = err.ErrorMessage })
                    .ToList();

                message = System.Text.Json.JsonSerializer.Serialize(new
                {
                    StatusCode = httpContext.Response.StatusCode,
                    Message = "Validation failed",
                    Errors = errors
                });
            }
            else if (e.GetType() == typeof(ApplicationException))
            {
                message = e.Message;
                httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }
            else if (e.GetType() == typeof(UnauthorizedAccessException))
            {
                message = e.Message;
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            }
            else if (e.GetType() == typeof(SecurityException))
            {
                message = e.Message;
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            }
            else if (e.GetType() == typeof(NotSupportedException))
            {
                message = e.Message;
                httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }
            else
            {
                message = ExceptionMessage.InternalServerError;
            }

            await httpContext.Response.WriteAsync(message);
        }
    }
}