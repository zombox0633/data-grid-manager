import axios from "axios";

import { APIResponseErrorType } from "./serviceApi.type";

export const onHandleErrorFromAPI = (error: unknown): [null, string] => {
  if (axios.isAxiosError<APIResponseErrorType>(error)) {
    return [null, error?.response?.data?.error?.message ?? "ERROR"];
  } else {
    return [null, (error as Error).message];
  }
};
