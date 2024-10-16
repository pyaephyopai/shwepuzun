import api from "../config/axios";
import { baseURL } from "../config/axios";

const category = "api/categories";
const categoryList = "api/category-list";

export const getAllCategories = async (
  page: number,
  limit: number,
  paramString: string = ""
) => {
  return await api.get(
    `${baseURL}/${category}?${paramString}&page=${page}&limit=${limit}`
  );
};

export const createCategory = async (body: Category) => {
  return await api.post(`${baseURL}/${category}`, body);
};

export const deleteCategory = async (id: number) => {
  return await api.delete(`${baseURL}/${category}/${id}`);
};

export const getCategoryById = async (id: number) => {
  return await api.get(`${baseURL}/${category}/${id}`);
};

export const updateCategory = async (id: number, body: Category) => {
  return await api.put(`${baseURL}/${category}/${id}`, body);
};

export const getDropDownCategories = async () => {
  return await api.get(`${baseURL}/${categoryList}`);
};
