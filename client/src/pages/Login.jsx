import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import DocumentTitle from "../services/DocumentTitle";
import { loginUser } from "../services/api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  DocumentTitle("Login: Medium");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await loginUser(formData);

      setSuccess("Login successful. Redirecting to home page...");
      setTimeout(() => {
        login(response.user, response.token);

        navigate("/"); // Navigate to your home page route
      }, 1500);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 flex items-center justify-center px-4 py-12 bg-[#F7F4ED]">
      <div className="max-w-md w-full space-y-8 bg-[#F7F4ED] p-8 border-none shadow-none rounded-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              id="email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Email address"
              required
              label="Email address"
              onChange={handleInputChange}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              label="Password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-black-600 focus:ring-black border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-black hover:text-black">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="bg-black text-white"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <Button
              type="button"
              className="bg-white text-black hover:bg-black hover:text-white border-gray-300"
            >
              <img
                className="h-5 w-5 mr-2"
                src="google.png" // Placeholder for Google logo
                alt="Google logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/20x20/cccccc/000000?text=G";
                }} // Fallback
              />
              Sign in with Google
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="font-medium text-black hover:text-black"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
