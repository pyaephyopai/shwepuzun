import * as Yup from "yup";

export const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string().required("User Name Required"),
  email: Yup.string().email().required("Email Required"),
  phone_number: Yup.string()
    .matches(/^[0-9+-]+$/, "Phone number can only contain digits")
    .required("Phone Number Required"),
  password: Yup.string()
    .min(8, "Password Must be at least 8 Characters")
    .required("Password Required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Password must be Match")
    .required("Confirm Password Required"),
});
