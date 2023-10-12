import { UserDataType } from "api/user/users.type";
import { HeaderType } from "types/Table.type";

export type UserValuesType = Partial<UserDataType>;

export const UserHeaders: HeaderType<UserDataType>[] = [
  { key: "id", label: "id", editable: false },
  { key: "email", label: "email", editable: false },
  { key: "name", label: "name", editable: true },
  { key: "role", label: "role", editable: true },
  { key: "last_op_id", label: "latest Update", editable: false },
  { key: "created_timestamp", label: "created Timestamp", editable: false },
  { key: "lastupdate_timestamp", label: "lastUpdate Timestamp", editable: false },

];