
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
    public class GetBanuLogsByPagingQuery : IRequest<IDataResult<PrivPagingResult<BanuLog>>>
    {
       
        public int Page { get; set; }
        public int PageSize { get; set; }
        public class GetBanuLogsByPagingQueryHandler : IRequestHandler<GetBanuLogsByPagingQuery, IDataResult<PrivPagingResult<BanuLog>>>

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
            public async Task<IDataResult<PrivPagingResult<BanuLog>>> Handle(GetBanuLogsByPagingQuery request, CancellationToken cancellationToken)
            {
                var banulogs = await _banuLogRepository.GetListForPaging(request.Page,request.PageSize, "TransactorFullName", false);


                return new SuccessDataResult<PrivPagingResult<BanuLog>>(banulogs);
            }
        }
    }
}
