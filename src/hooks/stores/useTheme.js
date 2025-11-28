import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cache the media query to avoid creating new instances on each check
const darkModeMediaQuery = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

const applyThemeClass = (theme, isDarkPreference = darkModeMediaQuery?.matches) => {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
        if (isDarkPreference) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }
};

const useTheme = create(
    persist(
        (set, get) => ({
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

// Listen for system theme changes and update if theme is set to 'system'
if (darkModeMediaQuery) {
    darkModeMediaQuery.addEventListener('change', (e) => {
        const currentTheme = useTheme.getState().theme;
        if (currentTheme === 'system') {
            applyThemeClass('system', e.matches);
        }
    });
}

export default useTheme;