
using Business.BusinessAspects;
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Validation;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Business.Handlers.Visits.ValidationRules;
using Business.Services.UserService.Abstract;
using Microsoft.AspNetCore.Http;
using System;

namespace Business.Handlers.Visits.Commands
{
    /// <summary>
    /// 
    /// </summary>
    public class CreateVisitCommand : IRequest<Core.Utilities.Results.IResult>
    {

        public int PersonnelId { get; set; }
        public string VisitorFullName { get; set; }
        public string VisitorLicensePlate { get; set; }
        public bool VehicleEntry { get; set; }
        public bool MultiPersonVisit { get; set; }
        public System.DateTime ApprovalDate { get; set; }
        public System.DateTime ExitDate { get; set; }
        public System.DateTime VisitStartDate { get; set; }
        public System.DateTime VisitEndDate { get; set; }


        public class CreateVisitCommandHandler : IRequestHandler<CreateVisitCommand, Core.Utilities.Results.IResult>
        {
            private readonly IVisitRepository _visitRepository;
            private readonly IMediator _mediator;
            private readonly IUserService _userService;
            private readonly IHttpContextAccessor _context;

            public CreateVisitCommandHandler(IVisitRepository visitRepository, IMediator mediator, IUserService userService, IHttpContextAccessor context)
            {
                _visitRepository = visitRepository;
                _mediator = mediator;
                _userService = userService;
                _context = context;
            }

            [ValidationAspect(typeof(CreateVisitValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<Core.Utilities.Results.IResult> Handle(CreateVisitCommand request, CancellationToken cancellationToken)
            {
                var isThereVisitRecord = _visitRepository.Query().Any(u => u.PersonnelId==request.PersonnelId&&request.VisitStartDate.Date==u.VisitStartDate.Date &&u.VisitorFullName==request.VisitorFullName);

                if (isThereVisitRecord == true)
                    return new ErrorResult(Messages.NameAlreadyExist);
                var userId = _userService.GetUserIdFromJwt(_context.HttpContext.Request);
                var addedVisit = new Visit
                {
                    CreatedDate = DateTime.Now,
                    PersonnelId = userId,
                    VisitorFullName = request.VisitorFullName,
                    VisitorLicensePlate = request.VisitorLicensePlate,
                    VehicleEntry = request.VehicleEntry,
                    MultiPersonVisit = request.MultiPersonVisit,
                    IsConfirm =false,
                    ApprovalDate = request.ApprovalDate,
                    ExitDate = request.ExitDate,
                    VisitStartDate = request.VisitStartDate,
                    VisitEndDate = request.VisitEndDate,
                };

                _visitRepository.Add(addedVisit);
                await _visitRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Added);
            }
        }
    }
}