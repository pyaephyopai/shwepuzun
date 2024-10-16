import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import { alertStore } from "../../../store/alertStore";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../../api/ProductService";

const ProductCreate = () => {
  const navigate = useNavigate();
  const { setAlert } = alertStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (values: FormData) =>
      await createProduct(values)
        .then((response) => {
          if (response.data.code === 201) {
            navigate(-1);
            setAlert(true, response.data.message, "success");
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
        }),
  });

  return <ProductForm fetch={mutateAsync} />;
};

export default ProductCreate;
