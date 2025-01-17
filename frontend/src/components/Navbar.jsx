import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-red-500">YouTube Clone</div>
      <input
        type="text"
        placeholder="Search"
        className="flex-1 mx-4 px-4 py-2 border rounded"
      />
      <div className="flex items-center space-x-4">
        <button>Login</button>
        <img
          src="/profile-placeholder.png"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
