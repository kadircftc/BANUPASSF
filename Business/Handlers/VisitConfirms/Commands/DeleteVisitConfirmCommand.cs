
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Business.BusinessAspects;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace Business.Handlers.VisitConfirms.Commands
{
    /// <summary>
    /// 
    /// </summary>
    public class DeleteVisitConfirmCommand : IRequest<IResult>
    {
        public System.Guid Id { get; set; }

        public class DeleteVisitConfirmCommandHandler : IRequestHandler<DeleteVisitConfirmCommand, IResult>
        {
            private readonly IVisitConfirmRepository _visitConfirmRepository;
            private readonly IMediator _mediator;

            public DeleteVisitConfirmCommandHandler(IVisitConfirmRepository visitConfirmRepository, IMediator mediator)
            {
                _visitConfirmRepository = visitConfirmRepository;
                _mediator = mediator;
            }

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(DeleteVisitConfirmCommand request, CancellationToken cancellationToken)
            {
                var visitConfirmToDelete = _visitConfirmRepository.Get(p => p.Id == request.Id);

                _visitConfirmRepository.Delete(visitConfirmToDelete);
                await _visitConfirmRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Deleted);
            }
        }
    }
}

