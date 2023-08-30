import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";

import { CategoryType } from "./category.type";

async function getCategory(): AxiosReturn<CategoryType> {
  try {
    const response = await client.get<CategoryType>("/category");
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default getCategory;
