import * as Yup from "yup";

export const CategoryValidationSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  name: Yup.string().required("Name Required"),
});
