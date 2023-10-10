export type LoadDataType<T> = () => [T[] | null, null | string ];

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

type ActionType = "edit" | "delete" | null;

export type ActionState = {
  type: ActionType
  id: string | null
}