import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiCall, getAuthToken } from "../services/api/api";
import { useAuth } from "../hooks/useAuth";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";

// Available categories
const CATEGORIES = [
  "Technology",
  "Health",
  "Education",
  "Travel",
  "Food",
  "Lifestyle",
  "Business",
  "Entertainment",
  "Sports",
  "News",
  "Other",
];

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });
  const [currentImage, setCurrentImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (authLoading) {
          return;
        }

        if (!isLoggedIn || !user?._id) {
          setError("Please log in to edit posts");
          setLoading(false);
          return;
        }

        const response = await apiCall(`/posts/${id}`);

        if (!response.post) {
          setError("Post not found");
          return;
        }

        const postAuthorId = String(response.post.userId._id);
        const currentUserId = String(user._id);

        if (postAuthorId !== currentUserId) {
          setError("You are not authorized to edit this post");
          return;
        }

        // Format tags as comma-separated string
        let formattedTags = "";
        if (response.post.tags) {
          // If tags is a string that looks like an array, parse it
          if (
            typeof response.post.tags === "string" &&
            response.post.tags.startsWith("[")
          ) {
            try {
              const parsedTags = JSON.parse(response.post.tags);
              formattedTags = parsedTags.join(", ");
            } catch (e) {
              formattedTags = response.post.tags;
            }
          }
          // If tags is already an array
          else if (Array.isArray(response.post.tags)) {
            formattedTags = response.post.tags.join(", ");
          }
          // If it's a string but not an array format
          else {
            formattedTags = response.post.tags;
          }
        }

        setFormData({
          title: response.post.title || "",
          content: response.post.content || "",
          category: response.post.category || "",
          tags: formattedTags,
        });

        if (response.post.image) {
          setCurrentImage(`http://localhost:5000/${response.post.image}`);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user, isLoggedIn, authLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !user?._id) {
      setError("Please log in to edit posts");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category", formData.category);

      // Convert comma-separated tags to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      // Send tags as a JSON string array
      formDataToSend.append("tags", JSON.stringify(tagsArray));

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const token = getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update post");
      }

      navigate(`/post/${id}`);
    } catch (err) {
      console.error("Error updating post:", err);
      setError(err.message || "Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mt-20 mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p>{error}</p>
          <div className="mt-4">
            <button
              onClick={() => navigate(`/post/${id}`)}
              className="text-blue-600 hover:text-blue-800 underline mr-4"
            >
              Back to Post
            </button>
            <button
              onClick={() => navigate("/stories")}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Go to Stories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-20 ">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder="Enter post title"
          label="Title"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="Write your post content here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-white"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="Enter tags separated by commas (e.g., javascript, react, web)"
          />
          <p className="mt-1 text-sm text-gray-500">
            Separate multiple tags with commas (e.g., technology, programming,
            web development)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image
          </label>
          {(currentImage || imagePreview) && (
            <div className="mb-4">
              <img
                src={imagePreview || currentImage}
                alt="Preview"
                className="w-full max-h-[400px] object-cover rounded-lg"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-black text-white hover:bg-gray-800"
          >
            {loading ? "Updating..." : "Update Post"}
          </Button>
          <Button
            type="button"
            onClick={() => navigate(`/post/${id}`)}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
