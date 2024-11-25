
using Business.Constants;
using Business.BusinessAspects;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Core.Aspects.Autofac.Validation;
using Business.Handlers.BanuLogs.ValidationRules;


namespace Business.Handlers.BanuLogs.Commands
{


    public class UpdateBanuLogCommand : IRequest<IResult>
    {
        public System.Guid Id { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public string TransactorFullName { get; set; }
        public int TransactorId { get; set; }
        public string TransactionsDescription { get; set; }
        public string TransactionType { get; set; }

        public class UpdateBanuLogCommandHandler : IRequestHandler<UpdateBanuLogCommand, IResult>
        {
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IMediator _mediator;

            public UpdateBanuLogCommandHandler(IBanuLogRepository banuLogRepository, IMediator mediator)
            {
                _banuLogRepository = banuLogRepository;
                _mediator = mediator;
            }

            [ValidationAspect(typeof(UpdateBanuLogValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(UpdateBanuLogCommand request, CancellationToken cancellationToken)
            {
                var isThereBanuLogRecord = await _banuLogRepository.GetAsync(u => u.Id == request.Id);


                isThereBanuLogRecord.CreatedDate = request.CreatedDate;
                isThereBanuLogRecord.TransactorFullName = request.TransactorFullName;
                isThereBanuLogRecord.TransactorId = request.TransactorId;
                isThereBanuLogRecord.TransactionsDescription = request.TransactionsDescription;
                isThereBanuLogRecord.TransactionType = request.TransactionType;


                _banuLogRepository.Update(isThereBanuLogRecord);
                await _banuLogRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Updated);
            }
        }
    }
}

