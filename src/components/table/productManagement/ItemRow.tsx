import { useAtom } from "jotai";
import { registerAtom } from "atoms/registerAtom";

import TextInput from "./TextInput";
import ProductActions from "./ProductActions";
import CategoryDropDown from "./CategoryDropDown";

import {
  formatNumber,
  getCellAlignmentClass,
  localFormattedDate,
} from "helpers/index";

import useProductEditing from "hook/useTable/product/useProductEditing";

import { productHeaders } from "src/constraint/PRODUCT_TABLE";
import { ProductsDataType } from "api/products/products.type";
import { UpdateProductType } from "hook/useDataTable/product/useProductActions";
import { UserDataType } from "api/user/users.type";
import { CategoryDataType } from "api/category/category.type";
import { HeaderType } from "../Table";

type ItemRowType = {
  product: ProductsDataType;
  usersData: UserDataType[] | null;
  categoryData: CategoryDataType[] | null;
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

  const { id: productId } = product;
  const isEvenRow = rowColor % 2 === 0;
  const rowClassName = isEvenRow ? "bg-white" : "bg-eerieBlack/10";

  const renderTdProduct = (header: HeaderType<ProductsDataType>) => {
    const isEditingCurrentRow = editingId === productId;
    const isEditableField = header.editable && editingId === productId;

    switch (header.key) {
      case "category_id":
        if (isEditingCurrentRow)
          return (
            <CategoryDropDown
              header={header}
              value={editingValues.category_id || ""}
              categoryData={categoryData}
              handleInputChange={handleEditInputChange}
              isDisabled={isDisabled}
            />
          );
        return (
          categoryData?.find((cat) => cat.id === product[header.key])?.name ||
          product[header.key]
        );
      case "price":
      case "quantity":
        return isEditableField ? (
          <TextInput
            header={header}
            value={String(product[header.key])}
            handleInputChange={handleEditInputChange}
            isDisabled={isDisabled}
          />
        ) : (
          formatNumber(product[header.key])
        );
      case "last_op_id":
        return (
          usersData?.find((user) => user.id === product[header.key])?.name ||
          product[header.key]
        );
      case "created_timestamp":
      case "lastupdate_timestamp":
        return localFormattedDate(product[header.key]);
      default:
        return isEditableField ? (
          <TextInput
            header={header}
            value={String(product[header.key])}
            handleInputChange={handleEditInputChange}
            isDisabled={isDisabled}
          />
        ) : (
          product[header.key]
        );
    }
  };

  const renderProductCell = (header: HeaderType<ProductsDataType>) => (
    <td
      key={header.key}
      className={`td__normal_state ${getCellAlignmentClass(header.key)}`}
    >
      {renderTdProduct(header)}
    </td>
  );

  const renderProductActions = () => (
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
  );

  return (
    <tr key={productId} className={rowClassName}>
      {productHeaders.map(renderProductCell)}
      {renderProductActions()}
    </tr>
  );
}

export default ItemRow;
