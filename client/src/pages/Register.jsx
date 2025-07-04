import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Retained for local UI feedback

  const handleRegister = (e) => {
    e.preventDefault();
    // Placeholder for registration logic (no Firebase)
    console.log("Attempting to register with:", { name, email, password });
    setMessage("Registration attempt: (No backend connected)");
    // In a real app, you would call an API here
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

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <InputField
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              label="Full Name"
            />
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              label="Email address"
            />
            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              label="Password"
            />
          </div>

          <div className="space-y-4">
            <Button type="submit" className="text-white hover:text-black">
              Sign up
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

        {message && (
          <div className="mt-4 p-3 rounded-lg text-center bg-blue-100 text-blue-700">
            {message}
          </div>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-black hover:text-black">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};
export default Register;
