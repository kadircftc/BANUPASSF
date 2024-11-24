
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
using Business.Handlers.VisitConfirms.ValidationRules;


namespace Business.Handlers.VisitConfirms.Commands
{


    public class UpdateVisitConfirmCommand : IRequest<IResult>
    {
        public System.Guid Id { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.Guid VisitId { get; set; }
        public int SecurityId { get; set; }

        public class UpdateVisitConfirmCommandHandler : IRequestHandler<UpdateVisitConfirmCommand, IResult>
        {
            private readonly IVisitConfirmRepository _visitConfirmRepository;
            private readonly IMediator _mediator;

            public UpdateVisitConfirmCommandHandler(IVisitConfirmRepository visitConfirmRepository, IMediator mediator)
            {
                _visitConfirmRepository = visitConfirmRepository;
                _mediator = mediator;
            }

            [ValidationAspect(typeof(UpdateVisitConfirmValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(UpdateVisitConfirmCommand request, CancellationToken cancellationToken)
            {
                var isThereVisitConfirmRecord = await _visitConfirmRepository.GetAsync(u => u.Id == request.Id);


                isThereVisitConfirmRecord.CreatedDate = request.CreatedDate;
                isThereVisitConfirmRecord.VisitId = request.VisitId;
                isThereVisitConfirmRecord.SecurityId = request.SecurityId;


                _visitConfirmRepository.Update(isThereVisitConfirmRecord);
                await _visitConfirmRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Updated);
            }
        }
    }
}

