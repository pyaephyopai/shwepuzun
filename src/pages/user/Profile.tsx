import {
  Box,
  FormControlLabel,
  Grid,
  InputLabel,
  Paper,
  RadioGroup,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserById, updateUserData } from "../../api/userService";
import FormInput from "../../components/form/FormInput";
import { Divider } from "@mui/material";
import { useFormik } from "formik";
import { Radio } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import NormalButton from "../../components/button/NormalButton";
import CancelButton from "../../components/button/CancelButton";
import { UserUpdateValidationSchema } from "../../validation/UserUpdateValidationSchema";
import { alertStore } from "../../store/alertStore";

import profile from "../../assets/profile.jpg";
import { userStore } from "../../store/userStore";
import ContainerWrapper from "../../layouts/wrapper/ContainerWrapper";

const Profile = () => {
  const { id } = useParams();

  const { userData, setUserData } = userStore();

  const { setAlert } = alertStore();

  const [disabled, setDisable] = useState(false);

  const [selectedImage, setSelectedImage] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDisable(true);
      setValues({ ...values, image: file });
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setDisable(false);
    resetForm();
    refetch();
  };

  const { data, refetch } = useQuery({
    queryKey: ["get-user-profile", id],
    queryFn: async () =>
      await getUserById(Number(id)).then((response) => {
        if (response.data.code === 200) {
          setSelectedImage(response.data.data.image);
          setValues({
            ...response.data.data,
          });
          return response.data.data;
        }
      }),
  });

  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    setValues,
    resetForm,
    submitForm,
  } = useFormik<UserUpdate>({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      gender: null,
      address: "",
      region: "",
      image: undefined,
    },
    validationSchema: UserUpdateValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      await updateUserData(Number(id), formData).then((response) => {
        if (response.data.code === 201) {
          refetch();
          setDisable(false);
          setAlert(true, response.data.message, "success");

          if (userData) {
            setUserData({
              ...userData,
              region: values.region as string,
              address: values.address! as string,
              id: Number(id),
              name: values.name,
              email: userData?.email,
              phone: values.phone_number,
            });
          }
        }
      });
    },
  });

  return (
    <ContainerWrapper>
      <Toolbar />
      <Paper
        sx={{
          p: 2,

          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            mb: 2,

            position: "relative",

            display: "flex",
            gap: 2,
          }}
        >
          <Box
            component="img"
            alt="This is image"
            sx={{
              mt: -8,
              width: "180px",
              height: "180px",

              borderRadius: "50%",
              border: "2px solid #fff",

              objectFit: "cover",
              objectPosition: "center",

              boxShadow: "0px 0px 5px #999",
            }}
            src={selectedImage ?? profile}
            onClick={handleImageClick}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Typography
            variant="h4"
            component="h2"
            fontWeight={700}
            fontFamily="Roboto Slab"
          >
            {data?.name}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" component="h4" fontWeight={600}>
            User Profile
          </Typography>
          <Typography
            paragraph
            sx={{
              fontSize: "14px",

              color: "#888",
            }}
          >
            Update Your Photo and Detail here
          </Typography>
          <Divider />
          <Grid container sx={{ p: 2 }}>
            <Grid item md={6} pr={1}>
              <FormInput
                name="name"
                label="User Name"
                required={true}
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={!disabled}
                error={errors.name}
                touch={touched.name}
                sx={{
                  marginBottom: "15px",
                }}
              />

              <FormInput
                name="phone_number"
                label="Phone Number"
                required={true}
                value={values.phone_number}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={!disabled}
                error={errors.phone_number}
                touch={touched.phone_number}
                sx={{
                  marginBottom: "15px",
                }}
              />

              <FormInput
                name="address"
                label="Address"
                value={values.address}
                row={3}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={!disabled}
                error={errors.address}
                touch={touched.address}
                sx={{
                  marginBottom: "15px",
                }}
              />
            </Grid>
            <Grid item md={6} pl={1}>
              <FormInput
                name="email"
                label="Email"
                required={true}
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={true}
                error={errors.email}
                touch={touched.email}
                sx={{
                  marginBottom: "15px",
                }}
              />

              <FormInput
                name="region"
                label="Region"
                value={values.region}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={!disabled}
                error={errors.region}
                touch={touched.region}
                sx={{
                  marginBottom: "15px",
                }}
              />
              <Box
                sx={{
                  marginBottom: "15px",
                }}
              >
                <InputLabel className="mb-1">Gender</InputLabel>
                <RadioGroup
                  row
                  color="secondary"
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value={1}
                    checked={Number(values.gender) === 1}
                    control={<Radio color="secondary" size="small" />}
                    label="Male"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!disabled}
                    sx={{
                      ...(!disabled && {
                        ".Mui-disabled": {
                          WebkitTextFillColor: "rgba(0, 0, 0, 1)",
                        },
                      }),
                    }}
                  />
                  <FormControlLabel
                    checked={Number(values.gender) === 2}
                    value={2}
                    control={<Radio color="secondary" size="small" />}
                    label="Female"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!disabled}
                    sx={{
                      ...(!disabled && {
                        ".Mui-disabled": {
                          WebkitTextFillColor: "rgba(0, 0, 0, 1)",
                        },
                      }),
                    }}
                  />
                </RadioGroup>
                {touched.gender && errors.gender && (
                  <div className="text-xs text-red ml-3.5">
                    <p>{errors.gender}</p>
                  </div>
                )}
              </Box>
            </Grid>
          </Grid>
          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="end"
            gap={1}
          >
            <CancelButton type="contained" onClick={handleCancel} />
            {!disabled ? (
              <NormalButton
                text="Edit"
                type="contained"
                onClick={() => setDisable(true)}
              />
            ) : (
              <NormalButton text="Save" type="contained" onClick={submitForm} />
            )}
          </Stack>
        </Box>
      </Paper>
    </ContainerWrapper>
  );
};

export default Profile;
