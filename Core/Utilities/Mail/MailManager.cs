using Core.Entities.Concrete;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using System;
using System.Threading.Tasks;

namespace Core.Utilities.Mail
{
    public class MailManager : IMailService
    {
        private readonly IConfiguration _configuration;
        private readonly SmtpClient _smtpClient;

        public MailManager(IConfiguration configuration)
        {
            _configuration = configuration;
            _smtpClient = new SmtpClient();
        }

        public async Task SendAsync(User user, string visitorName, bool type)
        {
            var message = new MimeMessage();
            message.To.Add(new MailboxAddress(user.FullName, user.Email));
            message.From.Add(new MailboxAddress(_configuration["EmailConfiguration:SenderName"], _configuration["EmailConfiguration:SenderEmail"]));
            message.Subject = "Ziyaretçi Girişi Bildirimi";

            if(type)
            {
                message.Body = new TextPart(TextFormat.Html)
                {
                    Text = $" <html>\r\n<head>\r\n    <style>\r\n        body {{\r\n            font-family: Arial, sans-serif;\r\n            background-color: #f4f4f4;\r\n            margin: 0;\r\n            padding: 0;\r\n        }}\r\n        .container {{\r\n            width: 100%;\r\n            display: flex;\r\n            justify-content: center;\r\n            align-items: center;\r\n       }}\r\n        .content {{\r\n            background-color: #ffffff;\r\n            padding: 20px;\r\n            border-radius: 10px;\r\n            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\r\n            max-width: 400px;\r\n            text-align: center;\r\n            margin: auto; /* Dikey ortalamayı garantiye almak için */\r\n        }}\r\n        h2 {{\r\n            color: #333;\r\n        }}\r\n        p {{\r\n            font-size: 16px;\r\n            color: #555;\r\n        }}\r\n    </style>\r\n</head>\r\n<body>\r\n    <div class=\"container\">\r\n        <div class=\"content\">\r\n            <h2>Sayın {user.FullName},</h2>\r\n            <p>Ziyaretçiniz <b>{visitorName}</b> giriş yapmıştır.</p>\r\n        </div>\r\n    </div>\r\n</body>\r\n</html>\r\n"
                };
            }
            else
            {
                message.Body = new TextPart(TextFormat.Html)
                {
                    Text = $" <html>\r\n<head>\r\n    <style>\r\n        body {{\r\n            font-family: Arial, sans-serif;\r\n            background-color: #f4f4f4;\r\n            margin: 0;\r\n            padding: 0;\r\n        }}\r\n        .container {{\r\n            width: 100%;\r\n            display: flex;\r\n            justify-content: center;\r\n            align-items: center;\r\n       }}\r\n        .content {{\r\n            background-color: #ffffff;\r\n            padding: 20px;\r\n            border-radius: 10px;\r\n            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\r\n            max-width: 400px;\r\n            text-align: center;\r\n            margin: auto; /* Dikey ortalamayı garantiye almak için */\r\n        }}\r\n        h2 {{\r\n            color: #333;\r\n        }}\r\n        p {{\r\n            font-size: 16px;\r\n            color: #555;\r\n        }}\r\n    </style>\r\n</head>\r\n<body>\r\n    <div class=\"container\">\r\n        <div class=\"content\">\r\n            <h2>Sayın {user.FullName},</h2>\r\n            <p>Ziyaretçiniz <b>{visitorName}</b> adlı kişi için oluşturulan talep reddedilmiştir.</p>\r\n        </div>\r\n    </div>\r\n</body>\r\n</html>\r\n"
                };
            }
            

            if (!_smtpClient.IsConnected)
            {
                await _smtpClient.ConnectAsync(
                    _configuration["EmailConfiguration:SmtpServer"],
                    Convert.ToInt32(_configuration["EmailConfiguration:SmtpPort"]),
                    SecureSocketOptions.StartTls);
                await _smtpClient.AuthenticateAsync(
                    _configuration["EmailConfiguration:Username"],
                    _configuration["EmailConfiguration:Password"]);
            }

            await _smtpClient.SendAsync(message);
        }

        public void Dispose()
        {
            _smtpClient.Disconnect(true);
            _smtpClient.Dispose();
        }
    }

}