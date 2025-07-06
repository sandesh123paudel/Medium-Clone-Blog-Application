import React from "react";
import DocumentTitle from "../services/DocumentTitle";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
const Home = () => {
  const { user, isLoggedIn } = useAuth();
  DocumentTitle("Medium: Read and write stories");
  return (
    <>
      <section className="flex mt-20 justify-between items-center min-h-[calc(100vh-5rem)] lg:min-h-0 ">
        <div className="flex flex-col items-start justify-center ml-4 sm:ml-8 md:ml-16 lg:ml-36 lg:items-start w-full lg:w-auto">
          <p className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-semi-bold font-serif leading-tight">
            Human
          </p>
          <p className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-semi-bold font-serif leading-tight -mt-8">
            stories & ideas
          </p>
          <p className="text-sm sm:text-base md:text-lg mt-2">
            A place to read, write, and deepen your understanding
          </p>
          {isLoggedIn ? (
            <Link
              to="/stories"
              className="bg-green-600 px-6 py-2 sm:px-8 sm:py-3 hover:bg-green-700 rounded-full text-white mt-6 sm:mt-10 text-sm sm:text-base"
            >
              Start Reading
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-green-600 px-6 py-2 sm:px-8 sm:py-3 hover:bg-green-700 rounded-full text-white mt-6 sm:mt-10 text-sm sm:text-base">
                Start Reading
              </button>
            </Link>
          )}
        </div>
        <img
          src="homebanner.webp"
          alt="Creativity graphic"
          className="max-w-[420px] md:max-w-[500px] h-auto object-contain mr-0 hidden lg:block"
        />
      </section>
    </>
  );
};

export default Home;
