using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Security.RateLimiting.Abstract
{
    public interface IRateLimitingService
    {
        bool CheckAndLogRequest();
    }
}
