import { atom } from "jotai";
import getCategory from "api/category/getCategory";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CategoryType } from "api/category/category.type";
import { CancelTokenSource } from "axios";

export const categoryAtom = atom<CategoryType | null>(null);
export const categoryErrorAtom = atom<string | null>(null);
export const categoryCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const getCategoryAtom = atom(
  (get) => get(categoryAtom),
  async (get, set): Promise<boolean> => {
    const cancelToken = createCancelToken();
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
    cancelToken.cancel(getCancelMessage("getCategory"));
  }
  set(categoryAtom, null);
  return true;
});
