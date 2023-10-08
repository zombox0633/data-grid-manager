import { useCallback } from "react";

import { RegisterType } from "api/register/register.type";
import { UpdateProductType } from "hook/useDataTable/product/useProductActions";

type ProductDataToEditType = {
  id: string;
  name?: string;
  category_id?: string;
  price?: number;
  quantity?: number;
};

type useProductEditType<T> = {
  product: T;
  register: RegisterType | null;
  editingValues: Partial<T>;
  setEditingValues: React.Dispatch<React.SetStateAction<Partial<T>>>;
  setTableRowId: React.Dispatch<React.SetStateAction<string | null>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateItem: (data: UpdateProductType) => Promise<boolean>;
};

function useProductEdit<T extends ProductDataToEditType>({
  product,
  register,
  editingValues,
  setEditingValues,
  setTableRowId,
  setRefreshKey,
  setIsDisabled,
  handleUpdateItem,
}: useProductEditType<T>) {
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
      setTableRowId(null);
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
    setTableRowId,
    setEditingValues,
    setRefreshKey,
    setIsDisabled,
  ]);

  return { handleConfirmEdit };
}

export default useProductEdit;
