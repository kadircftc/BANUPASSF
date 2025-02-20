using Business.BusinessAspects;
using Core.Entities;
using Core.Utilities.Results;
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
    public class GetBanuLogsGlobalFilterListQuery:IRequest<IDataResult< PrivPagingResult<BanuLog>>>
    {
        public List<GlobalFilterGeneric> Filters { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
  

        public class GetBanuLogsGlobalFilterListQueryHandler : IRequestHandler<GetBanuLogsGlobalFilterListQuery, IDataResult<PrivPagingResult<BanuLog>>>
        {
            private readonly IMediator _mediator;
            private readonly IBanuLogRepository _banuLogsRepository;

            public GetBanuLogsGlobalFilterListQueryHandler(IMediator mediator, IBanuLogRepository banuLogsRepository)
            {
                _mediator = mediator;
                _banuLogsRepository = banuLogsRepository;
            }
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<PrivPagingResult<BanuLog>>> Handle(GetBanuLogsGlobalFilterListQuery request, CancellationToken cancellationToken)
            {
                var list = await _banuLogsRepository.GetFilteredAndPagedListAsync(request.Filters,request.Page,request.PageSize,"TransactorFullName",false);
                return new SuccessDataResult<PrivPagingResult<BanuLog>>(list);
            }
        }
    }
}
