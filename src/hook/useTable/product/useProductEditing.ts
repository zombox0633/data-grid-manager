import { useCallback, useState } from "react";

import { ProductValuesType } from "components/table/product/ProductsTable";
import { ProductsDataType } from "api/products/products.type";
import { RegisterType } from "api/register/register.type";
import { UpdateProductType } from "hook/customAtomData/product/useProductActions";

type useProductEditingType = {
  product: ProductsDataType;
  register: RegisterType | null
  handleUpdateProduct: (productData: UpdateProductType) => Promise<boolean>;
  handleDeleteProduct: (product_id: string) => Promise<boolean>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

function useProductEditing({product, handleUpdateProduct, handleDeleteProduct, register, setRefreshKey}:useProductEditingType) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<ProductValuesType>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleEditClick = useCallback(() => {
    setEditingId(product.id);
  }, [product.id, setEditingId]);

  const handleDeleteClick = useCallback(() => {
    setDeleteId(product.id);
  }, [product.id, setDeleteId]);

  const handleConfirmEdit = useCallback(async () => {
    setIsDisabled(true);
    const success = await handleUpdateProduct({
      product_id: product.id,
      nameProduct: editingValues.name,
      category_id: editingValues.category_id,
      priceProduct: Number(editingValues.price),
      quantityProduct: Number(editingValues.quantity),
      user_id: register?.data.id ?? "",
    });

    if (success) {
      setEditingId(null);
      setEditingValues({});
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [
    product.id,
    editingValues,
    handleUpdateProduct,
    setRefreshKey,
    setEditingId,
    setEditingValues,
    register?.data.id,
  ]);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingValues({});
  }, [setEditingId, setEditingValues]);

  const handleConfirmDelete = useCallback(async () => {
    setIsDisabled(true);
    const success = await handleDeleteProduct(product.id);
    if (success) {
      setDeleteId(null);
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [product.id, setDeleteId, setRefreshKey, handleDeleteProduct]);

  const handleCancelDelete = useCallback(() => {
    setDeleteId(null);
  }, [setDeleteId]);

  const handleEditInputChange = (
    key: keyof ProductsDataType,
    value: string
  ) => {
    setEditingValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return {
    editingId,
    setEditingId,
    editingValues,
    setEditingValues,
    deleteId,
    setDeleteId,
    isDisabled,
    handleEditClick,
    handleDeleteClick,
    handleConfirmEdit,
    handleCancelEdit,
    handleConfirmDelete,
    handleCancelDelete,
    handleEditInputChange,
  };
}

export default useProductEditing;
