import { useState } from "react";
import TableManagement from "../management/TableManagement";
import useGetCategory from "hook/useDataTable/category/useGetCategory";

import { CategoryHeaders } from "src/constraint/CATEGORY_TABLE";
import { CategoryDataType } from "api/category/category.type";

function CategoryManagement() {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const { loadCategoryData } = useGetCategory(refreshKey);
  return (
    <>
      <TableManagement<CategoryDataType>
        tableName="Category"
        itemHeaders={CategoryHeaders}
        loadData={loadCategoryData}
        setRefreshKey={setRefreshKey}
      />
    </>
  );
}

export default CategoryManagement;
