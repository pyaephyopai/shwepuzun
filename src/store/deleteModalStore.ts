import { create } from "zustand";

interface DeleteModalStore {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: number | null;
  setId: (id: number | null) => void;
  isConfirm: boolean;
  setIsConfirm: (isConfirm: boolean) => void;
}

export const deleteModalStore = create<DeleteModalStore>((set) => ({
  id: null,
  open: false,
  isConfirm: false,
  setId: (id: number | null) => set({ id: id }),
  setOpen: (open: boolean) => set({ open: open }),
  setIsConfirm: (isConfirm: boolean) => set({ isConfirm: isConfirm }),
}));
