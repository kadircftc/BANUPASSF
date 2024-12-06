using Core.Utilities.Security.RateLimiting.Abstract;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Core.Utilities.Security.RateLimiting
{
    public class RateLimitingService : IRateLimitingService
    {
        private readonly IMemoryCache _memoryCache;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly int _maxRequests = 5;  // Maksimum izin verilen istek sayısı
        private readonly int _timeWindowInMinutes = 10;  

        public RateLimitingService(IMemoryCache memoryCache, IHttpContextAccessor httpContextAccessor)
        {
            _memoryCache = memoryCache;
            _httpContextAccessor = httpContextAccessor;
        }

        public bool CheckAndLogRequest()
        {
            var ipAddress = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress?.ToString();

            if (string.IsNullOrEmpty(ipAddress))
            {
                return false;
            }

            var cacheKey = $"RateLimiting_{ipAddress}";
            var currentTime = DateTime.UtcNow;

            if (_memoryCache.TryGetValue(cacheKey, out List<DateTime> requestTimestamps))
            {
                requestTimestamps = requestTimestamps.Where(timestamp => timestamp > currentTime.AddMinutes(-_timeWindowInMinutes)).ToList();

                if (requestTimestamps.Count >= _maxRequests)
                {
                    return false; 
                }

                requestTimestamps.Add(currentTime);
            }
            else
            {
                requestTimestamps = new List<DateTime> { currentTime };
            }

            _memoryCache.Set(cacheKey, requestTimestamps, TimeSpan.FromMinutes(_timeWindowInMinutes));

            return true;  
        }
    }
}
