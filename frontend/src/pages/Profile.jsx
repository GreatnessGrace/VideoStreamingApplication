import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile
    fetch("http://localhost:3000/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Profile;
