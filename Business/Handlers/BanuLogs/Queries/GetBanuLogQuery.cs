
using Business.BusinessAspects;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;


namespace Business.Handlers.BanuLogs.Queries
{
    public class GetBanuLogQuery : IRequest<IDataResult<BanuLog>>
    {
        public System.Guid Id { get; set; }

        public class GetBanuLogQueryHandler : IRequestHandler<GetBanuLogQuery, IDataResult<BanuLog>>
        {
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IMediator _mediator;

            public GetBanuLogQueryHandler(IBanuLogRepository banuLogRepository, IMediator mediator)
            {
                _banuLogRepository = banuLogRepository;
                _mediator = mediator;
            }
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<BanuLog>> Handle(GetBanuLogQuery request, CancellationToken cancellationToken)
            {
                var banuLog = await _banuLogRepository.GetAsync(p => p.Id == request.Id);
                return new SuccessDataResult<BanuLog>(banuLog);
            }
        }
    }
}
