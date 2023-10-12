import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";
import { CategoryType } from "./category.type";

export type addCategoryType = {
  name: string;
  last_op_id: string;
  cancelToken?: CancelTokenSource;
};

async function addCategory({
  name,
  last_op_id,
  cancelToken,
}: addCategoryType): AxiosReturn<CategoryType> {
  try {
    const response = await client.post<CategoryType>(
      `/category`,
      { name: name, last_op_id: last_op_id },
      { cancelToken: cancelToken?.token }
    );
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default addCategory;
