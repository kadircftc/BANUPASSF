
using Business.Constants;
using Business.BusinessAspects;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Core.Aspects.Autofac.Validation;
using Business.Handlers.Visits.ValidationRules;


namespace Business.Handlers.Visits.Commands
{


    public class UpdateVisitCommand : IRequest<IResult>
    {
        public System.Guid Id { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public int PersonnelId { get; set; }
        public string VisitorFullName { get; set; }
        public string VisitorLicensePlate { get; set; }
        public bool VehicleEntry { get; set; }
        public bool MultiPersonVisit { get; set; }
        public bool IsConfirm { get; set; }
        public System.DateTime ApprovalDate { get; set; }
        public System.DateTime ExitDate { get; set; }
        public System.DateTime VisitStartDate { get; set; }
        public System.DateTime VisitEndDate { get; set; }

        public class UpdateVisitCommandHandler : IRequestHandler<UpdateVisitCommand, IResult>
        {
            private readonly IVisitRepository _visitRepository;
            private readonly IMediator _mediator;

            public UpdateVisitCommandHandler(IVisitRepository visitRepository, IMediator mediator)
            {
                _visitRepository = visitRepository;
                _mediator = mediator;
            }

            [ValidationAspect(typeof(UpdateVisitValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(UpdateVisitCommand request, CancellationToken cancellationToken)
            {
                var isThereVisitRecord = await _visitRepository.GetAsync(u => u.Id == request.Id);


                isThereVisitRecord.CreatedDate = request.CreatedDate;
                isThereVisitRecord.PersonnelId = request.PersonnelId;
                isThereVisitRecord.VisitorFullName = request.VisitorFullName;
                isThereVisitRecord.VisitorLicensePlate = request.VisitorLicensePlate;
                isThereVisitRecord.VehicleEntry = request.VehicleEntry;
                isThereVisitRecord.MultiPersonVisit = request.MultiPersonVisit;
                isThereVisitRecord.IsConfirm = request.IsConfirm;
                isThereVisitRecord.ApprovalDate = request.ApprovalDate;
                isThereVisitRecord.ExitDate = request.ExitDate;
                isThereVisitRecord.VisitStartDate = request.VisitStartDate;
                isThereVisitRecord.VisitEndDate = request.VisitEndDate;


                _visitRepository.Update(isThereVisitRecord);
                await _visitRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Updated);
            }
        }
    }
}

