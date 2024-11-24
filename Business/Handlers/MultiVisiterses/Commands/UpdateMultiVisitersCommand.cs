
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
using Business.Handlers.MultiVisiterses.ValidationRules;


namespace Business.Handlers.MultiVisiterses.Commands
{


    public class UpdateMultiVisitersCommand : IRequest<IResult>
    {
        public System.Guid Id { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.Guid VisitId { get; set; }
        public string VisitorFullName { get; set; }

        public class UpdateMultiVisitersCommandHandler : IRequestHandler<UpdateMultiVisitersCommand, IResult>
        {
            private readonly IMultiVisitersRepository _multiVisitersRepository;
            private readonly IMediator _mediator;

            public UpdateMultiVisitersCommandHandler(IMultiVisitersRepository multiVisitersRepository, IMediator mediator)
            {
                _multiVisitersRepository = multiVisitersRepository;
                _mediator = mediator;
            }

            [ValidationAspect(typeof(UpdateMultiVisitersValidator), Priority = 1)]
            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(UpdateMultiVisitersCommand request, CancellationToken cancellationToken)
            {
                var isThereMultiVisitersRecord = await _multiVisitersRepository.GetAsync(u => u.Id == request.Id);


                isThereMultiVisitersRecord.CreatedDate = request.CreatedDate;
                isThereMultiVisitersRecord.VisitId = request.VisitId;
                isThereMultiVisitersRecord.VisitorFullName = request.VisitorFullName;


                _multiVisitersRepository.Update(isThereMultiVisitersRecord);
                await _multiVisitersRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Updated);
            }
        }
    }
}

