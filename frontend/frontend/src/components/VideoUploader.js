import React, { useState } from 'react';

function VideoUploader() {
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);

  function handleVideoUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setVideoPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <input type="file" accept=".mp4" onChange={handleVideoUpload} />
      {videoPreviewUrl && (
        <video controls width="250">
          <source src={videoPreviewUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default VideoUploader;
