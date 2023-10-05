import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import {
  getUsersAtom,
  usersAtom,
  usersCancelTokenAtom,
  usersErrorAtom,
} from "atoms/userAtom/getUsersAtom";
import { UserDataType } from "api/user/users.type";
import useCancelToken from "hook/useCancelToken";

type UseUserReturnDataType = [
  userData: UserDataType[] | null,
  userError: null | string
];

function useGetUsers(refreshKey?: number) {
  const [, getUsers] = useAtom(getUsersAtom);
  const [userData] = useAtom(usersAtom);
  const [userError] = useAtom(usersErrorAtom);
  const [usersCancel] = useAtom(usersCancelTokenAtom);

  const getUsersData = useCallback(async () => {
    await getUsers();
  }, [getUsers]);

  useEffect(() => {
    getUsersData();
  }, [refreshKey, getUsersData]);

  useCancelToken(usersCancel);

  const loadUserData = (): UseUserReturnDataType => {
    if (userData) {
      return [userData.data, null];
    }
    if (userError) {
      return [null, userError];
    }
    return [null, null];
  };

  return {
    loadUserData,
  };
}

export default useGetUsers;
