import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  AddRounded,
  Close,
  DeleteRounded,
  EditNoteRounded,
  FilterAltRounded,
  SearchRounded,
} from "@mui/icons-material";

import {
  Box,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import NormalButton from "../../../components/button/NormalButton";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../../../api/categoryServices";

import AdminTitle from "../../../components/typography/AdminTitle";
import CustomPagination from "../../../components/pagination/CustomPagination";
import CancelButton from "../../../components/button/CancelButton";
import FormInput from "../../../components/form/FormInput";

import { alertStore } from "../../../store/alertStore";
import { SortModelContext } from "../../../context/SortModel";
import { deleteModalStore } from "../../../store/deleteModalStore";
import { usePaginationStore } from "../../../store/paginationStore";
import { useHandleSortModelChange } from "../../../utils/sortUtils";
import { useDebouncedSearch } from "../../../hooks/useDebouncedSearch";

import { CategoryValidationSchema } from "../../../validation/CategoryValidationSchema";

type Params = {
  search?: string;
  sort_by?: string;
  sort_order?: string;
};

const CategoryList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [clickId, setClickId] = useState<number>(0);

  const [paramString, setParamString] = useState<string>("");

  const { searchText, handleInputChange, handleKeyDown, triggerSearch } =
    useDebouncedSearch(300);

  const { setPageCount, currentPage, selectedLimit } = usePaginationStore();

  const { setOpen, setId, id, isConfirm, setIsConfirm } = deleteModalStore();

  const { setAlert } = alertStore();

  const { sortBy, sortOrder } = useContext(SortModelContext);

  const handleSortModelChange = useHandleSortModelChange();

  const modalClose = () => {
    resetForm();
    setClickId(0);
    setOpenModal(false);
  };

  const {
    isLoading,
    isFetching,
    data: categoryList = [],
    refetch,
  } = useQuery<Category[]>({
    queryKey: ["category-list", currentPage, selectedLimit, paramString],
    queryFn: async () =>
      await getAllCategories(currentPage, selectedLimit, paramString).then(
        (response) => {
          if (response.data.code === 200) {
            setPageCount(response.data.meta.last_page);
            return response.data.data;
          }
        }
      ),
  });

  const { data, isSuccess } = useQuery<Category>({
    queryKey: ["category-show", clickId],
    queryFn: async () => {
      if (clickId) {
        const response = await getCategoryById(clickId);
        if (response.data.code === 200) {
          return response.data.data;
        } else {
          throw new Error("Failed to fetch category");
        }
      } else {
        throw new Error("No ID provided");
      }
    },
    enabled: !!clickId,
  });

  const { mutateAsync: deleteCategoryMutation } = useMutation({
    mutationFn: async (value: number) =>
      await deleteCategory(value).then((response) => {
        if (response.data.code === 200) {
          refetch();
          setIsConfirm(false);
          setId(null);
          setAlert(true, response.data.message, "success");
        }

        setOpen(false);
      }),
  });

  const { mutateAsync: createCategoryMutation, isPending } = useMutation({
    mutationFn: async (value: Category) =>
      await createCategory(value)
        .then((response) => {
          if (response.data.code === 201) {
            refetch();
            modalClose();
            setAlert(true, response.data.message, "success");
          }
        })
        .catch((e) => {
          setAlert(
            true,
            e.response.data.code === 422
              ? e.response.data.data.message
              : e.response.data.message,
            "error"
          );
          setErrors(
            e.response.data.code === 422 ? e.response.data.data.errors : ""
          );
        }),
  });

  const { mutateAsync: updateCategoryMutation, isPending: categoryPending } =
    useMutation({
      mutationFn: async ({ id, value }: { id: number; value: Category }) =>
        await updateCategory(id, value)
          .then((response) => {
            if (response.data.code === 201) {
              refetch();
              modalClose();
              setAlert(true, response.data.message, "success");
            }
          })
          .catch((e) => {
            setAlert(
              true,
              e.response.data.code === 422
                ? e.response.data.data.message
                : e.response.data.message,
              "error"
            );
            setErrors(
              e.response.data.code === 422 ? e.response.data.data.errors : ""
            );
          }),
    });

  useEffect(() => {
    if (isConfirm && id) {
      deleteCategoryMutation(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirm, id]);

  useEffect(() => {
    if (data && isSuccess) {
      setFieldValue("name", data.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

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

  const categoryColumns: GridColDef[] = [
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
            <IconButton
              onClick={() => (setOpenModal(true), setClickId(params.row.id))}
              aria-label="edit"
            >
              <EditNoteRounded color="secondary" />
            </IconButton>
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

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    errors,
    handleSubmit,
    resetForm,
    setFieldValue,
    setErrors,
  } = useFormik<Category>({
    initialValues: {
      id: 0,
      name: "",
    },
    validationSchema: CategoryValidationSchema,
    onSubmit: (value: Category) => {
      if (clickId) {
        updateCategoryMutation({ id: clickId, value });
      } else {
        createCategoryMutation(value);
      }
    },
  });

  const modalBoxStyle = {
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
  };

  return (
    <>
      <AdminTitle text="Category List" />
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

          <NormalButton
            text="Create"
            type="contained"
            icon={AddRounded}
            onClick={() => setOpenModal(true)}
          />
        </Box>

        <Box>
          <DataGrid
            rows={categoryList}
            columns={categoryColumns}
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

      <Modal
        open={openModal}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyle} className="h-full flex flex-col">
          <div className="w-full h-2.5 flex justify-end items-center text-primary">
            <IconButton
              aria-label="close"
              onClick={() => setOpenModal(false)}
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
          <div className="h-full flex flex-col justify-center">
            <form
              className="flex flex-col justify-center"
              onSubmit={handleSubmit}
            >
              <h1 className="text-3xl pb-5">Create Category</h1>

              <FormInput
                name="name"
                label="Category Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={errors.name}
                touch={touched.name}
                required={true}
              />

              <Stack
                mt={3}
                gap={2}
                flexDirection={"row"}
                justifyContent={"end"}
              >
                <CancelButton type="contained" onClick={modalClose} />
                <NormalButton
                  type="contained"
                  text={clickId ? "Update" : "Create"}
                  disable={isPending || categoryPending}
                />
              </Stack>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CategoryList;
