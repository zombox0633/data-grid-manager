import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";

import { UserType } from "./users.type";

async function getUsers(
  cancelToken?: CancelTokenSource
): AxiosReturn<UserType> {
  try {
    const response = await client.get<UserType>("/users", {
      cancelToken: cancelToken?.token,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default getUsers;
