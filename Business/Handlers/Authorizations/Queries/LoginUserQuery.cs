using Business.Constants;
using Business.Services.Authentication;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Caching;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using Core.Utilities.Security.Hashing;
using Core.Utilities.Security.Jwt;
using DataAccess.Abstract;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using Core.Entities.Concrete;
using Entities.Dtos;
using System.Configuration;
using Core.Utilities.IoC;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Handlers.Authorizations.Queries
{
    public class LoginUserQuery : IRequest<IDataResult<AccessToken>>
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, IDataResult<AccessToken>>
        {
            private readonly IUserRepository _userRepository;
            private readonly ITokenHelper _tokenHelper;
            private readonly IMediator _mediator;
            private readonly ICacheManager _cacheManager;

            public LoginUserQueryHandler(IUserRepository userRepository, ITokenHelper tokenHelper, IMediator mediator, ICacheManager cacheManager)
            {
                _userRepository = userRepository;
                _tokenHelper = tokenHelper;
                _mediator = mediator;
                _cacheManager = cacheManager;
            }

            [LogAspect(typeof(FileLogger))]
            public async Task<IDataResult<AccessToken>> Handle(LoginUserQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetAsync(u => u.Email == request.Email && u.Status);

                if (user == null)
                {
                    var apiResponse = await CheckUserFromExternalApi(request.Email, request.Password);

                    if (!apiResponse.Basarilimi || apiResponse.Veri.Ogrencimi)
                    {
                        return new ErrorDataResult<AccessToken>(Messages.UserNotFound);
                    }

                    user = new User
                    {
                        Email = request.Email,
                        FullName = $"{apiResponse.Veri.Adi} {apiResponse.Veri.Soyadi}",
                        CitizenId = Convert.ToInt64(apiResponse.Veri.Tckimlik),
                        Status = true, 
                        RecordDate = DateTime.Now,
                        UpdateContactDate = DateTime.Now
                    };

                    HashingHelper.CreatePasswordHash(request.Password, out var passwordSalt, out var passwordHash);
                    user.PasswordSalt = passwordSalt;
                    user.PasswordHash = passwordHash;

                    _userRepository.Add(user);
                    await _userRepository.SaveChangesAsync();
                }
                else
                {
                    if (!HashingHelper.VerifyPasswordHash(request.Password, user.PasswordSalt, user.PasswordHash))
                    {
                        return new ErrorDataResult<AccessToken>(Messages.PasswordError);
                    }
                }

                var claims = _userRepository.GetClaims(user.UserId);
                var accessToken = _tokenHelper.CreateToken<DArchToken>(user);
                accessToken.Claims = claims.Select(x => x.Name).ToList();

                user.RefreshToken = accessToken.RefreshToken;
                _userRepository.Update(user);
                await _userRepository.SaveChangesAsync();

                _cacheManager.Add($"{CacheKeys.UserIdForClaim}={user.UserId}", claims.Select(x => x.Name));

                return new SuccessDataResult<AccessToken>(accessToken, Messages.SuccessfulLogin);
            }

            private async Task<BanuLoginResponse> CheckUserFromExternalApi(string email, string password)
            {
                var configuration = ServiceTool.ServiceProvider.GetService<IConfiguration>();
                using var client = new HttpClient();
                var url = "http://mobil-web-servis.bandirma.edu.tr/api/Giris";
                var kullaniciBody = $@"{{
                    ""kullaniciAdi"": ""{email}"",
                    ""sifre"": ""{password}""
                }}";
                var apiKey = configuration["ApiKey"];
                if (string.IsNullOrEmpty(apiKey))
                {
                    throw new Exception("API Key not found in configuration.");
                }

                var content = new StringContent(kullaniciBody, Encoding.UTF8, "application/json");

                client.DefaultRequestHeaders.Add("cache-control", "no-cache");
                client.DefaultRequestHeaders.Add("Connection", "keep-alive");
                client.DefaultRequestHeaders.Add("Accept-Encoding", "gzip, deflate");
                client.DefaultRequestHeaders.Add("Host", "mobil-web-servis.bandirma.edu.tr");
                client.DefaultRequestHeaders.Add("Cache-Control", "no-cache");
                client.DefaultRequestHeaders.Add("User-Agent", "PostmanRuntime/7.19.0");
                client.DefaultRequestHeaders.Add("X-ApiKey", apiKey);

                var response = await client.PostAsync(url, content);

                if (!response.IsSuccessStatusCode)
                {
                    return new BanuLoginResponse { Basarilimi = false };
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<BanuLoginResponse>(responseContent);
            }
        }
    }

}
