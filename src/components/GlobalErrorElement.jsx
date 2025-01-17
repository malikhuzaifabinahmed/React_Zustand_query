import React from 'react';
import { useRouteError } from 'react-router-dom';

export const GlobalErrorElement = ({ error, resetErrorBoundary }) => {
    const routeError = useRouteError();
    const errorMessage = routeError?.statusText || 'Something went wrong!';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Oops!</h1>
                <div className="mb-4">
                    <p className="text-gray-700">{errorMessage}</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Go Home
                    </button>
                    {resetErrorBoundary && (
                        <button
                            onClick={resetErrorBoundary}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
