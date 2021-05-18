using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using BotShopApi.Extensions.String;
using BotShopCore.Extensions.Media;
using Microsoft.AspNetCore.Http;

namespace Crowdfunding {
  public class MediaStorageService {
    private IAmazonS3 AmazonS3 { get; }

    public MediaStorageService(IAmazonS3 amazonS3) => AmazonS3 = amazonS3;

    private string BucketName => "crowdfunding-marik";

    public string UploadMedia(IFormFile file, int ownerId) {
      var putObjectRequest = new PutObjectRequest {
        Key = $"{ownerId}/{Guid.NewGuid().ToString()}{Path.GetExtension(file.FileName)}",
        BucketName = BucketName,
        InputStream = file.OpenReadStream(),
        ContentType = file.FileName.GetContentType(),
        CannedACL = S3CannedACL.PublicRead
      };

      AmazonS3.PutObjectAsync(putObjectRequest).GetAwaiter().GetResult();

      var request = new GetPreSignedUrlRequest {
        Key = putObjectRequest.Key,
        BucketName = putObjectRequest.BucketName,
        Protocol = Protocol.HTTPS,
        Expires = DateTime.Now
      };

      return AmazonS3.GetPreSignedURL(request).UrlWithoutQueryParams();
    }

    public async Task RemoveMedia(string mediaUrl) {
      var deleteObjectRequest = new DeleteObjectRequest {
        BucketName = BucketName,
        Key = mediaUrl.GetS3Key()
      };

      await AmazonS3.DeleteObjectAsync(deleteObjectRequest);
    }

    public async Task RemoveManyMedia(IEnumerable<string> keys) {
      var deleteObjectsRequest = new DeleteObjectsRequest {
        Objects = keys.Select(k => new KeyVersion {Key = k}).ToList(),
        BucketName = BucketName
      };

      await AmazonS3.DeleteObjectsAsync(deleteObjectsRequest);
    }
  }
}
