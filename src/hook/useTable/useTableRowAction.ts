import { useState } from "react";
import useProductAction from "./product/useProductAction";
import useCategoryAction from "./category/useCategoryAction";
import useUserAction from "./user/useUserAction";
import { ActionState, TableType, tableRowItemId } from "types/Table.type";

type useTableRowActionType<T> = {
  tableType: TableType;
  items: T;
  setActionState: React.Dispatch<React.SetStateAction<ActionState>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useTableRowAction<T extends tableRowItemId>({
  tableType,
  items,
  setActionState,
  setRefreshKey,
}: useTableRowActionType<T>) {
  const [editingValues, setEditingValues] = useState<Partial<T>>({});

  const { updatedProduct, deleteProduct } = useProductAction<T>({
    product: items,
    editingValues,
    setEditingValues,
    setActionState,
    setRefreshKey,
  });
  const { updatedCategory, deleteCategory } = useCategoryAction<T>({
    category: items,
    editingValues,
    setEditingValues,
    setActionState,
    setRefreshKey,
  });
  const { updatedUser, deleteUser } = useUserAction<T>({
    user: items,
    editingValues,
    setEditingValues,
    setActionState,
    setRefreshKey,
  });

  let handleConfirmEdit: () => Promise<void> = async () => {};
  let handleConfirmDelete: () => Promise<void> = async () => {};
  switch (tableType) {
    case "Product":
      handleConfirmEdit = updatedProduct;
      handleConfirmDelete = deleteProduct;
      break;
    case "Category":
      handleConfirmEdit = updatedCategory;
      handleConfirmDelete = deleteCategory;
      break;
    case "User":
      handleConfirmEdit = updatedUser;
      handleConfirmDelete = deleteUser;
      break;
    default:
      break;
  }

  const handleEditInputChange = (key: keyof T, value: string | number) => {
    if (key === "price" || key === "quantity") {
      value = Number(value);
    }
    setEditingValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return {
    editingValues,
    handleConfirmEdit,
    handleConfirmDelete,
    handleEditInputChange,
    setEditingValues,
  };
}

export default useTableRowAction;
