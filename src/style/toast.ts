import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const toastSuccess = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
} as const;

export const toastError = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
} as const;

export const showToast = (
  type: "success" | "error",
  message: string | null
) => {
  if (type === "success") {
    toast.success(message, toastSuccess);
  } else {
    toast.error(message, toastError);
  }
};