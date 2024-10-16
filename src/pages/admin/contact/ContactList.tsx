import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  AddRounded,
  FilterAltRounded,
  SearchRounded,
} from "@mui/icons-material";

import { Box, InputAdornment, Paper, TextField } from "@mui/material";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import NormalButton from "../../../components/button/NormalButton";
import AdminTitle from "../../../components/typography/AdminTitle";
import CustomPagination from "../../../components/pagination/CustomPagination";

import { SortModelContext } from "../../../context/SortModel";
import { useHandleSortModelChange } from "../../../utils/sortUtils";
import { usePaginationStore } from "../../../store/paginationStore";
import { useDebouncedSearch } from "../../../hooks/useDebouncedSearch";
import { getAllContacts } from "../../../api/contactService";

type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
};

type Params = {
  search?: string;
  sort_by?: string;
  sort_order?: string;
};

const ContactList = () => {
  const [paramString, setParamString] = useState<string>("");

  const { searchText, handleInputChange, handleKeyDown, triggerSearch } =
    useDebouncedSearch(300);

  const { setPageCount, currentPage, selectedLimit } = usePaginationStore();

  const { sortBy, sortOrder } = useContext(SortModelContext);

  const handleSortModelChange = useHandleSortModelChange();

  const {
    isLoading,
    isFetching,
    data: contactList = [],
  } = useQuery<Contact[]>({
    queryKey: ["contact-list", currentPage, selectedLimit, paramString],
    queryFn: async () =>
      await getAllContacts(currentPage, selectedLimit, paramString).then(
        (response) => {
          if (response.data.code === 200) {
            setPageCount(response.data.meta.last_page);
            return response.data.data;
          }
        }
      ),
  });

  useEffect(() => {
    const createParamString = () => {
      const params: Params = {};
      if (typeof searchText === "string") {
        params.search = searchText;
      }

      if (typeof sortOrder === "string") {
        params.sort_order = sortOrder;
      }

      if (typeof sortBy === "string") {
        params.sort_by = sortBy;
      }

      const newParamString = new URLSearchParams(params).toString();
      setParamString(newParamString);
    };
    createParamString();
  }, [searchText, sortBy, sortOrder]);

  const contactColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 2,
    },
    {
      field: "message",
      headerName: "Message",
      minWidth: 100,
      flex: 1,
    },
  ];

  return (
    <>
      <AdminTitle text="Contact us List" />
      <Paper
        elevation={5}
        sx={{
          paddingX: 2,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingTop={2}
        >
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Box display="flex" justifyContent="center" alignItems="center">
              <TextField
                label="Search"
                size="small"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded />
                    </InputAdornment>
                  ),
                }}
              />
              <NormalButton
                text="Search"
                type="contained"
                onClick={triggerSearch}
              />

              {/* <Button sx={{ ml: 2 }} variant="contained" onClick={triggerSearch}>
            Export
          </Button> */}
            </Box>
            <FilterAltRounded />
          </Box>
          <Link to="create">
            <NormalButton text="Create" type="contained" icon={AddRounded} />
          </Link>
        </Box>

        <Box>
          <DataGrid
            rows={contactList}
            columns={contactColumns}
            loading={isLoading || isFetching}
            sx={{
              borderLeft: 0,
              borderRight: 0,

              ".MuiCircularProgress-svg": {
                color: "#000",
              },
            }}
            autoHeight={true}
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            disableVirtualization
            hideFooterSelectedRowCount
            rowSelection
            keepNonExistentRowsSelected
            slots={{
              pagination: CustomPagination,
            }}
            onSortModelChange={handleSortModelChange}
          />
        </Box>
      </Paper>
    </>
  );
};

export default ContactList;
