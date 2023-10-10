import { useCallback } from "react";
import { useAtom } from "jotai";
import {
  categoryAtom,
  categoryCancelTokenAtom,
  categoryErrorAtom,
  getCategoryAtom,
} from "atoms/categoryAtom/getCategoryAtom";
import useGetData from "../useGetData";
import { CategoryDataType } from "api/category/category.type";

function useGetCategory(refreshKey?: number) {
  const [, getCategory] = useAtom(getCategoryAtom);
  const [categoryData] = useAtom(categoryAtom);
  const [categoryError] = useAtom(categoryErrorAtom);
  const [cancelTokenSource] = useAtom(categoryCancelTokenAtom);

  const getCategoryData = useCallback(async () => {
    await getCategory();
  }, [getCategory]);

  const { loadData } = useGetData<CategoryDataType>({
    itemData: categoryData?.data,
    getDataItem: getCategoryData,
    itemError: categoryError,
    cancelTokenSource,
    refreshKey,
  });

  return {
    loadCategoryData: loadData,
  };
}

export default useGetCategory;
