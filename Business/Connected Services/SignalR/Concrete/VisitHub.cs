using Business.Connected_Services.SignalR.Abstract;
using Business.Services.UserService.Concrete;
using Entities.Concrete;
using Entities.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Connected_Services.SignalR.Concrete
{
    [Authorize]
    public class VisitHub : Hub, IVisitHub
    {
        private readonly ILogger<VisitHub> _logger;

        public VisitHub(ILogger<VisitHub> logger)
        {
            _logger = logger;
        }

        public override async Task OnConnectedAsync()
        {
            _logger.LogInformation($"Client connected: {Context.ConnectionId}");
            _logger.LogInformation($"User: {Context.User?.Identity?.Name}");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _logger.LogInformation($"Client disconnected: {Context.ConnectionId}");
            if (exception != null)
            {
                _logger.LogError($"Disconnection error: {exception.Message}");
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(VisitMultiVisitMergeDto visit)
        {
            _logger.LogInformation($"Sending message from {Context.ConnectionId}");
            await Clients.All.SendAsync("VisitAdded", visit);
        }
    }
}
