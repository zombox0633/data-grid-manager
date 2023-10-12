import { useAtom } from "jotai";
import { showToast } from "style/toast";

import useCancelToken from "hook/useCancelToken";
import useErrorHandlerApi from "hook/useErrorHandlerApi";

import {
  addUsersAtom,
  addUsersCancelTokenAtom,
  addUsersErrorAtom,
} from "atoms/userAtom/addUsersAtom";
import {
  updateUsersAtom,
  updateUsersCancelTokenAtom,
  updateUsersErrorAtom,
} from "atoms/userAtom/updateUsersAtom";
import {
  deleteUsersAtom,
  deleteUsersCancelTokenAtom,
  deleteUsersErrorAtom,
} from "atoms/userAtom/deleteUsersAtom";

type AddUserType = {
  email: string;
  password: string;
  userName: string;
  role: string;
  last_op_id: string;
};

type UpdateUserType = {
  userId: string;
  userName?: string;
  role?: string;
  last_op_id: string;
};

function useUsersActions() {
  const [, addUsers] = useAtom(addUsersAtom);
  const [addUsersError] = useAtom(addUsersErrorAtom);
  const [addUsersCancel] = useAtom(addUsersCancelTokenAtom);

  const [, updateUsers] = useAtom(updateUsersAtom);
  const [updateUsersError] = useAtom(updateUsersErrorAtom);
  const [updateUsersCancel] = useAtom(updateUsersCancelTokenAtom);

  const [, deleteUser] = useAtom(deleteUsersAtom);
  const [deleteUserError] = useAtom(deleteUsersErrorAtom);
  const [deleteUserCancel] = useAtom(deleteUsersCancelTokenAtom);

  useCancelToken(addUsersCancel);
  useCancelToken(updateUsersCancel);
  useCancelToken(deleteUserCancel);

  useErrorHandlerApi(addUsersError);
  useErrorHandlerApi(updateUsersError);
  useErrorHandlerApi(deleteUserError);

  const handleAddUser = async ({
    email,
    password,
    userName,
    role,
    last_op_id,
  }: AddUserType): Promise<boolean> => {
    try {
      const success = await addUsers({
        email,
        password,
        name: userName,
        role,
        last_op_id,
      });
      if (success) {
        showToast("success", `${userName} added successfully!`);
        return true;
      }
      throw new Error(`Add failed for : ${addUsersError}`);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleUpdateUsers = async ({
    userId,
    userName,
    role,
    last_op_id,
  }: UpdateUserType): Promise<boolean> => {
    try {
      const success = await updateUsers({
        id: userId,
        name: userName,
        role,
        last_op_id,
      });
      if (success) {
        showToast("success", `${userName} updated successfully!`);
        return true;
      }
      throw new Error(`Update failed for : ${updateUsersError}`);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleDeleteUser = async (user_id: string): Promise<boolean> => {
    try {
      const success = await deleteUser({ id: user_id });
      if (success) {
        showToast("success", `${user_id} deleted successfully!`);
        return true;
      }
      throw new Error(`Delete failed for : ${deleteUserError}`);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    handleAddUser,
    handleUpdateUsers,
    handleDeleteUser,
  };
}

export default useUsersActions;
