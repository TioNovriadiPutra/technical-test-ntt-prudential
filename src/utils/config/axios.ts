import { refreshToken } from "@/api/auth.api";
import { useAuth } from "@/stores/auth.store";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const access = useAuth.getState().access;

  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }

  return config;
});

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshToken(useAuth.getState().refresh);

        localStorage.setItem("@access", response.data!.accessToken);
        localStorage.setItem("@refresh", response.data!.refreshToken);

        useAuth
          .getState()
          .addToken(response.data!.accessToken, response.data!.refreshToken);

        originalRequest.headers["Authorization"] =
          `Bearer ${response.data!.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        localStorage.clear();
        useAuth.getState().removeToken();
        window.location.href = "/login";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
