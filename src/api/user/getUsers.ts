import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";

import { UserType } from "./users.type";

async function getUsers(): AxiosReturn<UserType> {
  try {
    const response = await client.get<UserType>("/users");
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default getUsers;
