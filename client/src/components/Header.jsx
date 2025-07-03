// src/components/Header.jsx (Updated to match Medium's style)
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full border-b border-black z-50 bg-[#F7F4ED] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/full-logo.png" alt="Medium Logo" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/our-story"
              className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200"
            >
              Our story
            </Link>
            <Link
              to="/membership"
              className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200"
            >
              Membership
            </Link>
            <Link
              to="/write"
              className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200"
            >
              Write
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="bg-black text-white px-4 py-2 rounded-full text-sm font-normal hover:bg-gray-800 transition-colors duration-200"
            >
              Get started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 ">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/our-story"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Our story
              </Link>
              <Link
                to="/membership"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Membership
              </Link>
              <Link
                to="/write"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Write
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="block mx-3 mt-2 bg-black text-white px-4 py-2 rounded-full text-sm font-normal hover:bg-gray-800 transition-colors duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
