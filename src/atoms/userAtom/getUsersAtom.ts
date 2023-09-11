import { atom } from "jotai";

import getUsers from "api/user/getUsers";
import { UserType } from "api/user/users.type";

export const usersAtom = atom<UserType | null>(null);
export const usersErrorAtom = atom<string | null>(null);

export const getUsersAtom = atom(
  (get) => get(usersAtom),
  async (get, set): Promise<boolean> => {
    const [data, error] = await getUsers();
    if (data) {
      set(usersAtom, data);
      return true;
    } else {
      set(usersErrorAtom, error);
      return false;
    }
  }
);

export const removeGetUsersAtom = atom(null, (get, set): boolean => {
  set(usersAtom, null);
  return true;
});
