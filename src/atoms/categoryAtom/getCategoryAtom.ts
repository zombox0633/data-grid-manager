import { atom } from "jotai";
import axios, { CancelTokenSource } from "axios";

import getCategory from "api/category/getCategory";
import { CategoryType } from "api/category/category.type";

export const categoryAtom = atom<CategoryType | null>(null);
export const categoryErrorAtom = atom<string | null>(null);
export const categoryCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const getCategoryAtom = atom(
  (get) => get(categoryAtom),
  async (get, set): Promise<boolean> => {
    const cancelToken = axios.CancelToken.source();
    set(categoryCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await getCategory(cancelToken);
      if (data) {
        set(categoryAtom, data);
        return true;
      } else {
        set(categoryErrorAtom, error);
        return false;
      }
    } finally {
      set(categoryCancelTokenAtom, null);
    }
  }
);

export const removeRegisterAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(categoryCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel("Request was cancelled due to getCategory reset.");
  }
  set(categoryAtom, null);
  return true;
});
