import { CategoryHeaders } from "src/constraint/CATEGORY_TABLE";
import Table from "../Table";

import useGetCategory from "hook/customAtomData/category/useGetCategory";

function CategoryTable() {
  const { loadCategoryData } = useGetCategory();
  const [categoryData, categoryError] = loadCategoryData();
  
  return (
    <div>
      {categoryData?.data && (
        <Table
          nameTable="Category"
          headers={CategoryHeaders}
          data={categoryData.data}
          error={categoryError}
        />
      )}
    </div>
  );
}

export default CategoryTable;
