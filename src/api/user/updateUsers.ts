import { CancelTokenSource } from "axios";
import client from "config/axiosConfig";

import { onHandleErrorFromAPI } from "config/serviceApi";
import { AxiosReturn } from "config/serviceApi.type";
import { UserType } from "./users.type";

type UpdateUsersType = {
  id: string;
  name?: string;
  role?: string;
  last_op_id: string;
  cancelToken?: CancelTokenSource;
};

async function updateUsers({
  id,
  name,
  role,
  last_op_id,
  cancelToken,
}: UpdateUsersType): AxiosReturn<UserType> {
  try {
    const response = await client.put<UserType>(
      `/users/:${id}`,
      { name: name, role: role, last_op_id: last_op_id },
      { cancelToken: cancelToken?.token }
    );
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromAPI(error);
  }
}

export default updateUsers;
