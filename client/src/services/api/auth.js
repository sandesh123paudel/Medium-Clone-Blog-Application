import { apiCall, setAuthToken } from "./api";

//Register Function
export const registerUser = async (userData) => {
  try {
    const response = await apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    //If registration is successful, store the token
    if (response.token) {
      setAuthToken(response.token);
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
    }
    return response;
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
};

//Logout Function
export const logoutUser = () => {
  setAuthToken(null);
};
