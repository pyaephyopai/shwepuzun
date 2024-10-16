import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import BlogForm from "./BlogForm";
import { alertStore } from "../../../store/alertStore";
import { getBlogById, updateBlog } from "../../../api/blogService";

const BlogUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setAlert } = alertStore();

  const { data } = useQuery({
    queryKey: ["blog-show", id],
    queryFn: async () =>
      getBlogById(Number(id)).then((response) => {
        if (response.data.code === 200) {
          return response.data.data;
        }
      }),
    gcTime: 0,
    staleTime: 0,
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (value: FormData) =>
      updateBlog(Number(id), value)
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
        <BlogForm
          key={data.attachments}
          initialValue={data}
          fetch={mutateAsync}
        />
      )}
    </>
  );
};

export default BlogUpdate;
