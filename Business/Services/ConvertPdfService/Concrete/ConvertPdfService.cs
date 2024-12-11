using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.Services.ConvertPdfService.Abstract;
using Entities.Concrete;
using iTextSharp.text.pdf;
using iTextSharp.text;
using System.IO.Compression;


namespace Business.Services.ConvertPdfService.Concrete
{
    public class ConvertPdfService : IConvertPdfService
    {
        public byte[] GeneratePdf(IEnumerable<BanuLog> logs, int partNumber, string date)
        {
            using (var memoryStream = new MemoryStream())
            {
                var document = new Document(PageSize.A3);
                PdfWriter.GetInstance(document, memoryStream);
                document.Open();

                var titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 16);
                document.Add(new Paragraph($"Banu Logs - Tarih Bazli Kayitlar (Part - {partNumber})", titleFont));
                document.Add(new Paragraph("\n"));

          
                var table = new PdfPTable(6) { WidthPercentage = 100 }; 
                table.AddCell("ID");
                table.AddCell("Transactor ID");
                table.AddCell("Transactor FullName");
                table.AddCell("Transaction Description");
                table.AddCell("Transaction Type");
                table.AddCell("Created Date");

                foreach (var log in logs)
                {
                    table.AddCell(log.Id.ToString());
                    table.AddCell(log.TransactorId.ToString());
                    table.AddCell(log.TransactorFullName);
                    table.AddCell(log.TransactionsDescription);
                    table.AddCell(log.TransactionType);
                    table.AddCell(log.CreatedDate.ToString("yyyy-MM-dd HH:mm:ss"));
                }

                document.Add(table);

                document.Close();

                return memoryStream.ToArray();
            }
        }
        public byte[] GenerateZipWithPdfs(List<List<BanuLog>> logGroups, string date)
        {
            using (var memoryStream = new MemoryStream())
            {
                using (var zipArchive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                {
                    for (int i = 0; i < logGroups.Count; i++)
                    {
                        var pdfBytes = GeneratePdf(logGroups[i], i + 1, date);
                        var pdfFileName = $"BanuLogs_{date}_Part{i + 1}.pdf";

                        var zipEntry = zipArchive.CreateEntry(pdfFileName, CompressionLevel.Fastest);
                        using (var entryStream = zipEntry.Open())
                        {
                            entryStream.Write(pdfBytes, 0, pdfBytes.Length);
                        }
                    }
                }

                return memoryStream.ToArray();
            }
        }
        public List<List<BanuLog>> SplitLogs(IEnumerable<BanuLog> logs, int batchSize)
        {
            var logList = logs.ToList();
            var result = new List<List<BanuLog>>();

            for (int i = 0; i < logList.Count; i += batchSize)
            {
                result.Add(logList.GetRange(i, Math.Min(batchSize, logList.Count - i)));
            }

            return result;
        }
    }
}
