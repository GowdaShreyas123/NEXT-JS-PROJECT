import React from "react";

const Navbar = () => {
  return (
   <nav className="fixed top-0 left-0 w-full z-50 bg-gray-300 shadow-md h-16 flex items-center relative">
  {/* Left aligned */}
  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-lg">
    nicepage
  </div>

  {/* Center aligned */}
  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center space-x-2">
    {/* Desktop View (Highlighted) */}
    <div className="p-2 bg-blue-100 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect x="4" y="3" width="16" height="12" rx="2"></rect>
        <path d="M8 17h8"></path>
      </svg>
    </div>

    {/* Tablet View */}
    <div className="p-2 hover:bg-gray-200 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect x="6" y="3" width="12" height="18" rx="2"></rect>
      </svg>
    </div>

    {/* Mobile Portrait */}
    <div className="p-2 hover:bg-gray-200 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect x="9" y="3" width="6" height="18" rx="2"></rect>
      </svg>
    </div>

    {/* Mobile Landscape */}
    <div className="p-2 hover:bg-gray-200 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect x="3" y="6" width="18" height="12" rx="2"></rect>
      </svg>
    </div>
  </div>
</nav>

  );
};

export default Navbar;