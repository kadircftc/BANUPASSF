using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.BanuLogs.Queries
{
    public class GetBanuLogsByFullNameQuery : IRequest<IDataResult<IEnumerable<BanuLog>>>
    {
        public string FullName { get; set; }
        public string QueryStartDate { get; set; }
        public string QueryEndDate { get; set; }
        public class GetBanuLogsByFullNameQueryHandler : IRequestHandler<GetBanuLogsByFullNameQuery, IDataResult<IEnumerable<BanuLog>>>

        {
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IMediator _mediator;

            public GetBanuLogsByFullNameQueryHandler(IBanuLogRepository banuLogRepository, IMediator mediator)
            {
                _banuLogRepository = banuLogRepository;
                _mediator = mediator;
            }
            [LogAspect(typeof(FileLogger))]
            //[SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<BanuLog>>> Handle(GetBanuLogsByFullNameQuery request, CancellationToken cancellationToken)
            {
                if (string.IsNullOrEmpty(request.FullName))
                {
                    return new ErrorDataResult<IEnumerable<BanuLog>>();
                }

                var query = _banuLogRepository.Query();


                if (!string.IsNullOrEmpty(request.FullName))
                {
                    query = query.Where(p => p.TransactorFullName == request.FullName);
                }


                if (!string.IsNullOrEmpty(request.QueryStartDate) && DateTime.TryParse(request.QueryStartDate, out var startDate))
                {
                    query = query.Where(p => p.CreatedDate.Date >= startDate.Date);
                }


                if (!string.IsNullOrEmpty(request.QueryEndDate) && DateTime.TryParse(request.QueryEndDate, out var endDate))
                {
                    query = query.Where(p => p.CreatedDate.Date <= endDate.Date);
                }


                var banulogs = await query.ToListAsync();

                return new SuccessDataResult<IEnumerable<BanuLog>>(banulogs);
            }
        }
    }
}
