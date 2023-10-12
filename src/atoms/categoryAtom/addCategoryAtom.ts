import { atom } from "jotai";
import addCategory from "api/category/addCategory";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CategoryType } from "api/category/category.type";
import { CancelTokenSource } from "axios";

export const categoryToAddAtom = atom<CategoryType | null>(null);
export const addCategoryErrorAtom = atom<string | null>(null);
export const addCategoryCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const addCategoryAtom = atom(
  (get) => get(categoryToAddAtom),
  async (get, set, { name, last_op_id }): Promise<boolean> => {
    const cancelToken = createCancelToken();
    set(addCategoryCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await addCategory({
        name,
        last_op_id,
        cancelToken,
      });

      if (data) {
        set(categoryToAddAtom, data);
        return true;
      } else {
        set(addCategoryErrorAtom, error);
        return false;
      }
    } finally {
      set(addCategoryCancelTokenAtom, null);
    }
  }
);

export const resetAddCategoryAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(addCategoryCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel(getCancelMessage("addCategory"));
  }
  set(categoryToAddAtom, null);
  return true;
});
