
using Business.BusinessAspects;
using Core.Aspects.Autofac.Performance;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Aspects.Autofac.Caching;

namespace Business.Handlers.Visits.Queries
{

    public class GetVisitsQuery : IRequest<IDataResult<IEnumerable<Visit>>>
    {
        public class GetVisitsQueryHandler : IRequestHandler<GetVisitsQuery, IDataResult<IEnumerable<Visit>>>
        {
            private readonly IVisitRepository _visitRepository;
            private readonly IMediator _mediator;

            public GetVisitsQueryHandler(IVisitRepository visitRepository, IMediator mediator)
            {
                _visitRepository = visitRepository;
                _mediator = mediator;
            }

            [PerformanceAspect(5)]
            [CacheAspect(10)]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<Visit>>> Handle(GetVisitsQuery request, CancellationToken cancellationToken)
            {
                return new SuccessDataResult<IEnumerable<Visit>>(await _visitRepository.GetListAsync());
            }
        }
    }
}