export interface RegisterType {
  data: RegisterDataType;
}

export interface RegisterDataType {
  id:                   string;
  email:                string;
  password:             string;
  name:                 string;
  role:                 string;
  last_op_id:           string;
  created_timestamp:    Date;
  lastupdate_timestamp: Date;
}