import { useState, useEffect, useCallback } from "react";
import { getAuthToken } from "../services/api/api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(() => {
    try {
      const userData = localStorage.getItem("user");
      const token = getAuthToken();

      if (userData && token) {
        const parsedUser = JSON.parse(userData);
        // Ensure we have _id for consistency
        const normalizedUser = {
          ...parsedUser,
          _id: parsedUser._id || parsedUser.id, // Use _id if exists, otherwise use id
        };
        setUser(normalizedUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();

    // Listen for custom auth changes (same tab)
    const handleAuthChange = () => {
      checkAuth();
    };

    // Listen for storage changes (different tabs)
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === "token") {
        checkAuth();
      }
    };

    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkAuth]);

  // Manual login function
  const login = (userData, token) => {
    // Ensure we store user data with _id
    const normalizedUserData = {
      ...userData,
      _id: userData._id || userData.id, // Use _id if exists, otherwise use id
    };
    localStorage.setItem("user", JSON.stringify(normalizedUserData));
    localStorage.setItem("token", token);
    setUser(normalizedUserData);
    setIsLoggedIn(true);
    // Dispatch event for other tabs
    window.dispatchEvent(new StorageEvent("storage", { key: "user" }));
  };

  // Manual logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    // Dispatch event for other tabs
    window.dispatchEvent(new StorageEvent("storage", { key: "user" }));
  };

  return { user, isLoggedIn, isLoading, checkAuth, login, logout };
};
