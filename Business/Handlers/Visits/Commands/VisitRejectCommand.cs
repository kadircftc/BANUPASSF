using Business.BusinessAspects;
using Business.Constants;
using Business.Handlers.VisitConfirms.Commands;
using Business.Handlers.Visits.ValidationRules;
using Business.Services.UserService.Abstract;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Validation;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.Visits.Commands
{
    public class VisitRejectCommand: IRequest<IResult>
    {
        public System.Guid Id { get; set; }
        public string ReasonForRejection { get; set; }


        public class VisitRejectCommandHandler : IRequestHandler<VisitRejectCommand, IResult>
        {
            private readonly IVisitRepository _visitRepository;
            private readonly IVisitConfirmRepository _visitConfirmRepository;
            private readonly Microsoft.AspNetCore.Http.IHttpContextAccessor _httpContext;
            private readonly IUserService _userService;
            private readonly IMediator _mediator;

            public VisitRejectCommandHandler(IVisitRepository visitRepository, IVisitConfirmRepository visitConfirmRepository, Microsoft.AspNetCore.Http.IHttpContextAccessor httpContext, IUserService userService, IMediator mediator)
            {
                _visitRepository = visitRepository;
                _visitConfirmRepository = visitConfirmRepository;
                _httpContext = httpContext;
                _userService = userService;
                _mediator = mediator;
            }

            [ValidationAspect(typeof(VisitRejectValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(VisitRejectCommand request, CancellationToken cancellationToken)
            {
                var isThereVisitRecord = await _visitRepository.GetAsync(u => u.Id == request.Id);


                isThereVisitRecord.ReasonForRejection = request.ReasonForRejection;
                isThereVisitRecord.IsReject = true;

                var userId = _userService.GetUserIdFromJwt(_httpContext.HttpContext.Request);

                /*TransactionType false durumu red için geçerlidir.True durumunda onay olarak geçer.
                 Enum olarak da kullanabilir fakat iki durum olduğu için boolean tercih edilmiştir.
                 */
                _visitConfirmRepository.Add(new Entities.Concrete.VisitConfirm
                {
                    SecurityId = userId,CreatedDate = DateTime.Now,VisitId = request.Id,TransactionType = false
                });

                _visitRepository.Update(isThereVisitRecord);
                await _visitRepository.SaveChangesAsync();
                await _visitConfirmRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Updated);
            }
        }
    }
}
