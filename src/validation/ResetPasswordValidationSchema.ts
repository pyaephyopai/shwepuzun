import * as Yup from "yup";

export const ResetPasswordValidationSchema = Yup.object().shape({
  old_password: Yup.string().required("Old Password is Required"),
  new_password: Yup.string()
    .min(8, "Password Must be at least 8 Characters")
    .required("Password Required"),
  new_password_confirmation: Yup.string()
    .oneOf([Yup.ref("new_password")], "Password must be Match")
    .required("Confirm Password Required"),
});
