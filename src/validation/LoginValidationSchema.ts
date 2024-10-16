import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email Required"),
  password: Yup.string().required("Password Required"),
});