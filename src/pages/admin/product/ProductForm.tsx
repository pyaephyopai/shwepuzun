import { SyntheticEvent, useState } from "react";
import { loadingStore } from "../../../store/isLoadingStore";
import { useFormik } from "formik";
import AdminFormWrapper from "../../../layouts/admin/AdminFormWrapper";
import { useDropzone } from "react-dropzone";
import {
  Autocomplete,
  Box,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import FormInput from "../../../components/form/FormInput";
import CancelButton from "../../../components/button/CancelButton";
import NormalButton from "../../../components/button/NormalButton";
import useCategoryList from "../../../hooks/useCategoryList";
import RequiredStar from "../../../components/form/RequiredStar";
import { useQueryClient } from "@tanstack/react-query";
import { deleteImage } from "../../../api/blogService";
import {
  BackupRounded,
  Delete,
  DriveFolderUploadRounded,
} from "@mui/icons-material";
import {
  ProductCreateValidationSchema,
  ProductUpdateValidationSchema,
} from "../../../validation/admin/ProductValidationSchema";

type ProductFormProps = {
  initialValue?: ProductFormValue;
  fetch: (payload: FormData) => Promise<void>;
};

const ProductForm = ({ initialValue, fetch }: ProductFormProps) => {
  const queryClient = useQueryClient();

  const { setIsLoading } = loadingStore();

  const [files, setFiles] = useState<UploadFile[]>([]);

  const { data: categoryData } = useCategoryList();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik<ProductFormValue>({
    initialValues: initialValue ?? {
      id: 0,
      name: "",
      category_id: null,
      description: "",
      price: undefined,
      images: [],
      attachments: [],
    },
    validationSchema: initialValue
      ? ProductUpdateValidationSchema
      : ProductCreateValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      setIsLoading(true);

      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key !== "images" && key !== "attachments") {
          const typedKey = key as keyof ProductFormValue;
          const value = values[typedKey];

          if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
          }
        }
      });

      values.images.forEach((file: File, i) => {
        if (file instanceof File) {
          formData.append(`images[${i}]`, file);
        }
      });

      fetch(formData)
        .catch((e) => {
          setIsLoading(false);
          setErrors(e.response.data?.data.errors);
        })
        .finally(() => setIsLoading(false));
    },
  });

  const accept: { [key: string]: string[] } = {
    "image/*": [],
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map(
        (file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }) as UploadFile
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      setFieldValue("images", [...values.images, ...newFiles]);
    },
  });

  const handleRemoveFile = (fileToRemove: UploadFile) => {
    URL.revokeObjectURL(fileToRemove.preview);
    const updatedFiles = files.filter(
      (file) => file.name !== fileToRemove.name
    );
    setFiles(updatedFiles);
    setFieldValue(
      "images",
      values.images.filter((file) => file.name !== fileToRemove.name)
    );
  };

  const handleDelete = async (id: number) => {
    await deleteImage(id);
    queryClient.invalidateQueries({ queryKey: ["product-show"] });
  };

  return (
    <>
      <AdminFormWrapper
        title={initialValue ? "Product Update" : "Product Create"}
      >
        <Grid item xs={6} pr={2}>
          <FormInput
            name="name"
            label="Name"
            required={true}
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.name}
            touch={touched.name}
            sx={{
              marginBottom: "15px",
            }}
          />
          <FormInput
            name="description"
            label="Description"
            required={true}
            value={values.description}
            row={4}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.description}
            touch={touched.description}
            sx={{
              marginBottom: "15px",
            }}
          />
        </Grid>
        <Grid item xs={6} pl={2}>
          <Box
            sx={{
              marginBottom: "15px",
            }}
          >
            <InputLabel id="demo-simple-select-label" className="mb-1">
              Categories <RequiredStar />
            </InputLabel>
            <Autocomplete
              disablePortal
              color="secondary"
              options={categoryData}
              getOptionLabel={(option: Category) => option.name}
              value={
                categoryData.find(
                  (category: Category) => category.id === values.category_id
                ) || null
              }
              onChange={(
                _e: SyntheticEvent<Element, Event>,
                newValue: Category | null
              ) => setFieldValue("category_id", newValue?.id)}
              sx={{
                width: "100%",
                ".MuiInputBase-root": { height: 40, py: 1 },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  color="secondary"
                  name="category_id"
                  placeholder="Categories"
                  variant="outlined"
                  error={touched.category_id && Boolean(errors.category_id)}
                  helperText={touched.category_id && errors.category_id}
                />
              )}
            />
          </Box>
          <FormInput
            name="price"
            label="Price"
            required={true}
            value={values.price}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.price}
            touch={touched.price}
            sx={{
              marginBottom: "15px",
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "150px",
                    border: "1px solid #000",
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  Upload Here
                  <BackupRounded
                    fontSize="large"
                    sx={{
                      ml: 2,
                      opacity: "0.5",
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "150px",
                    border: "1px solid #000",
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  Drag your file here or Click Here
                  <DriveFolderUploadRounded
                    fontSize="large"
                    sx={{
                      ml: 1,
                      opacity: "0.3",
                    }}
                  />
                </Box>
              )}
            </div>
          </div>
          {!Array.isArray(errors.images) ? (
            <FormHelperText
              sx={{
                color: "#d32f2f",
              }}
            >
              {errors.images}
            </FormHelperText>
          ) : null}
        </Grid>

        <Stack
          spacing={2}
          direction="row"
          sx={{ mt: 2, width: "100%", justifyContent: "flex-end" }}
        >
          <CancelButton link="/dashboard/products" type="contained" />
          <NormalButton
            text={initialValue ? "Update" : "Create"}
            type="contained"
            onClick={handleSubmit}
          />
        </Stack>

        <Grid
          container
          sx={{
            mt: 2,

            flexWrap: "wrap",
          }}
        >
          {files.map((file, index) => (
            <Grid key={index} item xs={6} sm={4} lg={3} xl={2} p={1}>
              <Box key={index} position="relative" height={150}>
                <Box
                  component="img"
                  src={file.preview}
                  alt={file.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",

                    ":hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                  onClick={() => handleRemoveFile(file)}
                >
                  <Delete />
                </IconButton>
              </Box>
              {errors.images &&
              Array.isArray(errors.images) &&
              typeof errors.images[index] === "string" ? (
                <FormHelperText
                  sx={{
                    color: "#d32f2f",
                    fontSize: "18px",
                  }}
                >
                  {errors.images[index]}
                </FormHelperText>
              ) : null}
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          sx={{
            mt: 2,

            flexWrap: "wrap",
          }}
        >
          {values.attachments &&
            values.attachments.map((file, index) => (
              <Grid key={index} item xs={6} sm={4} lg={3} xl={2} p={1}>
                <Box key={index} position="relative" height={150}>
                  <Box
                    component="img"
                    src={file?.attachment_url}
                    alt={file.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",

                      ":hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                    onClick={() => handleDelete(file.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Grid>
            ))}
        </Grid>
      </AdminFormWrapper>
    </>
  );
};

export default ProductForm;
