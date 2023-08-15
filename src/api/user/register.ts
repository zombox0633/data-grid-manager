import axios from "axios";

import { onHandleErrorFromAPI } from "config/serviceApi";

import { RegisterType } from "./register.type";

async function getRegister(jwt: string) {
  try {
    const response = await axios.get<RegisterType>(
      "http://localhost:3000/api/users/register",
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default getRegister;
