import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-300 dark:bg-gray-800 shadow-md h-16 flex items-center px-4 sm:px-6 lg:px-8">
      {/* Left aligned - Brand */}
      <div className="text-blue-600 dark:text-white font-bold text-lg">
        nicepage
      </div>

      {/* Center aligned - View icons */}
      <div className="ml-auto mr-auto flex space-x-2">
        {/* Desktop View */}
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600 dark:text-blue-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect x="4" y="3" width="16" height="12" rx="2" />
            <path d="M8 17h8" />
          </svg>
        </div>

        {/* Tablet View */}
        <div className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect x="6" y="3" width="12" height="18" rx="2" />
          </svg>
        </div>

        {/* Mobile Portrait */}
        <div className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect x="9" y="3" width="6" height="18" rx="2" />
          </svg>
        </div>

        {/* Mobile Landscape */}
        <div className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect x="3" y="6" width="18" height="12" rx="2" />
          </svg>
        </div>
      </div>

      {/* Optional: Right side content (like profile/settings) */}
      <div className="hidden md:block">
        {/* Add right-side buttons or icons here */}
      </div>
    </nav>
  );
};

export default Navbar;
