import DefaultButton from "components/button/DefaultButton";

import { ProductsDataType } from "api/products/products.type";

type ProductActionsType = {
  product: ProductsDataType;
  editingId: string | null;
  deleteId: string | null;
  isDisabled: boolean
  handleEditClick: () => void
  handleDeleteClick: () => void
  handleConfirmEdit: () => void
  handleCancelEdit: () => void
  handleConfirmDelete: () => void
  handleCancelDelete: () => void
};

function ProductActions({
  product,
  editingId,
  deleteId,
  isDisabled,
  handleEditClick,
  handleDeleteClick,
  handleConfirmEdit,
  handleCancelEdit,
  handleConfirmDelete,
  handleCancelDelete
}: ProductActionsType) {

  if (editingId === product.id && deleteId !== product.id) {
    return (
      <>
        <DefaultButton
          onClick={handleConfirmEdit}
          addClassName="table__button bg-green-400  disabled:bg-green-400/70"
          disabled={isDisabled}
        >
          Submit
        </DefaultButton>
        <DefaultButton
          onClick={handleCancelEdit}
          addClassName="table__button bg-red-500 disabled:bg-red-500/70"
        >
          Cancel
        </DefaultButton>
      </>
    );
  }
  if (deleteId === product.id && editingId !== product.id) {
    return (
      <>
        <DefaultButton
          onClick={handleConfirmDelete}
          disabled={isDisabled}
          addClassName="table__button bg-green-400  disabled:bg-green-400/70"
        >
          Confirm
        </DefaultButton>
        <DefaultButton
          onClick={handleCancelDelete}
          addClassName="table__button bg-red-500 disabled:bg-red-500/70"
        >
          Cancel
        </DefaultButton>
      </>
    );
  }
  return (
    <>
      <DefaultButton
        onClick={handleEditClick}
        addClassName="table__button bg-yellow-300 disabled:bg-yellow-300/70 text-w"
      >
        Edit
      </DefaultButton>
      <DefaultButton
        onClick={handleDeleteClick}
        addClassName="table__button bg-red-500 disabled:bg-red-500/70"
      >
        Delete
      </DefaultButton>
    </>
  );
}

export default ProductActions;