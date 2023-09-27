import { atom } from "jotai";
import axios, { CancelTokenSource } from "axios";

import getUsers from "api/user/getUsers";
import { UserType } from "api/user/users.type";

export const usersAtom = atom<UserType | null>(null);
export const usersErrorAtom = atom<string | null>(null);
export const usersCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const getUsersAtom = atom(
  (get) => get(usersAtom),
  async (get, set): Promise<boolean> => {
    const cancelToken = axios.CancelToken.source();
    set(usersCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await getUsers(cancelToken);
      if (data) {
        set(usersAtom, data);
        return true;
      } else {
        set(usersErrorAtom, error);
        return false;
      }
    } finally {
      set(usersCancelTokenAtom, null);
    }
  }
);

export const removeGetUsersAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(usersCancelTokenAtom)
  if(cancelToken){
    cancelToken.cancel("Request was cancelled due to getUsers reset.");
  }
  set(usersAtom, null);
  return true;
});
