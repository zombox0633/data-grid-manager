import { atom } from "jotai";
import axios, { CancelTokenSource } from "axios";

import updateProduct from "api/products/updateProducts";
import { ProductsType } from "api/products/products.type";

export const productToUpdateAtom = atom<ProductsType | null>(null);
export const updateProductErrorAtom = atom<string | null>(null);
export const updateProductCancelTokenAtom = atom<CancelTokenSource | null>(
  null
);

export const updateProductAtom = atom(
  (get) => get(productToUpdateAtom),
  async (get, set, { id, name, category_id, price, quantity, last_op_id }) => {
    const cancelToken = axios.CancelToken.source();
    set(updateProductCancelTokenAtom, cancelToken);

    const [data, error] = await updateProduct({
      id,
      name,
      category_id,
      price,
      quantity,
      last_op_id,
      cancelToken,
    });

    try {
      if (data) {
        set(productToUpdateAtom, data);
        return true;
      } else {
        set(updateProductErrorAtom, error);
        return false;
      }
    } finally {
      set(updateProductCancelTokenAtom, null);
    }
  }
);

export const resetUpdateProductAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(updateProductCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel("Request was cancelled due to updateProducts reset.");
  }
  set(productToUpdateAtom, null);
  return true;
});
