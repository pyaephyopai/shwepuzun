import api from "../config/axios";
import { baseURL } from "../config/axios";

const dashboard = "api/dashboard";

export const getDashboardData = async () => {
  return await api.get(`${baseURL}/${dashboard}`);
};

export const getDashboardMonthlySale = async () => {
  return await api.get(`${baseURL}/${dashboard}/monthly-sales`);
};

export const getDashboardMonthlyUser = async () => {
  return await api.get(`${baseURL}/${dashboard}/monthly-users`);
};
