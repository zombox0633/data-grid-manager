import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import {
  getUsersAtom,
  usersAtom,
  usersCancelTokenAtom,
  usersErrorAtom,
} from "atoms/userAtom/getUsersAtom";
import { UserType } from "api/user/users.type";
import useCancelToken from "hook/useCancelToken";

type UseUserReturnDataType = [
  userData: UserType | null,
  userError: null | string
];

function useGetUsers() {
  const [, getUsers] = useAtom(getUsersAtom);
  const [userData] = useAtom(usersAtom);
  const [userError] = useAtom(usersErrorAtom);
  const [usersCancel] = useAtom(usersCancelTokenAtom);

  const getUsersData = useCallback(async () => {
    await getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (!userData) {
      getUsersData();
    }
  }, [userData, getUsersData]);

  useCancelToken(usersCancel);

  const loadUserData = (): UseUserReturnDataType => {
    if (userData) {
      return [userData, null];
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
