
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
using Business.Handlers.VisitConfirms.ValidationRules;

namespace Business.Handlers.VisitConfirms.Commands
{
    /// <summary>
    /// 
    /// </summary>
    public class CreateVisitConfirmCommand : IRequest<IResult>
    {

        public System.DateTime CreatedDate { get; set; }
        public System.Guid VisitId { get; set; }
        public int SecurityId { get; set; }


        public class CreateVisitConfirmCommandHandler : IRequestHandler<CreateVisitConfirmCommand, IResult>
        {
            private readonly IVisitConfirmRepository _visitConfirmRepository;
            private readonly IMediator _mediator;
            public CreateVisitConfirmCommandHandler(IVisitConfirmRepository visitConfirmRepository, IMediator mediator)
            {
                _visitConfirmRepository = visitConfirmRepository;
                _mediator = mediator;
            }

            [ValidationAspect(typeof(CreateVisitConfirmValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(CreateVisitConfirmCommand request, CancellationToken cancellationToken)
            {
                var isThereVisitConfirmRecord = _visitConfirmRepository.Query().Any(u => u.CreatedDate == request.CreatedDate);

                if (isThereVisitConfirmRecord == true)
                    return new ErrorResult(Messages.NameAlreadyExist);

                var addedVisitConfirm = new VisitConfirm
                {
                    CreatedDate = request.CreatedDate,
                    VisitId = request.VisitId,
                    SecurityId = request.SecurityId,

                };

                _visitConfirmRepository.Add(addedVisitConfirm);
                await _visitConfirmRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Added);
            }
        }
    }
}