import { useState, useEffect, useCallback } from "react";
import { getAuthToken } from "../services/api/api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = useCallback(() => {
    console.log("checkAuth called");
    try {
      const userData = localStorage.getItem("user");
      const token = getAuthToken();
      console.log("userData from storage:", userData);

      if (userData && token) {
        const parsedUser = JSON.parse(userData);
        // Ensure we have _id for consistency
        const normalizedUser = {
          ...parsedUser,
          _id: parsedUser._id || parsedUser.id, // Use _id if exists, otherwise use id
        };
        console.log("setting normalized user:", normalizedUser);
        setUser(normalizedUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect running");
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

  // Manual login function (if needed)
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

  return { user, isLoggedIn, checkAuth, login, logout };
};
