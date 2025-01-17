import { TOKEN_COOKIE_CONFIG } from "../config";
import { api } from "../lib/axios";
import Cookies from 'js-cookie';
import { naviagate } from 'react-router-dom';

// Add response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get('refreshToken');
                const { access_token, refresh_token } = await authService.refreshToken(refreshToken);

                // Update cookies
                Cookies.set('accessToken', access_token, TOKEN_COOKIE_CONFIG);
                Cookies.set('refreshToken', refresh_token, TOKEN_COOKIE_CONFIG);

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return api(originalRequest);
            } catch (err) {
                // If refresh fails, logout user
                authService.logout();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            const { access_token, refresh_token } = response.data;

            // Store tokens in cookies
            Cookies.set('accessToken', access_token, TOKEN_COOKIE_CONFIG);
            Cookies.set('refreshToken', refresh_token, TOKEN_COOKIE_CONFIG);

            return response.data;
        } catch (error) {
            throw new Error('Login failed: ' + error.message);
        }
    },

    refreshToken: async (refreshToken) => {
        try {
            const response = await api.post('/auth/refresh-token', {
                refreshToken
            });
            return response.data;
        } catch (error) {
            throw new Error('Token refresh failed: ' + error.message);
        }
    },

    getProfile: async () => {
        try {
            const accessToken = Cookies.get('accessToken');
            const response = await api.get('/auth/profile', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch profile: ' + error.message);
        }
    },


    logout: async () => {
        try {
            // Remove cookies
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            naviagate('/login');
            return { success: true };
        } catch (error) {
            throw new Error('Logout failed: ' + error.message);
        }
    },
};