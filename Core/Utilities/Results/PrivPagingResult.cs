using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Results
{
    public class PrivPagingResult<T> : Result
    {
        public PrivPagingResult(List<T> data, int totalItemCount, bool success, string message, int totalPages) : base(success, message)
        {
            Data = data;
            TotalItemCount = totalItemCount;
            TotalPages = totalPages;
        }

        public List<T> Data { get; set; }
        public int TotalItemCount { get; set; }
        public int TotalPages { get; set; }
    }
}
