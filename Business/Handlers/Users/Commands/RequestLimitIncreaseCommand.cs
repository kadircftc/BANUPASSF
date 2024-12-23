using Core.Utilities.Results;
using MediatR;
using System.Threading.Tasks;
using Business.BusinessAspects;
using Business.Constants;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using DataAccess.Abstract;
using System.Threading;

namespace Business.Handlers.Users.Commands
{
    public class RequestLimitIncreaseCommand : IRequest<IResult>
    {
        public int UserId { get; set; }
        public int IncreaseAmount { get; set; }

        public class RequestLimitIncreaseCommandHandler : IRequestHandler<RequestLimitIncreaseCommand, IResult>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMediator _mediator;

            public RequestLimitIncreaseCommandHandler(IUserRepository userRepository, IMediator mediator)
            {
                _userRepository = userRepository;
                _mediator = mediator;
            }

            [SecuredOperation(Priority = 1)]
            [LogAspect(typeof(FileLogger))]
            public async Task<IResult> Handle(RequestLimitIncreaseCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetAsync(u => u.UserId == request.UserId);
                if (user == null)
                {
                    return new ErrorResult(Messages.UserNotFound);
                }

                if (request.IncreaseAmount < 0)
                {
                    return new ErrorResult(Messages.InvalidRequestLimit);
                }

                int newLimit = request.IncreaseAmount;
                if (newLimit > 50)
                {
                    return new ErrorResult(Messages.RequestLimitExceeded);
                }

                user.ReqLimit = newLimit;
                _userRepository.Update(user);
                await _userRepository.SaveChangesAsync();
                return new SuccessResult(Messages.Updated);
            }
        }
    }
}
