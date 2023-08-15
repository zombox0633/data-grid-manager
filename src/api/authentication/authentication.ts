import axios from "axios";

import { onHandleErrorFromAPI } from "config/serviceApi";

import { AuthenticationType } from "./authentication.type";

async function authenticateUser(email:string,password:string) {
  try {
    const response = await axios.post<AuthenticationType>("http://localhost:3000/api/users/login", {
      email: email,
      password: password,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default authenticateUser;
