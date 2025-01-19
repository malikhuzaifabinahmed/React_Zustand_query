export function GlobalError({ error }) {
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-bold text-2xl text-red-600">
          Oops! Something went wrong
        </h2>
        <p className="mb-4 text-gray-600">
          {error?.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
