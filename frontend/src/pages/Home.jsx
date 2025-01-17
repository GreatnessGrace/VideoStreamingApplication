import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import "../styles/Home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch trending videos from API
    fetch("http://localhost:3000/videos/trend")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 grid grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
