import api from "../config/axios";
import { baseURL } from "../config/axios";

const contact = "api/contacts";

export const getAllContacts = async (
  page: number,
  limit: number,
  paramString: string = ""
) => {
  return await api.get(
    `${baseURL}/${contact}?${paramString}&page=${page}&limit=${limit}`
  );
};

export const postContact = async (body: {
  name: string;
  email: string;
  message: string;
}) => {
  return await api.post(`${baseURL}/${contact}`, body);
};
