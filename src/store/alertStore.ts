import { AlertColor } from "@mui/material";
import { create } from "zustand";

interface AlertStore {
  alert: {
    open: boolean,
    message: string,
    type: AlertColor,
  },
  setOpen: (open: boolean) => void;
  setAlert: (open: boolean, message: string, type: string) => void;
}

export const alertStore = create<AlertStore>((set) => ({
  alert: {
    open: false,
    message: "",
    type: "info",
  },
  setOpen: (open: boolean) => set((state) => ({
    alert: { ...state.alert, open: open }
  })),
  setAlert: (open: boolean, message: string, type: string) => set({
    alert: {
      ...alert,
      open: open,
      message: message,
      type: type as AlertColor,
    }
  })
}))