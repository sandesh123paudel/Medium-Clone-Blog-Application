import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserPosts } from "../services/api/posts";
import { Link } from "react-router-dom";
import Loading from "../components/ui/Loading";
import DocumentTitle from "../services/DocumentTitle";

const Library = () => {
  DocumentTitle("Library");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    const loadPosts = async () => {
      // If not logged in, don't try to fetch
      if (!isLoggedIn || !user?._id) {
        console.log("Not logged in or no user ID:", {
          isLoggedIn,
          userId: user?._id,
        });
        setLoading(false);
        return;
      }

      try {
        console.log("Library - Current auth state:", {
          isLoggedIn,
          userId: user._id,
          userObj: user,
        });

        // Log the actual localStorage contents
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        console.log("Library - Local storage:", {
          user: storedUser ? JSON.parse(storedUser) : null,
          hasToken: !!storedToken,
        });

        const userPosts = await getUserPosts(user._id);
        console.log(
          "Library - Fetched posts:",
          userPosts.map((post) => ({
            id: post._id,
            title: post.title,
            userId: post.userId._id,
            userMatch: post.userId._id === user._id,
          }))
        );

        setPosts(userPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message || "Failed to fetch your posts");
        toast.error(err.message || "Failed to fetch your posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [isLoggedIn, user?._id]); // Depend on both isLoggedIn and user ID

  if (loading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mt-9 mx-auto p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Please log in to view your library
        </div>
        <Link
          to="/login"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mt-9 mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and view all your published stories
          </p>
        </div>
        <Link
          to="/write"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Write new story
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h2 className="mt-4 text-lg font-medium text-gray-900">
            No stories yet
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Get started by creating your first story
          </p>
          <Link
            to="/write"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Write your first story
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              to={`/post/${post._id}`}
              key={post._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="relative h-48">
                {post.image && (
                  <img
                    src={`http://localhost:5000/${post.image}`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-800 shadow-sm">
                    {post.readTime} min read
                  </span>
                </div>
              </div>

              <div className="flex-1 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.preview}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      View story
                    </span>
                  </div>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
