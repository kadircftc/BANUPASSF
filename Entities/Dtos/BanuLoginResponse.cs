using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class BanuLoginResponse
    {
        public bool Basarilimi { get; set; }
        public string HataMesaji { get; set; }
        public UserVeri Veri { get; set; }
    }

}
