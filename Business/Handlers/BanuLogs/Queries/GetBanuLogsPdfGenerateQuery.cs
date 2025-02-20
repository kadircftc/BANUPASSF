using Business.BusinessAspects;
using Business.CrossCuttingConcernsBS.Logging;
using Business.Services.ConvertPdfService.Abstract;
using Business.Services.ConvertPdfService.Concrete;
using Core.Entities;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Business.Handlers.BanuLogs.Queries
{
    public class GetBanuLogsPdfGenerateQuery : IRequest<ConfigurePdf>
    {
        public List<GlobalFilterGeneric> Filters { get; set; }

        public class GetBanuLogsPdfGenerateQueryHandler : IRequestHandler<GetBanuLogsPdfGenerateQuery, ConfigurePdf>
        {
            private readonly IMediator _mediator;
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IConvertPdfService _convertPdfService;

            public GetBanuLogsPdfGenerateQueryHandler(IMediator mediator, IBanuLogRepository banuLogRepository, IConvertPdfService convertPdfService)
            {
                _mediator = mediator;
                _banuLogRepository = banuLogRepository;
                _convertPdfService = convertPdfService;
            }
            [SecuredOperation(Priority = 1)]
            [BanuLogAspect(typeof(MsSqlLoggerProcess))]
            public async Task<ConfigurePdf> Handle(GetBanuLogsPdfGenerateQuery request, CancellationToken cancellationToken)
            {
                var result = await _banuLogRepository.GetFilteredListAsync(request.Filters);
                await _convertPdfService.SetFilters(request.Filters);
                if (result == null)
                {
                    return new ConfigurePdf { PdfBytes = null, Type = "error",FileName=null };
                }
                    if (result.Count() > 35)
                    {
                        var logGroups = _convertPdfService.SplitLogs(result, 35);

                        var zipBytes = _convertPdfService.GenerateZipWithPdfs(logGroups, DateTime.Now.ToString("yyyy-MM-dd"));
                        return new  ConfigurePdf { PdfBytes = zipBytes, Type = "zip", FileName = $"BanuLogs_{DateTime.Now.ToString("yyyy-MM-dd")}.zip" };
                    }
                    else
                    {
                        var pdfBytes = _convertPdfService.GeneratePdf(result.ToList(), 1, DateTime.Now.ToString("yyyy-MM-dd"));
                        return new ConfigurePdf { PdfBytes = pdfBytes, Type = "pdf", FileName = $"BanuLogs_{DateTime.Now.ToString("yyyy-MM-dd")}.pdf" };
                    }
                
              
                
            }
        }
    }
}
