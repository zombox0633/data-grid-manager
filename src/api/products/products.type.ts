export interface ProductsType {
  data: ProductsDataType[];
}

export interface ProductsDataType {
  id:                   string;
  name:                 string;
  category_id:          string;
  price:                number;
  quantity:             number;
  last_op_id:           string;
  created_timestamp:    Date;
  lastupdate_timestamp: Date;
}
