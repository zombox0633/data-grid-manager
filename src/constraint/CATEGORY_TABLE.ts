import { CategoryDataType } from "api/category/category.type";

export type CategoryHeaderType = {
  key: keyof CategoryDataType;
  label: string;
  editable: boolean;
}

export const CategoryHeaders: CategoryHeaderType[] = [
  { key: "id", label: "id", editable: false },
  { key: "name", label: "name", editable: true },
  { key: "last_op_id", label: "latest Update", editable: false },
  { key: "created_timestamp", label: "created Timestamp", editable: false },
  { key: "lastupdate_timestamp", label: "lastUpdate Timestamp", editable: false },

];