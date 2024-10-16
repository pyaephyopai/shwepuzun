import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useFormik } from "formik";

import {
  Apple,
  EmailRounded,
  FacebookRounded,
  Google,
  KeyRounded,
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

import shopAnimation from "../../assets/animation/login.json";

import AuthLayout from "../../layouts/AuthLayout";
import IconFormInput from "../../components/form/IconFormInput";
import ButtonIcon from "../../components/button/ButtonIcon";
import AuthButton from "../../components/button/AuthButton";
import IconFormInputPassword from "../../components/form/IconFormInputPassword";
import { LoginValidationSchema } from "../../validation/LoginValidationSchema";
import { login } from "../../api/auth/auth";
import { alertStore } from "../../store/alertStore";
import { userStore } from "../../store/userStore";

export type LoginProps = {
  email: string;
  password: string;
};

  const Login = () => {
    const animationRef = useRef<LottieRefCurrentProps>(null);

    const navigate = useNavigate();
    const { setAlert } = alertStore();
    const { setLogInUser, setUserData, setToken, setRole } = userStore();

    const [forgotShow, setForgotShow] = useState(false);

    const { handleBlur, handleChange, errors, touched, handleSubmit } =
      useFormik<LoginProps>({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: LoginValidationSchema,
        onSubmit: async (value) => {
          await login(value)
            .then((response) => {
              if (response.data.code === 200) {
                setAlert(true, response.data.message, "success");
                setLogInUser(true);
                setUserData(response.data.data.user_data);
                setToken(response.data.data.token);
                setRole(response.data.data.role);
                if (response.data.data.role == "Admin") navigate("/dashboard");
                else navigate("/");
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
              if (e.response.data.code === 400) {
                setForgotShow(true);
              }
            });
        },
      });

    return (
      <>
      <AuthLayout>
        <Paper
          elevation={12}
          sx={{
            width: "1000px",
          }}
        >
          <Grid container justifyContent="center">
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
                Log in
              </Typography>
              <form onSubmit={handleSubmit}>
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
                    paddingBottom: "10px",
                  }}
                />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom={2}
                >
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Accept Terms and Conditions"
                  />

                  {forgotShow && (
                    <Typography color="error" marginBottom="0" paragraph>
                      Forgot Password
                    </Typography>
                  )}
                </Stack>
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
                <Typography component="p">Don't Have a Account?</Typography>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Roboto Slab",
                  }}
                >
                  <Link to="/register">Register Here</Link>
                </Typography>
              </Stack>
            </Grid>
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
          </Grid>
        </Paper>
      </AuthLayout>
    </>
  );
};

export default Login;
