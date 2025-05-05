using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class GlobalFilterGeneric
    {
        public string Key { get; set; }
        public string Operation { get; set; }
        public object Value { get; set; }
    }
}
