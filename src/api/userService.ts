import api from "../config/axios";
import { baseURL } from "../config/axios";
import { UserFormValue } from "../pages/admin/user/UserForm";

const user = "api/users";
const role = "api/roles";

export const getAllUsers = async (
  page: number,
  limit: number,
  paramString: string = ""
) => {
  return await api.get(
    `${baseURL}/${user}?${paramString}&page=${page}&limit=${limit}`
  );
};

export const createUser = async (body: UserFormValue) => {
  return await api.post(`${baseURL}/${user}`, body);
};

export const getAllRoles = async () => {
  return await api.get(`${baseURL}/${role}`);
};

export const deleteUser = async (id: number) => {
  return await api.delete(`${baseURL}/${user}/${id}`);
};

export const getUserById = async (id: number) => {
  return await api.get(`${baseURL}/${user}/${id}`);
};

export const updateUser = async (id: number, body: Order) => {
  return await api.post(`${baseURL}/${user}/${id}`, body);
};

export const updateUserData = async (id: number, body: Order | FormData) => {
  return await api.post(`${baseURL}/${user}-update/${id}`, body);
};
