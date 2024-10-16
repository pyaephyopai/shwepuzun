import * as Yup from "yup";

export const ContactValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name Required"),
  email: Yup.string().email().required("Email Required"),
  message: Yup.string().required("Message Required"),
});
