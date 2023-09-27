import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";

import { CategoryType } from "./category.type";

async function getCategory(
  cancelToken?: CancelTokenSource
): AxiosReturn<CategoryType> {
  try {
    const response = await client.get<CategoryType>("/category", {
      cancelToken: cancelToken?.token,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default getCategory;
