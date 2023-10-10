import { useCallback, useState } from "react";
import { useAtom } from "jotai";
import { registerAtom } from "atoms/registerAtom";
import { isDisabledAtom } from "atoms/table/tableAtom";
import { AddProductType } from "hook/useDataTable/product/useProductActions";
import { ProductsDataType } from "api/products/products.type";
import { ProductValuesType } from "src/constraint/PRODUCT_TABLE";

type useProductAdd = {
  handleAddProduct: (productData: AddProductType) => Promise<boolean>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useProductAdd({ handleAddProduct, setRefreshKey }: useProductAdd) {
  const [register] = useAtom(registerAtom);
  const [,setIsDisabled] = useAtom(isDisabledAtom)
  const [newProduct, setNewProduct] = useState<ProductValuesType>({});

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
    setIsDisabled
  ]);

  const handleResetAdd = useCallback(() => {
    setNewProduct({});
  }, [setNewProduct]);

  return {
    newProduct,
    handleAdd,
    handleNewProductInputChange,
    handleResetAdd,
  };
}

export default useProductAdd;
