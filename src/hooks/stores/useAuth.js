import { create } from "zustand";
import Cookies from "js-cookie";
import { TOKEN_COOKIE_CONFIG } from "../../config";

const useAuth = create((set) => ({
  accessToken: Cookies.get("accessToken"),
  refreshToken: Cookies.get("refreshToken"),
  isAuthenticated: !!Cookies.get("accessToken"),

  setTokens: (accessToken, refreshToken) => {
    Cookies.set("accessToken", accessToken), TOKEN_COOKIE_CONFIG;
    Cookies.set("refreshToken", refreshToken, TOKEN_COOKIE_CONFIG);
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  clearTokens: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  updateAccessToken: (newAccessToken) => {
    Cookies.set("accessToken", newAccessToken, TOKEN_COOKIE_CONFIG);
    set({
      accessToken: newAccessToken,
    });
  },
}));

export default useAuth;
