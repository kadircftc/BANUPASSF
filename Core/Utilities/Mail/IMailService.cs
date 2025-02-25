using Core.Entities.Concrete;
using System.Threading.Tasks;

namespace Core.Utilities.Mail
{
    public interface IMailService
    {
        Task SendAsync(User user,string visitorName,bool type);  
    }
}
