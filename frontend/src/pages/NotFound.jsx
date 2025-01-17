import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
