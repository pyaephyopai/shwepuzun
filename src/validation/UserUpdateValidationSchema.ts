import * as Yup from "yup";

export const UserUpdateValidationSchema = Yup.object().shape({
  name: Yup.string().required("User Name Required"),
  email: Yup.string().email().required("Email Required"),
  phone_number: Yup.string()
    .matches(/^[0-9+-]+$/, "Phone number can only contain digits")
    .required("Phone Number Required"),
  gender: Yup.number().nullable(),
  address: Yup.string().nullable(),
  region: Yup.string().nullable(),
});
