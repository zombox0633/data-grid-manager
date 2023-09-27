import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import {
  productsAtom,
  productsErrorAtom,
  getProductsAtom,
  getProductsCancelTokenAtom,
} from "atoms/productAtom/getProductsAtom";
import useCancelToken from "hook/useCancelToken";

import { ProductsType } from "api/products/products.type";

type UseGetProductsReturnDataType = [
  productsData: ProductsType | null,
  productsError: null | string
];

function useGetProducts(refreshKey?: number) {
  const [, getProducts] = useAtom(getProductsAtom);
  const [productsData] = useAtom(productsAtom);
  const [productsError] = useAtom(productsErrorAtom);
  const [cancelTokenSource] = useAtom(getProductsCancelTokenAtom);

  const getProductsData = useCallback(async () => {
    await getProducts();
  }, [getProducts]);

  useEffect(() => {
    getProductsData();
  }, [refreshKey, getProductsData]);

  useCancelToken(cancelTokenSource);

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
