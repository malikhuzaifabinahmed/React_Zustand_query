import useTheme from '@/hooks/stores/useTheme';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        switch (theme) {
            case 'system': {
                setTheme('light');
                break;
            }
            case 'light': {
                setTheme('dark');
                break;
            }
            case 'dark': {
                setTheme('system');
                break;
            }
            default:
                break;
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-5 left-5  border-none rounded-full p-2 cursor-pointer transition-all duration-300  bg-secondary     text-current"
            aria-label="Toggle theme"
        >
            {theme === 'light' && <FiSun size={20} />}
            {theme === 'dark' && <FiMoon size={20} />}
            {theme === 'system' && <FiMonitor size={20} />}
        </button>
    );
};

export default ThemeToggle;