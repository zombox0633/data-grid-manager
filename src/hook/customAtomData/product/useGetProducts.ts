import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import {
  productsAtom,
  productsErrorAtom,
  getProductsAtom,
} from "atoms/productAtom/getProductsAtom";

import { ProductsType } from "api/products/products.type";

type UseGetProductsReturnDataType = [
  productsData: ProductsType | null,
  productsError: null | string
];

function useGetProducts() {
  const [, getProducts] = useAtom(getProductsAtom);
  const [productsData] = useAtom(productsAtom);
  const [productsError] = useAtom(productsErrorAtom);

  const getProductsData = useCallback(async () => {
    await getProducts();
  }, [getProducts]);

  useEffect(() => {
    if (!productsData) {
      getProductsData();
    }
  }, [productsData, getProductsData]);

  function loadProductsData(): UseGetProductsReturnDataType {
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

export default useGetProducts;
