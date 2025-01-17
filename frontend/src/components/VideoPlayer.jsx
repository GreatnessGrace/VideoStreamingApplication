import React from "react";

const VideoPlayer = ({ video }) => {
  return (
    <div className="bg-black w-full h-80">
      <video
        src={video.url}
        controls
        className="w-full h-full object-cover"
      ></video>
    </div>
  );
};

export default VideoPlayer;
