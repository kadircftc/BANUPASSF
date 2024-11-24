using Business.BusinessAspects;
using Business.Constants;
using Business.Handlers.VisitConfirms.ValidationRules;
using Business.Services.UserService.Abstract;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Validation;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
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

            public ConfirmVisitCommandHandler(IVisitConfirmRepository visitConfirmRepository, IVisitRepository visitRepository, IMediator mediator, IHttpContextAccessor httpContextAccessor, IUserService userService)
            {
                _visitConfirmRepository = visitConfirmRepository;
                _visitRepository = visitRepository;
                _mediator = mediator;
                _httpContextAccessor = httpContextAccessor;
                _userService = userService;
            }

            [ValidationAspect(typeof(UpdateVisitConfirmValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<Core.Utilities.Results.IResult> Handle(ConfirmVisitCommand request, CancellationToken cancellationToken)
            {

                var visitRecord = await _visitRepository.GetAsync(u => u.Id == request.VisitId);
                visitRecord.ApprovalDate =DateTime.Now;
                visitRecord.IsConfirm =true;
                var userId = _userService.GetUserIdFromJwt(_httpContextAccessor.HttpContext.Request);
                var securityVisitConfirm=new VisitConfirm { CreatedDate = DateTime.Now ,SecurityId=userId,VisitId=request.VisitId};

                _visitRepository.Update(visitRecord);
                _visitConfirmRepository.Add(securityVisitConfirm);
                await _visitRepository.SaveChangesAsync();
                await _visitConfirmRepository.SaveChangesAsync();
                return new SuccessResult($"{visitRecord.VisitorFullName} {DateTime.Now.Date} tarihinde giriş yaptı");
            }
        }
    }
}
