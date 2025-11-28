import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cache the media query to avoid creating new instances on each check
const darkModeMediaQuery = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

const applyThemeClass = (theme) => {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
        if (darkModeMediaQuery?.matches) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }
};

const useTheme = create(
    persist(
        (set) => ({
            theme: 'system',
            setTheme: (theme) => {
                applyThemeClass(theme);
                set({ theme });
            },
        }),
        {
            name: 'theme-storage',
            getStorage: () => localStorage,
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setTheme(state.theme);
                }
            }
        }
    )
);

export default useTheme;