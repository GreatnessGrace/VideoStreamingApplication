import React, { useEffect, useState } from "react";
import { getRandomVideos } from "../../api";

const Random = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const response = await getRandomVideos();
        setVideos(response.data.data);
      } catch (err) {
        console.error(err.response.data.message);
      }
    };
    fetchRandom();
  }, []);

  return (
    <div>
      <h1>Random Videos</h1>
      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Random;
