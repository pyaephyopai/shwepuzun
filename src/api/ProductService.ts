import api from "../config/axios";
import { baseURL } from "../config/axios";

const product = "api/products";
const publicProduct = "api/product-list";
const rating = "api/rating";

export const getAllProducts = async (
  page: number,
  limit: number,
  paramString: string = ""
) => {
  return await api.get(
    `${baseURL}/${product}?${paramString}&page=${page}&limit=${limit}`
  );
};

export const createProduct = async (body: FormData) => {
  return await api.post(`${baseURL}/${product}`, body);
};

export const deleteProduct = async (id: number) => {
  return await api.delete(`${baseURL}/${product}/${id}`);
};

export const getProductById = async (id: number) => {
  return await api.get(`${baseURL}/${product}/${id}`);
};

export const updateProduct = async (id: number, body: FormData) => {
  return await api.post(`${baseURL}/${product}/${id}`, body);
};

export const getAllProductUser = async (paramString: string = "") => {
  return await api.get(`${baseURL}/${publicProduct}?${paramString}`);
};

export const getProductDetailById = async (id: number) => {
  return await api
    .get(`${baseURL}/${publicProduct}/${id}`)
    .then((res) => res.data.data);
};

export const getRandomProducts = async (id: number) => {
  return await api.get(`${baseURL}/${publicProduct}-random/${id}`);
};

export const createProductRating = async (body: Rating) => {
  return await api.post(`${baseURL}/${rating}`, body);
};
