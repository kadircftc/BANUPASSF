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
    public class GetBanuLogsGlobalFilterListQuery:IRequest<IDataResult< IEnumerable<BanuLog>>>
    {
        public List<GlobalFilterGeneric> Filters { get; set; }
      
        public class GetBanuLogsGlobalFilterListQueryHandler : IRequestHandler<GetBanuLogsGlobalFilterListQuery, IDataResult<IEnumerable<BanuLog>>>
        {
            private readonly IMediator _mediator;
            private readonly IBanuLogRepository _banuLogsRepository;

            public GetBanuLogsGlobalFilterListQueryHandler(IMediator mediator, IBanuLogRepository banuLogsRepository)
            {
                _mediator = mediator;
                _banuLogsRepository = banuLogsRepository;
            }

            public async Task<IDataResult<IEnumerable<BanuLog>>> Handle(GetBanuLogsGlobalFilterListQuery request, CancellationToken cancellationToken)
            {
                var list = await _banuLogsRepository.GetFilteredListAsync(request.Filters);
                return new SuccessDataResult<IEnumerable<BanuLog>>(list);
            }
        }
    }
}
