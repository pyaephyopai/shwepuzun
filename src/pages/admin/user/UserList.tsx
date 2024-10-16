import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  AddRounded,
  CheckCircleRounded,
  DeleteRounded,
  FilterAltRounded,
  RemoveCircleRounded,
  SearchRounded,
} from "@mui/icons-material";

import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Chip,
} from "@mui/material";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { deleteUser, getAllUsers } from "../../../api/userService";

import NormalButton from "../../../components/button/NormalButton";
import AdminTitle from "../../../components/typography/AdminTitle";
import CustomPagination from "../../../components/pagination/CustomPagination";

import { SortModelContext } from "../../../context/SortModel";
import { deleteModalStore } from "../../../store/deleteModalStore";
import { useHandleSortModelChange } from "../../../utils/sortUtils";
import { usePaginationStore } from "../../../store/paginationStore";
import { useDebouncedSearch } from "../../../hooks/useDebouncedSearch";
import Edit from "../../../components/dataTable/Edit";
import { alertStore } from "../../../store/alertStore";

type User = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  gender: string | null;
  address: string | null;
  region: string | null;
  role: string | null;
};

type Params = {
  search?: string;
  sort_by?: string;
  sort_order?: string;
};

const UserList = () => {
  const [paramString, setParamString] = useState<string>("");

  const { searchText, handleInputChange, handleKeyDown, triggerSearch } =
    useDebouncedSearch(300);

  const { setAlert } = alertStore();

  const { setOpen, setId, id, isConfirm, setIsConfirm } = deleteModalStore();

  const { setPageCount, currentPage, selectedLimit } = usePaginationStore();

  const { sortBy, sortOrder } = useContext(SortModelContext);

  const handleSortModelChange = useHandleSortModelChange();

  useEffect(() => {
    if (isConfirm && id) {
      mutateAsync(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirm, id]);

  const {
    isLoading,
    isFetching,
    refetch,
    data: usersList = [],
  } = useQuery<User[]>({
    queryKey: ["users-list", currentPage, selectedLimit, paramString],
    queryFn: async () =>
      await getAllUsers(currentPage, selectedLimit, paramString).then(
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

  const { mutateAsync } = useMutation({
    mutationFn: async (value: number) =>
      await deleteUser(value).then((response) => {
        if (response.data.code === 200) {
          refetch();
          setIsConfirm(false);
          setId(null);

          setAlert(true, response.data.message, "success");
        }

        setOpen(false);
      }),
  });

  const userColumns: GridColDef[] = [
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
      field: "phone_number",
      headerName: "Phone Number",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <>{params.row.gender === 1 ? "Male" : "Female"}</>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "region",
      headerName: "Region",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "account_status",
      headerName: "Account Status",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          {params.row.account_status ? (
            <>
              <CheckCircleRounded fontSize="small" color="success" />
            </>
          ) : (
            <>
              <RemoveCircleRounded fontSize="small" color="disabled" />
            </>
          )}
        </>
      ),
    },
    {
      field: "role_id",
      headerName: "Role",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          sx={{
            height: "25px",

            borderRadius: "6px",
          }}
          label={params.row.role_id === 1 ? "Admin" : "User"}
          color={params.row.role_id === 1 ? "secondary" : "tertiary"}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <>
          <Box
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Edit link={`${params.row.id}`} />

            <IconButton
              onClick={() => (setOpen(true), setId(params.row.id))}
              aria-label="edit"
            >
              <DeleteRounded color="secondary" />
            </IconButton>
          </Box>
        </>
      ),
    },
  ];

  return (
    <>
      <AdminTitle text="User List" />
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
            rows={usersList}
            columns={userColumns}
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

export default UserList;
