import axios from "axios";
import { userStore } from "../store/userStore";

export const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    ContentType: "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

const isOngoingMaintenance = (status: number) => {
  if (status === 404 || status === 403) {
    window.location.href = "/notfound";
  } else if (status === 401) {
    localStorage.removeItem("userStore");
    localStorage.removeItem("product");
    window.location.href = "/login";
  }
};

api.interceptors.request.use(
  (request) => {
    const token = userStore.getState().token;
    const logInUser = userStore.getState().logInUser;

    if (token && logInUser) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    isOngoingMaintenance(error.response?.status);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    isOngoingMaintenance(response.data);
    return response;
  },
  (error) => {
    isOngoingMaintenance(error.response?.status);

    return Promise.reject(error);
  }
);

export default api;
