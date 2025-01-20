import axios from "axios";
import { API_URL } from "../config";
import { authService } from "../services/authService";
import Cookies from "js-cookie";
import useAuth from "@/hooks/stores/useAuth";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        const { access_token, refresh_token } = await authService.refreshToken(
          refreshToken
        );

        // Update store tokens
        const { setTokens } = useAuth.getState();
        setTokens(access_token, refresh_token);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (error) {
        // If refresh fails, logout user
        authService.logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
