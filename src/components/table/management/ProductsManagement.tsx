import { useState } from "react";
import { useAtom } from "jotai";

import TableManagement from "./TableManagement";

import useProductActions from "hook/useDataTable/product/useProductActions";
import useGetCategory from "hook/useDataTable/category/useGetCategory";
import useGetProducts from "hook/useDataTable/product/useGetProducts";
import useProductAdd from "hook/useTable/product/useProductAdd";

import { registerAtom } from "atoms/registerAtom";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { ProductsDataType } from "api/products/products.type";
import { CategoryDataType } from "api/category/category.type";

function ProductsManagement() {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const { loadProductsData } = useGetProducts(refreshKey);
  const { handleAddProduct, handleUpdateProduct, handleDeleteProduct } =
    useProductActions();

  const [register] = useAtom(registerAtom);
  const { loadCategoryData } = useGetCategory();
  const [categoryData] = loadCategoryData();

  const {
    newProduct,
    isDisabled,
    handleAdd,
    handleNewProductInputChange,
    handleResetAdd,
  } = useProductAdd({
    register,
    handleAddProduct,
    setRefreshKey,
  });

  return (
    <>
      <TableManagement<ProductsDataType, CategoryDataType>
        tableName={"Products"}
        itemHeaders={productHeaders}
        loadData={loadProductsData}
        dropDownItem={categoryData}
        newItemToAdd={newProduct}
        isDisabled={isDisabled}
        handleNewItemInputChange={handleNewProductInputChange}
        handleAdd={handleAdd}
        handleResetAdd={handleResetAdd}
        handleUpdateItem={handleUpdateProduct}
        handleDeleteItem={handleDeleteProduct}
        setRefreshKey={setRefreshKey}
      />
    </>
  );
}

export default ProductsManagement;
