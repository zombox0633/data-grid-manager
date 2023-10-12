import { useCallback } from "react";
import { useAtom } from "jotai";

import useCategoryActions from "hook/useDataTable/category/useCategoryActions";
import { registerAtom } from "atoms/registerAtom";
import { isDisabledAtom } from "atoms/table/tableAtom";
import { ActionState } from "types/Table.type";

type CategoryDataToEditType = {
  id: string;
  name?: string;
};

type useCategoryEditType<T> = {
  category: T;
  editingValues: Partial<T>;
  setEditingValues: React.Dispatch<React.SetStateAction<Partial<T>>>;
  setActionState: React.Dispatch<React.SetStateAction<ActionState>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useCategoryEdit<T extends CategoryDataToEditType>({
  category,
  editingValues,
  setEditingValues,
  setActionState,
  setRefreshKey,
}: useCategoryEditType<T>) {
  const [register] = useAtom(registerAtom);
  const [, setIsDisabled] = useAtom(isDisabledAtom);

  const { handleUpdateCategory } = useCategoryActions();

  const handleConfirmEdit = useCallback(async () => {
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

  return { handleConfirmEdit };
}

export default useCategoryEdit;
