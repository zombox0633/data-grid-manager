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

export const toastWarning = {
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
  type: "success" | "error" | "warning",
  message: string | null
) => {
  if (type === "success") {
    return toast.success(message, toastSuccess);
  }
  if (type === "warning") {
    return toast.warning(message, toastWarning);
  } else {
    return toast.error(message, toastError);
  }
};
