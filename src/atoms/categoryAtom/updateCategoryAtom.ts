import { atom } from "jotai";
import updateCategory from "api/category/updateCategory";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CancelTokenSource } from "axios";
import { CategoryType } from "api/category/category.type";

export const categoryToUpdateAtom = atom<CategoryType | null>(null);
export const updateCategoryErrorAtom = atom<string | null>(null);
export const updateCategoryCancelTokenAtom = atom<CancelTokenSource | null>(
  null
);

export const updateCategoryAtom = atom(
  (get) => get(categoryToUpdateAtom),
  async (get, set, { id, name, last_op_id }): Promise<boolean> => {
    const cancelToken = createCancelToken();
    set(updateCategoryCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await updateCategory({
        id,
        name,
        last_op_id,
        cancelToken,
      });
      if (data) {
        set(categoryToUpdateAtom, data);
        return true;
      } else {
        set(updateCategoryErrorAtom, error);
        return false;
      }
    } finally {
      set(updateCategoryCancelTokenAtom, null);
    }
  }
);

export const resetUpdateCategoryAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(updateCategoryCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel(getCancelMessage("updateCategory"));
  }
  set(categoryToUpdateAtom, null);
  return true;
});
