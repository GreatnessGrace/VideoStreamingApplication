import React from "react";
import "../styles/VideoDetails.css";

const VideoDetail = ({ video }) => {
  if (!video) return <p>Loading...</p>;

  return (
    <div className="video-detail-container">
      <iframe
        className="video-frame"
        src={`https://www.youtube.com/embed/${video.id}`}
        title={video.title}
        allowFullScreen
      />
      <h2>{video.title}</h2>
      <p>{video.description}</p>
    </div>
  );
};

export default VideoDetail;
