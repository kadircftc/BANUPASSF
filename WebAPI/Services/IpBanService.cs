using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;

namespace WebAPI.Services
{
    public class IpBanService
    {
        private readonly IMemoryCache _cache;
        private readonly ConcurrentDictionary<string, int> _failedAttempts;
        private const int MAX_FAILED_ATTEMPTS = 10;
        private const int INITIAL_BAN_MINUTES = 30;

        public IpBanService(IMemoryCache cache)
        {
            _cache = cache;
            _failedAttempts = new ConcurrentDictionary<string, int>();
        }

        public async Task RecordFailedAttempt(string ipAddress)
        {
            int attempts = _failedAttempts.AddOrUpdate(ipAddress, 1, (key, count) => count + 1);

            if (attempts >= MAX_FAILED_ATTEMPTS)
            {
                // Calculate ban duration based on number of previous bans
                int previousBans = GetPreviousBanCount(ipAddress);
                int banDurationMinutes = INITIAL_BAN_MINUTES * (int)Math.Pow(2, previousBans); // Exponential backoff
                
                await BanIp(ipAddress, TimeSpan.FromMinutes(banDurationMinutes));
                _failedAttempts.TryRemove(ipAddress, out _);
            }
        }

        public bool IsIpBanned(string ipAddress)
        {
            return _cache.TryGetValue($"banned_{ipAddress}", out _);
        }

        private async Task BanIp(string ipAddress, TimeSpan duration)
        {
            string banKey = $"banned_{ipAddress}";
            string banCountKey = $"ban_count_{ipAddress}";

            // Increment ban count
            int banCount = 1;
            if (_cache.TryGetValue(banCountKey, out int existingBanCount))
            {
                banCount = existingBanCount + 1;
            }

            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(duration);

            _cache.Set(banKey, true, cacheEntryOptions);
            _cache.Set(banCountKey, banCount, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromDays(30)));
        }

        private int GetPreviousBanCount(string ipAddress)
        {
            string banCountKey = $"ban_count_{ipAddress}";
            return _cache.TryGetValue(banCountKey, out int banCount) ? banCount : 0;
        }

        public void ResetFailedAttempts(string ipAddress)
        {
            _failedAttempts.TryRemove(ipAddress, out _);
        }
    }
} 