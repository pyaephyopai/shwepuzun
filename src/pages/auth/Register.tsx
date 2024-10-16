import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useFormik } from "formik";

import {
  Apple,
  EmailRounded,
  FacebookRounded,
  Google,
  KeyRounded,
  LocalPhoneRounded,
  Person,
} from "@mui/icons-material";

import {
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import shopAnimation from "../../assets/animation/register.json";

import AuthLayout from "../../layouts/AuthLayout";
import IconFormInput from "../../components/form/IconFormInput";
import ButtonIcon from "../../components/button/ButtonIcon";
import AuthButton from "../../components/button/AuthButton";
import IconFormInputPassword from "../../components/form/IconFormInputPassword";
import { RegisterValidationSchema } from "../../validation/RegisterValidationSchema";
import { register } from "../../api/auth/auth";
import { alertStore } from "../../store/alertStore";

export type RegisterProps = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
};

const Register = () => {
  const animationRef = useRef<LottieRefCurrentProps>(null);

  const navigate = useNavigate();
  const { setAlert } = alertStore();

  const { handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik<RegisterProps>({
      initialValues: {
        name: "",
        email: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
      },
      validationSchema: RegisterValidationSchema,
      onSubmit: async (value, { setErrors }) => {
        await register(value)
          .then((response) => {
            if (response.data.code === 201) {
              setAlert(true, response.data.message, "success");
              navigate("/login");
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
            setErrors(e.response.data.data.errors);
          });
      },
    });

  return (
    <>
      <AuthLayout>
        <Paper
          elevation={24}
          sx={{
            width: "1000px",
          }}
        >
          <Grid container justifyContent="center">
            <Grid
              item
              xl={6}
              md={6}
              alignItems="center"
              sx={{
                bgcolor: "#FFF5E1",
              }}
            >
              <Lottie
                loop={false}
                lottieRef={animationRef}
                animationData={shopAnimation}
                style={{
                  height: "100%",
                  display: "block",
                }}
                onComplete={() => {
                  animationRef.current?.goToAndPlay(0, true);
                }}
              />
            </Grid>
            <Grid
              item
              xl={6}
              md={6}
              paddingY={3.5}
              paddingX={6}
              sx={{
                order: {
                  xs: 2,
                  md: 0,
                },
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                paddingX={2}
                marginBottom={5}
                align="center"
                sx={{
                  fontWeight: "600",
                  fontFamily: "Roboto Slab",
                }}
              >
                Register
              </Typography>
              <form onSubmit={handleSubmit}>
                <IconFormInput
                  name="name"
                  label="User Name"
                  required={true}
                  icon={<Person />}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.name}
                  touch={touched.name}
                  sx={{
                    paddingBottom: "20px",
                  }}
                />
                <IconFormInput
                  name="email"
                  label="Email"
                  required={true}
                  icon={<EmailRounded />}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.email}
                  touch={touched.email}
                  sx={{
                    paddingBottom: "20px",
                  }}
                />
                <IconFormInput
                  name="phone_number"
                  label="Phone Number"
                  required={true}
                  icon={<LocalPhoneRounded />}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.phone_number}
                  touch={touched.phone_number}
                  sx={{
                    paddingBottom: "20px",
                  }}
                />
                <IconFormInputPassword
                  name="password"
                  label="Password"
                  required={true}
                  icon={<KeyRounded />}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.password}
                  touch={touched.password}
                  sx={{
                    paddingBottom: "20px",
                  }}
                />
                <IconFormInputPassword
                  name="password_confirmation"
                  label="Confirm Password"
                  required={true}
                  icon={<KeyRounded />}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.password_confirmation}
                  touch={touched.password_confirmation}
                  sx={{
                    paddingBottom: "10px",
                  }}
                />
                <FormControlLabel
                  control={<Checkbox size="small" color="info" />}
                  label="Accept Terms and Conditions"
                />
                <AuthButton
                  text="Submit"
                  type="contained"
                  sx={{
                    width: "100%",

                    backgroundColor: "#8B4513",

                    ":hover": {
                      backgroundColor: "#8B4513",
                    },
                  }}
                  onSubmit={handleSubmit}
                />
              </form>

              <Divider
                sx={{
                  marginY: "15px",

                  "&.MuiDivider-root::before": {
                    borderTop: "1.5px solid #8B4513",
                  },
                  "&.MuiDivider-root::after": {
                    borderTop: "1.5px solid #8B4513",
                  },
                }}
              >
                <Chip label="Or Continue With" size="medium" />
              </Divider>

              <Stack
                direction="row"
                justifyContent="space-evenly"
                marginBottom="20px"
              >
                <ButtonIcon type="outlined" icon={<Google />} />
                <ButtonIcon type="outlined" icon={<FacebookRounded />} />
                <ButtonIcon type="outlined" icon={<Apple />} />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap="5px"
              >
                <Typography component="p">Already Have a Account?</Typography>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Roboto Slab",
                  }}
                >
                  <Link to="/login">Login Here</Link>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </AuthLayout>
    </>
  );
};

export default Register;
