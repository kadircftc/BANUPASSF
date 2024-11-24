
using Business.BusinessAspects;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;


namespace Business.Handlers.VisitConfirms.Queries
{
    public class GetVisitConfirmQuery : IRequest<IDataResult<VisitConfirm>>
    {
        public System.Guid Id { get; set; }

        public class GetVisitConfirmQueryHandler : IRequestHandler<GetVisitConfirmQuery, IDataResult<VisitConfirm>>
        {
            private readonly IVisitConfirmRepository _visitConfirmRepository;
            private readonly IMediator _mediator;

            public GetVisitConfirmQueryHandler(IVisitConfirmRepository visitConfirmRepository, IMediator mediator)
            {
                _visitConfirmRepository = visitConfirmRepository;
                _mediator = mediator;
            }
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<VisitConfirm>> Handle(GetVisitConfirmQuery request, CancellationToken cancellationToken)
            {
                var visitConfirm = await _visitConfirmRepository.GetAsync(p => p.Id == request.Id);
                return new SuccessDataResult<VisitConfirm>(visitConfirm);
            }
        }
    }
}
