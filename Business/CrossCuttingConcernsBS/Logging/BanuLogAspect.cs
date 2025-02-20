using Castle.DynamicProxy;
using Core.CrossCuttingConcerns.Logging.Serilog;
using Core.CrossCuttingConcerns.Logging;
using Core.Utilities.Interceptors;
using Core.Utilities.IoC;
using Core.Utilities.Messages;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Business.Services.UserService.Abstract;
using Entities.Concrete;
using Core.Entities.Concrete;
using Newtonsoft.Json.Linq;
using Business.Handlers.Visits.Commands;
using Business.Handlers.VisitConfirms.Commands;
using Business.Constants;
using Business.Handlers.BanuLogs.Queries;

namespace Business.CrossCuttingConcernsBS.Logging
{
    public class BanuLogAspect : MethodInterception
    {
        private readonly LoggerServiceBase _loggerServiceBase;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IBanuLogRepository _banuLog;
        private readonly IVisitRepository _visitRepository;

        public BanuLogAspect(Type loggerService)
        {
            if (loggerService.BaseType != typeof(LoggerServiceBase))
            {
                throw new ArgumentException(AspectMessages.WrongLoggerType);
            }

            _loggerServiceBase = (LoggerServiceBase)ServiceTool.ServiceProvider.GetService(loggerService);
            _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
            _userRepository = ServiceTool.ServiceProvider.GetService<IUserRepository>();
            _userService = ServiceTool.ServiceProvider.GetService<IUserService>();
            _banuLog = ServiceTool.ServiceProvider.GetService<IBanuLogRepository>();
            _visitRepository = ServiceTool.ServiceProvider.GetService<IVisitRepository>();
        }

        protected override void OnBefore(IInvocation invocation)
        {
            var logDetail = GetLogDetail(invocation);
            _loggerServiceBase?.Info(logDetail);
        }

        private string GetLogDetail(IInvocation invocation)
        {
            var userId = _userService.GetUserIdFromJwt(_httpContextAccessor.HttpContext.Request);
            var user = _userRepository.GetAsync(u => u.UserId == userId).Result;

            if (user == null)
            {
                new ErrorResult(Messages.UserNotFound);
            }

            var logParameters = new List<LogParameter>();
            for (var i = 0; i < invocation.Arguments.Length; i++)
            {
                logParameters.Add(new LogParameter
                {
                    Name = invocation.GetConcreteMethod().GetParameters()[i].Name,
                    Value = invocation.Arguments[i],
                    Type = invocation.Arguments[i].GetType().Name,
                });
            }

            var transactionDescription = CreateTransactionDescription(invocation, logParameters, user);

            var logDetail = new BanuLogDetail
            {
                MethodName = invocation.Method.Name,
                Parameters = logParameters,
                User = user.FullName,
                CustomDetails = new CustomDetails
                {
                    TransactionsDescription = transactionDescription,
                    TransactorFullName = $"{user.FullName}",
                    TransactorEmail = user.Email,
                    TransactionsType = invocation.Method.Name,
                    Date = DateTime.UtcNow
                }
            };
            string transactionType = string.Empty;

            if (logParameters[0].Type == "CreateVisitCommand")
            {
                transactionType = "Ziyaret Talebi";
            }
           else if (logParameters[0].Type == "PedestrianEntranceCommand")
            {
                transactionType = "Yaya Ziyaret Talebi";
            }
            else if (logParameters[0].Type == "VehicleEntranceCommand")
            {
                transactionType = "Araçlı Ziyaret Talebi";
            }
            else if (logParameters[0].Type == "GetBanuLogsPdfGenerateQuery")
            {
                transactionType = "Admin Pdf Rapor Oluşturma";
            }
            else if (logParameters[0].Type == "GetBanuLogsPdfGenerateForSecurityQuery")
            {
                transactionType = "Güvenlik Pdf Rapor Oluşturma";
            }
            else if (logParameters[0].Type == "ConfirmVisitCommand")
            {
                transactionType = "Güvenlik Onay";
            }
            else if (logParameters[0].Type == "VisitRejectCommand")
            {
                transactionType = "Güvenlik Red";
            }
            var log = new BanuLog { CreatedDate = DateTime.Now, TransactionsDescription = transactionDescription, TransactorFullName = user.FullName, TransactorId = user.UserId, TransactionType = transactionType };
            SaveLog(log);

            return JsonConvert.SerializeObject(logDetail);
        }

