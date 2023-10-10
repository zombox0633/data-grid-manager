import { useCallback } from "react";
import { ActionState } from "types/Table.type";

type useTableRowClickHandlerType<T> = {
  itemId: string;
  actionState: ActionState;
  setActionState: React.Dispatch<React.SetStateAction<ActionState>>;
  setEditingValues: React.Dispatch<React.SetStateAction<Partial<T>>>;
};

function useTableRowClickHandler<T>({
  itemId,
  actionState,
  setActionState,
  setEditingValues,
}: useTableRowClickHandlerType<T>) {
  const handleEditClick = useCallback(() => {
    setActionState({ type: "edit", id: itemId });
  }, [itemId, setActionState]);

  const handleCancelEdit = useCallback(() => {
    if (actionState.type === "edit") {
      setActionState({ type: null, id: null });
      setEditingValues({});
    }
  }, [actionState.type, setActionState, setEditingValues]);

  const handleDeleteClick = useCallback(() => {
    setActionState({ type: "delete", id: itemId });
  }, [itemId, setActionState]);

  const handleCancelDelete = useCallback(() => {
    if (actionState.type === "delete") setActionState({ type: null, id: null });
  }, [actionState.type, setActionState]);

  return {
    handleEditClick,
    handleCancelEdit,
    handleDeleteClick,
    handleCancelDelete,
  };
}

export default useTableRowClickHandler;
