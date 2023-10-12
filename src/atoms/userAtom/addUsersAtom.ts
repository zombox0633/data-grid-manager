import { atom } from "jotai";
import addUsers from "api/user/addUsers";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CancelTokenSource } from "axios";
import { UserType } from "api/user/users.type";

export const UsersToAddAtom = atom<UserType | null>(null);
export const addUsersErrorAtom = atom<string | null>(null);
export const addUsersCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const addUsersAtom = atom(
  (get) => get(UsersToAddAtom),
  async (
    get,
    set,
    { email, password, name, role, last_op_id }
  ): Promise<boolean> => {
    const cancelToken = createCancelToken();
    set(addUsersCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await addUsers({
        email,
        password,
        name,
        role,
        last_op_id,
        cancelToken,
      });

      if (data) {
        set(UsersToAddAtom, data);
        return true;
      } else {
        set(addUsersErrorAtom, error);
        return false;
      }
    } finally {
      set(addUsersCancelTokenAtom, null);
    }
  }
);

export const resetAddUsersAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(addUsersCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel(getCancelMessage("addUsers"));
  }
  set(UsersToAddAtom, null);
  return true;
});
