using System;
using System.Security.Cryptography;
using System.Text;

namespace Crowdfunding {
  public class HashService {
    public string HashPassword(string plainTextString, string saltString) {
      var plainText = Encoding.ASCII.GetBytes(plainTextString);
      var salt = Encoding.ASCII.GetBytes(saltString);
      HashAlgorithm algorithm = new SHA256Managed();

      byte[] plainTextWithSaltBytes = 
        new byte[plainText.Length + salt.Length];

      for (int i = 0; i < plainText.Length; i++)
      {
        plainTextWithSaltBytes[i] = plainText[i];
      }
      for (int i = 0; i < salt.Length; i++)
      {
        plainTextWithSaltBytes[plainText.Length + i] = salt[i];
      }

      return Convert.ToBase64String(algorithm.ComputeHash(plainTextWithSaltBytes));            
    }
  }
}