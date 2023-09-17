import { ProductsDataType } from "api/products/products.type";

export type ProductHeaderType = {
  key: keyof ProductsDataType;
  label: string;
  editable: boolean;
}

export const productHeaders: ProductHeaderType[] = [
  { key: "name", label: "name", editable: true },
  { key: "category_id", label: "category", editable: true },
  { key: "price", label: "price", editable: true },
  { key: "quantity", label: "quantity", editable: true },
  { key: "last_op_id", label: "latest Update", editable: false },
];