import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { authService } from '../services/authService';
import { ErrorBoundary } from 'react-error-boundary';
import { GlobalErrorElement } from '../lib/GlobalErrorElement';
import { useState } from "react";
export default function Navbar() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { user, isAuthenticated, logout, accessToken } = useAuthStore();


    const handleLogout = async () => {
        try {
            setIsLoading(true);
            if (accessToken) {
                await authService.logout(accessToken);
            }
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Force logout on error
            logout();
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };
    return (<header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
                My App
            </Link>
            <div className="flex gap-4 items-center">
                {isAuthenticated && (
                    <>
                        <div className="relative group">
                            <span className="cursor-pointer">
                                Welcome, {user?.name || 'User'}
                            </span>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">

                                <button
                                    onClick={handleLogout}
                                    disabled={isLoading}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
                                >
                                    {isLoading ? 'Logging out...' : 'Logout'}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </nav>
    </header>)
}