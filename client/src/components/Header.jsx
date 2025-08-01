import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const { user, isLoggedIn, logout } = useAuth();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Navigation items for non-logged in users
  const publicNavItems = [
  
    { title: "Write", url: "/write" },
    { title: "Sign in", url: "/login" },
  ];

  // Navigation items for logged in users
  const privateNavItems = [
    { title: "Write", url: "/write" },
    { title: "Stories", url: "/stories" },
    { title: "Library", url: "/library" },
  ];

  const navItems = isLoggedIn ? privateNavItems : publicNavItems;

  //check if user is logged in
  useEffect(() => {
    console.log(user, isLoggedIn);
  }, [user, isLoggedIn]);

  return (
    <header className="fixed top-0 left-0 w-full border-b border-black z-50 bg-[#F7F4ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/full-logo.png" alt="Medium Logo" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200"
              >
                {item.title}
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Hello, {user?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-normal hover:bg-red-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-normal hover:bg-gray-800 transition-colors duration-200"
              >
                Get started
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            ref={buttonRef}
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
          <div
            ref={menuRef}
            className={`md:hidden  overflow-hidden transition-all duration-300 ease-in-out transform  ${
              isMenuOpen
                ? "max-h-96 opacity-100 scale-y-100 place-items-center justify-center text-center"
                : "max-h-0 opacity-0 scale-y-95"
            } origin-top border-t border-gray-200`}
          >
            <nav className="px-2 pt-2 pb-3 space-y-1 ">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.url}
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-normal transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              {isLoggedIn ? (
                <div className="px-3 py-2 space-y-2">
                  <div className="text-sm text-gray-600">
                    Hello, {user?.name || "User"}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full bg-red-600 text-white px-4 py-2 rounded-full text-sm font-normal hover:bg-red-700 transition-colors duration-200 text-center"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/register"
                  className="block mx-3 mt-2 bg-black text-white px-4 py-2 rounded-full text-sm font-normal hover:bg-gray-800 transition-colors duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get started
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
