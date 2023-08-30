import useProducts from "hook/getData/product/useProducts";

import Table, { HeaderType } from "./Table";
import { ProductsDataType } from "api/products/products.type";

function ProductsTable() {
  const { loadProductsData } = useProducts();
  const [data, error] = loadProductsData();

  const productHeaders: HeaderType<ProductsDataType>[] = [
    { key: "id", label: "id", action:false },
    { key: "name", label: "name", action:true },
    { key: "category_id", label: "category", action:true },
    { key: "price", label: "price", action:true },
    { key: "quantity", label: "quantity", action:true },
    { key: "last_op_id", label: "latest Update", action:false},
  ];

  return (
    <div>
      <h4 className="mb-4">Product</h4>
      <Table headers={productHeaders} data={data?.data || []} error={error} />
    </div>
  );
}

export default ProductsTable;
