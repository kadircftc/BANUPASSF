
using Business.BusinessAspects;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;


namespace Business.Handlers.Visits.Queries
{
    public class GetVisitQuery : IRequest<IDataResult<Visit>>
    {
        public System.Guid Id { get; set; }

        public class GetVisitQueryHandler : IRequestHandler<GetVisitQuery, IDataResult<Visit>>
        {
            private readonly IVisitRepository _visitRepository;
            private readonly IMediator _mediator;

            public GetVisitQueryHandler(IVisitRepository visitRepository, IMediator mediator)
            {
                _visitRepository = visitRepository;
                _mediator = mediator;
            }
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<Visit>> Handle(GetVisitQuery request, CancellationToken cancellationToken)
            {
                var visit = await _visitRepository.GetAsync(p => p.Id == request.Id);
                return new SuccessDataResult<Visit>(visit);
            }
        }
    }
}
