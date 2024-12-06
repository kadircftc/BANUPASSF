using Business.BusinessAspects;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Performance;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using Core.Utilities.Security.RateLimiting.Abstract;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.BanuLogs.Queries
{
    public class GetBanuLogsWPaginationQuery : IRequest<IDataResult<PagingResult<BanuLog>>>
    {
        public class GetBanuLogsWPaginationQueryHandler : IRequestHandler<GetBanuLogsWPaginationQuery, IDataResult<PagingResult<BanuLog>>>
        {
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IMediator _mediator;

            public GetBanuLogsWPaginationQueryHandler(IBanuLogRepository banuLogRepository, IMediator mediator)
            {
                _banuLogRepository = banuLogRepository;
                _mediator = mediator;
            }

            [PerformanceAspect(5)]
            [LogAspect(typeof(FileLogger))]
            //[SecuredOperation(Priority = 1)]
            public async Task<IDataResult<PagingResult<BanuLog>>> Handle(GetBanuLogsWPaginationQuery request, CancellationToken cancellationToken)
            {
               
                return new SuccessDataResult<PagingResult<BanuLog>>( _banuLogRepository.GetListForPaging(1,"Id",true));
            }
        }
    }
}
