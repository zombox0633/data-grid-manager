import { atom } from "jotai";
import axios, { CancelTokenSource } from "axios";

import getRegister from "api/register/register";
import { RegisterType } from "api/register/register.type";

export const registerAtom = atom<RegisterType | null>(null);
export const registerErrorAtom = atom<string | null>(null);
export const registerCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const getRegisterAtom = atom(
  (get) => get(registerAtom),
  async (get, set): Promise<boolean> => {
    const cancelToken = axios.CancelToken.source();
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
    cancelToken.cancel("Request was cancelled due to register reset.");
  }
  set(registerAtom, null);
  return true;
});
