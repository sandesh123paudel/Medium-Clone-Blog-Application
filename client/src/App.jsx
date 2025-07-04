import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Post from "./pages/Post";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Stories from "./pages/Story";
import Membership from "./pages/Membership";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Stories />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<Write />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
