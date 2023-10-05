import { useAtom } from "jotai";
import { registerAtom } from "atoms/registerAtom";
import DefaultButton from "components/button/DefaultButton";
import CategoryDropDown from "./CategoryDropDown";
import TextInput from "./TextInput";

import { getCellAlignmentClass } from "helpers/index";

import useProductAdd from "hook/useTable/product/useProductAdd";
import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { AddProductType } from "hook/useDataTable/product/useProductActions";
import { CategoryDataType } from "api/category/category.type";
import { HeaderType } from "../Table";
import { ProductsDataType } from "api/products/products.type";

type AddItemRowType = {
  categoryData: CategoryDataType[] | null;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  handleAddProduct: (productData: AddProductType) => Promise<boolean>;
};

function AddItemRow({
  categoryData,
  setRefreshKey,
  handleAddProduct,
}: AddItemRowType) {
  const [register] = useAtom(registerAtom);

  const {
    newProduct,
    isDisabled,
    handleAdd,
    handleNewProductInputChange,
    handleResetAdd,
  } = useProductAdd({
    register,
    handleAddProduct,
    setRefreshKey,
  });

  const renderTdAddProduct = (header: HeaderType<ProductsDataType>) => {
    switch (header.key) {
      case "category_id":
        return (
          <CategoryDropDown
            header={header}
            value={newProduct.category_id || ""}
            categoryData={categoryData}
            handleInputChange={handleNewProductInputChange}
            isDisabled={isDisabled}
          />
        );
      case "last_op_id":
        return register?.data.name ?? "Please login";
      case "created_timestamp":
        return;
      case "lastupdate_timestamp":
        return "Timestamp auto-saved";
      default:
        return (
          <TextInput
            header={header}
            value={String(newProduct[header.key] || "")}
            handleInputChange={handleNewProductInputChange}
            isDisabled={isDisabled}
          />
        );
    }
  };

  return (
    <tr>
      {productHeaders.map((header) => (
        <td
          key={header.key}
          className={`td__normal_state ${getCellAlignmentClass(header.key)}`}
        >
          {renderTdAddProduct(header)}
        </td>
      ))}
      <td className="px-4 py-2 border border-eerieBlack bg-eerieBlack/10">
        <DefaultButton
          aria-label="Add new product"
          disabled={isDisabled}
          onClick={handleAdd}
          addClassName="table__button bg-green-400 disabled:bg-green-400/70"
        >
          Add
        </DefaultButton>
        <DefaultButton
          aria-label="Reset input fields"
          onClick={handleResetAdd}
          addClassName="table__button bg-blue-400 disabled:bg-blue-400/70"
        >
          Reset
        </DefaultButton>
      </td>
    </tr>
  );
}

export default AddItemRow;
