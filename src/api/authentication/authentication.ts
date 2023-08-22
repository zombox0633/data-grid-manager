import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";

import { AxiosReturn } from "config/serviceApi.type";
import { AuthenticationType } from "./authentication.type";

async function authenticateUser(
  email: string,
  password: string
): AxiosReturn<AuthenticationType> {
  try {
    const response = await client.post<AuthenticationType>("/users/login", {
      email: email,
      password: password,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default authenticateUser;
