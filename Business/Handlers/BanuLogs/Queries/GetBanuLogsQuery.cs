
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
using Core.Extensions;
using Core.Utilities.Security.RateLimiting.Abstract;
using Microsoft.AspNetCore.RateLimiting;

namespace Business.Handlers.BanuLogs.Queries
{

    public class GetBanuLogsQuery : IRequest<IDataResult<IEnumerable<BanuLog>>>
    {
        public class GetBanuLogsQueryHandler : IRequestHandler<GetBanuLogsQuery, IDataResult<IEnumerable<BanuLog>>>
        {
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IMediator _mediator;
            //private readonly IRateLimitingService _rateLimitingService;

            public GetBanuLogsQueryHandler(IBanuLogRepository banuLogRepository, IMediator mediator, IRateLimitingService rateLimitingService)
            {
                _banuLogRepository = banuLogRepository;
                _mediator = mediator;
                //_rateLimitingService = rateLimitingService;
            }

            [PerformanceAspect(5)]
            //[CacheAspect(10)]
            //[EnableRateLimiting]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<BanuLog>>> Handle(GetBanuLogsQuery request, CancellationToken cancellationToken)
            {
                //Rate limiting testi için deneme yapıldı kodda değişiklik yapmayınız productionda kaldırılacaktır!.
                
                //var isAllowed = _rateLimitingService.CheckAndLogRequest();

                //if (!isAllowed)
                //{
                //    return new ErrorDataResult<IEnumerable<BanuLog>>("Fazla deneme yaptınız daha sonra tekrar deneyiniz!");
                //}
                return new SuccessDataResult<IEnumerable<BanuLog>>(await _banuLogRepository.GetListAsync());
            }
        }
    }
}