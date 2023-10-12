import { useCallback, useState } from "react";
import { useAtom } from "jotai";
import useProductEdit from "./product/useProductEdit";
import useProductActions from "hook/useDataTable/product/useProductActions";
import { isDisabledAtom } from "atoms/table/tableAtom";
import { ActionState, tableRowItemId } from "types/Table.type";

type useTableRowActionType<T> = {
  items: T;
  setActionState: React.Dispatch<React.SetStateAction<ActionState>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useTableRowAction<T extends tableRowItemId>({
  items,
  setActionState,
  setRefreshKey,
}: useTableRowActionType<T>) {
  const [, setIsDisabled] = useAtom(isDisabledAtom);

  const [editingValues, setEditingValues] = useState<Partial<T>>({});

  const {handleDeleteProduct} = useProductActions()

  const { handleConfirmEdit } = useProductEdit<T>({
    product: items,
    editingValues,
    setEditingValues,
    setActionState,
    setRefreshKey,
  });

  const handleEditInputChange = (key: keyof T, value: string | number) => {
    if (key === "price" || key === "quantity") {
      value = Number(value);
    }
    setEditingValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleConfirmDelete = useCallback(async () => {
    setIsDisabled(true);
    const success = await handleDeleteProduct(items.id);
    if (success) {
      setActionState({ type: null, id: null });
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [
    items.id,
    setActionState,
    setRefreshKey,
    handleDeleteProduct,
    setIsDisabled,
  ]);

  return {
    editingValues,
    handleConfirmEdit,
    handleConfirmDelete,
    handleEditInputChange,
    setEditingValues
  };
}

export default useTableRowAction;
