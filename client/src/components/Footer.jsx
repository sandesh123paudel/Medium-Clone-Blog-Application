// src/components/Footer.jsx (Adjusted to be non-fixed and match Medium's typical links)
import React from "react";
import { Link } from "react-router-dom"; // Don't forget to import Link

const Footer = () => {
  return (
    // Removed 'fixed bottom-0 left-0' so it flows naturally after content
    <footer className="bg-white py-8 px-4 border-t border-gray-200">
      <div className="flex flex-wrap justify-center md:justify-between items-center max-w-7xl mx-auto text-sm text-gray-600 space-y-4 md:space-y-0">
        <p className="w-full md:w-auto text-center md:text-left">
          &copy; {new Date().getFullYear()} Medium Clone.
        </p>

        {/* Navigation Links for Footer */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2">
          <Link to="/help" className="hover:underline">
            Help
          </Link>
          <Link to="/status" className="hover:underline">
            Status
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/careers" className="hover:underline">
            Careers
          </Link>
          <Link to="/press" className="hover:underline">
            Press
          </Link>
          <Link to="/blog" className="hover:underline">
            Blog
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms
          </Link>
          <Link to="/text-to-speech" className="hover:underline">
            Text to speech
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
