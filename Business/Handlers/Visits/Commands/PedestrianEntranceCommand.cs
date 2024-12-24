using Business.Constants;
using Business.Handlers.Visits.ValidationRules;
using Business.Services.UserService.Abstract;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.Visits.Commands
{
    public class PedestrianEntranceCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public int PersonnelId { get; set; }
        public string VisitorFullName { get; set; }
        public string VisitorLicensePlate { get; set; }
        public bool VehicleEntry { get; set; }
        public bool MultiPersonVisit { get; set; }
        public bool IsExit { get; set; }
        public bool Status { get; set; }
        public System.DateTime ApprovalDate { get; set; }
        public System.DateTime ExitDate { get; set; }
        public System.DateTime VisitStartDate { get; set; }
        public System.DateTime VisitEndDate { get; set; }
        public List<MultiVisiters> MultiVisitersList { get; set; }
        public class PedestrianEntranceCommandHandler : IRequestHandler<PedestrianEntranceCommand, Core.Utilities.Results.IResult>
        {
            private readonly IUserService _userService;
            private readonly IMediator _mediator;
            private readonly IVisitRepository _visitRepository;
            private readonly IMultiVisitersRepository _multiVisitersRepository;
            private readonly IHttpContextAccessor _context;

            public PedestrianEntranceCommandHandler(IUserService userService, IMediator mediator, IVisitRepository visitRepository, IMultiVisitersRepository multiVisitersRepository, IHttpContextAccessor context)
            {
                _userService = userService;
                _mediator = mediator;
                _visitRepository = visitRepository;
                _multiVisitersRepository = multiVisitersRepository;
                _context = context;
            }
            [ValidationAspect(typeof(PedestrianEntranceCommandValidator), Priority = 1)]
            public async Task<Core.Utilities.Results.IResult> Handle(PedestrianEntranceCommand request, CancellationToken cancellationToken)
            {
                var userId = _userService.GetUserIdFromJwt(_context.HttpContext.Request);

                IEnumerable<Visit> userTransactionCount = await _visitRepository.GetListAsync(v => v.PersonnelId == userId && v.CreatedDate.Date == DateTime.Now.Date);

                if (userTransactionCount.Count() > 4)
                {
                    return new ErrorResult(TransactionMessagesTR.DefaultVisitTransactionCountReached);
                }

                var isThereVisitRecord = _visitRepository.Query().Any(u => u.PersonnelId == userId && request.VisitStartDate.Date == u.VisitStartDate.Date && u.VisitorFullName == request.VisitorFullName);

                if (isThereVisitRecord == true)
                    return new ErrorResult(TransactionMessagesTR.NameAlreadyExist);
                var addedVisit = new Visit
                {
                    CreatedDate = DateTime.Now,
                    PersonnelId = userId,
                    VisitorFullName = request.VisitorFullName,
                    VehicleEntry = false,
                    MultiPersonVisit = request.MultiVisitersList.Count>0&&request.MultiVisitersList!=null?true:false,
                    IsConfirm = false,
                    VisitStartDate = request.VisitStartDate,
                    VisitEndDate = request.VisitEndDate,
                    IsExit = false,
                    Status = true,
                };

                _visitRepository.Add(addedVisit);
                await _visitRepository.SaveChangesAsync();
                if (request.MultiVisitersList.Count > 0 && request.MultiVisitersList != null)
                {
                    foreach (var multi in request.MultiVisitersList)
                    {
                        _multiVisitersRepository.Add(new MultiVisiters
                        {
                            CreatedDate = DateTime.Now,
                            VisitId = addedVisit.Id,
                            VisitorFullName = multi.VisitorFullName
                        });
                    }
                }

                await _multiVisitersRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Added);

            }
        }
    }
}
