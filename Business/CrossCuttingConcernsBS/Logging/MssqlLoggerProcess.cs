using Core.CrossCuttingConcerns.Logging.Serilog.ConfigurationModels;
using Core.CrossCuttingConcerns.Logging.Serilog;
using Core.Utilities.IoC;
using Core.Utilities.Messages;
using Serilog.Sinks.MSSqlServer;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Business.CrossCuttingConcernsBS.Logging
{
    public class MsSqlLoggerProcess : LoggerServiceBase
    {
        public MsSqlLoggerProcess()
        {
            var configuration = ServiceTool.ServiceProvider.GetService<IConfiguration>();
            if (configuration == null)
            {
                throw new Exception("Configuration yüklenemedi!");
            }
            var logConfig = configuration.GetSection("SeriLogConfigurations:MsSqlConfiguration")
                                .Get<MsSqlConfiguration>() ??
                            throw new Exception(SerilogMessages.NullOptionsMessage);

            var sinkOpts = new MSSqlServerSinkOptions
            {
                TableName = "LogsTransactions",
                AutoCreateSqlTable = true
            };

            var columnOpts = new ColumnOptions();
            columnOpts.Store.Remove(StandardColumn.Message);
            columnOpts.Store.Remove(StandardColumn.Properties);

            columnOpts.AdditionalColumns = new System.Collections.ObjectModel.Collection<SqlColumn>
            {
                new SqlColumn("TransactorFullName", System.Data.SqlDbType.NVarChar),
                new SqlColumn("TransactorId", System.Data.SqlDbType.Int),
                new SqlColumn("TransactionsDescription", System.Data.SqlDbType.NVarChar),
                new SqlColumn("TransactionType", System.Data.SqlDbType.NVarChar),
                new SqlColumn("Date", System.Data.SqlDbType.DateTime)
            };

            var seriLogConfig = new LoggerConfiguration()
                .WriteTo.MSSqlServer(
                    connectionString: logConfig.ConnectionString,
                    sinkOptions: sinkOpts,
                    columnOptions: columnOpts)
                .CreateLogger();

            Logger = seriLogConfig;
        }
    }
}
