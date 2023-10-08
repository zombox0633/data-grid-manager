import { useCallback, useState } from "react";

import { AddProductType } from "hook/useDataTable/product/useProductActions";
import { ProductsDataType } from "api/products/products.type";
import { RegisterType } from "api/register/register.type";
import { ProductValuesType } from "src/constraint/PRODUCT_TABLE";

type useProductAdd = {
  register: RegisterType | null;
  handleAddProduct: (productData: AddProductType) => Promise<boolean>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useProductAdd({
  register,
  handleAddProduct,
  setRefreshKey,
}: useProductAdd) {
  const [newProduct, setNewProduct] = useState<ProductValuesType>({});
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleNewProductInputChange = (
    key: keyof ProductsDataType,
    value: string
  ) => {
    setNewProduct((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleAdd = useCallback(async () => {
    setIsDisabled(true);

    const success = await handleAddProduct({
      nameProduct: newProduct.name ?? "",
      category_id: newProduct.category_id ?? "",
      priceProduct: Number(newProduct.price) ?? 0,
      quantityProduct: Number(newProduct.quantity) ?? 0,
      user_id: register?.data.id ?? "",
    });

    if (success) {
      setNewProduct({});
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [
    newProduct.name,
    newProduct.category_id,
    newProduct.price,
    newProduct.quantity,
    register?.data.id,
    handleAddProduct,
    setRefreshKey,
  ]);

  const handleResetAdd = useCallback(() => {
    setNewProduct({});
  }, [setNewProduct]);

  return {
    newProduct,
    isDisabled,
    handleAdd,
    handleNewProductInputChange,
    handleResetAdd
  };
}

export default useProductAdd;
