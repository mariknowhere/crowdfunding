using Amazon;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon.S3;
using Microsoft.Extensions.DependencyInjection;

namespace Crowdfunding {
  public static partial class ServiceCollectionExtensions {
    public static IServiceCollection AddAwsS3Services(this IServiceCollection services) => services
      .AddAWSService<IAmazonS3>()
      .AddDefaultAWSOptions(AwsCredentials);


    private static readonly string AwsAccessKeyId = "";
    private static readonly string AwsSecretAccessKey = "";
    private static readonly RegionEndpoint AwsRegion = RegionEndpoint.GetBySystemName("eu-north-1");

    public static AWSOptions AwsCredentials => new AWSOptions {
      Credentials = new BasicAWSCredentials(AwsAccessKeyId, AwsSecretAccessKey),
      Region = AwsRegion
    };
  }
}