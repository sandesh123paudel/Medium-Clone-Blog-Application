// src/components/Header.jsx (Updated to match Medium's style)
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    // Background color, padding, border-bottom similar to Medium
    <header className="bg-white py-4 px-4 border-b border-gray-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto"> {/* Increased max-width for wider layout */}
        {/* Left side: Logo/Text */}
        <Link to="/" className="text-3xl font-extrabold text-black font-poppins"> {/* Using Poppins if you added it */}
          Medium
          {/* Or an image logo if you have one: <img src="/medium-logo.png" alt="Medium Logo" className="h-6" /> */}
        </Link>

        {/* Right side: Navigation and Buttons */}
        <nav className="flex items-center space-x-6">
          <Link to="/our-story" className="text-gray-700 hover:text-gray-900 text-sm">
            Our story
          </Link>
          <Link to="/membership" className="text-gray-700 hover:text-gray-900 text-sm">
            Membership
          </Link>
          <Link to="/write" className="text-gray-700 hover:text-gray-900 text-sm">
            Write
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-gray-900 text-sm">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors duration-200"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;