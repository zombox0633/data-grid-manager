import { useAtom } from "jotai";
import DefaultButton from "components/button/DefaultButton";

import useTableRowClickHandler from "hook/useTable/product/useTableRowClickHandler";

import { isDisabledAtom } from "atoms/table/tableAtom";
import { ActionState } from "types/Table.type";

type TableRowActionType<T> = {
  itemId: string;
  actionState: ActionState;
  handleConfirmEdit: () => void;
  handleConfirmDelete: () => void;
  setActionState: React.Dispatch<React.SetStateAction<ActionState>>;
  setEditingValues: React.Dispatch<React.SetStateAction<Partial<T>>>;
};

function TableRowAction<T>({
  itemId,
  actionState,
  handleConfirmEdit,
  handleConfirmDelete,
  setEditingValues,
  setActionState,
}: TableRowActionType<T>) {
  const [isDisabled] = useAtom(isDisabledAtom);

  const {
    handleEditClick,
    handleCancelEdit,
    handleDeleteClick,
    handleCancelDelete,
  } = useTableRowClickHandler({
    itemId,
    actionState,
    setActionState,
    setEditingValues,
  });

  if (actionState.type === "edit" && actionState.id === itemId) {
    return (
      <>
        <DefaultButton
          aria-label="Confirm edit data"
          onClick={handleConfirmEdit}
          disabled={isDisabled}
          addClassName="table__button bg-green-400 disabled:bg-green-400/70"
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

  if (actionState.type === "delete" && actionState.id === itemId) {
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
