
using Business.BusinessAspects;
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Validation;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Business.Handlers.BanuLogs.ValidationRules;
using Core.Extensions;
using Core.Aspects.Autofac.Exception;

namespace Business.Handlers.BanuLogs.Commands
{
    /// <summary>
    /// 
    /// </summary>
    public class CreateBanuLogCommand : IRequest<IResult>
    {

        public System.DateTime CreatedDate { get; set; }
        public string TransactorFullName { get; set; }
        public int TransactorId { get; set; }
        public string TransactionsDescription { get; set; }
        public string TransactionType { get; set; }


        public class CreateBanuLogCommandHandler : IRequestHandler<CreateBanuLogCommand, IResult>
        {
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IMediator _mediator;
            public CreateBanuLogCommandHandler(IBanuLogRepository banuLogRepository, IMediator mediator)
            {
                _banuLogRepository = banuLogRepository;
                _mediator = mediator;
            }

            [ValidationAspect(typeof(CreateBanuLogValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            //[ExceptionLogAspect(typeof(MsSqlLogger))]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(CreateBanuLogCommand request, CancellationToken cancellationToken)
            {
                var isThereBanuLogRecord = _banuLogRepository.Query().Any(u => u.CreatedDate == request.CreatedDate);

                if (isThereBanuLogRecord == true)
                    return new ErrorResult(Messages.NameAlreadyExist);

                var addedBanuLog = new BanuLog
                {
                    CreatedDate = request.CreatedDate,
                    TransactorFullName = request.TransactorFullName,
                    TransactorId = request.TransactorId,
                    TransactionsDescription = request.TransactionsDescription,
                    TransactionType = request.TransactionType,

                };

                _banuLogRepository.Add(addedBanuLog);
                await _banuLogRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Added);
            }
        }
    }
}