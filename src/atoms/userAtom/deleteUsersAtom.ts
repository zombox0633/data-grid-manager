import { atom } from "jotai";
import deleteUsers from "api/user/deleteUsers";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CancelTokenSource } from "axios";

export const usersToDeleteAtom = atom<string | null>(null);
export const deleteUsersErrorAtom = atom<string | null>(null);
export const deleteUsersCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const deleteUsersAtom = atom(
  (get) => get(usersToDeleteAtom),
  async (get, set, { id }): Promise<boolean> => {
    const cancelToken = createCancelToken();
    set(deleteUsersCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await deleteUsers(id, cancelToken);
      if (data) {
        set(usersToDeleteAtom, data);
        return true;
      } else {
        set(deleteUsersErrorAtom, error);
        return false;
      }
    } finally {
      set(deleteUsersCancelTokenAtom, null);
    }
  }
);

export const resetDeleteUsersAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(deleteUsersCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel(getCancelMessage("deleteUsers"));
  }
  set(usersToDeleteAtom, null);
  return true;
});
