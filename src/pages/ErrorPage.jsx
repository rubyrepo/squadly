import React from "react";
import { useRouteError } from "react-router";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-600 p-5 rounded-full inline-flex items-center justify-center">
            <AlertTriangle className="h-12 w-12" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Something went wrong</h1>
        <p className="text-gray-600 mb-4">
          An unexpected error occurred. Please try again or return home.
        </p>

        {/* Error details */}
        {error && (
          <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-md mb-6 break-words">
            {error.statusText || error.message}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors font-medium"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
