import { useAtom } from "jotai";
import { showToast } from "style/toast";

import useCancelToken from "hook/useCancelToken";

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

function useUsers() {
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

  const handleAddUser = async ({
    email,
    password,
    userName,
    role,
    last_op_id,
  }: AddUserType): Promise<boolean> => {
    const missingFields: string[] = [];
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!userName) missingFields.push("user name");
    if (!role) missingFields.push("user role");
    if (!last_op_id) missingFields.push("register");

    if (missingFields.length) {
      showToast("error", `Missing fields: ${missingFields.join(", ")}`);
      return false;
    }

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
    const missingFields: string[] = [];
    if (!userId) missingFields.push("user id");
    if (!last_op_id) missingFields.push("register");

    if (missingFields.length) {
      showToast("error", `Missing fields: ${missingFields.join(", ")}`);
      return false;
    }

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

  const handleDeleteUser = async (
    user_id: string,
    userName: string
  ): Promise<boolean> => {
    const missingFields: string[] = [];
    if (!user_id) missingFields.push("user id");
    if (!userName) missingFields.push("user name");

    if (missingFields.length) {
      showToast("error", `Missing fields: ${missingFields.join(", ")}`);
      return false;
    }
    
    try {
      const success = await deleteUser({ id: user_id });
      if (success) {
        showToast("success", `${userName} deleted successfully!`);
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

export default useUsers;
