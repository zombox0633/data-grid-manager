import { ProductsDataType } from "api/products/products.type";
import { HeaderType } from "types/Table.type";

export type ProductValuesType = Partial<ProductsDataType>;
//Partial คือการระบุบ properties ที่จะใช้แค่บางส่วน

export const productHeaders: HeaderType<ProductsDataType>[] = [
  { key: "name", label: "name", editable: true },
  { key: "category_id", label: "category", editable: true },
  { key: "price", label: "price", editable: true },
  { key: "quantity", label: "quantity", editable: true },
  { key: "last_op_id", label: "latest Update", editable: false },
  { key: "created_timestamp", label: "created Timestamp", editable: false },
  {
    key: "lastupdate_timestamp",
    label: "lastUpdate Timestamp",
    editable: false,
  },
];
