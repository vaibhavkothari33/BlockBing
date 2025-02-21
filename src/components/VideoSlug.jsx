import React from 'react';
import { FaTimes } from 'react-icons/fa';
import VideoPlayer from './VideoPlayer/VideoPlayer';

const VideoSlug = ({ movie, onClose }) => {
  console.log("VideoSlug received movie:", movie); // Debug log

  if (!movie || !movie.playbackId) {
    console.error("Missing movie data or playbackId");
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50">
      <div className="relative h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white"
        >
          <FaTimes className="text-2xl" />
        </button>

        <div className="h-full">
          <VideoPlayer 
            playbackId={movie.playbackId}
            poster={movie.image}
            title={movie.title}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSlug; 