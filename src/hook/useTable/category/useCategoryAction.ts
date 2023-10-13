import { useCallback } from "react";
import { useAtom } from "jotai";

import useCategory from "hook/useDataTable/category/useCategory";
import { registerAtom } from "atoms/registerAtom";
import { isDisabledAtom } from "atoms/table/tableAtom";
import { ActionState } from "types/Table.type";

type CategoryDataToEditType = {
  id: string;
  name?: string;
};

type useCategoryActionType<T> = {
  category: T;
  editingValues: Partial<T>;
  setEditingValues: React.Dispatch<React.SetStateAction<Partial<T>>>;
  setActionState: React.Dispatch<React.SetStateAction<ActionState>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useCategoryAction<T extends CategoryDataToEditType>({
  category,
  editingValues,
  setEditingValues,
  setActionState,
  setRefreshKey,
}: useCategoryActionType<T>) {
  const [register] = useAtom(registerAtom);
  const [, setIsDisabled] = useAtom(isDisabledAtom);

  const { handleUpdateCategory, handleDeleteCategory } = useCategory();

  const updatedCategory = useCallback(async () => {
    setIsDisabled(true);
    const success = await handleUpdateCategory({
      category_id: category.id,
      categoryName: editingValues.name ?? String(category.name),
      last_op_id: register?.data.id ?? "",
    });

    if (success) {
      setActionState({ type: null, id: null });
      setEditingValues({});
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [
    category,
    editingValues,
    register?.data.id,
    handleUpdateCategory,
    setActionState,
    setEditingValues,
    setRefreshKey,
    setIsDisabled,
  ]);

  const deleteCategory = useCallback(async () => {
    setIsDisabled(true);
    const success = await handleDeleteCategory(
      category.id,
      category.name ?? ""
    );
    if (success) {
      setActionState({ type: null, id: null });
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [
    category,
    setActionState,
    setRefreshKey,
    handleDeleteCategory,
    setIsDisabled,
  ]);

  return { updatedCategory, deleteCategory };
}

export default useCategoryAction;
