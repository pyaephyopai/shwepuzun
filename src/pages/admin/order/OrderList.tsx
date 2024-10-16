import { useQuery } from "@tanstack/react-query";

import { changeOrderStatus, getAllOrderList } from "../../../api/OrderService";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import {
  CancelRounded,
  CheckCircleRounded,
  Close,
  DoDisturbOnRounded,
  FilterAltRounded,
  PendingRounded,
  SearchRounded,
} from "@mui/icons-material";
import AdminTitle from "../../../components/typography/AdminTitle";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { useHandleSortModelChange } from "../../../utils/sortUtils";
import { SortModelContext } from "../../../context/SortModel";
import { useDebouncedSearch } from "../../../hooks/useDebouncedSearch";
import { usePaginationStore } from "../../../store/paginationStore";
import CustomPagination from "../../../components/pagination/CustomPagination";
import NormalButton from "../../../components/button/NormalButton";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Radio } from "@mui/material";
import CancelButton from "../../../components/button/CancelButton";

type Params = {
  search?: string;
  sort_by?: string;
  sort_order?: string;
};

const OrderList = () => {
  const navigate = useNavigate();

  const { sortBy, sortOrder } = useContext(SortModelContext);

  const [paramString, setParamString] = useState<string>("");

  const { searchText, handleInputChange, handleKeyDown, triggerSearch } =
    useDebouncedSearch(300);

  const handleSortModelChange = useHandleSortModelChange();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const {
    setPageCount,
    setCurrentPage,
    setSelectedLimit,
    currentPage,
    selectedLimit,
  } = usePaginationStore();

  const {
    data: orderList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["order-list", paramString, currentPage, selectedLimit],
    queryFn: async () =>
      await getAllOrderList(currentPage, selectedLimit, paramString).then(
        (response) => {
          if (response.data.code === 200) {
            setCurrentPage(1);
            setSelectedLimit(10);
            setPageCount(response.data.meta.last_page);
            return response.data;
          }
        }
      ),
  });

  const handleChangeOrderStatus = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setOpen(true);
  };

  const { handleBlur, handleChange, handleSubmit } = useFormik<OrderStatus>({
    initialValues: {
      status: undefined,
    },
    validationSchema: "",
    onSubmit: async (value) => {
      if (selectedId) {
        await changeOrderStatus(selectedId, value).then((response) => {
          if (response.data.code === 201) {
            refetch();
            setSelectedId(undefined);
          }
        });
      }
      setOpen(false);
    },
  });

  const handleChangeStatus = (e, id: number, status: number) => {
    if (status === 1) {
      handleChangeOrderStatus(e), setSelectedId(id);
    }
  };

  const orderColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "order_code",
      headerName: "Order Code",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "order_detail_total",
      headerName: "Order Total Product",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "notes",
      headerName: "Notes",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "payment_type",
      headerName: "Payment Type",
      minWidth: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Chip
            label={
              params.row.payment_type === 1
                ? "Cash on Delivery"
                : params.row.payment_type === 2
                ? "POS on Delivery"
                : "Online Payment"
            }
            color="secondary"
          />
        </>
      ),
    },
    {
      field: "status",
      headerName: "Order Status",
      minWidth: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Chip
            onClick={(e) => (
              e.stopPropagation(),
              handleChangeStatus(e, params.row.id, params.row.status)
            )}
            label={
              params.row.status === 1
                ? "Pending"
                : params.row.status === 2
                ? "Success"
                : params.row.status === 3
                ? "Denied"
                : "Cancel"
            }
            color={
              params.row.status === 1
                ? "tertiary"
                : params.row.status === 2
                ? "success"
                : params.row.status === 3
                ? "error"
                : "error"
            }
            icon={
              params.row.status === 1 ? (
                <PendingRounded />
              ) : params.row.status === 2 ? (
                <CheckCircleRounded />
              ) : params.row.status === 3 ? (
                <DoDisturbOnRounded />
              ) : (
                <CancelRounded />
              )
            }
          />
        </>
      ),
    },
    {
      field: "total_price",
      headerName: "Total Price",
      minWidth: 150,
      flex: 1,
    },
  ];

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

  const CustomStyle = {
    modalStyle: {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      height: "fit-content",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: "15px",
    },
  };

  return (
    <>
      <AdminTitle text="Order List" />
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
        </Box>

        <Box>
          <DataGrid
            rows={orderList.data}
            columns={orderColumns}
            loading={isLoading}
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
            onRowClick={(row: GridRowParams) =>
              navigate(`/dashboard/orders/${row.id}/details`)
            }
            slots={{
              pagination: CustomPagination,
            }}
            onSortModelChange={handleSortModelChange}
          />
        </Box>
      </Paper>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={CustomStyle.modalStyle}>
          <div className="w-full h-2.5 flex justify-end items-center text-primary">
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </div>
          <p className="text-3xl font-semibold">Choose Order Status</p>

          <div className="mt-3">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  sx={{
                    ".MuiButtonBase-root.MuiRadio-root.Mui-checked": {
                      color: "#000",
                    },
                  }}
                >
                  <FormControlLabel
                    value={2}
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    control={<Radio />}
                    label="Success"
                  />
                  <FormControlLabel
                    value={3}
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    control={<Radio />}
                    label="Denied"
                  />
                </RadioGroup>
              </FormControl>
              <Stack mt={3.25} flexDirection="row" justifyContent="end" gap={1}>
                <CancelButton type="contained" onClick={() => setOpen(false)} />

                <NormalButton text="Confirm" type="contained" />
              </Stack>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default OrderList;
