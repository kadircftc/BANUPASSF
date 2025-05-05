using Business.BusinessAspects;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
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
    public class GetBanuLogsForSecurityQuery : IRequest<IDataResult<PrivPagingResult<BanuLog>>>
    {

        public int Page { get; set; }
        public int PageSize { get; set; }
        public class GetBanuLogsForSecurityHandler : IRequestHandler<GetBanuLogsForSecurityQuery, IDataResult<PrivPagingResult<BanuLog>>>

        {
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IMediator _mediator;

            public GetBanuLogsForSecurityHandler(IBanuLogRepository banuLogRepository, IMediator mediator)
            {
                _banuLogRepository = banuLogRepository;
                _mediator = mediator;
            }
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<PrivPagingResult<BanuLog>>> Handle(GetBanuLogsForSecurityQuery request, CancellationToken cancellationToken)
            {
             
                var banulogs = await _banuLogRepository.GetListForPaging(request.Page, request.PageSize, "TransactorFullName", false,b=>b.TransactionType=="Güvenlik Onay"|| b.TransactionType == "Güvenlik Red" || b.TransactionType == "Güvenlik Pdf Rapor Oluşturma");


                return new SuccessDataResult<PrivPagingResult<BanuLog>>(banulogs);
            }
        }
    }
}
