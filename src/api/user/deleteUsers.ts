import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";

async function deleteUsers(id: string, cancelToken?: CancelTokenSource) {
  try {
    const response = await client.delete(`/users/:${id}`, {
      cancelToken: cancelToken?.token,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(null);
  }
}

export default deleteUsers;
