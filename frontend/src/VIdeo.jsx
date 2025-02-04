import React, { useEffect, useState } from "react";
import axios from "axios";

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch video data from the backend
    axios
      .get("http://localhost:5000/videos")
      .then((response) => {
       console.log("response",response)
        setVideos(response.data);
      })
      .catch((err) => {
        console.error("Error fetching videos", err.message);
      });
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Uploaded Videos</h2>
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video._id} className="mb-4">
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <video
              controls
              width="100%"
              className="rounded shadow"
              src={`http://localhost:5000/uploads/${video.filename}`}
            />
          </div>
        ))
      ) : (
        <p>No videos found.</p>
      )}
    </div>
  );
};

export default VideoPlayer;
