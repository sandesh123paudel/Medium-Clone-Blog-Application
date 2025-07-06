import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiCall } from "../services/api/api";
import { useAuth } from "../hooks/useAuth";

const PostView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiCall(`/posts/${id}`);
        if (!response.post) {
          setError("Post not found");
          return;
        }
        setPost(response.post);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!user || !user._id) {
      setError("You must be logged in to delete a post");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setLoading(true);
      await apiCall(`/posts/${id}`, { method: "DELETE" });
      navigate("/stories");
    } catch (err) {
      console.error("Error deleting post:", err);
      setError(err.message || "Failed to delete post");
      setLoading(false);
    }
  };

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

  if (!post || !post.userId) {
    return (
      <div className="max-w-4xl mt-20 mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Post not found
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

  const isAuthor = user && post.userId._id === user._id;

  return (
    <article className="max-w-4xl mt-20 mx-auto px-4 pb-20">
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium">
                {post.userId.name ? post.userId.name.charAt(0) : "?"}
              </span>
            </div>
            <div>
              <p className="font-medium">
                {post.userId.name || "Unknown Author"}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* Category and Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.category && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {post.category}
            </span>
          )}
          {post.tags &&
            post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Cover Image */}
        {post.image && (
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <img
              src={`http://localhost:5000/${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </header>

      {/* Content Section */}
      <div className="prose prose-lg max-w-none">
        {post.content &&
          post.content.split("\n").map(
            (paragraph, index) =>
              paragraph.trim() && (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              )
          )}
      </div>

      {/* Actions Section */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link
            to="/stories"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Stories
          </Link>

          {isAuthor && (
            <div className="flex gap-4">
              <Link
                to={`/edit/${post._id}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Post
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostView;
