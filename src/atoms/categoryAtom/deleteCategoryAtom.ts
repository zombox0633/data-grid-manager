import { atom } from "jotai";
import deleteCategory from "api/category/deleteCategory";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CancelTokenSource } from "axios";

export const categoryToDeleteAtom = atom<string | null>(null);
export const deleteCategoryErrorAtom = atom<string | null>(null);
export const deleteCategoryCancelTokenAtom = atom<CancelTokenSource | null>(
  null
);

export const deleteCategoryAtom = atom(
  (get) => get(categoryToDeleteAtom),
  async (get, set, { id }): Promise<boolean> => {
    const cancelToken = createCancelToken();
    set(deleteCategoryCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await deleteCategory(id, cancelToken);
      if (data) {
        set(categoryToDeleteAtom, data);
        return true;
      } else {
        set(deleteCategoryErrorAtom, error);
        return false;
      }
    } finally {
      set(deleteCategoryCancelTokenAtom, null);
    }
  }
);

export const resetDeleteCategoryAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(deleteCategoryCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel(getCancelMessage("deleteCategory"));
  }
  set(categoryToDeleteAtom, null);
  return true;
});
