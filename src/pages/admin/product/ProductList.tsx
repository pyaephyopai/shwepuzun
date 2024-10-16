import { useContext, useEffect, useState } from "react";
import { useDebouncedSearch } from "../../../hooks/useDebouncedSearch";
import { deleteModalStore } from "../../../store/deleteModalStore";
import { usePaginationStore } from "../../../store/paginationStore";
import { SortModelContext } from "../../../context/SortModel";
import { useHandleSortModelChange } from "../../../utils/sortUtils";
import { deleteProduct, getAllProducts } from "../../../api/ProductService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import {
  AddRounded,
  DeleteRounded,
  FilterAltRounded,
  SearchRounded,
} from "@mui/icons-material";
import Edit from "../../../components/dataTable/Edit";
import AdminTitle from "../../../components/typography/AdminTitle";
import NormalButton from "../../../components/button/NormalButton";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/pagination/CustomPagination";
import { alertStore } from "../../../store/alertStore";

type Params = {
  search?: string;
  sort_by?: string;
  sort_order?: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  category_id: number;
  description: string;
  average_rating: number;
  max_rating: number;
  image: string;
  image_url: string;
  is_hot_product: string;
};

const ProductList = () => {
  const [paramString, setParamString] = useState<string>("");

  const { searchText, handleInputChange, handleKeyDown, triggerSearch } =
    useDebouncedSearch(300);

  const { setOpen, setId, id, isConfirm, setIsConfirm } = deleteModalStore();

  const { setAlert } = alertStore();

  const {
    setPageCount,
    setCurrentPage,
    setSelectedLimit,
    currentPage,
    selectedLimit,
  } = usePaginationStore();

  const { sortBy, sortOrder } = useContext(SortModelContext);

  const handleSortModelChange = useHandleSortModelChange();

  const {
    isLoading,
    isFetching,
    refetch,
    data: productList = [],
  } = useQuery<Product[]>({
    queryKey: ["product-list", currentPage, selectedLimit, paramString],
    queryFn: async () =>
      await getAllProducts(currentPage, selectedLimit, paramString).then(
        (response) => {
          if (response.data.code === 200) {
            setCurrentPage(1);
            setSelectedLimit(10);
            setPageCount(response.data.meta.last_page);
            return response.data.data;
          }
        }
      ),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (value: number) =>
      await deleteProduct(value).then((response) => {
        if (response.data.code === 200) {
          refetch();
          setIsConfirm(false);
          setId(null);
          setAlert(true, response.data.message, "success");
        }

        setOpen(false);
      }),
  });

  useEffect(() => {
    if (isConfirm && id) {
      mutateAsync(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirm, id]);

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

  const productCloumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "category_name",
      headerName: "Category",
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
      field: "image_url",
      headerName: "Image",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <Box component="img" src={params.row.image_url} alt="THis is Image" />
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
      <AdminTitle text="Product List" />
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
            </Box>
            <FilterAltRounded />
          </Box>
          <Link to="create">
            <NormalButton text="Create" type="contained" icon={AddRounded} />
          </Link>
        </Box>

        <Box>
          <DataGrid
            rows={productList}
            columns={productCloumns}
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

export default ProductList;
