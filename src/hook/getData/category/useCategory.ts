import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import {
  categoryAtom,
  categoryErrorAtom,
  getCategoryAtom,
} from "atoms/categoryAtom";

import { CategoryType } from "api/category/category.type";

type UseCatalogReturnDataType = [
  categoryData: CategoryType | null,
  categoryData: null | string
];

function useCategory() {
  const [, getCategory] = useAtom(getCategoryAtom);
  const [categoryData] = useAtom(categoryAtom);
  const [categoryError] = useAtom(categoryErrorAtom);

  const getCategoryData = useCallback(async () => {
    await getCategory();
  }, [getCategory]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && !categoryData) {
      getCategoryData();
    }

    return () => {
      isMounted = false;
    };
  }, [categoryData, getCategoryData]);

  function loadCategoryData():UseCatalogReturnDataType {
    if (categoryData) {
      return [categoryData, null];
    }
    if (categoryError) {
      console.warn(categoryError)
      return [null, categoryError];
    }
    return [null, null];
  }

  return {
    loadCategoryData,
  };
}

export default useCategory;
