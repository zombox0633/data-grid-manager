export interface APIErrorType {
  status?: number;
  name?: string;
  message?: string;
  details?: object | null;
}

export interface APIResponseErrorType {
  data?: null;
  error?: APIErrorType;
}
