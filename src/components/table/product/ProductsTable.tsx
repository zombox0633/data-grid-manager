import { useState } from "react";

import DataTable from "../dataTable/DataTable";

import useGetProducts from "hook/useDataTable/product/useGetProducts";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { ProductsDataType } from "api/products/products.type";

function ProductsTable() {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { loadProductsData } = useGetProducts(refreshKey);
  return (
    <div>
      <DataTable<ProductsDataType>
        nameTable={"Products"}
        loadData={loadProductsData}
        tableHeaders={productHeaders}
        setRefreshKey={setRefreshKey}
      />
    </div>
  );
}

export default ProductsTable;
