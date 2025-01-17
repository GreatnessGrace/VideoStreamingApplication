import React from "react";

const Comments = ({ comments }) => {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-xl">Comments</h2>
      <div className="space-y-4 mt-4">
        {comments.map((comment, idx) => (
          <div key={idx} className="bg-gray-100 p-4 rounded">
            <h4 className="font-semibold">{comment.user}</h4>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
