import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";

async function deleteCategory(id: string, cancelToken?: CancelTokenSource) {
  try {
    const response = await client.delete(`/category/:${id}`, {
      cancelToken: cancelToken?.token,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default deleteCategory;
