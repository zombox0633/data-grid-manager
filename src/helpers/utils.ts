import axios, { CancelTokenSource } from "axios";

export const createCancelToken = ():CancelTokenSource => {
  return axios.CancelToken.source()
}

export const getCancelMessage = (action: string):string => {
  return `Request was cancelled due to ${action} reset.`
}