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
      .then((data) => {
        console.log(data); // Log the response data to inspect its structure
        setVideos(data.videos || data); // If data has a 'videos' key, use that
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 grid grid-cols-4 gap-4">
          {Array.isArray(videos) && videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
