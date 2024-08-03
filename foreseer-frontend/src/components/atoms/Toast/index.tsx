import { toast } from "react-toastify";

export const notify = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        background: "#13161F",
        color: "white",
      },
    });
  },
  error: (message: string) => {
    toast.error(message, {
      style: {
        background: "#13161F",
        color: "white",
      },
    });
  },
  info: (message: string) => {
    toast.info(message, {
      style: {
        background: "#13161F",
        color: "white",
      },
    });
  },
  warn: (message: string) => {
    toast.warn(message, {
      style: {
        background: "#13161F",
        color: "white",
      },
    });
  },
};
