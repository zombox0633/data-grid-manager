import DefaultButton from "components/button/DefaultButton";

type TableRowActionType = {
  itemId: string;
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

function TableRowAction({
  itemId,
  editingId,
  deleteId,
  isDisabled,
  handleEditClick,
  handleDeleteClick,
  handleConfirmEdit,
  handleCancelEdit,
  handleConfirmDelete,
  handleCancelDelete
}: TableRowActionType) {

  if (editingId === itemId && deleteId !== itemId) {
    return (
      <>
        <DefaultButton
          aria-label="Confirm edit data"
          onClick={handleConfirmEdit}
          addClassName="table__button bg-green-400 disabled:bg-green-400/70"
          disabled={isDisabled}
        >
          Submit
        </DefaultButton>
        <DefaultButton
          aria-label="Cancel edit data"
          onClick={handleCancelEdit}
          addClassName="table__button bg-red-500 disabled:bg-red-500/70"
        >
          Cancel
        </DefaultButton>
      </>
    );
  }
  
  if (deleteId === itemId && editingId !== itemId) {
    return (
      <>
        <DefaultButton
          aria-label="Confirm delete data"
          onClick={handleConfirmDelete}
          disabled={isDisabled}
          addClassName="table__button bg-green-400  disabled:bg-green-400/70"
        >
          Confirm
        </DefaultButton>
        <DefaultButton
          aria-label="Cancel delete data"
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
        aria-label="Click to edit"
        onClick={handleEditClick}
        addClassName="table__button bg-yellow-300 disabled:bg-yellow-300/70 "
      >
        Edit
      </DefaultButton>
      <DefaultButton
        aria-label="Click to delete"
        onClick={handleDeleteClick}
        addClassName="table__button bg-red-500 disabled:bg-red-500/70"
      >
        Delete
      </DefaultButton>
    </>
  );
}

export default TableRowAction;
