import { TOKEN_COOKIE_CONFIG } from "../config";
import { api } from "../lib/axios";
import Cookies from 'js-cookie';


// Add response interceptor

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

            return { success: true };
        } catch (error) {
            throw new Error('Logout failed: ' + error.message);
        }
    },
};