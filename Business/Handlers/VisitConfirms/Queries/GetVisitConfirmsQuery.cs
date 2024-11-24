
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

namespace Business.Handlers.VisitConfirms.Queries
{

    public class GetVisitConfirmsQuery : IRequest<IDataResult<IEnumerable<VisitConfirm>>>
    {
        public class GetVisitConfirmsQueryHandler : IRequestHandler<GetVisitConfirmsQuery, IDataResult<IEnumerable<VisitConfirm>>>
        {
            private readonly IVisitConfirmRepository _visitConfirmRepository;
            private readonly IMediator _mediator;

            public GetVisitConfirmsQueryHandler(IVisitConfirmRepository visitConfirmRepository, IMediator mediator)
            {
                _visitConfirmRepository = visitConfirmRepository;
                _mediator = mediator;
            }

            [PerformanceAspect(5)]
            [CacheAspect(10)]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<VisitConfirm>>> Handle(GetVisitConfirmsQuery request, CancellationToken cancellationToken)
            {
                return new SuccessDataResult<IEnumerable<VisitConfirm>>(await _visitConfirmRepository.GetListAsync());
            }
        }
    }
}