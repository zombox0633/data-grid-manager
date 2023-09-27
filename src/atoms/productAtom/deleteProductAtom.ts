import { atom } from "jotai";
import axios, { CancelTokenSource } from "axios";

import deleteProduct from "api/products/deleteProducts";

export const productToDeleteAtom = atom<string | null>(null);
export const deleteProductErrorAtom = atom<string | null>(null);
export const deleteProductCancelTokenAtom = atom<CancelTokenSource | null>(
  null
);

export const deleteProductAtom = atom(
  (get) => get(productToDeleteAtom),
  async (get, set, { id }): Promise<boolean> => {
    const cancelToken = axios.CancelToken.source();
    set(deleteProductCancelTokenAtom, cancelToken);
    const [data, error] = await deleteProduct(id, cancelToken);

    try {
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
    cancelToken.cancel("Request was cancelled due to deleteProducts reset.");
  }
  set(productToDeleteAtom, null);
  return true;
});
