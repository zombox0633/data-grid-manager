import Table from "../Table";

import useGetProducts from "hook/customAtomData/product/useGetProducts";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";

function ProductsTable() {
  const { loadProductsData } = useGetProducts();
  const [productData, productError] = loadProductsData();

  return (
    <div>
      {productData?.data && (
        <Table
          nameTable={"Product"}
          headers={productHeaders}
          data={productData?.data}
          error={productError}
        />
      )}
    </div>
  );
}

export default ProductsTable;
