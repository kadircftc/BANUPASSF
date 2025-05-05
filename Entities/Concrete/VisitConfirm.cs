using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class VisitConfirm:BaseEntity,IEntity
    {
        public Guid VisitId { get; set; }
        public int SecurityId { get; set; }
        public bool TransactionType { get; set; }
    }
}
