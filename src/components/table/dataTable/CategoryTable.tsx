import { useState } from "react";
import DataTable from "../DataTable";
import useGetCategory from "hook/useDataTable/category/useGetCategory";

import { CategoryDataType } from "api/category/category.type";
import { CategoryHeaders } from "src/constraint/CATEGORY_TABLE";

function CategoryTable() {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { loadCategoryData } = useGetCategory(refreshKey);

  return (
    <div>
      <DataTable<CategoryDataType>
        nameTable={"Category"}
        loadData={loadCategoryData}
        tableHeaders={CategoryHeaders}
        setRefreshKey={setRefreshKey}
      />
    </div>
  );
}

export default CategoryTable;
