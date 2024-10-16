import api from "../config/axios";
import { baseURL } from "../config/axios";

const order = "api/orders";

export const createOrder = async (body: Order) => {
  return await api.post(`${baseURL}/${order}`, body);
};

export const getAllOrderList = async (
  page: number,
  limit: number,
  paramString: string = ""
) => {
  return await api.get(
    `${baseURL}/${order}?${paramString}&page=${page}&limit=${limit}`
  );
};

export const getOrderById = async (id: number) => {
  return await api.get(`${baseURL}/${order}/${id}`);
};

export const getOrderByUserId = async () => {
  return await api.get(`${baseURL}/api/users/orders`);
};

export const changeOrderStatus = async (id: number, body: OrderStatus) => {
  return await api.post(`${baseURL}/${order}/change-status/${id}`, body);
};
