import axios from "axios";
import type { HttpError } from "@refinedev/core";

export const axiosProvider = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosProvider.interceptors.request.use(
  (config) => {
    // Ví dụ: thêm token vào header nếu có
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosProvider.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);
