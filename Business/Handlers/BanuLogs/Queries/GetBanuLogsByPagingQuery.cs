
using Business.BusinessAspects;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using System.Collections.Generic;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace Business.Handlers.BanuLogs.Queries
{
    public class GetBanuLogsByPagingQuery : IRequest<IDataResult<PagingResult<BanuLog>>>
    {
       
        public int page { get; set; }
        public class GetBanuLogsByPagingQueryHandler : IRequestHandler<GetBanuLogsByPagingQuery, IDataResult<PagingResult<BanuLog>>>

        {
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IMediator _mediator;

            public GetBanuLogsByPagingQueryHandler(IBanuLogRepository banuLogRepository, IMediator mediator)
            {
                _banuLogRepository = banuLogRepository;
                _mediator = mediator;
            }
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<PagingResult<BanuLog>>> Handle(GetBanuLogsByPagingQuery request, CancellationToken cancellationToken)
            {
                var banulogs = await _banuLogRepository.GetListForPaging(request.page, "TransactorFullName", true);


                return new SuccessDataResult<PagingResult<BanuLog>>(banulogs);
            }
        }
    }
}
