import axios from "axios";
import * as dayjs from "dayjs";
import jwtDecode from "jwt-decode";

const axiosApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosApiInstance.interceptors.request.use(
  (config) => {
    const secret = localStorage.getItem("secret");
    if (secret) {
      const jwtData = jwtDecode<{ id: string; iat: number; exp: number }>(
        secret
      );

      //Check is expired.
      const isExpired = dayjs.unix(jwtData.exp).diff(dayjs()) < 1;
      if (!isExpired) {
        config.headers["Authorization"] = `Bearer ${secret}`;
        return config;
      } else {
        localStorage.removeItem("secret");
      }
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const client = axiosApiInstance;
export default client;
