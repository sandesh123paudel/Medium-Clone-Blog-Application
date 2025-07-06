import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api/posts";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import { toast } from "react-hot-toast";
import DocumentTitle from "../services/DocumentTitle";

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

const Write = () => {
  DocumentTitle("Write");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    preview: "",
    category: "",
    tags: "",
  });

  const [cardImage, setCardImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardImageChange = (e) => {
    const file = e.target.files[0];
    setCardImage(file);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!cardImage) {
        throw new Error("Card image is required");
      }

      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("content", formData.content);
      postData.append("preview", formData.preview);
      postData.append("category", formData.category);
      postData.append("tags", tagsArray.join(","));
      postData.append("image", cardImage);
      if (coverImage) {
        postData.append("coverImage", coverImage);
      }

      await createPost(postData);
      toast.success("Blog published successfully!");
      navigate("/library");
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mt-20 pb-20 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          maxLength={200}
        />

        <div>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your story..."
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
            minLength={10}
          />
        </div>

        <div>
          <textarea
            name="preview"
            value={formData.preview}
            onChange={handleChange}
            placeholder="Write a short preview of your story (max 500 characters)"
            className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            maxLength={500}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <InputField
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Image (Required)
          </label>
          <p className="text-sm text-gray-500 mb-2">
            This image will be shown in the blog card preview
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleCardImageChange}
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image (Optional)
          </label>
          <p className="text-sm text-gray-500 mb-2">
            This image will be shown as a featured image in the blog post
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="w-full"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Publish Post"}
        </Button>
      </form>
    </div>
  );
};

export default Write;
