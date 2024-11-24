
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Business.BusinessAspects;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace Business.Handlers.MultiVisiterses.Commands
{
    /// <summary>
    /// 
    /// </summary>
    public class DeleteMultiVisitersCommand : IRequest<IResult>
    {
        public Guid Id { get; set; }

        public class DeleteMultiVisitersCommandHandler : IRequestHandler<DeleteMultiVisitersCommand, IResult>
        {
            private readonly IMultiVisitersRepository _multiVisitersRepository;
            private readonly IMediator _mediator;

            public DeleteMultiVisitersCommandHandler(IMultiVisitersRepository multiVisitersRepository, IMediator mediator)
            {
                _multiVisitersRepository = multiVisitersRepository;
                _mediator = mediator;
            }

            [CacheRemoveAspect("Get")]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IResult> Handle(DeleteMultiVisitersCommand request, CancellationToken cancellationToken)
            {
                var multiVisitersToDelete = _multiVisitersRepository.Get(p => p.Id == request.Id);

                _multiVisitersRepository.Delete(multiVisitersToDelete);
                await _multiVisitersRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Deleted);
            }
        }
    }
}

