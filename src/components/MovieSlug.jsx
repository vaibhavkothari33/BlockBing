import React, { useState } from 'react';
import { FaEthereum, FaPlay, FaTimes, FaStar, FaHeart } from 'react-icons/fa';
import VideoPlayer from './VideoPlayer';
import { videoSources } from '../data/videos';
import VideoSlug from './VideoSlug';

const MovieSlug = ({ movie, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!movie) return null;

  if (isPlaying) {
    const videoSource = videoSources[movie.id]?.src || 
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    
    return (
      <VideoSlug
        movie={movie}
        videoSource={videoSource}
        onClose={() => {
          setIsPlaying(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative bg-dark-lighter w-full max-w-4xl rounded-2xl overflow-hidden animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Hero Section */}
        <div className="relative h-[400px]">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-lighter via-transparent to-transparent" />
          
          {/* Play Button Overlay */}
          <button 
            onClick={() => setIsPlaying(true)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/90 p-6 rounded-full hover:bg-primary transition-colors group"
          >
            <FaPlay className="text-3xl transform translate-x-0.5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 -mt-20 relative">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span>•</span>
                <span>{movie.genre}</span>
                <div className="flex items-center gap-1">
                  <span>•</span>
                  <FaStar className="text-yellow-500" />
                  <span>{movie.rating}/10</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-primary px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                <FaEthereum />
                <span className="font-medium">{movie.price} ETH</span>
              </button>
              <button className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                <FaHeart className="text-xl" />
              </button>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">
            {movie.description}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {movie.categories.map(category => (
                  <span
                    key={category}
                    className="bg-white/10 px-2 py-1 rounded text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Available in</h3>
              <div className="flex gap-2">
                <span className="bg-white/10 px-2 py-1 rounded text-sm">4K</span>
                <span className="bg-white/10 px-2 py-1 rounded text-sm">HDR</span>
                <span className="bg-white/10 px-2 py-1 rounded text-sm">Dolby</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => setIsPlaying(true)}
              className="flex-1 bg-primary py-4 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Watch Now
            </button>
            <button className="flex-1 bg-white/10 py-4 rounded-lg hover:bg-white/20 transition-colors font-medium">
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSlug; 