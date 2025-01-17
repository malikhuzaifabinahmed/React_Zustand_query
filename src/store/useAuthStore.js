import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: ({ accessToken, refreshToken, isAuthenticated }) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated,
        }),

      setUser: (user) => set({ user }),

      updateTokens: ({ accessToken, refreshToken }) =>
        set({
          accessToken,
          refreshToken,
        }),

      logout: () => set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);