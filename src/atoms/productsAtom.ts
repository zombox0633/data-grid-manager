import { atom } from "jotai";

import getProducts from "api/products/products";
import { ProductsType } from "api/products/products.type";

export const productsAtom = atom<ProductsType | null>(null);
export const productsErrorAtom = atom<string | null>(null);

export const getProductsAtom = atom(
  (get) => get(productsAtom),
  async (get, set): Promise<boolean> => {
    const [data, error] = await getProducts();
    if (data) {
      set(productsAtom, data);
      return true;
    } else {
      set(productsErrorAtom, error);
      return false;
    }
  }
);

export const removeRegisterAtom = atom(null, (get, set): boolean => {
  set(productsAtom, null);
  return true;
});