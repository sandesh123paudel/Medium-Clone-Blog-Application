// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <section className="flex items-center justify-center pt-20 ">
      <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-100 px-164">
        {/* Left Side - Text Content */}
        <div className="w-full flex flex-col items-start justify-center  ">
          <h1 className="text-[80px] leading-[85px] font-serif font-bold text-black">
            Human
          </h1>
          <h1 className="text-[60px] leading-[85px] font-serif font-bold text-black">
            stories & ideas
          </h1>
          <p className="text-xl text-[#242424] mt-6 mb-8">
            A place to read, write, and deepen your understanding
          </p>
          <button className="bg-black text-white px-6 py-3 text-lg rounded-full hover:bg-gray-800 transition-colors duration-200">
            Start reading
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-full hidden md:flex justify-center lg:justify-end">
          <img
            src="/homebanner.webp"
            alt="Creativity graphic"
            className="max-w-[420px] md:max-w-[500px] w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
