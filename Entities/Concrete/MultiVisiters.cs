using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class MultiVisiters:BaseEntity,IEntity
    {
        public Guid VisitId { get; set; }
        public string VisitorFullName { get; set; }
    }
}
