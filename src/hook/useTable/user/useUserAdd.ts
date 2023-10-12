import { useCallback } from "react";
import { useAtom } from "jotai";

import useUsersActions from "hook/useDataTable/user/useUsersActions";
import { registerAtom } from "atoms/registerAtom";
import { isDisabledAtom } from "atoms/table/tableAtom";
import { UserValuesType } from "src/constraint/USERS_TABLE";

type useUserAddType<T> = {
  newItem: UserValuesType;
  setNewItem: React.Dispatch<React.SetStateAction<Partial<T>>>;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

function useUserAdd<T>({
  newItem,
  setNewItem,
  setRefreshKey,
}: useUserAddType<T>) {
  const [register] = useAtom(registerAtom);
  const [, setIsDisabled] = useAtom(isDisabledAtom);

  const { handleAddUser } = useUsersActions();

  const addUser = useCallback(async () => {
    setIsDisabled(true);
    const success = await handleAddUser({
      email: newItem.email ?? "",
      password: newItem.password ?? "",
      userName: newItem.name ?? "",
      role: newItem.role ?? "",
      last_op_id: register?.data.id ?? "",
    });

    if (success) {
      setNewItem({});
      setRefreshKey((prevKey) => prevKey + 1);
    }
    setIsDisabled(false);
  }, [
    newItem,
    register?.data.id,
    handleAddUser,
    setIsDisabled,
    setNewItem,
    setRefreshKey,
  ]);

  return {
    addUser,
  };
}

export default useUserAdd;
