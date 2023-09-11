import { atom } from "jotai";

import deleteProduct from "api/products/deleteProducts";

export const productToDeleteAtom = atom<string | null>(null);
export const deleteProductErrorAtom = atom<string | null>(null);

export const deleteProductAtom = atom(
  (get) => get(productToDeleteAtom),
  async (get, set, { id }): Promise<boolean> => {
    const [data, error] = await deleteProduct(id);

    if (data) {
      set(productToDeleteAtom, data);
      return true;
    } else {
      set(deleteProductErrorAtom, error);
      return false;
    }
  }
);

export const resetDeleteProductAtom = atom(null, (get, set): boolean => {
  set(productToDeleteAtom, null);
  return true;
});
