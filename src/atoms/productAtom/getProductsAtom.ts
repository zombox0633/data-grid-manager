import { atom } from "jotai";
import getProducts from "api/products/getProducts";
import { createCancelToken, getCancelMessage } from "helpers/utils";

import { CancelTokenSource } from "axios";
import { ProductsType } from "api/products/products.type";

export const productsAtom = atom<ProductsType | null>(null);
export const productsErrorAtom = atom<string | null>(null);
export const getProductsCancelTokenAtom = atom<CancelTokenSource | null>(null);

export const getProductsAtom = atom(
  (get) => get(productsAtom),
  async (get, set): Promise<boolean> => {
    const cancelToken = createCancelToken();
    set(getProductsCancelTokenAtom, cancelToken);

    try {
      const [data, error] = await getProducts(cancelToken);
      if (data) {
        set(productsAtom, data);
        return true;
      } else {
        set(productsErrorAtom, error);
        return false;
      }
    } finally {
      set(getProductsCancelTokenAtom, null);
    }
  }
);

export const removeProductsAtom = atom(null, (get, set): boolean => {
  const cancelToken = get(getProductsCancelTokenAtom);
  if (cancelToken) {
    cancelToken.cancel(getCancelMessage("getProducts"));
  }
  set(productsAtom, null);
  return true;
});

//axios.CancelToken.source().cancel("ข้อความอะไรก็ได้") เป็นฟังก์ชันที่ใช้ยกเลิก request ที่กำลังทำงานอยู่ ทำงานพร้อมกับ token
