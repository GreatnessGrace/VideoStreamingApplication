import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-4">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 font-bold text-lg">{video.title}</h3>
      <p className="text-sm text-gray-600">{video.views} views • {video.time}</p>
    </div>
  );
};

export default VideoCard;
