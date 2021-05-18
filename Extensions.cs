using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Crowdfunding {
  public static class ControllerExtensions {
    public static int GetUserId(this Controller controller) {
      return int.Parse(controller.User.Claims.First().Value);
    }
  }
}