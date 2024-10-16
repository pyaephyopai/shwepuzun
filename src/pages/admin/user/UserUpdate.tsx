import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import UserForm, { UserFormValue } from "./UserForm";
import { getUserById, updateUser } from "../../../api/userService";
import { alertStore } from "../../../store/alertStore";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setAlert } = alertStore();

  const { data } = useQuery({
    queryKey: ["user-show"],
    queryFn: async () =>
      getUserById(Number(id)).then((response) => {
        if (response.data.code === 200) return response.data.data;
      }),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (value: UserFormValue) =>
      updateUser(Number(id), value)
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

  return <>{data && <UserForm initialValue={data} fetch={mutateAsync} />}</>;
};

export default UserUpdate;
