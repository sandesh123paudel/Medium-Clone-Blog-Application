import React from "react";

const Loading = ({ size = "default", center = true }) => {
  const sizeClasses = {
    small: "h-6 w-6 border-2",
    default: "h-12 w-12 border-2",
    large: "h-16 w-16 border-3",
  };

  const containerClasses = center
    ? "flex justify-center items-center min-h-[60vh]"
    : "";

  return (
    <div className={containerClasses}>
      <div
        className={`animate-spin rounded-full border-t-green-500 border-r-green-500 border-b-green-500 border-l-transparent ${
          sizeClasses[size] || sizeClasses.default
        }`}
      />
    </div>
  );
};

export default Loading;
