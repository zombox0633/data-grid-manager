import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";
import { ProductsType } from "./products.type";

type updateProductType = {
  id: string;
  name?: string;
  category_id?: string;
  price?: number;
  quantity?: number;
  last_op_id: string;
  cancelToken?: CancelTokenSource;
};

async function updateProduct({
  id,
  name,
  category_id,
  price,
  quantity,
  last_op_id,
  cancelToken,
}: updateProductType): AxiosReturn<ProductsType> {
  try {
    const response = await client.put<ProductsType>(
      `/products/${id}`,
      {
        name: name,
        category_id: category_id,
        price: price,
        quantity: quantity,
        last_op_id: last_op_id,
      },
      {
        cancelToken: cancelToken?.token,
      }
    );
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default updateProduct;
