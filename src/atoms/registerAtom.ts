import { atom } from "jotai";
import getRegister from "api/register/register";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CancelTokenSource } from "axios";
import { RegisterType } from "api/register/register.type";

export const registerAtom = atom<RegisterType | null>(null);
export const registerErrorAtom = atom<string | null>(null);
export const registerCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const getRegisterAtom = atom(
  (get) => get(registerAtom),
  async (get, set): Promise<boolean> => {
    const cancelToken = createCancelToken();
    set(registerCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await getRegister(cancelToken);
      if (data) {
        set(registerAtom, data);
        return true;
      } else {
        set(registerErrorAtom, error);
        return false;
      }
    } finally {
      set(registerCancelTokenAtom, null);
    }
  }
);

export const removeRegisterAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(registerCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel(getCancelMessage("register"));
  }
  set(registerAtom, null);
  return true;
});
