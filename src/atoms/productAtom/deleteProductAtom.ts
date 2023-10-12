import { atom } from "jotai";
import deleteProduct from "api/products/deleteProducts";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CancelTokenSource } from "axios";

export const productToDeleteAtom = atom<string | null>(null);
export const deleteProductErrorAtom = atom<string | null>(null);
export const deleteProductCancelTokenAtom = atom<CancelTokenSource | null>(
  null
);

export const deleteProductAtom = atom(
  (get) => get(productToDeleteAtom),
  async (get, set, { id }): Promise<boolean> => {
    const cancelToken = createCancelToken();
    set(deleteProductCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await deleteProduct(id, cancelToken);
      
      if (data) {
        set(productToDeleteAtom, data);
        return true;
      } else {
        set(deleteProductErrorAtom, error);
        return false;
      }
    } finally {
      set(deleteProductCancelTokenAtom, null);
    }
  }
);

export const resetDeleteProductAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(deleteProductCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel(getCancelMessage("deleteProducts"));
  }
  set(productToDeleteAtom, null);
  return true;
});
