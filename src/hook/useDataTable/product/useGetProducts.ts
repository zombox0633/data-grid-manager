import { useCallback } from "react";
import { useAtom } from "jotai";
import useGetData from "../useGetData";
import {
  productsAtom,
  productsErrorAtom,
  getProductsAtom,
  getProductsCancelTokenAtom,
} from "atoms/productAtom/getProductsAtom";

import { ProductsDataType } from "api/products/products.type";

function useGetProducts(refreshKey?: number) {
  const [, getProducts] = useAtom(getProductsAtom);
  const [productsData] = useAtom(productsAtom);
  const [productsError] = useAtom(productsErrorAtom);
  const [cancelTokenSource] = useAtom(getProductsCancelTokenAtom);

  const getProductDataItem = useCallback(async () => {
    await getProducts();
  }, [getProducts]);

  const { loadData } = useGetData<ProductsDataType>({
    itemData: productsData?.data,
    getDataItem: getProductDataItem,
    itemError: productsError,
    cancelTokenSource,
    refreshKey,
  });

  return {
    loadProductsData: loadData,
  };
}

export default useGetProducts;
