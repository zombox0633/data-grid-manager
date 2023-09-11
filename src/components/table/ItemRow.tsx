import { useState } from "react";
import DefaultButton from "components/button/DefaultButton";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";

import { ProductsDataType } from "api/products/products.type";
import { ProductValuesType } from "./ProductsTable";
import { UpdateProductType } from "hook/customAtomData/product/useProductActions";
import { RegisterDataType } from "api/register/register.type";
import { UserType } from "api/user/users.type";
import { CategoryType } from "api/category/category.type";

type ItemRowType = {
  register: RegisterDataType | null;
  product: ProductsDataType;
  usersData: UserType | null;
  categoryData: CategoryType | null;
  handleUpdateProduct: (productData: UpdateProductType) => Promise<void>;
  handleDeleteProduct: (product_id: string) => Promise<void>;
};

function ItemRow({
  register,
  product,
  usersData,
  categoryData,
  handleUpdateProduct,
  handleDeleteProduct,
}: ItemRowType) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<ProductValuesType>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEditInputChange = (
    key: keyof ProductsDataType,
    value: string
  ) => {
    setEditingValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return (
    <tr key={product.id}>
      {productHeaders.map((header) => (
        <td key={String(header.key)} className="td__normal_state">
          {editingId === product.id && header.editable ? (
            <input
              type={
                header.key === "price" || header.key === "quantity"
                  ? "number"
                  : "text"
              }
              defaultValue={String(product[header.key])}
              onChange={(e) =>
                handleEditInputChange(header.key, e.target.value)
              }
              className="w-full"
            />
          ) : header.key === "last_op_id" ? (
            usersData?.data.find((user) => user.id === product[header.key])
              ?.name || product[header.key]
          ) : header.key === "category_id" ? (
            categoryData?.data.find((cat) => cat.id === product[header.key])
              ?.name || product[header.key]
          ) : (
            String(product[header.key])
          )}
        </td>
      ))}
      <td className="px-4 py-2 border border-eerieBlack">
        {editingId !== product.id && deleteId !== product.id ? (
          <>
            <DefaultButton
              onClick={() => setEditingId(product.id)}
              addClassName="table__button bg-yellow-300 disabled:bg-yellow-300/70 text-w"
            >
              Edit
            </DefaultButton>
            <button
              onClick={() => setDeleteId(product.id)}
              className="table__button bg-red-500 disabled:bg-red-500/70"
            >
              Delete
            </button>
          </>
        ) : editingId === product.id ? (
          <>
            <DefaultButton
              onClick={() => {
                handleUpdateProduct({
                  product_id: product.id,
                  nameProduct: editingValues.name,
                  category_id: editingValues.category_id,
                  priceProduct: Number(editingValues.price),
                  quantityProduct: Number(editingValues.quantity),
                  user_id: register?.id ?? "",
                });
                setEditingId(null);
                setEditingValues({});
              }}
              addClassName="table__button bg-green-400  disabled:bg-green-400/70"
            >
              Submit
            </DefaultButton>
            <DefaultButton
              onClick={() => {
                setEditingId(null);
                setEditingValues({});
              }}
              addClassName="table__button bg-red-500 disabled:bg-red-500/70"
            >
              Cancel
            </DefaultButton>
          </>
        ) : (
          <>
            <DefaultButton
              onClick={() => {
                handleDeleteProduct(product.id);
                setDeleteId(null);
              }}
              addClassName="table__button bg-green-400  disabled:bg-green-400/70"
            >
              Confirm
            </DefaultButton>
            <DefaultButton
              onClick={() => {
                setDeleteId(null);
              }}
              addClassName="table__button bg-red-500 disabled:bg-red-500/70"
            >
              Cancel
            </DefaultButton>
          </>
        )}
      </td>
    </tr>
  );
}

export default ItemRow;
