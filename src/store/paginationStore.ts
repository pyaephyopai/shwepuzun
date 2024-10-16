import { create } from "zustand";

interface PaginationProps {
  pageCount: number;
  setPageCount: (page: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedLimit: number;
  setSelectedLimit: (selected: number) => void;
  limitArray: number[];
}

export const usePaginationStore = create<PaginationProps>((set) => ({
  pageCount: 0,
  setPageCount: (pageCount: number) => set({ pageCount: pageCount }),
  currentPage: 1,
  setCurrentPage: (currentPage: number) => set({currentPage: currentPage}),
  selectedLimit: 10,
  setSelectedLimit: (selectedLimit: number) => set({selectedLimit: selectedLimit}),
  limitArray: [10, 25, 50, 100],
}));
