import { ChangeEvent } from "react";
import { Pagination } from "@mui/material";
import { GridPagination } from "@mui/x-data-grid";

import { usePaginationStore } from "../../store/paginationStore";

const CustomPagination = () => {
  const {
    pageCount,
    currentPage,
    setCurrentPage,
    selectedLimit,
    setSelectedLimit,
    limitArray,
  } = usePaginationStore();

  const PaginationList = () => {
    return (
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={(_e: unknown, newPage) => setCurrentPage(newPage)}
        showFirstButton
        showLastButton
      />
    );
  };

  return (
    <GridPagination
      ActionsComponent={PaginationList}
      labelRowsPerPage=""
      labelDisplayedRows={() => ""}
      onPageChange={(_e: unknown, newPage) => setCurrentPage(newPage)}
      rowsPerPage={selectedLimit}
      onRowsPerPageChange={(
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        setSelectedLimit(Number(e.target.value));
        setCurrentPage(1);
      }}
      rowsPerPageOptions={limitArray}
    />
  );
};

export default CustomPagination;
