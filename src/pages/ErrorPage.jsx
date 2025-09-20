import React from "react";
import { useRouteError } from "react-router";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center bg-white rounded-2xl p-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <AlertTriangle className="h-10 w-10" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Something went wrong</h1>
        <p className="text-gray-600 mb-4">
          Sorry, an unexpected error has occurred. Please try again or return home.
        </p>

        {/* Error details */}
        {error && (
          <p className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-md mb-6">
            {error.statusText || error.message}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
