using Business.BusinessAspects;
using Business.Constants;
using Business.CrossCuttingConcernsBS.Logging;
using Business.Services.ConvertPdfService.Abstract;
using Core.Entities;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.BanuLogs.Queries
{
    public class GetBanuLogsPdfGenerateForSecurityQuery : IRequest<ConfigurePdf>
    {
        public List<GlobalFilterGeneric> Filters { get; set; }

        public class GetBanuLogsPdfGenerateForSecurityQueryHandler : IRequestHandler<GetBanuLogsPdfGenerateForSecurityQuery, ConfigurePdf>
        {
            private readonly IMediator _mediator;
            private readonly IBanuLogRepository _banuLogRepository;
            private readonly IConvertPdfService _convertPdfService;

            public GetBanuLogsPdfGenerateForSecurityQueryHandler(IMediator mediator, IBanuLogRepository banuLogRepository, IConvertPdfService convertPdfService)
            {
                _mediator = mediator;
                _banuLogRepository = banuLogRepository;
                _convertPdfService = convertPdfService;
            }
            [SecuredOperation(Priority = 1)]
            [BanuLogAspect(typeof(MsSqlLoggerProcess))]
            public async Task<ConfigurePdf> Handle(GetBanuLogsPdfGenerateForSecurityQuery request, CancellationToken cancellationToken)
            {
                if (request.Filters == null || !request.Filters.Any())
                {
                    request.Filters = new List<GlobalFilterGeneric>
                {
                    new GlobalFilterGeneric {Operation="Contains", Key = "TransactionType", Value ="Güvenlik Onay" }
                };
                }
                else
                {
                    foreach (var filter in request.Filters)
                    {
                        if (filter.Key == "TransactionType")
                        {
                            var transactionValue = filter.Value.ToString();
                            if (transactionValue != "Güvenlik Onay" && transactionValue != "Güvenlik Red" && transactionValue != "Güvenlik Pdf Rapor Oluşturma")
                            {
                                return new ConfigurePdf { PdfBytes = null, Type = "error", FileName = null };
                            }
                        }
                    }
                }

                var result = (await _banuLogRepository.GetFilteredListAsync(request.Filters)).ToList().Where(a=>a.TransactionType=="Güvenlik Onay"|| a.TransactionType == "Güvenlik Red"|| a.TransactionType == "Güvenlik Pdf Rapor Oluşturma");

                await _convertPdfService.SetFilters(request.Filters);

                if (result == null || !result.Any())
                {
                    return new ConfigurePdf { PdfBytes = null, Type = "error", FileName = null };
                }

                if (result.Count() > 35)
                {
                    var logGroups = _convertPdfService.SplitLogs(result, 35);
                    var zipBytes = _convertPdfService.GenerateZipWithPdfs(logGroups, DateTime.Now.ToString("yyyy-MM-dd"));
                    return new ConfigurePdf { PdfBytes = zipBytes, Type = "zip", FileName = $"BanuLogs_{DateTime.Now:yyyy-MM-dd}.zip" };
                }
                else
                {
                    var pdfBytes = _convertPdfService.GeneratePdf(result.ToList(), 1, DateTime.Now.ToString("yyyy-MM-dd"));
                    return new ConfigurePdf { PdfBytes = pdfBytes, Type = "pdf", FileName = $"BanuLogs_{DateTime.Now:yyyy-MM-dd}.pdf" };
                }
            }

        }
    }
}
