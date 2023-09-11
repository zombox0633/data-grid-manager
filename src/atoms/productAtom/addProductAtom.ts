import { atom } from "jotai";

import addProduct from "api/products/addProduct";
import { ProductsType } from "api/products/products.type";

export const productToAddAtom = atom<ProductsType | null>(null);
export const addProductErrorAtom = atom<string | null>(null);

export const addProductAtom = atom(
  (get) => get(productToAddAtom ),
  async (
    get,
    set,
    { name, category_id, price, quantity, last_op_id }
  ): Promise<boolean> => {
    const [data, error] = await addProduct({
      name: name,
      category_id: category_id,
      price: price,
      quantity: quantity,
      last_op_id: last_op_id,
    });

    if (data) {
      set(productToAddAtom , data);
      return true;
    } else {
      set(addProductErrorAtom, error);
      return false;
    }
  }
);

export const resetAddProductAtom = atom(null, (get, set): boolean => {
  set(productToAddAtom , null);
  return true;
});
