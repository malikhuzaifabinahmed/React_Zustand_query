import React from 'react';

export function GlobalError({ error }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
                <p className="text-gray-600 mb-4">{error?.message || 'An unexpected error occurred'}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Reload Page
                </button>
            </div>
        </div>
    );
}
