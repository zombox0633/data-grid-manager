import { useCallback, useState } from "react";
import { useAtom } from "jotai";
import useProductEdit from "./product/useProductEdit";
import { registerAtom } from "atoms/registerAtom";

import { tableRowItemId } from "types/Table.type";

type useTableRowActionType<T> = {
  items: T;
  handleUpdateItem: (data: any) => Promise<boolean>;
  handleDeleteItem: (itemId: string) => Promise<boolean>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useTableRowAction<T extends tableRowItemId>({
  items,
  handleUpdateItem,
  handleDeleteItem,
  setRefreshKey,
}: useTableRowActionType<T>) {
  const [register] = useAtom(registerAtom);

  const [tableRowId, setTableRowId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<Partial<T>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { handleConfirmEdit } = useProductEdit<T>({
    product: items,
    register,
    editingValues,
    setEditingValues,
    setTableRowId,
    setRefreshKey,
    setIsDisabled,
    handleUpdateItem,
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

  const handleEditClick = useCallback(() => {
    setTableRowId(items.id);
  }, [items.id, setTableRowId]);

  const handleDeleteClick = useCallback(() => {
    setDeleteId(items.id);
  }, [items.id, setDeleteId]);

  const handleCancelEdit = useCallback(() => {
    setTableRowId(null);
    setEditingValues({});
  }, [setTableRowId, setEditingValues]);

  const handleConfirmDelete = useCallback(async () => {
    setIsDisabled(true);
    const success = await handleDeleteItem(items.id);
    if (success) {
      setDeleteId(null);
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [items.id, setDeleteId, setRefreshKey, handleDeleteItem]);

  const handleCancelDelete = useCallback(() => {
    setDeleteId(null);
  }, [setDeleteId]);

  return {
    tableRowId,
    editingValues,
    setEditingValues,
    deleteId,
    setDeleteId,
    isDisabled,
    handleEditClick,
    handleConfirmEdit,
    handleCancelEdit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handleEditInputChange,
  };
}

export default useTableRowAction;
