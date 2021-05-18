using System.Text.Json.Serialization;

namespace BotShopCore.Enums {
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum EDisplayType {
    Video,
    Image,
  }
}