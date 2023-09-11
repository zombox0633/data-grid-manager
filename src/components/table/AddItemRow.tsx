import { useState } from "react";
import DefaultButton from "components/button/DefaultButton";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";

import { RegisterDataType } from "api/register/register.type";
import { ProductValuesType } from "./ProductsTable";
import { ProductsDataType } from "api/products/products.type";
import { AddProductType } from "hook/customAtomData/product/useProductActions";

type AddItemRowType = {
  register: RegisterDataType | null;
  handleAddProduct: (productData: AddProductType) => Promise<void>;
};

function AddItemRow({ register, handleAddProduct }: AddItemRowType) {
  const [newProduct, setNewProduct] = useState<ProductValuesType>({});

  const handleNewProductInputChange = (
    key: keyof ProductsDataType,
    value: string
  ) => {
    setNewProduct((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return (
    <tr>
      {productHeaders.map((header) => (
        <td key={header.key} className="td__normal_state">
          {header.key === "last_op_id" ? (
            register?.name ?? "null"
          ) : (
            <input
              type={
                header.key === "price" || header.key === "quantity"
                  ? "number"
                  : "text"
              }
              value={String(newProduct[header.key] || "")}
              onChange={(e) =>
                handleNewProductInputChange(header.key, e.target.value)
              }
              className="w-full"
            />
          )}
        </td>
      ))}
      <td className="px-4 py-2 border border-eerieBlack">
        <DefaultButton
          aria-label="Add new product"
          onClick={() =>
            handleAddProduct({
              nameProduct: newProduct.name ?? "",
              category_id: newProduct.category_id ?? "",
              priceProduct: Number(newProduct.price) ?? 0,
              quantityProduct: Number(newProduct.quantity) ?? 0,
              user_id: register?.id ?? "",
            })
          }
          addClassName="table__button bg-green-400 disabled:bg-green-400/70"
        >
          Add
        </DefaultButton>
        <DefaultButton
          aria-label="Reset input fields"
          onClick={() => setNewProduct({})}
          addClassName="table__button bg-blue-400 disabled:bg-blue-400/70"
        >
          Reset
        </DefaultButton>
      </td>
    </tr>
  );
}

export default AddItemRow;
