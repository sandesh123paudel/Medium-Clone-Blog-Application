import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import DocumentTitle from "../services/DocumentTitle";

const Login = () => {
  DocumentTitle("Login: Medium");

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

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              required
              label="Email address"
            />
            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              label="Password"
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
            <Button type="submit" className="bg-black text-white">
              Sign in
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
