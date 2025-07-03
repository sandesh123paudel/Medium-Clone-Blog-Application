import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <h1 className="text-4xl font-bold">Login</h1>
      <form className="flex flex-col items-center justify-center">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
