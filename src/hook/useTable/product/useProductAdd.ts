import { useCallback } from "react";
import { useAtom } from "jotai";
import { registerAtom } from "atoms/registerAtom";
import { isDisabledAtom } from "atoms/table/tableAtom";
import useProduct from "hook/useDataTable/product/useProduct";

import { ProductValuesType } from "src/constraint/PRODUCT_TABLE";

type useProductAdd<T> = {
  newItem: ProductValuesType;
  setNewItem: React.Dispatch<React.SetStateAction<Partial<T>>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useProductAdd<T>({
  newItem,
  setNewItem,
  setRefreshKey,
}: useProductAdd<T>) {
  const [register] = useAtom(registerAtom);
  const [, setIsDisabled] = useAtom(isDisabledAtom);

  const { handleAddProduct } = useProduct();

  const addProduct = useCallback(async () => {
    setIsDisabled(true);

    const success = await handleAddProduct({
      nameProduct: newItem.name ?? "",
      category_id: newItem.category_id ?? "",
      priceProduct: Number(newItem.price) ?? 0,
      quantityProduct: Number(newItem.quantity) ?? 0,
      user_id: register?.data.id ?? "",
    });

    if (success) {
      setNewItem({});
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [
    newItem,
    register?.data.id,
    handleAddProduct,
    setNewItem,
    setRefreshKey,
    setIsDisabled,
  ]);

  return {
    addProduct,
  };
}

export default useProductAdd;
