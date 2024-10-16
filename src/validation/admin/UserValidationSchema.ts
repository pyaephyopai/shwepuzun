import * as Yup from "yup";

export const UserCreateValidationSchema = Yup.object().shape({
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
  role_id: Yup.number().required("Role Required"),
  gender: Yup.number().nullable(),
  address: Yup.string().nullable(),
  region: Yup.string().nullable(),
});

export const UserUpdateValidationSchema = Yup.object().shape({
  name: Yup.string().required("User Name Required"),
  email: Yup.string().email().required("Email Required"),
  phone_number: Yup.string()
    .matches(/^[0-9+-]+$/, "Phone number can only contain digits")
    .required("Phone Number Required"),
  role_id: Yup.number().required("Role Required"),
  gender: Yup.number().nullable(),
  address: Yup.string().nullable(),
  region: Yup.string().nullable(),
});
