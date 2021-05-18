using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Crowdfunding {
  public class JwtService {
    private DateTime JwtExpiredAt => DateTime.Now.Add(
      TimeSpan.FromHours(24)
    );

    public string CreateJwt(int accountId) => new JwtSecurityTokenHandler().WriteToken(
      new JwtSecurityToken(
        issuer: AuthIssuer,
        audience: AuthAudience,
        notBefore: DateTime.Now,
        claims: CreateAccountClaims(accountId),
        expires: JwtExpiredAt,
        signingCredentials: SigningCredentials
      )
    );

    private static IEnumerable<Claim> CreateAccountClaims(int accountId) => new[] {
      new Claim(
        ClaimsIdentity.DefaultNameClaimType,
        accountId.ToString()
      )
    };
    
    public static TokenValidationParameters TokenValidationParameters => new TokenValidationParameters {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = true,
      ValidateIssuerSigningKey = true,
      ValidIssuer = AuthIssuer,
      ValidAudience = AuthAudience,
      IssuerSigningKey = ToSymmetricSecurityKey(AuthKey),
      LifetimeValidator = LifetimeValidator
    };

    private static string AuthIssuer = "AuthIssuer";
    private static string AuthKey = "AuthKeyAuthKeyAuthKey";
    private static string AuthAudience = "AuthAudienceAuthAudience";

    public SigningCredentials SigningCredentials => new SigningCredentials(
      ToSymmetricSecurityKey(AuthKey),
      SecurityAlgorithms.HmacSha256
    );

    private static SymmetricSecurityKey ToSymmetricSecurityKey(string key)
      => new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));

    private static bool LifetimeValidator(
      DateTime? notBefore,
      DateTime? expires,
      SecurityToken token,
      TokenValidationParameters parameters
    ) => expires > DateTime.Now;
  }
}