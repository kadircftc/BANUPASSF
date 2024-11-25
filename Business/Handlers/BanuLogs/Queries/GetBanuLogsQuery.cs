
using Business.BusinessAspects;
using Core.Aspects.Autofac.Performance;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Aspects.Autofac.Caching;

namespace Business.Handlers.BanuLogs.Queries
{

    public class GetBanuLogsQuery : IRequest<IDataResult<IEnumerable<BanuLog>>>
    {
        public class GetBanuLogsQueryHandler : IRequestHandler<GetBanuLogsQuery, IDataResult<IEnumerable<BanuLog>>>
        {
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IMediator _mediator;

            public GetBanuLogsQueryHandler(IBanuLogRepository banuLogRepository, IMediator mediator)
            {
                _banuLogRepository = banuLogRepository;
                _mediator = mediator;
            }

            [PerformanceAspect(5)]
            [CacheAspect(10)]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<BanuLog>>> Handle(GetBanuLogsQuery request, CancellationToken cancellationToken)
            {
                return new SuccessDataResult<IEnumerable<BanuLog>>(await _banuLogRepository.GetListAsync());
            }
        }
    }
}