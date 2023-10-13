import { useAtom } from "jotai";
import { showToast } from "style/toast";

import useCancelToken from "hook/useCancelToken";

import {
  addCategoryAtom,
  addCategoryCancelTokenAtom,
  addCategoryErrorAtom,
} from "atoms/categoryAtom/addCategoryAtom";
import {
  updateCategoryAtom,
  updateCategoryCancelTokenAtom,
  updateCategoryErrorAtom,
} from "atoms/categoryAtom/updateCategoryAtom";
import {
  deleteCategoryAtom,
  deleteCategoryCancelTokenAtom,
  deleteCategoryErrorAtom,
} from "atoms/categoryAtom/deleteCategoryAtom";

export type AddCategoryType = {
  categoryName: string;
  last_op_id: string;
};

export type UpdateCategoryType = {
  category_id: string;
  categoryName: string;
  last_op_id: string;
};

function useCategory() {
  const [, addCategory] = useAtom(addCategoryAtom);
  const [addCategoryError] = useAtom(addCategoryErrorAtom);
  const [addCategoryCancel] = useAtom(addCategoryCancelTokenAtom);

  const [, updateCategory] = useAtom(updateCategoryAtom);
  const [updateCategoryError] = useAtom(updateCategoryErrorAtom);
  const [updateCategoryCancel] = useAtom(updateCategoryCancelTokenAtom);

  const [, deleteCategory] = useAtom(deleteCategoryAtom);
  const [deleteCategoryError] = useAtom(deleteCategoryErrorAtom);
  const [deleteCategoryCancel] = useAtom(deleteCategoryCancelTokenAtom);

  useCancelToken(addCategoryCancel);
  useCancelToken(updateCategoryCancel);
  useCancelToken(deleteCategoryCancel);

  const handleAddCategory = async ({
    categoryName,
    last_op_id,
  }: AddCategoryType): Promise<boolean> => {
    const missingFields: string[] = [];
    if (!categoryName) missingFields.push("category name");
    if (!last_op_id) missingFields.push("register");

    if (missingFields.length) {
      showToast("error", `Missing fields: ${missingFields.join(", ")}`);
      return false;
    }

    try {
      const success = await addCategory({ name: categoryName, last_op_id });
      if (success) {
        showToast("success", `${categoryName} added successfully!`);
        return true;
      }
      throw new Error(`Add failed for : ${addCategoryError}`);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleUpdateCategory = async ({
    category_id,
    categoryName,
    last_op_id,
  }: UpdateCategoryType): Promise<boolean> => {
    const missingFields: string[] = [];
    if (!category_id) missingFields.push("category id");
    if (!categoryName) missingFields.push("category name");
    if (!last_op_id) missingFields.push("register");

    if (missingFields.length) {
      showToast("error", `Missing fields: ${missingFields.join(", ")}`);
      return false;
    }

    try {
      const success = await updateCategory({
        id: category_id,
        name: categoryName,
        last_op_id,
      });
      if (success) {
        showToast("success", `${categoryName} updated successfully!`);
        return true;
      }
      throw new Error(`Update failed for : ${updateCategoryError}`);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleDeleteCategory = async (
    category_id: string,
    categoryName: string
  ): Promise<boolean> => {
    const missingFields: string[] = [];
    if (!category_id) missingFields.push("category id");
    if (!categoryName) missingFields.push("category name");

    if (missingFields.length) {
      showToast("error", `Missing fields: ${missingFields.join(", ")}`);
      return false;
    }

    try {
      const success = await deleteCategory({ id: category_id });
      if (success) {
        showToast("success", `${categoryName} deleted successfully!`);
        return true;
      }
      throw new Error(`Delete failed for : ${deleteCategoryError}`);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  };
}

export default useCategory;
