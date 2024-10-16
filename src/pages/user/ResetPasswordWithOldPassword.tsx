import { Paper } from "@mui/material";
import { useFormik } from "formik";

import { alertStore } from "../../store/alertStore";
import { useNavigate } from "react-router-dom";
import { restPasswordWithOldPassword } from "../../api/auth/auth";
import FormInputPassword from "../../components/form/FormInputPassword";
import { ResetPasswordValidationSchema } from "../../validation/ResetPasswordValidationSchema";
import NormalButton from "../../components/button/NormalButton";

const ResetPasswordWithOldPassword = () => {
  const { setAlert } = alertStore();
  const navigate = useNavigate();

  const { handleBlur, handleChange, errors, touched, submitForm } =
    useFormik<ResetPasswordWithOldPasswordProp>({
      initialValues: {
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
      },
      validationSchema: ResetPasswordValidationSchema,
      onSubmit: async (value) => {
        await restPasswordWithOldPassword(value).then((response) => {
          if (response.data.meta.code === 200) {
            setAlert(true, "Password changed successfully", "success");
            navigate("/settings/security");
          }
        });
      },
    });

  return (
    <Paper
      sx={{
        p: 1.5,
      }}
    >
      <FormInputPassword
        name="old_password"
        label="Old Password"
        required={true}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.old_password}
        touch={touched.old_password}
        sx={{
          marginBottom: "15px",
        }}
      />

      <FormInputPassword
        name="new_password"
        label="New Password"
        required={true}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.new_password}
        touch={touched.new_password}
        sx={{
          marginBottom: "15px",
        }}
      />

      <FormInputPassword
        name="new_password_confirmation"
        label="New Password Confirmation"
        required={true}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.new_password_confirmation}
        touch={touched.new_password_confirmation}
        sx={{
          marginBottom: "15px",
        }}
      />

      <NormalButton text="submit" type="contained" onClick={submitForm} />
    </Paper>
  );
};

export default ResetPasswordWithOldPassword;
