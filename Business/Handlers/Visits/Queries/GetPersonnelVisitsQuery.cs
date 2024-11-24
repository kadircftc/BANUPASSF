using Business.BusinessAspects;
using Business.Services.UserService.Abstract;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Performance;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.Visits.Queries
{
    public class GetPersonnelVisitsQuery:IRequest<IDataResult<IEnumerable<Visit>>>
    {
        public class GetPersonnelVisitsQueryHandler : IRequestHandler<GetPersonnelVisitsQuery, IDataResult<IEnumerable<Visit>>>
        {
            private readonly IVisitRepository _visitRepository;
            private readonly IMediator _mediator;
            private readonly IHttpContextAccessor _contextAccessor;
            private readonly IUserService _userService;

            public GetPersonnelVisitsQueryHandler(IVisitRepository visitRepository, IMediator mediator, IHttpContextAccessor contextAccessor, IUserService userService)
            {
                _visitRepository = visitRepository;
                _mediator = mediator;
                _contextAccessor = contextAccessor;
                _userService = userService;
            }

            [PerformanceAspect(5)]
            [CacheAspect(10)]
            [LogAspect(typeof(FileLogger))]
            [SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<Visit>>> Handle(GetPersonnelVisitsQuery request, CancellationToken cancellationToken)
            {
                var userId = _userService.GetUserIdFromJwt(_contextAccessor.HttpContext.Request);
                var result = await _visitRepository.GetListAsync(v => v.PersonnelId == userId);

                return new SuccessDataResult<IEnumerable<Visit>>(result);
            }
           
        }
    }
}
