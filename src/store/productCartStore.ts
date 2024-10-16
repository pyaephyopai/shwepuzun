import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ProductCartStore {
  products: Product[];
  timestamp: number;
  setProduct: (product: Product[], timestamp: number) => void;
  clearProduct: () => void;
}

export const useProductCartStore = create<ProductCartStore>()(
  devtools(
    persist<ProductCartStore>(
      (set) => ({
        products: [],
        timestamp: 0,
        setProduct: (product: Product[], timestamp: number) =>
          set({ products: product, timestamp: timestamp }),
        clearProduct: () =>
          set({ products: [], timestamp: new Date().getTime() }),
      }),
      {
        name: "product",
      }
    )
  )
);
