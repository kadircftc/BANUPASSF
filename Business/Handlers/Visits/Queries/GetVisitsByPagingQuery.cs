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

namespace Business.Handlers.Visits.Queries
{
    public class GetVisitsByPagingQuery : IRequest<IDataResult<PrivPagingResult<Visit>>>
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public class GetVisitsByPagingQueryHandler : IRequestHandler<GetVisitsByPagingQuery, IDataResult<PrivPagingResult<Visit>>>

        {
            private readonly IVisitRepository _visitRepository;
            private readonly IMediator _mediator;

            public GetVisitsByPagingQueryHandler(IVisitRepository visitRepository, IMediator mediator)
            {
                _visitRepository = visitRepository;
                _mediator = mediator;
            }

            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<PrivPagingResult<Visit>>> Handle(GetVisitsByPagingQuery request, CancellationToken cancellationToken)
            {
                var banulogs = await _visitRepository.GetListForPaging(request.Page, request.PageSize, "VisitorFullName", false);


                return new SuccessDataResult<PrivPagingResult<Visit>>(banulogs);
            }
        }
    }
}
