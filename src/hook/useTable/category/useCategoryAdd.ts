import { useCallback } from "react";
import { useAtom } from "jotai";

import useCategoryActions from "hook/useDataTable/category/useCategoryActions";
import { registerAtom } from "atoms/registerAtom";
import { isDisabledAtom } from "atoms/table/tableAtom";
import { CategoryValuesType } from "src/constraint/CATEGORY_TABLE";

type useCategoryAddType<T> = {
  newItem: CategoryValuesType;
  setNewItem: React.Dispatch<React.SetStateAction<Partial<T>>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useCategoryAdd<T>({
  newItem,
  setNewItem,
  setRefreshKey,
}: useCategoryAddType<T>) {
  const [register] = useAtom(registerAtom);
  const [, setIsDisabled] = useAtom(isDisabledAtom);

  const { handleAddCategory } = useCategoryActions();

  const addCategory = useCallback(async () => {
    setIsDisabled(true);

    const success = await handleAddCategory({
      categoryName: newItem.name ?? "",
      last_op_id: register?.data.id ?? "",
    });

    if (success) {
      setNewItem({});
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [
    newItem.name,
    register?.data.id,
    handleAddCategory,
    setNewItem,
    setIsDisabled,
    setRefreshKey,
  ]);

  return {
    addCategory,
  };
}

export default useCategoryAdd;
