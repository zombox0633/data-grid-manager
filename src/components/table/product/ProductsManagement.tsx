import { useState } from "react";
import TableManagement from "../management/TableManagement";
import useGetProducts from "hook/useDataTable/product/useGetProducts";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { ProductsDataType } from "api/products/products.type";

function ProductsManagement() {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const { loadProductsData } = useGetProducts(refreshKey);

  return (
    <>
      <TableManagement<ProductsDataType>
        tableName={"Product"}
        itemHeaders={productHeaders}
        loadData={loadProductsData}
        setRefreshKey={setRefreshKey}
      />
    </>
  );
}

export default ProductsManagement;
