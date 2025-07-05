const API_BASE_URL = "http://localhost:5000/api";

//Helper Function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get token from localStorage instead of sessionStorage
  const token = getAuthToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

//Function to set authorization token
export const setAuthToken = (token) => {
  if (token) {
    //store in localStorage for persistence across tabs
    localStorage.setItem("token", token);
  } else {
    //remove
    localStorage.removeItem("token");
  }
};

// Function to get stored token
export const getAuthToken = () => {
  return localStorage.getItem("token");
};
