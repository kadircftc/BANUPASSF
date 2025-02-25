using Business.BusinessAspects;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Performance;
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
    public class GetTodayVisitsQuery : IRequest<IDataResult<IEnumerable<Visit>>>
    {
        public class GetTodayVisitsQueryHandler : IRequestHandler<GetTodayVisitsQuery, IDataResult<IEnumerable<Visit>>>
        {
            private readonly IVisitRepository _visitRepository;
            private readonly IMediator _mediator;

            public GetTodayVisitsQueryHandler(IVisitRepository visitRepository, IMediator mediator)
            {
                _visitRepository = visitRepository;
                _mediator = mediator;
            }

            [PerformanceAspect(5)]
            [CacheAspect(10)]
            //[LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<Visit>>> Handle(GetTodayVisitsQuery request, CancellationToken cancellationToken)
            {
                var result = await _visitRepository.GetListAsync(v => v.VisitStartDate.Date == DateTime.Today);

                return new SuccessDataResult<IEnumerable<Visit>>(result);
            }
        }
    }
}
