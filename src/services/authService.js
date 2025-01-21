import api from "@/lib/axios";
import Cookies from "js-cookie";
import { queryClient } from "@/lib/queryClient";
import useAuth from "@/hooks/stores/useAuth";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    const { access_token, refresh_token } = response.data;
    // Store tokens in store
    const { setTokens } = useAuth.getState();
    setTokens(access_token, refresh_token);

    return response.data;

  },

  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post("/auth/refresh-token", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      throw new Error("Token refresh failed: " + error.message);
    }
  },

  getProfile: async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch profile: " + error.message);
    }
  },

  logout: async () => {
    try {
      const { clearTokens } = useAuth.getState();
      clearTokens();
      queryClient.clear();
    } catch (error) {
      throw new Error("Logout failed: " + error.message);
    }
  },
};
