import { apiCall, getAuthToken } from "./api"; // Adjust path as needed

// Create new blog post (with image)
export const createPost = async (postData) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("You must be logged in to create a post");
  }

  try {
    const response = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: postData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to create post");
    }

    return data.post;
  } catch (error) {
    console.error("Error in createPost:", error);
    throw new Error(
      error.message || "Failed to create post. Please try again."
    );
  }
};

// Get all posts
export const getAllPosts = async () => {
  const response = await apiCall("/posts");
  return response.posts || [];
};

// Get user's posts
export const getUserPosts = async (userId) => {
  try {
    console.log("Fetching posts for user ID:", userId);
    const response = await apiCall(`/posts/user/${userId}`);
    console.log("API response:", response);

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch posts");
    }

    if (!response.posts || !Array.isArray(response.posts)) {
      console.error("Invalid posts data received:", response);
      throw new Error("Invalid response format");
    }

    return response.posts;
  } catch (error) {
    console.error("Error in getUserPosts:", error);
    throw error;
  }
};

// Get single post by ID
export const getPost = async (id) => {
  const response = await apiCall(`/posts/${id}`);
  return response.post;
};

// Update post
export const updatePost = async (id, postData) => {
  const token = getAuthToken();

  const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: postData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update post");
  }

  return data.post;
};

// Delete post
export const deletePost = async (id) => {
  const response = await apiCall(`/posts/${id}`, {
    method: "DELETE",
  });
  return response.success;
};
