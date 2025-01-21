import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTheme = create(
    persist(
        (set, get) => ({
            theme: 'system',
            setTheme: (theme) => {
                if (theme == "dark") {
                    document.documentElement.classList.add("dark");
                } else if (theme === "light") {
                    document.documentElement.classList.remove("dark");
                } else if (theme == "system") {
                    if (
                        window.matchMedia &&
                        window.matchMedia("(prefers-color-scheme: dark)").matches
                    ) {
                        document.documentElement.classList.add("dark");
                    } else {
                        document.documentElement.classList.remove("dark");
                    }
                }
                set({ theme })
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