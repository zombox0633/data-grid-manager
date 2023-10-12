import { atom } from "jotai";
import updateUsers from "api/user/updateUsers";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CancelTokenSource } from "axios";
import { UserType } from "api/user/users.type";

export const usersToUpdateAtom = atom<UserType | null>(null);
export const updateUsersErrorAtom = atom<string | null>(null);
export const updateUsersCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const updateUsersAtom = atom(
  (get) => get(usersToUpdateAtom),
  async (get, set, { id, name, role, last_op_id }): Promise<boolean> => {
    const cancelToken = createCancelToken();
    set(updateUsersCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await updateUsers({
        id,
        name,
        role,
        last_op_id,
        cancelToken,
      });
      if (data) {
        set(usersToUpdateAtom, data);
        return true;
      } else {
        set(updateUsersErrorAtom, error);
        return false;
      }
    } finally {
      set(updateUsersCancelTokenAtom, null);
    }
  }
);

export const resetUpdateUsersAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(updateUsersCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel(getCancelMessage("updateUsers"));
  }
  set(usersToUpdateAtom, null);
  return true;
});
