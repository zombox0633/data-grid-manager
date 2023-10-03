import { useAtom } from "jotai";

import DefaultButton from "components/button/DefaultButton";

import { registerAtom } from "atoms/registerAtom";

import {
  ProductHeaderType,
  productHeaders,
} from "src/constraint/PRODUCT_TABLE";

import { AddProductType } from "hook/customAtomData/product/useProductActions";
import { CategoryType } from "api/category/category.type";
import useProductAdd from "hook/useTable/product/useProductAdd";

type AddItemRowType = {
  categoryData: CategoryType | null;
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

  const renderTdAddProduct = (header: ProductHeaderType) => {
    if (header.key == "last_op_id") {
      return register?.data.name ?? "Please login";
    }
    if (header.key === "category_id") {
      return (
        <select
          aria-label="Select product category"
          value={newProduct.category_id || ""}
          onChange={(e) =>
            handleNewProductInputChange(header.key, e.target.value)
          }
          className=" w-full h-8"
        >
          <option value={""} disabled>
            Select category
          </option>
          {categoryData?.data.map((category) => (
            <option
              key={category.id}
              aria-label={header.label}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          {...(header.key === "price" || header.key === "quantity"
            ? {
                type: "number",
                min: "0",
                max: "9999",
              }
            : { type: "text" })}
          aria-label={header.label}
          value={String(newProduct[header.key] || "")}
          placeholder={
            header.label.charAt(0).toUpperCase() + header.label.slice(1)
          }
          onChange={(e) =>
            handleNewProductInputChange(header.key, e.target.value)
          }
          disabled={isDisabled}
          className="table__input"
        />
      );
    }
  };

  return (
    <tr>
      {productHeaders.map((header) => (
        <td key={header.key} className="td__normal_state">
          {renderTdAddProduct(header)}
        </td>
      ))}
      <td className="px-4 py-2 border border-eerieBlack">
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
