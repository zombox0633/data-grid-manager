import { useState } from "react";
import TableManagement from "../management/TableManagement";
import useGetUsers from "hook/useDataTable/user/useGetUsers";
import { UserHeaders } from "src/constraint/USERS_TABLE";
import { UserDataType } from "api/user/users.type";

function UsersManagement() {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { loadUserData } = useGetUsers(refreshKey);
  return (
    <>
      <TableManagement<UserDataType>
        tableName="User"
        itemHeaders={UserHeaders}
        loadData={loadUserData}
        setRefreshKey={setRefreshKey}
      />
    </>
  );
}

export default UsersManagement;
