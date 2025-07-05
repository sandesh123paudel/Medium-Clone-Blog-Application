import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import DocumentTitle from "../services/DocumentTitle";
import { registerUser } from "../services/api/auth"; // Add this import

const Register = () => {
  DocumentTitle("Register: Medium");
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    name: "",
    email: "", // Fixed typo: was "emai"
    password: "",
  });

  // Add state for loading, error, and success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Registration successful! Redirecting to login....");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/login"); // Navigate to your home page route
      }, 1500); // Wa
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
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">Sign up to get started</p>
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
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              label="Full Name"
            />
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              label="Email address"
            />
            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              label="Password"
            />
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="text-white hover:text-black"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
            <Button
              type="button"
              className="bg-white hover:bg-black text-gray-700 hover:text-white border-gray-300"
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
              Sign up with Google
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-black hover:text-black"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
