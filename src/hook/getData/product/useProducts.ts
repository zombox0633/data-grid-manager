import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import {
  productsAtom,
  productsErrorAtom,
  getProductsAtom,
} from "atoms/productsAtom";

import { ProductsType } from "api/products/products.type";

type UseProductsReturnDataType = [
  productsData: ProductsType | null,
  productsData: null | string
];

function useProducts() {
  const [, getProducts] = useAtom(getProductsAtom);
  const [productsData] = useAtom(productsAtom);
  const [productsError] = useAtom(productsErrorAtom);

  const getProductsData = useCallback(async () => {
    await getProducts();
  }, [getProducts]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && !productsData) {
      getProductsData();
    }

    return () => {
      isMounted = false;
    };
  }, [productsData, getProductsData]);

  function loadProductsData(): UseProductsReturnDataType {
    if (productsData) {
      return [productsData, null];
    }
    if (productsError) {
      console.warn(productsError);
      return [null, productsError];
    }
    return [null, null];
  }

  return {
    loadProductsData,
  };
}

export default useProducts;
