using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using WebAPI.Hubs.Abstract;

namespace WebAPI.Hubs;

public class ChatHub : Hub,IChatHub
{
    public async Task SendMessage(string user, string message)
    {
       
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
