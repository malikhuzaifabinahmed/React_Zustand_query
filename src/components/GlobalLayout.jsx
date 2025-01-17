import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const GlobalLayout = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            }
        >
            <div className="min-h-screen bg-gray-50">
                {/* Optional Global Header */}
                {/* <header className="bg-white shadow-sm">
          // Global header content
        </header> */}

                {/* Main Content */}
                <main>
                    <Outlet />
                </main>

                {/* Optional Global Footer */}
                <footer className="bg-gray-800 text-white py-4 mt-auto">
                    <div className="container mx-auto text-center">
                        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </Suspense>
    );
};
