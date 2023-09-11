import { atom } from "jotai";

import updateProduct from "api/products/updateProducts";
import { ProductsType } from "api/products/products.type";

export const productToUpdateAtom = atom<ProductsType | null>(null);
export const updateProductErrorAtom = atom<string | null>(null);

export const updateProductAtom = atom(
  (get) => get(productToUpdateAtom),
  async (get, set, { id, name, category_id, price, quantity, last_op_id }) => {
    const [data, error] = await updateProduct({
      id,
      name,
      category_id,
      price,
      quantity,
      last_op_id,
    });
    if (data) {
      set(productToUpdateAtom, data);
      return true;
    } else {
      set(updateProductErrorAtom, error);
      return false;
    }
  }
);

export const resetUpdateProductAtom = atom(null, (get, set): boolean => {
  set(productToUpdateAtom , null);
  return true;
});