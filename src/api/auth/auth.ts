import api from "../../config/axios";
import { baseURL } from "../../config/axios";
import { LoginProps } from "../../pages/auth/Login";
import { RegisterProps } from "../../pages/auth/Register";

const auth = "api/auth";
const user = "api/register";

export const login = async (body: LoginProps) => {
  return await api.post(`${baseURL}/${auth}/login`, body);
};

export const register = async (body: RegisterProps) => {
  return await api.post(`${baseURL}/${user}`, body);
};

export const logOut = async () => {
  return await api.post(`${baseURL}/${auth}/logout`);
};

export const restPasswordWithOldPassword = async (
  body: ResetPasswordWithOldPasswordProp
) => {
  return await api.post(`${baseURL}/api/user-change-password`, body);
};
