using Business.BusinessAspects;
using Business.Connected_Services.SignalR.Concrete;
using Business.Constants;
using Business.Handlers.Visits.ValidationRules;
using Business.Services.UserService.Abstract;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.Visits.Commands
{
    public class VehicleEntranceCommand:IRequest<Core.Utilities.Results.IResult>
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
        public class VehicleEntranceCommandHandler : IRequestHandler<VehicleEntranceCommand, Core.Utilities.Results.IResult>
        {
            private readonly IUserService _userService;
            private readonly IMediator _mediator;
            private readonly IVisitRepository _visitRepository;
            private readonly IMultiVisitersRepository _multiVisitersRepository;
            private readonly IHttpContextAccessor _context;
            private readonly IHubContext<VisitHub> _hubContext;

            public VehicleEntranceCommandHandler(IUserService userService, IMediator mediator, IVisitRepository visitRepository, IMultiVisitersRepository multiVisitersRepository, IHttpContextAccessor context, IHubContext<VisitHub> hubContext)
            {
                _userService = userService;
                _mediator = mediator;
                _visitRepository = visitRepository;
                _multiVisitersRepository = multiVisitersRepository;
                _context = context;
                _hubContext = hubContext;
            }

            [ValidationAspect(typeof(VehicleEntranceCommandValidator), Priority = 2)]
            [SecuredOperation(Priority = 1)]
            [CacheRemoveAspect("Get")]
            public async Task<Core.Utilities.Results.IResult> Handle(VehicleEntranceCommand request, CancellationToken cancellationToken)
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
                    VisitorFullName = request.VisitorFullName,VisitorLicensePlate=request.VisitorLicensePlate,
                    VehicleEntry = true,
                    MultiPersonVisit = request.MultiVisitersList.Count > 0 && request.MultiVisitersList != null ? true : false,
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
                        _multiVisitersRepository.Add(new MultiVisiters {
                            CreatedDate=DateTime.Now,VisitId=addedVisit.Id,
                            VisitorFullName=multi.VisitorFullName
                        });
                    }
                }
                
                await _multiVisitersRepository.SaveChangesAsync();
                await _hubContext.Clients.All.SendAsync("VisitAdded", new VisitMultiVisitMergeDto { Visit=addedVisit,MultiVisiters=request.MultiVisitersList });
                return new SuccessResult(Messages.Added);

            }
        }
    }
}
