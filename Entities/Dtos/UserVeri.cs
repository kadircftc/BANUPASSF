using Newtonsoft.Json;

namespace Entities.Dtos
{
    public class UserVeri
    {
        public string Tckimlik { get; set; }
        public string Adi { get; set; }
        public string Soyadi { get; set; }
        [JsonProperty("ogrencimi")]
        public bool Ogrencimi { get; set; }
        public string Token { get; set; }
        public object Yetkiler { get; set; }
    }

}
