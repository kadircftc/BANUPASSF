using System.Threading.Tasks;

namespace WebAPI.Hubs.Abstract
{
    public interface IChatHub
    {
        Task SendMessage(string user, string message);
    }
}
