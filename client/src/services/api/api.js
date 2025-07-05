const API_BASE_URL = "http://localhost:5000/api";

//Helper Function to make API calls

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // console.log("Making API call to:", url);
  // console.log("With options:", options);

  const config = {
    headers: {
      "Content-Type": "application/json",
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
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message || "Network  error");
  }
};

//Function to set authorization token

export const setAuthToken = (token) => {
  if (token) {
    //store
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
