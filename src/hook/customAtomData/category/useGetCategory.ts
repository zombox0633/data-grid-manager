import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import {
  categoryAtom,
  categoryErrorAtom,
  getCategoryAtom,
} from "atoms/categoryAtom/getCategoryAtom";
import { CategoryType } from "api/category/category.type";

type UseCatalogReturnDataType = [
  categoryData: CategoryType | null,
  categoryError: null | string
];

function useCategory() {
  const [, getCategory] = useAtom(getCategoryAtom);
  const [categoryData] = useAtom(categoryAtom);
  const [categoryError] = useAtom(categoryErrorAtom);

  const getCategoryData = useCallback(async () => {
    await getCategory();
  }, [getCategory]);

  useEffect(() => {
    if (!categoryData) {
      getCategoryData();
    }
  }, [categoryData, getCategoryData]);

  function loadCategoryData(): UseCatalogReturnDataType {
    if (categoryData) {
      return [categoryData, null];
    }
    if (categoryError) {
      console.warn(categoryError);
      return [null, categoryError];
    }
    return [null, null];
  }

  return {
    loadCategoryData,
  };
}

export default useCategory;
