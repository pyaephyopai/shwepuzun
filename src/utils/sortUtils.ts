import { GridSortModel } from "@mui/x-data-grid";
import { useContext } from "react";
import { SortModelContext } from "../context/SortModel";

export const useHandleSortModelChange = () => {
  const { setSortBy, setSortOrder } = useContext(SortModelContext);

  const handleSortModelChange = (sortModel: GridSortModel) => {
    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      if (sort) {
        setSortBy(field);
        setSortOrder(sort);
      }
    }
  };

  return handleSortModelChange;
};
