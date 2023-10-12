import { atom } from "jotai";
import updateProduct from "api/products/updateProducts";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { ProductsType } from "api/products/products.type";
import { CancelTokenSource } from "axios";

export const productToUpdateAtom = atom<ProductsType | null>(null);
export const updateProductErrorAtom = atom<string | null>(null);
export const updateProductCancelTokenAtom = atom<CancelTokenSource | null>(
  null
);

export const updateProductAtom = atom(
  (get) => get(productToUpdateAtom),
  async (get, set, { id, name, category_id, price, quantity, last_op_id }) => {
    const cancelToken = createCancelToken();
    set(updateProductCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await updateProduct({
        id,
        name,
        category_id,
        price,
        quantity,
        last_op_id,
        cancelToken,
      });
      
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
    cancelToken.cancel(getCancelMessage("updateProducts"));
  }
  set(productToUpdateAtom, null);
  return true;
});
