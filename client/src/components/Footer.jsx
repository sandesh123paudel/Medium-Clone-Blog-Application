import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-[#F7F4ED] fixed shadow w-full  bottom-0 left-0 z-50">
      <hr className="border-t border-gray-600 w-full" />{" "}
      <div className="flex justify-center items-center max-w-5xl mx-auto px-4 py-3">
        <p className="text-sm text-gray-700">
          {" "}
          {/* Static text color */}
          &copy; {new Date().getFullYear()} Medium Clone. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
