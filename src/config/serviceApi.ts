import axios from "axios";

import { APIResponseErrorType } from "./serviceApi.type";

export const onHandleErrorFromAPI = (error: unknown): [null, string] => {
  if (axios.isAxiosError<APIResponseErrorType>(error)) {
    const status = error.response?.status;
    switch (status) {
      case 400:
        return [null, "Bad Request. Please verify your input."];
      case 401:
        return [null, "Unauthorized. Please check your credentials."];
      case 403:
        return [null, "Forbidden. You do not have permission to perform this action."];
      case 404:
        return [null, "Not Found. The resource you are looking for is not available."];
      case 500:
        return [null, "Internal Server Error. Please try again later."];
      default:
        return [null, error?.response?.data?.error?.message ?? "Unknown errors"];
    }
  } else {
    return [null, (error as Error).message];
  }
};
