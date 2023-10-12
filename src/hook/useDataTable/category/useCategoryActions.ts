import { useAtom } from "jotai";
import { showToast } from "style/toast";

import useCancelToken from "hook/useCancelToken";
import useErrorHandlerApi from "hook/useErrorHandlerApi";

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

function useCategoryActions() {
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

  useErrorHandlerApi(addCategoryError);
  useErrorHandlerApi(updateCategoryError);
  useErrorHandlerApi(deleteCategoryError);

  const handleAddCategory = async ({
    categoryName,
    last_op_id,
  }: AddCategoryType): Promise<boolean> => {
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
    category_id: string
  ): Promise<boolean> => {
    try {
      const success = await deleteCategory({ id: category_id });
      if (success) {
        showToast("success", `${category_id} deleted successfully!`);
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

export default useCategoryActions;
