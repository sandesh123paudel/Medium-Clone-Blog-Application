import { apiCall, setAuthToken } from "./api";

//Register Function
export const registerUser = async (userData) => {
  try {
    const response = await apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    //If registration is successful, store the token and user data
    if (response.token) {
      setAuthToken(response.token);
      // Store user data in localStorage
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
    }
    return response;
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
};

//Login Function
export const loginUser = async (credentials) => {
  try {
    const response = await apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      setAuthToken(response.token);
      // Store user data in localStorage
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
    }
    return response;
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

// Logout function
export const logoutUser = () => {
  setAuthToken(null);
  localStorage.removeItem("user");
};
