import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  AddRounded,
  DeleteRounded,
  FilterAltRounded,
  SearchRounded,
} from "@mui/icons-material";

import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import NormalButton from "../../../components/button/NormalButton";
import AdminTitle from "../../../components/typography/AdminTitle";
import CustomPagination from "../../../components/pagination/CustomPagination";

import Edit from "../../../components/dataTable/Edit";
import { SortModelContext } from "../../../context/SortModel";
import { deleteBlog, getAllBlogs } from "../../../api/blogService";
import { deleteModalStore } from "../../../store/deleteModalStore";
import { useHandleSortModelChange } from "../../../utils/sortUtils";
import { usePaginationStore } from "../../../store/paginationStore";
import { useDebouncedSearch } from "../../../hooks/useDebouncedSearch";
import { alertStore } from "../../../store/alertStore";

type Blog = {
  id: string;
  title: string;
  description: string;
  attachments: {
    id: number;
    name: string;
    attachment_url: string;
  }[];
};

type Params = {
  search?: string;
  sort_by?: string;
  sort_order?: string;
};

const BlogList = () => {
  const [paramString, setParamString] = useState<string>("");

  const { searchText, handleInputChange, handleKeyDown, triggerSearch } =
    useDebouncedSearch(300);

  const { setAlert } = alertStore();

  const { setOpen, setId, id, isConfirm, setIsConfirm } = deleteModalStore();

  const { setPageCount, currentPage, selectedLimit } = usePaginationStore();

  const { sortBy, sortOrder } = useContext(SortModelContext);

  const handleSortModelChange = useHandleSortModelChange();

  const {
    isLoading,
    isFetching,
    refetch,
    data: blogList = [],
  } = useQuery<Blog[]>({
    queryKey: ["blog-list", currentPage, selectedLimit, paramString],
    queryFn: async () =>
      await getAllBlogs(currentPage, selectedLimit, paramString).then(
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

  useEffect(() => {
    if (isConfirm && id) {
      mutateAsync(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirm, id]);

  const { mutateAsync } = useMutation({
    mutationFn: async (value: number) =>
      await deleteBlog(value).then((response) => {
        if (response.data.code === 200) {
          refetch();
          setIsConfirm(false);
          setId(null);
          setAlert(true, response.data.message, "success");
        }

        setOpen(false);
      }),
  });

  const blogColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "attachment_url",
      headerName: "Images",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <Box
            component="img"
            src={params.row.attachments?.[0]?.attachment_url}
            alt="THis is Image"
          />
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      maxWidth: 200,

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
      <AdminTitle text="Blog List" />
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
            rows={blogList}
            columns={blogColumns}
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

export default BlogList;
