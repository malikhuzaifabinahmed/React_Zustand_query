import React from "react"
import { useRouteError } from "react-router-dom"

export const GlobalErrorElement = ({ error, resetErrorBoundary }) => {
  const routeError = useRouteError()
  const errorMessage = error?.message || routeError?.statusText || "Something went wrong!"

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h1 className="mb-4 font-bold text-2xl text-red-600">Oops!</h1>
        <div className="mb-4">
          <p className="text-gray-600">{errorMessage}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition-colors duration-200"
          >
            Go Home
          </button>
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white transition-colors duration-200"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}