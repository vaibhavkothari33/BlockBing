import React, { useState, useRef, useEffect } from 'react';
import { Player } from '@livepeer/react';
import { FaEthereum } from 'react-icons/fa';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { getContract } from '../../utils/contract';
import { 
  FaExpand, FaCompress, FaVolumeUp, FaVolumeMute, 
  FaCog, FaClosedCaptioning, FaDownload 
} from 'react-icons/fa';
import { useLoader } from '../../contexts/LoaderContext';

const VideoPlayer = ({ playbackId, poster, title, movie }) => {
  const { setIsLoading } = useLoader();
  const { active, library } = useWeb3React();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const playerRef = useRef();
  const containerRef = useRef();

  const qualities = ['auto', '1080p', '720p', '480p', '360p'];
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Auto fullscreen on mount
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (containerRef.current && !document.fullscreenElement) {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } catch (error) {
        console.error('Error attempting to enable full-screen mode:', error);
      }
    };
    
    // Small delay to ensure smooth transition
    const timer = setTimeout(enterFullscreen, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleBuy = async () => {
    if (!active || !movie) return;
    setIsProcessing(true);
    setIsLoading(true);
    
    try {
      const contract = getContract(library);
      const tx = await contract.buyMovie(movie.tokenId, { 
        value: ethers.utils.parseEther(movie.price.toString()) 
      });
      await tx.wait();
      console.log('NFT bought:', movie.tokenId);
    } catch (error) {
      console.error('Error buying NFT:', error);
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    setShowSettings(false);
  };

  const handleSpeedChange = (newSpeed) => {
    setPlaybackSpeed(newSpeed);
    if (playerRef.current) {
      playerRef.current.playbackRate = newSpeed;
    }
    setShowSettings(false);
  };

  console.log("Playing video with playbackId:", playbackId);

  if (!playbackId) {
    return (
      <div className="flex items-center justify-center h-full bg-black">
        <p className="text-white">Video not available</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
    >
      <Player
        ref={playerRef}
        title={title}
        playbackId={playbackId}
        showPipButton
        showTitle={false}
        aspectRatio="16to9"
        controls={{
          autohide: 3000,
          hotkeys: true,
          defaultVolume: 1,
          autoPlay: true,
          showUploadingIndicator: true,
        }}
        theme={{
          borderStyles: { containerBorderStyle: 'none' },
          colors: {
            accent: '#1eb854',
          },
          sizes: {
            containerWidth: '100%',
            containerHeight: '100%',
          },
          space: {
            controlsBottomMarginX: '1rem',
            controlsBottomMarginY: '1rem',
          },
        }}
        poster={poster}
        loading="eager"
        objectFit="contain"
        muted={isMuted}
        onError={(error) => {
          console.error('Video playback error:', error);
          setIsLoading(false);
        }}
      />

      {/* Custom Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Volume Control */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-primary transition-colors"
            >
              {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </button>

            {/* Settings Button */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:text-primary transition-colors"
              >
                <FaCog size={20} className={showSettings ? 'animate-spin' : ''} />
              </button>

              {/* Settings Menu */}
              {showSettings && (
                <div className="absolute bottom-full mb-2 left-0 bg-dark-lighter rounded-lg shadow-xl p-2 min-w-[200px]">
                  {/* Quality Settings */}
                  <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-2 px-3">Quality</div>
                    {qualities.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQualityChange(q)}
                        className={`w-full text-left px-3 py-1.5 hover:bg-primary/20 rounded ${
                          quality === q ? 'text-primary' : 'text-white'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  {/* Playback Speed */}
                  <div>
                    <div className="text-gray-400 text-sm mb-2 px-3">Speed</div>
                    {speeds.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`w-full text-left px-3 py-1.5 hover:bg-primary/20 rounded ${
                          playbackSpeed === speed ? 'text-primary' : 'text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Closed Captions */}
            <button className="text-white hover:text-primary transition-colors">
              <FaClosedCaptioning size={20} />
            </button>

            {/* Download Option */}
            <button className="text-white hover:text-primary transition-colors">
              <FaDownload size={20} />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-primary transition-colors"
          >
            {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
          </button>
        </div>
      </div>

      {/* NFT Purchase Overlay */}
      {movie && movie.forSale && !movie.isOwner && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <FaEthereum />
              <span className="font-medium">{movie.price} ETH</span>
            </div>
            {active ? (
              <button
                onClick={handleBuy}
                disabled={isProcessing}
                className={`px-6 py-2 rounded-lg ${
                  isProcessing 
                    ? 'bg-primary/50 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary/90'
                } transition-colors`}
              >
                {isProcessing ? 'Processing...' : 'Buy Now'}
              </button>
            ) : (
              <button
                className="px-6 py-2 rounded-lg bg-gray-500/50 cursor-not-allowed"
                disabled
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; 