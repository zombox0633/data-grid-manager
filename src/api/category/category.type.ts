export interface CategoryType {
  data: CategoryDataType[];
}

export interface CategoryDataType {
  id:                   string;
  name:                 string;
  last_op_id:           string;
  created_timestamp:    Date;
  lastupdate_timestamp: Date;
}