import React from "react";

export const Logo = () => {
  return (
    <div className="title-font flex items-center font-medium text-gray-900">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-10 w-10 rounded-full bg-red-500 p-2 text-white"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl">Recipe AI</span>
    </div>
  );
};
