using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Connected_Services.SignalR.Abstract
{
    public interface IVisitHub
    {
        Task SendMessage(VisitMultiVisitMergeDto visit);
    }
}
