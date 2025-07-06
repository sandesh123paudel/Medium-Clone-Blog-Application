import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Stories from "./pages/Story";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import PostView from "./pages/PostView";
import EditPost from "./pages/EditPost";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { user, isLoggedIn } = useAuth();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/stories"
          element={isLoggedIn ? <Stories /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/write"
          element={isLoggedIn ? <Write /> : <Navigate to="/login" />}
        />
        <Route
          path="/library"
          element={isLoggedIn ? <Library /> : <Navigate to="/login" />}
        />
        <Route path="/post/:id" element={<PostView />} />
        <Route
          path="/edit/:id"
          element={isLoggedIn ? <EditPost /> : <Navigate to="/login" />}
        />
        {/* Catch all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
