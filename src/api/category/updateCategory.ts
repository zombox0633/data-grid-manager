import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";
import { CategoryType } from "./category.type";

export type UpdateCategoryType = {
  id: string;
  name: string;
  last_op_id: string;
  cancelToken?: CancelTokenSource;
};
async function updateCategory({
  id,
  name,
  last_op_id,
  cancelToken,
}: UpdateCategoryType): AxiosReturn<CategoryType> {
  try {
    const response = await client.put<CategoryType>(
      `/category/:${id}`,
      { name: name, last_op_id: last_op_id },
      { cancelToken: cancelToken?.token }
    );
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default updateCategory;
