import { CategoryDataType } from "api/category/category.type";
import { HeaderType } from "types/Table.type";

export type CategoryValuesType = Partial<CategoryDataType>;

export const CategoryHeaders: HeaderType<CategoryDataType>[] = [
  // { key: "id", label: "id", editable: false },
  { key: "name", label: "name", editable: true },
  { key: "last_op_id", label: "latest Update", editable: false },
  { key: "created_timestamp", label: "created Timestamp", editable: false },
  { key: "lastupdate_timestamp", label: "lastUpdate Timestamp", editable: false },

];