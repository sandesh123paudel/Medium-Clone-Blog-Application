import React from "react";
import DocumentTitle from "../services/DocumentTitle";

const Home = () => {
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
          <button className="bg-green-600 px-6 py-2 sm:px-8 sm:py-3 hover:bg-green-700 rounded-full text-white mt-6 sm:mt-10 text-sm sm:text-base">
            Start Reading
          </button>
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

// <main className="flex items-start justify-center mt-20">
// <div className="w-full flex  md:flex-row items-center justify-between gap-100 px-12">
//   {/* Left Side - Text Content */}
//   <div className="w-full flex flex-col items-start justify-center  ">
//     <h1 className="text-[80px] leading-[85px] font-serif font-bold text-black">
//       Human
//     </h1>
//     <h1 className="text-[60px] leading-[85px] font-serif font-bold text-black">
//       stories & ideas
//     </h1>
//     <p className="text-xl text-[#242424] mt-6 mb-8">
//       A place to read, write, and deepen your understanding
//     </p>
//     <button className="bg-black text-white px-6 py-3 text-lg rounded-full hover:bg-gray-800 transition-colors duration-200">
//       Start reading
//     </button>
//   </div>

//   {/* Right Side - Image */}
//   <div className="w-full md:w-full hidden md:flex justify-center lg:justify-end">
//     <img
//       src="/homebanner.webp"
//       alt="Creativity graphic"
//       className="max-w-[420px] md:max-w-[500px] w-full h-auto object-contain"
//     />
//   </div>
// </div>
// </main>
