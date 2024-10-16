import { ReactNode, useState } from "react";
import { createContext } from "react";

interface SortModelProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

const defaultValue: SortModelProps = {
  sortBy: "",
  setSortBy: () => {
    console.warn("SetSortBy function is not wrapped in a SortModelProvider");
  },
  sortOrder: "",
  setSortOrder: () => {
    console.warn("setSortOrder function is not wrapped in a SortModelProvider");
  },
};

export const SortModelContext = createContext<SortModelProps>(defaultValue);

interface SortModelProviderProps {
  children: ReactNode;
}

export const SortModelProvider = ({ children }: SortModelProviderProps) => {
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  return (
    <SortModelContext.Provider
      value={{ sortBy, setSortBy, sortOrder, setSortOrder }}
    >
      {children}
    </SortModelContext.Provider>
  );
};
