import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import TableHead from "../TableHead";
import TableStateRow from "../TableStateRow";
import AddItemRow from "./AddItemRow";
import ItemRow from "./ItemRow";

import useGetProducts from "hook/customAtomData/product/useGetProducts";
import useProductActions from "hook/customAtomData/product/useProductActions";
import useCategory from "hook/customAtomData/category/useGetCategory";
import useGetUsers from "hook/customAtomData/user/useGetUsers";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { ProductsDataType } from "api/products/products.type";

import { loadingAtom } from "atoms/loadingAtom";

export type ProductValuesType = Partial<ProductsDataType>;
//Partial คือการระบุบ properties ที่จะใช้แค่บางส่วน

function ProductsTable() {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const { handleAddProduct, handleUpdateProduct, handleDeleteProduct } =
    useProductActions();

  const { loadProductsData } = useGetProducts(refreshKey);
  const [productData, productError] = loadProductsData();
  const { loadCategoryData } = useCategory();
  const [categoryData] = loadCategoryData();
  const { loadUserData } = useGetUsers();
  const [usersData] = loadUserData();

  const [, setIsOpen] = useAtom(loadingAtom);

  useEffect(() => {
    setIsOpen(true);
    if (productData && categoryData) {
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
    return () => {
      setIsOpen(false);
    };
  }, [productData, categoryData, setIsOpen]);

  const itemLength = productData?.data?.length

  return (
    <div>
      <div className=" flex justify-between items-center m-2">
        <div className=" flex flex-row items-end">
          <h4 className="mr-2">Product</h4>
          <span className=" font-semibold">Total item available {itemLength}</span>
        </div>
        <div>
          <input type="text" />
          <button>s</button>
        </div>
      </div>
      <table
        className={`${
          !productData || productData?.data?.length === 0
            ? "h-[60vh]"
            : "h-auto"
        } w-[90vw] border border-eerieBlack border-collapse overflow-hidden`}
      >
        <TableHead headers={productHeaders} />
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
          {!productData && !productError && (
            <TableStateRow status="loading" colSpan={productHeaders.length} />
          )}
          {productData && productData?.data?.length === 0 && !productError && (
            <TableStateRow status="empty" colSpan={productHeaders.length} />
          )}
          {productData &&
            productData.data.map((product, index) => (
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

export default ProductsTable;
