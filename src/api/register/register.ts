import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";

import { AxiosReturn } from "config/serviceApi.type";
import { RegisterType } from "./register.type";

async function getRegister():AxiosReturn<RegisterType> {
  try {
    const response = await client.get<RegisterType>("/users/register");
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default getRegister;
