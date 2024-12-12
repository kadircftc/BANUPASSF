using Core.Entities;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class VisitMultiVisitMergeDto:IDto
    {
        public Visit Visit { get; set; }
        public List<MultiVisiters> MultiVisiters { get; set; }
    }
}
