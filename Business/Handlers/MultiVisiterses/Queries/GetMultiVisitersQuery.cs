
using Business.BusinessAspects;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;


namespace Business.Handlers.MultiVisiterses.Queries
{
    public class GetMultiVisitersQuery : IRequest<IDataResult<MultiVisiters>>
    {
        public System.Guid Id { get; set; }

        public class GetMultiVisitersQueryHandler : IRequestHandler<GetMultiVisitersQuery, IDataResult<MultiVisiters>>
        {
            private readonly IMultiVisitersRepository _multiVisitersRepository;
            private readonly IMediator _mediator;

            public GetMultiVisitersQueryHandler(IMultiVisitersRepository multiVisitersRepository, IMediator mediator)
            {
                _multiVisitersRepository = multiVisitersRepository;
                _mediator = mediator;
            }
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<MultiVisiters>> Handle(GetMultiVisitersQuery request, CancellationToken cancellationToken)
            {
                var multiVisiters = await _multiVisitersRepository.GetAsync(p => p.Id == request.Id);
                return new SuccessDataResult<MultiVisiters>(multiVisiters);
            }
        }
    }
}
