import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";

import { ProductsType } from "./products.type";

type addProductType = {
  name: string;
  category_id: string;
  price: number;
  quantity: number;
  last_op_id: string;
};

async function addProduct({
  name,
  category_id,
  price,
  quantity,
  last_op_id,
}: addProductType): AxiosReturn<ProductsType> {
  try {
    const response = await client.post<ProductsType>(`/products`, {
      name: name,
      category_id: category_id,
      price: price,
      quantity: quantity,
      last_op_id: last_op_id,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default addProduct;
