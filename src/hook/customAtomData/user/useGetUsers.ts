import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import {
  getUsersAtom,
  usersAtom,
  usersErrorAtom,
} from "atoms/userAtom/getUsersAtom";
import { UserType } from "api/user/users.type";

type UseUserReturnDataType = [
  userData: UserType | null,
  userError: null | string
];

function useGetUsers() {
  const [, getUsers] = useAtom(getUsersAtom);
  const [userData] = useAtom(usersAtom);
  const [userError] = useAtom(usersErrorAtom);

  const getUsersData = useCallback(async () => {
    await getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (!userData) {
      getUsersData();
    }
  }, [userData, getUsersData]);

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
