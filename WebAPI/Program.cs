using Autofac.Extensions.DependencyInjection;
using Core.Utilities.IoC;
using DataAccess.Concrete.EntityFramework.Contexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.IO;

namespace WebAPI
{
    /// <summary>
    ///
    /// </summary>
    public static class Program
    {
        /// <summary>
        ///
        /// </summary>
        /// <param name="args"></param>
        public static void Main(string[] args)
        {
            //var host = CreateHostBuilder(args).Build();
            //using (var scope = host.Services.CreateScope())
            //{
            //    var services = scope.ServiceProvider;
            //    try
            //    {
            //        var context = services.GetRequiredService<PostgreDbContext>();
            //        context.Database.Migrate();
            //        Console.WriteLine("Database migration completed.");
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.WriteLine($"Migration error: {ex.Message}");
            //    }
            //}

            CreateHostBuilder(args).Build().Run();
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
             .ConfigureAppConfiguration((context, config) =>
             {
                 var env = context.HostingEnvironment;

                 config.SetBasePath(Directory.GetCurrentDirectory())
                       .AddUserSecrets<Startup>(); 
                
             })
                .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); })
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(LogLevel.Trace);
                });
    }
}