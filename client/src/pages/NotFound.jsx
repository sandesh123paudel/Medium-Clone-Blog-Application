import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NotFound = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className=" flex items-center justify-center px-4 mt-20">
      <div className="max-w-lg w-full text-center">
        {/* 404 Image */}
        <div className="mb-8">
          <img
            src="/404-dark.png"
            alt="404 Error"
            className="w-full  mx-auto h-80  object-contain"
          />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-[#00000069] transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>

          {isLoggedIn && (
            <Link
              to="/write"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Write a Story
            </Link>
          )}
        </div>

        {/* Search Suggestion */}
        <p className="mt-8 text-sm text-gray-500">
          Looking for something specific?{" "}
          <Link
            to="/story"
            className="text-green-600 hover:text-green-800 font-medium"
          >
            Browse all stories
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
