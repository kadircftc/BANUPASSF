using Core.Entities;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.ConvertPdfService.Abstract
{
    public interface IConvertPdfService
    {
        byte[] GeneratePdf(IEnumerable<BanuLog> logs, int partNumber, string date);

        List<List<BanuLog>> SplitLogs(IEnumerable<BanuLog> logs, int batchSize);

        byte[] GenerateZipWithPdfs(List<List<BanuLog>> logGroups, string date);
        Task SetFilters(List<GlobalFilterGeneric> filters);
    }
}
