import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import VideoPlayer from "../components/VideoPlayer";
import Comments from "../components/Comments";

const Watch = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch video data
    fetch(`http://localhost:3000/videos/${videoId}`)
      ?.then((res) => res?.json())
      ?.then((data) => setVideo(data));

    // Fetch comments
    fetch(`http://localhost:3000/videos/${videoId}/comments`)
      ?.then((res) => res.json())
      ?.then((data) => setComments(data));
  }, [videoId]);

  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <VideoPlayer video={video} />
        <h1 className="text-2xl font-bold mt-4">{video?.title}</h1>
        <p className="text-gray-600">{video?.views} views</p>
        <Comments comments={comments} />
      </div>
    </div>
  );
};

export default Watch;
