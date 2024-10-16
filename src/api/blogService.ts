import api from "../config/axios";
import { baseURL } from "../config/axios";

const blog = "api/blogs";
const publicBlog = "api/blog-list";
const attachment = "api/attachment";

export const getAllBlogs = async (
  page: number,
  limit: number,
  paramString: string = ""
) => {
  return await api.get(
    `${baseURL}/${blog}?${paramString}&page=${page}&limit=${limit}`
  );
};

export const createBlog = async (body: FormData) => {
  return await api.post(`${baseURL}/${blog}`, body);
};

export const deleteBlog = async (id: number) => {
  return await api.delete(`${baseURL}/${blog}/${id}`);
};

export const getBlogById = async (id: number) => {
  return await api.get(`${baseURL}/${blog}/${id}`);
};

export const updateBlog = async (id: number, body: FormData) => {
  return await api.post(`${baseURL}/${blog}/${id}`, body);
};

export const deleteImage = async (id: number) => {
  return await api.delete(`${baseURL}/${attachment}/${id}`);
};

export const getAllBlogUser = async () => {
  return await api.get(`${baseURL}/${publicBlog}`);
};

export const getBlogDetailById = async (id: number) => {
  return await api.get(`${baseURL}/${publicBlog}/${id}`);
};

export const getRandomBlogs = async (id: number) => {
  return await api.get(`${baseURL}/${publicBlog}-random/${id}`);
};
