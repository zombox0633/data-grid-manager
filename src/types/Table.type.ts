export type LoadDataType<T> = () => [T[] | null, string | null];

export type HeaderType<T> = {
  key: keyof T;
  label: string;
  editable: boolean;
};

export type GenericItemType<T> = {
  header: HeaderType<T>;
  item: T;
};

export interface tableRowItemId {
  id: string;
  last_op_id:           string;
  created_timestamp:    Date;
  lastupdate_timestamp: Date;
}

