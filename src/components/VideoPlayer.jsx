import React, { useCallback } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';

const VideoPlayer = ({ src, poster }) => {
  const playerRef = React.useRef(null);

  const handlePlay = useCallback(() => {
    if (screenfull.isEnabled && playerRef.current) {
      const container = playerRef.current.wrapper;
      screenfull.request(container);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (screenfull.isEnabled && screenfull.isFullscreen) {
      screenfull.exit();
    }
  }, []);

  return (
    <div className="w-full h-full">
      <ReactPlayer
        ref={playerRef}
        url={src}
        width="100%"
        height="100%"
        controls={true}
        playing={true}
        light={poster}
        pip={true}
        stopOnUnmount={false}
        onPlay={handlePlay}
        onPause={handlePause}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
        }}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
              style: {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }
            }
          }
        }}
        playIcon={
          <button className="bg-primary/90 p-6 rounded-full hover:bg-primary transition-colors">
            <svg viewBox="0 0 24 24" width="24" height="24" className="w-8 h-8">
              <path fill="currentColor" d="M8 5v14l11-7z"/>
            </svg>
          </button>
        }
      />
    </div>
  );
};

export default VideoPlayer; 