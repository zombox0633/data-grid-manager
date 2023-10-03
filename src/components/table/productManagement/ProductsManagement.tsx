import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import TableHead from "../TableHead";
import TableStateRow from "../TableStateRow";
import AddItemRow from "./AddItemRow";
import ItemRow from "./ItemRow";
import DataTableToolbar from "../DataTableToolbar";

import useProductActions from "hook/customAtomData/product/useProductActions";
import useGetCategory from "hook/customAtomData/category/useGetCategory";
import useGetUsers from "hook/customAtomData/user/useGetUsers";
import useSearchProduct from "hook/customAtomData/product/useSearchProduct";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { ProductsDataType } from "api/products/products.type";

import { loadingAtom } from "atoms/loadingAtom";
import useGetProducts from "hook/customAtomData/product/useGetProducts";

import { TableDisplayConfig } from "pages/DataManagementPage";

export type ProductValuesType = Partial<ProductsDataType>;
//Partial คือการระบุบ properties ที่จะใช้แค่บางส่วน

function ProductsManagement({ showAll, setShowAll }: TableDisplayConfig) {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const { loadProductsData } = useGetProducts(refreshKey);
  const { handleAddProduct, handleUpdateProduct, handleDeleteProduct } =
    useProductActions();

  const {
    itemLength,
    productError,
    handleSearchProduct,
    displayData,
    setFilteredData,
  } = useSearchProduct({ loadProductsData, showAll });

  const { loadCategoryData } = useGetCategory();
  const [categoryData] = loadCategoryData();
  const { loadUserData } = useGetUsers();
  const [usersData] = loadUserData();

  const [, setIsOpen] = useAtom(loadingAtom);

  useEffect(() => {
    setIsOpen(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [setIsOpen]);

  return (
    <div>
      <DataTableToolbar<ProductsDataType>
        itemLength={itemLength}
        showAll={showAll}
        setShowAll={setShowAll}
        setRefreshKey={setRefreshKey}
        setFilteredData={setFilteredData}
        handleSearchProduct={handleSearchProduct}
      />
      <table
        className={`${
          !displayData || displayData?.length === 0 ? "h-[60vh]" : "h-auto"
        } w-[90vw] border border-eerieBlack border-collapse overflow-hidden`}
      >
        <TableHead headers={productHeaders} isManagement={true} />
        <tbody>
          <AddItemRow
            categoryData={categoryData}
            setRefreshKey={setRefreshKey}
            handleAddProduct={handleAddProduct}
          />
          {productError && (
            <TableStateRow
              status="error"
              error={productError}
              colSpan={productHeaders.length}
            />
          )}
          {!displayData && !productError && (
            <TableStateRow status="loading" colSpan={productHeaders.length} />
          )}
          {displayData && displayData?.length === 0 && !productError && (
            <TableStateRow status="empty" colSpan={productHeaders.length} />
          )}
          {displayData.map((product, index) => (
            <ItemRow
              key={product.id}
              product={product}
              usersData={usersData}
              categoryData={categoryData}
              setRefreshKey={setRefreshKey}
              handleUpdateProduct={handleUpdateProduct}
              handleDeleteProduct={handleDeleteProduct}
              rowColor={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsManagement;
