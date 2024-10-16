import ProductForm from "./ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import { alertStore } from "../../../store/alertStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductById, updateProduct } from "../../../api/ProductService";

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setAlert } = alertStore();

  const { data } = useQuery({
    queryKey: ["product-show", id],
    queryFn: async () =>
      getProductById(Number(id)).then((response) => {
        if (response.data.code === 200) {
          return response.data.data;
        }
      }),
    gcTime: 0,
    staleTime: 0,
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (value: FormData) =>
      updateProduct(Number(id), value)
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

  return (
    <>
      {data && (
        <ProductForm
          key={data.attachments}
          initialValue={data}
          fetch={mutateAsync}
        />
      )}
    </>
  );
};

export default ProductUpdate;
