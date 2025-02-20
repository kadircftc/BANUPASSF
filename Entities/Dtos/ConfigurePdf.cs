using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class ConfigurePdf
    {
        public byte[] PdfBytes { get; set; }
        public string Type { get; set; }
        public string FileName { get; set; }
    }
}