        private async void SaveLog(BanuLog log)
        {
            _banuLog.Add(log);
            await _banuLog.SaveChangesAsync();
        }

        private string CreateTransactionDescription(IInvocation invocation, List<LogParameter> logParameters, User user)
        {

            if (logParameters[0].Type == "CreateVisitCommand")
            {
                var createVisitCommand = logParameters[0].Value as CreateVisitCommand;
                var visitStartDate = createVisitCommand.VisitStartDate;
                var visitEndDate = createVisitCommand.VisitEndDate;
                var visitorName = createVisitCommand.VisitorFullName;


                return $"{user.FullName}-{user.Email}, {visitorName} adına {visitStartDate}-{visitEndDate} aralığı için ziyaret talebi oluşturuldu.";
            }
            if (logParameters[0].Type == "PedestrianEntranceCommand")
            {
                var pedestrianEntranceCommand = logParameters[0].Value as PedestrianEntranceCommand;
                var visitStartDate = pedestrianEntranceCommand.VisitStartDate;
                var visitEndDate = pedestrianEntranceCommand.VisitEndDate;
                var visitorName = pedestrianEntranceCommand.VisitorFullName;


                return $"{user.FullName}-{user.Email}, {visitorName} adına {visitStartDate}-{visitEndDate} aralığı için yaya ziyareti talebi oluşturuldu.";
            }
            if (logParameters[0].Type == "VehicleEntranceCommand")
            {
                var vehicleEntranceCommand = logParameters[0].Value as VehicleEntranceCommand;
                var visitStartDate = vehicleEntranceCommand.VisitStartDate;
                var visitEndDate = vehicleEntranceCommand.VisitEndDate;
                var visitorName = vehicleEntranceCommand.VisitorFullName;


                return $"{user.FullName}-{user.Email}, {visitorName} adına {visitStartDate}-{visitEndDate} aralığı için araç ziyareti talebi oluşturuldu.";
            }
            if (logParameters[0].Type == "ConfirmVisitCommand")
            {
                DateTime now = DateTime.Now; 
                string formattedDate = now.ToString("yyyy-MM-dd HH:mm");
                var confirmVisitCommand = logParameters[0].Value as ConfirmVisitCommand;

                Visit visit = GetVisit(confirmVisitCommand.VisitId).Result;
                return $"{user.FullName}-{user.Email}, {visit.VisitorFullName} ziyaretçisine {formattedDate} tarihinde geçiş izni verdi.";
            }
            if (logParameters[0].Type == "VisitRejectCommand")
            {
                DateTime now = DateTime.Now;
                string formattedDate = now.ToString("yyyy-MM-dd HH:mm");
                var rejectVisitCommand = logParameters[0].Value as VisitRejectCommand;

                Visit visit = GetVisit(rejectVisitCommand.Id).Result;
                return $"{user.FullName}-{user.Email}, {visit.VisitorFullName} ziyaretçisine {formattedDate} tarihinde red verdi.";
            }
            if (logParameters[0].Type == "GetBanuLogsPdfGenerateQuery")
            {
                DateTime now = DateTime.Now;
                string formattedDate = now.ToString("yyyy-MM-dd HH:mm");
                var getBanuLogsPdfGenerateQuery = logParameters[0].Value as GetBanuLogsPdfGenerateQuery;

                return $"Admin {user.FullName}-{user.Email}, {formattedDate} tarihinde pdf raporu oluşturdu.";
            }
            if (logParameters[0].Type == "GetBanuLogsPdfGenerateForSecurityQuery")
            {
                DateTime now = DateTime.Now;
                string formattedDate = now.ToString("yyyy-MM-dd HH:mm");
                var getBanuLogsPdfGenerateForSecurityQuery = logParameters[0].Value as GetBanuLogsPdfGenerateForSecurityQuery;

                return $"Güvenlik {user.FullName}-{user.Email}, {formattedDate} tarihinde pdf raporu oluşturdu.";
            }
            return "Bilinmeyen işlem türü.";
        }
        private async Task<Visit> GetVisit(Guid id)
        {
            Visit visit =await  _visitRepository.GetAsync(v => v.Id == id);
            return visit;
        }
    }
  
}
