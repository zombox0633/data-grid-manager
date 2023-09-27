import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";

async function deleteProduct(id: string, cancelToken?: CancelTokenSource) {
  try {
    const response = await client.delete(`/products/${id}`, {
      cancelToken: cancelToken?.token,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default deleteProduct;
