import { useFormik } from "formik";
import { useState } from "react";

import AdminFormWrapper from "../../../layouts/admin/AdminFormWrapper";
import { Box, FormHelperText, Grid, IconButton, Stack } from "@mui/material";
import FormInput from "../../../components/form/FormInput";
import { useDropzone } from "react-dropzone";
import {
  BackupRounded,
  Delete,
  DriveFolderUploadRounded,
} from "@mui/icons-material";
import NormalButton from "../../../components/button/NormalButton";
import CancelButton from "../../../components/button/CancelButton";
import { loadingStore } from "../../../store/isLoadingStore";
import { deleteImage } from "../../../api/blogService";
import { useQueryClient } from "@tanstack/react-query";
import { BlogValidationSchmea } from "../../../validation/admin/BlogValidationSchmea";

type BlogFormProps = {
  initialValue?: BlogFormValue;
  fetch: (payload: FormData) => Promise<void>;
};

interface UploadFile extends File {
  preview: string;
}

const BlogForm = ({ initialValue, fetch }: BlogFormProps) => {
  const queryClient = useQueryClient();

  const [files, setFiles] = useState<UploadFile[]>([]);

  const { setIsLoading } = loadingStore();

  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
  } = useFormik<BlogFormValue>({
    initialValues: initialValue ?? {
      id: 0,
      title: "",
      description: "",
      images: [],
      attachments: [],
    },
    validationSchema: BlogValidationSchmea,
    onSubmit: async (values, { setErrors }) => {
      setIsLoading(true);

      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key !== "images" && key !== "attachments") {
          const typedKey = key as keyof BlogFormValue;
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
    queryClient.invalidateQueries({ queryKey: ["blog-show"] });
  };

  return (
    <>
      <AdminFormWrapper title={initialValue ? "Blog Update" : "Blog Create"}>
        <Grid item xs={6} pr={2}>
          <FormInput
            name="title"
            label="Title"
            required={true}
            value={values.title}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.title}
            touch={touched.title}
            sx={{
              marginBottom: "15px",
            }}
          />
        </Grid>

        <Grid item xs={6} pl={2}>
          <FormInput
            name="description"
            label="Description"
            required={true}
            value={values.description}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.description}
            touch={touched.description}
            row={5}
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
          <CancelButton link="/dashboard/blogs" type="contained" />
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

export default BlogForm;
