import { CategoryDataType } from "api/category/category.type";
import { ProductsDataType } from "api/products/products.type";
import { HeaderType } from "../Table";

type CategoryDropDown = {
  header: HeaderType<ProductsDataType>;
  value: string;
  categoryData: CategoryDataType[] | null;
  handleInputChange: (key: keyof ProductsDataType, value: string) => void
  isDisabled: boolean;
};

function CategoryDropDown({
  header,
  value,
  categoryData,
  handleInputChange,
  isDisabled,
}: CategoryDropDown) {
  return (
    <select
      aria-label="Select product category"
      value={value}
      onChange={(e) => handleInputChange(header.key, e.target.value)}
      disabled={isDisabled}
      className="dropdown_table"
    >
      <option value={""} disabled>
        Select category
      </option>
      {categoryData?.map((category) => (
        <option key={category.id} aria-label={header.label} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategoryDropDown;
