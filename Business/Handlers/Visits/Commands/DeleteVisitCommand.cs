
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


namespace Business.Handlers.Visits.Commands
{
    /// <summary>
    /// 
    /// </summary>
    public class DeleteVisitCommand : IRequest<IResult>
    {
        public System.Guid Id { get; set; }

        public class DeleteVisitCommandHandler : IRequestHandler<DeleteVisitCommand, IResult>
        {
            private readonly IVisitRepository _visitRepository;
            private readonly IMediator _mediator;

            public DeleteVisitCommandHandler(IVisitRepository visitRepository, IMediator mediator)
            {
                _visitRepository = visitRepository;
                _mediator = mediator;
            }

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(DeleteVisitCommand request, CancellationToken cancellationToken)
            {
                var visitToDelete = _visitRepository.Get(p => p.Id == request.Id);

                _visitRepository.Delete(visitToDelete);
                await _visitRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Deleted);
            }
        }
    }
}

