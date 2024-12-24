using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Constants
{
    public static class TransactionMessagesTR
    {
        public static string NameAlreadyExist => "Daha önce böyle bir kayıt oluşturulmuş!";
        public static string DefaultVisitTransactionCountReached => "Günlük ziyaret kaydı limitiniz dolmuştur.";
        public static string NullName => "Ziyaretçi ismi boş olamaz!";
        public static string NullLicensePlate => "Ziyaretçi araç plakası boş olamaz!";
        public static string ConfirmVisitNotUpdate => "Onaylanmış ziyaret kaydı üzerinde değişiklik yapılamaz!";
        public static string RejectForReasonNotNull => "Red sebebi boş olamaz.";
    }
}
