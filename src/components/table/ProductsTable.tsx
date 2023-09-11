import { useAtom } from "jotai";
import TableHead from "./TableHead";
import TableStateRow from "./TableStateRow";
import AddItemRow from "./AddItemRow";
import ItemRow from "./ItemRow";

import { registerAtom } from "atoms/registerAtom";
import useGetProducts from "hook/customAtomData/product/useGetProducts";
import useProductActions from "hook/customAtomData/product/useProductActions";
import useCategory from "hook/customAtomData/category/useGetCategory";
import useGetUsers from "hook/customAtomData/user/useGetUsers";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { ProductsDataType } from "api/products/products.type";

export type ProductValuesType = Partial<ProductsDataType>;
//Partial คือการระบุบ properties ที่จะใช้แค่บางส่วน

function ProductsTable() {
  const [register] = useAtom(registerAtom);

  const { handleAddProduct, handleUpdateProduct, handleDeleteProduct } =
    useProductActions();

  const { loadProductsData } = useGetProducts();
  const [productData, productError] = loadProductsData();
  const { loadCategoryData } = useCategory();
  const [categoryData] = loadCategoryData();
  const { loadUserData } = useGetUsers();
  const [usersData] = loadUserData();

  return (
    <div>
      <h4 className="mb-4">Product</h4>
      <table
        className={`${
          !productData || productData?.data?.length === 0
            ? "h-[60vh]"
            : "h-auto"
        } w-[90vw] border border-eerieBlack border-collapse overflow-hidden`}
      >
        <TableHead headers={productHeaders} />
        <tbody>
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
          <AddItemRow
            register={register?.data ?? null}
            handleAddProduct={handleAddProduct}
          />
          {productData &&
            productData.data.map((product) => (
              <ItemRow
                register={register?.data ?? null}
                product={product}
                usersData={usersData}
                categoryData={categoryData}
                handleUpdateProduct={handleUpdateProduct}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
