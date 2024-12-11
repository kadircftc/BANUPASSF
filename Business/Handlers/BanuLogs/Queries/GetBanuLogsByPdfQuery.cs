using Business.BusinessAspects;
using Business.CrossCuttingConcernsBS.Logging;
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
        public class GetBanuLogsByPdfQuery : IRequest<IDataResult<IEnumerable<BanuLog>>>
        {
            public string QueryDate { get; set; }

            public class GetBanuLogsByPdfQueryHandler : IRequestHandler<GetBanuLogsByPdfQuery, IDataResult<IEnumerable<BanuLog>>>
            {
                private readonly IBanuLogRepository _banuLogRepository;

                public GetBanuLogsByPdfQueryHandler(IBanuLogRepository banuLogRepository)
                {
                    _banuLogRepository = banuLogRepository;
                }
                    
            [LogAspect(typeof(FileLogger))]
            //[BanuLogAspect(typeof(MsSqlLoggerProcess))]
            //[SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<BanuLog>>> Handle(GetBanuLogsByPdfQuery request, CancellationToken cancellationToken)
            {

                    var query = _banuLogRepository.Query();

                    if (!string.IsNullOrEmpty(request.QueryDate) && DateTime.TryParse(request.QueryDate, out var filterDate))
                    {
                        query = query.Where(p => p.CreatedDate.Date == filterDate.Date);
                    }

                    var banulogs = await query.ToListAsync(cancellationToken);

                    return new SuccessDataResult<IEnumerable<BanuLog>>(banulogs);
            }
           }
        }

    
}
