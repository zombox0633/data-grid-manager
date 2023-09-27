import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";
import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";

import { ProductsType } from "./products.type";

async function getProducts(
  cancelToken?: CancelTokenSource
): AxiosReturn<ProductsType> {
  try {
    const response = await client.get<ProductsType>("/products", {
      cancelToken: cancelToken?.token,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default getProducts;
