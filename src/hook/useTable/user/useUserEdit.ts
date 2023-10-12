import { useCallback } from "react";
import { useAtom } from "jotai";

import useUsersActions from "hook/useDataTable/user/useUsersActions";
import { registerAtom } from "atoms/registerAtom";
import { isDisabledAtom } from "atoms/table/tableAtom";
import { ActionState } from "types/Table.type";

type UserDataToEditType = {
  id: string;
  name?: string;
  role?: string;
};

type useUserEditType<T> = {
  user: T;
  editingValues: Partial<T>;
  setEditingValues: React.Dispatch<React.SetStateAction<Partial<T>>>;
  setActionState: React.Dispatch<React.SetStateAction<ActionState>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useUserEdit<T extends UserDataToEditType>({
  user,
  editingValues,
  setEditingValues,
  setActionState,
  setRefreshKey,
}: useUserEditType<T>) {
  const [register] = useAtom(registerAtom);
  const [, setIsDisabled] = useAtom(isDisabledAtom);

  const { handleUpdateUsers } = useUsersActions();

  const handleConfirmEdit = useCallback(async () => {
    setIsDisabled(true);
    const success = await handleUpdateUsers({
      userId: user.id ?? "",
      userName: editingValues.name ?? user.name,
      role: editingValues.role,
      last_op_id: register?.data.id ?? "",
    });

    if (success) {
      setActionState({ type: null, id: null });
      setEditingValues({});
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [
    editingValues,
    user,
    register?.data.id,
    handleUpdateUsers,
    setActionState,
    setEditingValues,
    setRefreshKey,
    setIsDisabled,
  ]);

  return {
    handleConfirmEdit,
  };
}

export default useUserEdit;
