export const getStatusMessage = (status: string) => {
  switch (status) {
    case "":
      return "Please fill in your information to login.";
    case "VERIFYING":
      return "Verifying user information...";
    case "SUCCESS":
      return "Successfully authenticated!";
    case "SYSTEM_ERROR":
      return "Apologies for the inconvenience, a system error occurred";
    case "AUTH_FAILED":
      return "Email or password is incorrect. Please try again.";
    case "INCORRECT_CREDENTIALS":
      return "Authentication failed. Please try again.";
    default:
      return "";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "":
      return "text-black/80";
    case "VERIFYING":
      return "text-yellow-500";
    case "SUCCESS":
      return "text-mint";
    case "SYSTEM_ERROR":
      return "text-[#FF2A04]";
    case "AUTH_FAILED":
    case "INCORRECT_CREDENTIALS":
      return "text-orange-500";
    default:
      return "text-black";
  }
};
