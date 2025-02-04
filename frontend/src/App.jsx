import React, { useState } from "react";
import axios from "axios";
import Video from './VIdeo'
const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => setVideoFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      alert("Video uploaded successfully!");
      setUploadProgress(0);
    } catch (err) {
      console.error("Error uploading video", err);
      alert("Upload failed.");
      setUploadProgress(0);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Video/>
      <form onSubmit={handleUpload}>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Select Video:
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="border rounded p-2 w-full"
          />
        </label>

        {/* Progress Bar */}
        {uploadProgress > 0 && (
          <div className="relative pt-1">
            <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              >
                {uploadProgress}%
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default App;
