import { useState } from "react";

import TableManagement from "../management/TableManagement";

import useProductActions from "hook/useDataTable/product/useProductActions";
import useGetCategory from "hook/useDataTable/category/useGetCategory";
import useGetProducts from "hook/useDataTable/product/useGetProducts";
import useProductAdd from "hook/useTable/product/useProductAdd";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { ProductsDataType } from "api/products/products.type";
import { CategoryDataType } from "api/category/category.type";

function ProductsManagement() {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const { loadProductsData } = useGetProducts(refreshKey);
  const { handleAddProduct, handleUpdateProduct, handleDeleteProduct } =
    useProductActions();

  const { loadCategoryData } = useGetCategory();
  const [categoryData] = loadCategoryData();

  const { newProduct, handleAdd, handleNewProductInputChange, handleResetAdd } =
    useProductAdd({
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
