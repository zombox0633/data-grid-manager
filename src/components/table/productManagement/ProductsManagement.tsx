import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import TableHead from "../TableHead";
import TableStateRow from "../TableStateRow";
import AddItemRow from "./AddItemRow";
import ItemRow from "./ItemRow";
import DataTableToolbar from "../DataTableToolbar";

import useProductActions from "hook/useDataTable/product/useProductActions";
import useGetCategory from "hook/useDataTable/category/useGetCategory";
import useGetUsers from "hook/useDataTable/user/useGetUsers";
import useSearchItem from "hook/useDataTable/useSearchItem";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { ProductsDataType } from "api/products/products.type";

import { loadingAtom } from "atoms/loadingAtom";
import useGetProducts from "hook/useDataTable/product/useGetProducts";

export type ProductValuesType = Partial<ProductsDataType>;
//Partial คือการระบุบ properties ที่จะใช้แค่บางส่วน

function ProductsManagement() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const { loadProductsData } = useGetProducts(refreshKey);
  const { handleAddProduct, handleUpdateProduct, handleDeleteProduct } =
    useProductActions();

  const {
    itemLength,
    itemError,
    handleSearchItem,
    displayData,
    setFilteredData,
  } = useSearchItem<ProductsDataType>({
    loadData: loadProductsData,
    showAll: showAll,
  });

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
        nameTable={"Products"}
        itemLength={itemLength}
        showAll={showAll}
        setShowAll={setShowAll}
        setRefreshKey={setRefreshKey}
        setFilteredData={setFilteredData}
        handleSearchItem={handleSearchItem}
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
          {itemError && (
            <TableStateRow
              status="error"
              error={itemError}
              colSpan={productHeaders.length}
            />
          )}
          {!displayData && !itemError && (
            <TableStateRow status="loading" colSpan={productHeaders.length} />
          )}
          {displayData && displayData?.length === 0 && !itemError && (
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
