import { atom } from "jotai";

import getRegister from "api/register/register";
import { RegisterType } from "api/register/register.type";

export const registerAtom = atom<RegisterType | null>(null);
export const registerErrorAtom = atom<string | null>(null);

export const getRegisterAtom = atom(
  (get) => get(registerAtom),
  async (get, set): Promise<boolean> => {
    const [data, error] = await getRegister();
    if (data) {
      set(registerAtom, data);
      return true;
    } else {
      set(registerErrorAtom, error);
      return false;
    }
  }
);

export const removeRegisterAtom = atom(null, (get, set): boolean => {
  set(registerAtom, null);
  return true;
});
