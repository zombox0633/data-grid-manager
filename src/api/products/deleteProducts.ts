import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";

async function deleteProduct(id:string) {
  try {
    const response = await client.delete(`/products/${id}`);
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default deleteProduct