import { useCallback } from "react";
import { useAtom } from "jotai";

import {
  getUsersAtom,
  usersAtom,
  usersCancelTokenAtom,
  usersErrorAtom,
} from "atoms/userAtom/getUsersAtom";
import useGetData from "../useGetData";
import { UserDataType } from "api/user/users.type";

function useGetUsers(refreshKey?: number) {
  const [, getUsers] = useAtom(getUsersAtom);
  const [userData] = useAtom(usersAtom);
  const [userError] = useAtom(usersErrorAtom);
  const [cancelTokenSource] = useAtom(usersCancelTokenAtom);

  const getUsersData = useCallback(async () => {
    await getUsers();
  }, [getUsers]);

  const { loadData } = useGetData<UserDataType>({
    itemData: userData?.data,
    getDataItem: getUsersData,
    itemError: userError,
    cancelTokenSource,
    refreshKey,
  });

  return {
    loadUserData: loadData,
  };
}

export default useGetUsers;
