import { useState } from "react";
import DataTable from "../dataTable/DataTable";

import useGetUsers from "hook/useDataTable/user/useGetUsers";

import { UserHeaders } from "src/constraint/USERS_TABLE";
import { UserDataType } from "api/user/users.type";

function UsersTable() {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { loadUserData } = useGetUsers(refreshKey);
  return (
    <div>
      <DataTable<UserDataType>
        nameTable={"Users"}
        loadData={loadUserData}
        tableHeaders={UserHeaders}
        setRefreshKey={setRefreshKey}
      />
    </div>
  );
}

export default UsersTable;
