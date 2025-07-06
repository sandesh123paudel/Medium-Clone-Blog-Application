import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiCall } from "../services/api/api";
import { useAuth } from "../hooks/useAuth";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: null,
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await apiCall(`/posts/${id}`);
        const post = response.post;

        // Check if the user is the author
        if (!user || !post.userId || post.userId._id !== user._id) {
          navigate("/stories");
          return;
        }

        setFormData({
          title: post.title || "",
          content: post.content || "",
          category: post.category || "",
          tags: post.tags ? post.tags.join(", ") : "",
          image: post.image || null,
        });
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchPost();
    }
  }, [id, user, isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      setError("You must be logged in to edit a post");
      return;
    }

    setLoading(true);

    try {
      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("content", formData.content);
      postData.append("category", formData.category);
      postData.append(
        "tags",
        formData.tags.split(",").map((tag) => tag.trim())
      );

      if (formData.image instanceof File) {
        postData.append("image", formData.image);
      }

      await apiCall(`/posts/${id}`, {
        method: "PUT",
        body: postData,
        headers: {
          // Remove Content-Type to let browser set it with boundary for FormData
          "Content-Type": undefined,
        },
      });

      navigate(`/post/${id}`);
    } catch (err) {
      console.error("Error updating post:", err);
      setError(err.message || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mt-20 mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button
            onClick={() => navigate(-1)}
            className="ml-4 underline hover:no-underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mt-20 pb-20">
      <h1 className="text-4xl font-bold mb-8">Edit Story</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your story title"
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={formData.content}
            onChange={handleChange}
            rows="12"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your story here..."
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter tags separated by commas"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cover Image
          </label>
          {formData.image && typeof formData.image === "string" && (
            <div className="mb-2">
              <img
                src={`http://localhost:5000/${formData.image}`}
                alt="Current cover"
                className="w-32 h-32 object-cover rounded"
              />
              <p className="text-sm text-gray-500 mt-1">Current cover image</p>
            </div>
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
