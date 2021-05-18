using System;
using BotShopCore.Enums;
using Microsoft.AspNetCore.StaticFiles;

namespace BotShopCore.Extensions.Media {
  public static class StringExtensions {
    public static EDisplayType GetDisplayType(this string fileName) {
      var contentType = GetContentType(fileName);

      if (contentType.StartsWith("image")) return EDisplayType.Image;
      if (contentType.StartsWith("video")) return EDisplayType.Video;

      throw new Exception("Incorrect file");
    }

    public static string GetContentType(this string fileName) {
      var extensionContentTypeProvider = new FileExtensionContentTypeProvider();
      extensionContentTypeProvider.TryGetContentType(fileName, out var contentType);

      return contentType;
    }
  }
}