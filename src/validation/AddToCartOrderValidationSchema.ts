import * as Yup from "yup";

export const AddToCartOrderValidationSchema = Yup.object().shape({
  phone_number: Yup.number().required("Phone no is required"),
  region: Yup.string().required("Region is required"),
  address: Yup.string().required("Address is required"),
  payment_type: Yup.number().required("Plz Select your payment"),
  total_price: Yup.string(),
  note: Yup.string().nullable(),
  products: Yup.array(),
});
