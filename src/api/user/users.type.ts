export interface UserType {
  data: UserDataType[];
}

export interface UserDataType {
  id:                   string;
  email:                string;
  password:             string;
  name:                 string;
  role:                 string;
  last_op_id:           string;
  created_timestamp:    Date;
  lastupdate_timestamp: Date;
}
