using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class BanuLog:BaseEntity,IEntity
    {
        public string TransactorFullName { get; set; }
        public int TransactorId { get; set; }
        public string TransactionsDescription { get; set; }
        public string TransactionType { get; set; }
    }
}
