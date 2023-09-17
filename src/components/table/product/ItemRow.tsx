import { useAtom } from "jotai";

import { registerAtom } from "atoms/registerAtom";

import { formatNumber } from "helpers/index";

import {
  ProductHeaderType,
  productHeaders,
} from "src/constraint/PRODUCT_TABLE";

import { ProductsDataType } from "api/products/products.type";
import { UpdateProductType } from "hook/customAtomData/product/useProductActions";
import { UserType } from "api/user/users.type";
import { CategoryType } from "api/category/category.type";
import ProductActions from "./ProductActions";
import useProductEditing from "hook/useTable/product/useProductEditing";

type ItemRowType = {
  product: ProductsDataType;
  usersData: UserType | null;
  categoryData: CategoryType | null;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  handleUpdateProduct: (productData: UpdateProductType) => Promise<boolean>;
  handleDeleteProduct: (product_id: string) => Promise<boolean>;
  rowColor: number;
};

function ItemRow({
  product,
  usersData,
  categoryData,
  setRefreshKey,
  handleUpdateProduct,
  handleDeleteProduct,
  rowColor,
}: ItemRowType) {
  const [register] = useAtom(registerAtom);

  const {
    editingId,
    editingValues,
    deleteId,
    isDisabled,
    handleEditClick,
    handleDeleteClick,
    handleConfirmEdit,
    handleCancelEdit,
    handleConfirmDelete,
    handleCancelDelete,
    handleEditInputChange,
  } = useProductEditing({
    product,
    handleUpdateProduct,
    handleDeleteProduct,
    register,
    setRefreshKey,
  });

  const renderTdProduct = (header: ProductHeaderType) => {
    const formattedValue =
      header.key === "price" || header.key === "quantity"
        ? formatNumber(product[header.key])
        : String(product[header.key]);

    if (
      editingId === product.id &&
      header.editable &&
      header.key !== "category_id"
    ) {
      return (
        <input
          {...(header.key === "price" || header.key === "quantity"
            ? {
                type: "number",
                min: "0",
                max: "9999",
              }
            : { type: "text" })}
          defaultValue={String(product[header.key])}
          disabled={isDisabled}
          onChange={(e) => handleEditInputChange(header.key, e.target.value)}
          className="w-full"
        />
      );
    }
    if (header.key === "category_id" && editingId !== product.id) {
      return (
        categoryData?.data.find((cat) => cat.id === product[header.key])
          ?.name || product[header.key]
      );
    }
    if (header.key === "category_id" && editingId === product.id) {
      return (
        <select
          value={editingValues.category_id || ""}
          onChange={(e) => handleEditInputChange(header.key, e.target.value)}
          disabled={isDisabled}
          className=" w-full h-8"
        >
          <option value={""} disabled>
            Select category
          </option>
          {categoryData?.data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      );
    }
    if (header.key === "last_op_id") {
      return (
        usersData?.data.find((user) => user.id === product[header.key])?.name ||
        product[header.key]
      );
    } else {
      return formattedValue;
    }
  };

  return (
    <tr
      key={product.id}
      className={rowColor % 2 === 0 ? "bg-white" : "bg-floralWhite"}
    >
      {productHeaders.map((header) => (
        <td key={header.key} className="td__normal_state">
          {renderTdProduct(header)}
        </td>
      ))}
      <td className="px-4 py-2 border border-eerieBlack">
        <ProductActions
          product={product}
          editingId={editingId}
          deleteId={deleteId}
          isDisabled={isDisabled}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleConfirmEdit={handleConfirmEdit}
          handleCancelEdit={handleCancelEdit}
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      </td>
    </tr>
  );
}

export default ItemRow;
