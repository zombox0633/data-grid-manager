import { atom } from "jotai";

import getCategory from "api/category/getCategory";
import { CategoryType } from "api/category/category.type";

export const categoryAtom = atom<CategoryType | null>(null);
export const categoryErrorAtom = atom<string | null>(null);

export const getCategoryAtom = atom(
  (get) => get(categoryAtom),
  async (get, set): Promise<boolean> => {
    const [data, error] = await getCategory();
    if (data) {
      set(categoryAtom, data);
      return true;
    } else {
      set(categoryErrorAtom, error);
      return false;
    }
  }
);

export const removeRegisterAtom = atom(null, (get, set): boolean => {
  set(categoryAtom, null);
  return true;
});