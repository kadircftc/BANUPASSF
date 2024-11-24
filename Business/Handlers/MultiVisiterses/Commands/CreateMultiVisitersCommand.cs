
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
using Business.Handlers.MultiVisiterses.ValidationRules;

namespace Business.Handlers.MultiVisiterses.Commands
{
    /// <summary>
    /// 
    /// </summary>
    public class CreateMultiVisitersCommand : IRequest<IResult>
    {

        public System.DateTime CreatedDate { get; set; }
        public System.Guid VisitId { get; set; }
        public string VisitorFullName { get; set; }


        public class CreateMultiVisitersCommandHandler : IRequestHandler<CreateMultiVisitersCommand, IResult>
        {
            private readonly IMultiVisitersRepository _multiVisitersRepository;
            private readonly IMediator _mediator;
            public CreateMultiVisitersCommandHandler(IMultiVisitersRepository multiVisitersRepository, IMediator mediator)
            {
                _multiVisitersRepository = multiVisitersRepository;
                _mediator = mediator;
            }

            [ValidationAspect(typeof(CreateMultiVisitersValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(CreateMultiVisitersCommand request, CancellationToken cancellationToken)
            {
                var isThereMultiVisitersRecord = _multiVisitersRepository.Query().Any(u => u.CreatedDate == request.CreatedDate);

                if (isThereMultiVisitersRecord == true)
                    return new ErrorResult(Messages.NameAlreadyExist);

                var addedMultiVisiters = new MultiVisiters
                {
                    CreatedDate = request.CreatedDate,
                    VisitId = request.VisitId,
                    VisitorFullName = request.VisitorFullName,

                };

                _multiVisitersRepository.Add(addedMultiVisiters);
                await _multiVisitersRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Added);
            }
        }
    }
}