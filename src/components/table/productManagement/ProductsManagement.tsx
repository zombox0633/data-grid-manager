import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

import TableHead from "../TableHead";
import TableStateRow from "../TableStateRow";
import AddItemRow from "./AddItemRow";
import ItemRow from "./ItemRow";

import useGetProducts from "hook/customAtomData/product/useGetProducts";
import useProductActions from "hook/customAtomData/product/useProductActions";
import useGetCategory from "hook/customAtomData/category/useGetCategory";
import useGetUsers from "hook/customAtomData/user/useGetUsers";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { ProductsDataType } from "api/products/products.type";

import { loadingAtom } from "atoms/loadingAtom";

export type ProductValuesType = Partial<ProductsDataType>;
//Partial คือการระบุบ properties ที่จะใช้แค่บางส่วน

function ProductsManagement() {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);

  const { handleAddProduct, handleUpdateProduct, handleDeleteProduct } =
    useProductActions();

  const { loadProductsData } = useGetProducts(refreshKey);
  const [productData, productError] = loadProductsData();
  const { loadCategoryData } = useGetCategory();
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

  const itemLength = productData?.data?.length;

  return (
    <div>
      <div>
        <div className=" flex flex-row items-end">
          <h4 className="mr-4">Product</h4>
          <span className=" font-semibold">
            Total item available {itemLength}
          </span>
        </div>
        <div className=" flex justify-between items-center my-4">
          <div>
            <input
              type="text"
              className="w-72 border-2 border-eerieBlack/60 rounded-md px-2"
            />
            <button className="table__small_button bg-eerieBlack">
              <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
            </button>
          </div>
          <div className=" flex justify-between w-20">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="table__small_button text-white bg-indigo-700"
            >
              {showAll ? "20" : "all"}
            </button>
            <button
              onClick={() => setRefreshKey((prev) => prev + 1)}
              className="table__small_button bg-blue-400"
            >
              <FontAwesomeIcon icon={faArrowsRotate} color="white" />
            </button>
          </div>
        </div>
      </div>
      <table
        className={`${
          !productData || productData?.data?.length === 0
            ? "h-[60vh]"
            : "h-auto"
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
          {!productData && !productError && (
            <TableStateRow status="loading" colSpan={productHeaders.length} />
          )}
          {productData && productData?.data?.length === 0 && !productError && (
            <TableStateRow status="empty" colSpan={productHeaders.length} />
          )}
          {productData &&
            (showAll ? productData.data : productData.data.slice(0, 20)).map(
              (product, index) => (
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
              )
            )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsManagement;
