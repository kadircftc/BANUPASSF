using Business.Connected_Services.SignalR.Abstract;
using Business.Services.UserService.Concrete;
using Entities.Concrete;
using Entities.Dtos;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Connected_Services.SignalR.Concrete
{
    public class VisitHub: Hub, IVisitHub
    {
        public async Task SendMessage(VisitMultiVisitMergeDto visit)
        {
         await Clients.All.SendAsync("VisitAdded", visit);
            
        }
    }
}
