import React from "react";

const Sidebar = () => {
  const categories = ["Home", "Trending", "Subscriptions", "Library"];
  return (
    <aside className="w-60 bg-white p-4 shadow-lg h-screen sticky top-0">
      <ul>
        {categories.map((category, idx) => (
          <li
            key={idx}
            className="p-2 text-gray-700 hover:bg-gray-200 rounded cursor-pointer"
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
