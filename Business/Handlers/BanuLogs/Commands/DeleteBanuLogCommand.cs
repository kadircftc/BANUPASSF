
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


namespace Business.Handlers.BanuLogs.Commands
{
    /// <summary>
    /// 
    /// </summary>
    public class DeleteBanuLogCommand : IRequest<IResult>
    {
        public System.Guid Id { get; set; }

        public class DeleteBanuLogCommandHandler : IRequestHandler<DeleteBanuLogCommand, IResult>
        {
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IMediator _mediator;

            public DeleteBanuLogCommandHandler(IBanuLogRepository banuLogRepository, IMediator mediator)
            {
                _banuLogRepository = banuLogRepository;
                _mediator = mediator;
            }

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(DeleteBanuLogCommand request, CancellationToken cancellationToken)
            {
                var banuLogToDelete = _banuLogRepository.Get(p => p.Id == request.Id);

                _banuLogRepository.Delete(banuLogToDelete);
                await _banuLogRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Deleted);
            }
        }
    }
}

