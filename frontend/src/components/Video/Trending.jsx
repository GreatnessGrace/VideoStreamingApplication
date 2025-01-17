import React, { useEffect, useState } from "react";
import { getTrendingVideos } from "../../api";

const Trending = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await getTrendingVideos();
        setVideos(response.data.data);
      } catch (err) {
        console.error(err.response.data.message);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div>
      <h1>Trending Videos</h1>
      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Trending;
