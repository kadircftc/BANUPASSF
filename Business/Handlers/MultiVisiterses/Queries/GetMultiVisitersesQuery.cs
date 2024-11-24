
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

namespace Business.Handlers.MultiVisiterses.Queries
{

    public class GetMultiVisitersesQuery : IRequest<IDataResult<IEnumerable<MultiVisiters>>>
    {
        public class GetMultiVisitersesQueryHandler : IRequestHandler<GetMultiVisitersesQuery, IDataResult<IEnumerable<MultiVisiters>>>
        {
            private readonly IMultiVisitersRepository _multiVisitersRepository;
            private readonly IMediator _mediator;

            public GetMultiVisitersesQueryHandler(IMultiVisitersRepository multiVisitersRepository, IMediator mediator)
            {
                _multiVisitersRepository = multiVisitersRepository;
                _mediator = mediator;
            }

            [PerformanceAspect(5)]
            [CacheAspect(10)]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<MultiVisiters>>> Handle(GetMultiVisitersesQuery request, CancellationToken cancellationToken)
            {
                return new SuccessDataResult<IEnumerable<MultiVisiters>>(await _multiVisitersRepository.GetListAsync());
            }
        }
    }
}