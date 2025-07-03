// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {" "}
      {/* Light beige/off-white background */}
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-4 md:py-24">
        {/* Left Content (Text and Button) */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4 font-poppins text-gray-900">
            {" "}
            {/* Using Poppins */}
            Human stories & ideas
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-md mx-auto md:mx-0">
            A place to read, write, and deepen your understanding.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800 transition-colors duration-200 font-medium">
            Start reading
          </button>
        </div>

        {/* Right Content (Green Graphic) */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          {/* Replace with your actual image path */}
          <img
            src="/homebanner.webp" // Path to your saved graphic
            alt="Human creativity and ideas graphic"
            className="w-full max-w-md md:max-w-xl object-contain" // Adjust size as needed
          />
        </div>
      </section>
      {/* Placeholder for content below the hero section, like trending posts or categories */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">Trending on Medium</h2>
        {/* You would list your blog posts or categories here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example post card */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Sample Post Title</h3>
            <p className="text-gray-700">
              A short description of the sample post content...
            </p>
            <span className="text-blue-600 text-sm mt-3 inline-block">
              Read more
            </span>
          </div>
          {/* Repeat for more posts */}
        </div>
      </section>
    </div>
  );
};

export default Home;
