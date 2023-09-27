import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";

import { AuthenticationType } from "./authentication.type";

type authenticateUserType = {
  email: string;
  password: string;
  cancelToken?: CancelTokenSource;
};

async function authenticateUser({
  email,
  password,
  cancelToken,
}: authenticateUserType): AxiosReturn<AuthenticationType> {
  try {
    const response = await client.post<AuthenticationType>(
      "/users/login",
      {
        email: email,
        password: password,
      },
      { cancelToken: cancelToken?.token }
    );
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default authenticateUser;
