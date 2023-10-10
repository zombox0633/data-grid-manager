import { useCallback } from "react";
import { useAtom } from "jotai";
import { registerAtom } from "atoms/registerAtom";
import { isDisabledAtom } from "atoms/table/tableAtom";
import { UpdateProductType } from "hook/useDataTable/product/useProductActions";
import { ActionState } from "types/Table.type";

type ProductDataToEditType = {
  id: string;
  name?: string;
  category_id?: string;
  price?: number;
  quantity?: number;
};

type useProductEditType<T> = {
  product: T;
  editingValues: Partial<T>;
  setEditingValues: React.Dispatch<React.SetStateAction<Partial<T>>>;
  setActionState: React.Dispatch<React.SetStateAction<ActionState>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  handleUpdateItem: (data: UpdateProductType) => Promise<boolean>;
};

function useProductEdit<T extends ProductDataToEditType>({
  product,
  editingValues,
  setEditingValues,
  setActionState,
  setRefreshKey,
  handleUpdateItem,
}: useProductEditType<T>) {
  const [register] = useAtom(registerAtom);
  const [, setIsDisabled] = useAtom(isDisabledAtom);

  const handleConfirmEdit = useCallback(async () => {
    setIsDisabled(true);
    const success = await handleUpdateItem({
      product_id: product.id,
      nameProduct: editingValues.name ?? product.name,
      category_id: editingValues.category_id,
      priceProduct: editingValues.price,
      quantityProduct: editingValues.quantity,
      user_id: register?.data.id ?? "",
    });

    if (success) {
      setActionState({ type: null, id: null });
      setEditingValues({});
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [
    product.id,
    editingValues.name,
    product.name,
    editingValues.category_id,
    editingValues.price,
    editingValues.quantity,
    register?.data.id,
    handleUpdateItem,
    setActionState,
    setEditingValues,
    setRefreshKey,
    setIsDisabled,
  ]);

  return { handleConfirmEdit };
}

export default useProductEdit;
