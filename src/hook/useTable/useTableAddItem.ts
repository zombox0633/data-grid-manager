import { useCallback, useState } from "react";
import useProductAdd from "./product/useProductAdd";
import useCategoryAdd from "./category/useCategoryAdd";
import useUserAdd from "./user/useUserAdd";
import { TableType } from "types/Table.type";

type useTableAddItemType = {
  tableType: TableType;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useTableAddItem<T>({ tableType, setRefreshKey }: useTableAddItemType) {
  const [newItem, setNewItem] = useState<Partial<T>>({});

  const { addProduct } = useProductAdd<T>({
    newItem,
    setNewItem,
    setRefreshKey,
  });
  const { addCategory } = useCategoryAdd<T>({
    newItem,
    setNewItem,
    setRefreshKey,
  });
  const { addUser } = useUserAdd<T>({ newItem, setNewItem, setRefreshKey });

  let handleConfirmToAdd: () => Promise<void> = async () => {};
  switch (tableType) {
    case "Product":
      handleConfirmToAdd = addProduct;
      break;
    case "Category":
      handleConfirmToAdd = addCategory;
      break;
    case "User":
      handleConfirmToAdd = addUser;
      break;
    default:
      break;
  }

  const handleNewItemInputChange = (key: keyof T, value: string) => {
    setNewItem((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleResetAdd = useCallback(() => {
    setNewItem({});
  }, [setNewItem]);

  return {
    newItem,
    handleConfirmToAdd,
    handleNewItemInputChange,
    handleResetAdd,
  };
}

export default useTableAddItem;
