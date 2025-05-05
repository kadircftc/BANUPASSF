using Business.BusinessAspects;
using Business.Constants;
using Business.CrossCuttingConcernsBS.Logging;
using Business.Handlers.VisitConfirms.ValidationRules;
using Business.Services.UserService.Abstract;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Validation;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Entities.Concrete;
using Core.Utilities.Mail;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.VisitConfirms.Commands
{
    public class ConfirmVisitCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public System.Guid VisitId { get; set; }

        public class ConfirmVisitCommandHandler : IRequestHandler<ConfirmVisitCommand, Core.Utilities.Results.IResult>
        {
            private readonly IVisitConfirmRepository _visitConfirmRepository;
            private readonly IVisitRepository _visitRepository;
            private readonly IMediator _mediator;
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly IUserService _userService;
            private readonly IUserRepository _userRepository;
            private readonly IMailService _mailService;

            public ConfirmVisitCommandHandler(IVisitConfirmRepository visitConfirmRepository, IVisitRepository visitRepository, IMediator mediator, IHttpContextAccessor httpContextAccessor, IUserService userService, IUserRepository userRepository, IMailService mailService)
            {
                _visitConfirmRepository = visitConfirmRepository;
                _visitRepository = visitRepository;
                _mediator = mediator;
                _httpContextAccessor = httpContextAccessor;
                _userService = userService;
                _userRepository = userRepository;
                _mailService = mailService;
            }

            [ValidationAspect(typeof(UpdateVisitConfirmValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [BanuLogAspect(typeof(MsSqlLoggerProcess))]
            [SecuredOperation(Priority = 1)]
            public async Task<Core.Utilities.Results.IResult> Handle(ConfirmVisitCommand request, CancellationToken cancellationToken)
            {

                var visitRecord = await _visitRepository.GetAsync(u => u.Id == request.VisitId);
                visitRecord.ApprovalDate =DateTime.Now;
                visitRecord.IsConfirm =true;
                var userId = _userService.GetUserIdFromJwt(_httpContextAccessor.HttpContext.Request);
                var securityVisitConfirm=new VisitConfirm { CreatedDate = DateTime.Now ,SecurityId=userId,VisitId=request.VisitId};
                User user = await _userRepository.GetAsync(u => u.UserId == visitRecord.PersonnelId);

                _visitRepository.Update(visitRecord);
                _visitConfirmRepository.Add(securityVisitConfirm);
                await _visitRepository.SaveChangesAsync();
                await _visitConfirmRepository.SaveChangesAsync();


                _= Task.Run(async () =>
                {
                    await _mailService.SendAsync(user, visitRecord.VisitorFullName, true);
                });
                return new SuccessResult($"{visitRecord.VisitorFullName} {DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss")} tarihinde giriş yaptı");

            }
        }
    }
}
