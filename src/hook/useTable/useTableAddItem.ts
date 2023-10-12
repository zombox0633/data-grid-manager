import { useCallback, useState } from "react";
import useProductAdd from "./product/useProductAdd";

type useTableAddItemType = {
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useTableAddItem<T>({ setRefreshKey }: useTableAddItemType) {
  const [newItem, setNewItem] = useState<Partial<T>>({});

  const { addProduct } = useProductAdd<T>({
    newItem,
    setNewItem,
    setRefreshKey,
  });

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
    handleConfirmToAdd: addProduct,
    handleNewItemInputChange,
    handleResetAdd,
  };
}

export default useTableAddItem;
