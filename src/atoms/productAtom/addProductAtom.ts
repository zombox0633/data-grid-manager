import { atom } from "jotai";
import addProduct from "api/products/addProduct";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CancelTokenSource } from "axios";
import { ProductsType } from "api/products/products.type";

export const productToAddAtom = atom<ProductsType | null>(null);
export const addProductErrorAtom = atom<string | null>(null);
export const addProductCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const addProductAtom = atom(
  (get) => get(productToAddAtom),
  async (
    get,
    set,
    { name, category_id, price, quantity, last_op_id }
  ): Promise<boolean> => {
    const cancelToken = createCancelToken();
    set(addProductCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await addProduct({
        name: name,
        category_id: category_id,
        price: price,
        quantity: quantity,
        last_op_id: last_op_id,
        cancelToken: cancelToken,
      });
      
      if (data) {
        set(productToAddAtom, data);
        return true;
      } else {
        set(addProductErrorAtom, error);
        return false;
      }
    } finally {
      set(addProductCancelTokenAtom, null);
    }
  }
);

export const resetAddProductAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(addProductCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel(getCancelMessage("addProducts"));
  }
  set(productToAddAtom, null);
  return true;
});
