import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import UserForm, { UserFormValue } from "./UserForm";
import { createUser } from "../../../api/userService";
import { alertStore } from "../../../store/alertStore";

const UserCreate = () => {
  const navigate = useNavigate();
  const { setAlert } = alertStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (values: UserFormValue) =>
      await createUser(values)
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
      <UserForm fetch={mutateAsync} />
    </>
  );
};

export default UserCreate;
