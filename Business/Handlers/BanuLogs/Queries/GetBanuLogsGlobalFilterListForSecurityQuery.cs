using Business.BusinessAspects;
using Business.Constants;
using Core.Entities;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.BanuLogs.Queries
{
    public class GetBanuLogsGlobalFilterListForSecurityQuery : IRequest<IDataResult<PrivPagingResult<BanuLog>>>
    {
        public List<GlobalFilterGeneric> Filters { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }


        public class GetBanuLogsGlobalFilterListQueryForSecurityHandler : IRequestHandler<GetBanuLogsGlobalFilterListForSecurityQuery, IDataResult<PrivPagingResult<BanuLog>>>
        {
            private readonly IMediator _mediator;
            private readonly IBanuLogRepository _banuLogsRepository;

            public GetBanuLogsGlobalFilterListQueryForSecurityHandler(IMediator mediator, IBanuLogRepository banuLogsRepository)
            {
                _mediator = mediator;
                _banuLogsRepository = banuLogsRepository;
            }
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<PrivPagingResult<BanuLog>>> Handle(GetBanuLogsGlobalFilterListForSecurityQuery request, CancellationToken cancellationToken)
            {

                foreach (var filter in request.Filters)
                {
                    if (filter.Key == "TransactionType")
                    {
                        if (filter.Value is JsonElement jsonElement && jsonElement.ValueKind == JsonValueKind.String)
                        {
                            string filterValue = jsonElement.GetString();

                            if (filterValue != "Güvenlik Onay" && filterValue != "Güvenlik Pdf Rapor Oluşturma" && filterValue != "Güvenlik Red")
                            {
                                return new ErrorDataResult<PrivPagingResult<BanuLog>>(Messages.AuthorizationsDenied);
                            }
                        }


                    }
                }
                var list = await _banuLogsRepository.GetFilteredAndPagedListAsync(request.Filters, request.Page, request.PageSize, "TransactorFullName", false);
             
                var filteredList= list.Data.Where(a => a.TransactionType == "Güvenlik Onay" || a.TransactionType == "Güvenlik Red" || a.TransactionType == "Güvenlik Pdf Rapor Oluşturma").AsEnumerable();
                list.Data = filteredList.ToList();
                return new SuccessDataResult<PrivPagingResult<BanuLog>>(list);
            }
        }
    }
}
