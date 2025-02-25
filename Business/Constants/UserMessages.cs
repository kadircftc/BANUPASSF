namespace Business.Constants
{
    public static partial class Messages
    {
        public static string UserNotFound => "UserNotFound";
        public static string UserWrongEmaiOrPassword => "Kullanıcı email veya şifre hatalı!";
        public static string IsNotConfirm => "Henüz giriş yapmayan kullanıcı!";

        public static string InvalidRequestLimit => "Girdiğiniz değer sıfırdan küçük olmamalı!";

        public static string RequestLimitExceeded => "Girdiğiniz değer limiti aştı! (maksimum 50 olabilir)";

    }
}