import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";

import { AxiosReturn } from "config/serviceApi.type";
import { RegisterType } from "./register.type";

async function getRegister(
  cancelToken?: CancelTokenSource
): AxiosReturn<RegisterType> {
  try {
    const response = await client.get<RegisterType>("/users/register", {
      cancelToken: cancelToken?.token,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default getRegister;
